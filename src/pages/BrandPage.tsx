import { useParams, Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Smartphone, CheckCircle2, ShieldCheck, Wrench, BatteryCharging, Zap, Droplet, Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useUI } from '../contexts/UIContext';

export default function BrandPage() {
  const { openBooking } = useUI();
  const { brandId } = useParams();
  const brand = brands.find(b => b.id === brandId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [brandId]);

  if (!brand) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Brand Not Found</h1>
        <p className="text-slate-600 mb-8">We couldn't find the requested brand.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 font-semibold inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50">
      <Helmet>
        <title>{`${brand.name} Repair Mayfield | Professional Newcastle Service`}</title>
        <meta name="description" content={`Expert ${brand.name} repairs in Mayfield. ${brand.description} Same-day screen, battery, and diagnostic services by specialist technicians.`} />
        <link rel="canonical" href={`https://mayfieldphonerepair.com.au/brand/${brand.id}`} />
        <meta property="og:title" content={`${brand.name} Repair Newcastle - Mayfield Cell Phone Repairs`} />
        <meta property="og:description" content={brand.description} />
      </Helmet>
      {/* Dynamic Header */}
      <div className={`bg-gradient-to-br ${brand.color} text-white pt-24 pb-40 px-6 md:px-12 relative overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Smartphone className="absolute -right-20 -bottom-20 w-[600px] h-[600px] transform rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 text-white/90 hover:text-white mb-16 font-black uppercase tracking-[0.2em] text-[10px] transition-all bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md w-fit border border-white/20 group font-display">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="w-28 h-28 bg-white/10 rounded-[2.5rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl shrink-0 group hover:rotate-6 transition-transform duration-500">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tighter leading-none font-display">{brand.name} Repairs</h1>
              <p className="text-white/80 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed italic">{brand.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-24 relative z-20 pb-32 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          
          {/* Detailed Brand Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 md:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white space-y-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight font-display tracking-tight">Expert Repairs for {brand.name}</h2>
            <p className="text-slate-600 leading-relaxed text-xl font-medium">{brand.longDescription}</p>
            
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              {brand.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 group hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Zap className="w-5 h-5 text-blue-600 group-hover:text-white" />
                  </div>
                  <span className="font-bold text-slate-800 text-lg tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Transparency Section - SEO Requirement */}
          <div className="bg-blue-600 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-100 opacity-60">Transparency Report</span>
                <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">Starting Prices.</h2>
                <p className="text-blue-100/80 text-lg font-medium">Clear, upfront pricing for residents in Newcastle and Mayfield. No hidden fees.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/20 transition-all">
                  <Smartphone className="w-10 h-10 mb-6 text-blue-200" />
                  <div className="space-y-1">
                    <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">Screen Restoration</p>
                    <p className="text-4xl font-black font-display">From ${brand.startingPrice.screen}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/20 transition-all">
                  <BatteryCharging className="w-10 h-10 mb-6 text-blue-200" />
                  <div className="space-y-1">
                    <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">Battery Cell Swap</p>
                    <p className="text-4xl font-black font-display">From ${brand.startingPrice.battery}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                <p className="text-blue-100/60 text-xs italic font-medium max-w-sm">
                  * Prices vary by specific model and part availability. Standard assessment is always $0.00.
                </p>
                <div className="h-px flex-1 bg-white/10 hidden sm:block"></div>
                <Link to="/#contact" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all font-display shrink-0">
                  Get Exact Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Categorized Models */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-display tracking-tight">Models We Fix</h2>
              <p className="text-slate-500 text-xl font-medium max-w-2xl">Professional repair services available for the following {brand.name} models.</p>
            </div>
            
            <div className="space-y-10">
              {brand.deviceCategories.map((category, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl shadow-slate-200/30 border border-white">
                  <h3 className="text-xl font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em] font-display border-b border-blue-50 pb-6">
                    <Smartphone className="w-6 h-6" strokeWidth={3} /> {category.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {category.models.map(model => (
                      <button key={model} onClick={openBooking} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-600/5 transition-all cursor-pointer flex justify-between items-center group">
                        <span className="font-bold text-slate-700 group-hover:text-blue-900 tracking-tight">{model}</span>
                        <ArrowLeft className="w-4 h-4 text-blue-600 rotate-180 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" strokeWidth={3} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="text-[11px] text-slate-400 leading-relaxed text-justify opacity-60 font-medium">
                <strong className="text-slate-500 text-xs font-black uppercase tracking-widest block mb-4">Complete {brand.name} Repair Index:</strong> 
                {brand.seoModelDump}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white rounded-[3.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="max-w-md space-y-6">
                <h3 className="text-3xl md:text-5xl font-bold leading-none font-display">Specialized Request?</h3>
                <p className="text-slate-400 text-xl font-medium leading-relaxed">We source precision parts for legacy and rare models within 24-48 hours. If it's not listed, we can still fix it.</p>
              </div>
              <div className="flex flex-col w-full md:w-auto gap-4 shrink-0">
                <button
                  onClick={openBooking}
                  className="inline-flex items-center justify-center gap-4 bg-blue-600 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 font-display"
                >
                  Book My Repair
                </button>
                <Link to="/#contact" className="inline-flex items-center justify-center gap-4 bg-white/5 text-white border border-white/10 px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-slate-900 transition-all font-display">
                  Get A Quote
                </Link>
                <a href="tel:0240491735" className="inline-flex items-center justify-center gap-4 text-white/60 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest font-display">
                  <Phone className="w-4 h-4" /> Call 02 4049 1735
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white p-10 shadow-2xl shadow-slate-200/50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 font-display">
               Common Repairs
            </h3>
            <ul className="space-y-8">
              {[
                { title: 'Screen Repair', desc: 'Fixing cracked glass, broken LCDs, and touch issues.', icon: Smartphone },
                { title: 'Battery Replacement', desc: 'New batteries to restore your phone\'s power and stability.', icon: BatteryCharging },
                { title: 'Water Damage', desc: 'Cleaning and repair to fix liquid issues and prevent corrosion.', icon: Droplet },
                { title: 'Charging Port', desc: 'Fixing loose or broken ports for reliable charging every time.', icon: Zap },
              ].map((repair, idx) => (
                <li key={idx} className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                    <repair.icon className="w-6 h-6 text-slate-400 group-hover:text-white" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold text-lg leading-tight tracking-tight">{repair.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{repair.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12 pt-10 border-t border-slate-100">
              <div className="flex items-start gap-4 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-emerald-800">
                <ShieldCheck className="w-6 h-6 shrink-0 mt-1" strokeWidth={2.5} />
                <span className="font-bold text-sm leading-relaxed">All repairs are backed by our professional 90-day parts and labor warranty.</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
             <h3 className="text-2xl font-bold mb-6 font-display tracking-tight">Quality Parts</h3>
             <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
               We don't use cheap parts. Every repair uses high-quality components to ensure your phone lasts longer.
             </p>
             <ul className="space-y-6">
               <li className="flex items-center gap-4 group">
                 <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                   <CheckCircle2 className="w-4 h-4 text-blue-400 group-hover:text-white" />
                 </div>
                 <span className="font-bold tracking-tight">Full Spectrum Screens</span>
               </li>
               <li className="flex items-center gap-4 group">
                 <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                   <CheckCircle2 className="w-4 h-4 text-blue-400 group-hover:text-white" />
                 </div>
                 <span className="font-bold tracking-tight">High Cycle Batteries</span>
               </li>
               <li className="flex items-center gap-4 group">
                 <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                   <CheckCircle2 className="w-4 h-4 text-blue-400 group-hover:text-white" />
                 </div>
                 <span className="font-bold tracking-tight">OEM Grade Adhesives</span>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
