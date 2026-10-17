#!/usr/bin/env python3
"""
publish_scheduled_blogs.py — Automated Blog Scheduler for Mayfield Phone Repair (mayfieldphonerepair.com.au)

Reads scheduled_blogs/manifest.json, checks for posts due on or before today,
publishes them to blog/<slug>.html (and public/blog/<slug>.html + React data),
updates blog.html (under <!-- BLOG_GRID_START -->), regenerates sitemap.xml,
and sends an email notification with live links to engrkhalil77@gmail.com.
"""

import os
import re
import sys
import json
import shutil
import argparse
import datetime as dt
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST_PATH = ROOT / "scheduled_blogs" / "manifest.json"
SCHEDULED_DIR = ROOT / "scheduled_blogs"
BLOG_DIR = ROOT / "blog"
PUBLIC_BLOG_DIR = ROOT / "public" / "blog"
BLOG_INDEX = ROOT / "blog.html"
PUBLIC_BLOG_INDEX = ROOT / "public" / "blog.html"
REACT_PUBLISHED_JSON = ROOT / "src" / "data" / "scheduledPublishedBlogs.json"
SITEMAP_TS_SCRIPT = ROOT / "scripts" / "generate-sitemap.ts"
PUBLIC_SITEMAP = ROOT / "public" / "sitemap.xml"

DOMAIN = "https://mayfieldphonerepair.com.au"
DEFAULT_NOTIFY_EMAIL = "engrkhalil77@gmail.com"


def load_manifest():
    if not MANIFEST_PATH.exists():
        print(f"Error: Manifest not found at {MANIFEST_PATH}", file=sys.stderr)
        return []
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_manifest(manifest):
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
        f.write("\n")


def format_card(post, pub_date):
    month_year = pub_date.strftime("%B %Y")
    return (
        f'            <a href="blog/{post["slug"]}.html" class="post-card group">\n'
        f'                <p class="eyebrow mb-3">{post["category"]} &bull; {post.get("read_time", "7 min read")} &bull; {month_year}</p>\n'
        f'                <h2 class="font-serif text-2xl md:text-3xl text-ink mb-3 leading-tight">{post["title"]}</h2>\n'
        f'                <p class="text-muted leading-relaxed mb-4">{post["meta_description"]}</p>\n'
        f'                <span class="inline-flex items-center gap-2 text-sm font-medium text-teal">Read the post &rarr;</span>\n'
        f'            </a>\n\n'
    )


def update_blog_index_file(index_path: Path, post, pub_date):
    if not index_path.exists():
        return False
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    if f'href="blog/{post["slug"]}.html"' in content or f'href="/blog/{post["slug"]}"' in content:
        print(f"  Note: Card for {post['slug']} already present in {index_path.name}.")
        return True

    marker = "<!-- BLOG_GRID_START -->"
    if marker not in content:
        print(f"Warning: {marker} marker not found in {index_path.name}.")
        return False

    card = format_card(post, pub_date)
    new_content = content.replace(marker, f"{marker}\n{card}")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    return True


def update_blog_index(post, pub_date):
    ok_root = update_blog_index_file(BLOG_INDEX, post, pub_date)
    update_blog_index_file(PUBLIC_BLOG_INDEX, post, pub_date)
    return ok_root


def extract_body_for_react(html_text: str) -> str:
    """Extracts the article body inside <main>...</main> for React/prerender compatibility."""
    if "<main>" in html_text and "</main>" in html_text:
        inner = html_text.split("<main>", 1)[1].split("</main>", 1)[0]
        # Strip top breadcrumbs, date-badge, and h1 since BlogPostPage renders its own header
        inner = re.sub(r'<div class="breadcrumbs">[\s\S]*?</div>', "", inner, count=1)
        inner = re.sub(r'<span class="date-badge">[\s\S]*?</span>', "", inner, count=1)
        inner = re.sub(r"<h1[^>]*>[\s\S]*?</h1>", "", inner, count=1)
        return f'<section class="space-y-6">{inner.strip()}</section>'
    return html_text


def sync_to_react_blogs(post, html_file: Path, pub_date_str: str):
    """Syncs newly published scheduled HTML post into src/data/scheduledPublishedBlogs.json."""
    try:
        existing = []
        if REACT_PUBLISHED_JSON.exists():
            with open(REACT_PUBLISHED_JSON, "r", encoding="utf-8") as f:
                existing = json.load(f)

        html_text = html_file.read_text(encoding="utf-8")
        content_html = extract_body_for_react(html_text)

        entry = {
            "id": f"sched-{post['slug']}",
            "title": post["title"],
            "slug": post["slug"],
            "author": "Mayfield Phone Repair Senior Bench Team",
            "date": pub_date_str,
            "excerpt": post["meta_description"],
            "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
            "tags": [post.get("category", "Repair Guide"), "Newcastle", "Mayfield"],
            "content": content_html,
        }

        updated = [item for item in existing if item.get("slug") != post["slug"]]
        updated.append(entry)

        REACT_PUBLISHED_JSON.parent.mkdir(parents=True, exist_ok=True)
        with open(REACT_PUBLISHED_JSON, "w", encoding="utf-8") as f:
            json.dump(updated, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"  Synced [{post['slug']}] to {REACT_PUBLISHED_JSON.relative_to(ROOT)}")
    except Exception as e:
        print(f"  Warning: Could not sync to React blog JSON: {e}")


def run_sitemap_gen(published_posts):
    """Regenerates public/sitemap.xml and ensures static .html blog URLs are present."""
    if SITEMAP_TS_SCRIPT.exists():
        try:
            print("Regenerating sitemap.xml via scripts/generate-sitemap.ts...")
            npx_cmd = "npx.cmd" if os.name == "nt" else "npx"
            subprocess.run([npx_cmd, "tsx", str(SITEMAP_TS_SCRIPT)], check=True, cwd=str(ROOT))
        except Exception as e:
            print(f"Notice: npx tsx scripts/generate-sitemap.ts skipped or failed ({e}); updating sitemap.xml directly.")

    if PUBLIC_SITEMAP.exists():
        try:
            xml = PUBLIC_SITEMAP.read_text(encoding="utf-8")
            today_str = dt.date.today().isoformat()
            additions = ""
            for p in published_posts:
                html_loc = f"{DOMAIN}/blog/{p['slug']}.html"
                clean_loc = f"{DOMAIN}/blog/{p['slug']}"
                pub_d = p.get("publish_date") or today_str
                if f"<loc>{html_loc}</loc>" not in xml:
                    additions += (
                        f"  <url>\n"
                        f"    <loc>{html_loc}</loc>\n"
                        f"    <lastmod>{pub_d}</lastmod>\n"
                        f"    <changefreq>monthly</changefreq>\n"
                        f"    <priority>0.7</priority>\n"
                        f"  </url>\n"
                    )
                if f"<loc>{clean_loc}</loc>" not in xml:
                    additions += (
                        f"  <url>\n"
                        f"    <loc>{clean_loc}</loc>\n"
                        f"    <lastmod>{pub_d}</lastmod>\n"
                        f"    <changefreq>monthly</changefreq>\n"
                        f"    <priority>0.7</priority>\n"
                        f"  </url>\n"
                    )
            if additions and "</urlset>" in xml:
                xml = xml.replace("</urlset>", f"{additions}</urlset>")
                PUBLIC_SITEMAP.write_text(xml, encoding="utf-8")
                print("  Updated public/sitemap.xml with new blog URLs.")
        except Exception as e:
            print(f"Warning: Sitemap XML update failed: {e}")


def send_email_notification(published_posts):
    """
    Sends an email notification with live links upon publication.
    Uses SMTP_USER and SMTP_PASS from environment (e.g. Gmail App Password).
    """
    to_addr = os.environ.get("NOTIFY_TO") or DEFAULT_NOTIFY_EMAIL
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASS")

    post_items = []
    for p in published_posts:
        url = f"{DOMAIN}/blog/{p['slug']}.html"
        clean_url = f"{DOMAIN}/blog/{p['slug']}"
        gsc_url = "https://search.google.com/search-console"
        post_items.append({
            "title": p.get("title", ""),
            "url": url,
            "clean_url": clean_url,
            "gsc_url": gsc_url,
            "meta": p.get("meta_description", ""),
            "date": p.get("publish_date", ""),
            "category": p.get("category", "Blog"),
        })

    # Log to GitHub Step Summary if running in GitHub Actions
    step_summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if step_summary:
        try:
            with open(step_summary, "a", encoding="utf-8") as f:
                f.write("### 🚀 Published Blog Posts Live on mayfieldphonerepair.com.au\n\n")
                for item in post_items:
                    f.write(f"- **[{item['title']}]({item['url']})**\n")
                    f.write(f"  - **Live URL (Static HTML):** `{item['url']}`\n")
                    f.write(f"  - **Live URL (SPA Route):** `{item['clean_url']}`\n")
                    f.write(f"  - **Category:** {item['category']} | **Date:** {item['date']}\n\n")
        except Exception as e:
            print(f"Notice: Failed to write to GITHUB_STEP_SUMMARY: {e}")

    if not smtp_user or not smtp_pass:
        print("\n" + "=" * 65)
        print(f"📧 Publication Email Target: {to_addr}")
        print("Status: SMTP credentials (SMTP_USER / SMTP_PASS) not set in environment.")
        print("To receive automated emails whenever a blog is published:")
        print("  1. Go to your GitHub repository > Settings > Secrets and variables > Actions")
        print("  2. Add repository secrets:")
        print(f"     - SMTP_USER: Your Gmail address (e.g. {to_addr})")
        print("     - SMTP_PASS: 16-character Gmail App Password (from myaccount.google.com/apppasswords)")
        print(f"     - NOTIFY_TO: {to_addr} (optional, defaults to {to_addr})")
        print("=" * 65 + "\n")
        return False

    try:
        import smtplib
        from email.message import EmailMessage

        count = len(post_items)
        first_title = post_items[0]["title"] if count == 1 else f"{count} new posts"
        today_str = dt.date.today().strftime("%d %B %Y")

        subject = f"Mayfield Phone Repair: Published '{first_title}' — {today_str}"

        # Plain text
        text_lines = [
            f"Mayfield Phone Repair Blog Publication Alert — {today_str}",
            "Workshop: 276 Maitland Rd, Mayfield, NSW 2304 (ABN: 11 433 439 336)",
            "",
            f"The following {count} article(s) are now live on mayfieldphonerepair.com.au:",
            "",
        ]
        for item in post_items:
            text_lines.append(f"• {item['title']}")
            text_lines.append(f"  Live Link: {item['url']}")
            text_lines.append(f"  Clean Route: {item['clean_url']}")
            text_lines.append(f"  Summary: {item['meta']}")
            text_lines.append(f"  Category: {item['category']}")
            text_lines.append("")
        text_lines.append("Inspect in Google Search Console: https://search.google.com/search-console")
        text_body = "\n".join(text_lines)

        # HTML
        rows_html = ""
        for item in post_items:
            rows_html += f"""
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:4px solid #1d4ed8; border-radius:6px; padding:18px 20px; margin-bottom:16px;">
                <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#1d4ed8; margin-bottom:6px;">
                    {item['category']} &bull; Live Now
                </div>
                <h2 style="font-size:18px; line-height:1.3; color:#0f172a; margin:0 0 8px 0; font-family:Georgia, serif;">
                    {item['title']}
                </h2>
                <p style="font-size:14px; line-height:1.5; color:#475569; margin:0 0 12px 0;">
                    {item['meta']}
                </p>
                <a href="{item['url']}" style="display:inline-block; background:#1d4ed8; color:#ffffff; padding:9px 18px; border-radius:4px; text-decoration:none; font-size:14px; font-weight:600;">
                    Open Live Article &rarr;
                </a>
                <div style="margin-top:10px; font-size:12px; color:#64748b;">
                    Direct URL: <a href="{item['url']}" style="color:#1d4ed8;">{item['url']}</a>
                </div>
            </div>
            """

        html_body = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color:#f8fafc; margin:0; padding:24px 16px; color:#0f172a;">
            <div style="max-width:620px; margin:0 auto; background:#ffffff; border-radius:8px; border:1px solid #e2e8f0; overflow:hidden;">
                <div style="background:#0d1b2a; padding:20px 24px; color:#ffffff;">
                    <div style="font-size:12px; letter-spacing:0.1em; text-transform:uppercase; opacity:0.85;">Mayfield Phone Repair Automation &bull; 276 Maitland Rd, Mayfield</div>
                    <h1 style="font-size:22px; margin:6px 0 0 0; font-family:Georgia, serif; font-weight:normal;">New Blog Publication Alert</h1>
                </div>
                <div style="padding:24px;">
                    <p style="font-size:15px; line-height:1.6; color:#1e293b; margin-top:0;">
                        Hello Khalil,
                    </p>
                    <p style="font-size:15px; line-height:1.6; color:#1e293b;">
                        Your scheduled blog post has been published live to <strong>mayfieldphonerepair.com.au</strong>:
                    </p>
                    {rows_html}
                    <div style="background:#eff6ff; border-radius:6px; padding:14px 18px; margin-top:20px; font-size:13px; color:#1e3a8a; line-height:1.5;">
                        <strong>GSC Quick Action:</strong> Paste the live link into <a href="https://search.google.com/search-console" style="color:#1d4ed8; font-weight:600;">Google Search Console</a> to request priority indexing immediately.
                    </div>
                </div>
                <div style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:16px 24px; font-size:12px; color:#64748b; text-align:center;">
                    Sent automatically by the Mayfield Phone Repair Publisher pipeline (ABN: 11 433 439 336) to {to_addr}.
                </div>
            </div>
        </body>
        </html>
        """

        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = smtp_user
        msg["To"] = to_addr
        msg.set_content(text_body)
        msg.add_alternative(html_body, subtype="html")

        print(f"Sending publication email to {to_addr} via SMTP...")
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as server:
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        print(f"✓ Publication email successfully sent to {to_addr}!")
        return True

    except Exception as e:
        print(f"Warning: Failed to send publication email: {e}")
        return False


def show_status(manifest):
    today = dt.date.today()
    to_addr = os.environ.get("NOTIFY_TO") or DEFAULT_NOTIFY_EMAIL
    print("\n=== Mayfield Phone Repair Automated Blog Schedule Status ===")
    print(f"Workshop:     276 Maitland Rd, Mayfield, NSW 2304 (ABN: 11 433 439 336)")
    print(f"Domain:       {DOMAIN}")
    print(f"Current Date: {today.isoformat()}")
    print(f"Email Alerts: {to_addr}\n")
    print(f"{'Status':<12} {'Publish Date':<14} {'Days Left':<10} {'Slug':<55}")
    print("-" * 95)
    for p in manifest:
        p_date = dt.date.fromisoformat(p["publish_date"])
        diff = (p_date - today).days
        if p.get("published"):
            status = "PUBLISHED"
            diff_str = "Done"
        elif diff <= 0:
            status = "DUE NOW"
            diff_str = f"{abs(diff)}d ago" if diff < 0 else "Today"
        else:
            status = "SCHEDULED"
            diff_str = f"in {diff}d"
        print(f"{status:<12} {p['publish_date']:<14} {diff_str:<10} {p['slug']:<55}")
    print()


def main():
    parser = argparse.ArgumentParser(description="Mayfield Phone Repair Automated Blog Publisher")
    parser.add_argument("--dry-run", action="store_true", help="Simulate publish without modifying files")
    parser.add_argument("--force", type=str, help="Force-publish a specific post slug regardless of date")
    parser.add_argument("--all", action="store_true", help="Publish all pending scheduled posts immediately")
    parser.add_argument("--status", action="store_true", help="Show scheduled queue status")
    args = parser.parse_args()

    manifest = load_manifest()
    if not manifest:
        sys.exit(1)

    if args.status:
        show_status(manifest)
        return

    today = dt.date.today()
    published_now = []

    for post in manifest:
        slug = post["slug"]
        already_pub = post.get("published", False)
        p_date = dt.date.fromisoformat(post["publish_date"])

        is_due = (p_date <= today) or args.all or (args.force == slug)

        if not is_due:
            continue

        if already_pub and not (args.force == slug):
            continue

        print(f"Processing: [{slug}] (Target Date: {post['publish_date']})...")

        src_file = SCHEDULED_DIR / f"{slug}.html"
        dest_file = BLOG_DIR / f"{slug}.html"
        public_dest_file = PUBLIC_BLOG_DIR / f"{slug}.html"

        if not src_file.exists():
            print(f"  Error: Source file {src_file} does not exist!", file=sys.stderr)
            continue

        if args.dry_run:
            print(f"  [DRY-RUN] Would publish {src_file} -> {dest_file} and {public_dest_file}")
            print(f"  [DRY-RUN] Would add teaser card to blog.html (under <!-- BLOG_GRID_START -->)")
            print(f"  [DRY-RUN] Would sync post to src/data/scheduledPublishedBlogs.json and regenerate sitemap.xml")
            published_now.append(post)
            continue

        # 1. Copy to blog/ and public/blog/
        BLOG_DIR.mkdir(parents=True, exist_ok=True)
        PUBLIC_BLOG_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_file, dest_file)
        shutil.copy2(src_file, public_dest_file)
        print(f"  Copied {src_file.name} -> blog/{dest_file.name} and public/blog/{public_dest_file.name}")

        # 2. Update blog.html and public/blog.html
        effective_date = today if (args.force or args.all) else p_date
        if update_blog_index(post, effective_date):
            print("  Added card to blog.html")

        # 3. Sync to React blog data so Vite/prerender also builds /blog/<slug>
        sync_to_react_blogs(post, src_file, effective_date.isoformat())

        # 4. Mark manifest
        post["published"] = True
        post["published_at"] = today.isoformat()
        published_now.append(post)

    if published_now:
        if not args.dry_run:
            save_manifest(manifest)
            run_sitemap_gen(published_now)
            print(f"\nSuccessfully published {len(published_now)} post(s).")
            send_email_notification(published_now)
        else:
            print(f"\n[DRY-RUN] {len(published_now)} post(s) would be published.")
            to_addr = os.environ.get("NOTIFY_TO") or DEFAULT_NOTIFY_EMAIL
            for p in published_now:
                print(f"[DRY-RUN] Live URL: {DOMAIN}/blog/{p['slug']}.html")
            print(f"[DRY-RUN] Would send notification email with live links to: {to_addr}")
    else:
        print("No scheduled posts due for publication today.")


if __name__ == "__main__":
    main()
