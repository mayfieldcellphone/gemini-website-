import fs from 'fs';
import path from 'path';
import { brands } from '../src/data/brands';
import { servicesData } from '../src/data/services';
import { blogPosts } from '../src/data/blogs';
import { suburbs, seoServices } from '../src/data/suburbs';
import { seoServiceDetails } from '../src/data/seoServiceContent';
import { modelRepairData } from '../src/data/modelData';

const BASE_URL = 'https://mayfieldphonerepair.com.au';
const TODAY = new Date().toISOString().split('T')[0];
const DIST_DIR = path.join(process.cwd(), 'dist');

// Define general business config for schemas
const businessLocalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "MobilePhoneRepairStore"],
      "@id": `${BASE_URL}/#organization`,
      "name": "Mayfield Phone Repair",
      "alternateName": "Mayfield Cell Phone Repairs",
      "image": `${BASE_URL}/logo.png`,
      "url": `${BASE_URL}`,
      "telephone": "+61 2 4049 1735",
      "priceRange": "$$",
      "currenciesAccepted": "AUD",
      "paymentAccepted": "Cash, Credit Card, EFTPOS, Apple Pay, Afterpay",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "276 Maitland Rd",
        "addressLocality": "Mayfield",
        "addressRegion": "NSW",
        "postalCode": "2304",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -32.8988,
        "longitude": 151.7345
      },
      "hasMap": "https://maps.google.com/?q=276+Maitland+Rd+Mayfield+NSW+2304",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "477",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.facebook.com/mayfieldcellphonerepairs",
        "https://www.instagram.com/mayfieldcellphonerepairs/",
        "https://twitter.com/Mayfiel32990272",
        "https://www.linkedin.com/company/mayfield-cell-phone-repairs/",
        "https://www.youtube.com/@mayfieldcellphonerepairs"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does iPhone screen repair cost in Newcastle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iPhone screen replacement in Newcastle at Mayfield Phone Repair starts from $89 for older models (iPhone 8/X/11), $149–$229 for standard OLED models (iPhone 12/13/14/15/16), and up to $380–$485 for high-refresh flagship Pro Max screens. All screen replacements include a 90-day warranty and free diagnostic check."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a phone screen or battery repair take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most standard iPhone and Samsung screen repairs or battery swaps are completed in 30 to 45 minutes while you wait at our 276 Maitland Rd Mayfield shop. No appointment is needed for walk-in repairs."
          }
        },
        {
          "@type": "Question",
          "name": "Are you open on Sundays in Newcastle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Mayfield Phone Repair is open on Sundays from 10:00 AM to 2:00 PM, providing weekend emergency phone repairs across Newcastle, Hamilton, Waratah, and Wallsend."
          }
        },
        {
          "@type": "Question",
          "name": "Do your screen repairs retain True Tone and Face ID?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our senior technicians use specialized micro-programmers to read original display serial codes and transfer them onto new OEM-spec assemblies, preserving Apple True Tone color adaptation and Face ID security."
          }
        },
        {
          "@type": "Question",
          "name": "What warranty do you provide on repairs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All repairs include a comprehensive 90-day hardware warranty covering parts and labor. If the replacement part develops any manufacturer defect, we replace it free of charge."
          }
        }
      ]
    }
  ]
};

async function runPrerender() {
  console.log('🏁 Initializing SEO Static Pre-rendering...');
  
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Error: ${templatePath} does not exist. Please run 'vite build' first.`);
    process.exit(1);
  }

  const indexTemplate = fs.readFileSync(templatePath, 'utf-8');

  const escAttr = (s: string) =>
    String(s)
      .replace(/&(?!amp;|quot;|lt;|gt;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;')
      .replace(/"/g, '&quot;');

  const sharedNav = `
    <header style="background: #0d1b2a; color: #fff; padding: 14px 20px; border-bottom: 1px solid #1e293b;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <a href="/" style="color: #fff; font-weight: 800; font-size: 1.2rem; text-decoration: none;">Mayfield Phone Repair</a>
          <p style="margin: 2px 0 0; font-size: 0.8rem; color: #94a3b8;">276 Maitland Rd, Mayfield NSW 2304 &bull; Tel: <a href="tel:+61240491735" style="color: #38bdf8; text-decoration: underline;">(02) 4049 1735</a></p>
        </div>
        <nav aria-label="Main Navigation" style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.875rem;">
          <a href="/" style="color: #e2e8f0; text-decoration: none;">Home</a>
          <a href="/quote" style="color: #38bdf8; font-weight: bold; text-decoration: none;">Get Free Quote</a>
          <a href="/service/screen-repair" style="color: #e2e8f0; text-decoration: none;">Screen Repair</a>
          <a href="/service/battery-replacement" style="color: #e2e8f0; text-decoration: none;">Battery Replacement</a>
          <a href="/service/water-damage" style="color: #e2e8f0; text-decoration: none;">Water Damage</a>
          <a href="/service/data-recovery" style="color: #e2e8f0; text-decoration: none;">Data Recovery</a>
          <a href="/repair-guides" style="color: #e2e8f0; text-decoration: none;">Repair Guides</a>
          <a href="/blog" style="color: #e2e8f0; text-decoration: none;">Blog</a>
          <a href="/about-us" style="color: #e2e8f0; text-decoration: none;">About Us</a>
        </nav>
      </div>
    </header>
  `;

  const sharedFooter = `
    <footer style="background: #0d1b2a; color: #cbd5e1; padding: 40px 20px 24px; margin-top: 48px; border-top: 2px solid #1e293b; font-size: 0.875rem;">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px;">
        <div>
          <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 12px; font-weight: 700;">Mayfield Phone Repair</h3>
          <p style="margin: 0 0 8px; line-height: 1.5;">276 Maitland Rd, Mayfield NSW 2304</p>
          <p style="margin: 0 0 8px;">Phone: <a href="tel:+61240491735" style="color: #38bdf8; text-decoration: none; font-weight: 600;">(02) 4049 1735</a></p>
          <p style="margin: 0 0 8px;">After-Hours / Text: <strong style="color: #fff;">0431 618 100</strong></p>
          <p style="margin: 0 0 12px; color: #94a3b8;">Mon–Fri 9am–5pm | Sat 10am–4pm | Sun 10am–2pm</p>
          <p style="margin: 0;"><a href="/quote" style="display: inline-block; background: #2563eb; color: #fff; padding: 6px 14px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.8rem;">Get Instant Quote &rarr;</a></p>
        </div>
        <div>
          <h3 style="color: #fff; font-size: 1rem; margin-bottom: 12px; font-weight: 700;">Repair Services</h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px;">
            ${servicesData.map(s => `<li><a href="/service/${s.id}" style="color: #94a3b8; text-decoration: none;">${s.title}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 style="color: #fff; font-size: 1rem; margin-bottom: 12px; font-weight: 700;">Brands We Fix</h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px;">
            ${brands.map(b => `<li><a href="/brand/${b.id}" style="color: #94a3b8; text-decoration: none;">${b.name} Repair</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 style="color: #fff; font-size: 1rem; margin-bottom: 12px; font-weight: 700;">Top Newcastle Suburbs</h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px;">
            <li><a href="/phone-repair/kotara" style="color: #94a3b8; text-decoration: none;">Phone Repair Kotara</a></li>
            <li><a href="/phone-repair/lambton" style="color: #94a3b8; text-decoration: none;">Phone Repair Lambton</a></li>
            <li><a href="/phone-repair/charlestown" style="color: #94a3b8; text-decoration: none;">Phone Repair Charlestown</a></li>
            <li><a href="/phone-repair/wallsend" style="color: #94a3b8; text-decoration: none;">Phone Repair Wallsend</a></li>
            <li><a href="/phone-repair/hamilton" style="color: #94a3b8; text-decoration: none;">Phone Repair Hamilton</a></li>
            <li><a href="/phone-repair/jesmond" style="color: #94a3b8; text-decoration: none;">Phone Repair Jesmond</a></li>
            <li><a href="/phone-repair/waratah" style="color: #94a3b8; text-decoration: none;">Phone Repair Waratah</a></li>
            <li><a href="/phone-repair/adamstown" style="color: #94a3b8; text-decoration: none;">Phone Repair Adamstown</a></li>
            <li><a href="/phone-repair/broadmeadow" style="color: #94a3b8; text-decoration: none;">Phone Repair Broadmeadow</a></li>
            <li><a href="/phone-repair/newcastle-west" style="color: #94a3b8; text-decoration: none;">Phone Repair Newcastle West</a></li>
            <li><a href="/phone-repair/cardiff" style="color: #94a3b8; text-decoration: none;">Phone Repair Cardiff</a></li>
            <li><a href="/phone-repair/belmont" style="color: #94a3b8; text-decoration: none;">Phone Repair Belmont</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color: #fff; font-size: 1rem; margin-bottom: 12px; font-weight: 700;">Guides & Quick Links</h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px;">
            <li><a href="/repair-guides" style="color: #94a3b8; text-decoration: none;">Repair Guides Hub</a></li>
            <li><a href="/repair-guides/phone-screen-repair-newcastle" style="color: #94a3b8; text-decoration: none;">Screen Repair Guide</a></li>
            <li><a href="/repair-guides/phone-battery-replacement-newcastle" style="color: #94a3b8; text-decoration: none;">Battery Replacement Guide</a></li>
            <li><a href="/repair-guides/water-damage-phone-repair" style="color: #94a3b8; text-decoration: none;">Water Damage Guide</a></li>
            <li><a href="/repair-guides/iphone-repair-newcastle" style="color: #94a3b8; text-decoration: none;">iPhone Repair Guide</a></li>
            <li><a href="/repair-guides/samsung-repair-newcastle" style="color: #94a3b8; text-decoration: none;">Samsung Repair Guide</a></li>
            <li><a href="/blog" style="color: #94a3b8; text-decoration: none;">Latest Tech Blog</a></li>
            <li><a href="/about-us" style="color: #94a3b8; text-decoration: none;">About Our Lab</a></li>
            <li><a href="/after-hours" style="color: #94a3b8; text-decoration: none;">After-Hours Service</a></li>
            <li><a href="/second-hand-phones" style="color: #94a3b8; text-decoration: none;">Second-Hand Phones</a></li>
            <li><a href="/accessories" style="color: #94a3b8; text-decoration: none;">Phone Accessories</a></li>
            <li><a href="/corporate-repairs" style="color: #94a3b8; text-decoration: none;">Corporate Repairs</a></li>
            <li><a href="/privacy-policy" style="color: #94a3b8; text-decoration: none;">Privacy Policy</a></li>
            <li><a href="/terms-of-service" style="color: #94a3b8; text-decoration: none;">Terms of Service</a></li>
            <li><a href="/sitemap" style="color: #94a3b8; text-decoration: none;">HTML Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div style="max-width: 1200px; margin: 32px auto 0; padding-top: 16px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 0.8rem;">
        <p style="margin: 0;">&copy; 2026 Mayfield Phone Repair. 276 Maitland Rd, Mayfield NSW 2304. Tel: (02) 4049 1735. All rights reserved.</p>
      </div>
    </footer>
  `;

  // Helper to create directories recursively and write html file
  function writePage(
    route: string,
    title: string,
    description: string,
    canonicalUrl: string,
    schemaMarkup: any,
    bodyHtml: string
  ) {
    const safeTitle = escAttr(title);
    const safeDesc = escAttr(description);

    // Generate head overrides tag block
    const headBlock = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_AU" />
    <meta property="og:site_name" content="Mayfield Phone Repair" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${BASE_URL}/logo.png" />
    <meta property="og:image:alt" content="Mayfield Phone Repair Logo" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:domain" content="mayfieldphonerepair.com.au" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${BASE_URL}/logo.png" />
    <meta name="twitter:image:alt" content="Mayfield Phone Repair Logo" />
    <script type="application/ld+json">
      ${JSON.stringify(schemaMarkup, null, 2)}
    </script>
    `;

    // Process index template
    let content = indexTemplate;

    // Replace default index.html <title> and <meta name="description"> completely
    content = content.replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title data-rh="true">${safeTitle}</title>`);
    content = content.replace(/<meta\s[^>]*name="description"[^>]*\/?>/, `<meta data-rh="true" name="description" content="${safeDesc}" />`);
    content = content.replace(/<link\s[^>]*rel="canonical"[^>]*\/?>/g, '');
    
    // Inject rest of meta tags inside <head>
    content = content.replace('</head>', `${headBlock}\n</head>`);

    // Inject rich SEO HTML body with shared nav and footer inside <div id="root"></div> for indexing
    content = content.replace('<div id="root"></div>', `<div id="root">${sharedNav}\n${bodyHtml}\n${sharedFooter}</div>`);

    // Determine target file directory and file path
    const targetDir = route === '' ? DIST_DIR : path.join(DIST_DIR, route);
    const targetFile = path.join(targetDir, 'index.html');

    if (route !== '') {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, content, 'utf-8');
  }

  // 1. Pre-render Home Page (Overwrites dist/index.html optimized)
  const homeTitle = 'Phone Repair Newcastle & Mayfield | Screen & Battery';
  const homeDesc = 'Same-day iPhone 17, 16 & Samsung S26 repairs in Mayfield, Newcastle. Screen fixes, battery replacements & water damage. 4.8★ rated, 90-day warranty.';
  let homeBody = `
    <header>
      <h1>Mayfield Phone Repair | Newcastle's Trusted Mobile Diagnostic Lab</h1>
      <p>Located at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>. Walk-ins welcome daily.</p>
      <p>Call Us: <a href="tel:+61240491735"><strong>(02) 4049 1735</strong></a> | Emergency / After Hours Textline: <strong>0431 618 100</strong></p>
      <p>Trading Hours: Mon–Fri 9:00 AM – 5:00 PM | Sat 10:00 AM – 4:00 PM | <strong>Sun 10:00 AM – 2:00 PM (Open Sundays)</strong></p>
    </header>
    <main>
      <section>
        <h2>Why Newcastle & Hunter Locals Choose Mayfield Phone Repair</h2>
        <ul>
          <li><strong>⭐ 4.8 / 5 Rating from 477+ Google Reviews:</strong> The most recommended independent phone repair center in Newcastle.</li>
          <li><strong>⚡ 30-Minute Turnaround:</strong> Most screen replacements and battery swaps completed on-site while you wait.</li>
          <li><strong>🛡️ 90-Day Comprehensive Warranty:</strong> Full hardware coverage on all installed screens, batteries, and charging ports.</li>
          <li><strong>🔬 Advanced Micro-Soldering:</strong> Motherboard liquid damage recovery, Face ID restoration, and True Tone display programming.</li>
        </ul>
      </section>

      <section>
        <h2>Our Core Professional Mobile Repair Services</h2>
        <ul>
          ${servicesData.map(s => `
            <li>
              <h3><a href="/service/${s.id}">${s.title} Newcastle</a></h3>
              <p>${s.shortDesc}</p>
            </li>
          `).join('')}
        </ul>
      </section>

      <section>
        <h2>Specialist Brand Ecosystem Repairs</h2>
        <ul>
          ${brands.map(b => `
            <li>
              <h3><a href="/brand/${b.id}">${b.name} Phone & Device Repairs</a></h3>
              <p>${b.description}</p>
              <p>Transparent Starting Rates: Screen Replacement from $${b.startingPrice.screen}, Battery Replacement from $${b.startingPrice.battery}</p>
            </li>
          `).join('')}
        </ul>
      </section>

      <section>
        <h2>Newcastle Phone Repair Starting Price Guide (2026)</h2>
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th align="left">Device Brand / Series</th>
              <th align="left">Screen Replacement</th>
              <th align="left">Battery Swap</th>
              <th align="left">Charging Port</th>
              <th align="left">Average Turnaround</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Apple iPhone (11 through 17 Pro Max)</strong></td>
              <td>From $89 – $380 (OLED / Incell options)</td>
              <td>From $89</td>
              <td>From $79</td>
              <td>30 – 45 Minutes</td>
            </tr>
            <tr>
              <td><strong>Samsung Galaxy (S21 through S26 Ultra, A-Series)</strong></td>
              <td>From $149 – $485 (Dynamic AMOLED)</td>
              <td>From $99</td>
              <td>From $79</td>
              <td>45 – 60 Minutes</td>
            </tr>
            <tr>
              <td><strong>Google Pixel (Pixel 7 through 10 Pro)</strong></td>
              <td>From $139 – $320</td>
              <td>From $89</td>
              <td>From $79</td>
              <td>45 Minutes</td>
            </tr>
            <tr>
              <td><strong>Apple iPad & Android Tablets</strong></td>
              <td>From $120 – $250</td>
              <td>From $99</td>
              <td>From $89</td>
              <td>Same Day</td>
            </tr>
            <tr>
              <td><strong>MacBook & Laptops</strong></td>
              <td>From $189</td>
              <td>From $149</td>
              <td>From $99</td>
              <td>24 – 48 Hours</td>
            </tr>
          </tbody>
        </table>
        <p><em>Need an exact fixed quote? Call our technicians directly at <a href="tel:+61240491735">(02) 4049 1735</a> or visit us at 276 Maitland Rd Mayfield.</em></p>
      </section>

      <section>
        <h2>Local Service Areas in Greater Newcastle & Hunter Region</h2>
        <p>We provide rapid walk-in and drop-off repair service for residents across:</p>
        <ul>
          ${suburbs.map(sub => `
            <li>
              <a href="/phone-repair/${sub.id}"><strong>Phone Repair ${sub.name} NSW</strong></a> — ${sub.distance} from our Mayfield shop.
            </li>
          `).join('')}
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions (FAQ)</h2>
        <article>
          <h3>How much does iPhone screen repair cost in Newcastle?</h3>
          <p>iPhone screen replacement in Newcastle at Mayfield Phone Repair starts from $89 for older models (iPhone 8/X/11), $149–$229 for standard OLED models (iPhone 12/13/14/15/16), and up to $380–$485 for high-refresh flagship Pro Max screens. All screen replacements include a 90-day warranty and free diagnostic check.</p>
        </article>
        <article>
          <h3>How long does a phone screen or battery repair take?</h3>
          <p>Most standard iPhone and Samsung screen repairs or battery swaps are completed in 30 to 45 minutes while you wait at our 276 Maitland Rd Mayfield shop. No appointment is needed for walk-in repairs.</p>
        </article>
        <article>
          <h3>Are you open on Sundays in Newcastle?</h3>
          <p>Yes! Mayfield Phone Repair is open on Sundays from 10:00 AM to 2:00 PM, providing weekend emergency phone repairs across Newcastle, Hamilton, Waratah, and Wallsend.</p>
        </article>
        <article>
          <h3>Do your screen repairs retain True Tone and Face ID?</h3>
          <p>Yes. Our senior technicians use specialized micro-programmers to read original display serial codes and transfer them onto new OEM-spec assemblies, preserving Apple True Tone color adaptation and Face ID security.</p>
        </article>
        <article>
          <h3>What warranty do you provide on repairs?</h3>
          <p>All repairs include a comprehensive 90-day hardware warranty covering parts and labor. If the replacement part develops any manufacturer defect, we replace it free of charge.</p>
        </article>
      </section>
    </main>
  `;
  writePage('', homeTitle, homeDesc, BASE_URL, businessLocalSchema, homeBody);
  console.log('✅ Pre-rendered homepage (/).');

  // 2. Pre-render Static Pages
  const staticConfig = [
    {
      route: 'quote',
      title: 'Free Repair Quote | Mayfield Phone Repair — Newcastle',
      desc: 'Get a fast, free repair quote. Same-day iPhone, Samsung & Google repairs in Mayfield, Newcastle. 90-day warranty. Most screens done in under 30 minutes.',
      body: `
        <div class="min-h-screen bg-[#f6f7fb] text-[#0d1b2a] font-sans antialiased">
          <div class="bg-[#0d1b2a] text-[#cdd6e8] text-xs py-2 px-4 font-semibold text-center overflow-x-auto whitespace-nowrap">
            <div class="max-w-7xl mx-auto flex gap-4 items-center justify-center">
              <span>⭐ <b class="text-white">4.7/5</b> from <b class="text-white">363+</b> Google Reviews</span>
              <span>•</span>
              <span><b class="text-white">90-Day</b> Warranty on Repairs</span>
              <span>•</span>
              <span>📍 276 Maitland Rd, Mayfield NSW</span>
            </div>
          </div>
          <header class="relative bg-gradient-to-b from-white to-[#f6f7fb] pt-12 pb-16 overflow-hidden md:py-20 border-b border-slate-100">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div class="lg:col-span-7 space-y-6">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md font-bold text-xl">📱</div>
                  <div>
                    <div class="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</div>
                    <p class="text-xs text-slate-500 font-semibold tracking-wider uppercase">Newcastle's Trusted Diagnostic Lab</p>
                  </div>
                </div>
                <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Instant Price Guarantees &middot; Fully Local
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-none">
                  Cracked, dead or water-damaged? <span class="text-blue-600 block">We'll fix it today.</span>
                </h1>
                <p class="text-slate-600 text-lg leading-relaxed max-w-xl">
                  Most screens and batteries are repaired on-site at Maitland Rd in under 30 minutes. Tell us your device below and get an instant fixed-price quote with zero obligation.
                </p>
                <div class="flex flex-wrap items-center gap-4 text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-lg">
                  <span class="text-amber-500 text-lg font-bold">★★★★★</span>
                  <span class="text-sm font-semibold text-slate-800">Rated 4.7 &middot; Based on 363+ local Google Reviews</span>
                </div>
                <div class="grid grid-cols-2 gap-4 max-w-lg pt-2 text-sm font-semibold text-slate-700">
                  <div class="flex items-center gap-2">✔ Same-day Service</div>
                  <div class="flex items-center gap-2">✔ 90-Day Priority Warranty</div>
                  <div class="flex items-center gap-2">✔ OEM-Spec Components</div>
                  <div class="flex items-center gap-2">✔ No Fix, No Fee Guarantee</div>
                </div>
              </div>
              <div class="lg:col-span-5">
                <div class="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 relative">
                  <div class="absolute -top-3.5 left-8 bg-[#ff7a18] text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-lg">100% Free Instant Quote</div>
                  <form class="space-y-4">
                    <div class="pt-2">
                      <h2 class="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h2>
                      <p class="text-slate-500 text-sm">Fill in details and our Mayfield team will call or text you with a fixed price.</p>
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">Your Name</label>
                        <div class="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 text-sm font-medium">e.g. Alex</div>
                      </div>
                      <div>
                        <label class="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">Mobile Phone Number</label>
                        <div class="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 text-sm font-medium">04xx xxx xxx</div>
                      </div>
                    </div>
                    <div class="w-full bg-gradient-to-r from-[#ff7a18] to-[#e8620a] text-white font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl text-center shadow-lg">Get My Free Quote</div>
                  </form>
                </div>
              </div>
            </div>
          </header>
          <section class="py-16 max-w-6xl mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 class="text-3xl font-black font-display tracking-tight text-slate-900">Transparent Starting Prices</h2>
              <p class="text-slate-500 font-medium">Real, upfront pricing guidelines. Exactly what you pay depends on physical components and model generations.</p>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Apple iPhone</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$129</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$89</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Samsung Galaxy</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$149</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$99</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Google Pixel</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$139</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$89</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Oppo Series</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$119</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$79</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Motorola Devices</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$99</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$69</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Huawei Series</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$129</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$79</div>
                </div>
              </div>
            </div>
          </section>
          <section class="py-16 bg-[#0d1b2a] text-[#cdd6e8]">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <h2 class="text-white text-3xl font-black font-display tracking-tight">Find Us in Mayfield Store</h2>
                <p>Located directly on Maitland Rd, Mayfield. Walk directly into our store for rapid on-site repairs with parking at the rear.</p>
                <p><b>Address:</b> 276 Maitland Rd, Mayfield NSW 2304</p>
                <p><b>Phone:</b> (02) 4049 1735 &middot; After-hours: 0431 618 100</p>
              </div>
              <div class="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 class="text-white font-bold font-display text-lg mb-4">Opening Hours</h3>
                <p>Monday - Friday &middot; 9:00 AM - 5:00 PM</p>
                <p>Saturday &middot; 10:00 AM - 3:00 PM</p>
                <p>Sunday &middot; 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </section>
          <footer class="py-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
            <p class="font-semibold">&copy; 2026 Mayfield Phone Repair &middot; 276 Maitland Rd, Mayfield NSW 2304</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #a1a1a1; text-align: center;">
              Partnered with <a href="https://repairrange.io" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">RepairRange</a> for Australia-wide phone repair price guides.
            </p> 
          </footer>
        </div>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Free Repair Quote",
        "url": `${BASE_URL}/quote`
      }
    },
    {
      route: 'free-quote',
      title: 'Free Repair Quote | Mayfield Phone Repair — Newcastle',
      desc: 'Get a fast, free repair quote. Same-day iPhone, Samsung & Google repairs in Mayfield, Newcastle. 90-day warranty. Most screens done in under 30 minutes.',
      body: `
        <div class="min-h-screen bg-[#f6f7fb] text-[#0d1b2a] font-sans antialiased">
          <div class="bg-[#0d1b2a] text-[#cdd6e8] text-xs py-2 px-4 font-semibold text-center overflow-x-auto whitespace-nowrap">
            <div class="max-w-7xl mx-auto flex gap-4 items-center justify-center">
              <span>⭐ <b class="text-white">4.7/5</b> from <b class="text-white">363+</b> Google Reviews</span>
              <span>•</span>
              <span><b class="text-white">90-Day</b> Warranty on Repairs</span>
              <span>•</span>
              <span>📍 276 Maitland Rd, Mayfield NSW</span>
            </div>
          </div>
          <header class="relative bg-gradient-to-b from-white to-[#f6f7fb] pt-12 pb-16 overflow-hidden md:py-20 border-b border-slate-100">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div class="lg:col-span-7 space-y-6">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md font-bold text-xl">📱</div>
                  <div>
                    <div class="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</div>
                    <p class="text-xs text-slate-500 font-semibold tracking-wider uppercase">Newcastle's Trusted Diagnostic Lab</p>
                  </div>
                </div>
                <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Instant Price Guarantees &middot; Fully Local
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-none">
                  Cracked, dead or water-damaged? <span class="text-blue-600 block">We'll fix it today.</span>
                </h1>
                <p class="text-slate-600 text-lg leading-relaxed max-w-xl">
                  Most screens and batteries are repaired on-site at Maitland Rd in under 30 minutes. Tell us your device below and get an instant fixed-price quote with zero obligation.
                </p>
                <div class="flex flex-wrap items-center gap-4 text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-lg">
                  <span class="text-amber-500 text-lg font-bold">★★★★★</span>
                  <span class="text-sm font-semibold text-slate-800">Rated 4.7 &middot; Based on 363+ local Google Reviews</span>
                </div>
                <div class="grid grid-cols-2 gap-4 max-w-lg pt-2 text-sm font-semibold text-slate-700">
                  <div class="flex items-center gap-2">✔ Same-day Service</div>
                  <div class="flex items-center gap-2">✔ 90-Day Priority Warranty</div>
                  <div class="flex items-center gap-2">✔ OEM-Spec Components</div>
                  <div class="flex items-center gap-2">✔ No Fix, No Fee Guarantee</div>
                </div>
              </div>
              <div class="lg:col-span-5">
                <div class="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 relative">
                  <div class="absolute -top-3.5 left-8 bg-[#ff7a18] text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-lg">100% Free Instant Quote</div>
                  <form class="space-y-4">
                    <div class="pt-2">
                      <h2 class="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h2>
                      <p class="text-slate-500 text-sm">Fill in details and our Mayfield team will call or text you with a fixed price.</p>
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">Your Name</label>
                        <div class="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 text-sm font-medium">e.g. Alex</div>
                      </div>
                      <div>
                        <label class="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">Mobile Phone Number</label>
                        <div class="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 text-sm font-medium">04xx xxx xxx</div>
                      </div>
                    </div>
                    <div class="w-full bg-gradient-to-r from-[#ff7a18] to-[#e8620a] text-white font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl text-center shadow-lg">Get My Free Quote</div>
                  </form>
                </div>
              </div>
            </div>
          </header>
          <section class="py-16 max-w-6xl mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 class="text-3xl font-black font-display tracking-tight text-slate-900">Transparent Starting Prices</h2>
              <p class="text-slate-500 font-medium">Real, upfront pricing guidelines. Exactly what you pay depends on physical components and model generations.</p>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Apple iPhone</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$129</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$89</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Samsung Galaxy</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$149</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$99</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Google Pixel</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$139</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$89</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Oppo Series</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$119</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$79</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Motorola Devices</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$99</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$69</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Huawei Series</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$129</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$79</div>
                </div>
              </div>
            </div>
          </section>
          <section class="py-16 bg-[#0d1b2a] text-[#cdd6e8]">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <h2 class="text-white text-3xl font-black font-display tracking-tight">Find Us in Mayfield Store</h2>
                <p>Located directly on Maitland Rd, Mayfield. Walk directly into our store for rapid on-site repairs with parking at the rear.</p>
                <p><b>Address:</b> 276 Maitland Rd, Mayfield NSW 2304</p>
                <p><b>Phone:</b> (02) 4049 1735 &middot; After-hours: 0431 618 100</p>
              </div>
              <div class="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 class="text-white font-bold font-display text-lg mb-4">Opening Hours</h3>
                <p>Monday - Friday &middot; 9:00 AM - 5:00 PM</p>
                <p>Saturday &middot; 10:00 AM - 3:00 PM</p>
                <p>Sunday &middot; 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </section>
          <footer class="py-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
            <p class="font-semibold">&copy; 2026 Mayfield Phone Repair &middot; 276 Maitland Rd, Mayfield NSW 2304</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #a1a1a1; text-align: center;">
              Partnered with <a href="https://repairrange.io" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">RepairRange</a> for Australia-wide phone repair price guides.
            </p> 
          </footer>
        </div>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Free Repair Quote",
        "url": `${BASE_URL}/free-quote`
      }
    },
    {
      route: 'promo',
      title: 'Free Repair Quote | Mayfield Phone Repair — Newcastle',
      desc: 'Get a fast, free repair quote. Same-day iPhone, Samsung & Google repairs in Mayfield, Newcastle. 90-day warranty. Most screens done in under 30 minutes.',
      body: `
        <div class="min-h-screen bg-[#f6f7fb] text-[#0d1b2a] font-sans antialiased">
          <div class="bg-[#0d1b2a] text-[#cdd6e8] text-xs py-2 px-4 font-semibold text-center overflow-x-auto whitespace-nowrap">
            <div class="max-w-7xl mx-auto flex gap-4 items-center justify-center">
              <span>⭐ <b class="text-white">4.7/5</b> from <b class="text-white">363+</b> Google Reviews</span>
              <span>•</span>
              <span><b class="text-white">90-Day</b> Warranty on Repairs</span>
              <span>•</span>
              <span>📍 276 Maitland Rd, Mayfield NSW</span>
            </div>
          </div>
          <header class="relative bg-gradient-to-b from-white to-[#f6f7fb] pt-12 pb-16 overflow-hidden md:py-20 border-b border-slate-100">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div class="lg:col-span-7 space-y-6">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md font-bold text-xl">📱</div>
                  <div>
                    <div class="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</div>
                    <p class="text-xs text-slate-500 font-semibold tracking-wider uppercase">Newcastle's Trusted Diagnostic Lab</p>
                  </div>
                </div>
                <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Instant Price Guarantees &middot; Fully Local
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-none">
                  Cracked, dead or water-damaged? <span class="text-blue-600 block">We'll fix it today.</span>
                </h1>
                <p class="text-slate-600 text-lg leading-relaxed max-w-xl">
                  Most screens and batteries are repaired on-site at Maitland Rd in under 30 minutes. Tell us your device below and get an instant fixed-price quote with zero obligation.
                </p>
                <div class="flex flex-wrap items-center gap-4 text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-lg">
                  <span class="text-amber-500 text-lg font-bold">★★★★★</span>
                  <span class="text-sm font-semibold text-slate-800">Rated 4.7 &middot; Based on 363+ local Google Reviews</span>
                </div>
                <div class="grid grid-cols-2 gap-4 max-w-lg pt-2 text-sm font-semibold text-slate-700">
                  <div class="flex items-center gap-2">✔ Same-day Service</div>
                  <div class="flex items-center gap-2">✔ 90-Day Priority Warranty</div>
                  <div class="flex items-center gap-2">✔ OEM-Spec Components</div>
                  <div class="flex items-center gap-2">✔ No Fix, No Fee Guarantee</div>
                </div>
              </div>
              <div class="lg:col-span-12 xl:col-span-5">
                <div class="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 relative">
                  <div class="absolute -top-3.5 left-8 bg-[#ff7a18] text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-lg">100% Free Instant Quote</div>
                  <form class="space-y-4">
                    <div class="pt-2">
                      <h2 class="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h2>
                      <p class="text-slate-500 text-sm">Fill in details and our Mayfield team will call or text you with a fixed price.</p>
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">Your Name</label>
                        <div class="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 text-sm font-medium">e.g. Alex</div>
                      </div>
                      <div>
                        <label class="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">Mobile Phone Number</label>
                        <div class="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 text-sm font-medium">04xx xxx xxx</div>
                      </div>
                    </div>
                    <div class="w-full bg-gradient-to-r from-[#ff7a18] to-[#e8620a] text-white font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl text-center shadow-lg">Get My Free Quote</div>
                  </form>
                </div>
              </div>
            </div>
          </header>
          <section class="py-16 max-w-6xl mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 class="text-3xl font-black font-display tracking-tight text-slate-900">Transparent Starting Prices</h2>
              <p class="text-slate-500 font-medium">Real, upfront pricing guidelines. Exactly what you pay depends on physical components and model generations.</p>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Apple iPhone</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$129</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$89</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Samsung Galaxy</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$149</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$99</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Google Pixel</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$139</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$89</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Oppo Series</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$119</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$79</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Motorola Devices</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$99</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$69</div>
                </div>
              </div>
              <div class="bg-white border border-slate-200/50 rounded-2xl p-5 text-center">
                <span class="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">Huawei Series</span>
                <div class="space-y-1">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div class="text-lg font-black text-blue-600 font-display">$129</div>
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div class="text-lg font-black text-[#ff7a18] font-display">$79</div>
                </div>
              </div>
            </div>
          </section>
          <section class="py-16 bg-[#0d1b2a] text-[#cdd6e8]">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <h2 class="text-white text-3xl font-black font-display tracking-tight">Find Us in Mayfield Store</h2>
                <p>Located directly on Maitland Rd, Mayfield. Walk directly into our store for rapid on-site repairs with parking at the rear.</p>
                <p><b>Address:</b> 276 Maitland Rd, Mayfield NSW 2304</p>
                <p><b>Phone:</b> (02) 4049 1735 &middot; After-hours: 0431 618 100</p>
              </div>
              <div class="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 class="text-white font-bold font-display text-lg mb-4">Opening Hours</h3>
                <p>Monday - Friday &middot; 9:00 AM - 5:00 PM</p>
                <p>Saturday &middot; 10:00 AM - 3:00 PM</p>
                <p>Sunday &middot; 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </section>
          <footer class="py-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
            <p class="font-semibold">&copy; 2026 Mayfield Phone Repair &middot; 276 Maitland Rd, Mayfield NSW 2304</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #a1a1a1; text-align: center;">
              Partnered with <a href="https://repairrange.io" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">RepairRange</a> for Australia-wide phone repair price guides.
            </p> 
          </footer>
        </div>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Free Repair Quote",
        "url": `${BASE_URL}/promo`
      }
    },
    {
      route: 'blog',
      title: 'Phone Repair Blog & Tech Guides | Mayfield Phone Repair',
      desc: 'Read the latest phone repair tutorials, battery preservation guides, and device comparison articles from the local Newcastle repair experts.',
      body: `
        <article>
          <h1>Mayfield Phone Repair & Tech Guides</h1>
          <p>Explore our detailed articles and cost guides written by our senior device doctors at 276 Maitland Rd, Mayfield NSW. We provide transparent technical advice on iPhone, Samsung, Google Pixel, and iPad repairs across Newcastle.</p>
          <h2>Latest Phone Repair Articles & Guides</h2>
          <ul>
            ${blogPosts.map(p => `
              <li>
                <h3><a href="/blog/${p.slug}">${p.title}</a></h3>
                <p>${p.excerpt}</p>
              </li>
            `).join('')}
          </ul>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Our Phone Repair Blog",
        "url": `${BASE_URL}/blog`,
        "description": "Tech support blog and guides"
      }
    },
    {
      route: 'about-us',
      title: 'About Us | Mayfield Phone Repair Newcastle',
      desc: 'Learn about our 5-star team, high-quality standards, same-day turnaround fixes, and why Newcastle locals trust us with their smartphones.',
      body: `
        <article>
          <h1>About Mayfield Phone Repair — Newcastle's Trusted Mobile Diagnostic Lab</h1>
          <p>Mayfield Phone Repair is Newcastle's premier independent mobile device repair workshop, conveniently situated at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>. Established to provide local residents, tradespeople, university students, and businesses with transparent, high-standard device repairs, our workshop has grown to become the highest-rated repair destination in the Hunter region with over 477+ five-star Google reviews.</p>
          <p>Unlike franchised shopping mall kiosks that rely on cheap aftermarket glass and quick superficial swaps, our technicians operate a specialized diagnostic laboratory equipped with stereoscopic microscopes, digital rework thermal induction stations, precision laser back glass removal systems, and display serialization micro-programmers. This allows us to perform component-level micro-soldering, motherboard liquid damage restoration, True Tone calibration, and Face ID flex repairs that other shops simply turn away.</p>
          <h2>Our Commitment to Quality & Transparency</h2>
          <p>We believe in upfront honesty with every customer who walks through our doors. We offer a strict <strong>No Fix, No Fee</strong> policy on diagnostics: if our technicians cannot repair your device or retrieve your critical files, you do not pay a single cent. Furthermore, every screen replacement, battery swap, and charging port repair is backed by our comprehensive <strong>90-Day Parts & Labor Warranty</strong>. If any installed component exhibits a manufacturing defect within 90 days, we replace it promptly free of charge.</p>
          <h2>Same-Day Turnaround & Weekend Accessibility</h2>
          <p>We understand that going without your phone disrupts your work, personal life, and banking security. That is why over 90% of our common repairs—including iPhone screen repairs, Samsung battery replacements, and USB-C port cleaning—are completed in just <strong>30 to 45 minutes</strong> while you wait in our comfortable reception or browse local Mayfield cafes. We are open six days during normal trading hours and proudly offer <strong>Sunday trading from 10:00 AM to 2:00 PM</strong> for weekend emergencies.</p>
          <h2>Frequently Asked Questions About Mayfield Phone Repair</h2>
          <article>
            <h3>Where is your Newcastle repair shop located?</h3>
            <p>We are located at 276 Maitland Rd, Mayfield NSW 2304. We offer convenient free street parking directly out front on Maitland Road, as well as easy rear access parking off Havelock Street.</p>
          </article>
          <article>
            <h3>Do you offer a warranty on phone repairs?</h3>
            <p>Yes. Every hardware repair is backed by a 90-day parts and labor warranty covering any manufacturer defects. We use only premium OEM-specification replacement parts.</p>
          </article>
          <article>
            <h3>How long do most phone repairs take?</h3>
            <p>Standard iPhone, Samsung, and Google Pixel screen replacements and battery swaps are completed on-site in 30 to 45 minutes. No booking is required—walk-ins are welcome daily.</p>
          </article>
          <article>
            <h3>Will my personal data be erased during repair?</h3>
            <p>No. Hardware screen, battery, port, and glass repairs do not touch your onboard storage. Your personal photos, contacts, WhatsApp chats, and apps remain safe and intact on your device.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Mayfield Phone Repair",
        "url": `${BASE_URL}/about-us`
      }
    },
    {
      route: 'after-hours',
      title: 'Emergency After-Hours Phone Repair | Mayfield Newcastle',
      desc: 'Emergency and after-hours phone repairs in Newcastle. Cracked screen or liquid spill after hours? Text our on-call tech on 0431 618 100.',
      body: `
        <article>
          <h1>Emergency & After-Hours Phone Repair Newcastle</h1>
          <p>Phone failures rarely happen at a convenient hour. Dropping your iPhone on a Friday night, suffering a sudden liquid spill on a Sunday morning, or experiencing a complete battery blackout before an early Monday morning work shift can leave you stranded without communications, banking, or two-factor authentication. Mayfield Phone Repair offers dedicated emergency and after-hours tech assistance for urgent phone, tablet, and laptop faults across Newcastle and the Hunter region.</p>
          <h2>On-Call Emergency Contact: 0431 618 100</h2>
          <p>If our workshop at 276 Maitland Rd is closed, you can reach our on-call senior technicians by sending a direct SMS to our emergency mobile hotline: <strong>0431 618 100</strong>. Include your device model (e.g., iPhone 15 Pro, Samsung S24 Ultra), a brief description of the fault (e.g., water drop, black screen, swollen battery), and whether you need priority weekend morning drop-off or urgent triage. Our team monitors this textline and responds promptly with guidance and availability.</p>
          <h2>Weekend & Sunday Repair Availability</h2>
          <p>Unlike most Newcastle electronics repair centers and shopping mall franchises that close on Sundays, Mayfield Phone Repair is open on <strong>Sundays from 10:00 AM to 2:00 PM</strong>. This makes our Maitland Road facility the primary weekend emergency tech triage hub for residents across Newcastle, Hamilton, Waratah, Lambton, Wallsend, Kotara, and Charlestown.</p>
          <h2>Critical Situations We Handle Urgently</h2>
          <ul>
            <li><strong>Acute Liquid Damage:</strong> Dropped phones in sinks, baths, or salt water at Merewether or Newcastle Beach requiring immediate ultrasonic drying before motherboard traces corrode.</li>
            <li><strong>Critical Business Screen Failures:</strong> Cracked displays preventing shift workers, couriers, or business owners from accessing essential work tools.</li>
            <li><strong>Swollen Battery Emergencies:</strong> Batteries that have suddenly puffed up, pushing the screen open and posing a severe thermal safety risk.</li>
            <li><strong>Emergency Data Rescue:</strong> Retrieving boarding passes, family photos, or two-factor authentication codes from damaged handsets.</li>
          </ul>
          <h2>Frequently Asked Questions: After-Hours & Emergency Repairs</h2>
          <article>
            <h3>How do I arrange an urgent after-hours repair in Newcastle?</h3>
            <p>Send an SMS to our emergency textline at 0431 618 100 with your handset model and fault description. A technician will text you back with triage advice and drop-off scheduling.</p>
          </article>
          <article>
            <h3>Are you open on Sundays?</h3>
            <p>Yes! Our 276 Maitland Rd Mayfield store is open every Sunday from 10:00 AM to 2:00 PM for walk-in screen, battery, and diagnostic repairs.</p>
          </article>
          <article>
            <h3>What should I do if my phone gets wet after hours?</h3>
            <p>Turn the device off immediately. Do NOT plug it into a charger. Do not put it in rice. Wipe the exterior dry and text our emergency line on 0431 618 100 to arrange early ultrasonic bath cleaning.</p>
          </article>
          <article>
            <h3>Is there an extra fee for Sunday repairs?</h3>
            <p>No! Our standard Sunday trading hours carry our normal, transparent pricing with zero weekend surcharge on parts and labor.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Emergency After Hours Support",
        "url": `${BASE_URL}/after-hours`
      }
    },
    {
      route: 'second-hand-phones',
      title: 'Refurbished & Second-Hand Phones Newcastle | Mayfield',
      desc: 'Certified refurbished & used iPhones and Samsung phones in Newcastle. 40-point tested, unlocked, with local warranty at 276 Maitland Rd Mayfield.',
      body: `
        <article>
          <h1>Certified Refurbished & Used Phones in Newcastle & Mayfield</h1>
          <p>Looking for a reliable smartphone without spending $1,500+ on a brand new flagship? Mayfield Phone Repair offers a curated selection of certified refurbished and thoroughly tested second-hand smartphones at our workshop located at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>. Whether you need an affordable iPhone for school, a dependable Samsung Galaxy for work, or a budget replacement handset, buying refurbished from our diagnostic lab is the safest choice in Newcastle.</p>
          <h2>Why Buy from Mayfield Phone Repair Instead of Online Marketplaces?</h2>
          <p>Buying second-hand phones from online classifieds or social media marketplaces carries significant risks: hidden water damage, counterfeit replacement screens, dying batteries, blacklisted IMEIs, or iCloud/Google activation locks. At Mayfield Phone Repair, every pre-owned handset undergoes our rigorous <strong>40-Point Diagnostic Quality Inspection</strong> before it is approved for sale.</p>
          <h2>Our 40-Point Technical Certification Checklist</h2>
          <ul>
            <li><strong>Battery Health Verified:</strong> Every battery is tested on digital load analyzers to guarantee genuine high capacity and healthy cycle counts.</li>
            <li><strong>Screen & Digitizer:</strong> Original OEM displays tested for multi-touch accuracy, True Tone operation, and color saturation.</li>
            <li><strong>Cameras & Biometrics:</strong> Front and rear camera autofocus, OIS stabilization, Face ID, and optical/ultrasonic fingerprint sensors fully validated.</li>
            <li><strong>Clean IMEI & Network Unlocked:</strong> Guaranteed clean Australian network status (no finance locks, blacklist blocks, or lost/stolen reports). Compatible with Telstra, Optus, and Vodafone.</li>
            <li><strong>Store Warranty Included:</strong> Every device includes our local workshop warranty for total peace of mind.</li>
          </ul>
          <h2>Trade-In Your Broken or Old Handset</h2>
          <p>Have an old iPhone or Samsung sitting in your drawer with a cracked screen or dead battery? Bring it into our Mayfield store for a rapid trade-in appraisal. We offer competitive credit towards any refurbished smartphone in stock, helping you upgrade affordably while keeping electronic waste out of Australian landfills.</p>
          <h2>Frequently Asked Questions: Refurbished Phones Newcastle</h2>
          <article>
            <h3>Do your refurbished phones come with a warranty?</h3>
            <p>Yes. All certified pre-owned handsets sold at Mayfield Phone Repair include our local store warranty covering hardware and performance.</p>
          </article>
          <article>
            <h3>Are the phones unlocked to all Australian networks?</h3>
            <p>Yes. Every second-hand phone we sell is 100% factory unlocked and ready to use on Telstra, Optus, Vodafone, and all MVNO prepaid carriers.</p>
          </article>
          <article>
            <h3>Can you transfer my data from my old phone to the new one?</h3>
            <p>Absolutely. Our technicians provide complimentary or low-cost direct device-to-device data transfers, moving your contacts, photos, WhatsApp messages, and apps seamlessly.</p>
          </article>
          <article>
            <h3>What models do you typically stock?</h3>
            <p>We stock popular models including iPhone 11, 12, 13, 14, and 15 series, as well as Samsung Galaxy S21, S22, S23, S24, and Galaxy A-series handsets. Inventory updates weekly.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Second Hand Phones Newcastle",
        "url": `${BASE_URL}/second-hand-phones`
      }
    },
    {
      route: 'accessories',
      title: 'Phone Cases, Screen Protectors & Chargers | Mayfield',
      desc: 'Premium smartphone cases, 9H tempered glass screen protectors & fast GaN chargers in Newcastle. Free protector installation at 276 Maitland Rd.',
      body: `
        <article>
          <h1>Smartphone Cases, Screen Protectors & Fast Chargers in Newcastle</h1>
          <p>Protecting your smartphone after a professional repair is the smartest way to avoid expensive repeat damage. At Mayfield Phone Repair (<strong>276 Maitland Rd, Mayfield NSW 2304</strong>), we stock a comprehensive range of heavy-duty shockproof protective cases, high-density 9H tempered glass screen protectors, and certified fast chargers for Apple iPhone, Samsung Galaxy, and Google Pixel devices.</p>
          <h2>9H Tempered Glass Protectors with Free Professional Fitting</h2>
          <p>Applying a screen protector at home often results in trapped dust bubbles, misaligned camera cutouts, and peeling edges. When you purchase any tempered glass screen protector at our Mayfield workshop, our technicians provide <strong>complimentary precision dust-free installation</strong> at the counter under bright inspection lighting. Our screen protectors feature oleophobic anti-fingerprint coatings, edge-to-edge curved bevels, and high-impact dispersion layers designed to absorb drop shocks before they reach your delicate OLED display.</p>
          <h2>Heavy-Duty Shockproof & MagSafe Compatible Cases</h2>
          <p>Whether you work on construction job sites around Newcastle and the Port, study at university, or want a slim minimalist profile, we have protective covers to suit your lifestyle. Our collection includes dual-layer shockproof rugged cases, impact-resistant silicone gel covers, and MagSafe-compatible clear cases that support high-speed wireless charging and magnetic car mounts.</p>
          <h2>Certified Fast Chargers & Heavy-Duty Braided Cables</h2>
          <p>Cheap service-station charging cords frequently lack voltage regulator chips, delivering dirty current that burns out delicate motherboard charging ICs (like Apple Tristar/Hydra and Samsung PMICs). We supply high-efficiency GaN (Gallium Nitride) USB-C fast wall adapters (20W, 30W, and 65W) and MFi-compliant braided USB-C and Lightning cables designed for rapid power delivery without overheating your battery.</p>
          <h2>Frequently Asked Questions: Phone Accessories Newcastle</h2>
          <article>
            <h3>Do you install screen protectors for free in-store?</h3>
            <p>Yes! Every screen protector purchased at our Mayfield store is professionally installed by our technicians free of charge with zero dust or bubbles.</p>
          </article>
          <article>
            <h3>Are your chargers safe for new iPhone 16/17 and Samsung S25/S26 models?</h3>
            <p>Yes. All of our chargers utilize certified USB Power Delivery (USB-PD) protocols with built-in thermal and over-voltage safeguards that protect battery longevity.</p>
          </article>
          <article>
            <h3>Which phone brands do you stock cases for?</h3>
            <p>We stock protective cases and accessories for all popular models of Apple iPhone, Samsung Galaxy S and A series, and Google Pixel handsets.</p>
          </article>
          <article>
            <h3>Do you offer bundle discounts with repairs?</h3>
            <p>Yes! Customers receiving a screen replacement or battery swap receive special discounted package pricing on case and tempered glass bundles.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Phone Accessories",
        "url": `${BASE_URL}/accessories`
      }
    },
    {
      route: 'corporate-repairs',
      title: 'Corporate & Fleet Phone Repair Newcastle | Mayfield',
      desc: 'Corporate mobile & tablet fleet repair services in Newcastle. Priority 30-min turnarounds, monthly billing & bulk rates for schools & businesses.',
      body: `
        <article>
          <h1>Corporate, Commercial & Fleet Mobile Repairs in Newcastle</h1>
          <p>In modern Australian business, mobile phones and tablets are frontline tools. When a tradesman's handset suffers a cracked screen on a construction site, a healthcare worker drops an iPad, or an executive's laptop battery fails, business operations grind to a halt. Mayfield Phone Repair delivers rapid, reliable B2B mobile device maintenance and fleet repair solutions for businesses, schools, medical practices, logistics providers, and local government across Newcastle and the Hunter Valley.</p>
          <h2>Why Newcastle Businesses Partner with Mayfield Phone Repair</h2>
          <p>Large national manufacturer service programs often require shipping handsets interstate, taking 7 to 14 business days and performing mandatory factory resets that wipe company data. As a local independent facility at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>, we offer express local turnaround with zero data loss, keeping your staff connected and productive.</p>
          <h2>Key Corporate Account Benefits</h2>
          <ul>
            <li><strong>Priority VIP Queue:</strong> Corporate devices jump to the front of our repair bench for immediate 30 to 45-minute turnaround.</li>
            <li><strong>Consolidated Monthly Invoicing:</strong> Simplified 30-day corporate trading accounts with itemized GST tax invoices and serial tracking.</li>
            <li><strong>Volume Fleet Pricing:</strong> Substantial tiered discounts on bulk screen replacements, battery replacements, and protective gear.</li>
            <li><strong>Zero Data Loss Priority:</strong> Hardware fixes preserve device configurations, MDM profiles, and business applications.</li>
            <li><strong>Dedicated Account Manager:</strong> Direct phone and email access to our senior technical team for quotes and priority scheduling.</li>
          </ul>
          <h2>Devices Serviced Across Your Fleet</h2>
          <p>We service complete corporate ecosystems: Apple iPhone (all series), Apple iPad (Air, Pro, and standard education editions), Samsung Galaxy enterprise smartphones and tablets, Apple MacBooks, and Microsoft Surface devices. From simple broken front glass to liquid spill board repairs, we handle it all under our 90-day comprehensive warranty.</p>
          <h2>Frequently Asked Questions: Corporate Mobile Repairs</h2>
          <article>
            <h3>How do we open a corporate repair account?</h3>
            <p>Contact our Mayfield team at (02) 4049 1735 or visit us at 276 Maitland Rd. We establish corporate billing accounts with flexible 30-day payment terms for verified Australian businesses.</p>
          </article>
          <article>
            <h3>Do you service educational institutions and local schools?</h3>
            <p>Yes! We manage iPad and tablet fleet maintenance for primary schools, high schools, and University of Newcastle departments with express turnaround during term time.</p>
          </article>
          <article>
            <h3>Can you provide pick-up and delivery for fleet repairs?</h3>
            <p>Yes, for local commercial accounts with multiple handsets or regular repair volumes across Newcastle, courier or technician pick-up and drop-off can be arranged.</p>
          </article>
          <article>
            <h3>What warranty is provided on fleet repairs?</h3>
            <p>All fleet repairs carry our standard 90-day parts and labor warranty, backed by full local diagnostic support.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Corporate Device Repairs",
        "url": `${BASE_URL}/corporate-repairs`
      }
    },
    {
      route: 'sitemap',
      title: 'Sitemap | Mayfield Phone Repair',
      desc: 'Complete HTML sitemap for Mayfield Phone Repair. Browse all repair services, device brands, repair guides, and Newcastle suburb landing pages.',
      body: `
        <article>
          <h1>Mayfield Phone Repair Complete Site Directory & Sitemap</h1>
          <p>Welcome to the complete sitemap directory for Mayfield Phone Repair, located at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>. Use the links below to quickly navigate to our repair services, supported device brands, technical repair guides, and Newcastle suburb pages.</p>
          
          <h2>Main Pages & Contact</h2>
          <ul>
            <li><a href="/">Home — Phone Repair Newcastle</a></li>
            <li><a href="/quote">Get a Free Instant Quote</a></li>
            <li><a href="/about-us">About Mayfield Phone Repair Lab</a></li>
            <li><a href="/after-hours">Emergency After-Hours Repair Service</a></li>
            <li><a href="/second-hand-phones">Refurbished & Second-Hand Phone Sales</a></li>
            <li><a href="/accessories">Phone Cases, Screen Protectors & Fast Chargers</a></li>
            <li><a href="/corporate-repairs">Corporate & Commercial Fleet Repairs</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service & 90-Day Warranty</a></li>
            <li><a href="/blog">Technology & Repair Blog</a></li>
          </ul>

          <h2>Specialist Repair Services</h2>
          <ul>
            ${servicesData.map(s => `<li><a href="/service/${s.id}"><strong>${s.title} Newcastle:</strong> ${s.shortDesc}</a></li>`).join('')}
          </ul>

          <h2>Supported Device Brands</h2>
          <ul>
            ${brands.map(b => `<li><a href="/brand/${b.id}"><strong>${b.name} Phone Repair:</strong> Screen from $${b.startingPrice.screen}, Battery from $${b.startingPrice.battery}</a></li>`).join('')}
          </ul>

          <h2>Technical Repair & Cost Guides</h2>
          <ul>
            <li><a href="/repair-guides">Repair Guides & FAQ Hub</a></li>
            <li><a href="/repair-guides/phone-screen-repair-newcastle">Phone Screen Repair Newcastle Guide (OLED vs LCD vs Incell)</a></li>
            <li><a href="/repair-guides/iphone-repair-newcastle">Complete iPhone Repair Guide Newcastle</a></li>
            <li><a href="/repair-guides/samsung-repair-newcastle">Samsung Galaxy Repair Guide Newcastle (S-Series & Z-Fold)</a></li>
            <li><a href="/repair-guides/phone-battery-replacement-newcastle">Phone Battery Replacement Guide Newcastle</a></li>
            <li><a href="/repair-guides/water-damage-phone-repair">Emergency Water Damage Phone Repair Guide (First 60 Mins)</a></li>
          </ul>

          <h2>Newcastle & Hunter Valley Suburbs Served</h2>
          <ul>
            <li><a href="/phone-repair/kotara">Phone Repair Kotara NSW</a></li>
            <li><a href="/phone-repair/lambton">Phone Repair Lambton NSW</a></li>
            <li><a href="/phone-repair/charlestown">Phone Repair Charlestown NSW</a></li>
            <li><a href="/phone-repair/wallsend">Phone Repair Wallsend NSW</a></li>
            <li><a href="/phone-repair/hamilton">Phone Repair Hamilton NSW</a></li>
            <li><a href="/phone-repair/jesmond">Phone Repair Jesmond NSW</a></li>
            <li><a href="/phone-repair/waratah">Phone Repair Waratah NSW</a></li>
            <li><a href="/phone-repair/adamstown">Phone Repair Adamstown NSW</a></li>
            <li><a href="/phone-repair/broadmeadow">Phone Repair Broadmeadow NSW</a></li>
            <li><a href="/phone-repair/newcastle-west">Phone Repair Newcastle West NSW</a></li>
            <li><a href="/phone-repair/cardiff">Phone Repair Cardiff NSW</a></li>
            <li><a href="/phone-repair/belmont">Phone Repair Belmont NSW</a></li>
          </ul>

          <h2>Frequently Asked Questions: Site Navigation</h2>
          <article>
            <h3>How do I get an exact quote for my device?</h3>
            <p>Visit our <a href="/quote">Free Quote Page</a> or call our workshop directly at <a href="tel:+61240491735">(02) 4049 1735</a> for immediate over-the-phone fixed pricing.</p>
          </article>
          <article>
            <h3>Where is the repair store located?</h3>
            <p>Our workshop is at 276 Maitland Rd, Mayfield NSW 2304, featuring convenient on-street and rear parking.</p>
          </article>
          <article>
            <h3>Are all repairs covered by warranty?</h3>
            <p>Yes. All hardware repairs are backed by our 90-day parts and labor warranty as outlined in our Terms of Service.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Site Index",
        "url": `${BASE_URL}/sitemap`
      }
    },
    {
      route: 'repair-guides/phone-screen-repair-newcastle',
      title: 'Phone Screen Repair Newcastle: 2026 Guide | Mayfield',
      desc: 'Newcastle phone screen repair guide: Soft OLED vs Hard OLED vs Incell LCD, True Tone programming, pricing from $89, and salt-air protection in Mayfield.',
      body: `
        <article>
          <h1>Phone Screen Repair Newcastle: Technical & Pricing Guide (2026)</h1>
          <p>Everything you need to know about screen replacement costs, display panel technologies (OLED vs LCD vs Incell), OEM vs aftermarket quality, True Tone restoration, and protecting your device against Newcastle salt-air corrosion.</p>
          
          <h2>Comprehensive Screen Repair Options & Pricing in Newcastle</h2>
          <p>When a smartphone screen shatters, owners face a confusing array of choices—from cheap mall kiosks to high-priced official factory repairs. In Newcastle and Mayfield, screen replacement costs vary based on display panel technology, device generation, and component grade. At Mayfield Phone Repair (276 Maitland Rd), we provide transparent upfront quotes starting from $89 for standard iPhone models up to $485 for dynamic high-refresh-rate OLED panels on flagships like the iPhone 17 Pro Max or Samsung Galaxy S26 Ultra.</p>
          
          <h2>Display Panel Technologies Explained: OLED vs. LCD vs. Incell</h2>
          <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th>Display Panel Type</th>
                <th>Color & Contrast Spec</th>
                <th>Touch Response</th>
                <th>Battery Efficiency</th>
                <th>Best For</th>
                <th>Price Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Soft OLED (OEM Grade)</strong></td>
                <td>100% True Black, Infinite Contrast (1:1 Factory Spec)</td>
                <td>Instant 120Hz ProMotion / High Sampling</td>
                <td>Original Factory Efficiency</td>
                <td>Daily Drivers, iPhone 12–17, Galaxy S-Series</td>
                <td>$169 – $380</td>
              </tr>
              <tr>
                <td><strong>Hard OLED</strong></td>
                <td>High contrast, slightly thicker glass substrate</td>
                <td>High Responsiveness (60Hz–120Hz)</td>
                <td>Standard OLED Draw</td>
                <td>Mid-budget repairs needing true blacks</td>
                <td>$139 – $240</td>
              </tr>
              <tr>
                <td><strong>Incell LCD</strong></td>
                <td>Standard backlighting (dark grays instead of true blacks)</td>
                <td>Good responsiveness, standard 60Hz</td>
                <td>10–15% higher battery draw due to constant backlight</td>
                <td>Budget repairs, older models, trade-ins</td>
                <td>$89 – $149</td>
              </tr>
            </tbody>
          </table>

          <h2>Original OEM vs. Aftermarket Parts: What You Must Know</h2>
          <p>Not all replacement screens are created equal. Cheap aftermarket screens often suffer from dull color reproduction, poor digitizer touch sensitivity, laggy scrolling, and fragile glass that cracks under light stress. OEM-spec assemblies preserve factory contrast, touch responsiveness, and structural durability. We provide full transparency on part grades before work begins.</p>
          
          <h2>True Tone Restoration & Biometric Security (Face ID / Fingerprint)</h2>
          <p>Modern Apple and Samsung devices sync display components with the motherboard via microchip serial numbers. Standard screen swaps without hardware programming disable True Tone ambient color adaptation and trigger non-genuine display warnings. At Mayfield Phone Repair, our senior technicians use micro-programmers to read your original screen serial code and write it onto the replacement panel, preserving True Tone, Face ID, and optical under-display fingerprint sensors.</p>
          
          <h2>Newcastle Coastal Salt-Air Corrosion & Humidity Risks</h2>
          <p>Operating a phone with cracked glass in Newcastle presents a unique coastal environmental hazard. High relative humidity and airborne salt spray from nearby Merewether, Nobby’s Beach, and Port of Newcastle enter glass micro-fractures. Salt crystals accelerate galvanic corrosion on internal display flex connectors and solder joints, turning a simple glass fix into a costly total display digitizer failure or motherboard short circuit.</p>
          
          <h2>Frequently Asked Questions About Screen Repair</h2>
          <article>
            <h3>How much does iPhone screen repair cost in Newcastle?</h3>
            <p>iPhone screen replacement in Newcastle at Mayfield Phone Repair starts from $89 for older models (iPhone 8/X/11), $149–$229 for standard OLED models (iPhone 12/13/14/15/16), and up to $380–$485 for high-refresh flagship Pro Max screens. All screen replacements include a 90-day warranty and free diagnostic check.</p>
          </article>
          <article>
            <h3>How long does a screen replacement take?</h3>
            <p>Most iPhone and Samsung screen repairs are completed within 30 to 45 minutes at our 276 Maitland Rd Mayfield shop. Walk-ins are welcome without an appointment.</p>
          </article>
          <article>
            <h3>Will my touchscreen feel the same as original?</h3>
            <p>Yes. Our OEM-specification replacement screens provide full native touch sampling rates, multi-touch gesture responsiveness, and high oleophobic finger-glide feel.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Phone Screen Repair Guide Newcastle",
        "url": `${BASE_URL}/repair-guides/phone-screen-repair-newcastle`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does iPhone screen repair cost in Newcastle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "iPhone screen replacement in Newcastle at Mayfield Phone Repair starts from $89 for older models (iPhone 8/X/11), $149–$229 for standard OLED models (iPhone 12/13/14/15/16), and up to $380–$485 for high-refresh flagship Pro Max screens."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a screen replacement take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most iPhone and Samsung screen repairs are completed within 30 to 45 minutes at our 276 Maitland Rd Mayfield shop. Walk-ins are welcome without an appointment."
            }
          }
        ]
      }
    },
    {
      route: 'repair-guides/iphone-repair-newcastle',
      title: 'iPhone Repair Newcastle Guide | Mayfield Phone Repair',
      desc: 'Newcastle iPhone repair guide: iPhone 11 to iPhone 17 Pro Max screen replacements, battery swaps, True Tone restoration, and 90-day warranty in Mayfield.',
      body: `
        <article>
          <h1>Complete iPhone Repair Guide for Newcastle & Hunter Region</h1>
          <p>Looking for professional iPhone repair services in Newcastle? Mayfield Phone Repair at <strong>276 Maitland Rd, Mayfield NSW 2304</strong> is the Hunter Valley's premier destination for fast, reliable iPhone restoration. We service all generations from iPhone 8 and iPhone 11 through iPhone 16 and iPhone 17 Pro Max with 30-minute turnarounds, transparent pricing, and our 90-day comprehensive parts warranty.</p>
          
          <h2>Common iPhone Issues We Fix Daily in Newcastle</h2>
          <p>With thousands of iPhones in circulation across Newcastle, our workshop sees a regular variety of common hardware faults caused by daily drops, water exposure, and battery wear:</p>
          <ul>
            <li><strong>Shattered Front Ceramic Shield Glass:</strong> Fractured outer glass, unresponsive digitizers, or OLED display bleed showing vertical colored lines.</li>
            <li><strong>Laser Back Glass Replacement:</strong> Shattered rear glass removed using precision cold-laser systems without opening the front chassis.</li>
            <li><strong>Battery Degradation & Throttle Warnings:</strong> Swapping depleted cells (health under 80%) for fresh 0-cycle batteries in 25–30 minutes.</li>
            <li><strong>Lightning & USB-C Port Faults:</strong> Cleaning out packed industrial lint or soldering new charging flexes to restore fast charging.</li>
            <li><strong>Camera Lens Glass Fractures:</strong> Replacing cracked sapphire camera rings to eliminate photo blur and protect image sensor optics.</li>
          </ul>

          <h2>True Tone Serialization & Face ID Preservation</h2>
          <p>Apple pairs display and biometric hardware to the motherboard via encrypted cryptographic handshakes. Standard kiosk repairs disable True Tone ambient lighting adaptation and can trigger unwanted warning messages. At Mayfield Phone Repair, our senior technicians use EEPROM serialization micro-programmers to clone your original screen serial numbers directly onto the replacement panel, preserving True Tone, auto-brightness, and Face ID biometric security.</p>

          <h2>Frequently Asked Questions: iPhone Repairs Newcastle</h2>
          <article>
            <h3>How much does an iPhone screen repair cost in Newcastle?</h3>
            <p>iPhone screen repairs start from $89 for older models (iPhone 8/11), $129–$169 for standard OLED screens (iPhone 12/13/14), and up to $380+ for flagship Pro Max displays.</p>
          </article>
          <article>
            <h3>Will Face ID still work after an iPhone screen repair?</h3>
            <p>Yes! We carefully transplant your original ear speaker flex cable containing the infrared flood illuminator, ensuring Face ID remains 100% functional.</p>
          </article>
          <article>
            <h3>How long does an iPhone battery swap take?</h3>
            <p>Most iPhone battery replacements take approximately 25 to 30 minutes while you wait at our 276 Maitland Rd workshop.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Complete iPhone Repair Guide for Newcastle",
        "url": `${BASE_URL}/repair-guides/iphone-repair-newcastle`
      }
    },
    {
      route: 'repair-guides/samsung-repair-newcastle',
      title: 'Samsung Galaxy Repair Guide Newcastle | Mayfield',
      desc: 'Samsung Galaxy repair guide Newcastle: Dynamic AMOLED screens, battery swaps, curved glass fixes, and Z Fold/Flip hinge servicing at Mayfield.',
      body: `
        <article>
          <h1>Samsung Galaxy Repair Guide in Newcastle NSW</h1>
          <p>Samsung Galaxy devices feature some of the most technologically advanced Dynamic AMOLED 2X displays, curved edge glass, and flexible folding mechanisms on the consumer market. When your Galaxy device is damaged, choosing an experienced repair center is essential. At Mayfield Phone Repair (<strong>276 Maitland Rd, Mayfield NSW 2304</strong>), we provide expert same-day servicing for Galaxy S-Series, Galaxy A-Series, Galaxy Note, and Galaxy Z Fold/Flip handsets.</p>

          <h2>Specialized Samsung Dynamic AMOLED 2X Display Fixes</h2>
          <p>Samsung's flagship 120Hz AMOLED panels deliver up to 2600 nits of peak brightness and integrate ultrasonic in-display fingerprint sensors. Low-grade aftermarket screens can permanently disable biometric fingerprint unlocking and produce dull colors. We install OEM-grade AMOLED assemblies with integrated ultrasonic biometric layers, restoring full factory display performance, deep blacks, and instant biometric authentication.</p>

          <h2>Galaxy Z Fold & Z Flip Flexible Screen & Hinge Servicing</h2>
          <p>Foldable devices require delicate handling due to their Ultra Thin Glass (UTG) flexible screens and complex internal gear hinges. If your Galaxy Z Fold or Z Flip is lifting at the crease, exhibiting black ink bleed, or refusing to open completely flat, our technicians dismantle the housing, clear debris from the internal gear tracks, and install factory-grade flexible folding display assemblies.</p>

          <h2>Frequently Asked Questions: Samsung Galaxy Repairs Newcastle</h2>
          <article>
            <h3>Will my fingerprint reader work after a Samsung screen replacement?</h3>
            <p>Yes. We install OEM-specification Dynamic AMOLED screens that support ultrasonic and optical in-display fingerprint calibration.</p>
          </article>
          <article>
            <h3>Can you fix the "Moisture Detected" warning on Samsung phones?</h3>
            <p>Yes. We perform ultrasonic deoxidization and chemical cleaning of the USB-C port, or replace the charging sub-board in 35–45 minutes.</p>
          </article>
          <article>
            <h3>How much does a Samsung screen repair cost?</h3>
            <p>Samsung Galaxy A-series screens start from $99, while flagship S-series and Ultra AMOLED replacements start from $149 to $399 depending on the model.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Samsung Galaxy Repair Guide in Newcastle NSW",
        "url": `${BASE_URL}/repair-guides/samsung-repair-newcastle`
      }
    },
    {
      route: 'repair-guides/phone-battery-replacement-newcastle',
      title: 'Phone Battery Replacement Newcastle Guide | Mayfield',
      desc: 'Phone battery replacement Newcastle guide: battery degradation cycles, summer swelling hazards, 30-minute swap times, and OEM-spec cell pricing.',
      body: `
        <article>
          <h1>Phone Battery Replacement Newcastle: Complete Technical Guide</h1>
          <p>Is your iPhone, Samsung Galaxy, or Google Pixel struggling to hold a charge throughout the day? Smartphone batteries rely on lithium-ion cobalt chemistry, which naturally degrades with every charge and discharge cycle. At Mayfield Phone Repair (<strong>276 Maitland Rd, Mayfield NSW 2304</strong>), our technicians perform express 25 to 30-minute battery replacements using fresh, high-capacity 0-cycle cells backed by our 90-day warranty.</p>

          <h2>Understanding Battery Degradation & Charge Cycles</h2>
          <p>Most modern smartphone batteries are engineered to retain up to 80% of their original capacity across 500 complete charge cycles (roughly 18 to 24 months of daily use). Beyond this threshold, internal chemical resistance increases rapidly. This leads to common symptoms including sudden shutdowns at 20% to 30% remaining charge, CPU thermal throttling causing sluggish app responsiveness, and the device feeling uncomfortably hot during basic browsing.</p>

          <h2>The Danger of Swollen Batteries in Newcastle Summers</h2>
          <p>During Newcastle's hot summer months, elevated ambient temperatures combined with fast-charging currents can trigger thermal runaway inside degraded lithium pouches. Electrolyte breakdown generates pressurized gas, causing the battery cell to physically swell. A bulging battery exerts massive mechanical pressure from inside the phone, cracking rear glass panels, lifting OLED displays, and posing a serious fire safety hazard. If your screen or back cover is lifting, bring it to our Mayfield workshop immediately for safe neutralization.</p>

          <h2>Frequently Asked Questions: Battery Replacements Newcastle</h2>
          <article>
            <h3>How long does a phone battery replacement take?</h3>
            <p>Our technicians complete iPhone and Android battery replacements in just 25 to 30 minutes while you wait at our Maitland Rd store.</p>
          </article>
          <article>
            <h3>How much does a new phone battery cost in Newcastle?</h3>
            <p>Phone battery replacements start from $69 for budget Android phones, $89 for iPhone 8 through iPhone 12, and $99–$129 for newer flagship models.</p>
          </article>
          <article>
            <h3>Do you safely dispose of old depleted batteries?</h3>
            <p>Yes. All depleted lithium cells are stored in fire-safe containers and delivered to certified Australian battery recycling facilities to protect the Hunter environment.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Phone Battery Replacement Newcastle: Complete Technical Guide",
        "url": `${BASE_URL}/repair-guides/phone-battery-replacement-newcastle`
      }
    },
    {
      route: 'repair-guides/water-damage-phone-repair',
      title: 'Dropped Phone in Water? Emergency Guide | Mayfield',
      desc: 'What to do when your phone gets wet in Newcastle. Why dry rice is a myth that worsens corrosion, and why ultrasonic isopropyl baths save logic boards.',
      body: `
        <article>
          <h1>Water Damaged Phone Repair: The Crucial First 60 Minutes</h1>
          <p>Dropping your smartphone into the ocean at Merewether Beach, a swimming pool, a sink, or a toilet is a high-stress emergency. Water ingress causes immediate electrical short-circuits and triggers aggressive galvanic corrosion on delicate logic board microchips. Mayfield Phone Repair (<strong>276 Maitland Rd, Mayfield NSW 2304</strong>) specializes in component-level liquid damage recovery and data rescue. Follow this technical emergency protocol to maximize your device's chances of survival.</p>

          <h2>The First 60 Minutes: Emergency Do's and Don'ts</h2>
          <ul>
            <li><strong>DO NOT Plug in a Charger:</strong> Connecting a wet phone to power sends electric current through water-bridged circuit traces, instantly vaporizing copper tracks and blowing power management ICs.</li>
            <li><strong>DO NOT Put Your Phone in Rice:</strong> Dry rice is an ineffective myth. Rice does not absorb internal moisture sealed inside a phone chassis. Worse, rice starch enters charging ports and speaker grilles, mixing with moisture to form a corrosive paste.</li>
            <li><strong>DO Power Down the Device Immediately:</strong> Turn off the phone immediately to cut active voltage across the motherboard.</li>
            <li><strong>DO Remove SIM Tray & Case:</strong> Take off protective cases and remove the SIM card tray to allow basic airflow venting.</li>
            <li><strong>DO Bring It Directly to Mayfield Phone Repair:</strong> The faster our technicians can dismantle the device and begin ultrasonic chemical cleaning, the higher the success rate.</li>
          </ul>

          <h2>Our 4-Stage Ultrasonic Board Restoration Process</h2>
          <p>At our Mayfield diagnostic facility, we completely disassemble the phone to isolate the bare motherboard. The board is submerged in an industrial ultrasonic cleaning tank filled with 99.9% electronic-grade isopropyl alcohol. High-frequency ultrasonic sound waves create microscopic cavitation bubbles that scrub away mineral salts, flux deposits, and corrosion residue from beneath microscopic surface-mount BGA chips. After baking in a thermal drying oven, we inspect the PCB under 40x stereoscopic magnification and micro-solder any blown capacitors or filters.</p>

          <h2>Frequently Asked Questions: Water Damaged Phones</h2>
          <article>
            <h3>Can data be saved from a water-damaged phone that won't turn on?</h3>
            <p>Yes! Even if the screen is dead and the battery is shorted, our micro-soldering specialists can repair power rails or transplant memory chips to recover irreplaceable photos and contacts.</p>
          </article>
          <article>
            <h3>Why is salt water much more damaging than fresh water?</h3>
            <p>Salt water contains high concentrations of dissolved ions that conduct electricity aggressively and accelerate galvanic corrosion of copper within hours.</p>
          </article>
          <article>
            <h3>How much does water damage assessment cost?</h3>
            <p>We provide upfront diagnostics with transparent pricing starting from $89 for ultrasonic cleaning. We operate under a No Data, No Fee guarantee on data recovery.</p>
          </article>
          <article>
            <h3>How long does the liquid damage restoration process take?</h3>
            <p>A full ultrasonic clean, bake, and micro-solder assessment typically takes 24 to 48 hours to ensure all moisture is eradicated before power is reapplied.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Water Damaged Phone Repair: Emergency 60-Minute Guide",
        "url": `${BASE_URL}/repair-guides/water-damage-phone-repair`
      }
    },
    {
      route: 'repair-guides',
      title: 'Phone Repair Guides | Cost, Timing & Battery Fixes | Mayfield',
      desc: 'Newcastle phone repair guides & FAQ: direct answers on iPhone and Samsung screen repair costs, battery life, turnaround times, and common device issues.',
      body: `
        <article>
          <h1>Newcastle Smartphone Repair Guides & Technical FAQ Hub</h1>
          <p>Welcome to the official technical repair resource hub from Mayfield Phone Repair, Newcastle's trusted independent mobile diagnostic lab at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>. Here you will find clear, jargon-free answers to common device issues, detailed price breakdowns, and maintenance advice for Apple iPhone, Samsung Galaxy, Google Pixel, iPad, and MacBook hardware.</p>

          <h2>Browse Our Specialized Technical Guides</h2>
          <ul>
            <li><a href="/repair-guides/phone-screen-repair-newcastle"><strong>Phone Screen Repair Guide Newcastle:</strong> Soft OLED vs Hard OLED vs Incell LCD display comparisons, True Tone color programming, and coastal salt-air corrosion risks.</a></li>
            <li><a href="/repair-guides/iphone-repair-newcastle"><strong>Complete iPhone Repair Guide:</strong> Model-by-model technical overview covering iPhone 11 through iPhone 17 Pro Max screen fixes, battery health, and Face ID maintenance.</a></li>
            <li><a href="/repair-guides/samsung-repair-newcastle"><strong>Samsung Galaxy Repair Guide:</strong> Dynamic AMOLED 2X displays, curved edge screen replacements, in-display fingerprint sensors, and Galaxy Z Fold/Flip hinge servicing.</a></li>
            <li><a href="/repair-guides/phone-battery-replacement-newcastle"><strong>Phone Battery Replacement Guide:</strong> Lithium-ion cycle degradation, summer thermal swelling risks, unexpected shutdowns, and 30-minute replacement procedures.</a></li>
            <li><a href="/repair-guides/water-damage-phone-repair"><strong>Emergency Water Damage Phone Guide:</strong> The critical first 60 minutes after liquid contact, why dry rice fails, and our 4-stage ultrasonic restoration protocol.</a></li>
          </ul>

          <h2>Frequently Asked Questions: Newcastle Device Repairs</h2>
          <article>
            <h3>How much does a phone screen repair cost in Newcastle?</h3>
            <p>Screen replacement costs range from $89 for older iPhones (iPhone 8/11) to $149–$229 for standard OLED panels, and up to $380+ for dynamic Pro Max flagships. All quotes include parts, labor, and a 90-day warranty.</p>
          </article>
          <article>
            <h3>How fast can you fix my phone?</h3>
            <p>Over 90% of screen replacements and battery swaps are completed on-site in 30 to 45 minutes at our 276 Maitland Rd Mayfield workshop.</p>
          </article>
          <article>
            <h3>Do I need to make an appointment before coming in?</h3>
            <p>No appointment is necessary! Walk-ins are welcome Monday through Saturday from 9am to 5pm, and Sundays from 10am to 2pm.</p>
          </article>
          <article>
            <h3>Will my data stay private and intact during repair?</h3>
            <p>Yes. Hardware repairs do not modify internal storage, and our technicians adhere to strict privacy standards. We never ask for your passwords unless testing requires it with your permission.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Repair Guides",
        "url": `${BASE_URL}/repair-guides`
      }
    },
    {
      route: 'privacy-policy',
      title: 'Privacy Policy | Mayfield Phone Repair Newcastle',
      desc: 'Privacy policy for Mayfield Phone Repair at 276 Maitland Rd, Mayfield NSW. Learn how we handle customer contact details and device data.',
      body: `
        <article>
          <h1>Privacy Policy — Mayfield Phone Repair</h1>
          <p>At Mayfield Phone Repair (located at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>), we take customer privacy and data security with the utmost seriousness. This Privacy Policy details the types of personal information we collect, how that information is utilized, and the strict confidentiality standards we uphold when diagnosing and repairing mobile devices, tablets, and laptops.</p>

          <h2>Information We Collect</h2>
          <p>When you request a repair quote, book a service, or drop off a device at our Mayfield workshop, we may collect the following contact and diagnostic details:</p>
          <ul>
            <li>Customer name, contact mobile phone number, and email address.</li>
            <li>Device brand, model, serial number, IMEI number, and physical condition notes.</li>
            <li>Information regarding the specific fault or symptoms reported.</li>
          </ul>

          <h2>Strict Device Data Confidentiality & Non-Access Guarantee</h2>
          <p>We respect the absolute privacy of the personal files stored on your device. Our technicians adhere to strict operational guidelines:</p>
          <ul>
            <li><strong>Zero Unauthorized Browsing:</strong> Our staff will never browse, inspect, copy, or transfer your personal photos, videos, messages, emails, browsing history, or documents.</li>
            <li><strong>No Passcode Requirement for Most Fixes:</strong> For external repairs (like screen replacements, battery swaps, and back glass), you do not need to provide your lock screen passcode unless comprehensive post-repair hardware testing (such as camera or sensor validation) is explicitly agreed upon.</li>
            <li><strong>Secure Data Recovery:</strong> When performing data recovery services, extracted files are saved directly to an encrypted drive or your designated storage medium and wiped from our temporary workbench systems immediately upon job completion and customer verification.</li>
          </ul>

          <h2>Security & Non-Disclosure of Personal Details</h2>
          <p>We will never sell, rent, trade, or distribute your personal contact information to any third-party marketing companies. Customer records are maintained solely for warranty tracking, tax compliance, and repair communication purposes.</p>

          <h2>Frequently Asked Questions: Privacy & Data Security</h2>
          <article>
            <h3>Do I have to give you my phone password for a screen repair?</h3>
            <p>No. You can keep your device locked. We can test basic display functionality, charging response, and touch digitizer response on the lock screen or emergency dialer without unlocking your device.</p>
          </article>
          <article>
            <h3>Is my data wiped during a phone screen or battery repair?</h3>
            <p>No. Hardware screen and battery replacements do not touch or alter the internal NAND flash storage. Your data remains completely intact.</p>
          </article>
          <article>
            <h3>How do you handle data recovered from water-damaged phones?</h3>
            <p>Recovered data is transferred directly to your external USB storage or new handset and verified with you at the counter, then permanently purged from our testing equipment.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "url": `${BASE_URL}/privacy-policy`
      }
    },
    {
      route: 'terms-of-service',
      title: 'Terms of Service | Mayfield Phone Repair Newcastle',
      desc: 'Terms of service and 90-day repair warranty policy for Mayfield Phone Repair at 276 Maitland Rd Mayfield NSW. Transparent repair standards.',
      body: `
        <article>
          <h1>Terms of Service & 90-Day Warranty Policy</h1>
          <p>These Terms of Service govern the repair, diagnostic, and product sales services provided by Mayfield Phone Repair (ABN registered, located at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>). By booking a repair, submitting a device for diagnostic evaluation, or purchasing accessories, you agree to the conditions set forth below.</p>

          <h2>1. 90-Day Comprehensive Warranty Coverage</h2>
          <p>All hardware repair services and replacement components installed by Mayfield Phone Repair—including screens, batteries, charging ports, cameras, and audio modules—are backed by our <strong>90-Day Parts & Labor Warranty</strong>. If an installed replacement component exhibits a manufacturing defect, malfunction, or failure within 90 days of collection, we will inspect and replace the part free of charge.</p>
          <p><strong>Warranty Exclusions:</strong> The 90-day warranty does not cover subsequent accidental physical damage (such as cracked glass, cracked OLED panels, deep scratches, or bent frames), subsequent liquid ingress, intentional misuse, or unauthorized third-party tampering after collection.</p>

          <h2>2. Australian Consumer Law (ACL) Guarantees</h2>
          <p>Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with our service, you are entitled to cancel your service contract with us and receive a refund or replacement for unconsumed parts. Under ACL Right-to-Repair provisions, independent repairs do not void your statutory rights regarding manufacturer defects.</p>

          <h2>3. Diagnostic Assessment & No Fix, No Fee Guarantee</h2>
          <p>We provide honest, transparent diagnostic evaluations. Under our No Fix, No Fee policy on standard hardware diagnostics, if we assess your handset and determine that it is completely unrepairable, you will not be charged for the diagnostic assessment.</p>

          <h2>4. Customer Data & Backup Responsibility</h2>
          <p>While our technicians take extreme precautions to preserve onboard data during all repairs, hardware operations always carry inherent risks if underlying motherboard circuits or storage controllers are failing. Customers are strongly encouraged to back up their device data to iCloud, Google Drive, or a personal computer prior to service whenever possible. Mayfield Phone Repair is not liable for data loss resulting from pre-existing system corruptions or component failure.</p>

          <h2>5. Unclaimed Devices</h2>
          <p>Devices completed and ready for collection will be stored securely for up to 90 days from the notification date. Devices unclaimed after 90 days following repeated written or phone contact may be recycled or disposed of in accordance with New South Wales Uncollected Goods Act regulations.</p>

          <h2>Frequently Asked Questions: Terms & Warranty</h2>
          <article>
            <h3>What does your 90-day warranty cover?</h3>
            <p>Our warranty covers any defect in parts or labor on the specific repair performed (e.g., touch digitizer unresponsiveness, battery failing to charge, or screen lines not caused by impact).</p>
          </article>
          <article>
            <h3>What voids the repair warranty?</h3>
            <p>Physical drop impacts resulting in new cracks or bruised OLED pixels, subsequent water damage, or opening the device at another shop voids the warranty.</p>
          </article>
          <article>
            <h3>Do you charge an inspection fee if the phone cannot be fixed?</h3>
            <p>No. We operate under a transparent No Fix, No Fee policy for standard diagnostic checks.</p>
          </article>
        </article>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service",
        "url": `${BASE_URL}/terms-of-service`
      }
    }
  ];

  staticConfig.forEach(p => {
    // If this is a duplicate route, canonicalize it to point directly to the primary '/quote' page
    const canonical = (p.route === 'free-quote' || p.route === 'promo')
      ? `${BASE_URL}/quote`
      : `${BASE_URL}/${p.route}`;
    writePage(p.route, p.title, p.desc, canonical, p.schema, p.body);
  });
  console.log(`✅ Pre-rendered ${staticConfig.length} static subpages.`);

  // 3. Pre-render Brand Pages (/brand/:brandId)
  brands.forEach(b => {
    const brandTitle = `${b.name} Phone Repair Newcastle | Mayfield`;
    const brandDesc = `${b.name} phone repair Newcastle. Screens from $${b.startingPrice.screen}, batteries from $${b.startingPrice.battery}. 30-min fixes, 90-day warranty at 276 Maitland Rd Mayfield.`;
    
    // Schema
    const brandSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${b.name} Phone Repair Newcastle`,
      "description": b.longDescription,
      "provider": businessLocalSchema,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "AUD",
        "lowPrice": b.startingPrice.battery,
        "highPrice": b.startingPrice.screen,
        "offerCount": "2"
      }
    };

    // Body
    let brandBody = `
      <article>
        <header>
          <h1>Professional ${b.name} Phone & Device Repairs in Newcastle NSW</h1>
          <p>${b.longDescription}</p>
          <p><strong>Store Address:</strong> 276 Maitland Rd, Mayfield NSW 2304 | <strong>Call Us:</strong> <a href="tel:+61240491735">(02) 4049 1735</a></p>
          <p><strong>Turnaround:</strong> 30–45 Minutes | <strong>Warranty:</strong> 90-Day Comprehensive Parts & Labor</p>
        </header>

        <section>
          <h2>${b.name} Repair Starting Rates in Newcastle (2026)</h2>
          <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th align="left">Service Type</th>
                <th align="left">Starting Price</th>
                <th align="left">Estimated Turnaround</th>
                <th align="left">Warranty Coverage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Screen Replacement (Glass & OLED/LCD)</strong></td>
                <td><strong style="color: #10b981;">From $${b.startingPrice.screen}</strong></td>
                <td>30 to 45 Minutes</td>
                <td>90-Day Guarantee</td>
              </tr>
              <tr>
                <td><strong>Battery Replacement (Fresh 0-Cycle Cell)</strong></td>
                <td><strong style="color: #10b981;">From $${b.startingPrice.battery}</strong></td>
                <td>25 to 30 Minutes</td>
                <td>90-Day Guarantee</td>
              </tr>
              <tr>
                <td><strong>Charging Port Repair & Debris Cleaning</strong></td>
                <td><strong style="color: #10b981;">From $79</strong></td>
                <td>30 Minutes</td>
                <td>90-Day Guarantee</td>
              </tr>
              <tr>
                <td><strong>Water Damage Ultrasonic Treatment</strong></td>
                <td><strong style="color: #10b981;">From $89</strong></td>
                <td>Same Day / 24 Hours</td>
                <td>No Data, No Fee</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Supported ${b.name} Devices & Series</h2>
          <p>We keep replacement screens, batteries, cameras, and charging ports permanently stocked for the following ${b.name} models:</p>
          ${b.deviceCategories.map(cat => `
            <div>
              <h3>${cat.name}</h3>
              <p>${cat.models.join(', ')}</p>
            </div>
          `).join('')}
        </section>

        <section>
          <h2>Why Choose Mayfield Phone Repair for ${b.name} Servicing?</h2>
          <ul>
            ${b.features.map(f => `<li><strong>${f}:</strong> Specialized diagnostic protocols tailored for ${b.name} hardware.</li>`).join('')}
            <li><strong>Component-Level Micro-Soldering:</strong> We repair damaged motherboard traces and power chips instead of quoting costly board replacements.</li>
            <li><strong>Zero Data Loss Guarantee:</strong> Your files, photos, contacts, and personal apps remain untouched throughout hardware repairs.</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions: ${b.name} Repairs</h2>
          <article>
            <h3>How much does a ${b.name} screen repair cost in Newcastle?</h3>
            <p>${b.name} screen replacements start from $${b.startingPrice.screen} depending on your exact model and display panel generation. Call (02) 4049 1735 for a precise over-the-phone quote.</p>
          </article>
          <article>
            <h3>How long does a ${b.name} battery or screen replacement take?</h3>
            <p>Most ${b.name} screen fixes and battery replacements take just 30 to 45 minutes while you wait at our 276 Maitland Rd Mayfield store.</p>
          </article>
          <article>
            <h3>Will my data stay safe during ${b.name} repair?</h3>
            <p>Yes. Hardware repairs do not wipe or modify onboard storage. Your personal data remains 100% safe on your handset.</p>
          </article>
          <article>
            <h3>What warranty is included with ${b.name} repairs?</h3>
            <p>All ${b.name} replacement parts and labor include our comprehensive 90-day warranty against any manufacturing defects.</p>
          </article>
        </section>
      </article>
    `;

    writePage(`brand/${b.id}`, brandTitle, brandDesc, `${BASE_URL}/brand/${b.id}`, brandSchema, brandBody);
  });
  console.log(`✅ Pre-rendered ${brands.length} brand pages (/brand/*).`);

  // 4. Pre-render Service Pages (/service/:serviceId)
  servicesData.forEach(s => {
    const sTitle = escAttr(`${s.title} Services | Mayfield Phone Repair`).length <= 65
      ? `${s.title} Services | Mayfield Phone Repair`
      : `${s.title} | Mayfield Phone Repair`;
    const sDesc = s.shortDesc;

    // Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": s.title,
      "description": s.shortDesc,
      "provider": businessLocalSchema
    };

    // Body content formatting
    let serviceBody = `
      <article>
        <h1>${s.heroTitle || s.title} Newcastle & Mayfield Store Location</h1>
        <p>${s.heroDescription || s.shortDesc}</p>
        <h2>Repair Capabilities</h2>
        <ul>
          ${s.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        ${s.content.map(block => `
          <h2>${block.heading}</h2>
          ${block.text ? `<p>${block.text}</p>` : ''}
          ${block.list ? `<ul>${block.list.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
        `).join('')}
      </article>
    `;

    writePage(`service/${s.id}`, sTitle, sDesc, `${BASE_URL}/service/${s.id}`, serviceSchema, serviceBody);
  });
  console.log(`✅ Pre-rendered ${servicesData.length} service pages (/service/*).`);

  // 5. Pre-render Blog Post Pages (/blog/:slug)
  blogPosts.forEach(post => {
    // Skip future posts just in case React masks them
    if (post.date > TODAY) return;

    let postTitle = post.title;
    if (escAttr(`${postTitle} | Mayfield`).length <= 65) {
      postTitle = `${postTitle} | Mayfield`;
    } else if (escAttr(postTitle).length <= 65) {
      postTitle = postTitle;
    } else {
      while (escAttr(postTitle + '…').length > 65) {
        postTitle = postTitle.slice(0, -1);
      }
      postTitle = postTitle + '…';
    }

    let postDesc = post.excerpt;
    if (escAttr(postDesc).length <= 155) {
      postDesc = postDesc;
    } else {
      while (escAttr(postDesc + '…').length > 155) {
        postDesc = postDesc.slice(0, -1);
      }
      postDesc = postDesc + '…';
    }

    // Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.imageUrl,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": post.author || "Mayfield Phone Repair Team"
      },
      "publisher": businessLocalSchema,
      "description": post.excerpt
    };

    // Body content strips the reactive components and leaves raw html (safely)
    let postBody = `
      <article>
        <header>
          <h1>${post.title}</h1>
          <p>Published: ${post.date} by ${post.author || 'Mayfield Phone Repair'}</p>
          <img src="${post.imageUrl}" alt="${post.title}" />
        </header>
        <div>
          ${post.content}
        </div>
      </article>
    `;

    writePage(`blog/${post.slug}`, postTitle, postDesc, `${BASE_URL}/blog/${post.slug}`, articleSchema, postBody);
  });
  console.log(`✅ Pre-rendered blog articles (/blog/*).`);

  // 6. Pre-render Suburb Pages (/:serviceId/:suburbId)
  let suburbCount = 0;
  suburbs.forEach(suburb => {
    seoServices.forEach(srv => {
      const routeStr = `${srv.id}/${suburb.id}`;
      const canonicalUrl = `${BASE_URL}/${srv.id}/${suburb.id}`;
      const srvDetail = seoServiceDetails[srv.id] || seoServiceDetails['phone-repair'];
      const subTitle = `${srv.name} ${suburb.name} | Mayfield Phone Repair`;
      const rawSubDesc = `${srv.name} in ${suburb.name} NSW. Fast 30-min service at 276 Maitland Rd Mayfield (${suburb.travelTime}). 90-day warranty, 4.8★ rated. Call (02) 4049 1735.`;
      const subDesc = rawSubDesc.length <= 155 ? rawSubDesc : rawSubDesc.slice(0, 154) + '…';

      // Rich multi-entity schema with LocalBusiness + Service + FAQPage
      const subLocalSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["LocalBusiness", "MobilePhoneRepairStore"],
            "@id": `${canonicalUrl}#business`,
            "name": `Mayfield Phone Repair - ${srv.name} for ${suburb.name}`,
            "image": `${BASE_URL}/logo.png`,
            "url": canonicalUrl,
            "telephone": "+61 2 4049 1735",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "276 Maitland Rd",
              "addressLocality": "Mayfield",
              "addressRegion": "NSW",
              "postalCode": "2304",
              "addressCountry": "AU"
            },
            "areaServed": {
              "@type": "AdministrativeArea",
              "name": `${suburb.name} NSW ${suburb.postcode || '2304'}`,
              "containedIn": "Newcastle, NSW, Australia"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "477",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            "name": `${srv.name} for ${suburb.name} NSW`,
            "serviceType": srv.name,
            "provider": {
              "@id": `${canonicalUrl}#business`
            },
            "description": `Professional ${srv.name.toLowerCase()} for customers from ${suburb.name} NSW. Fast 30-minute repairs, 90-day warranty, and certified parts.`
          },
          {
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            "mainEntity": srvDetail.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
      };

      // Rich, high-authority content body (700+ words)
      const subBody = `
        <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #64748b; margin-bottom: 16px;">
          <a href="/">Home</a> &gt; <a href="/service/${srv.id}">${srv.name}</a> &gt; <span>${suburb.name} NSW</span>
        </nav>
        <article>
          <header>
            <h1>${srv.name} Service for Residents in ${suburb.name} NSW</h1>
            <p>Need fast, reliable <strong>${srv.name.toLowerCase()}</strong> in <strong>${suburb.name}</strong>? Don't wait days for mail-in warranty centers. <strong>Mayfield Phone Repair</strong> is your local independent mobile repair workshop at <strong>276 Maitland Rd, Mayfield NSW 2304</strong>, situated <strong>${suburb.distance}</strong> (approximately <strong>${suburb.travelTime}</strong>).</p>
            <p><strong>Call Us:</strong> <a href="tel:+61240491735"><strong>(02) 4049 1735</strong></a> | <strong>Store Hours:</strong> Mon–Fri 9am–5pm | Sat 10am–4pm | <strong>Sun 10am–2pm (Open Sundays)</strong></p>
          </header>

          <section>
            <h2>Getting to Our Mayfield Workshop from ${suburb.name}</h2>
            <div style="background: #f8fafc; padding: 16px; border-radius: 12px; margin: 16px 0; border: 1px solid #e2e8f0;">
              <h3>Driving Directions</h3>
              <p>${suburb.drivingRoute}</p>
              <p><strong>Parking:</strong> Free on-street parking directly out front on Maitland Road, with rear car park access via Havelock Street.</p>
              <h3>Public Transit Options</h3>
              <p>${suburb.transitDirections}</p>
              ${suburb.localContext ? `<p><strong>Local Area Note:</strong> ${suburb.localContext}</p>` : ''}
            </div>
          </section>

          <section>
            <h2>Why ${suburb.name} Locals Choose Mayfield Phone Repair</h2>
            <ul>
              <li><strong>⚡ 30–45 Minute Express Turnaround:</strong> Most standard repairs completed on-site while you wait.</li>
              <li><strong>⭐ 4.8 / 5 Rating from 477+ Google Reviews:</strong> Newcastle's most trusted independent tech repair team.</li>
              <li><strong>🛡️ 90-Day Comprehensive Warranty:</strong> Complete parts and labor coverage on all installations.</li>
              <li><strong>🔬 Advanced Diagnostic Lab:</strong> Micro-soldering, Face ID restoration, and True Tone serialization.</li>
            </ul>
          </section>

          <section>
            <h2>Technical Details: ${srvDetail.techHighlightTitle}</h2>
            <p>${srvDetail.techHighlightDescription}</p>
            <h3>Our 3-Step Precision Repair Process:</h3>
            <ol>
              ${srvDetail.processSteps.map(step => `
                <li><strong>${step.title}:</strong> ${step.desc}</li>
              `).join('')}
            </ol>
          </section>

          <section>
            <h2>${srv.name} Pricing for ${suburb.name} Customers</h2>
            <p>${srvDetail.pricingIntro}</p>
            <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th align="left">Device Model</th>
                  <th align="left">Starting Price</th>
                  <th align="left">Turnaround</th>
                  <th align="left">Warranty</th>
                  <th align="left">Features</th>
                </tr>
              </thead>
              <tbody>
                ${srvDetail.pricingItems.map(item => `
                  <tr>
                    <td><strong>${item.device}</strong></td>
                    <td><strong style="color: #10b981;">${item.priceFrom}</strong></td>
                    <td>${item.turnaround}</td>
                    <td>${item.warranty}</td>
                    <td>${item.features}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p><em>Need an exact quote for your specific device model? Call <a href="tel:+61240491735">(02) 4049 1735</a> for instant over-the-phone pricing.</em></p>
          </section>

          <section>
            <h2>Real Feedback from Newcastle & ${suburb.name} Customers</h2>
            <blockquote>
              <p>"Brought my phone in from ${suburb.name} after cracking the glass. Fixed in 35 minutes flat with True Tone working. Much better price than the shopping mall kiosks." — Sarah M.</p>
            </blockquote>
            <blockquote>
              <p>"They are open on Sundays which was a lifesaver when my battery stopped charging over the weekend. Super honest, fast, and transparent." — Liam T.</p>
            </blockquote>
          </section>

          <section>
            <h2>Frequently Asked Questions (${srv.name} - ${suburb.name})</h2>
            ${srvDetail.faqs.map(faq => `
              <article>
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
              </article>
            `).join('')}
          </section>

          <section>
            <h2>Other Newcastle & Hunter Suburbs We Serve Near ${suburb.name}:</h2>
            <p>
              ${suburb.nearby.map(nb => {
                const matched = suburbs.find(s => s.name.toLowerCase() === nb.toLowerCase());
                const targetSlug = matched ? matched.id : nb.toLowerCase().replace(/\s+/g, '-');
                return `<a href="/${srv.id}/${targetSlug}">${srv.name} ${nb}</a>`;
              }).join(' • ')}
            </p>
          </section>
        </article>
      `;

      writePage(routeStr, subTitle, subDesc, canonicalUrl, subLocalSchema, subBody);
      suburbCount++;
    });
  });
  console.log(`✅ Pre-rendered ${suburbCount} rich suburb & service landing pages (/*/*).`);

  // 7. Pre-render Model-Specific Repair Pages (/:brandPath/:modelSlug)
  let modelCount = 0;
  modelRepairData.forEach(m => {
    const brandPath = m.brand === 'apple' ? 'iphone' : m.brand;
    const routeStr = `${brandPath}/${m.slug}`;
    const canonicalUrl = `${BASE_URL}/${brandPath}/${m.slug}`;

    const modelSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["LocalBusiness", "MobilePhoneRepairStore"],
          "@id": `${BASE_URL}/#organization`,
          "name": "Mayfield Phone Repair",
          "url": BASE_URL,
          "telephone": "+61 2 4049 1735",
          "priceRange": "$$",
          "image": `${BASE_URL}/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "276 Maitland Rd",
            "addressLocality": "Mayfield",
            "addressRegion": "NSW",
            "postalCode": "2304",
            "addressCountry": "AU"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "477"
          }
        },
        {
          "@type": "Service",
          "@id": `${canonicalUrl}#service`,
          "name": m.title,
          "serviceType": `${m.modelName} Repair`,
          "description": m.metaDescription,
          "provider": { "@id": `${BASE_URL}/#organization` },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "AUD",
            "lowPrice": m.pricing.glassOnlyPrice.replace('$', ''),
            "highPrice": m.pricing.fullAssemblyPrice.split('-')[1]?.replace('$', '').trim() || '485',
            "offerCount": "5"
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": m.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        }
      ]
    };

    const modelBody = `
      <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #64748b; margin-bottom: 16px;">
        <a href="/">Home</a> &gt; <a href="${m.brandHubUrl}">${m.brand.toUpperCase()}</a> &gt; <span>${m.modelName}</span>
      </nav>
      <article>
        <header>
          <h1>${m.heroHeadline}</h1>
          <p>${m.heroSubdeck}</p>
          <p><strong>Call Our Technicians:</strong> <a href="tel:+61240491735">(02) 4049 1735</a> | <strong>Walk-in:</strong> 276 Maitland Rd, Mayfield NSW 2304</p>
          <p><strong>Turnaround:</strong> ${m.repairTime} | <strong>Warranty:</strong> ${m.warranty}</p>
        </header>

        <section>
          <h2>${m.modelName} Repair Pricing Guide (Newcastle & Mayfield)</h2>
          <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th align="left">Repair Service</th>
                <th align="left">Estimated Cost</th>
                <th align="left">Turnaround Time</th>
                <th align="left">Warranty Coverage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Screen Glass Refurbishing / Replacement</strong></td>
                <td><strong style="color: #10b981;">${m.pricing.glassOnlyPrice}</strong></td>
                <td>${m.repairTime}</td>
                <td>${m.warranty}</td>
              </tr>
              <tr>
                <td><strong>Full Display Assembly (OLED / LCD)</strong></td>
                <td><strong style="color: #10b981;">${m.pricing.fullAssemblyPrice}</strong></td>
                <td>${m.repairTime}</td>
                <td>${m.warranty}</td>
              </tr>
              <tr>
                <td><strong>Battery Replacement (0-Cycle Cell)</strong></td>
                <td><strong style="color: #10b981;">${m.pricing.batteryPrice}</strong></td>
                <td>25–30 Mins</td>
                <td>${m.warranty}</td>
              </tr>
              <tr>
                <td><strong>Charging Port Repair / Cleaning</strong></td>
                <td><strong style="color: #10b981;">${m.pricing.chargingPortPrice}</strong></td>
                <td>30 Mins</td>
                <td>${m.warranty}</td>
              </tr>
              ${m.pricing.backGlassPrice && m.pricing.backGlassPrice !== 'N/A' ? `
                <tr>
                  <td><strong>Laser Back Glass Replacement</strong></td>
                  <td><strong style="color: #10b981;">${m.pricing.backGlassPrice}</strong></td>
                  <td>45–60 Mins</td>
                  <td>${m.warranty}</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Common ${m.modelName} Faults We Diagnose & Fix Daily</h2>
          ${m.commonIssues.map(issue => `
            <div>
              <h3>${issue.title}</h3>
              <p>${issue.description}</p>
            </div>
          `).join('')}
        </section>

        <section>
          <h2>Hardware Specifications Reference</h2>
          <ul>
            <li><strong>Display Spec:</strong> ${m.specifications.display}</li>
            <li><strong>Battery Spec:</strong> ${m.specifications.batteryCapacity}</li>
            <li><strong>Processor / Architecture:</strong> ${m.specifications.processor}</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions (${m.modelName})</h2>
          ${m.faqs.map(f => `
            <article>
              <h3>${f.question}</h3>
              <p>${f.answer}</p>
            </article>
          `).join('')}
        </section>
      </article>
    `;

    writePage(routeStr, m.title, m.metaDescription, canonicalUrl, modelSchema, modelBody);
    modelCount++;
  });
  console.log(`✅ Pre-rendered ${modelCount} model-specific landing pages (/iphone/*, /samsung/*, /google/*, /ipad/*).`);

  console.log(`🎉 Web Pre-Render successfully completed. Total ${1 + staticConfig.length + brands.length + servicesData.length + blogPosts.length + suburbCount + modelCount} pre-rendered pages generated inside /dist.`);
}

runPrerender().catch(err => {
  console.error('❌ Pre-rendering script process crashed:', err);
  process.exit(1);
});
