import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertTriangle, Phone, MapPin, ChevronDown, FileText } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export default function WarrantyGuidePage() {
  const { openBooking } = useUI();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const canonicalUrl = 'https://mayfieldphonerepair.com.au/phone-repair-warranty-australia-guide';

  const faqs = [
    {
      question: 'Does getting my phone repaired by an independent shop void my ACL rights?',
      answer: 'No! Under Australian Consumer Law (ACL), manufacturers cannot deny warranty claims on unrelated defects simply because an independent shop replaced a screen or battery.'
    },
    {
      question: 'What is covered under the Mayfield 90-day repair warranty?',
      answer: 'Our 90-day warranty covers any functional defect in the installed replacement component (e.g. touch unresponsiveness, battery failing to hold charge, digitizer lifting) and our repair workmanship.'
    },
    {
      question: 'What is NOT covered under the repair warranty?',
      answer: 'Physical drop damage, cracked glass occurring post-repair, liquid submersion, or third-party unauthorized software modifications made after repair are not covered under part warranty.'
    },
    {
      question: 'How do I make a warranty claim in Mayfield?',
      answer: 'Simply bring your device back to 276 Maitland Rd Mayfield with your digital receipt or phone number. We test the part immediately and replace any defective component free of charge.'
    }
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Phone Repair Warranty Australia: Your Rights Under Australian Consumer Law',
    'description': 'Complete guide to consumer rights under Australian Consumer Law (ACL) for phone repair services. 90-day Mayfield warranty, part guarantees & claim steps.',
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
    'datePublished': '2026-02-01',
    'dateModified': '2026-08-01'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((f) => ({
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
        'name': 'Warranty Guide Australia',
        'item': canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Phone Repair Warranty Australia Guide | Australian Consumer Law Rights</title>
        <meta name="description" content="Phone repair warranty rights in Australia under Australian Consumer Law (ACL). 90-day Mayfield guarantee, ACL statutory rights & warranty claim guide." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Phone Repair Warranty Australia Guide" />
        <meta property="og:description" content="Australian Consumer Law rights for phone repairs. 90-day warranty explained at Mayfield Cell Phone Repairs." />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap py-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">Phone Repair Warranty Australia Guide</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="max-w-3xl relative z-10 space-y-6">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> ACL Consumer Protections
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
                Phone Repair Warranty Australia: Your Statutory Rights Under Australian Consumer Law
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Understand your legal protections under Australian Consumer Law (ACL), what the Mayfield 90-day warranty covers, and how statutory guarantees protect your mobile device repairs in Newcastle.
              </p>
            </div>
          </div>

          {/* ACL Protections Overview */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                Australian Consumer Law (ACL) Guarantees on Repair Services
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Under Australian Consumer Law (ACL), every repair service provided in Australia automatically comes with statutory guarantees. When you get your phone or tablet repaired, the repairer is legally required to guarantee that:
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Service Rendered with Due Care & Skill:</strong> The repair technician must possess appropriate qualifications and follow industry procedures.</span>
                </li>
                <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Fit for Purpose:</strong> Replacement components (screens, batteries, charging ports) must perform as specified for a reasonable period.</span>
                </li>
                <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Remedies for Major vs Minor Failures:</strong> If a part fails due to manufacturing defects, consumers are entitled to a free repair, replacement part, or refund under ACL.</span>
                </li>
              </ul>
            </div>

            {/* Mayfield 90-Day Warranty */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                Mayfield Cell Phone Repairs 90-Day Hardware Guarantee
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                In addition to your statutory ACL rights, Mayfield Cell Phone Repairs provides an unconditional <strong>90-day parts and labor warranty</strong> on all screen replacements, battery swaps, camera repairs, and charging port installations.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-3">
                  <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> What IS Covered
                  </h3>
                  <ul className="space-y-2 text-sm text-emerald-800 font-medium">
                    <li>• Touch digitizer unresponsiveness or ghost touch</li>
                    <li>• Display flickering or pixel blackout without drop marks</li>
                    <li>• Battery failing to hold charge or swelling</li>
                    <li>• Loose charging port or microphone failure</li>
                  </ul>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl space-y-3">
                  <h3 className="font-bold text-rose-900 text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600" /> What IS NOT Covered
                  </h3>
                  <ul className="space-y-2 text-sm text-rose-800 font-medium">
                    <li>• Accidental drop impacts causing physical glass cracks</li>
                    <li>• Subsequent liquid submersion or water exposure</li>
                    <li>• Internal LCD/OLED fractures from physical bending</li>
                    <li>• Unauthorized third-party disassembly or software bricking</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Claim */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                How to Make a Warranty Claim in Newcastle
              </h2>
              <ol className="space-y-3 text-slate-700">
                <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  <strong>1) Visit Our Store:</strong> Walk into 276 Maitland Rd, Mayfield NSW 2304.
                </li>
                <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  <strong>2) Provide Contact Info:</strong> We look up your digital tax invoice via your mobile number or name in our database.
                </li>
                <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  <strong>3) Immediate Testing:</strong> Our technician inspects the device for part defects under a stereoscopic microscope.
                </li>
                <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  <strong>4) Instant Replacement:</strong> If defective, we replace the component on the spot in 30 minutes at zero charge.
                </li>
              </ol>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Warranty FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((f, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-5 py-4 font-bold text-slate-900 flex justify-between items-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <span>{f.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 py-4 text-slate-600 text-sm sm:text-base bg-white border-t border-slate-100">
                        {f.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-display">Need a Warranty-Backed Phone Repair?</h3>
            <p className="text-slate-300 max-w-xl mx-auto">Get your screen, battery, or charging port fixed with complete peace of mind in Mayfield.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={openBooking}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                Book a Repair Now
              </button>
              <a
                href="tel:0240491735"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl border border-white/10 transition-all"
              >
                Call (02) 4049 1735
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
