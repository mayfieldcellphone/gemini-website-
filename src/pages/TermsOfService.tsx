import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <Helmet>
        <title>Terms & Conditions | Mayfield Phone Repair</title>
        <meta name="description" content="Review the Terms and Conditions of service for Mayfield Phone Repair. Covering device repairs, warranties, liabilities, and policies." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-slate prose-blue max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-4">Last Updated: April 2026</p>

            <h2>1. Agreement to Terms</h2>
            <p>By requesting service from Mayfield Phone Repair, you agree to these terms and conditions. Please read them carefully before submitting your device for repair.</p>

            <h2>2. Service Authorization</h2>
            <p>You authorize Mayfield Phone Repair, its employees, and agents to perform repair work on your device. You understand that Mayfield Phone Repair is an independent service provider and is not an Authorized Service Provider for Apple, Samsung, Google, or any other manufacturer unless explicitly stated. Repairing your device may void any remaining manufacturer warranty.</p>

            <h2>3. Data Loss and Backup</h2>
            <p><strong>You are solely responsible for backing up your data before submitting your device for repair.</strong> While we take every precaution to protect your data during hardware repairs, Mayfield Phone Repair assumes no liability for loss, alteration, or corruption of data, software, or files during the repair process.</p>

            <h2>4. Passcodes and Testing</h2>
            <p>We require the passcode of your device to perform comprehensive pre- and post-repair testing (such as checking microphone, speakers, cameras, and connectivity). If you refuse to provide the passcode, we cannot guarantee the full functionality of the device upon return, and our warranty will be strictly limited to the physical part replaced.</p>

            <h2>5. Warranty Policy</h2>
            <ul>
              <li>We offer a limited warranty on all parts and labor for standard repairs (e.g., screen replacements, battery replacements) for a period of up to 6 months.</li>
              <li>This warranty covers manufacturer defects in the replacement parts we install and the workmanship of our installation.</li>
              <li><strong>EXCLUSIONS:</strong> This warranty does NOT cover subsequent physical damage (e.g., dropped devices resulting in cracked screens), liquid damage, software issues, or damage caused by unauthorized third-party modifications after our repair.</li>
              <li><strong>Liquid Damaged Devices:</strong> Devices undergoing liquid damage repair or logic board repair for liquid-induced shorts carry NO WARRANTY due to the unpredictable and progressive nature of internal corrosion.</li>
            </ul>

            <h2>6. Abandoned Devices</h2>
            <p>If you fail to pick up your device or pay the remaining balance within sixty (60) days of being notified that the repair is complete (or that it is unrepairable), your device will be considered abandoned. Mayfield Phone Repair reserves the right to sell, recycle, or otherwise dispose of abandoned devices to recover the cost of parts and labor.</p>

            <h2>7. Unrepairable Devices & Bench Fees</h2>
            <p>If a device is deemed unrepairable after extensive diagnostic work, or if you choose not to proceed with a repair after a quote is provided, a standard diagnostic or bench fee may apply to cover the specialized labor and time involved in disassembly, testing, and reassembly.</p>

            <h2>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by Australian Consumer Law, Mayfield Phone Repair's total liability for any damage to your device is limited to the cost of the repair service provided, or the replacement cost of the device in its exact pre-repair condition (accounting for depreciation and pre-existing faults).</p>

            <h2>9. Payment Terms</h2>
            <p>Full payment is due upon the completion of the repair and prior to the release of the device back to the owner. We accept cash, credit/debit cards, and other approved electronic payments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
