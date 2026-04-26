import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { suburbs } from '../data/suburbs';
import { Phone, Clock, ShieldCheck, MapPin, Smartphone, BatteryCharging, Droplet, Zap, Wrench, ArrowRight, Truck, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function SuburbPage() {
  const { suburbId, serviceKeyword } = useParams();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [suburbId, serviceKeyword]);

  // Format dynamic fallbacks
  const fallbackSuburbName = suburbId ? suburbId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Your Area';
  
  // Convert "samsung-tablet-repair" to "Samsung Tablet Repair"
  const formattedServiceText = serviceKeyword 
    ? serviceKeyword.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Phone Repair';
  
  const isGeneric = formattedServiceText === 'Phone Repair';

  const suburbInfo = suburbs.find(s => s.id === suburbId) || {
    name: fallbackSuburbName,
    distance: 'a short drive away',
    nearby: ['Newcastle', 'Mayfield']
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex-1 bg-white overflow-hidden relative">
      <Helmet>
        <title>{`${formattedServiceText} in ${suburbInfo.name} | Fast Phone Repairs`}</title>
        <meta name="description" content={`Professional ${formattedServiceText} for residents in ${suburbInfo.name}. Trusted Mayfield technicians, fast turnaround, and 90-day warranty.`} />
        <meta property="og:title" content={`${formattedServiceText} ${suburbInfo.name} - Mayfield Phone Repair`} />
        <meta property="og:description" content={`Get your phone fixed today in ${suburbInfo.name}. Screen repairs, battery replacements, and more with expert diagnostics.`} />
      </Helmet>
      {/* Background Textures */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-40 px-6 md:px-12 relative overflow-hidden text-center z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-50 border border-blue-100 rounded-2xl mb-4 group hover:scale-105 transition-transform duration-500">
            <MapPin className="w-4 h-4 text-blue-600 scale-125" strokeWidth={3} />
            <span className="text-[10px] font-black text-blue-800 uppercase tracking-[0.3em] font-display">Local Repair Experts</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-slate-900 tracking-tighter leading-none mb-4 font-display">
            {formattedServiceText} in <br className="hidden md:block"/>
            <span className="text-blue-600">{suburbInfo.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic max-w-3xl mx-auto">
            Professional phone repairs for residents across {suburbInfo.name}. Quality service delivered in under 60 minutes.
          </p>
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/#contact" className="w-full sm:w-auto px-10 py-6 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-blue-600 transition-all hover:-translate-y-1 font-display">
              Get Your Phone Fixed
            </Link>
            <a href="tel:0240491735" className="w-full sm:w-auto px-10 py-6 bg-white text-slate-900 border border-slate-200 font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:border-blue-400 transition-all font-display shadow-sm flex items-center justify-center gap-3">
              <Phone className="w-4 h-4 text-blue-600" /> 02 4049 1735
            </a>
          </div>
        </div>
      </section>

      {/* Common Repairs Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
             <h2 className="text-3xl md:text-6xl font-bold text-slate-900 font-display tracking-tight leading-none">Common Repairs</h2>
             <p className="text-xl text-slate-500 font-medium italic">Expert repairs frequently requested by {suburbInfo.name} residents.</p>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] font-display mb-2">Category: Mobile Repairs</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: `Screen Replacement`, icon: Smartphone, desc: 'Complete replacement of cracked screens and OLED displays for all major brands in under 45 minutes.' },
            { title: `Battery Replacement`, icon: BatteryCharging, desc: 'Fast battery swaps to restore your phone\'s battery life and performance to factory standards.' },
            { title: 'Charging Port Repair', icon: Zap, desc: 'Fixing loose or broken charging ports for reliable power. We use high-quality components.' },
            { title: 'Water Damage', desc: 'Expert cleaning and repair for devices exposed to liquid. We save phones that others can\'t.', icon: Droplet }
          ].map((service, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white hover:border-blue-300 transition-all duration-500 shadow-2xl shadow-slate-200/50 group">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                <service.icon className="w-6 h-6 text-slate-400 group-hover:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display tracking-tight">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-950 text-white py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold leading-none font-display tracking-tighter">Why Choose Us?</h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8">
                Why {suburbInfo.name} residents trust Mayfield Phone Repair for quality service.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-10 pt-4">
              {[
                { title: 'Same Day Repairs', desc: 'Most repairs are finished in under 45 minutes. Watch as we fix your device.', icon: Clock },
                { title: '90-Day Warranty', desc: 'Every repair is backed by our solid 90-day hardware warranty for your peace of mind.', icon: ShieldCheck },
                { title: 'Fixed Pricing', desc: 'Honest, upfront pricing. No hidden costs or surprise fees for {suburbInfo.name} residents.', icon: Wrench },
                { title: 'Easy Access', desc: `Conviently located in Mayfield, just a short drive from ${suburbInfo.name} with easy parking.`, icon: MapPin }
              ].map((reason, i) => (
                <div key={i} className="space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <reason.icon className="w-6 h-6 text-blue-400 group-hover:text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 font-display tracking-tight">{reason.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 backdrop-blur-xl rounded-[3.5rem] p-12 border border-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-600/10 blur-[100px] -z-10 rounded-full opacity-50"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-blue-500 font-display">Client Feedback Loops</h3>
              
              <div className="space-y-8">
                 <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 group hover:border-blue-500/50 transition-colors duration-500">
                    <div className="flex text-amber-500 mb-6 gap-0.5">★★★★★</div>
                    <p className="text-slate-200 text-lg italic leading-relaxed font-medium">"Superior technical execution. Drove from {suburbInfo.name} for a terminal diagnosis, fixed within 40 minutes. Essential resource."</p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10"></div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-display">Mayfield Resident_01</p>
                    </div>
                 </div>
                 <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 group hover:border-blue-500/50 transition-colors duration-500 lg:translate-x-12">
                    <div className="flex text-amber-500 mb-6 gap-0.5">★★★★★</div>
                    <p className="text-slate-200 text-lg italic leading-relaxed font-medium">"Highly efficient battery cell calibration. Best restoration hub near {suburbInfo.name}. 10/10 protocol."</p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10"></div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-display">Regional_User_42</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-4xl md:text-7xl font-bold text-slate-900 font-display tracking-tighter leading-none">Our Repair Process</h2>
          <p className="text-xl text-slate-500 font-medium italic">A simple, transparent way to get your hardware back in action.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Truck, title: 'Check In', desc: `Visit our Mayfield shop from ${suburbInfo.name}. We accept walk-ins every day.` },
            { icon: Wrench, title: 'Professional Repair', desc: 'Our technicians use high-quality parts to ensure your phone works like new again.' },
            { icon: Sparkles, title: 'Quality Assurance', desc: 'We test everything before handing it back to ensure a perfect fix every time.' }
          ].map((step, idx) => (
            <div key={idx} className="relative bg-white/60 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white hover:border-blue-400 transition-all duration-500 shadow-2xl shadow-slate-200/40 text-center group">
              <div className="w-20 h-20 bg-blue-100/50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-10 mx-auto border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <step.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display tracking-tight">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">{step.desc}</p>
              
              {idx < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20 text-blue-100">
                  <ArrowRight className="w-12 h-12" strokeWidth={1} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Long-form SEO Content Block */}
      <section className="py-32 px-6 md:px-12 bg-white relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display tracking-tight leading-none italic">
              Premium {formattedServiceText} Services for {suburbInfo.name} Residents
            </h2>
            <div className="prose prose-slate prose-lg lg:prose-xl max-w-none text-slate-600 leading-relaxed font-medium">
              <p>
                Living in <strong>{suburbInfo.name}</strong> means you’re just <strong>{suburbInfo.distance}</strong> away from the most trusted phone repair laboratory in the Hunter region. At Mayfield Phone Repair, we understand that your mobile device is your lifeline—for work, family, and navigation. That’s why we’ve optimized our service protocol to be as efficient as possible, specifically for our neighbors in {suburbInfo.name}.
              </p>
              <p>
                Our technicians are specialists in micro-soldering, component restoration, and certified diagnostics. Whether you’re dealing with a shattered iPhone screen, a Samsung Galaxy with a failing battery, or a Google Pixel that won’t charge, we use only premium-grade parts to ensure your device returns to factory specifications.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-display italic">Why Newcastle Locals Choose Our Mayfield Lab</h3>
              <p>
                While there are many repair options, we differentiate ourselves through transparency and technical depth. Unlike many "mall kiosks," we perform all repairs in a controlled, anti-static laboratory environment. This ensures that delicate internal components, like biometric sensors (Face ID / Fingerprint) and logic boards, are handled with the highest level of care.
              </p>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span><strong>Direct Access:</strong> No middleman. You speak directly to the person repairing your device.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span><strong>Premium Logistics:</strong> We maintain a massive inventory of screens and batteries for all major models, meaning no waiting for orders.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span><strong>Warranty Peace of Mind:</strong> Our 90-day warranty is comprehensive, covering both part defects and our specialized labor.</span>
                </li>
              </ul>
              <p className="mt-12 italic">
                If you reside in <strong>{suburbInfo.name}</strong> or nearby areas like {suburbInfo.nearby.join(' and ')}, don't settle for a subpar fix. Visit us at 276 Maitland Rd, Mayfield, and experience why we are consistently rated #1 for phone repair in the Newcastle area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-40 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display tracking-tight">Need More Info?</h2>
            <p className="text-xl text-slate-500 font-medium italic">Common questions from {suburbInfo.name} residents.</p>
          </div>
          
          <div className="space-y-6">
            {[
              { q: 'How long does a typical repair take?', a: 'Most screen and battery repairs are completed in under 45 minutes while you wait.' },
              { q: 'Do you offer a warranty?', a: 'Yes, every repair includes a 90-day warranty on both parts and labor.' },
              { q: 'Do I need an appointment?', a: 'No, we welcome walk-ins from ' + suburbInfo.name + ' residents during our business hours.' },
              { q: 'Can I get a quote beforehand?', a: 'Absolutely. Call us or visit our contact page for a free, no-obligation quote.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-white group hover:border-blue-500 transition-colors">
                <h4 className="text-xl font-bold text-slate-900 flex items-start gap-4 font-display tracking-tight">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 group-hover:scale-150 transition-transform"></span>
                  {faq.q}
                </h4>
                <p className="mt-6 text-slate-500 text-lg leading-relaxed font-medium pl-6 border-l border-slate-200">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Final CTA */}
      <section className="bg-blue-600 text-white py-40 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]"></div>
        <div className="absolute -left-20 -bottom-20 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold leading-none tracking-tighter font-display">Get It Fixed Properly.</h2>
          <p className="text-blue-100 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto">
            Serving {suburbInfo.name} and surrounding areas like {suburbInfo.nearby.join(', ')} — we are Mayfield Phone Repair. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link to="/#contact" className="w-full sm:w-auto px-12 py-8 bg-white text-blue-600 font-black uppercase tracking-[0.3em] text-xs rounded-3xl shadow-2xl hover:bg-slate-900 hover:text-white transition-all hover:scale-105 font-display">
              Contact Us Now
            </Link>
            <a href="tel:0240491735" className="w-full sm:w-auto px-12 py-8 border-2 border-white/20 text-white font-black uppercase tracking-[0.3em] text-xs rounded-3xl hover:bg-white/10 transition-all font-display flex items-center justify-center gap-4">
              <Phone className="w-5 h-5" /> 02 4049 1735
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
