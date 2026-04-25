import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogs';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  ArrowLeft, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Phone, 
  MapPin,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useEffect } from 'react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Calculate read time (approx 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="flex-1 bg-white">
      <Helmet>
        <title>{post.title} | Technical Intelligence | Mayfield Phone Repair</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      {/* Article Header */}
      <header className="bg-slate-50 border-b border-slate-100 pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12 font-display">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Repair Blog</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-900 truncate max-w-[200px]">Article Detail</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-xl bg-blue-600 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 font-display">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-none mb-10 font-display">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-xs font-black uppercase tracking-[0.2em] text-slate-500 font-display">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-white">
                  <User className="w-4 h-4" />
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{readTime} Min Read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-12 gap-16 relative">
        
        {/* Left Column: Social/Tools (Sticky) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-32 space-y-8 flex flex-col items-center">
            <button className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm group" aria-label="Share">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <div className="w-px h-12 bg-slate-100"></div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 transform -rotate-90 origin-center whitespace-nowrap font-display">
              Share Article
            </div>
          </div>
        </div>

        {/* Center: Article Content */}
        <article className="lg:col-span-7 space-y-12">
          {/* Featured Image */}
          <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group h-[300px] sm:h-[500px]">
             <img
               src={post.imageUrl}
               alt={post.title}
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>

          {/* AI / SGE Summary Block */}
          <div className="bg-slate-900 text-white rounded-[3rem] p-10 sm:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 text-blue-400">
                <Zap className="w-5 h-5 fill-current" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] font-display">Key Takeaways (Top Answers)</h2>
              </div>
              <p className="text-xl font-medium text-slate-200 leading-relaxed italic pr-8">
                {post.excerpt}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Same-Day Repair Service</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trusted Local Technicians</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div 
            className="prose prose-lg sm:prose-xl prose-slate max-w-none 
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
              prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
              prose-li:text-slate-600 prose-li:font-medium
              prose-strong:text-slate-900 prose-strong:font-black
              prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline hover:prose-a:text-blue-700
              prose-img:rounded-[2.5rem] prose-img:shadow-2xl
              prose-hr:border-slate-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post-Article Actions */}
          <div className="pt-12 border-t border-slate-100 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-slate-400">#{tag.replace(/\s+/g, '')}</span>
              ))}
            </div>
            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition h-fit font-display">
              <Share2 className="w-4 h-4" /> Share Protocol
            </button>
          </div>
        </article>

        {/* Right Column: Sidebar (Sticky) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-32 space-y-8">
            
            {/* Direct Booking Sidebar Card */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white p-10 shadow-2xl shadow-slate-200/50 space-y-8 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] font-display">Fast Booking</h3>
                <p className="text-2xl font-bold text-slate-900 leading-tight font-display tracking-tight">Need an immediate fix?</p>
                <p className="text-slate-500 font-medium leading-relaxed">Our technicians are ready to help. Most standard repairs are finished in under 60 minutes.</p>
              </div>

              <div className="space-y-4">
                <Link to="/#contact" className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 font-display">
                  Book A Repair
                </Link>
                <a href="tel:0240491735" className="flex items-center justify-center gap-3 w-full bg-slate-50 text-slate-900 border border-slate-200 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:border-blue-400 transition-all font-display">
                  <Phone className="w-4 h-4" /> Call Shop
                </a>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center gap-4 text-emerald-600 text-[10px] font-black uppercase tracking-widest font-display">
                <ShieldCheck className="w-5 h-5" /> 90-Day Warranty Included
              </div>
            </div>

            {/* Quick Stats / Info Card */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 font-display">Service Quality</h3>
               <div className="space-y-6">
                 {[
                   { label: 'Success Rate', val: '99.8%' },
                   { label: 'Avg Repair Time', val: '45m' },
                   { label: 'Google Rating', val: '5.0/5' }
                 ].map(stat => (
                   <div key={stat.label} className="flex justify-between items-end group">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{stat.label}</span>
                     <span className="text-2xl font-bold font-display group-hover:text-blue-400 transition-colors">{stat.val}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Lab Location */}
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6 group hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MapPin className="w-6 h-6 text-slate-400 group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2 font-display uppercase tracking-widest text-xs">Our Location</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">276 Maitland Rd, Mayfield, NSW, 2304</p>
              </div>
            </div>

          </div>
        </aside>
      </div>

      {/* Recommended Reads (Bottom CTA) */}
      <section className="bg-slate-50 py-32 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-display leading-tight">Extended Intelligence</h2>
              <p className="text-xl text-slate-500 font-medium italic">Discover advanced restoration methodologies across other protocols.</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition font-display">
              Full Archive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(related => (
              <Link key={related.id} to={`/blog/${related.slug}`} className="group space-y-6">
                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl">
                  <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors font-display tracking-tight leading-tight">{related.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Calendar className="w-3 h-3" /> {new Date(related.date).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Floating Action Button (Mobile) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[90%] max-w-sm">
        <Link to="/#contact" className="flex items-center justify-center gap-4 bg-slate-900 text-white px-8 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/30 font-display">
          Start Repair <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
