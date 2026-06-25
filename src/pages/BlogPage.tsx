import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogs';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  ArrowRight, 
  Zap,
  Search,
  Tag,
  X,
  Phone,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Sparkles,
  Smartphone,
  Laptop
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export default function BlogPage() {
  const { openBooking } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const publishedPosts = blogPosts
    .filter(post => post.date <= today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Derive unique tags from published posts to build the interactive tag cloud
  const uniqueTags = Array.from(
    new Set(publishedPosts.flatMap(post => post.tags))
  ).filter(Boolean);

  // Core high-intent keyword definitions for local SEO matching blogs
  const keywordLinks = [
    { label: 'iPhone Screen Repair', desc: 'Starting from $89 with TrueTone alignment', serviceId: 'screen-repair' },
    { label: 'Battery Replacement', desc: 'Premium, original-spec battery cells', serviceId: 'battery-replacement' },
    { label: 'Water Damage Rescue', desc: 'Ultrasonic board chemical neutralization', serviceId: 'water-damage' },
    { label: 'MacBook & Laptop Repair', desc: 'Overheated boards & physical repairs', serviceId: 'laptop-repair' },
    { label: 'Charging Port Service', desc: 'Solves poor connection & charge issues', serviceId: 'charging-port-repair' }
  ];

  const targetSuburbs = [
    'Mayfield', 'Newcastle', 'Waratah', 'Wallsend', 'Hamilton', 
    'Broadmeadow', 'Lambton', 'Tighes Hill', 'Wickham'
  ];

  // Perform interactive search and tag-match filtering
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === '' || 
      post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Helmet>
        <title>Repair Blog | Mayfield Phone Repair Newcastle</title>
        <meta name="description" content="Expert phone repair tips, troubleshooting guides, and project highlights from the Mayfield Phone Repair team." />
        <link rel="canonical" href="https://mayfieldphonerepair.com.au/blog" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Split-Hero Header Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Title & Browse Topics & Interactive Search */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-50 border border-blue-100 rounded-2xl mb-1">
              <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-blue-800 uppercase tracking-[0.3em] font-display">Repair Insights & Local FAQ</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-slate-900 tracking-tighter leading-none font-display">
              The Repair <br className="hidden md:block" /> Blog.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed italic font-sans max-w-xl">
              Expert physical diagnostics, preventative checklists, and professional advice from Mayfield Phone Repair. 
              <span className="text-blue-600"> Your local destination for premium same-day mobile hardware repairs in Newcastle.</span>
            </p>

            {/* Interactive Search Tool right in the Hero */}
            <div className="max-w-xl relative">
              <input 
                type="text" 
                placeholder="Search troubleshooting guides (e.g. screen, battery)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4.5 pl-12 pr-10 text-sm font-medium text-slate-850 placeholder-slate-450 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full" 
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Dynamic Service Access Codes & Conversion Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full translate-x-8 -translate-y-8"></div>
              
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-display">Need Instant Repair?</h3>
                  <p className="text-[10px] text-slate-400 font-sans italic">Overnight or 60-minute in-store turnaround</p>
                </div>
                <span className="text-[10px] px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Active Now
                </span>
              </div>

              {/* Direct Service Target Solutions in Hero */}
              <div className="space-y-3">
                {keywordLinks.slice(0, 3).map((k) => (
                  <Link 
                    key={k.serviceId} 
                    to={`/service/${k.serviceId}`}
                    className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-white border border-transparent hover:border-blue-100 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 group"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-650 transition-colors">{k.label}</p>
                      <p className="text-[11px] text-slate-400 leading-none italic font-medium">{k.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-blue-50 flex items-center justify-center border border-slate-100/30 group-hover:border-blue-100 transition-colors shadow-sm shrink-0 ml-4">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Instant CTAs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={openBooking}
                  className="cursor-pointer bg-slate-950 hover:bg-blue-600 text-white text-center py-4 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/15 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book Instant Repair
                </button>
                <a 
                  href="tel:0240491735" 
                  className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 border border-blue-100/30 text-blue-600 text-center py-4 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  Call 02 4049 1735
                </a>
              </div>

              <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-slate-400 text-[10px] font-black uppercase tracking-wider font-display">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> 90-Day Warranty</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> 276 Maitland Rd</span>
              </div>
            </div>
          </div>
        </div>

        {/* 100% Full Width Blog Posts Section */}
        <div className="space-y-12">
          
          {/* Active Filters Display */}
          {(searchQuery || selectedTag) && (
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-lg shadow-slate-200/40 mb-8 max-w-7xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 font-display uppercase tracking-wider">Filtered by:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold">
                    Query: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} aria-label="Clear query search"><X className="w-3.5 h-3.5 hover:text-red-400" /></button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/10">
                    Tag: #{selectedTag}
                    <button onClick={() => setSelectedTag('')} aria-label="Clear tag filter"><X className="w-3.5 h-3.5 hover:text-red-200" /></button>
                  </span>
                )}
              </div>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedTag(''); }}
                className="text-xs font-bold text-red-500 hover:text-red-600 border-b border-transparent hover:border-red-500 transition-colors py-0.5"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Full-width Responsive Grid: 3 columns on desktops */}
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, idx) => (
              <article key={post.id} className="relative flex flex-col items-start bg-transparent group">
                <Link to={`/blog/${post.slug}`} className="block w-full relative h-[250px] sm:h-[280px] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10 flex items-end p-8">
                    <span className="text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </Link>
                
                <div className="w-full space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] font-display">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <button 
                          key={tag} 
                          onClick={() => setSelectedTag(tag)}
                          className="text-[9px] font-black text-blue-600 uppercase tracking-widest font-display hover:underline"
                        >
                          #{tag.replace(/\s+/g, '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block group/title">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover/title:text-blue-600 transition-colors font-display tracking-tight leading-tight">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-slate-500 line-clamp-3 text-sm font-medium leading-relaxed italic pr-4 border-l-2 border-transparent group-hover/title:border-blue-600 group-hover/title:pl-4 transition-all duration-500">
                      {post.excerpt}
                    </p>
                  </Link>

                  <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-3 text-[10px] text-slate-900 font-black uppercase tracking-[0.2em] font-display font-medium">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-slate-300" />
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 shadow-lg shadow-slate-950/15"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-24 bg-white border border-slate-100 p-8 rounded-[3rem] max-w-xl mx-auto shadow-sm">
              <p className="text-slate-400 font-medium italic mb-3">No matching repair tutorials found.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedTag(''); }}
                className="text-xs text-blue-650 hover:text-blue-750 font-bold underline"
              >
                Clear all active search queries
              </button>
            </div>
          )}
        </div>

        {/* Local Suburbs Map Chip Footer */}
        <div className="mt-20 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] font-display text-blue-600 block">Service Radiuses</span>
              <p className="text-base font-bold text-slate-900">Newcastle Surrounding Suburbs Serviced</p>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-3xl">
              {targetSuburbs.map(sub => (
                <span key={sub} className="text-[10px] px-3.5 py-1.5 bg-slate-50 text-slate-600 rounded-xl font-bold tracking-tight border border-slate-100">
                  {sub}, NSW
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Footer */}
        <div className="mt-32 pt-20 border-t border-slate-200 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] font-display text-slate-400">Content Quality</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed font-sans">All articles are reviewed by our lead technicians to ensure technical accuracy and helpful advice.</p>
          </div>
          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] font-display text-slate-400">Local Service</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed font-sans">Providing reliable phone repair services to Mayfield, Newcastle, and surrounding suburbs.</p>
          </div>
          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] font-display text-slate-400">AI Search Ready</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed font-sans">Content is structured for better visibility in AI-powered search engines and voice search.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

