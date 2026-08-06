import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Phone, ArrowRight, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PaymentOptionsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Phone Repair Payment Options & Financing Mayfield Newcastle",
    "description": "Split your phone repair into 4 interest-free payments using Afterpay or Zip at Mayfield Phone Repair. Same-day service with easy financing.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "Mayfield Phone Repair",
      "telephone": "(02) 4049 1735"
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center mb-16">
          <span className="bg-emerald-100 text-emerald-800 font-semibold px-4 py-1.5 rounded-full text-sm tracking-wide uppercase inline-flex items-center gap-1.5 mb-4 shadow-sm">
            <CreditCard className="w-4 h-4" /> 4 Interest-Free Payments
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display mb-6 tracking-tight leading-tight">
            Afterpay & Zip — Split Your Phone Repair into 4 Payments
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Unexpected phone repair bills shouldn't break the bank. At Mayfield Phone Repair, you can fix your iPhone, Samsung, or laptop today and pay in 4 easy fortnightly installments with Afterpay or Zip Pay. Zero interest, zero waiting.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl font-display">
              4x
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Split in 4 Payments</h3>
            <p className="text-slate-500 text-sm">Pay 25% today, and the rest every 2 weeks. Perfectly managed within your budget.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Zero Interest Ever</h3>
            <p className="text-slate-500 text-sm">No extra interest or hidden surcharges when paid on time. Transparent financing.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Instant In-Store Scan</h3>
            <p className="text-slate-500 text-sm">Scan your barcode at our Mayfield counter and walk out with your repaired phone in 30 mins.</p>
          </div>
        </div>

        {/* Content Box */}
        <div className="space-y-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              Fix Premium $300-$600 Repairs for Just $75 Today
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              When an iPhone 17 Pro Max screen or Galaxy S26 Ultra AMOLED panel smashes, unexpected repair costs can be tough. Buy Now Pay Later (BNPL) options like Afterpay and Zip allow you to keep your premium device in peak condition immediately.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3">Popular Repair Payment Breakdown:</h4>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-bold block mb-1">iPhone Screen ($180 Repair)</span>
                  <span className="text-emerald-600 font-extrabold text-xl font-display">$45 x 4 fortnights</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-bold block mb-1">Samsung AMOLED ($320 Repair)</span>
                  <span className="text-emerald-600 font-extrabold text-xl font-display">$80 x 4 fortnights</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-bold block mb-1">MacBook Display ($440 Repair)</span>
                  <span className="text-emerald-600 font-extrabold text-xl font-display">$110 x 4 fortnights</span>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              All Payment Methods Accepted in Store
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              In addition to Afterpay and Zip Pay, we accept all standard Australian payment methods at our Mayfield counter:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                Afterpay
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                Zip Pay
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                Visa / MasterCard
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                Apple Pay / Google Pay
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                EFTPOS
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                Cash
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                American Express
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-slate-800 border border-slate-200">
                Direct Bank Transfer
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              How to Pay with Afterpay / Zip at Mayfield Phone Repair
            </h2>
            <ol className="space-y-4 text-slate-600">
              <li className="flex gap-3 items-start">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</span>
                <span><strong>Bring Your Device In:</strong> Drop into 276 Maitland Rd, Mayfield NSW 2304.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</span>
                <span><strong>Get Repair Done:</strong> Our technician completes your screen or battery replacement in 30-45 minutes.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</span>
                <span><strong>Tap to Pay:</strong> Open your Afterpay or Zip app on your phone, tap your card or scan the barcode at our terminal. Done!</span>
              </li>
            </ol>
          </section>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-slate-900 text-white p-10 md:p-14 rounded-3xl text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-extrabold font-display mb-4">Fix Your Phone Today with Afterpay</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            No need to delay your screen fix. Drop into Mayfield Phone Repair today or get a fast instant quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:0240491735" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold font-display hover:bg-emerald-500 transition-all shadow-lg text-center">
              Call (02) 4049 1735
            </a>
            <Link to="/quote" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold font-display hover:bg-slate-100 transition-all shadow-lg text-center">
              Get Free Repair Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
