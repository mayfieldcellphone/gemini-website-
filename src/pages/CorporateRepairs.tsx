import { motion } from 'motion/react';
import { Building2, GraduationCap, ShieldCheck, Clock, CheckCircle2, Zap, ArrowRight, Mail, Phone, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CorporateRepairs() {
  const sectors = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Schools & Universities",
      description: "Bulk iPad screen replacements and laptop repairs for student devices. Quick turnaround during holiday breaks and term time."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Business & Enterprise",
      description: "Dedicated repair accounts for staff fleets. From high-end laptops to staff smartphones, we keep your workforce connected."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Insurance Claims",
      description: "Official assessment reports and professional repair quotes for insurance providers. We handle the technical documentation for you."
    }
  ];

  const features = [
    "Priority Turnaround Times",
    "Monthly Invoicing (B2B Accounts)",
    "Genuine & High-Quality Parts",
    "Bulk Volume Discounts",
    "On-Site Assessment Available",
    "6-Month Warranty on All Repairs"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-200/50 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-600 font-black uppercase text-[10px] tracking-widest">
                  Corporate & Education
                </div>
                <h1 className="text-6xl md:text-8xl font-bold text-slate-900 font-display leading-[0.85] tracking-tight">
                  Premium Fleet <br/><span className="text-blue-600 italic font-light">Repairs.</span>
                </h1>
                <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-xl italic">
                  Specialized repair solutions for Mayfield's schools, universities, and businesses. Reliable quality, priority service, and competitive B2B rates.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <a href="#quote" className="px-10 py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl">
                  Open Account
                </a>
                <div className="flex items-center gap-4 px-8 py-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <Clock className="w-6 h-6 text-emerald-500" />
                   <span className="text-sm font-bold text-slate-900 uppercase tracking-widest italic">Fast Priority Queue</span>
                </div>
              </div>
            </motion.div>
            <div className="relative">
               <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200" 
                    alt="Corporate meeting" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
               </div>
               <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-xs space-y-4">
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => <Zap key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                  <p className="text-slate-900 font-bold leading-tight uppercase tracking-tight italic">"The most reliable partner for our school's iPad fleet."</p>
                  <p className="text-slate-400 text-[10px] font-black uppercase">— Hunter Valley Education</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Focus */}
      <section className="px-6 md:px-12 py-32 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="max-w-3xl space-y-6">
             <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Who We Serve</h2>
             <h3 className="text-5xl md:text-7xl font-bold text-slate-900 font-display">Specialized for <br/><span className="text-blue-600 italic">Your Organization.</span></h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {sectors.map((sector, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all duration-500 group flex flex-col"
              >
                <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                   {sector.icon}
                </div>
                <h4 className="text-3xl font-bold text-slate-900 mb-6 font-display">{sector.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed italic mb-8 flex-1">{sector.description}</p>
                <button className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 md:px-12 py-32 bg-slate-900 border-y border-white/5 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-12">
              <div className="space-y-6 text-white">
                 <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">The B2B Edge</h2>
                 <h3 className="text-5xl md:text-8xl font-bold font-display leading-[0.85]">Account <br/><span className="text-blue-600">Benefits.</span></h3>
                 <p className="text-slate-400 text-xl font-medium italic">We don't just fix phones—we provide a comprehensive device management partner.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                 {features.map((feature, i) => (
                   <div key={i} className="flex gap-4 items-start text-white group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 group-hover:text-white" />
                      </div>
                      <span className="text-lg font-bold font-display">{feature}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="relative">
              <div className="bg-white p-16 rounded-[4rem] border border-slate-200 shadow-2xl space-y-12 rotate-2">
                 <h4 className="text-3xl font-bold text-slate-900 font-display">Fast Quotations</h4>
                 <div className="space-y-8">
                    <div className="flex gap-6 items-center">
                       <FileText className="w-8 h-8 text-blue-600" />
                       <p className="text-slate-500 italic">Official PDF quotes for purchase order approval within 2 hours of request.</p>
                    </div>
                    <div className="flex gap-6 items-center">
                       <ShieldCheck className="w-8 h-8 text-blue-600" />
                       <p className="text-slate-500 italic">Detailed damage assessments for insurance claims (Accidental Damage/Liquid).</p>
                    </div>
                    <div className="flex gap-6 items-center">
                       <Users className="w-8 h-8 text-blue-600" />
                       <p className="text-slate-500 italic">Dedicated account manager for consistent, personalized communication.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="quote" className="px-6 md:px-12 py-32 bg-white">
        <div className="max-w-7xl mx-auto bg-slate-50 rounded-[5rem] p-12 md:p-24 border border-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-4xl mx-auto space-y-20 relative z-10">
             <div className="text-center space-y-6">
                <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Start Today</h2>
                <h3 className="text-5xl md:text-7xl font-bold text-slate-900 font-display italic leading-tight text-balance">Modern Service for Modern Organizations.</h3>
             </div>

             <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6 p-10 bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center">
                   <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8" />
                   </div>
                   <h4 className="text-2xl font-bold font-display">Email Our Team</h4>
                   <p className="text-slate-500 italic">Send through your device fleet list or insurance repair request.</p>
                   <a href="mailto:mayfieldcellphonerepairs@gmail.com" className="text-blue-600 font-black uppercase text-xs tracking-widest inline-block pt-4 border-b-2 border-blue-600">mayfield@repair.com.au</a>
                </div>
                <div className="space-y-6 p-10 bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center">
                   <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Phone className="w-8 h-8" />
                   </div>
                   <h4 className="text-2xl font-bold font-display">Call Business Desk</h4>
                   <p className="text-slate-500 italic">Direct 24/7 priority line for established corporate accounts.</p>
                   <a href="tel:0240491735" className="text-slate-900 font-black uppercase text-xs tracking-widest inline-block pt-4 border-b-2 border-slate-900">02 4049 1735</a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
