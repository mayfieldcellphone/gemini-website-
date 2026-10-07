/**
 * Post-build SEO guard. Fails the build (exit 1) if any prerendered page in dist/
 * is missing a <title>, viewport meta, meta description, or has a canonical that
 * does not match its own URL, or links to an internal URL that has no prerendered page.
 * Duplicate titles are reported as errors too.
 * Run automatically at the end of `npm run build` so a bad deploy cannot ship.
 */
import fs from 'fs';
import path from 'path';

const DIST = path.join(process.cwd(), 'dist');
const BASE = 'https://mayfieldphonerepair.com.au';
// Routes intentionally canonicalised to another page.
const CANONICAL_OVERRIDES: Record<string, string> = {
  '/free-quote': '/quote',
  '/promo': '/quote',
};

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets') walk(p, out); }
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const errors: string[] = [];
const warnings: string[] = [];
const titles = new Map<string, string[]>();
const files = walk(DIST);

for (const f of files) {
  const html = fs.readFileSync(f, 'utf-8');
  const rel = path.relative(DIST, path.dirname(f));
  const route = rel === '' ? '/' : '/' + rel.split(path.sep).join('/');
  const tag = (msg: string) => errors.push(`${route}: ${msg}`);

  const titleMatches = html.match(/<title[^>]*>([\s\S]*?)<\/title>/g) || [];
  const title = titleMatches.length ? titleMatches[0].replace(/<[^>]+>/g, '').trim() : '';
  if (titleMatches.length !== 1) tag(`expected exactly 1 <title>, found ${titleMatches.length}`);
  else if (!title) tag('empty <title>');
  else {
    if (title.length > 65) warnings.push(`${route}: title long (${title.length})`);
    titles.set(title, [...(titles.get(title) || []), route]);
  }
  if (!/<meta[^>]+name="viewport"/.test(html)) tag('missing viewport meta');
  if (!/<meta[^>]+charset/i.test(html)) tag('missing charset meta');
  const descTag = html.match(/<meta[^>]+name="description"[^>]*>/);
  if (!descTag) tag('missing meta description');
  else {
    const dm = descTag[0].match(/content="([\s\S]*)"\s*\/?>$/);
    const inner = dm ? dm[1] : '';
    if (inner.length < 20) tag('meta description empty/too short');
    if (inner.length > 160) warnings.push(`${route}: description long (${inner.length})`);
    if (inner.includes('"')) warnings.push(`${route}: description contains a raw " quote (gets cut off in Google)`);
  }

  const canon = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/);
  const expected = BASE + (CANONICAL_OVERRIDES[route] ?? (route === '/' ? '' : route));
  const got = canon ? canon[1].replace(/\/$/, '') : '';
  if (!canon) tag('missing canonical');
  else if (got !== expected.replace(/\/$/, '')) tag(`canonical ${canon[1]} != expected ${expected}`);
}

// Link integrity: every internal <a href> in the prerendered HTML must resolve to a prerendered page.
// A link to a route with no file in dist/ is served the SPA shell (the homepage document) by the web
// server, i.e. a crawlable duplicate of the homepage with the homepage canonical.
{
  const have = new Set(files.map(f => {
    const r = path.relative(DIST, path.dirname(f));
    return r === '' ? '/' : '/' + r.split(path.sep).join('/');
  }));
  const dead = new Map<string, string[]>();
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf-8');
    const from = '/' + path.relative(DIST, path.dirname(f)).split(path.sep).join('/');
    for (const m of html.matchAll(/<a\b[^>]*?href="(\/[^"#?]*)/g)) {
      const target = m[1].replace(/(.)\/$/, '$1');
      if (/\.[a-z0-9]{2,5}$/i.test(target) || target.startsWith('/assets') || target.startsWith('/admin')) continue;
      if (!have.has(target)) dead.set(target, [...(dead.get(target) || []), from]);
    }
  }
  for (const [target, sources] of dead) {
    errors.push(`dead internal link ${target} (linked from ${sources.length} page${sources.length > 1 ? 's' : ''}, e.g. ${sources[0]})`);
  }
}

for (const [t, routes] of titles) {
  if (routes.length > 1 && !routes.every(r => CANONICAL_OVERRIDES[r] || r === '/quote')) {
    errors.push(`duplicate title "${t}" on ${routes.length} pages: ${routes.slice(0, 4).join(', ')}${routes.length > 4 ? ', ...' : ''}`);
  }
}

const titlesOver65 = warnings.filter(w => w.includes('title long')).length;
const descsOver160 = warnings.filter(w => w.includes('description long')).length;

if (warnings.length) console.warn(`⚠️  ${warnings.length} SEO warnings (non-blocking) [${titlesOver65} titles > 65, ${descsOver160} descriptions > 160], e.g. ${warnings[0]}`);

if (errors.length) {
  console.error(`\n❌ SEO build check FAILED (${errors.length} problems across ${files.length} pages):`);
  errors.slice(0, 60).forEach(e => console.error('  - ' + e));
  if (errors.length > 60) console.error(`  ... and ${errors.length - 60} more`);
  process.exit(1);
}
console.log(`✅ SEO build check passed: ${files.length} pages have unique titles, viewport, description and correct canonicals. (Titles > 65: ${titlesOver65}, Descriptions > 160: ${descsOver160})`);
