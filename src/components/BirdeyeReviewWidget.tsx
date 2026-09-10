import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

export default function BirdeyeReviewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We always append the script on mount.
    const scriptId = 'birdeye-reviews-widget-script';
    
    // Clean up any stale instances of the script to avoid duplicate executions
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    // No cache-busting query string. Birdeye's embed endpoint does not serve the
    // widget when extra query params are appended, so the `?t=` that used to be
    // here made the script a no-op and the reviews section silently stayed empty.
    // Verified 2026-09-10: identical URL without the query string renders fine.
    script.src = 'https://birdeye.com/embed/v7/166433098189597/10/123456789301015183969661';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []); // Run exactly once on mount

  return (
    <section ref={containerRef} className="bg-slate-50 py-12 md:py-20 px-6 md:px-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">Real Customer Reviews</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight font-display tracking-tight">What our community says</h3>
          
          
        </div>
        
        {/* We always render the container immediately so that the Birdeye script can find it inside the DOM on load */}
        <div className="bg-white rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-slate-100 overflow-hidden min-h-[350px]">
                    <div id="bf-revz-widget-123456789301015183969661"></div>
        </div>
      </div>
    </section>
  );
}
