import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Helmet>
        <title>Privacy Policy | Mayfield Phone Repair</title>
        <meta name="description" content="Read the privacy policy for Mayfield Phone Repair to understand how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] transition-all bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm group font-display">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white">
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-12 font-display">Privacy Policy</h1>
          
          <div className="prose prose-slate prose-blue max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium prose-li:text-slate-600">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-display mb-12 border-b border-slate-100 pb-6">Last Revised: April 2026</p>
            
            <h2 className="text-3xl">1. Introduction</h2>
            <p>Welcome to Mayfield Phone Repair. We take your privacy seriously. This policy explains how we collect, use, and protect your personal information during the repair process.</p>

            <h2 className="text-3xl">2. Information We Collect</h2>
            <p>We only collect the information we need to fix your device and stay in touch:</p>
            <ul>
              <li><strong>Contact Information:</strong> Your name, phone number, and email address.</li>
              <li><strong>Device Information:</strong> Model, serial number/IMEI, and temporary passcodes needed for testing.</li>
              <li><strong>Service Logs:</strong> A history of the repairs we've done for you.</li>
            </ul>
            
            <div className="bg-slate-900 text-white p-10 my-12 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <p className="m-0 text-lg font-medium leading-relaxed italic text-slate-300">
                <strong className="text-white block not-italic font-black uppercase tracking-[0.2em] text-xs mb-4">Privacy Note: Device Passcodes</strong>
                We only use passcodes to test your phone's functionality. Our technicians are strictly forbidden from looking at your photos, messages, or any private data unless you've specifically asked us for data recovery.
              </p>
            </div>

            <h2 className="text-3xl">3. How We Use Your Data</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Repair your device and fulfill our service agreement.</li>
              <li>Contact you about your repair status.</li>
              <li>Comply with legal and tax requirements.</li>
            </ul>

            <h2 className="text-3xl">4. Security</h2>
            <p>We have strict security measures in place to protect your device and data. Only the technician working on your repair has access to your information.</p>

            <h2 className="text-3xl">5. Data Retention</h2>
            <p>We keep your contact and service information for as long as necessary for warranty tracking and tax purposes according to Australian law.</p>

            <h2 className="text-3xl">6. Your Rights</h2>
            <p>You have the right to access, correct, or request the deletion of your personal information at any time.</p>

            <h2 className="text-3xl">7. Third-Party Links</h2>
            <p>Our website may link to other sites. We aren't responsible for their privacy policies, so we recommend reading theirs too.</p>

            <h2 className="text-3xl">8. Contact Us</h2>
            <p>If you have any questions about your privacy, please email us at <a href="mailto:support@mayfieldphonerepair.com.au" className="text-blue-600 font-bold hover:underline">support@mayfieldphonerepair.com.au</a> or visit our shop during business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
