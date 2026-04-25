import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogs';
import { ChevronRight, Calendar, User, ArrowRight, Zap } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Helmet>
        <title>Technical Intelligence | Mayfield Phone Repair Lab</title>
        <meta name="description" content="Certified technical insights, hardware restoration protocols, and expert industry analysis from the Mayfield Lab técnicos." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <header className="max-w-4xl mb-32 space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-50 border border-blue-100 rounded-2xl mb-4">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-blue-800 uppercase tracking-[0.3em] font-display">Lab Archive V2.4</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-bold text-slate-900 tracking-tighter leading-none font-display">
            Restoration <br className="hidden md:block" /> Intelligence.
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 font-medium leading-relaxed italic max-w-2xl">
            Technical methodology and hardware diagnostics from the Mayfield Lab. 
            <span className="text-blue-600"> Expert guidance for precision repairs.</span>
          </p>
        </header>

        <div className="grid gap-20 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="relative flex flex-col items-start bg-transparent group">
              <Link to={`/blog/${post.slug}`} className="block w-full relative h-[300px] sm:h-[450px] rounded-[3.5rem] overflow-hidden mb-10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              
              <div className="w-full space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] font-display">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-display">
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to={`/blog/${post.slug}`} className="block group/title">
                  <h3 className="text-3xl md:text-5xl font-bold text-slate-900 group-hover/title:text-blue-600 transition-colors font-display tracking-tighter leading-none">
                    {post.title}
                  </h3>
                  <p className="mt-8 text-xl text-slate-500 line-clamp-3 font-medium leading-relaxed italic pr-12 border-l-4 border-transparent group-hover/title:border-blue-600 group-hover/title:pl-8 transition-all duration-500">
                    {post.excerpt}
                  </p>
                </Link>

                <div className="pt-10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-900 font-black uppercase tracking-[0.2em] font-display">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center shadow-sm">
                      <User className="w-5 h-5 text-slate-300" />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 shadow-xl shadow-slate-900/20"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Lab Technical Footer */}
        <div className="mt-40 pt-20 border-t border-slate-200 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] font-display text-slate-400">Content Integrity</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed">All technical content is verified by certified Mayfield Lab technicians for hardware accuracy.</p>
          </div>
          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] font-display text-slate-400">Service Nodes</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed">Intelligence shared here applies to Newcastle, Wallsend, and surrounding diagnostic hubs.</p>
          </div>
          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] font-display text-slate-400">SGE Optimized</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed">Data structures are formatted for modern AI extraction and LLM scannability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

