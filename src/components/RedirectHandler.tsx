import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { blogPosts } from '../data/blogs';

export default function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/+$/, ''); // lowercase and remove trailing slashes
    const search = location.search;

    const redirects: Record<string, string> = {
      // 1. Core Services URL mappings
      '/screen-repair': '/service/screen-repair',
      '/charging-port-repair': '/service/charging-port-repair',
      '/battery-replacement': '/service/battery-replacement',
      '/back-glass-replacement': '/service/back-glass-repair',
      '/laptop-macbook-repair': '/service/laptop-repair',
      '/laptop-repair': '/service/laptop-repair',
      '/tablet-repair': '/service/laptop-repair',
      '/smartwatch-repair': '/',
      '/single-service': '/',
      '/apple-repair/macbook-repair': '/service/laptop-repair',
      
      // 2. Services subfolder mappings
      '/services/charging-port-repair-mayfield': '/service/charging-port-repair',
      '/services/phone-battery-replacement-mayfield': '/service/battery-replacement',
      '/services/water-damage-repair-mayfield': '/service/water-damage',
      '/services/samsung-screen-repair-mayfield': '/service/screen-repair',
      '/services': '/',
      
      // 3. Brand mappings
      '/apple-repair': '/brand/apple',
      '/samsung-repair': '/brand/samsung',
      '/realme-repair': '/brand/realme',
      '/huawei-repair': '/brand/huawei',
      '/oppo-repair': '/brand/oppo',
      '/xiaomi-repair': '/brand/xiaomi',
      '/nokia-repair': '/brand/nokia',
      '/vivo-repair': '/brand/vivo',
      '/other-brands': '/',
      '/moto-repair': '/',

      // 4. Suburbs mappings
      '/hamilton-north-phone-repair': '/phone-repair/hamilton',
      '/tighes-hill-phone-repair': '/phone-repair/tighes-hill',
      '/broadmeadow-phone-repair': '/phone-repair/broadmeadow',
      '/new-lambton-phone-repair': '/phone-repair/new-lambton',
      '/georgetown-phone-repair': '/phone-repair/georgetown',

      // 5. Utility mappings
      '/privacy-policy': '/privacy-policy',
      '/contact-us': '/quote',
      '/faq': '/',
      '/shop-accessories': '/accessories',
      '/corporate-repairs': '/corporate-repairs',
      
      // 6. Blog and tags/categories
      '/blog': '/blog',
      '/post-archive': '/blog',
      '/events': '/',
      '/a-new-start': '/blog',
      
      // 7. Sitemap XML mappings (Redirect XML crawls dynamically to sitemap route)
      '/sitemap.xml': '/sitemap',
      '/sitemap-categories.xml': '/sitemap',
      '/sitemap-posts.xml': '/sitemap',
      '/sitemap-home.xml': '/sitemap',
      '/sitemap-tags.xml': '/sitemap',
      '/sitemap-pages.xml': '/sitemap',

      // 8. Legacy long-tail blog posts
      '/cracked-iphone-screen-7-shocking-truths-about-local-screen-replacement-you-must-know-before-spending-a-penny': '/blog/iphone-screen-repair-cost-guide-2026',
      '/mobile-phone-repair-decoded-the-ultimate-expert-guide-to-saving-your-device-and-your-wallet': '/blog/repair-vs-replace-phone-guide-2026',
      '/the-complete-guide-to-iphone-back-glass': '/blog/iphone-screen-repair-cost-guide-2026',
      '/affordable-iphone-screen-fix-the-best-budget-friendly-repair-solutions-by-mayfield-cell-phone-repairs': '/blog/cheap-iphone-screen-repair-near-me',
      '/7-transformative-ways-tablets-are-revolutionizing-your-digital-lifestyle-in-2024': '/blog/macbook-repair-mayfield-newcastle',
      '/get-fast-reliable-local-phone-repair-services-near-you-fixed-today': '/blog/phone-repair-near-me-mayfield-newcastle',
      '/same-day-service-for-iphone-screen-fixed-near-me-quick-and-affordable-repairs': '/blog/iphone-screen-repair-cost-guide-2026',
      '/understanding-the-cost-to-repair-iphone-screen-tips-to-save-money': '/blog/iphone-screen-repair-cost-guide-2026',
    };

    // Exact redirects match
    if (redirects[path]) {
      navigate(redirects[path], { replace: true });
      return;
    }

    // Authors or admin pages category/tag -> Blog
    if (path.startsWith('/author/') || path.startsWith('/category/') || path.startsWith('/tag/') || path.includes('/feed')) {
      navigate('/blog', { replace: true });
      return;
    }

    // Legacy blog posts subdirectory mapping
    if (path.startsWith('/blog/')) {
      const blogSlug = path.replace('/blog/', '');
      const blogRedirects: Record<string, string> = {
        'maximize-battery-health': 'iphone-battery-drain-causes-fixes',
        'dropped-phone-in-water-what-to-do': 'phone-water-damage-emergency-guide',
        'water-damaged-phone-first-aid': 'phone-water-damage-emergency-guide',
        'water-damage-phone-repair-guide': 'phone-water-damage-emergency-guide',
        'iphone-screen-repair-comprehensive-guide': 'iphone-screen-repair-cost-guide-2026',
        'iphone-screen-repair-guide': 'iphone-screen-repair-cost-guide-2026',
        'phone-charging-port-repair-guide': 'phone-repair-near-me-mayfield-newcastle',
      };
      if (blogRedirects[blogSlug]) {
        navigate(`/blog/${blogRedirects[blogSlug]}`, { replace: true });
      } else {
        const isRealPost = blogPosts.some(p => p.slug === blogSlug);
        if (!isRealPost) {
          navigate('/blog', { replace: true });
        }
      }
      return;
    }

    // Contact with params maps to booking/quote page
    if (path === '/contact') {
      navigate('/quote', { replace: true });
      return;
    }

    // Special Elementor / search parameter maps -> Home
    const urlParams = new URLSearchParams(search);
    if (urlParams.has('elementor_library') || urlParams.has('s')) {
      navigate('/', { replace: true });
      return;
    }

  }, [location, navigate]);

  return null;
}
