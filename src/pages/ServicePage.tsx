import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, Phone, MapPin, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { useUI } from '../contexts/UIContext';
import NotFound from './NotFound';

export default function ServicePage() {
  const { openBooking } = useUI();
  const { serviceId } = useParams();
  const service = servicesData.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return <NotFound />;
  }

  const Icon = service.icon;

  return (
    <div className="flex-1 bg-slate-50">
      <Helmet>
        <title>{`${service.title} Mayfield | Newcastle Device Repair`}</title>
        <meta name="description" content={service.shortDesc} />
        <link rel="canonical" href={`https://mayfieldphonerepair.com.au/service/${service.id}`} />
        <meta property="og:title" content={`${service.title} - Mayfield Cell Phone Repairs`} />
        <meta property="og:description" content={service.heroDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.shortDesc,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Mayfield Cell Phone Repairs",
              "url": "https://mayfieldphonerepair.com.au"
            },
            "areaServed": "Newcastle, NSW",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Repair Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": service.title
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      {/* Dynamic Header - hidden large icon on mobile for performance */}
      <div className={`bg-gradient-to-br ${service.color} text-white pt-12 pb-24 px-6 md:px-12 relative overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 hidden md:block">
          <Icon className="absolute -right-20 -bottom-20 w-[600px] h-[600px] transform rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 text-white/90 hover:text-white mb-16 font-black uppercase tracking-[0.2em] text-[10px] transition-all bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md w-fit border border-white/20 group font-display">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="w-28 h-28 bg-white/10 rounded-[2.5rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl shrink-0 group hover:rotate-6 transition-transform duration-500">
              <Icon className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tighter leading-none font-display">{service.heroTitle}</h1>
              <p className="text-white/80 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed italic">{service.heroDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 pb-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          
          {/* Detailed Service Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 md:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white space-y-16">
            {service.content.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight font-display">{section.heading}</h2>
                {section.text && (
                  <p 
                    className="text-slate-600 leading-relaxed text-xl font-medium"
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                )}
                {section.list && (
                  <ul className="grid sm:grid-cols-2 gap-6 mt-8">
                    {section.list.map((item, listIdx) => (
                      <li key={listIdx} className="flex items-start gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-colors">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-700 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          
          {/* Bottom CTA Banner inside content area */}
          <div className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-blue-600/30 transition-colors duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight font-display">Need a repair?</h3>
                <p className="text-slate-400 text-xl font-medium leading-relaxed">Book your repair today or just walk in for same-day service.</p>
              </div>
              <div className="flex flex-col w-full md:w-auto gap-4 shrink-0 font-display">
                <button onClick={openBooking} className="inline-flex items-center justify-center gap-4 bg-white text-slate-900 px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-100 transition-all shadow-xl">
                  Book A Repair
                </button>
                <Link to="/#contact" className="inline-flex items-center justify-center gap-4 bg-blue-600 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30">
                  Talk to Us
                </Link>
                <a href="tel:0240491735" className="inline-flex items-center justify-center gap-4 text-white/40 hover:text-white transition-all text-[8px] font-black uppercase tracking-widest">
                  <Phone className="w-3 h-3" /> Call 02 4049 1735
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white p-10 shadow-2xl shadow-slate-200/50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-10 font-display">
               Repair Details
            </h3>
            <ul className="space-y-6">
               {service.features.map((feature, i) => (
                 <li key={i} className="flex items-center gap-4 group">
                   <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 group-hover:text-white" />
                   </div>
                   <span className="font-bold text-slate-800 text-lg">{feature}</span>
                 </li>
               ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 border border-white/5 shadow-2xl text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -mr-10 -mt-10"></div>
             <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 mb-8 border border-white/10 group-hover:bg-blue-600 transition-colors duration-500">
               <MapPin className="w-8 h-8 text-blue-400 group-hover:text-white" />
             </div>
             <h3 className="font-bold text-2xl mb-4 font-display">Mayfield Phone Repair</h3>
             <p className="text-slate-400 mb-8 text-lg font-medium leading-relaxed">
               Get a free diagnostic test today. No appointment necessary—just walk in for a fast fix.
             </p>
             <p className="font-bold text-xl text-white font-display">276 Maitland Rd<br/>Mayfield, NSW, 2304</p>
             
             <div className="mt-12 pt-10 border-t border-white/10">
                <a href="tel:0431618100" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                    <Phone className="w-6 h-6 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Live Support</div>
                    <div className="font-bold text-xl font-display group-hover:text-blue-400 transition-colors">0431 618 100</div>
                  </div>
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
