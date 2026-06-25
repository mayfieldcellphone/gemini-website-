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
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white">
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-12 font-display">Terms of Service</h1>
          
          <div className="prose prose-slate prose-blue max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium prose-li:text-slate-600">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-display mb-12 border-b border-slate-100 pb-6">Last Revised: April 2026</p>

            <h2 className="text-3xl">1. Agreement to Service</h2>
            <p>By requesting a repair at Mayfield Phone Repair, you agree to these terms and conditions. Please read them carefully before submitting your device.</p>

            <h2 className="text-3xl">2. Authorization</h2>
            <p>You authorize Mayfield Phone Repair technicians to repair your device. We are an independent repair shop and not an "Authorized Service Provider" for Apple, Samsung, or Google unless stated otherwise. Repairs may void your original manufacturer warranty.</p>

            <h2 className="text-3xl">3. Data Responsibility</h2>
            <p><strong>You are responsible for backing up your data before bringing your device in.</strong> While we take every precaution, Mayfield Phone Repair is not liable for any data loss, corrupted files, or software issues that occur during the repair process.</p>

            <h2 className="text-3xl">4. Device Access</h2>
            <p>Testing your device's cameras, speakers, and connection requires access to the system. If you do not provide a passcode, we cannot fully test the device after the repair, and our warranty will only cover the specific parts we replaced.</p>

            <h2 className="text-3xl">5. Warranty Policy</h2>
            <ul>
              <li>We offer a 90-day warranty on both our labor and the parts we install.</li>
              <li>This warranty covers manufacturing defects in the parts and any issues with our installation.</li>
              <li><strong>EXCLUSIONS:</strong> The warranty does not cover accidental damage, cracked screens after repair, water damage, or any third-party modifications.</li>
              <li><strong>Water Damage:</strong> Repairs for water-damaged devices do not come with a warranty due to the unpredictable nature of corrosion.</li>
            </ul>

            <h2 className="text-3xl">6. Abandoned Devices</h2>
            <p>Any device left unclaimed for 60 days after we notify you that it's ready (or cannot be fixed) will be considered abandoned. We reserve the right to recycle or sell the device to cover our costs.</p>

            <h2 className="text-3xl">7. Diagnostic Fees</h2>
            <p>If a device is unrepairable or you decide not to proceed after we've diagnosed the issue, a small diagnostic fee may apply to cover our time and the resources used to test the device.</p>

            <h2 className="text-3xl">8. Liability</h2>
            <p>Under Australian Consumer Law, our liability is limited to the cost of the repair or the fair replacement value of the device in its condition before the repair started.</p>

            <h2 className="text-3xl">9. Payment</h2>
            <p>Full payment is required when you pick up your device. We accept credit cards, mobile payments, and cash.</p>
            <h2 className="text-3xl">10. Contact</h2>
            <p>For any questions regarding these terms, please contact us at <a href="mailto:support@mayfieldphonerepair.com.au" className="text-blue-600 font-bold hover:underline">support@mayfieldphonerepair.com.au</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
