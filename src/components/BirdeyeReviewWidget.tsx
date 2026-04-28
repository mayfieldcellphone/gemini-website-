import { useEffect, useRef, useState } from 'react';

export default function BirdeyeReviewWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Add a small extra delay to ensure FCP is settled
          setTimeout(() => setShouldLoad(true), 3000);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' } // Reduced margin to ensure it only loads close to viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://birdeye.com/embed/v7/166433098189597/10/987654321301015183969661';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [shouldLoad]);

  return (
    <section ref={containerRef} className="bg-slate-50 py-16 px-6 md:px-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Real Customer Reviews</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">What our community says</h3>
        </div>
        
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 overflow-hidden min-h-[300px]">
          <div id="bf-revz-widget-987654321301015183969661" ></div>
        </div>
      </div>
    </section>
  );
}
