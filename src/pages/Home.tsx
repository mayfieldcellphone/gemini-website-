import { Smartphone, Battery, Droplet, Settings, ShieldCheck, Clock, CheckCircle2, ChevronRight, Phone, MapPin, Mail, ArrowRight, Truck, Wrench, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { servicesData } from '../data/services';

export default function Home() {
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const faqs = [
    { q: "Do I need to make an appointment?", a: "No appointment necessary! Walk-ins are always welcome during our normal business hours. If you are in a rush, calling ahead can help us ensure we have your specific part reserved and ready." },
    { q: "How long does a typical repair take?", a: "Most standard repairs like screen replacements and battery swaps are completed in under 45 minutes. More complex issues like water damage or micro-soldering can take 24-48 hours." },
    { q: "Will I lose the data on my device?", a: "For 99% of repairs (screens, batteries, charging ports), your data is completely safe and unaffected. However, we always highly recommend backing up your data before bringing your device in just to be completely safe." },
    { q: "What kind of warranty do you provide?", a: "We stand strictly by the quality of our parts and our labor. All repairs come automatically with our 90-day comprehensive warranty covering any defects in the parts we install." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 flex flex-col md:flex-row items-center gap-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[55%] space-y-8 relative z-10 lg:pr-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Premium phone repair Mayfield NSW</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Phone Repair in Mayfield <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mt-2">– Same Day Service</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
            Cracked screen? Battery draining fast? Get your device fixed today with fast, affordable service and warranty. If you are looking for trusted phone repair Newcastle or the surrounding suburbs, our certified technicians offer the fast phone repair service you need.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <a href="#contact" className="w-full sm:w-auto text-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
              Book a Repair
            </a>
            <a href="tel:0240491735" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition cursor-pointer">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>02 4049 1735</span>
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>90-Day Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free Diagnostics</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[45%] relative z-10"
        >
          {/* Background decoration */}
          <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[3rem] transform rotate-3"></div>
          
          {/* Main Image Container */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl shadow-2xl overflow-hidden border border-white">
            <img 
              src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=800" 
              alt="Phone repair technician working on a smartphone" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
          
          {/* Floating Trust Card 1: Reviews */}
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 -left-4 sm:-left-8 lg:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+1k</div>
            </div>
            <div>
              <div className="flex text-amber-400 text-sm tracking-widest">
                ★★★★★
              </div>
              <div className="text-xs font-bold text-slate-800">5.0 Local Rating</div>
            </div>
          </motion.div>

          {/* Floating Trust Card 2: Speed */}
          <motion.div 
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-12 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">Same-Day Fix</div>
              <div className="text-xs font-medium text-slate-500">Usually under 30 mins</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Supported Brands Section */}
      <section id="brands" className="px-6 md:px-12 py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl space-y-4">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Select Your Brand</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">Devices we repair daily</h3>
              <p className="text-slate-600 text-lg">From expert iPhone repair Mayfield options to complete Samsung repair Newcastle services, we securely service all major manufacturers. Choose your brand below to view models and specific repair expertise.</p>
            </div>
            <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group">
              Don't see your brand? Contact us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            {brands.map((brand, idx) => (
              <Link 
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="group flex flex-col items-center p-8 bg-white hover:bg-slate-50 border-r border-b border-slate-100 transition-all text-center relative overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ${brand.color} shadow-lg shadow-slate-200 group-hover:-translate-y-1 transition-transform duration-300`}>
                  <Smartphone className="w-8 h-8 text-white opacity-90" />
                </div>
                <h4 className="font-bold text-slate-900">{brand.name}</h4>
                <div className="absolute inset-x-0 bottom-3 text-[10px] text-blue-600 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Models
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 md:px-12 py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Our Services</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">What we can fix for you</h3>
          <p className="text-slate-600 text-lg lg:text-xl">We tackle everything from simple glass replacements to complex logic board micro-soldering diagnostics.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {servicesData.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/service/${service.id}`} className="block h-full bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-100 transition-all relative group">
                <div className="w-14 h-14 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  {service.title} <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h4>
                <p className="text-slate-600 leading-relaxed">{service.shortDesc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process / How it works */}
      <section className="px-6 md:px-12 py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">How it Works</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Get back to your life in three simple steps.
            </h3>
            <p className="text-slate-600 text-lg">We have streamlined our repair process to ensure you are never without your device for too long. Transparency and speed are our priority.</p>
            
            <a href="#contact" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-slate-200 hover:bg-slate-800 transition">
              Start Your Repair
            </a>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            {[
              { icon: Truck, title: '1. Drop Off or Mail In', desc: 'Visit our Mayfield location directly, or mail your device into us securely if you are out of town.' },
              { icon: Wrench, title: '2. Free Diagnostic & Quote', desc: 'Our technicians run a full multi-point diagnostic and provide a transparent, no-obligation quote before any work starts.' },
              { icon: Sparkles, title: '3. Repaired & Returned', desc: 'Using premium parts, we repair your device (often within an hour) and return it to you looking brand new.' }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 bg-white shrink-0 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="px-6 md:px-12 py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 space-y-8">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">Why choose Mayfield Repair?</h2>
             <p className="text-slate-400 text-lg leading-relaxed">
               We know how important your device is to your daily life. That's why we specialize in same day phone repair, focusing on speed, quality, and transparency. No hidden fees, just affordable phone repair near me that you can trust.
             </p>
             <div className="space-y-6">
               {[
                 { icon: Clock, title: 'Fast Turnaround', desc: 'Most standard repairs like LCD screens and batteries are completed in under an hour while you wait.' },
                 { icon: ShieldCheck, title: '90-Day Guarantee', desc: 'We stand firmly behind our work. All repairs cover a comprehensive 90-day warranty on parts and labor.' },
                 { icon: Settings, title: 'Premium Components', desc: 'We strictly use OEM-quality and original-specification replacement parts to ensure your phone functions like it just left the factory.' }
               ].map((feat, idx) => (
                 <div key={idx} className="flex gap-5">
                   <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                     <feat.icon className="w-6 h-6 text-blue-400" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold mb-1 text-white">{feat.title}</h4>
                     <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-slate-800 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-2xl relative">
              <div className="absolute -top-5 -right-5 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl rotate-3 shadow-xl">
                Free Diagnostics!
              </div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-blue-400 text-4xl leading-none">“</span>
                What our customers say
              </h3>
              <div className="space-y-6">
                <div className="bg-slate-700/50 p-8 rounded-2xl border border-slate-600/50">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[1,2,3,4,5].map(i => <ShieldCheck key={i} className="w-5 h-5 fill-current text-yellow-500" />)}
                  </div>
                  <p className="text-slate-300 italic mb-6 text-lg leading-relaxed">"Absolutely incredible service. I dropped my iPhone in the pool and thought it was completely dead. The team at Mayfield Repair got it back to life the very next day. Saved all my photos and vacation memories! Unbelievable."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-lg font-bold text-white">S</div>
                    <div>
                      <div className="font-bold text-white">Sarah Jenkins</div>
                      <div className="text-blue-400 text-sm">Mayfield Resident</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Got questions?</h3>
            <p className="text-slate-600 text-lg">We believe in full transparency. Here are the answers to some of the most common questions our clients ask.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'border-blue-300 shadow-md' : 'border-slate-200 hover:border-blue-200'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-900 outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-90 text-blue-600' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Location */}
      <section id="contact" className="px-6 md:px-12 py-24 bg-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Visit Us</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Drop in today for a quick fix.</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Stop searching for a "mobile repair shop near me" and walk right in. No appointment needed. Come by anytime during our business hours to get a free diagnostic test and an accurate quote.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-blue-100 transition-colors">
                 <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 mb-4">
                   <MapPin className="w-6 h-6 text-blue-600" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg mb-2">Our Location</h4>
                 <p className="text-slate-600">276 Maitland Rd<br/>Mayfield, NSW, 2304</p>
               </div>
               
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-blue-100 transition-colors">
                 <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 mb-4">
                   <Clock className="w-6 h-6 text-blue-600" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg mb-2">Business Hours</h4>
                 <p className="text-slate-600 mb-1">Mon - Fri: 9:00 AM - 5:00 PM</p>
                 <p className="text-slate-600 mb-2">Sat: 10:00 AM - 4:00 PM | Sun: 10:00 AM - 2:00 PM</p>
                 <p className="text-xs text-slate-500 font-medium">After-hour service by appointment</p>
               </div>
               
               <div className="sm:col-span-2 bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-6">
                 <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                   <Phone className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 text-lg mb-1">Direct Contact</h4>
                   <p className="text-blue-800 font-semibold text-xl">0431 618 100</p>
                   <p className="text-blue-600/80">Call or SMS for immediate assistance</p>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 relative">
             <div className="absolute top-0 right-10 translate-y-[-50%] bg-slate-900 text-white font-bold px-6 py-2 rounded-full shadow-lg">
               Fast Response
             </div>
             <h3 className="text-3xl font-extrabold mb-8">Send us a message</h3>
             <form className="space-y-5">
               <div className="grid sm:grid-cols-2 gap-5">
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                   <input type="text" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="John" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                   <input type="text" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="Doe" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                 <input type="tel" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="(555) 000-0000" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Device & Issue Description</label>
                 <textarea rows={5} className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition resize-none" placeholder="e.g. iPhone 13 Pro Max - Dropped it face down and the screen is totally shattered and black."></textarea>
               </div>
               <button type="button" className="w-full bg-blue-600 text-white font-bold py-5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300 transition-all flex items-center justify-center gap-2 text-lg">
                 Submit Request <ChevronRight className="w-6 h-6" />
               </button>
               <p className="text-center text-slate-500 text-sm mt-4">We typicaly reply to inquiries within 30 minutes during business hours.</p>
             </form>
          </div>
        </div>
      </section>
    </>
  );
}
