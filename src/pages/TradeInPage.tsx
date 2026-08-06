import React, { useState } from 'react';
import { RefreshCw, DollarSign, CheckCircle2, ShieldCheck, Phone, ArrowRight, Smartphone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TradeInPage() {
  const [deviceModel, setDeviceModel] = useState('');
  const [condition, setCondition] = useState('good');
  const [storage, setStorage] = useState('128GB');
  const [submitted, setSubmitted] = useState(false);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Trade In Phone Newcastle Mayfield — Instant Cash & Credit",
    "description": "Trade in your old, broken, or unused iPhone, Samsung, or Google Pixel phone at Mayfield Phone Repair. Instant cash or store credit towards refurbished phones.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "Mayfield Phone Repair",
      "telephone": "(02) 4049 1735"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 font-semibold px-4 py-1.5 rounded-full text-sm tracking-wide uppercase inline-flex items-center gap-1.5 mb-4 shadow-sm">
            <RefreshCw className="w-4 h-4" /> Instant Cash or Store Credit
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display mb-6 tracking-tight leading-tight">
            Trade In Your Old Phone — Cash or Credit Towards a Refurbished Phone
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have an old iPhone, broken Samsung, or spare iPad sitting in a drawer? Bring it into Mayfield Phone Repair. We offer instant top-dollar cash payouts or store credit towards our certified second-hand phones with 6-month warranties.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Instant Cash Payment</h3>
            <p className="text-slate-500 text-sm">Walk in with your phone, get paid cash or instant PayID transfer in 10 minutes on the spot.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Bonus Store Credit</h3>
            <p className="text-slate-500 text-sm">Get up to 15% extra value when trading towards a certified refurbished iPhone or Samsung in store.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">We Buy Broken Devices</h3>
            <p className="text-slate-500 text-sm">Shattered screens, liquid damage, or dead batteries—we still pay cash for recyclable parts and hardware.</p>
          </div>
        </div>

        {/* Instant Quote Form */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-lg mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-2">Get an Instant Trade-In Estimate</h2>
          <p className="text-slate-500 mb-8">Fill out your device details below for a quick valuation from our Mayfield team.</p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-emerald-900 font-display mb-2">Estimate Requested!</h3>
              <p className="text-emerald-800 mb-4">Our Mayfield team will review your {deviceModel || 'device'} details and text/call you with an estimated offer within 30 minutes.</p>
              <button onClick={() => setSubmitted(false)} className="text-sm font-bold text-emerald-700 underline">Submit another device</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Device Brand & Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 15 Pro, Galaxy S24"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Storage Capacity</label>
                  <select
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option>64GB</option>
                    <option>128GB</option>
                    <option>256GB</option>
                    <option>512GB / 1TB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Device Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="mint">Mint (Like New, No Scratches)</option>
                    <option value="good">Good (Minor Normal Scratches)</option>
                    <option value="cracked">Cracked Screen / Broken Glass</option>
                    <option value="dead">Dead / Won't Turn On / Water Damage</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold font-display hover:bg-blue-500 transition-all shadow-md"
                >
                  Calculate My Phone Value
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Content Box */}
        <div className="space-y-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              How Our Mayfield Phone Trade-In Works
            </h2>
            <ol className="space-y-4 text-slate-600">
              <li className="flex gap-3 items-start">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</span>
                <span><strong>Bring It to Our Store:</strong> Drop into 276 Maitland Rd, Mayfield NSW 2304 (Parking right outside).</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</span>
                <span><strong>5-Minute Hardware Check:</strong> Our technician inspects battery health, screen condition, cameras, and buttons under microscope.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</span>
                <span><strong>Get Paid on the Spot:</strong> Receive instant cash, PayID transfer, or trade credit toward any second-hand device in stock.</span>
              </li>
            </ol>
          </section>

          <hr className="border-slate-100" />

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              Upgrade to a Refurbished Phone with 6-Month Warranty
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Trading in your old phone towards one of our premium certified second-hand iPhones or Samsungs is the smartest way to upgrade. Every refurbished device we sell includes:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span><strong>85%+ Minimum Battery Health Guarantee</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span><strong>Full 70-Point Diagnostic Clearance</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span><strong>6-Month Local In-Store Warranty</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span><strong>Free Data Transfer from Your Old Phone</strong></span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/second-hand-phones" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                View Our Refurbished Phone Stock <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-slate-900 text-white p-10 md:p-14 rounded-3xl text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-extrabold font-display mb-4">Turn Your Old Phone into Cash Today</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Visit 276 Maitland Rd, Mayfield NSW 2304 or call us to check current trade-in rates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:0240491735" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold font-display hover:bg-blue-500 transition-all shadow-lg text-center">
              Call (02) 4049 1735
            </a>
            <Link to="/second-hand-phones" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold font-display hover:bg-slate-100 transition-all shadow-lg text-center">
              Browse Refurbished Stock
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
