import fs from 'fs';
import path from 'path';
import { brands } from '../src/data/brands';
import { servicesData } from '../src/data/services';
import { blogPosts } from '../src/data/blogs';
import { suburbs } from '../src/data/suburbs';

const BASE_URL = 'https://mayfieldphonerepair.com.au';
const TODAY = new Date().toISOString().split('T')[0];

// High-value, crawl-priority core static pages
const staticPages = [
  { route: '', priority: '1.0', changefreq: 'weekly' },
  { route: '/quote', priority: '0.9', changefreq: 'weekly' },
  { route: '/repair-guides', priority: '0.8', changefreq: 'monthly' },
  { route: '/blog', priority: '0.8', changefreq: 'weekly' },
  { route: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { route: '/after-hours', priority: '0.7', changefreq: 'monthly' },
  { route: '/second-hand-phones', priority: '0.8', changefreq: 'weekly' },
  { route: '/accessories', priority: '0.7', changefreq: 'monthly' },
  { route: '/corporate-repairs', priority: '0.7', changefreq: 'monthly' },
  { route: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { route: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { route: '/sitemap', priority: '0.5', changefreq: 'monthly' },
];

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
    return c;
  });
}

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Core Static Pages
  staticPages.forEach(({ route, priority, changefreq }) => {
    xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  });

  // 2. High-Authority Brand Hubs (Apple, Samsung, Google Pixel, etc.)
  brands.forEach(brand => {
    xml += `  <url>\n    <loc>${BASE_URL}/brand/${escapeXml(brand.id)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // 3. High-Authority Core Service Hubs (Screen, Battery, Water Damage, etc.)
  servicesData.forEach(service => {
    xml += `  <url>\n    <loc>${BASE_URL}/service/${escapeXml(service.id)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // 4. Primary Local Suburb Authority Hubs (Top Greater Newcastle Service Areas)
  // Clean, focused primary hubs: /phone-repair/:suburbId (avoids thin duplicate doorway penalties)
  suburbs.forEach(suburb => {
    const loc = `${BASE_URL}/phone-repair/${escapeXml(suburb.id)}`;
    xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // 5. Educational Technical Blog Posts & Repair Guides
  blogPosts.forEach(post => {
    xml += `  <url>\n    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>\n    <lastmod>${post.date || TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  });

  xml += '</urlset>';

  const publicPath = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), xml);
  const totalUrls = staticPages.length + brands.length + servicesData.length + suburbs.length + blogPosts.length;
  console.log(`✅ Optimized high-authority sitemap generated with ${totalUrls} clean, crawlable URLs.`);
}

generateSitemap();
