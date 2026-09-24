import fs from 'fs';
import path from 'path';
import { brands } from '../src/data/brands';
import { servicesData } from '../src/data/services';
import { blogPosts } from '../src/data/blogs';
import { suburbs, seoServices } from '../src/data/suburbs';

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

  // Helper to create directories recursively and write html file
  function writePage(
    route: string,
    title: string,
    description: string,
    canonicalUrl: string,
    schemaMarkup: any,
    bodyHtml: string
  ) {
    // Generate head overrides tag block
    const headBlock = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_AU" />
    <meta property="og:site_name" content="Mayfield Phone Repair" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${BASE_URL}/logo.png" />
    <meta property="og:image:alt" content="Mayfield Phone Repair Logo" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:domain" content="mayfieldphonerepair.com.au" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${BASE_URL}/logo.png" />
    <meta name="twitter:image:alt" content="Mayfield Phone Repair Logo" />
    <script type="application/ld+json">
      ${JSON.stringify(schemaMarkup, null, 2)}
    </script>
    `;

    // Process index template
    let content = indexTemplate;

    // Replace default index.html <title> and <meta name="description"> completely
    content = content.replace(/<title[\s\S]*?>[\s\S]*?<\/title>/, `<title data-rh="true">${title}</title>`);
    content = content.replace(/<meta[\s\S]*?name="description"[\s\S]*?\/>/, `<meta data-rh="true" name="description" content="${description}" />`);
    content = content.replace(/<link rel="canonical"[\s\S]*?\/>/g, '');
    
    // Inject rest of meta tags inside <head>
    content = content.replace('</head>', `${headBlock}\n</head>`);

    // Inject rich SEO HTML body inside <div id="root"></div> for indexing
    content = content.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    // Determine target file directory and file path
    const targetDir = route === '' ? DIST_DIR : path.join(DIST_DIR, route);
    const targetFile = path.join(targetDir, 'index.html');

    if (route !== '') {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, content, 'utf-8');
  }

  // 1. Pre-render Home Page (Overwrites dist/index.html optimized)
  const homeTitle = 'Phone Repair Newcastle & Mayfield | Fast Screen & Battery Diagnostics';
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
                    <h2 class="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</h2>
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
                      <h3 class="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h3>
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
                    <h2 class="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</h2>
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
                      <h3 class="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h3>
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
                    <h2 class="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</h2>
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
                      <h3 class="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h3>
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
      title: 'Our Phone Repair Blog & Technology Guides | Mayfield Phone Repair',
      desc: 'Read the latest phone repair tutorials, battery preservation guides, and device comparison articles from the local Newcastle repair experts.',
      body: `<h1>Mayfield Phone Repair & Tech Guides</h1><p>Explore our detailed articles and cost guides written by our senior device doctors.</p><ul>${blogPosts.map(p => `<li><a href="/blog/${p.slug}"><h3>${p.title}</h3></a><p>${p.excerpt}</p></li>`).join('')}</ul>`,
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
      body: `<h1>About Mayfield Phone Repair</h1><p>Founded on Maitland Rd, we are Newcastle\'s highly trusted independent micro-soldering and smartphone restoration crew. We use premium parts and provide a 90-day parts guarantee.</p>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Mayfield Phone Repair",
        "url": `${BASE_URL}/about-us`
      }
    },
    {
      route: 'after-hours',
      title: 'Emergency After-Hours Phone Repair Newcastle | Mayfield Phone Repair',
      desc: 'Locked out, have a critical phone issue, or need a tablet fixed out of hours? Reach our on-call out-of-hours mobile repair textline.',
      body: `<h1>Emergency & After Hours Repairs</h1><p>Phone down at a critical moment? Send a text directly to our mobile 0431 618 100 for out-of-hours urgent tech diagnostics in Newcastle.</p>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Emergency After Hours Support",
        "url": `${BASE_URL}/after-hours`
      }
    },
    {
      route: 'second-hand-phones',
      title: 'REFURBISHED Used & Second-Hand Phone Sales Newcastle | Mayfield',
      desc: 'Looking for a budget phone? Browse our inventory of certified, fully tested, second-hand iPhones and Samsung Galaxy phones with full warranty.',
      body: `<h1>Certified Refurbished & Used Phones Newcastle</h1><p>Save hundreds. We sell top-tier used Apple iPhones and Samsung Galaxy devices, fully optimized and with a solid warranty.</p>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Second Hand Phones Newcastle",
        "url": `${BASE_URL}/second-hand-phones`
      }
    },
    {
      route: 'accessories',
      title: 'Premium Protective Cases, Screen Protectors & Chargers | Mayfield',
      desc: 'Equip your phone with heavy-duty protection. Shop premium shockproof cases, ultra-dense glass protectors, and block chargers at Mayfield.',
      body: `<h1>Premium Protective Gear & Chargers</h1><p>Prevent your next crack. We supply dense tempered glass protectors and Otterbox style cases on-location at Maitland Rd.</p>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Phone Accessories",
        "url": `${BASE_URL}/accessories`
      }
    },
    {
      route: 'corporate-repairs',
      title: 'B2B & Corporate Mobile Device Repair Services Newcastle | Mayfield',
      desc: 'Tailored repair solution plans for corporate employees, schools, and local government fleets. Fast 30-min service and itemized monthly billing.',
      body: `<h1>Corporate and Commercial Repairs Newcastle</h1><p>Keep your employees online. We optimize fleet diagnostics and repairs for local schools and corporate accounts.</p>`,
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
      desc: 'Looking for a specific device, service, suburb, or blog entry? Browse the site hierarchy of Mayfield Phone Repair.',
      body: `<h1>Sitemap</h1><p>Explore the full structure and directories of our local repair facility.</p>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Site Index",
        "url": `${BASE_URL}/sitemap`
      }
    },
    {
      route: 'repair-guides/phone-screen-repair-newcastle',
      title: 'Phone Screen Repair Newcastle: 2026 Technical & Pricing Guide | Mayfield',
      desc: 'Everything you need to know about screen replacement costs in Newcastle: Soft OLED vs Hard OLED vs Incell LCD, True Tone programming, and salt-air humidity protection.',
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
      title: 'iPhone Repair Newcastle Guide | Models, Screens & Batteries | Mayfield',
      desc: 'Complete technical overview for iPhone repairs in Newcastle. From iPhone 11 to iPhone 17 Pro Max: screen replacements, battery degradation, and True Tone restoration.',
      body: `
        <article>
          <h1>Complete iPhone Repair Guide for Newcastle & Hunter Region</h1>
          <p>Fast, reliable iPhone repairs at 276 Maitland Rd, Mayfield. We service all generations from iPhone 11 through iPhone 17 Pro Max with 30-minute turnarounds and a 90-day guarantee.</p>
          <h2>Common iPhone Issues We Fix Daily</h2>
          <ul>
            <li>Shattered Ceramic Shield front glass and rear back glass replacement via precision laser</li>
            <li>Degraded battery health causing unexpected shutdowns and performance throttling</li>
            <li>Faulty Lightning and USB-C charging ports with micro-soldering restoration</li>
            <li>Camera lens scratching and autofocus sensor stabilization failures</li>
          </ul>
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
      title: 'Samsung Galaxy Repair Newcastle Guide | S-Series & Z-Fold | Mayfield',
      desc: 'Expert guide to Samsung Galaxy repairs in Newcastle. Dynamic AMOLED screen fixes, curved glass, battery swaps, and Z Fold/Flip hinge servicing in Mayfield.',
      body: `
        <article>
          <h1>Samsung Galaxy Repair Guide in Newcastle NSW</h1>
          <p>Specialized repair procedures for Samsung Galaxy S21 through S26 Ultra, Galaxy A-series, and foldable Z Fold/Flip models.</p>
          <h2>Samsung Dynamic AMOLED Replacement Process</h2>
          <p>Samsung curved and high-refresh OLED displays require specialized heat-bonding and industrial pressure seals to maintain frame rigidity and water resistance. Our senior techs use calibrated heat tables and factory jigs for flawless fitment.</p>
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
      title: 'Phone Battery Replacement Guide Newcastle | Signs, Chemistry & Costs',
      desc: 'When should you replace your phone battery? Learn about cycle degradation, thermal swelling hazards during Newcastle summers, and OEM vs aftermarket cells.',
      body: `
        <article>
          <h1>Phone Battery Replacement Newcastle: Complete Technical Guide</h1>
          <p>Is your iPhone or Samsung dying in just a few hours? Our 30-minute battery replacement service at 276 Maitland Rd Mayfield installs fresh, high-capacity cells backed by our 90-day warranty.</p>
          <h2>Signs Your Battery Needs Immediate Replacement</h2>
          <ul>
            <li>Battery health reading below 80% or showing "Service Recommended"</li>
            <li>Phone abruptly powering down when battery displays 20% to 40%</li>
            <li>Device running unusually hot during basic browsing or video calls</li>
            <li>Display or back cover lifting due to lithium pouch cell gas swelling</li>
          </ul>
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
      title: 'Dropped Phone in Water? Emergency 60-Minute Guide | Mayfield Phone Repair',
      desc: 'What to do when your phone gets wet in Newcastle. Why dry rice is a myth that worsens corrosion, and why ultrasonic isopropyl baths save logic boards.',
      body: `
        <article>
          <h1>Water Damaged Phone Repair: The Crucial First 60 Minutes</h1>
          <p>Dropping your phone in water or liquid causes instant electrical shorts and accelerates copper trace corrosion. Follow these emergency steps before bringing it to our Mayfield lab:</p>
          <h2>Emergency Do's and Don'ts</h2>
          <ul>
            <li><strong>DO NOT</strong> plug it into a charger. Current flow through wet traces permanently fries logic board ICs.</li>
            <li><strong>DO NOT</strong> put it in dry rice. Rice starch enters ports, creates sticky cement, and does not absorb internal moisture.</li>
            <li><strong>DO</strong> power it down immediately and bring it to 276 Maitland Rd Mayfield for ultrasonic cleaning and corrosion abatement.</li>
          </ul>
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
      title: 'Phone Repair Guides & FAQ | Cost, Timing & Issues | Mayfield',
      desc: 'AI-citable phone repair guides. Direct answers to common questions about iPhone and Samsung screen repair costs, timing, and device issues in Mayfield Newcastle.',
      body: `<h1>AI-Citable Repair Guides & FAQ</h1><p>Clear, direct pricing and technical answers for your specific device issues. No jargon, just straight facts.</p>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Repair Guides",
        "url": `${BASE_URL}/repair-guides`
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
    const brandTitle = `${b.name} Screen Repair & Battery Replacements Newcastle | Mayfield`;
    const brandDesc = `${b.description} Starting screen fixes from $${b.startingPrice.screen}, battery replacements $${b.startingPrice.battery}. Located at 276 Maitland Rd.`;
    
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
        <h1>Professional ${b.name} Phone Repair Services in Newcastle & Mayfield</h1>
        <p>${b.longDescription}</p>
        <h2>Average Maintenance Costs</h2>
        <ul>
          <li>Screen Repairs beginning at: AUD $${b.startingPrice.screen}</li>
          <li>Battery Replacements beginning at: AUD $${b.startingPrice.battery}</li>
        </ul>
        <h2>Covered ${b.name} Model Range</h2>
        ${b.deviceCategories.map(cat => `
          <h3>${cat.name}</h3>
          <p>${cat.models.join(', ')}</p>
        `).join('')}
        <h2>Exclusive Repair Features</h2>
        <ul>
          ${b.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </article>
    `;

    writePage(`brand/${b.id}`, brandTitle, brandDesc, `${BASE_URL}/brand/${b.id}`, brandSchema, brandBody);
  });
  console.log(`✅ Pre-rendered ${brands.length} brand pages (/brand/*).`);

  // 4. Pre-render Service Pages (/service/:serviceId)
  servicesData.forEach(s => {
    const sTitle = `${s.heroTitle || s.title} | Mayfield Phone Repair`;
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

    const postTitle = `${post.title} | Mayfield Phone Repair Blog`;
    // Clean and truncation for excerpt
    const postDesc = post.excerpt.slice(0, 155);

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
      // Primary hub is /phone-repair/:suburbId. All secondary variants canonicalize cleanly to it to eliminate GSC duplicate warnings.
      const canonicalUrl = `${BASE_URL}/phone-repair/${suburb.id}`;
      const subTitle = `${srv.name} ${suburb.name} NSW | Same-Day 30-Min Fix | Mayfield Phone Repair`;
      const subDesc = `Looking for ${srv.name.toLowerCase()} in ${suburb.name}? Mayfield Phone Repair is located at 276 Maitland Rd, ${suburb.distance}. 30-min fixes, 90-day warranty.`;

      // Rich multi-entity schema with LocalBusiness + FAQPage
      const subLocalSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["LocalBusiness", "MobilePhoneRepairStore"],
            "@id": `${BASE_URL}/phone-repair/${suburb.id}#business`,
            "name": `Mayfield Phone Repair - Serving ${suburb.name}`,
            "image": `${BASE_URL}/logo.png`,
            "url": `${BASE_URL}/phone-repair/${suburb.id}`,
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
              "name": suburb.name,
              "containedIn": "Newcastle, NSW, Australia"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "477"
            }
          },
          {
            "@type": "FAQPage",
            "@id": `${BASE_URL}/phone-repair/${suburb.id}#faq`,
            "mainEntity": [
              {
                "@type": "Question",
                "name": `How far is Mayfield Phone Repair from ${suburb.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Our shop at 276 Maitland Rd Mayfield is ${suburb.distance} from ${suburb.name}. Free on-street parking and rear parking are available.`
                }
              },
              {
                "@type": "Question",
                "name": `Do I need to book an appointment from ${suburb.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Walk-ins are welcome Monday to Saturday 9am–5pm and Sundays 10am–2pm. Most screens and batteries are repaired within 30 to 45 minutes while you wait."
                }
              },
              {
                "@type": "Question",
                "name": `What warranty is provided on repairs for ${suburb.name} customers?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All repairs come with a comprehensive 90-day parts and labor warranty covering any manufacturer defects."
                }
              }
            ]
          }
        ]
      };

      // Rich, high-authority content body (600+ words)
      const subBody = `
        <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #64748b; margin-bottom: 12px;">
          <a href="/">Home</a> &gt; <a href="/services">Services</a> &gt; <span>Phone Repair ${suburb.name}</span>
        </nav>
        <article>
          <header>
            <h1>${srv.name} Service for Residents in ${suburb.name} NSW</h1>
            <p>Need urgent phone or gadget repair in <strong>${suburb.name}</strong>? Avoid waiting days for postal mail-in repair centers. <strong>Mayfield Phone Repair</strong> is your local brick-and-mortar repair laboratory at <strong>276 Maitland Rd, Mayfield</strong>, located <strong>${suburb.distance}</strong>.</p>
          </header>

          <section>
            <h2>Why ${suburb.name} Residents Trust Mayfield Phone Repair</h2>
            <ul>
              <li><strong>⚡ 30–45 Minute Express Turnaround:</strong> Walk in with a cracked screen or dead battery and walk out fixed in under an hour.</li>
              <li><strong>⭐ 4.8-Star Rating with 477+ Local Reviews:</strong> Newcastle\'s most reviewed and trusted independent tech repairer.</li>
              <li><strong>🛡️ 90-Day Parts & Labor Guarantee:</strong> Total peace of mind on every OEM-spec display, battery, and charging assembly.</li>
              <li><strong>📅 Open 7 Days:</strong> Open Monday to Friday 9am–5pm, Saturday 10am–4pm, and <strong>Sunday 10am–2pm</strong>.</li>
            </ul>
          </section>

          <section>
            <h2>Common Repairs for ${suburb.name} Customers</h2>
            <ul>
              <li><a href="/service/screen-repair"><strong>Screen Replacements:</strong></a> iPhone 11 through 17 Pro Max, Samsung Galaxy S-Series, and Google Pixel displays restored with True Tone and Face ID functionality.</li>
              <li><a href="/service/battery-replacement"><strong>Battery Swaps:</strong></a> Fresh high-capacity lithium cells to eliminate battery drain, unexpected shutdowns, and overheating.</li>
              <li><a href="/service/water-damage"><strong>Liquid & Water Damage Treatment:</strong></a> Ultrasonic isopropyl board wash and corrosion clearing for dropped phones.</li>
              <li><a href="/service/charging-port-repair"><strong>Charging Port Repair:</strong></a> Cleaning, replacement, and micro-soldering for loose Lightning and USB-C ports.</li>
            </ul>
          </section>

          <section>
            <h2>Starting Repair Rates for ${suburb.name} Customers</h2>
            <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th>Service Type</th>
                  <th>Apple iPhone</th>
                  <th>Samsung Galaxy</th>
                  <th>Google Pixel</th>
                  <th>Turnaround</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Screen Replacement</strong></td>
                  <td>From $89</td>
                  <td>From $149</td>
                  <td>From $139</td>
                  <td>30–45 Mins</td>
                </tr>
                <tr>
                  <td><strong>Battery Replacement</strong></td>
                  <td>From $89</td>
                  <td>From $99</td>
                  <td>From $89</td>
                  <td>30 Mins</td>
                </tr>
                <tr>
                  <td><strong>Charging Port</strong></td>
                  <td>From $79</td>
                  <td>From $79</td>
                  <td>From $79</td>
                  <td>45 Mins</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>Easy Directions from ${suburb.name} to 276 Maitland Rd Mayfield</h2>
            <p>Our workshop is easily accessible from ${suburb.name} via vehicle, public bus routes, or train:</p>
            <p>We are situated on the main Maitland Road strip with easy street parking right outside and adjacent to ${suburb.nearby.join(' and ')}.</p>
            <p><strong>Direct Phone:</strong> <a href="tel:+61240491735">(02) 4049 1735</a> | <strong>Emergency SMS:</strong> 0431 618 100</p>
          </section>

          <section>
            <h2>Frequently Asked Questions for ${suburb.name} Customers</h2>
            <article>
              <h3>How fast can I get my phone fixed if I come from ${suburb.name}?</h3>
              <p>Most screen and battery repairs are completed in 30 to 45 minutes while you wait. You can drop your device off, grab a coffee along Maitland Rd, and pick it up fully tested.</p>
            </article>
            <article>
              <h3>Are walk-ins welcome from ${suburb.name}?</h3>
              <p>Yes, no booking is required. Walk in anytime during open hours (Mon–Fri 9–5, Sat 10–4, Sun 10–2).</p>
            </article>
          </section>
        </article>
      `;

      writePage(routeStr, subTitle, subDesc, canonicalUrl, subLocalSchema, subBody);
      suburbCount++;
    });
  });
  console.log(`✅ Pre-rendered ${suburbCount} suburb area landing pages (/*/*).`);
  console.log(`🎉 Web Pre-Render successfully completed. Total ${1 + staticConfig.length + brands.length + servicesData.length + blogPosts.length + suburbCount} pre-rendered pages generated inside /dist.`);
}

runPrerender().catch(err => {
  console.error('❌ Pre-rendering script process crashed:', err);
  process.exit(1);
});
