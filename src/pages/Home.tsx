import { Smartphone, Battery, Droplet, Settings, ShieldCheck, Clock, CheckCircle2, ChevronRight, Phone, MapPin, Mail, ArrowRight, Truck, Wrench, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useUI } from '../contexts/UIContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendSMSNotification } from '../lib/notifications';
import { brands } from '../data/brands';
import { servicesData } from '../data/services';
import { blogPosts } from '../data/blogs';

const BackgroundDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 opacity-[0.4]" />
    <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse hidden md:block" />
    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse hidden md:block" style={{ animationDelay: '2s' }} />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200/50 hidden lg:block" />
    <div className="absolute top-1/3 left-0 w-full h-px bg-slate-200/50 hidden lg:block" />
  </div>
);

export default function Home() {
  const { openBooking } = useUI();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.details) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Send SMS Notification
      await sendSMSNotification('quote', formData);

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', details: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'quotes');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="relative">
      <Helmet>
        <title>iPhone 17 & 16 Repair Mayfield | Samsung S26 Screen Fix Newcastle</title>
        <meta name="description" content="Mayfield's leading repair shop for the newest iPhone 17, 16, and Samsung S26 series. Same-day screen repairs, battery replacements & water damage service in Newcastle. 90-day warranty." />
        <meta property="og:title" content="Expert iPhone 17 & 16 Repair Mayfield | Same Day Service" />
        <meta property="og:description" content="Cracked iPhone 17 screen? Samsung S26 battery issues? Mayfield's trusted experts fix the newest flagships with quality parts and fast turnaround." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </Helmet>
      <BackgroundDecoration />
      
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 md:py-32 flex flex-col md:flex-row items-center gap-12 lg:gap-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-[55%] space-y-10 relative z-10 lg:pr-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-technical text-blue-700">PREMIER REPAIR SERVICE // MAYFIELD</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.85] tracking-tighter text-slate-900 font-display text-balance">
            Phone <br/>
            Repair <br/>
            <span className="text-blue-600">Newcastle & Mayfield.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-xl font-medium border-l-4 border-blue-100 pl-6">
            Mayfield's highest-rated specialists for high-spec device restoration. We provide Newcastle with precision repairs that other shops turn away. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={openBooking}
              className="w-full sm:w-auto text-center px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-slate-900/20 hover:bg-blue-600 hover:-translate-y-1 transition-all"
            >
              Book A Repair
            </button>
            <Link 
              to="/#contact"
              className="w-full sm:w-auto text-center px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              Get A Quote
            </Link>
            <a href="tel:0240491735" className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-50 transition-all group">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>02 4049 1735</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
            <div className="space-y-1">
              <span className="text-technical text-slate-400">WARRANTY_TYPE</span>
              <p className="text-sm font-bold text-slate-900 font-display uppercase tracking-widest">90-Day Hardware Guarantee</p>
            </div>
            <div className="space-y-1">
              <span className="text-technical text-slate-400">DIAGNOSTIC_FEE</span>
              <p className="text-sm font-bold text-slate-900 font-display uppercase tracking-widest">$0.00 / Free Check-up</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[40%] relative z-10"
        >
          {/* Main Image Container with offset layout */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative aspect-[4/5] rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=800" 
                alt="Expert phone repair" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating Trust Card: Social Proof */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-4 md:-right-10 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100/50 flex flex-col gap-3 min-w-[200px]"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+1,200 Fixed</span>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-xs font-black text-slate-900">5.0 RATING</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="relative px-6 md:px-12 py-20 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-technical text-blue-600">SUPPORTED MODELS</span>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 font-display leading-[0.85] tracking-tighter">
                Devices <br/> We Fix.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                Comprehensive support for all major flagship phones. Select your brand below for specific repair details and pricing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-3xl">
            {brands.map((brand, idx) => (
              <Link 
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="group relative flex flex-col items-center p-8 bg-white hover:bg-slate-50 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${brand.color} shadow-lg shadow-blue-500/10 group-hover:-translate-y-1 transition-all duration-300`}>
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-display tracking-wider uppercase">{brand.name}</h4>
                <div className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                  Explore Repairs
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
            <div className="space-y-4">
              <span className="text-technical text-slate-400">OUR REPAIR SERVICES</span>
              <h2 className="text-4xl md:text-8xl font-black text-slate-900 font-display leading-none tracking-tighter">
                Specialist <span className="italic font-light text-blue-600 underline underline-offset-8">Service.</span>
              </h2>
            </div>
            <p className="md:max-w-xs text-slate-500 text-xs font-semibold leading-relaxed">
              Equipped with precision tools for screen repairs, battery replacements, and structural restoration in Mayfield.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/service/${service.id}`} className="flex flex-col h-full bg-slate-50 border border-slate-100 p-10 rounded-3xl hover:border-blue-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-10">
                    <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                      <service.icon className="w-7 h-7 text-slate-900 group-hover:text-white" />
                    </div>
                    <span className="text-technical text-slate-300 group-hover:text-blue-200">STEP 0{idx + 1}</span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 font-display tracking-tight group-hover:text-blue-600">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 line-clamp-2">{service.shortDesc}</p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600">
                    <span>View Service Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Steps */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 bg-slate-950 text-white rounded-[3rem_3rem_0_0] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 opacity-[0.03]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-center relative z-10">
          <div className="w-full md:w-5/12 space-y-10">
            <div className="space-y-4">
              <span className="text-technical text-blue-500">OUR REPAIR PROCESS</span>
              <h2 className="text-4xl md:text-7xl font-black leading-[0.85] font-display tracking-tighter">
                How We <br/> <span className="text-blue-500 underline underline-offset-8">Fix.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              A systematic approach to device restoration. Transparent, fast, and verified by standard tests.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={openBooking}
                className="w-full sm:w-auto bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-2xl shadow-blue-500/20"
              >
                Book Repair
              </button>
              <Link
                to="/#contact"
                className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 text-center"
              >
                Get Quote
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-7/12 grid gap-4">
            {[
              { icon: Truck, title: 'Drop Off', desc: 'Secure drop-off at our Mayfield store or express mail-in with tracking.' },
              { icon: Settings, title: 'Diagnostics', desc: 'Expert analysis of the fault with a fixed-price quote provided upfront.' },
              { icon: Clock, title: 'Repair', desc: 'Complete restoration and full function testing. Most fixed in 45m.' }
            ].map((step, idx) => (
              <div key={idx} className="group flex gap-8 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-technical text-white/10 font-black text-4xl">0{idx + 1}</div>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl shadow-2xl shadow-blue-600/40 group-hover:scale-105 transition-transform">
                   <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-1 relative z-10">
                  <h4 className="text-xl font-bold font-display uppercase tracking-wider">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-md">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="relative px-6 md:px-12 py-20 md:py-32 bg-slate-950 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full md:w-1/2 space-y-12">
             <div className="space-y-4">
               <span className="text-technical text-blue-500">SERVICE GUARANTEE</span>
               <h2 className="text-4xl md:text-7xl font-black leading-none font-display tracking-tighter">Why <br/> Choose Us?</h2>
               <p className="text-slate-400 text-lg font-medium max-w-lg">
                 Mayfield's leading choice for flagship performance through verified components and Newcastle's best experts.
               </p>
             </div>
             
             <div className="grid gap-8">
               {[
                 { icon: Clock, title: 'FAST TURNAROUND', desc: 'Most screen repairs completed in under 45 minutes.' },
                 { icon: ShieldCheck, title: '90-DAY WARRANTY', desc: 'Comprehensive guarantee on all parts and labor.' },
                 { icon: Settings, title: 'QUALITY PARTS', desc: 'Components verified to meet original manufacturer standards.' }
               ].map((feat, idx) => (
                 <div key={idx} className="flex gap-6 group">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                     <feat.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                   </div>
                   <div className="space-y-0.5">
                     <h4 className="text-technical text-slate-100">{feat.title}</h4>
                     <p className="text-slate-400 text-sm font-medium">{feat.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-10 bg-blue-600/20 blur-[120px] rounded-full"></div>
            <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
               <div className="flex gap-1 mb-8 text-blue-500">
                 {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-4 h-4 fill-current" />)}
               </div>
               <p className="text-xl md:text-3xl font-bold font-display leading-tight mb-8 italic text-slate-100">
                 "Professional service that saved my data when others said it was impossible. Highly recommended."
               </p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-sm font-black shadow-lg">MA</div>
                 <div>
                   <div className="font-bold text-base font-display">Marcus A.</div>
                   <div className="text-technical text-slate-500">VERIFIED CUSTOMER</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-4">
              <span className="text-technical text-blue-600">REPAIR INSIGHTS</span>
              <h3 className="text-4xl md:text-7xl font-black text-slate-900 font-display leading-[0.85] tracking-tighter">
                Latest <br/> Updates.
              </h3>
            </div>
            <Link to="/blog" className="group flex items-center gap-3 text-technical text-slate-900 border-b-2 border-slate-900 hover:border-blue-600 hover:text-blue-600 transition-all">
              VIEW ARCHIVE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 transition-all font-display"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>
                <div className="p-10 space-y-4 flex-1 flex flex-col">
                  <span className="text-technical text-slate-400">POSTED: {new Date(post.date).toLocaleDateString()}</span>
                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="mt-auto pt-8 flex items-center gap-2 text-technical text-blue-600">
                    READ MORE <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="text-technical text-blue-600">COMMON QUESTIONS</span>
            <h3 className="text-4xl md:text-8xl font-black text-slate-900 font-display leading-[0.85] tracking-tighter">Support.</h3>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`group border rounded-3xl overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'border-blue-500 bg-white shadow-xl shadow-blue-500/5' : 'border-slate-200 bg-white/50 hover:bg-white'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left outline-none"
                >
                  <span className="text-lg md:text-2xl font-bold text-slate-900 font-display flex items-center gap-6">
                    <span className="text-technical text-blue-600 opacity-50">Q{idx + 1}</span>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 transition-all ${activeFaq === idx ? 'bg-blue-600 border-blue-600 rotate-90 text-white' : 'text-slate-400'}`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-20 pb-10 text-slate-500 font-medium text-lg leading-relaxed border-t border-slate-50 pt-8 mx-4">
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

      {/* Service Areas Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <span className="text-technical text-slate-400">MAYFIELD REPAIR REGISTRY</span>
            <div className="h-px flex-1 bg-slate-200 hidden md:block"></div>
            <span className="text-technical text-blue-600">CERTIFIED QUALITY</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[12px] font-black text-slate-400 font-sans tracking-widest leading-loose">
            <span className="hover:text-blue-600 transition-colors uppercase">IPHONE 17 PRO MAX REPAIR</span>
            <span className="hover:text-blue-600 transition-colors uppercase">SAMSUNG S26 ULTRA DISPLAY</span>
            <span className="hover:text-blue-600 transition-colors uppercase">IPHONE 16 BATTERY SWAP</span>
            <span className="hover:text-blue-600 transition-colors uppercase">PIXEL 10 PRO SCREEN FIX</span>
            <span className="hover:text-blue-600 transition-colors uppercase">IPAD PRO M4 GLASS REPAIR</span>
            <span className="hover:text-blue-600 transition-colors uppercase">Z FOLD 7 HINGE SERVICE</span>
            <span className="hover:text-blue-600 transition-colors uppercase">S25 COMPACT REPAIR SERVICE</span>
          </div>

          <div className="mt-24 pt-24 border-t border-slate-100">
            <div className="text-center space-y-4 mb-16">
              <span className="text-technical text-blue-600">NEWCASTLE & HUNTER REGION</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tighter">Areas We Service.</h2>
              <p className="text-slate-500 font-medium italic max-w-2xl mx-auto">Providing Newcastle and the surrounding suburbs with premium-grade phone restoration services.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Newcastle', id: 'newcastle' },
                { name: 'Mayfield', id: 'mayfield' },
                { name: 'Waratah', id: 'waratah' },
                { name: 'Hamilton', id: 'hamilton' },
                { name: 'Wallsend', id: 'wallsend' },
                { name: 'Jesmond', id: 'jesmond' },
                { name: 'Lambton', id: 'lambton' },
                { name: 'Merewether', id: 'merewether' },
                { name: 'Charlestown', id: 'charlestown' },
                { name: 'Broadmeadow', id: 'broadmeadow' },
                { name: 'Kotara', id: 'kotara' },
                { name: 'Islington', id: 'islington' }
              ].map((area) => (
                <Link 
                  key={area.id}
                  to={`/phone-repair/${area.id}`}
                  className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all font-display font-bold text-sm tracking-tight"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-950 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2"></div>
            <div className="absolute inset-0 bg-grid-slate-100 opacity-[0.02]" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="w-full lg:w-[45%] space-y-12">
                <div className="space-y-6">
                  <span className="text-technical text-blue-500">CONTACT US</span>
                  <h2 className="text-5xl md:text-8xl font-black text-white font-display leading-[0.85] tracking-tighter">
                    Ready to <br/> <span className="text-blue-500">Fix?</span>
                  </h2>
                  <p className="text-slate-400 text-lg font-medium max-w-sm">
                    Enter your repair details below for a quote and to get your device booked in.
                  </p>
                </div>
                
                <div className="grid gap-8">
                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                        <MapPin className="w-6 h-6 text-blue-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-technical text-slate-500">SHOP LOCATION</p>
                        <p className="text-white font-bold text-lg font-display">276 Maitland Rd, Mayfield NSW 2304</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                        <Phone className="w-6 h-6 text-blue-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-technical text-slate-500">DIRECT PHONE</p>
                        <p className="text-white font-bold text-lg font-display">02 4049 1735</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                        <Clock className="w-6 h-6 text-blue-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-technical text-slate-500">OPENING HOURS</p>
                        <p className="text-white font-bold text-lg font-display">M-F: 09:00-17:00 | SAT: 10:00-16:00</p>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <Link to="/after-hours" className="flex items-center gap-8 p-6 bg-white/5 border border-emerald-500/30 rounded-3xl text-white hover:bg-emerald-500/10 transition-all group">
                    <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-technical text-emerald-400">AFTER HOURS SUPPORT</span>
                      <span className="text-xl font-bold font-display tracking-tight text-white">SMS 0431 618 100</span>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="w-full lg:w-[55%]">
                <div className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-200 shadow-2xl relative">
                  <h3 className="text-3xl font-black font-display mb-10 text-slate-900 uppercase tracking-tight">Request Estimate</h3>
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-technical text-slate-400 ml-1">YOUR NAME</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all text-base font-medium" 
                          placeholder="Ex: John Doe" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-technical text-slate-400 ml-1">YOUR PHONE</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all text-base font-medium" 
                          placeholder="Ex: 0400 000 000" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-technical text-slate-400 ml-1">REPAIR DETAILS</label>
                      <textarea 
                        rows={4} 
                        required
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all text-base font-medium resize-none" 
                        placeholder="What needs fixing?"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 text-white font-black uppercase tracking-[0.2em] py-6 rounded-2xl shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'SENDING...' : 'GET MY QUOTE'}
                    </button>
                    {submitStatus === 'success' && (
                      <p className="text-technical text-emerald-600 text-center animate-bounce">REQUEST SENT SUCCESSFULLY</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-technical text-rose-600 text-center">ERROR SENDING REQUEST</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
