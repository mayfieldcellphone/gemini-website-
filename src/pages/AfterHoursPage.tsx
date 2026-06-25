import { Clock, MessageSquare, ShieldCheck, AlertCircle, ArrowLeft, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function AfterHoursPage() {
  return (
    <div className="flex-1 bg-white">
      <Helmet>
        <title>After Hours Emergency Phone Repair | Mayfield Phone Repair</title>
        <meta name="description" content="Need an emergency phone repair after hours in Newcastle? Text 0431 618 100 for our strictly via booking emergency service." />
        <link rel="canonical" href="https://mayfieldphonerepair.com.au/after-hours" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-600/10 border border-emerald-600/20 rounded-full mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-[0.3em] font-display text-emerald-400">Emergency Protocol Active</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none font-display">
            After Hours <span className="text-emerald-500 italic font-light">Emergency</span> Service
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto italic">
            Urgent repairs when they matter most. Strictly via text booking for residents across Newcastle and Mayfield.
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="sms:0431618100" className="w-full sm:w-auto px-10 py-6 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-emerald-500 transition-all hover:-translate-y-1 font-display flex items-center justify-center gap-4">
              <MessageSquare className="w-5 h-5" /> Text: 0431 618 100
            </a>
            <Link to="/" className="w-full sm:w-auto px-10 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white/10 transition-all font-display flex items-center justify-center gap-3 italic">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight font-display tracking-tight text-slate-900">How to Book an Emergency Repair</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                Our after-hours service is designed for critical situations that cannot wait until morning.
              </p>
            </div>

            <div className="space-y-10">
              {[
                { 
                  icon: MessageSquare, 
                  title: 'Text First', 
                  desc: 'Send a text message to 0431 618 100 with your phone model and the issue you\'re facing. This is strictly a text-based booking service after hours.',
                  color: 'bg-emerald-50 text-emerald-600'
                },
                { 
                  icon: Calendar, 
                  title: 'Strictly via Booking', 
                  desc: 'No walk-ins are possible after hours. Once we receive your text, a technician will verify if we can assist and provide an appointment time.',
                  color: 'bg-blue-50 text-blue-600'
                },
                { 
                  icon: AlertCircle, 
                  title: 'Emergency Fee Applies', 
                  desc: 'Please note that an after-hours call-out or emergency surcharge applies for any repair performed outside of standard business hours.',
                  color: 'bg-amber-50 text-amber-600'
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${step.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-display text-slate-900">{step.title}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-slate-50 rounded-[4rem] -z-10 rotate-2"></div>
            <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-200 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] space-y-12">
               <div className="space-y-6">
                 <h3 className="text-3xl font-bold font-display text-slate-900">Emergency Checklist</h3>
                 <p className="text-slate-500 font-medium italic">Before you text us, please try to check the following:</p>
               </div>

               <ul className="space-y-6">
                 {[
                   'Is the phone connected to power? (If it won\'t turn on)',
                   'Have you tried a forced restart?',
                   'If water damaged: DO NOT turn it on or charge it.',
                   'Prepare your device passcode if possible.',
                   'Ensure your primary contact number is different if your main phone is dead.'
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                     <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                     {item}
                   </li>
                 ))}
               </ul>

               <div className="pt-8 border-t border-slate-100">
                  <div className="flex flex-col items-center gap-6 p-8 bg-slate-900 rounded-[2.5rem] text-white">
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Ready to text?</span>
                      <div className="text-3xl font-bold font-display">0431 618 100</div>
                    </div>
                    <a href="sms:0431618100" className="w-full bg-emerald-600 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all text-center">
                      Send Emergency Text
                    </a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
            <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-display tracking-tight leading-tight">Same Precision. Different Hours.</h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
            Even our after-hours emergency repairs are backed by our standard 90-day hardware warranty. We use the same high-quality components and rigorous testing protocols as our standard daily service.
          </p>
        </div>
      </section>
    </div>
  );
}
