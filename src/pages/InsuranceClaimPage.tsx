import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, Clock, DollarSign, AlertCircle, Phone, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InsuranceClaimPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Insurance Claim Phone Repairs Newcastle",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Mayfield Phone Repair",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "276 Maitland Rd",
        "addressLocality": "Mayfield",
        "addressRegion": "NSW",
        "postalCode": "2304",
        "addressCountry": "AU"
      },
      "telephone": "(02) 4049 1735"
    },
    "description": "Insurance claim phone repairs in Mayfield & Newcastle. Official inspection reports, itemised quotes, and approved repairs for all Australian insurers.",
    "areaServed": "Newcastle NSW"
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm tracking-wide uppercase inline-flex items-center gap-1.5 mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4" /> Official Inspection Reports
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display mb-6 tracking-tight leading-tight">
            Insurance Claim Phone Repairs in Newcastle — We Handle the Paperwork
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Need a phone repair covered by home, contents, travel, or business insurance? We issue formal diagnostic inspection reports and itemised quotes for all major Australian insurers. Fast local turnaround in Mayfield.
          </p>
        </div>

        {/* Quick Contact Box */}
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-display mb-2">Need an Emergency Claim Report Today?</h3>
            <p className="text-blue-100">Walk into our Mayfield shop at 276 Maitland Rd or call us. Reports generated within 1 hour.</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:0240491735" className="bg-white text-blue-700 px-6 py-3.5 rounded-xl font-bold font-display hover:bg-blue-50 transition-all shadow-md inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> (02) 4049 1735
            </a>
            <Link to="/quote" className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold font-display hover:bg-slate-800 transition-all shadow-md inline-flex items-center gap-2">
              Get Claim Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4 flex items-center gap-3">
              <FileText className="w-7 h-7 text-blue-600" /> How Insurance Claim Phone Repairs Work
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Filing an insurance claim for a smashed screen, liquid damage, or bent phone frame doesn't have to be stressful. We simplify the entire process into 5 simple steps:
            </p>
            <div className="grid sm:grid-cols-5 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">1</div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Check Policy</h4>
                <p className="text-xs text-slate-500">Confirm accidental damage coverage with your provider.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">2</div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Drop In Device</h4>
                <p className="text-xs text-slate-500">Bring device to 276 Maitland Rd for physical assessment.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">3</div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">We Issue Report</h4>
                <p className="text-xs text-slate-500">Formal PDF report & itemised quote generated for your insurer.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">4</div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Insurer Approves</h4>
                <p className="text-xs text-slate-500">Submit our documentation to claim your payout or repair approval.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">5</div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Same-Day Repair</h4>
                <p className="text-xs text-slate-500">We restore your device to brand-new condition in under 60 mins.</p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-blue-600" /> What Phone Repairs Are Usually Covered
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Most Australian home contents, portable valuables, business equipment, and credit card insurance policies cover sudden accidental damage. Common covered repairs include:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Accidental Drops & Cracks</h4>
                  <p className="text-xs text-slate-500">Shattered front screen, broken rear glass, bent chassis frame from drops.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Liquid Ingress & Water Damage</h4>
                  <p className="text-xs text-slate-500">Submersion in pools, ocean salt-water, or accidental coffee and drink spills.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Power Surges & Lightning</h4>
                  <p className="text-xs text-slate-500">Blown motherboard PMIC chips from faulty wall chargers or lightning surges.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Total Loss / Write-Off Reports</h4>
                  <p className="text-xs text-slate-500">If repair exceeds device market value, we provide official Beyond Economical Repair (BER) certificates for full cash replacement.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4 flex items-center gap-3">
              <Award className="w-7 h-7 text-blue-600" /> What We Provide for Your Claim
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Insurance assessors require official, verifiable documentation before approving claims. We provide a complete insurance report pack including:
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <strong>Official Inspection Report:</strong> Comprehensive diagnosis with IMEI, serial number, and physical damage breakdown.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <strong>Itemised GST Quote:</strong> Clear line-item costs for OEM-spec parts and technician labor.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <strong>High-Res Photographic Evidence:</strong> Microscopic and exterior photos documenting the damage.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <strong>Registered Business Tax Invoice:</strong> ABN registered tax invoice for easy reimbursement.
              </li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4 flex items-center gap-3">
              <Clock className="w-7 h-7 text-blue-600" /> How We Compare to Your Insurer's Preferred Repairers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm">
                    <th className="p-4 font-display">Feature</th>
                    <th className="p-4 font-display">Insurer's Preferred Network</th>
                    <th className="p-4 font-display bg-blue-700">Mayfield Phone Repair</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600 divide-y divide-slate-200">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Turnaround Time</td>
                    <td className="p-4 text-amber-700">7 to 14 days (Mail-in to capital city)</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50">Same-Day / While You Wait (30-60 mins)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Data Risk</td>
                    <td className="p-4 text-red-600">High (Default policy is factory reset)</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50">Zero Data Loss (Your photos & files safe)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Customer Support</td>
                    <td className="p-4 text-slate-500">Call center queue / Automated status</td>
                    <td className="p-4 font-bold text-slate-900 bg-blue-50/50">Face-to-face local Mayfield technician</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Warranty</td>
                    <td className="p-4">Standard 30-90 days</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50">90-Day Guarantee on Parts & Labor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4 flex items-center gap-3">
              <DollarSign className="w-7 h-7 text-blue-600" /> What It Costs You Out of Pocket
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Depending on your policy, your insurer will either reimburse you directly or pay us straight upon invoice. In most cases, your only out-of-pocket cost is your standard policy excess (typically $50 to $200).
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Example Claim Calculation:</h4>
              <p className="text-sm text-slate-600">
                iPhone 16 Pro Max Screen & Back Glass Repair Total: <strong>$490</strong><br />
                Your Home Contents Policy Excess: <strong>$100</strong><br />
                <span className="text-emerald-600 font-bold">Insurer Pays: $390 | You Pay: $100</span>
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4 flex items-center gap-3">
              <AlertCircle className="w-7 h-7 text-blue-600" /> What to Look For in Your Policy Before You Call Us
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Accidental Damage Option:</strong> Check if portable items outside the home are covered.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Choice of Repairer:</strong> Under Australian law, you generally have the right to request a local repairer instead of mail-in logistics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Excess Amount:</strong> Ensure your repair quote exceeds your excess to make filing worthwhile.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-slate-900 text-white p-10 md:p-14 rounded-3xl text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-extrabold font-display mb-4">Start Your Insurance Claim Today</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Visit 276 Maitland Rd, Mayfield NSW 2304 or call our team. We'll inspect your phone and hand you an official insurance quote in 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:0240491735" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold font-display hover:bg-blue-500 transition-all shadow-lg text-center">
              Call (02) 4049 1735
            </a>
            <Link to="/quote" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold font-display hover:bg-slate-100 transition-all shadow-lg text-center">
              Request Written Quote Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
