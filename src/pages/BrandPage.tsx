import { useParams, Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { ArrowLeft, Smartphone, CheckCircle2, ShieldCheck, Wrench, BatteryCharging, Zap, Droplet } from 'lucide-react';
import { useEffect } from 'react';

export default function BrandPage() {
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
      {/* Dynamic Header */}
      <div className={`bg-gradient-to-br ${brand.color} text-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-24 opacity-10 pointer-events-none">
          <Smartphone className="w-96 h-96 transform rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-10 font-medium transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit border border-white/20">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl shrink-0">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">{brand.name} Repairs</h1>
              <p className="text-white/90 text-xl max-w-2xl font-light leading-relaxed">{brand.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20 pb-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Detailed Brand Content */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Expert Care for your {brand.name}</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{brand.longDescription}</p>
            
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {brand.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Models */}
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Supported {brand.name} Models</h2>
            <p className="text-slate-600 text-lg">Select your device family below. If your specific model isn't listed, please contact us—we constantly stock parts for hundreds of devices not shown here.</p>
            
            <div className="space-y-8">
              {brand.deviceCategories.map((category, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <Smartphone className="w-5 h-5" /> {category.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {category.models.map(model => (
                      <Link key={model} to="/#contact" className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer flex justify-between items-center group">
                        <span className="font-medium text-slate-700 group-hover:text-blue-800">{model}</span>
                        <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-8 text-[11px] text-slate-400 leading-relaxed text-justify opacity-60">
              <strong>Comprehensive {brand.name} Repair Directory:</strong> {brand.seoModelDump}
            </div>
          </div>
          
          <div className="bg-blue-600 text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-600/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold mb-3">Don't see your specific {brand.name} model?</h3>
              <p className="text-blue-100 text-lg">We likely still repair it! Give us a call or drop in for a quick diagnostic. We can source rare parts within 24-48 hours.</p>
            </div>
            <div className="flex flex-col w-full md:w-auto gap-3 shrink-0">
              <a href="tel:0240491735" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition text-center shadow-lg">
                Call 02 4049 1735
              </a>
              <Link to="/#contact" className="bg-blue-800 text-white border border-blue-500 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition text-center">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-slate-400" /> Common {brand.name} Repairs
            </h3>
            <ul className="space-y-5">
              {[
                { title: 'Screen & LCD Replacement', desc: 'Fix shattered glass, dead pixels, and touch issues.', icon: Smartphone },
                { title: 'Battery Replacement', desc: 'Restore all-day power and fix unexpected shutdowns.', icon: BatteryCharging },
                { title: 'Water Damage Diagnosis', desc: 'Deep cleaning and logic board repair for liquid spills.', icon: Droplet },
                { title: 'Charging Port Repair', desc: 'Fix loose ports or devices that refuse to charge.', icon: Zap },
              ].map((repair, idx) => (
                <li key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <repair.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-bold mb-1">{repair.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{repair.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <ShieldCheck className="w-6 h-6 shrink-0" />
                <span className="font-semibold text-sm">All repairs include our comprehensive 90-day warranty on parts and labor.</span>
              </div>
            </div>
          </div>

          {/* Value Prop Banner */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
             <h3 className="text-xl font-bold mb-4">Premium Parts Promise</h3>
             <p className="text-slate-400 text-sm leading-relaxed mb-6">
               We refuse to use cheap, knock-off components that fail after a week. Your {brand.name} device deserves parts that match its original quality standards.
             </p>
             <ul className="space-y-3 text-sm font-medium text-slate-300">
               <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Original Spec Displays</li>
               <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Maximum Capacity Batteries</li>
               <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Factory Seal Adhesives</li>
             </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
