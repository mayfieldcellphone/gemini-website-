import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import { brands } from '../data/brands';
import { servicesData as services } from '../data/services';
import { blogPosts } from '../data/blogs';
import { suburbs, seoServices } from '../data/suburbs';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Globe, Smartphone, Settings } from 'lucide-react';

const HTMLSitemap = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sitemap | Mayfield Cell Phone Repairs Newcastle</title>
        <meta name="description" content="A complete directory of all repair services, brands, and local area pages for Mayfield Cell Phone Repairs." />
      </Helmet>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 font-display">
              Site <span className="text-blue-600">Map</span>
            </h1>
            <p className="text-slate-600 max-w-2xl font-medium">
              Explore our full directory of phone repair services, supported brands, and regional coverage across Newcastle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Main Pages */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <Globe className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase italic tracking-wider font-display">Main Pages</h2>
              </div>
              <ul className="space-y-3">
                <li><Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link></li>
                <li><Link to="/about-us" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog & News</Link></li>
                <li><Link to="/after-hours" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">After Hours Repair</Link></li>
                <li><Link to="/second-hand-phones" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Second Hand Phones</Link></li>
                <li><Link to="/accessories" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Accessories</Link></li>
                <li><Link to="/corporate-repairs" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Corporate Repairs</Link></li>
              </ul>
            </div>

            {/* Brands */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <Smartphone className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase italic tracking-wider font-display">Brands We Repair</h2>
              </div>
              <ul className="space-y-3">
                {brands.map(brand => (
                  <li key={brand.id}>
                    <Link to={`/brand/${brand.id}`} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                      {brand.name} Repairs
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <Settings className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase italic tracking-wider font-display">Our Services</h2>
              </div>
              <ul className="space-y-3">
                {services.map(service => (
                  <li key={service.id}>
                    <Link to={`/service/${service.id}`} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog Posts */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <FileText className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase italic tracking-wider font-display">Latest Articles</h2>
              </div>
              <ul className="space-y-3">
                {blogPosts.slice(0, 10).map(post => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors line-clamp-1">
                      {post.title}
                    </Link>
                  </li>
                ))}
                <li><Link to="/blog" className="text-blue-600 font-bold text-sm hover:underline">View All Articles...</Link></li>
              </ul>
            </div>
          </div>

          {/* Suburb Pages Section - Collapsible or Summarized */}
          <div className="mt-20 pt-20 border-t border-slate-200">
            <h2 className="text-2xl font-black uppercase italic tracking-wider font-display mb-8">Service Areas (Newcastle & Hunter)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {suburbs.map(suburb => (
                <Link 
                  key={suburb.id} 
                  to={`/phone-repair/${suburb.id}`}
                  className="text-slate-500 hover:text-blue-600 text-xs font-semibold transition-colors"
                >
                  {suburb.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HTMLSitemap;
