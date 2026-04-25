import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogs';
import { ChevronRight, Calendar, User } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <Helmet>
        <title>Tech Repair Blog | Mayfield Phone Repair</title>
        <meta name="description" content="Read expert tips, device maintenance guides, and inside industry knowledge on phone, tablet, and laptop repairs from Mayfield Phone Repair." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Our Tech Repair Blog
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Expert insights, maintenance tips, and the latest news in device repair.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="relative flex flex-col items-start bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
              <Link to={`/blog/${post.slug}`} className="block w-full">
                <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 w-full">
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block mt-2">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-base text-slate-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read More <ChevronRight className="w-4 h-4" />
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
