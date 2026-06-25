import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <Helmet>
        <title>Page Not Found | 404 | Mayfield Phone Repair</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-xl w-full text-center space-y-12">
        <div className="relative">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-50 leading-none select-none font-display">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 pt-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-display tracking-tight leading-none">
              Lost in Transmission
            </h2>
            <p className="text-slate-500 font-medium italic max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved to a new frequency.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/" 
            className="w-full sm:w-auto px-10 py-6 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-blue-600 transition-all font-display flex items-center justify-center gap-3"
          >
            <Home className="w-4 h-4" /> Back to Base
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-10 py-6 bg-slate-50 text-slate-900 border border-slate-200 font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl hover:border-blue-400 transition-all font-display flex items-center justify-center gap-3"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>

        <div className="pt-12 border-t border-slate-100 italic text-slate-400 text-sm">
          Searching for a repair? <Link to="/#booking" className="text-blue-600 hover:underline">Book a slot today</Link>.
        </div>
      </div>
    </div>
  );
}
