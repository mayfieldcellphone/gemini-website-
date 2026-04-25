import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogs';
import { ChevronRight, Calendar, User } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Helmet>
        <title>Technical Intelligence | Mayfield Phone Repair Blog</title>
        <meta name="description" content="Read expert tips, device maintenance guides, and inside industry knowledge on phone, tablet, and laptop repairs from Mayfield Phone Repair." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-8xl font-bold text-slate-900 tracking-tighter leading-none mb-8 font-display">
            Restoration Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic">
            Certified methodology, technical insights, and the latest hardware protocols from the Mayfield lab.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="relative flex flex-col items-start bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white overflow-hidden group hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500">
              <Link to={`/blog/${post.slug}`} className="block w-full">
                <div className="relative w-full h-[350px] overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col justify-between p-10 sm:p-12 w-full space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] font-display">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-xl bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest transition-colors group-hover:bg-blue-600 group-hover:text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display tracking-tight leading-tight">
                      {post.title}
                    </h3>
                    <p className="mt-6 text-lg text-slate-500 line-clamp-3 font-medium leading-relaxed">
                      {post.excerpt}
                    </p>
                  </Link>
                </div>
                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-900 font-black uppercase tracking-[0.2em] font-display">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-white">
                      <User className="w-4 h-4 text-slate-500" />
                    </div>
                    {post.author}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 group/link font-display"
                  >
                    Read Protocol <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
