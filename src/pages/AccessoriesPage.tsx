import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Smartphone, Zap, ShieldCheck, Heart, ArrowRight, LayoutGrid, Tablet, Laptop, Headphones, Speaker, Watch, ChevronRight } from 'lucide-react';
import { brands } from '../data/brands';
import { LATEST_MODELS } from '../constants/models';
import { useState } from 'react';

export default function AccessoriesPage() {
  const [activeTab, setActiveTab] = useState<'iphone' | 'samsung' | 'google' | 'ipad'>('iphone');

  const categories = [
    { icon: <Smartphone className="w-6 h-6" />, title: "Phone Cases", description: "Silicon, Clear, Armor & Wallet cases for all models." },
    { icon: <Zap className="w-6 h-6" />, title: "Cables & Bricks", description: "Fast chargers, USB-C, Lightning & Wireless pads." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Screen Protectors", description: "9H Tempered glass, privacy filters & camera lens kits." },
    { icon: <Headphones className="w-6 h-6" />, title: "Audio & Music", description: "TWS Earbuds, wired headphones & Bluetooth adapters." },
    { icon: <Tablet className="w-6 h-6" />, title: "Tablet Gear", description: "iPad covers, styluses, and mountable desktop stands." },
    { icon: <Watch className="w-6 h-6" />, title: "Wearables", description: "Apple Watch bands and Samsung watch chargers." }
  ];

  return (
    <div className="pt-20">
      <Helmet>
        <title>iPhone 17 & 16 Accessories Mayfield | Samsung S26 Cases Newcastle</title>
        <meta name="description" content="Shop the latest iPhone 17, 16, and Samsung S26 accessories in Mayfield. Fast chargers, tempered glass, and premium cases for all Newcastle device owners." />
        <meta property="og:title" content="Latest iPhone 17 & Samsung Accessories - Mayfield Cell Phone Repairs" />
        <meta property="og:description" content="Protect your new iPhone 17 or Galaxy S26 with our premium range of cases and glass. Visit us in Mayfield." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Premium Tech Essentials 2026</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 font-display leading-[0.85] tracking-tight text-balance">
                Latest Gear for <br/><span className="text-blue-600 italic font-light">iPhone 17 & S26.</span>
              </h1>
              <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-xl italic">
                Supporting Newcastle's newest flagship devices. From iPhone 17 Pro Max screen protectors to Galaxy S26 Ultra rugged cases. Quality gear, local service.
              </p>
              <div className="flex gap-6">
                <a href="#matrix" className="px-10 py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl">
                  Check Compatibility
                </a>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-slate-50 rounded-[4rem] flex items-center justify-center p-12 border border-slate-100 shadow-inner">
                <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="aspect-square bg-white rounded-3xl border border-slate-100 shadow-sm transform hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                        <Smartphone className={`w-12 h-12 ${i % 2 === 0 ? 'text-blue-600' : 'text-slate-300'}`} />
                     </div>
                   ))}
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-10 -right-5 bg-blue-600 text-white p-6 rounded-3xl shadow-2xl rotate-6 animate-pulse">
                <p className="text-xl font-bold">2026 Ready</p>
                <p className="text-[10px] uppercase font-black opacity-80">Full Series Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Support Matrix */}
      <section id="matrix" className="px-6 md:px-12 py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] font-display">Compatibility Search</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-slate-900 font-display italic">Find Your <span className="text-blue-600">Model.</span></h3>
          </div>

          <div className="bg-slate-50 p-4 rounded-[2.5rem] inline-flex flex-wrap justify-center border border-slate-200 mx-auto w-full md:w-auto md:min-w-[400px]">
             {(['iphone', 'samsung', 'google', 'ipad'] as const).map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                   activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-blue-600'
                 }`}
               >
                 {tab === 'ipad' ? 'iPads' : tab.charAt(0).toUpperCase() + tab.slice(1)}
               </button>
             ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {LATEST_MODELS[activeTab].map((series, idx) => (
               <motion.div 
                 key={series.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500"
               >
                 <h4 className="text-lg font-bold text-slate-900 mb-6 font-display">{series.title}</h4>
                 <ul className="space-y-4">
                   {series.models.map(m => (
                     <li key={m} className="flex items-center gap-3 text-slate-500 text-sm font-medium group cursor-default">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                       {m}
                     </li>
                   ))}
                 </ul>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="px-6 md:px-12 py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
             <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Hardware Catalog</h2>
             <h3 className="text-5xl md:text-7xl font-bold text-slate-900 font-display">What We <span className="text-blue-600 italic">Stock.</span></h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-8 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {cat.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{cat.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{cat.description}</p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                  View Range <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Support */}
      <section className="px-6 md:px-12 py-32 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 order-2 lg:order-1">
             <div className="aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center bg-slate-900">
                <div className="grid grid-cols-3 gap-12 p-20 opacity-40">
                   {brands.map((brand, i) => (
                     <div key={i} className="flex flex-col items-center gap-4 text-white">
                        <Smartphone className="w-12 h-12" />
                        <span className="text-[10px] font-black uppercase text-center">{brand.name}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
               <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Endless Compatibility</h2>
               <h3 className="text-4xl md:text-6xl font-bold text-slate-900 font-display leading-[1.1]">
                 Support for Every <br/><span className="text-blue-600">Phone Model.</span>
               </h3>
            </div>
            <div className="space-y-8">
               <p className="text-slate-500 text-lg leading-relaxed font-medium">
                 We pride ourselves on carrying one of Mayfield's most diverse ranges of accessories. Whether you have the latest flagship or a much-loved older model, we likely have the perfect protector or cable in stock.
               </p>
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 text-slate-900 font-bold">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div> iPhone (All Generations)
                  </div>
                  <div className="flex items-center gap-4 text-slate-900 font-bold">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Samsung Galaxy S/A/Z
                  </div>
                  <div className="flex items-center gap-4 text-slate-900 font-bold">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div> Google Pixel Series
                  </div>
                  <div className="flex items-center gap-4 text-slate-900 font-bold">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div> Oppo & Motorola
                  </div>
               </div>
               <button className="px-10 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-lg flex items-center gap-3">
                 Inquire About Stock <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop In-Person? */}
      <section className="px-6 md:px-12 py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-blue-600 translate-y-1/2 opacity-10 rounded-full blur-[200px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
           <div className="space-y-6">
              <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">The Offline Advantage</h2>
              <h3 className="text-5xl md:text-8xl font-bold text-white font-display leading-[0.85]">
                Try Before You <br/><span className="text-blue-500 italic font-light">Buy.</span>
              </h3>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
                Website photos can be misleading. Visit us in Mayfield to feel the quality of our cases and see the clarity of our screen protectors.
              </p>
           </div>
           <div className="grid md:grid-cols-3 gap-12 pt-10">
              <div className="space-y-4">
                 <h4 className="text-6xl font-bold text-blue-600 font-display">01</h4>
                 <p className="text-white font-bold text-xl">Perfect Fit</p>
                 <p className="text-slate-500 text-sm italic">We test the case on your actual device to ensure it fits perfectly with your protector.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-6xl font-bold text-blue-600 font-display">02</h4>
                 <p className="text-white font-bold text-xl">Free Fitting</p>
                 <p className="text-slate-500 text-sm italic">Buy a screen protector and we'll apply it professionally for free—no bubbles guaranteed.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-6xl font-bold text-blue-600 font-display">03</h4>
                 <p className="text-white font-bold text-xl">Bundle Deals</p>
                 <p className="text-slate-500 text-sm italic">Unlock deep discounts when buying two or more accessories together.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
