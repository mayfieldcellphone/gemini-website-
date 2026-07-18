import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, RefreshCw, Smartphone, ShieldCheck, ArrowRight, Zap, Database, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecondHandPhones() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "Our refurbished devices use original parts. We only replace batteries with premium new ones—no cheap body swaps or low-quality screens."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Trade-In Accepted",
      description: "Get credit towards your next phone. We accept trade-ins for working and unlocked devices (iOS/Android)."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Free Data Transfer",
      description: "Buy a phone from us and we'll transfer your contacts, photos, and messages from your old device for free."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Bundle Savings",
      description: "Get exclusive discounts on cases, chargers, cables, and screen protectors when you purchase a device."
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Buy Refurbished iPhones & Samsung Mayfield | Newcastle Quality Used Phones</title>
        <meta name="description" content="Premium refurbished iPhones and Samsung Galaxy phones in Mayfield. All devices include a warranty, new batteries, and original parts. Trade-ins welcome." />
        <meta property="og:title" content="Quality Used & Refurbished Phones - Mayfield Phone Repair" />
        <meta property="og:description" content="Looking for a reliable used phone? We stock high-quality refurbished devices with verified original components." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556656793-062ff9878258?auto=format&fit=crop&q=80&w=2000" 
            alt="Quality refurbished used iPhones and Samsung Galaxy smartphones on display at Mayfield Phone Repair Newcastle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Premium Used Devices</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-white font-display leading-[0.9]">
              Quality <span className="text-blue-500 italic font-light">Refurbished</span> Phones.
            </h1>
            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed font-medium max-w-2xl">
              Don't settle for cheap copies. We sell high-quality used iPhones and Samsung devices with original components and brand new batteries.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="#inventory" className="px-10 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-2xl">
                Browse Collection
              </a>
              <div className="flex items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">In-Store Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Phones */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Our Standards</h2>
                <h3 className="text-4xl md:text-6xl font-bold text-slate-900 font-display leading-tight">
                  Refurbished, Not <br/><span className="text-blue-600 italic">Repacked.</span>
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Many shops sell "refurbished" phones that are just old boards put inside cheap, low-quality third-party bodies with fake screens. We do things differently.
                </p>
              </div>

              <div className="grid gap-8">
                {benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group"
                  >
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      {benefit.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900">{benefit.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200" 
                  alt="Senior hardware technician performing diagnostic quality control checks on refurbished phone at Mayfield Phone Repair" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl max-w-[280px] hidden md:block">
                <p className="text-2xl font-bold font-display italic">"We only sell phones we would use ourselves."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Carry */}
      <section id="inventory" className="px-6 md:px-12 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Current Inventory</h2>
            <h3 className="text-4xl md:text-7xl font-bold text-slate-900 font-display">Popular <span className="text-blue-600">Models.</span></h3>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto italic">Stock changes daily. Visit us in-store at Mayfield for the latest deals.
            <a href="https://mayfieldgadgets.com.au" target="_blank" className="btn btn-primary mt-6">View Live Inventory at Mayfield Gadgets →</a></p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Apple iPhone Card */}
            <a href="https://mayfieldgadgets.com.au/collections/apple-iphone" target="_blank" className="block">
              <div className="bg-white rounded-[4rem] p-12 border border-slate-200 shadow-xl space-y-8 group hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white">
                    <Smartphone className="w-10 h-10" />
                  </div>
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                </div>
                <div className="space-y-4">
                  <h4 className="text-4xl font-bold font-display">Refurbished <br/>Apple iPhone</h4>
                  <p className="text-slate-500 text-lg">We stock iPhone 11 through to iPhone 15 Pro Max. All unlocked and ready for any carrier.</p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> New Battery Installed
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Original Display & Parts
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 100% Fully Functional
                    </li>
                  </ul>
                </div>
              </div>
            </a>

            {/* Samsung Card */}
            <a href="https://mayfieldgadgets.com.au/collections/samsung-galaxy" target="_blank" className="block">
              <div className="bg-white rounded-[4rem] p-12 border border-slate-200 shadow-xl space-y-8 group hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white">
                    <Smartphone className="w-10 h-10" />
                  </div>
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Special Offers</span>
                </div>
                <div className="space-y-4">
                  <h4 className="text-4xl font-bold font-display">Premium Used <br/>Samsung Galaxy</h4>
                  <p className="text-slate-500 text-lg">From S20 series to Latest S24 Ultra and Z Flip/Fold models. Professional rigorous testing on all units.</p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> OLED Screen Verification
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Network Unlocked
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Data Wiped & Sanitized
                    </li>
                  </ul>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trade-In Section */}
      <section className="px-6 md:px-12 py-20 bg-slate-900 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 skew-x-12 translate-x-1/2 opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-white">
            <div className="space-y-6">
              <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Upgrade Today</h2>
              <h3 className="text-4xl md:text-7xl font-bold font-display leading-tight">Trade-In Your <br/><span className="text-blue-500 italic">Old Device.</span></h3>
              <p className="text-slate-400 text-xl leading-relaxed">
                Turn your working, unlocked device into instant store credit. We offer competitive rates for trade-ins when purchasing any refurbished phone.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-xl font-bold mb-2">Step 1</h4>
                <p className="text-slate-400 text-sm italic">Bring your unlocked phone to our Mayfield shop.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-xl font-bold mb-2">Step 2</h4>
                <p className="text-slate-400 text-sm italic">Our techs will perform a 5-minute appraisal.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-xl font-bold mb-2">Step 3</h4>
                <p className="text-slate-400 text-sm italic">Get an instant quote and apply it to a new purchase.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-xl font-bold mb-2">Step 4</h4>
                <p className="text-slate-400 text-sm italic">We transfer your data for FREE before you leave!</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-200 shadow-2xl space-y-10">
            <h4 className="text-3xl font-bold text-slate-900 font-display">In-Store Exclusives</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Free Data Content</h5>
                  <p className="text-slate-500 text-sm italic">Contacts, Photos & Messages transferred.</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Bundle Discount</h5>
                  <p className="text-slate-500 text-sm italic">Up to 30% off accessories with phone purchase.</p>
                </div>
              </div>
            </div>
            <Link to="/#contact" className="w-full inline-flex items-center justify-center gap-3 bg-slate-900 text-white font-black uppercase tracking-widest py-6 rounded-2xl hover:bg-blue-600 transition-all text-xs">
              Contact Us for Stock <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
