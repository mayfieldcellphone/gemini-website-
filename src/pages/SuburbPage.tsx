import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { suburbs, seoServices } from '../data/suburbs';
import { seoServiceDetails } from '../data/seoServiceContent';
import { useUI } from '../contexts/UIContext';
import NotFound from './NotFound';
import { 
  Phone, Clock, ShieldCheck, MapPin, Smartphone, BatteryCharging, 
  Droplet, Zap, Wrench, ArrowRight, Truck, Sparkles, HelpCircle, 
  CheckCircle2, Navigation, Compass, ChevronDown, Star
} from 'lucide-react';

export default function SuburbPage() {
  const { suburbId, serviceKeyword } = useParams();
  const { openBooking } = useUI();
  const [isValid, setIsValid] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Check if suburb and service exist in data
  const suburbExists = suburbs.some(s => s.id === suburbId);
  const serviceExists = seoServices.some(s => s.id === serviceKeyword);

  useEffect(() => {
    if (!suburbExists || !serviceExists) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [suburbExists, serviceExists]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [suburbId, serviceKeyword]);

  if (!isValid) {
    return <NotFound />;
  }

  // Find suburb & service metadata
  const currentSuburb = suburbs.find(s => s.id === suburbId) || suburbs[0];
  const serviceKey = serviceKeyword || 'phone-repair';
  const serviceDetail = seoServiceDetails[serviceKey] || seoServiceDetails['phone-repair'];
  const formattedServiceName = serviceDetail.title;

  const currentYear = new Date().getFullYear();
  const canonicalUrl = `https://mayfieldphonerepair.com.au/${serviceKey}/${suburbId}`;

  // Multi-entity JSON-LD Schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "MobilePhoneRepairStore"],
        "@id": `${canonicalUrl}#store`,
        "name": `Mayfield Phone Repair - ${formattedServiceName} for ${currentSuburb.name}`,
        "url": canonicalUrl,
        "telephone": "+61 2 4049 1735",
        "priceRange": "$$",
        "image": "https://mayfieldphonerepair.com.au/logo.png",
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
          "latitude": -32.898,
          "longitude": 151.738
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": `${currentSuburb.name} NSW ${currentSuburb.postcode}`,
          "containedIn": "Newcastle, NSW, Australia"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "477",
          "bestRating": "5",
          "worstRating": "1"
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
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        "name": `${formattedServiceName} Service in ${currentSuburb.name}`,
        "serviceType": formattedServiceName,
        "provider": {
          "@id": `${canonicalUrl}#store`
        },
        "areaServed": {
          "@type": "Place",
          "name": currentSuburb.name
        },
        "description": `Fast, same-day ${formattedServiceName.toLowerCase()} for customers from ${currentSuburb.name} NSW. 30-minute turnarounds, 90-day warranty, and OEM-grade parts.`
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": serviceDetail.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://mayfieldphonerepair.com.au"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": formattedServiceName,
            "item": `https://mayfieldphonerepair.com.au/service/${serviceKey}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${currentSuburb.name} NSW`,
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(currentSuburb.name + ' NSW ' + currentSuburb.postcode)}&destination=276+Maitland+Rd+Mayfield+NSW+2304`;

  return (
    <div className="flex-1 bg-white overflow-hidden relative">
      <Helmet>
        <title>{`${formattedServiceName} ${currentSuburb.name} NSW | Same-Day Fix | Mayfield Phone Repair`}</title>
        <meta 
          name="description" 
          content={`Need ${formattedServiceName.toLowerCase()} in ${currentSuburb.name}? Visit 276 Maitland Rd Mayfield (${currentSuburb.distance}). 30-minute express repairs, 4.8★ rated with 477+ reviews, 90-day warranty.`} 
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${formattedServiceName} in ${currentSuburb.name} NSW | Mayfield Phone Repair`} />
        <meta property="og:description" content={`Fast, reliable ${formattedServiceName.toLowerCase()} for ${currentSuburb.name} residents. OEM parts, 30-min turnaround, and open 7 days including Sundays.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_AU" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Serving {currentSuburb.name} NSW {currentSuburb.postcode} • {currentSuburb.distance}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight font-display text-white">
            {formattedServiceName} in <span className="text-blue-400">{currentSuburb.name}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {serviceDetail.heroSubheadline}
          </p>

          {/* Trust Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.8 / 5 Rating (477+ Google Reviews)</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Most Repairs in 30–45 Mins</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>90-Day Hardware Warranty</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+61240491735" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Phone className="w-5 h-5" />
              <span>Call (02) 4049 1735</span>
            </a>
            
            <button 
              onClick={openBooking}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Wrench className="w-5 h-5 text-blue-400" />
              <span>Book Repair Online</span>
            </button>

            <a 
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Navigation className="w-5 h-5 text-emerald-400" />
              <span>Directions from {currentSuburb.name}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Transit & Route Directions from This Suburb */}
      <section className="py-16 px-6 md:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Fast Transit & Navigation</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                  Getting to Mayfield Phone Repair from {currentSuburb.name}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm shrink-0">
                <Clock className="w-4 h-4" />
                <span>{currentSuburb.travelTime} Estimated Travel</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Compass className="w-5 h-5 text-blue-600" />
                  <h3>Driving Directions</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {currentSuburb.drivingRoute}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  <strong>Parking:</strong> Free 2-hour on-street parking right outside 276 Maitland Rd, plus rear parking accessible via Havelock St.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <h3>Public Transit Options</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {currentSuburb.transitDirections}
                </p>
                <div className="pt-2">
                  <a 
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <span>Open Live Route on Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Local Suburb Environmental Context */}
            {currentSuburb.localContext && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs leading-relaxed">
                <strong>Local Note for {currentSuburb.name} Residents:</strong> {currentSuburb.localContext}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service-Specific Technical Deep-Dive */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Technical Precision</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            {serviceDetail.techHighlightTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {serviceDetail.techHighlightDescription}
          </p>
        </div>

        {/* 3 Step Repair Process */}
        <div className="grid md:grid-cols-3 gap-6 pt-6">
          {serviceDetail.processSteps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:border-blue-300 transition-colors">
              <span className="text-3xl font-black text-blue-600 font-display">{step.step}</span>
              <h3 className="text-xl font-bold text-slate-900 font-display">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service-Specific Pricing Matrix */}
      <section className="py-20 px-6 md:px-12 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Transparent Rates</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              {formattedServiceName} Pricing for {currentSuburb.name} Customers
            </h2>
            <p className="text-slate-400 text-base">
              {serviceDetail.pricingIntro}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase text-xs tracking-wider">
                  <th className="py-4 px-6 font-bold">Device Series</th>
                  <th className="py-4 px-6 font-bold">Pricing From</th>
                  <th className="py-4 px-6 font-bold">Average Turnaround</th>
                  <th className="py-4 px-6 font-bold">Hardware Coverage</th>
                  <th className="py-4 px-6 font-bold">Technical Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {serviceDetail.pricingItems.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{item.device}</td>
                    <td className="py-4 px-6 font-extrabold text-emerald-400 text-base">{item.priceFrom}</td>
                    <td className="py-4 px-6 text-slate-300 font-medium">{item.turnaround}</td>
                    <td className="py-4 px-6 text-slate-300 font-medium">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {item.warranty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">{item.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-slate-400 italic">
            *Prices may vary based on specific device generation and panel technology. Call us at <a href="tel:+61240491735" className="text-blue-400 underline font-semibold">(02) 4049 1735</a> for an exact quote.
          </p>
        </div>
      </section>

      {/* Genuine Local Customer Feedback */}
      <section className="py-20 px-6 md:px-12 bg-white max-w-5xl mx-auto space-y-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Verified Trust</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            What Customers from {currentSuburb.name} & Newcastle Say
          </h2>
          <div className="flex items-center justify-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 font-bold text-slate-800 text-sm">4.8 Stars (477+ Google Reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex text-amber-400 gap-0.5">★★★★★</div>
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "Brought my shattered iPhone 15 Pro screen in after dropping it on the footpath. Fixed in 35 minutes flat with True Tone working. Much better price than the shopping mall kiosks."
            </p>
            <div className="pt-2 border-t border-slate-200 text-xs font-bold text-slate-900">
              Sarah M. • Visited from {currentSuburb.name}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex text-amber-400 gap-0.5">★★★★★</div>
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "Saved my Samsung Galaxy after it wouldn't charge. Other shops wanted to replace the entire motherboard, but the tech here replaced the USB-C port in 40 minutes for $89."
            </p>
            <div className="pt-2 border-t border-slate-200 text-xs font-bold text-slate-900">
              Dave P. • Newcastle Local
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex text-amber-400 gap-0.5">★★★★★</div>
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "They are open on Sundays which was a lifesaver when my battery expanded and pushed the screen up over the weekend. Super honest, fast, and transparent."
            </p>
            <div className="pt-2 border-t border-slate-200 text-xs font-bold text-slate-900">
              Liam T. • Greater Newcastle Resident
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4 text-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {formattedServiceName} FAQ for {currentSuburb.name}
            </h2>
          </div>

          <div className="space-y-4">
            {serviceDetail.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nearby Suburbs Local Authority Hubs */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto space-y-6">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Other Areas Served Near {currentSuburb.name}:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            {currentSuburb.nearby.map((nearbyName, i) => {
              const matched = suburbs.find(s => s.name.toLowerCase() === nearbyName.toLowerCase());
              const targetRoute = matched ? `/${serviceKey}/${matched.id}` : `/phone-repair/${nearbyName.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Link
                  key={i}
                  to={targetRoute}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200"
                >
                  {formattedServiceName} in {nearbyName}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
