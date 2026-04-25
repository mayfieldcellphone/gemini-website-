import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <Helmet>
        <title>Privacy Policy | Mayfield Phone Repair</title>
        <meta name="description" content="Read the privacy policy for Mayfield Phone Repair to understand how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate prose-blue max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-4">Last Updated: April 2026</p>
            
            <h2>1. Introduction</h2>
            <p>Welcome to Mayfield Phone Repair ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website, use our services, or visit our store, and tell you about your privacy rights and how the law protects you.</p>

            <h2>2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Device Data:</strong> includes device Make, Model, IMEI/Serial Number, passcodes (temporarily required for repair testing), and physical/diagnostic condition.</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
              <p className="m-0 text-sm font-medium text-slate-800">
                <strong>Note on Passcodes and Personal Data:</strong> In order to fully test your device before and after a repair, we may request your device passcode. Our technicians do not access, view, or copy your personal files, photos, or messages unless explicitly required to perform a requested service (e.g., data recovery or transfer) with your knowledge. We respect your privacy completely.
              </p>
            </div>

            <h2>3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., repairing your device).</li>
              <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy, or keeping you updated on your repair status.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a strict duty of confidentiality.</p>

            <h2>5. Data Retention</h2>
            <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. By law we have to keep basic information about our customers (including Contact, Identity, Financial and Transaction Data) for tax and warranty purposes.</p>

            <h2>6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>

            <h2>7. Third-Party Links</h2>
            <p>This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy notice of every website you visit.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at our Mayfield store or via our published phone numbers and email address.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
