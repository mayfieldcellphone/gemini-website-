import fs from 'fs';
import path from 'path';
import { brands } from '../src/data/brands';
import { servicesData } from '../src/data/services';
import { blogPosts } from '../src/data/blogs';
import { suburbs, seoServices } from '../src/data/suburbs';
import { pillarGuides } from '../src/data/pillarData';
import { modelRepairData } from '../src/data/modelData';
import { suburbHubList } from '../src/data/suburbHubData';

const BASE_URL = 'https://mayfieldphonerepair.com.au';
const TODAY = new Date().toISOString().split('T')[0];

const staticPages = [
  '',
  '/quote',
  '/blog',
  '/about-us',
  '/privacy-policy',
  '/terms-of-service',
  '/after-hours',
  '/second-hand-phones',
  '/accessories',
  '/corporate-repairs',
  '/sitemap',
  '/repair-guides',
  '/phone-repair-warranty-australia-guide',
  '/insurance-claim-repairs',
  '/payment-options',
  '/trade-in',
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

export function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static Pages
  staticPages.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Pillar Guides
  pillarGuides.forEach(pillar => {
    xml += `  <url>\n    <loc>${BASE_URL}/repair-guides/${escapeXml(pillar.slug)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // Model Pages
  modelRepairData.forEach(model => {
    const brandPath = model.brand === 'apple' ? 'iphone' : model.brand;
    xml += `  <url>\n    <loc>${BASE_URL}/${brandPath}/${escapeXml(model.slug)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Suburb Hub Pages
  suburbHubList.forEach(hub => {
    xml += `  <url>\n    <loc>${BASE_URL}/phone-repair/${escapeXml(hub.id)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Brands
  brands.forEach(brand => {
    xml += `  <url>\n    <loc>${BASE_URL}/brand/${escapeXml(brand.id)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Services
  servicesData.forEach(service => {
    xml += `  <url>\n    <loc>${BASE_URL}/service/${escapeXml(service.id)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Blog Posts
  blogPosts.forEach(post => {
    xml += `  <url>\n    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>\n    <lastmod>${post.date}</lastmod>\n    <priority>0.6</priority>\n  </url>\n`;
  });

  // Suburb Service Pages
  suburbs.forEach(suburb => {
    seoServices.forEach(service => {
      const loc = `${BASE_URL}/${escapeXml(service.id)}/${escapeXml(suburb.id)}`;
      xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.4</priority>\n  </url>\n`;
    });
  });

  xml += '</urlset>';

  const publicPath = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), xml);

  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml);

  const totalUrls = staticPages.length + pillarGuides.length + modelRepairData.length + suburbHubList.length + brands.length + servicesData.length + blogPosts.length + (suburbs.length * seoServices.length);
  console.log(`Sitemap generated successfully (${totalUrls} URLs).`);
}

generateSitemap();
