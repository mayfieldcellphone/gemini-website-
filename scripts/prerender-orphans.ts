/**
 * Runs right after scripts/prerender.ts. Closes the gap between "URLs the site links to"
 * and "URLs that have their own pre-rendered HTML".
 *
 * Why: any route without a file in dist/ falls through to the SPA shell (/index.html), which
 * is the HOMEPAGE document - homepage title, H1 and canonical. Googlebot (and crawlers like
 * Screpy) then see ~50+ pages that are duplicates of the homepage.
 *
 * What this does:
 *  1. Pre-renders one hub page per suburb in src/data/extraSuburbs.ts (/phone-repair/<id>).
 *  2. Pre-renders /insurance-claim-repairs (an SPA-only route that had no static HTML).
 *  3. Re-points internal links that target non-existent URLs to the closest real page
 *     (or drops the <a> wrapper if there is no sensible target) so no dead link ships.
 *
 * It clones the shared nav/footer/head from an already-built page, so it never drifts from
 * the real layout. scripts/verify-build.ts fails the build if any internal link is still dead.
 */
import fs from 'fs';
import path from 'path';
import { extraSuburbs } from '../src/data/extraSuburbs';

const DIST = path.join(process.cwd(), 'dist');
const BASE = 'https://mayfieldphonerepair.com.au';
const PHONE = '(02) 4049 1735';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets') walk(p, out); }
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}
const routeOf = (f: string) => {
  const r = path.relative(DIST, path.dirname(f));
  return r === '' ? '/' : '/' + r.split(path.sep).join('/');
};

// ---- template: any real suburb page that was already built ----
const templatePath = path.join(DIST, 'phone-repair', 'waratah', 'index.html');
if (!fs.existsSync(templatePath)) throw new Error('prerender-orphans: template page dist/phone-repair/waratah/index.html missing - run prerender first');
const template = fs.readFileSync(templatePath, 'utf-8');

function replaceMain(html: string, article: string): string {
  const h1 = html.indexOf('<h1');
  const start = html.lastIndexOf('<article', h1);
  const end = html.indexOf('</article>', h1);
  if (h1 < 0 || start < 0 || end < 0) throw new Error('prerender-orphans: could not locate <article> in template');
  return html.slice(0, start) + article + html.slice(end + '</article>'.length);
}

function buildPage(route: string, title: string, desc: string, schema: unknown, article: string) {
  const url = `${BASE}/${route}`;
  let h = template;
  h = h.replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title data-rh="true">${esc(title)}</title>`);
  h = h.replace(/<meta data-rh="true" name="description"[^>]*\/?>/, `<meta data-rh="true" name="description" content="${esc(desc)}" />`);
  h = h.replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${url}" />`);
  h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  h = h.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  h = h.replace(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${url}$2`);
  h = h.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  h = h.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`);
  h = replaceMain(h, article);
  const dir = path.join(DIST, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), h, 'utf-8');
}

// ---- 1. suburb hubs ----
const hubLinks = [
  ['Mayfield', '/phone-repair/mayfield'], ['Waratah', '/phone-repair/waratah'], ['Hamilton', '/phone-repair/hamilton'],
  ['Newcastle', '/phone-repair/newcastle'], ['Charlestown', '/phone-repair/charlestown'], ['Maitland', '/phone-repair/maitland'],
];
for (const s of extraSuburbs) {
  const route = `phone-repair/${s.id}`;
  const title = `Phone Repair ${s.name} | Mayfield Phone Repair`;
  const desc = `Phone repair for ${s.name} NSW. Fast 30-min screen & battery service at 276 Maitland Rd Mayfield. 90-day warranty. Call ${PHONE}.`;
  const article = `<article>
          <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>Phone Repair ${s.name}</span></nav>
          <header>
            <h1>Phone Repair ${s.name} | Express Service in Mayfield</h1>
            <p>Need fast, reliable phone repair in <strong>${s.name}</strong>? <strong>Mayfield Phone Repair</strong> is an independent local workshop at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>. Walk-ins are welcome and most screen and battery repairs are finished in 30 to 60 minutes with a 90-day warranty.</p>
          </header>
          <section>
            <h2>Repairs We Do for ${s.name} Customers</h2>
            <ul>
              <li><a href="/service/screen-repair">Screen repair</a> for iPhone, Samsung Galaxy and Google Pixel</li>
              <li><a href="/service/battery-replacement">Battery replacement</a> for phones, tablets and laptops</li>
              <li><a href="/service/water-damage">Water damage repair</a> including ultrasonic cleaning</li>
              <li><a href="/service/charging-port-repair">Charging port repair</a> and cleaning</li>
              <li><a href="/service/ipad-repair">iPad repair</a> and <a href="/service/macbook-repair">MacBook repair</a></li>
              <li>Brand specialists: <a href="/brand/apple">Apple</a>, <a href="/brand/samsung">Samsung</a>, <a href="/brand/google">Google Pixel</a></li>
            </ul>
          </section>
          <section>
            <h2>Visit Mayfield Phone Repair from ${s.name}</h2>
            <p>Find us at 276 Maitland Rd, Mayfield NSW 2304, or call <a href="tel:0240491735">${PHONE}</a>. Not sure what is wrong with your device? Bring it in for a diagnosis, or <a href="/quote">get a free quote</a> online first.</p>
          </section>
          <section>
            <h2>${s.name} Phone Repair FAQs</h2>
            <h3>Do I need an appointment?</h3>
            <p>No appointment is needed. Walk-ins are welcome, and you can also <a href="/quote">request a quote online</a>.</p>
            <h3>How long does a screen repair take?</h3>
            <p>Most iPhone and Samsung screen replacements take 30 to 60 minutes while you wait.</p>
            <h3>Is there a warranty on repairs?</h3>
            <p>Yes. Every repair comes with a 90-day parts and labour warranty.</p>
          </section>
          <section>
            <h2>Other Areas We Serve</h2>
            <p>${hubLinks.map(([n, h]) => `<a href="${h}">Phone Repair ${n}</a>`).join(' • ')}</p>
          </section>
        </article>`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': `${BASE}/${route}#service`, serviceType: 'Mobile Phone Repair',
        name: `Phone Repair for ${s.name} NSW`, url: `${BASE}/${route}`,
        provider: { '@id': `${BASE}/#business` }, areaServed: { '@type': 'Place', name: `${s.name} NSW` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: `Phone Repair ${s.name}`, item: `${BASE}/${route}` },
        ],
      },
    ],
  };
  buildPage(route, title, desc, schema, article);
}
console.log(`✅ Pre-rendered ${extraSuburbs.length} extra suburb hub pages (/phone-repair/*).`);

// ---- 2. /insurance-claim-repairs (SPA-only route, text mirrors src/pages/InsuranceClaimPage.tsx) ----
buildPage(
  'insurance-claim-repairs',
  'Insurance Claim Phone Repairs Newcastle | Mayfield',
  'Phone repair covered by insurance? We issue inspection reports and itemised quotes for Australian insurers. 276 Maitland Rd Mayfield. Reports within 1 hour.',
  {
    '@context': 'https://schema.org', '@type': 'WebPage', name: 'Insurance Claim Phone Repairs in Newcastle',
    url: `${BASE}/insurance-claim-repairs`, publisher: { '@id': `${BASE}/#business` },
  },
  `<article>
          <header>
            <h1>Insurance Claim Phone Repairs in Newcastle — We Handle the Paperwork</h1>
            <p>Need a phone repair covered by home, contents, travel, or business insurance? We issue formal diagnostic inspection reports and itemised quotes for all major Australian insurers. Fast local turnaround in Mayfield.</p>
            <p>Need an emergency claim report today? Walk into our Mayfield shop at 276 Maitland Rd or call us on ${PHONE}. Reports are generated within 1 hour.</p>
          </header>
          <section>
            <h2>How Insurance Claim Phone Repairs Work</h2>
            <ol>
              <li>Confirm accidental damage coverage with your provider.</li>
              <li>Bring your device to 276 Maitland Rd for a physical assessment.</li>
              <li>We generate a formal PDF report and itemised quote for your insurer.</li>
              <li>Submit our documentation to claim your payout or repair approval.</li>
              <li>We restore your device in under 60 minutes.</li>
            </ol>
          </section>
          <section>
            <h2>What We Provide for Your Claim</h2>
            <ul>
              <li>Official inspection report with IMEI, serial number and a physical damage breakdown.</li>
              <li>Itemised GST quote with line-item costs for parts and labour.</li>
              <li>High-resolution photographic evidence of the damage.</li>
              <li>ABN-registered tax invoice for easy reimbursement.</li>
            </ul>
          </section>
          <section>
            <h2>What to Look For in Your Policy Before You Call Us</h2>
            <ul>
              <li>Accidental damage option: check whether portable items outside the home are covered.</li>
              <li>Choice of repairer: you can generally ask for a local repairer instead of mail-in logistics.</li>
              <li>Excess amount: make sure your repair quote exceeds your excess.</li>
            </ul>
            <p>Visit 276 Maitland Rd, Mayfield NSW 2304 or <a href="/quote">request a free quote</a>.</p>
          </section>
        </article>`,
);
console.log('✅ Pre-rendered /insurance-claim-repairs.');

// ---- 3. re-point or unlink dead internal links ----
const have = new Set(walk(DIST).map(routeOf));
const extraIds = new Set(extraSuburbs.map(s => s.id));
const REMAP: Record<string, string> = {
  '/service/phone-repair': '/',
  '/service/iphone-repair': '/brand/apple',
  '/service/samsung-repair': '/brand/samsung',
  '/service/water-damage-repair': '/service/water-damage',
  '/service/laptop-macbook-repair': '/service/macbook-repair',
  '/service/iphone-screen-repair': '/service/screen-repair',
  '/newcastle': '/phone-repair/newcastle',
};
function resolve(href: string): string | null {
  const [pathname, rest = ''] = href.split(/(?=[?#])/);
  const clean = pathname.replace(/(.)\/$/, '$1');
  if (have.has(clean)) return null; // already fine
  if (REMAP[clean] && have.has(REMAP[clean])) return REMAP[clean] + rest;
  const seg = clean.split('/').filter(Boolean);
  if (seg.length === 2 && extraIds.has(seg[1]) && have.has(`/phone-repair/${seg[1]}`)) return `/phone-repair/${seg[1]}` + rest; // /<service>/<extra suburb> -> hub
  if (seg[0] === 'blog' && seg.length === 2) return '/blog' + rest; // unpublished/unknown post
  return ''; // no sensible target: unlink
}
let rewritten = 0, unlinked = 0;
for (const f of walk(DIST)) {
  const before = fs.readFileSync(f, 'utf-8');
  const after = before.replace(/<a\b([^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, a, href, b, inner) => {
    if (/\.[a-z0-9]{2,5}($|[?#])/i.test(href) || href.startsWith('/assets')) return m;
    const r = resolve(href);
    if (r === null) return m;
    if (r === '') { unlinked++; return inner; }
    rewritten++;
    return `<a${a}href="${r}"${b}>${inner}</a>`;
  });
  if (after !== before) fs.writeFileSync(f, after, 'utf-8');
}
console.log(`✅ Link repair: ${rewritten} links re-pointed, ${unlinked} dead links unlinked.`);
