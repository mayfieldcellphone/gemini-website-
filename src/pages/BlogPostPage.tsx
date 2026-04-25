import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogs';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white min-h-screen pb-16 sm:pb-24">
      <Helmet>
        <title>{post.title} | Mayfield Phone Repair</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-blue-500/20 text-white border border-blue-400/30 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {post.author}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div 
          className="prose prose-lg prose-slate prose-a:text-blue-600 hover:prose-a:text-blue-500 mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to fix your device?</h3>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-lg text-slate-700 mb-2">Book a repair online or visit our store in Mayfield.</p>
              <p className="text-slate-500">Fast turnarounds and premium quality parts.</p>
            </div>
            <Link to="/#contact" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap transition-colors">
              Get an Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
