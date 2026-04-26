import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Shield, Target, History, Users, Award, Heart } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="flex-1 bg-white">
      <Helmet>
        <title>About Us | Mayfield Cell Phone Repairs Newcastle</title>
        <meta name="description" content="Learn about Mayfield Cell Phone Repairs - our history, mission, and our commitment to providing Newcastle's best phone and electronic repair services." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#3b82f6_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full mb-6"
          >
            <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em]">Our Story</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight"
          >
            Newcastle's Trusted <br />
            <span className="text-blue-400 italic">Repair Experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Built on a foundation of technical excellence and a genuine passion for technology, 
            Mayfield Cell Phone Repairs has been the heartbeat of Mayfield's mobile community for years.
          </motion.p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-blue-600">
                  <History className="w-6 h-6" />
                  <h2 className="text-2xl font-bold font-display uppercase tracking-wider">Our History</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  Started as a small local workshop, Mayfield Cell Phone Repairs was born from a simple observation: 
                  Newcastle needed a repair service that combined speed with uncompromising quality. Over the years, 
                  we've evolved from simple screen swaps to complex motherboard micro-soldering and data recovery.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our growth has been driven by word-of-mouth and the trust of thousands of Newcastle residents who 
                  know that when they bring their device to us, it's in the hands of people who truly care about the 
                  outcome.
                </p>
              </div>

              <div className="space-y-4 pt-8">
                <div className="flex items-center gap-4 text-emerald-600">
                  <Target className="w-6 h-6" />
                  <h2 className="text-2xl font-bold font-display uppercase tracking-wider">Our Mission</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  Our mission is simple: to minimize digital downtime and maximize device lifespan. We believe that 
                  in a world of "disposable" tech, quality repair is an act of sustainability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Unmatched Integrity', desc: 'True honest assessments and transparent pricing.' },
                { icon: Users, title: 'Local Commitment', desc: 'Proudly serving Mayfield and Newcastle community.' },
                { icon: Award, title: 'Certified Expertise', desc: 'Technicians trained in the latest mobile tech.' },
                { icon: Heart, title: 'Customer First', desc: 'We treat every device as if it were our own.' },
              ].map((value, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-3xl space-y-4 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">{value.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">The Technician Advantage</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Our lab isn't just a repair shop; it's a precision environment where Newcastle's 
              most skilled technicians bring devices back to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-3xl font-black text-blue-600">10k+</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-widest text-[10px]">Repairs Completed</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                A decade of hands-on experience across every major brand and model imaginable.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                <span className="text-3xl font-black text-emerald-600">QC</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-widest text-[10px]">Quality Control</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every repair undergoes a rigorous 15-point check before it's handed back to you.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
                <span className="text-3xl font-black text-amber-600">S+</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-widest text-[10px]">Premium Parts</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We only source high-grade components that meet or exceed original specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Experience our commitment first-hand.</h2>
              <p className="text-slate-400 text-lg">Visit us at 276 Maitland Rd, Mayfield NSW</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:0240491735" className="bg-blue-600 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30">
                  Call 02 4049 1735
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
