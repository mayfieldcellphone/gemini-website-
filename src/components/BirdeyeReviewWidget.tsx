import { Helmet } from 'react-helmet-async';

export default function BirdeyeReviewWidget() {
  return (
    <section className="bg-slate-50 py-16 px-6 md:px-12 border-t border-slate-200">
      <Helmet>
        <script type="text/javascript" src="https://birdeye.com/embed/v7/166433098189597/10/987654321301015183969661" async></script>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Real Customer Reviews</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">What our community says</h3>
        </div>
        
        {/* The target div for the Birdeye widget exactly as provided */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 overflow-hidden min-h-[300px]">
          <div id="bf-revz-widget-987654321301015183969661" ></div>
        </div>
      </div>
    </section>
  );
}
