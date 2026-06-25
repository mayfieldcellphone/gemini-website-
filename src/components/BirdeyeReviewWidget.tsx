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
    // Append a timestamp so the browser forces fresh script execution on mount
    script.src = `https://birdeye.com/embed/v6/110315/1/1202065629/89b0ec9ad7b6e3429a216196386d88f1c2f4a2be91fe1a62?t=${Date.now()}`;
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
          
          {/* Centered Word of Mouth Reviews Link Badge */}
          <div className="pt-2 flex justify-center">
            <a 
              rel="nofollow" 
              href="https://wordofmouth.com.au/reviews/mayfield-cell-phone-repairs" 
              title="Customer Reviews for Mayfield Cell Phone Repairs, Mayfield on Word of Mouth"
              target="_blank"
              className="inline-block transition-transform hover:scale-105 duration-200"
            >
              <img 
                src="https://www.wordofmouth.com.au/assets/word of mouth-cropped-9bcce12e4f6f82b2a8a68feb868a610b14507974c6348134a2537cfed4bbd9af.svg" 
                alt="Word of Mouth" 
                width="200" 
                className="mx-auto"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>
        </div>
        
        {/* We always render the container immediately so that the Birdeye script can find it inside the DOM on load */}
        <div className="bg-white rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-slate-100 overflow-hidden min-h-[350px]">
          <div id="bf-revz-widget-1202065629"></div>
        </div>
      </div>
    </section>
  );
}
