import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { modelRepairData } from '../data/modelData';
import NotFound from './NotFound';
import { ArrowLeft, Clock, ShieldCheck, Wrench, Phone, MapPin, ChevronDown, CheckCircle2, DollarSign } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export default function ModelRepairPage() {
  const { modelSlug } = useParams<{ modelSlug: string }>();
  const { openBooking } = useUI();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modelInfo = modelRepairData.find((m) => m.slug === modelSlug || m.id === modelSlug);

  if (!modelInfo) {
    return <NotFound />;
  }

  const brandPath = modelInfo.brand === 'apple' ? 'iphone' : modelInfo.brand;
  const canonicalUrl = `https://mayfieldphonerepair.com.au/${brandPath}/${modelInfo.slug}`;

  // Build JSON-LD Product & Service Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': modelInfo.title,
    'description': modelInfo.metaDescription,
    'brand': {
      '@type': 'Brand',
      'name': modelInfo.brand.toUpperCase()
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'AUD',
      'lowPrice': modelInfo.pricing.glassOnlyPrice.replace('$', ''),
      'highPrice': modelInfo.pricing.fullAssemblyPrice.split('-')[1]?.replace('$', '').trim() || '500',
      'offerCount': '5'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': modelInfo.faqs.map((f) => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://mayfieldphonerepair.com.au'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': modelInfo.brand.toUpperCase(),
        'item': `https://mayfieldphonerepair.com.au${modelInfo.brandHubUrl}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': modelInfo.modelName,
        'item': canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{modelInfo.title}</title>
        <meta name="description" content={modelInfo.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={modelInfo.title} />
        <meta property="og:description" content={modelInfo.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap py-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link to={modelInfo.brandHubUrl} className="hover:text-blue-600 transition-colors uppercase">{modelInfo.brand}</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate">{modelInfo.modelName}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-12 border border-slate-800 relative overflow-hidden">
            <div className="max-w-3xl relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Model Specialist Page
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {modelInfo.repairTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
                {modelInfo.heroHeadline}
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                {modelInfo.heroSubdeck}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={openBooking}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Wrench className="w-5 h-5" /> Book {modelInfo.modelName} Repair
                </button>
                <a
                  href="tel:0240491735"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-400" /> Call (02) 4049 1735
                </a>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <main className="lg:col-span-8 space-y-10">
              
              {/* Pricing Cards */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display text-slate-900">{modelInfo.modelName} Repair Pricing</h2>
                    <p className="text-sm text-slate-500">Upfront transparent pricing at Mayfield Cell Phone Repairs</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Screen Glass Refurbishing</span>
                    <div className="text-2xl font-extrabold text-blue-600">{modelInfo.pricing.glassOnlyPrice}</div>
                    <p className="text-xs text-slate-500">For outer glass cracks when touch and OLED display work 100%.</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full OLED Display Assembly</span>
                    <div className="text-2xl font-extrabold text-blue-600">{modelInfo.pricing.fullAssemblyPrice}</div>
                    <p className="text-xs text-slate-500">For black pixel spots, vertical lines, or unresponsive touch.</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Battery Replacement</span>
                    <div className="text-2xl font-extrabold text-emerald-600">{modelInfo.pricing.batteryPrice}</div>
                    <p className="text-xs text-slate-500">Fresh high-capacity OEM-spec battery cell with 30-min swap.</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Charging Port Repair</span>
                    <div className="text-2xl font-extrabold text-indigo-600">{modelInfo.pricing.chargingPortPrice}</div>
                    <p className="text-xs text-slate-500">USB-C port cleaning or full port-flex replacement.</p>
                  </div>
                </div>
              </div>

              {/* Common Model Issues */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  Common {modelInfo.modelName} Repairs We Perform
                </h2>
                <div className="space-y-4">
                  {modelInfo.commonIssues.map((issue, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        {issue.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed pl-7">
                        {issue.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications & Warranty */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  Technical Hardware Specifications
                </h2>
                <div className="divide-y divide-slate-100 text-sm">
                  <div className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Display Panel</span>
                    <span className="font-bold text-slate-900 text-right">{modelInfo.specifications.display}</span>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Battery Cell Specs</span>
                    <span className="font-bold text-slate-900 text-right">{modelInfo.specifications.batteryCapacity}</span>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Processor / Board</span>
                    <span className="font-bold text-slate-900 text-right">{modelInfo.specifications.processor}</span>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Standard Repair Warranty</span>
                    <span className="font-bold text-emerald-600 text-right">{modelInfo.warranty}</span>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  {modelInfo.modelName} Repair FAQs
                </h2>
                <div className="space-y-4">
                  {modelInfo.faqs.map((faq, fIdx) => {
                    const isOpen = openFaq === fIdx;
                    return (
                      <div key={fIdx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                          className="w-full text-left px-5 py-4 font-bold text-slate-900 flex justify-between items-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 py-4 text-slate-600 leading-relaxed text-sm bg-white border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Internal Links Navigation */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold font-display">Explore Related Repair Guides & Brand Hub</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Link to={modelInfo.brandHubUrl} className="bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg border border-white/10 transition-colors">
                    View All {modelInfo.brand.toUpperCase()} Repairs
                  </Link>
                  <Link to={modelInfo.pillarGuideUrl} className="bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-lg transition-colors font-semibold">
                    Read Main Repair Guide
                  </Link>
                </div>
              </div>

            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24">
                <h3 className="font-bold text-lg font-display text-slate-900">Mayfield Repair Hub</h3>
                
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <span>276 Maitland Rd, Mayfield NSW 2304</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <a href="tel:0240491735" className="hover:text-blue-600 font-bold">(02) 4049 1735</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Turnaround: {modelInfo.repairTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-700">{modelInfo.warranty}</span>
                  </div>
                </div>

                <button
                  onClick={openBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm uppercase tracking-wider font-display"
                >
                  Book {modelInfo.modelName} Repair
                </button>
              </div>
            </aside>

          </div>

        </div>
      </div>
    </>
  );
}
