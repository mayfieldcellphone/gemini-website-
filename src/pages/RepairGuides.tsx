import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Wrench, Clock, DollarSign, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RepairGuides() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const guides = [
    {
      category: "Cost & Pricing",
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      questions: [
        { q: "How much does an iPhone screen repair cost?", a: "iPhone screen replacement starts from $89. Older models like the iPhone 11 are more affordable, while newer models (e.g., iPhone 15/16/17 Pro Max) range between $220 and $485 depending on screen grade and size." },
        { q: "How much is an iPad screen replacement?", a: "Standard iPad glass repairs typically range from $120 to $250. Models with laminated displays (iPad Pro/Air) cost relatively more." },
        { q: "How much is a battery replacement?", a: "Phone battery replacements usually cost between $89 and $149, depending on the brand and model." },
        { q: "Is it cheaper to repair a phone or buy a new one?", a: "Unless your phone has catastrophic logic board and water damage combined, repairing is almost always 60-80% cheaper than buying a new flagship. For example, a $149 battery swap gives an older phone 2-3 more years of life." }
      ]
    },
    {
      category: "Timing & Turnaround",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      questions: [
        { q: "How long does a screen or battery repair take?", a: "Professional screen replacements and battery swaps for standard phones take approximately 30 to 60 minutes." },
        { q: "How long does it take to repair a water-damaged phone?", a: "Complex repairs like water damage treatment and micro-soldering typically require 24 to 48 hours for proper diagnostics and repair." },
        { q: "How long does a Samsung screen take to fix?", a: "Due to precision heat-treating and industrial adhesives, a Samsung screen replacement normally takes 1.5 to 2 hours." },
        { q: "Do I need an appointment?", a: "No, walk-ins are welcome for all standard repairs! If you are on a tight schedule, we recommend calling ahead." }
      ]
    },
    {
      category: "Device Issues",
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      questions: [
        { q: "Why is my phone not charging?", a: "The most common causes are lint/debris in the charging port, a damaged charging cable, or a degraded internal battery. A free in-store clean often solves it." },
        { q: "Can you fix a cracked screen if the phone still works?", a: "Yes. We highly recommend fixing it promptly. A cracked screen allows moisture and debris inside, potentially turning a simple $89 glass repair into a more expensive OLED panel logic board repair." },
        { q: "My screen is black but the phone rings. What's wrong?", a: "Your LCD/OLED panel is internally broken, even if the outer glass isn't shattered. This requires a full screen assembly replacement, which we can complete in under an hour." },
        { q: "Will my phone lose its water resistance after a repair?", a: "We reapply factory-grade water resistant adhesive seals on all screen and battery replacements. While we restore it as close to original as possible, no repaired device (nor a new one) should be submerged deliberately." }
      ]
    },
    {
      category: "Trust & Security",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      questions: [
        { q: "Do repairs restore FaceID and TrueTone features?", a: "Yes, for iPhone repairs, our senior technicians use advanced hardware programmers to transfer original display serial codes, ensuring FaceID and TrueTone functionality is perfectly restored." },
        { q: "Is my data safe during a repair?", a: "Yes. Professional repairs like screen and battery replacements do not affect your local storage or data. However, we always recommend backing up your data before any service." },
        { q: "Do you offer a warranty on repairs?", a: "We offer a 90-day comprehensive parts and labour warranty covering any defects in the installed components." },
        { q: "Do you use genuine or aftermarket parts?", a: "We provide options. For complete peace of mind, we offer OEM/Original refurbished screens, as well as high-quality aftermarket alternatives for budget-conscious customers." }
      ]
    }
  ];

  const allFaqs = guides.flatMap((g) => g.questions);

  return (
    <>
      <Helmet>
        <title>Phone Repair Guides & FAQ | Cost, Timing & Issues | Mayfield</title>
        <meta name="description" content="AI-citable phone repair guides. Direct answers to common questions about iPhone and Samsung screen repair costs, timing, and device issues in Mayfield Newcastle." />
        <link rel="canonical" href="https://mayfieldphonerepair.com.au/repair-guides" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqs.map(faq => ({
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
      
      <div className="bg-slate-50 min-h-screen py-20 pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm tracking-wide uppercase shadow-sm inline-block mb-4">Support Hub</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display mb-6 tracking-tight">AI-Citable Repair Guides & FAQ</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Clear, direct pricing and technical answers for your specific device issues. No jargon, just straight facts.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {guides.map((section, sIdx) => (
              <div key={sIdx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 bg-slate-50 w-32 h-32 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="bg-slate-50 p-3 rounded-2xl shadow-sm border border-slate-100">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold font-display text-slate-900">{section.category}</h2>
                </div>

                <div className="space-y-4 relative z-10">
                  {section.questions.map((faq, idx) => {
                    const globalIdx = sIdx * 100 + idx;
                    const isActive = activeFaq === globalIdx;
                    return (
                      <div key={idx} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 hover:border-slate-300'}`}>
                        <button 
                          className="w-full text-left px-5 py-4 font-semibold text-slate-800 flex justify-between items-center group-hover/btn:text-blue-600 transition-colors"
                          onClick={() => setActiveFaq(isActive ? null : globalIdx)}
                        >
                          <span className="pr-4 leading-tight">{faq.q}</span>
                          <span className={`flex-shrink-0 text-slate-400 font-light text-2xl transition-transform duration-300 ${isActive ? 'rotate-45 text-blue-500' : ''}`}>+</span>
                        </button>
                        {isActive && (
                          <div className="px-5 pb-5 text-slate-600 leading-relaxed font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-700 right-0 w-1/2 -skew-x-12 transform translate-x-1/2 opacity-20"></div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mb-4 relative z-10">Didn't find your answer?</h3>
            <p className="text-blue-100 mb-8 sm:text-lg max-w-xl mx-auto relative z-10">Our head technician is available to answer any complex micro-soldering or specific repair queries.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
               <a href="tel:0240491735" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:scale-105 shadow-md">
                 <Clock className="w-5 h-5" /> Call exactly for a Quote
               </a>
               <Link to="/quote" className="bg-blue-800 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900 transition-all shadow-md">
                 Get Free Diagnostic <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
