import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Helmet>
        <title>Terms & Conditions | Mayfield Phone Repair</title>
        <meta name="description" content="Review the Terms and Conditions of service for Mayfield Phone Repair. Covering device repairs, warranties, liabilities, and policies." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] transition-all bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm group font-display">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Terminal
          </Link>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white">
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-12 font-display">Terms of Service</h1>
          
          <div className="prose prose-slate prose-blue max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium prose-li:text-slate-600">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-display mb-12 border-b border-slate-100 pb-6">Last Revised: April 2026 // SERVICE PROTOCOL 1.0.4</p>

            <h2 className="text-3xl">1. Agreement to Service Protocol</h2>
            <p>By initiating a restoration request at the Mayfield Lab, you acknowledge and agree to these terms and conditions. Please review these protocols thoroughly before hardware submission.</p>

            <h2 className="text-3xl">2. Technical Authorization</h2>
            <p>You authorize Mayfield Lab technicians to perform diagnostic and restoration procedures on your hardware. We operate as an independent technical node and are not an "Authorized Service Provider" for Apple, Samsung, or Google unless explicitly stated. Hardware intervention may negate original manufacturer warrants.</p>

            <h2 className="text-3xl">3. Data Integrity & Redundancy</h2>
            <p><strong>The client is solely responsible for full data redundancy (backups) prior to lab submission.</strong> While we employ strict safety protocols, Mayfield Phone Repair assumes no liability for the corruption, deletion, or loss of digital artifacts, software modules, or personal files during the hardware restoration cycle.</p>

            <h2 className="text-3xl">4. Diagnostic Access</h2>
            <p>Verification of internal systems requires temporary device access (passcodes) to test optical sensors, audio arrays, and connectivity nodes. Refusal of access restricts our ability to certify full system integrity post-operation, and our warrant will be limited strictly to the physical component swapped.</p>

            <h2 className="text-3xl">5. Warranty Protocol</h2>
            <ul>
              <li>We provide a limited warrant period of up to 6 months on laboratory labor and premium hardware components.</li>
              <li>Coverage extends strictly to manufacturing variances in our replacement units and the precision of our installation methodology.</li>
              <li><strong>EXCLUSIONS:</strong> Under no circumstances does the warrant cover subsequent kinetic impact damage, liquid ingress, software corruption, or unauthorized third-party board modifications.</li>
              <li><strong>Special Case: Liquid Damage.</strong> Devices undergoing restoration for liquid ingress or logic-board electrolytic bridge removal carry ZERO warrant due to the progressive nature of internal oxidation.</li>
            </ul>

            <h2 className="text-3xl">6. Abandoned Hardware</h2>
            <p>Hardware left unclaimed for sixty (60) days post-notification of restoration completion (or failure) will be classified as "Abandoned." The Mayfield Lab reserves the right to recycle or liquidate abandoned units to offset laboratory and component costs.</p>

            <h2 className="text-3xl">7. Bench Intelligence Fees</h2>
            <p>In scenarios where hardware is deemed "Beyond Economical Recovery" or the client rejects the restoration quote, a standard diagnostic "Bench Fee" may be applied to cover laboratory resources and technical time involved in disassembly and testing.</p>

            <h2 className="text-3xl">8. Liability Constraints</h2>
            <p>To the maximum extent permitted under Australian Consumer Law, Mayfield Lab liability is capped at the cost of the services rendered or the fair market value of the hardware in its immediate pre-repair state.</p>

            <h2 className="text-3xl">9. Transaction Completion</h2>
            <p>Full financial settlement is required upon hardware release. We accept digital credit nodes, mobile payments, and standard cash currency.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
