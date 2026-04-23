import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { ArrowLeft, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useEffect } from 'react';

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = servicesData.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Service Not Found</h1>
        <p className="text-slate-600 mb-8">We couldn't find the requested service.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 font-semibold inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="flex-1 bg-slate-50">
      {/* Dynamic Header */}
      <div className={`bg-gradient-to-br ${service.color} text-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-24 opacity-10 pointer-events-none">
          <Icon className="w-96 h-96 transform rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-10 font-medium transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit border border-white/20">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl shrink-0">
              <Icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">{service.heroTitle}</h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl font-light leading-relaxed">{service.heroDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20 pb-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Detailed Service Content */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 space-y-10">
            {service.content.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.heading}</h2>
                {section.text && (
                  <p className="text-slate-600 leading-relaxed text-lg">{section.text}</p>
                )}
                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item, listIdx) => (
                      <li key={listIdx} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          
          {/* Bottom CTA Banner inside content area */}
          <div className="bg-blue-600 text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-600/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold mb-3">Ready for your same day phone repair?</h3>
              <p className="text-blue-100 text-lg">Drop in today or call us to reserve your part and guarantee the fastest turnaround time.</p>
            </div>
            <div className="flex flex-col w-full md:w-auto gap-3 shrink-0">
              <a href="tel:0240491735" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition text-center shadow-lg">
                Call 02 4049 1735
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
               Service Features
            </h3>
            <ul className="space-y-4">
               {service.features.map((feature, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-4 h-4 text-blue-600" />
                   </div>
                   <span className="font-semibold text-slate-800">{feature}</span>
                 </li>
               ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl text-white">
             <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 mb-4 border border-slate-700">
               <MapPin className="w-6 h-6 text-blue-400" />
             </div>
             <h3 className="font-bold text-lg mb-2">Visit our Mayfield Location</h3>
             <p className="text-slate-400 mb-6">
               Stop by our mobile repair shop near me for an immediate, free diagnostic test. No appointment necessary.
             </p>
             <p className="font-medium text-slate-300">276 Maitland Rd<br/>Mayfield, NSW, 2304</p>
             
             <div className="mt-8 pt-6 border-t border-slate-800">
                <a href="tel:0431618100" className="flex items-center gap-3 group text-blue-400 hover:text-blue-300 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Direct Contact</div>
                    <div className="font-bold">0431 618 100</div>
                  </div>
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
