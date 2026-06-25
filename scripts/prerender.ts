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
  "@type": "LocalBusiness",
  "name": "Mayfield Cell Phone Repairs",
  "image": `${BASE_URL}/logo.png`,
  "@id": `${BASE_URL}`,
  "url": `${BASE_URL}`,
  "telephone": "02 4049 1735",
  "priceRange": "$$",
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
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${BASE_URL}/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${BASE_URL}/logo.png" />
    <script type="application/ld+json">
      ${JSON.stringify(schemaMarkup, null, 2)}
    </script>
    `;

    // Process index template
    let content = indexTemplate;

    // Replace default index.html <title> and <meta name="description"> completely
    content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
    content = content.replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`);
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
  const homeTitle = 'Phone Repair Newcastle & Mayfield | Expert Screen & Battery Fix';
  const homeDesc = 'Same-day iPhone 17, 16 & Samsung S26 repairs in Mayfield, Newcastle. Screen fixes, battery replacements & water damage. 90-day warranty guaranteed.';
  let homeBody = `
    <header>
      <h1>Mayfield Phone Repair - Fast, Local and Specialized Device Diagnostic Centre</h1>
      <p>Located at 276 Maitland Rd, Mayfield NSW 2304. Direct Phone: 02 4049 1735.</p>
      <p>Emergency / After Hours textline: 0431 618 100.</p>
    </header>
    <main>
      <section>
        <h2>Our Core Professional Mobile Repair Services</h2>
        <ul>
          ${servicesData.map(s => `<li><h3>${s.title}</h3><p>${s.shortDesc}</p></li>`).join('')}
        </ul>
      </section>
      <section>
        <h2>Specialist Brand Ecosystem Repairs</h2>
        <ul>
          ${brands.map(b => `<li><h3>${b.name} Repairs</h3><p>${b.description}</p><p>Starting repair pricing: Screen $${b.startingPrice.screen}, Battery $${b.startingPrice.battery}</p></li>`).join('')}
        </ul>
      </section>
      <section>
        <h2>Local Service Areas in Newcastle & Hunter Region</h2>
        <p>Providing trusted desktop, tablet, and smartphone support across:</p>
        <p>${suburbs.map(sub => sub.name).join(', ')}</p>
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
      // route: phone-repair/waratah
      const routeStr = `${srv.id}/${suburb.id}`;
      
      const subTitle = `${srv.name} ${suburb.name} NSW | Fast Same-Day Service`;
      const subDesc = `Searching for ${srv.name.toLowerCase()} in ${suburb.name}? Mayfield Phone Repair is located at 276 Maitland Rd, ${suburb.distance}. Quick 30-min fixes.`;

      // Suburb schema local area served
      const subLocalSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Mayfield Cell Phone Repairs - ${suburb.name} Service Area`,
        "image": `${BASE_URL}/logo.png`,
        "@id": `${BASE_URL}/${routeStr}`,
        "url": `${BASE_URL}/${routeStr}`,
        "telephone": "02 4049 1735",
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
          "state": "NSW"
        },
        "openingHoursSpecification": businessLocalSchema.openingHoursSpecification,
        "geo": businessLocalSchema.geo
      };

      // Create tailored content snippet for raw body
      const subBody = `
        <article>
          <h1>${srv.name} Service for residents in ${suburb.name} NSW</h1>
          <p>Are you based in <strong>${suburb.name}</strong> and locked out with a shattered phone display, a flat battery, or a wet gadget? You don\'t have to deal with shipping delays or slow mail-in repair networks.</p>
          <p><strong>Mayfield Phone Repair</strong> is your premier local specialist, situated at <strong>276 Maitland Rd, Mayfield</strong>, which is <strong>${suburb.distance}</strong>.</p>
          <h2>Why ${suburb.name} Tech Users Choose Us</h2>
          <ul>
            <li><strong>30-Minute Turnaround</strong> on most screen, charging port, and battery swaps</li>
            <li><strong>Premium OEM-Spec Components</strong> that preserve touch response and brightness</li>
            <li><strong>Zero Diagnostic Surcharges</strong> - assessments are 100% free with no obligation</li>
            <li><strong>90-Day Satisfaction Warranty</strong> on all installed screen assemblies and parts</li>
          </ul>
          <h2>Getting Here from ${suburb.name}</h2>
          <p>We are conveniently located directly on Maitland Rd, making us easily accessible via vehicle or public transport from ${suburb.name} and neighboring areas like ${suburb.nearby.join(' and ')}.</p>
          <p>Walk straight in today, or text/call us out of hours for immediate response!</p>
        </article>
      `;

      writePage(routeStr, subTitle, subDesc, `${BASE_URL}/${routeStr}`, subLocalSchema, subBody);
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
