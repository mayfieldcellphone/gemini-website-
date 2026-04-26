import { Smartphone, Battery, Droplet, Settings, ShieldCheck, Clock, CheckCircle2, ChevronRight, Phone, MapPin, Mail, ArrowRight, Truck, Wrench, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { brands } from '../data/brands';
import { servicesData } from '../data/services';
import { blogPosts } from '../data/blogs';

const BackgroundDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-pulse hidden md:block" />
    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[120px] animate-pulse hidden md:block" style={{ animationDelay: '2s' }} />
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotGrid)" />
    </svg>
  </div>
);

export default function Home() {
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
        <title>Phone Repair Mayfield | Fast Screen & Battery Fix Newcastle</title>
        <meta name="description" content="Newcastle's #1 Phone Repair Shop in Mayfield. We fix iPhone, Samsung, Google Pixel & more. Same-day screen repairs, battery replacements & water damage service. 90-day warranty." />
        <meta property="og:title" content="Expert Phone Repair Mayfield | Same Day Service" />
        <meta property="og:description" content="Cracked screen? Battery issues? Mayfield's trusted phone repair experts are here to help. Fast turnaround and quality parts for all major brands." />
      </Helmet>
      <BackgroundDecoration />
      
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-12 md:py-24 flex flex-col md:flex-row items-center gap-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-[60%] space-y-10 relative z-10 lg:pr-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-widest font-display">Premium phone repair Mayfield NSW</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-slate-900 font-display text-balance">
            Phone Repair in Mayfield <span className="block text-4xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-4 italic font-light">Same Day Service</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
            Cracked screen? Battery draining fast? Get your device fixed today with fast, affordable service and warranty. Trusted by Newcastle locals as the premier choice for certified mobile diagnostics.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <a href="#contact" className="w-full sm:w-auto text-center px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Book a Repair
            </a>
            <a href="tel:0240491735" className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group">
              <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>02 4049 1735</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-6 border-t border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-slate-700 font-display">90-Day Warranty</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-slate-700 font-display">Free Diagnostics</span>
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

      {/* Brands Section with seamless transition */}
      <section id="brands" className="relative px-6 md:px-12 py-20 md:py-24 bg-slate-50/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start mb-20">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] font-display">
                Brands We Fix
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display leading-[0.95]">
                Devices we fix <span className="text-blue-600">daily.</span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl font-medium">
                From high-precision iPhone screen repairs to Samsung Galaxy battery replacements, we have the expertise for every major brand. Select yours below to learn more.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pt-12">
              <a href="#contact" className="group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 transition-all font-bold text-slate-900 shadow-sm">
                <span>Custom Device Repair?</span>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand, idx) => (
              <Link 
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="group relative flex flex-col items-center p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className={`w-20 h-20 rounded-[1.5rem] mb-6 flex items-center justify-center bg-gradient-to-br ${brand.color} shadow-lg shadow-blue-500/10 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500`}>
                  <Smartphone className="w-10 h-10 text-white opacity-95" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg font-display">{brand.name}</h4>
                <div className="mt-4 flex items-center gap-1 text-[10px] text-blue-600 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  View Models <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with glass cards */}
      <section id="services" className="relative px-6 md:px-12 py-20 md:py-24 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center mb-24 space-y-8">
           <h2 className="text-4xl md:text-7xl font-bold text-slate-900 font-display leading-none">
             Our <span className="italic font-light text-blue-600">Services</span>
           </h2>
           <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
             Complex faults require precise attention. We solve the hardware issues that others turn away.
           </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
          {servicesData.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/service/${service.id}`} className="flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-500 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-blue-600/10 transition-colors"></div>
                
                <div className="w-20 h-20 bg-slate-900 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-all duration-500 rotate-0 group-hover:rotate-6 shadow-xl">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                
                <h4 className="text-2xl font-bold text-slate-900 mb-4 font-display group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-500 leading-relaxed font-medium mb-8">{service.shortDesc}</p>
                
                <div className="mt-auto flex items-center text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors gap-2">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process / Steps - Refined Typography & Spacing */}
      <section className="relative px-6 md:px-12 py-20 md:py-24 bg-slate-950 text-white rounded-[4rem_4rem_0_0] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-center relative z-10">
          <div className="w-full md:w-5/12 space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold leading-[0.95] font-display">
              How It <span className="text-blue-500">Works.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              We've designed our process to be simple and transparent. Fast repairs with zero hidden catches.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#contact" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all shadow-2xl shadow-blue-500/20">
                Fix My Phone
              </a>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Call Us</span>
                <span className="font-bold text-lg">02 4049 1735</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-7/12 grid gap-8">
            {[
              { icon: Truck, title: 'Drop Off', desc: 'Securely leave your device at our Mayfield store or use our express mail-in service.' },
              { icon: Settings, title: 'Diagnostics', desc: 'Expert analysis of the fault with a transparent fixed-price quote provided upfront.' },
              { icon: Clock, title: 'Repair', desc: 'Fast restoration using high-quality components. Most screens are ready in 45 minutes.' }
            ].map((step, idx) => (
              <div key={idx} className="group flex gap-8 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-2xl shadow-blue-600/40 group-hover:scale-110 transition-transform">
                   {idx + 1}
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold font-display">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Data Driven */}
      <section id="why-us" className="relative px-6 md:px-12 py-20 md:py-24 bg-slate-950 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-center">
          <div className="w-full md:w-1/2 space-y-12">
             <div className="space-y-4">
               <h2 className="text-4xl md:text-7xl font-bold leading-none font-display">Why <span className="text-blue-500">Choose Us?</span></h2>
               <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg">
                 Repairing what others break through verified standards and uncompromising quality in parts.
               </p>
             </div>
             
             <div className="grid gap-10">
               {[
                 { icon: Clock, title: 'Same Day Service', desc: 'Average turnaround for screen repairs is under 45 minutes.' },
                 { icon: ShieldCheck, title: 'Peace of Mind', desc: 'Every repair is backed by our comprehensive 90-day hardware warranty.' },
                 { icon: Settings, title: 'Quality Parts', desc: 'We only use high-grade components that match your phone\'s original specs.' }
               ].map((feat, idx) => (
                 <div key={idx} className="flex gap-8 group">
                   <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors duration-500">
                     <feat.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                   </div>
                   <div className="space-y-1">
                     <h4 className="text-xl font-bold font-display">{feat.title}</h4>
                     <p className="text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-10 bg-blue-600/20 blur-[120px] rounded-full"></div>
            <div className="relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
               <div className="flex gap-1 mb-8 text-blue-500">
                 {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-6 h-6 fill-current" />)}
               </div>
               <p className="text-2xl md:text-3xl font-bold font-display leading-[1.3] mb-12 italic text-balance text-slate-100">
                 "They revived my water-damaged phone when everyone else said it was gone. True professionals!"
               </p>
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-black shadow-2xl shadow-blue-600/50">MA</div>
                 <div>
                   <div className="font-bold text-xl font-display">Marcus A.</div>
                   <div className="text-slate-500 font-black uppercase tracking-widest text-[10px] mt-1">Verified Customer</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-6">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] font-display">Repair Insights</h2>
              <h3 className="text-4xl md:text-6xl font-bold text-slate-900 font-display leading-[0.95]">
                Latest from our <span className="text-blue-600">experts.</span>
              </h3>
            </div>
            <Link to="/blog" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-900 pb-2 border-b-2 border-slate-900 hover:border-blue-600 hover:text-blue-600 transition-all">
              View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {blogPosts.slice(0, 3).map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-200 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h4 className="text-xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:gap-4 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-24 bg-white rounded-[4rem_4rem_0_0] -mt-16 z-20">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] font-display text-center">Common Questions</h2>
            <h3 className="text-4xl md:text-7xl font-bold text-slate-900 font-display leading-tight text-center">Frequently asked questions</h3>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`group border rounded-[2rem] overflow-hidden transition-all duration-500 ${activeFaq === idx ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 hover:border-slate-300 bg-slate-50/50'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left outline-none"
                  aria-expanded={activeFaq === idx}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="text-lg md:text-xl font-bold text-slate-900 font-display flex items-center gap-6">
                    <span className={`w-3 h-3 rounded-full transition-colors ${activeFaq === idx ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 transition-all ${activeFaq === idx ? 'bg-blue-600 border-blue-600 rotate-90' : 'bg-white'}`}>
                    <ChevronRight className={`w-5 h-5 transition-colors ${activeFaq === idx ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                    >
                      <div className="px-20 pb-10 text-slate-600 font-medium text-lg leading-relaxed">
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

      {/* Contact Section */}
      <section id="contact" className="relative px-6 md:px-12 py-20 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] font-display">Visit Our Shop</h2>
            <h3 className="text-5xl md:text-8xl font-bold text-slate-900 font-display leading-[0.85] text-balance">
              Mayfield <br/> <span className="text-blue-600 font-light italic">Phone Repair.</span>
            </h3>
            <p className="text-slate-500 text-xl leading-relaxed font-medium">
              Expert repairs you can trust. No appointment needed—just walk in during our opening hours for a fast diagnostic.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Column 1: Location & Call */}
            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 transition-all duration-500">
                  <MapPin className="w-8 h-8 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display mb-2 text-slate-900 uppercase tracking-widest text-xs">Location</h4>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed font-display">276 Maitland Rd, <br/> Mayfield, NSW 2304</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <a href="tel:0240491735" className="flex items-center gap-6 p-4 bg-slate-900 rounded-[2rem] text-white hover:scale-105 transition-transform duration-500 shadow-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">Direct Call</span>
                    <span className="text-lg font-bold font-display">02 4049 1735</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 2: Hours & SMS */}
            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 transition-all duration-500">
                  <Clock className="w-8 h-8 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display mb-2 text-slate-900 uppercase tracking-widest text-xs">Opening Hours</h4>
                  <div className="text-slate-500 text-base font-medium space-y-1 font-display">
                    <p className="flex justify-between gap-4"><span>Mon - Fri:</span> <span>09:00 — 17:00</span></p>
                    <p className="flex justify-between gap-4"><span>Sat:</span> <span>10:00 — 16:00</span></p>
                    <p className="flex justify-between gap-4"><span>Sun:</span> <span>10:00 — 14:00</span></p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Link to="/after-hours" className="flex items-center gap-6 p-4 bg-white border-2 border-emerald-500 rounded-[2rem] text-slate-900 hover:scale-105 transition-transform duration-500 shadow-lg group">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">After Hours Service</span>
                    <span className="text-lg font-bold font-display">SMS 0431 618 100</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Column 3: Quote Form */}
            <div className="relative">
               <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] -z-10 rotate-2"></div>
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]">
                  <h3 className="text-2xl font-bold font-display mb-8 text-slate-900">Get a Free Quote</h3>
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all text-sm font-medium" 
                      placeholder="Ex: John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all text-sm font-medium" 
                      placeholder="Ex: 0400 000 000" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">How can we help?</label>
                    <textarea 
                      rows={3} 
                      required
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all text-sm font-medium resize-none" 
                      placeholder="Describe the issue..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_15px_30px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-500 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                  {submitStatus === 'success' && (
                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">Request Sent Successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest text-center">Error sending request. Please try again.</p>
                  )}
                </form>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
