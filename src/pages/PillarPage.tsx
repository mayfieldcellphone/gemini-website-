import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { pillarGuides } from '../data/pillarData';
import NotFound from './NotFound';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, ChevronDown, Phone, MapPin, Wrench, DollarSign, ArrowRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export default function PillarPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useUI();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guide = pillarGuides.find((g) => g.slug === slug || g.id === slug);

  if (!guide) {
    return <NotFound />;
  }

  const canonicalUrl = `https://mayfieldphonerepair.com.au/repair-guides/${guide.slug}`;

  // Build JSON-LD FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': guide.faqs.map((f) => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.metaDescription,
    'author': {
      '@type': 'Organization',
      'name': 'Mayfield Cell Phone Repairs'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Mayfield Cell Phone Repairs',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mayfieldphonerepair.com.au/logo.png'
      }
    },
    'mainEntityOfPage': canonicalUrl,
    'datePublished': '2026-01-15',
    'dateModified': '2026-08-01'
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
        'name': 'Repair Guides',
        'item': 'https://mayfieldphonerepair.com.au/repair-guides'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': guide.title,
        'item': canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{guide.title}</title>
        <meta name="description" content={guide.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap py-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link to="/repair-guides" className="hover:text-blue-600 transition-colors">Repair Guides</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate">{guide.title}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-12 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-3xl relative z-10">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full inline-block mb-6">
                Comprehensive 2026 Guide
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight mb-6">
                {guide.heroHeadline}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
                {guide.heroSubdeck}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={openBooking}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <Wrench className="w-5 h-5" /> Book a Repair
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
            
            {/* Main Article Content */}
            <main className="lg:col-span-8 space-y-12">
              
              {/* Pricing Table (if available) */}
              {guide.pricingTable && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-display text-slate-900">{guide.pricingTable.category}</h2>
                      <p className="text-sm text-slate-500">Upfront pricing at Mayfield Cell Phone Repairs (276 Maitland Rd)</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                          <th className="py-3 px-4 font-bold">Device Model</th>
                          <th className="py-3 px-4 font-bold">Screen Repair</th>
                          <th className="py-3 px-4 font-bold">Battery Swap</th>
                          <th className="py-3 px-4 font-bold">Est. Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {guide.pricingTable.items.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900">{item.model}</td>
                            <td className="py-3.5 px-4 text-blue-600 font-bold">{item.screenPrice}</td>
                            <td className="py-3.5 px-4 text-emerald-600 font-bold">{item.batteryPrice}</td>
                            <td className="py-3.5 px-4 text-slate-600">{item.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Guide Content Sections */}
              <div className="space-y-10 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                {guide.sections.map((sec, idx) => (
                  <section key={idx} className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                      {sec.heading}
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                      {sec.content}
                    </p>
                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="space-y-3 mt-4">
                        {sec.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 font-medium text-sm sm:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, fIdx) => {
                    const isOpen = openFaq === fIdx;
                    return (
                      <div key={fIdx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                          className="w-full text-left px-5 py-4 font-bold text-slate-900 flex justify-between items-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 py-4 text-slate-600 leading-relaxed text-sm sm:text-base bg-white border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clustered Related Guides */}
              <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <h2 className="text-2xl font-bold font-display mb-4">Related Repair Guides & Articles</h2>
                <p className="text-indigo-200 text-sm mb-6">Explore detailed sub-topic articles in this topic cluster:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {guide.clusteredPosts.map((post, pIdx) => (
                    <Link
                      key={pIdx}
                      to={`/blog/${post.slug}`}
                      className="bg-white/10 hover:bg-white/20 border border-white/15 p-4 rounded-xl transition-all flex items-center justify-between group"
                    >
                      <span className="font-semibold text-sm group-hover:text-blue-300 transition-colors">{post.title}</span>
                      <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-1 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Quick Contact Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg font-display text-slate-900">Mayfield Cell Phone Repairs</h3>
                  <p className="text-sm text-slate-500">Fast, local device diagnostics and repairs in Newcastle.</p>
                </div>

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
                    <span>Mon-Fri 9AM-5:30PM, Sat 9AM-2PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-700">90-Day Parts & Labor Warranty</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <button
                    onClick={openBooking}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm uppercase tracking-wider font-display"
                  >
                    Book A Repair Now
                  </button>
                  <a
                    href="https://maps.google.com/?q=Mayfield+Cell+Phone+Repairs,+276+Maitland+Rd,+Mayfield+NSW+2304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-center font-bold py-3 rounded-xl transition-all text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

            </aside>

          </div>

        </div>
      </div>
    </>
  );
}
