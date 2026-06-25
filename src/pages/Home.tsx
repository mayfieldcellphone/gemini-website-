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
import { OpeningStatus } from '../components/OpeningStatus';
import BirdeyeReviewWidget from '../components/BirdeyeReviewWidget';

const BackgroundDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50/50">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />
    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(99,102,241,0.08)_0%,_transparent_50%)]" />
    <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/40 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
    <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] hidden md:block" />
    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] hidden md:block" />
  </div>
);

export default function Home() {
  const { openBooking } = useUI();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isMobile, setIsMobile] = useState(false);

  // Speed optimization: Detect mobile and simplify DOM
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.details) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Original local record
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Send SMS Notification (which also syncs to external CRM/Inbox)
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
    { q: "How much does an iPhone screen replacement cost?", a: "iPhone screen replacement starts from $89, depending on the model. Newer models like the iPhone 15 Pro Max will be at the higher end, while older models like the iPhone 11 are more affordable. Call us at <a href=\"tel:+61240491735\">(02) 4049 1735</a> for an exact quote for your specific iPhone model. To compare local pricing trends across the country, check out the national <a href=\"https://repairrange.io/repair/phone-repair-costs-australia.html\" target=\"_blank\" rel=\"noopener\">Australia phone repair costs</a> on RepairRange." }
  ];

  return (
    <div className="relative">
      <Helmet>
        <title>iPhone 17 & 16 Repair Mayfield | Samsung S26 Screen Fix Newcastle</title>
        <meta name="description" content="Same-day iPhone 17, 16 & Samsung S26 repairs in Mayfield, Newcastle. Screen fixes, battery replacements & water damage. 90-day warranty guaranteed." />
        <link rel="canonical" href="https://mayfieldphonerepair.com.au" />
        <meta property="og:title" content="Expert iPhone 17 & 16 Repair Mayfield | Same Day Service" />
        <meta property="og:description" content="Cracked iPhone 17 screen? Samsung S26 battery issues? Mayfield's trusted experts fix the newest flagships with quality parts and fast turnaround." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "MobilePhoneRepairShop",
                "name": "Mayfield Phone Repair",
                "image": "https://mayfieldphonerepair.com.au/logo.png",
                "@id": "https://mayfieldphonerepair.com.au#organization",
                "url": "https://mayfieldphonerepair.com.au",
                "telephone": "02 4049 1735",
                "priceRange": "$$",
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
                ],
                "sameAs": [
                  "https://www.facebook.com/mayfieldcellphonerepairs/",
                  "https://www.instagram.com/mayfieldcellphonerepairs/",
                  "https://twitter.com/Mayfiel32990272",
                  "https://www.linkedin.com/company/mayfield-cell-phone-repairs/",
                  "https://www.youtube.com/@mayfieldcellphonerepairs",
                  "https://www.tiktok.com/@mayfield.cell.pho"
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })}
        </script>
      </Helmet>
      <BackgroundDecoration />
      
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-8 pb-16 md:pt-16 md:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[60%] space-y-8 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight lg:leading-[0.9] tracking-tighter text-slate-900 font-display italic">
            Phone Repair <br className="hidden md:block" />
            <span className="text-blue-600 font-display not-italic">Newcastle <span className="text-blue-600/30 font-sans">&</span> Mayfield.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl font-medium border-l-4 border-blue-600/20 pl-6 italic">
            Mayfield's highest-rated specialists for high-spec device restoration. Newcastle's premium choice for repairs that others turn away.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <button 
              onClick={openBooking}
              className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-slate-950/20 hover:bg-blue-600 hover:-translate-y-1 transition-all"
            >
              Book A Repair
            </button>
            <Link 
              to="/#contact"
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all text-center"
            >
              Talk to Us
            </Link>
            <a href="tel:0240491735" className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-black uppercase tracking-[0.15em] text-[10px] text-slate-600">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>02 4049 1735</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 pt-10 border-t border-slate-200/60">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">WARRANTY_TYPE</span>
              <p className="text-sm font-bold text-slate-900 font-display uppercase tracking-widest">90-Day Hardware Guarantee</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">DIAGNOSTIC_FEE</span>
              <p className="text-sm font-bold text-slate-900 font-display uppercase tracking-widest">$0.00 / Free Check-up</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[40%] relative z-10 perspective-1000"
        >
          <div className="relative group">
            {/* Visual element that fills the space better */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/20 to-indigo-600/10 rounded-full blur-[100px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative aspect-[3/4] md:aspect-square bg-slate-900 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-white/5 group-hover:border-blue-500/20 transition-colors duration-700">
              <img 
                src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=800" 
                alt="Precision phone repair in Mayfield shop" 
                className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000 opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              {/* Floating Tech Overlay */}
              <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="customer" />
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Performance</p>
                    <p className="text-sm font-bold text-white">99.8% SUCCESS</p>
                  </div>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '99%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  />
                </div>
              </div>
            </div>

            {/* Rating Pill */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col items-center gap-1"
            >
              <div className="flex text-amber-400 gap-0.5">
                {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <span className="text-[10px] font-black text-slate-900 tracking-tighter">5.0 GOOGLE RATING</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="relative px-6 md:px-12 py-12 md:py-20 bg-slate-50 border-y border-slate-200">
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

          {/* Pricing Transparency Summary Table Module */}
          <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/60 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] font-display">PRICING TRANSPARENCY</span>
              <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900">Estimated Repair Starting Prices</h3>
              <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                No hidden fees or surprises. Below are estimates for popular screens, batteries, and diagnostic assessments across Newcastle and Mayfield.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] font-display">
                    <th className="py-4 px-6 md:px-8">Brand Ecosystem</th>
                    <th className="py-4 px-6 md:px-8">Screen Restoration</th>
                    <th className="py-4 px-6 md:px-8">Battery Cell Replacement</th>
                    <th className="py-4 px-6 md:px-8">Diagnostic Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {brands.map((brand) => (
                    <tr key={brand.id} className="hover:bg-white transition-colors">
                      <td className="py-4 px-6 md:px-8 font-bold text-slate-900 flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${brand.color}`} />
                        {brand.name}
                      </td>
                      <td className="py-4 px-6 md:px-8 text-blue-600 font-bold">From ${brand.startingPrice.screen}</td>
                      <td className="py-4 px-6 md:px-8 text-emerald-600 font-bold">From ${brand.startingPrice.battery}</td>
                      <td className="py-4 px-6 md:px-8 text-slate-400 font-semibold italic">Always $0.00 / Free</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
              <p className="italic text-center md:text-left">* Prices vary by model and grade of components. Standard assessment is always free of cost.</p>
              <button onClick={openBooking} className="text-blue-600 hover:text-blue-700 whitespace-nowrap flex items-center gap-2 group font-black uppercase tracking-widest text-[10px] cursor-pointer">
                GET REPAIR QUOTE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* RepairRange Verification Note */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 font-medium">
                Prices verified by <a href="https://repairrange.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-semibold hover:underline">RepairRange.io</a> — Australia's independent repair cost database
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative px-6 md:px-12 py-12 md:py-20 bg-white">
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

          {/* DIY Repair Kits Promo Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-[2.5rem] mt-16 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-slate-200 transition-all duration-300 relative overflow-hidden"
          >
            <div className="space-y-4 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00C2A8]/10 text-teal-600 uppercase tracking-wider">
                DIY Option
              </span>
              <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight">On a Budget? Fix It Yourself</h3>
              <p className="text-slate-600 max-w-2xl font-medium text-sm md:text-base leading-relaxed">
                We supply DIY screen and battery replacement kits with all the tools you need. Kits start from $22 with a 90-day warranty and same-day dispatch.
              </p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <a 
                href="https://selfrepairkit.com.au/shop.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#00C2A8] text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-950 hover:text-white transition-all duration-300 shadow-xl shadow-[#00C2A8]/20 w-full md:w-auto text-center"
              >
                Browse DIY Kits
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process / Steps */}
      <section className="relative px-6 md:px-12 py-12 md:py-20 bg-slate-950 text-white rounded-[3rem_3rem_0_0] overflow-hidden">
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
                Talk to Us
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
      <section id="why-us" className="relative px-6 md:px-12 py-12 md:py-24 bg-slate-950 text-white border-t border-white/5">
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

      {/* Birdeye Reviews Widget */}
      <BirdeyeReviewWidget />

      {/* Blog Section */}
      <section className="relative px-6 md:px-12 py-12 md:py-20 bg-white">
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
            {blogPosts
              .filter(post => post.date <= new Date().toISOString().split('T')[0])
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3)
              .map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 transition-all font-display"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={`Mayfield Phone Repair Blog: ${post.title}`} 
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
      <section className="relative px-6 md:px-12 py-12 md:py-20 bg-slate-50">
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
                <div className="flex-1 overflow-hidden">
                  {activeFaq === idx && (
                    <div 
                      className="px-10 md:px-20 pb-10 text-slate-500 font-medium text-lg leading-relaxed border-t border-slate-50 pt-8 mx-4"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  )}
                </div>
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

      {/* Helpful Resources Section */}
      <section className="relative px-6 md:px-12 py-12 md:py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-technical text-blue-600">REPAIR DATABASE & BENCHMARKS</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tighter">Helpful Resources & Guides.</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Get accurate repair intelligence, technical explanations, and cost guidelines beforehand.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'How Much Does Phone Repair Cost?',
                desc: 'Compare upfront price guidelines and calculate your repair costs across Australia.',
                url: 'https://repairrange.io/calculator.html',
                icon: Wrench,
              },
              {
                title: 'INCELL vs OLED vs OEM Screens',
                desc: 'Understand the core technical display quality differences before buying screens.',
                url: 'https://selfrepairkit.com.au/blog/incell-vs-oled-vs-oem-screen-replacement-guide.html',
                icon: Smartphone,
              },
              {
                title: 'Can You Replace Your Own Battery?',
                desc: 'Learn about local safety coordinates, risk mitigations, and battery installation tips.',
                url: 'https://selfrepairkit.com.au/blog/can-you-replace-phone-battery-guide.html',
                icon: Battery,
              },
              {
                title: 'Find Repair Shops Near You',
                desc: 'Access the country-wide independent quality repair station locator map easily.',
                url: 'https://repairrange.io/locations.html',
                icon: MapPin,
              },
            ].map((res, i) => {
              const Icon = res.icon;
              return (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-[2.2rem] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {res.desc}
                    </p>
                  </div>
                  <div className="pt-6 flex items-center gap-2 text-technical text-blue-600 group-hover:gap-3 transition-all mt-auto">
                    READ GUIDE <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-6 md:px-12 py-12 md:py-20 bg-white">
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
                        <p className="text-white font-bold text-lg font-display"><a href="https://maps.google.com/?q=Mayfield+Cell+Phone+Repairs,+276+Maitland+Rd,+Mayfield+NSW+2304" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">276 Maitland Rd, Mayfield NSW 2304</a></p>
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
                        <Mail className="w-6 h-6 text-blue-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-technical text-slate-500">SUPPORT EMAIL</p>
                        <a href="mailto:support@mayfieldphonerepair.com.au" className="text-white font-bold text-lg font-display italic transition-colors hover:text-blue-400">support@mayfieldphonerepair.com.au</a>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                        <Clock className="w-6 h-6 text-blue-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-technical text-slate-500">OPENING HOURS</p>
                        <OpeningStatus />
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
                          placeholder="Your Name" 
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
