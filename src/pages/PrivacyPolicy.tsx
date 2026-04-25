import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Helmet>
        <title>Privacy Protocol | Mayfield Phone Repair</title>
        <meta name="description" content="Read the privacy policy for Mayfield Phone Repair to understand how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] transition-all bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm group font-display">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Terminal
          </Link>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white">
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-12 font-display">Privacy Protocol</h1>
          
          <div className="prose prose-slate prose-blue max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium prose-li:text-slate-600">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-display mb-12 border-b border-slate-100 pb-6">Last Revised: April 2026 // VERSION 2.4.0</p>
            
            <h2 className="text-3xl">1. Initial Protocol</h2>
            <p>Welcome to the Mayfield Lab (Mayfield Phone Repair). We maintain strict operational security regarding your personal data. This privacy policy informs you of our data handling methodology and your legal protections during device restoration cycles.</p>

            <h2 className="text-3xl">2. Technical Data Capture</h2>
            <p>We captivate specific data classes strictly required for hardware diagnostics and relational mapping:</p>
            <ul>
              <li><strong>Identity Vectors:</strong> Legal names and digital identifiers.</li>
              <li><strong>Connectivity Data:</strong> Verification nodes including telephone and email addresses.</li>
              <li><strong>Hardware Metadata:</strong> Device architecture, IMEI/Serial markers, and temporary diagnostic passcodes.</li>
              <li><strong>Ledger Data:</strong> Historical transaction and service logs.</li>
            </ul>
            
            <div className="bg-slate-900 text-white p-10 my-12 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <p className="m-0 text-lg font-medium leading-relaxed italic text-slate-300">
                <strong className="text-white block not-italic font-black uppercase tracking-[0.2em] text-xs mb-4">Security Notice: Passcode Integrity</strong>
                Diagnostic passcodes are held temporarily for functional verification. Our technicians are strictly prohibited from accessing private file structures, optical caches, or encrypted messages outside of explicit data recovery protocols.
              </p>
            </div>

            <h2 className="text-3xl">3. Operational Utility</h2>
            <p>Data usage is restricted to the following legal frameworks:</p>
            <ul>
              <li>Execution of hardware restoration contracts.</li>
              <li>Relational management and status notifications.</li>
              <li>Compliance with legislative regulatory obligations.</li>
            </ul>

            <h2 className="text-3xl">4. Hardware Security</h2>
            <p>We implement multi-layered security protocols to prevent unauthorized data exfiltration. Access is strictly limited to active technicians with a certified "Need to Know" clearance during active repair cycles.</p>

            <h2 className="text-3xl">5. Data Lifecycle</h2>
            <p>Personal data is retained only for duration of the restoration cycle and subsequent warranty tracking periods as required by Australian tax and consumer law.</p>

            <h2 className="text-3xl">6. Client Rights</h2>
            <p>You retain full agency over your data, including rights to access, correction, and erasure within the bounds of legal service requirements.</p>

            <h2 className="text-3xl">7. External Nodes</h2>
            <p>Our digital interface may link to external modules. We do not control these third-party security environments and advise review of their specific protocols.</p>

            <h2 className="text-3xl">8. Support Channel</h2>
            <p>Direct inquiries regarding technical privacy can be routed through our Mayfield Lab command center during standard operational hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
