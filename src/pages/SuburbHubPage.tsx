import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { suburbHubList, SuburbHubInfo } from '../data/suburbHubData';
import NotFound from './NotFound';
import { MapPin, Clock, Phone, ShieldCheck, Wrench, ChevronDown, CheckCircle2, Navigation, ArrowRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export default function SuburbHubPage() {
  const { suburbSlug } = useParams<{ suburbSlug: string }>();
  const { openBooking } = useUI();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Normalize slug
  const normalizedSlug = suburbSlug ? suburbSlug.toLowerCase().trim() : '';

  // Find suburb hub data
  let hub: SuburbHubInfo | undefined = suburbHubList.find((s) => s.id === normalizedSlug || s.name.toLowerCase() === normalizedSlug.replace(/-/g, ' '));

  if (!hub) {
    // Generate clean fallback for any unlisted suburb
    const formattedName = normalizedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    hub = {
      id: normalizedSlug || 'local-suburb',
      name: formattedName || 'Your Local Area',
      postcode: '2300',
      drivingTime: '5-15 minutes',
      distanceKm: '5-10 km',
      travelRoute: 'via main Newcastle roads into Maitland Rd Mayfield',
      landmarks: ['Local Shopping Strip', 'Community Park', 'Public Transit Route'],
      nearbySuburbs: ['Mayfield', 'Newcastle', 'Waratah', 'Hamilton'],
      heroHeadline: `Phone Repair ${formattedName} | Express Service in Mayfield`,
      metaDescription: `Trusted phone repair for ${formattedName} residents & businesses. Same-day screen repair, battery replacement & water damage fixes at 276 Maitland Rd Mayfield.`,
      suburbIntro: `Living in ${formattedName}? When your iPhone, Samsung Galaxy, or Google Pixel suffers a broken screen or dead battery, Mayfield Phone Repair is your fast, local destination. Located at 276 Maitland Rd Mayfield, we are just a short drive from ${formattedName}.`,
      localConvenienceNote: `Free, easy street parking directly outside our Mayfield workshop at 276 Maitland Rd.`,
      faqs: [
        { question: `How far is Mayfield Phone Repair from ${formattedName}?`, answer: `We are located at 276 Maitland Rd Mayfield, just a short 5 to 15 minute drive from ${formattedName}.` },
        { question: `Do you offer same-day phone repairs for ${formattedName} residents?`, answer: `Yes! Over 90% of screen replacements and battery swaps are completed in 30 to 45 minutes.` },
        { question: `Do I need an appointment?`, answer: `No appointment necessary! Walk-ins are welcome Monday through Saturday.` }
      ]
    };
  }

  const canonicalUrl = `https://mayfieldphonerepair.com.au/phone-repair/${hub.id}`;

  // Build JSON-LD Schema
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Mobile Phone Repair',
    'name': `Phone Repair — ${hub.name} Service Area`,
    'provider': {
      '@id': 'https://mayfieldphonerepair.com.au/#business'
    },
    'areaServed': {
      '@type': 'Place',
      'name': hub.name
    },
    'url': canonicalUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': hub.faqs.map((f) => ({
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
        'name': `Phone Repair ${hub.name}`,
        'item': canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`Phone Repair ${hub.name} | Express Screen & Battery Service Mayfield`}</title>
        <meta name="description" content={hub.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Phone Repair ${hub.name} - Mayfield Cell Phone Repairs`} />
        <meta property="og:description" content={hub.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(serviceAreaSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap py-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">Phone Repair {hub.name}</span>
          </nav>

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="max-w-3xl relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> {hub.name} (Postcode {hub.postcode})
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" /> {hub.drivingTime} ({hub.distanceKm})
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
                {hub.heroHeadline}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                {hub.suburbIntro}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={openBooking}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Wrench className="w-5 h-5" /> Book A Repair Now
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
              
              {/* Location & Convenience Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  Getting to Mayfield Phone Repair from {hub.name}
                </h2>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-slate-700 text-sm sm:text-base">
                  <p><strong>Driving Route:</strong> {hub.travelRoute}.</p>
                  <p><strong>Travel Distance:</strong> {hub.distanceKm} ({hub.drivingTime} drive).</p>
                  <p><strong>Local Landmarks Nearby:</strong> {hub.landmarks.join(', ')}.</p>
                  <p className="text-blue-700 font-semibold mt-2">{hub.localConvenienceNote}</p>
                </div>
              </div>

              {/* Repair Services Available */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  Services Available for {hub.name} Residents
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> iPhone Screen & Battery Repair
                    </h3>
                    <p className="text-xs text-slate-500">Same-day 30-min repairs from iPhone 17 down to iPhone SE.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Samsung Galaxy AMOLED Repair
                    </h3>
                    <p className="text-xs text-slate-500">S26 Ultra, S25, S24, Z Fold & Z Flip display modules.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Google Pixel Screen Replacement
                    </h3>
                    <p className="text-xs text-slate-500">Actua OLED screen replacements & Tensor battery swaps.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> iPad & Tablet Repairs
                    </h3>
                    <p className="text-xs text-slate-500">Touch glass digitizers for iPad Pro, Air, Mini & standard iPad.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Emergency Water Damage Restoration
                    </h3>
                    <p className="text-xs text-slate-500">Ultrasonic chemical cleaning & logic board micro-soldering.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Charging Port & Speaker Fixes
                    </h3>
                    <p className="text-xs text-slate-500">USB-C & Lightning port extraction, lint cleaning & port replacement.</p>
                  </div>
                </div>
              </div>

              {/* Suburb FAQs */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  {hub.name} Phone Repair FAQs
                </h2>
                <div className="space-y-4">
                  {hub.faqs.map((faq, fIdx) => {
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

              {/* Nearby Suburbs */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold font-display">Nearby Suburbs We Service</h3>
                <div className="flex flex-wrap gap-3">
                  {hub.nearbySuburbs.map((sub, sIdx) => {
                    const subSlug = sub.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={sIdx}
                        to={`/phone-repair/${subSlug}`}
                        className="bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-lg border border-white/10 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Phone Repair {sub}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>

            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24">
                <h3 className="font-bold text-lg font-display text-slate-900">Mayfield Cell Phone Repairs</h3>
                
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
                    <span className="font-semibold text-emerald-700">90-Day Parts & Labor Guarantee</span>
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
                    Get Directions From {hub.name}
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
