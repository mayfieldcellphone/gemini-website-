import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { suburbs } from '../data/suburbs';
import { Phone, Clock, ShieldCheck, MapPin, Smartphone, BatteryCharging, Droplet, Zap, Wrench, ArrowRight, Truck, Sparkles, HelpCircle } from 'lucide-react';

export default function SuburbPage() {
  const { suburbId } = useParams();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [suburbId]);

  // Format dynamic fallback
  const fallbackName = suburbId ? suburbId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Your Area';
  
  const suburbInfo = suburbs.find(s => s.id === suburbId) || {
    name: fallbackName,
    distance: 'a short drive away',
    nearby: ['Newcastle', 'Mayfield']
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex-1 bg-white font-sans text-slate-800">
      
      {/* Hero Section */}
      <section className="bg-slate-50 pt-20 pb-24 px-6 md:px-12 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full mb-4">
            <MapPin className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Local Repair Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Phone Repair in {suburbInfo.name} <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">– Same Day Service</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            If you live or work in {suburbInfo.name}, fast and reliable device repair is {suburbInfo.distance} at Mayfield Phone Repair. We provide trusted, same day phone repair {suburbInfo.name} residents can count on. Whether you need a quick screen fix or a complex logic board diagnostic, our premium service gets your device back in your hands immediately.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/#contact" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
              Book Your Repair Today
            </Link>
            <a href="tel:0240491735" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border border-slate-300 font-bold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" /> 02 4049 1735
            </a>
          </div>
        </div>
      </section>

      {/* Common Repairs Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Common Repairs in {suburbInfo.name}</h2>
          <p className="text-lg text-slate-600">From shattered glass to battery issues, here is what we fix daily for our {suburbInfo.name} customers.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: `Screen Repair ${suburbInfo.name}`, icon: Smartphone, desc: 'Dropped your phone on the pavement? We replace shattered screens and damaged LCD/OLED panels with premium parts, restoring flawless touch and vibrant colors usually in under 45 minutes.' },
            { title: `Battery Replacement ${suburbInfo.name}`, icon: BatteryCharging, desc: 'If your device dies quickly or unexpectedly shuts down, a new genuine-spec battery will restore its all-day power. Fast turnaround while you wait.' },
            { title: 'Charging Port Issues', icon: Zap, desc: 'Lint buildup or pin damage preventing a charge? We clean and replace charging hardware so you can plug in securely without having to hold the cable at an angle.' },
            { title: 'Water Damage Diagnostics', icon: Droplet, desc: 'Liquid spills require immediate attention. We offer comprehensive logic board cleaning and component repair to save your device and recover your precious data.' }
          ].map((service, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-900 text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Why Customers from {suburbInfo.name} Choose Us</h2>
            <p className="text-slate-400 text-lg">
              When dealing with fragile electronics, you shouldn't have to choose between quality and speed. We are the preferred destination for iPhone repair {suburbInfo.name} and Samsung repair {suburbInfo.name} because we strictly guarantee both.
            </p>
            <ul className="space-y-6 pt-4">
              {[
                { title: 'Same-Day Repairs', desc: 'Most standard fixes are completed in under an hour. Drop it off, grab a coffee, and it\'s done.', icon: Clock },
                { title: '90-Day Warranty', desc: 'We securely back our work with a comprehensive 90-day guarantee on all replacement parts and labor.', icon: ShieldCheck },
                { title: 'Affordable Pricing', desc: 'Premium repairs shouldn\'t empty your wallet. We offer highly competitive pricing with absolutely no hidden fees.', icon: Wrench },
                { title: `Easy Access from ${suburbInfo.name}`, desc: `Located centrally in Mayfield, getting here from ${suburbInfo.name} is quick, straightforward, and we have street parking right out front.`, icon: MapPin }
              ].map((reason, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <reason.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{reason.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{reason.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Top Google Rated</h3>
              <div className="space-y-4">
                 <div className="bg-slate-900 p-6 rounded-2xl">
                    <div className="flex text-amber-400 mb-2">★★★★★</div>
                    <p className="text-slate-300 italic text-sm">"Absolutely brilliant. Drove over from {suburbInfo.name} after cracking my screen. They fixed it on the spot while I waited. Highly recommended!"</p>
                    <p className="text-slate-500 mt-4 text-xs font-bold uppercase">— Verified Local Customer</p>
                 </div>
                 <div className="bg-slate-900 p-6 rounded-2xl">
                    <div className="flex text-amber-400 mb-2">★★★★★</div>
                    <p className="text-slate-300 italic text-sm">"Best phone repair near {suburbInfo.name}. Honest pricing on my Samsung battery and no aggressive upselling. My phone lasts all day again."</p>
                    <p className="text-slate-500 mt-4 text-xs font-bold uppercase">— Verified Local Customer</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600">Three incredibly simple steps to get your device back to 100%.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: '1. Visit or Book', desc: `Drive over from ${suburbInfo.name} or book securely online. Walk-ins are always welcomed.` },
            { icon: Wrench, title: '2. We Repair', desc: 'Our technicians quickly diagnose the fault and perform precision repairs using OEM-spec parts.' },
            { icon: Sparkles, title: '3. Same-Day Pickup', desc: 'Collect your fully restored device on the same day, backed by our 90-day comprehensive warranty.' }
          ].map((step, idx) => (
            <div key={idx} className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common questions from our {suburbInfo.name} customers.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'How long does a repair usually take?', a: 'Because we keep a massive inventory of parts in stock, repairs like battery and screen replacements are typically finished in 30 to 60 minutes while you wait.' },
              { q: 'Do you offer a warranty on your work?', a: 'Yes. Every single hardware repair comes with our steadfast 90-day warranty protecting you against any rare manufacturing defects in the parts we use.' },
              { q: 'Do I need to make a booking first?', a: 'Not at all. While booking online guarantees your timeslot, walk-ins from ' + suburbInfo.name + ' are always perfectly fine during our trading hours.' },
              { q: 'How do I get a cost estimate?', a: 'You can request a free, instant quote by messaging us online or calling the shop. We provide transparent upfront pricing.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Final CTA */}
      <section className="bg-blue-600 text-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Ready to fix your device?</h2>
          <p className="text-blue-100 text-lg md:text-xl">
            Whether you are right here in {suburbInfo.name}, or surrounding areas like {suburbInfo.nearby.join(' and ')}, Mayfield Phone Repair provides the elite technical service you deserve. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/#contact" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:bg-slate-50 transition">
              Book a Repair Now
            </Link>
            <a href="tel:0240491735" className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> 02 4049 1735
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
