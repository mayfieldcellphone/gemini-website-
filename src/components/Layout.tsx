import { Smartphone, Phone, Menu, X, Facebook, Instagram, Twitter, Linkedin, Youtube, MessageSquare, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { suburbs, seoServices } from '../data/suburbs';
import LazyChat from './LazyChat';
import LazyTawk from './LazyTawk';
import BookingModal from './BookingModal';
import VoiceAssistant from './VoiceAssistant';
import { useUI } from '../contexts/UIContext';

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/mayfieldcellphonerepairs', icon: <Facebook className="w-5 h-5" /> },
  { name: 'Instagram', url: 'https://www.instagram.com/mayfieldcellphonerepairs/', icon: <Instagram className="w-5 h-5" /> },
  { name: 'Twitter', url: 'https://twitter.com/Mayfiel32990272', icon: <Twitter className="w-5 h-5" /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/mayfield-cell-phone-repairs/', icon: <Linkedin className="w-5 h-5" /> },
  { name: 'YouTube', url: 'https://www.youtube.com/@mayfieldcellphonerepairs', icon: <Youtube className="w-5 h-5" /> },
  { 
    name: 'Pinterest', 
    url: 'https://www.pinterest.com/mayfieldcellphonerepairs0496', 
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg> 
  },
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com/@mayfield.cell.pho', 
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.25-.12 2.52-.61 3.69-.73 1.75-2.22 3.16-4.04 3.73-1.89.58-4.03.49-5.83-.41-1.65-.83-2.3-3.41-4.07-.46-1.64-.32-3.46.36-5.01.69-1.55 2.05-2.74 3.66-3.23 1.56-.47 3.29-.36 4.79.24V14.1c-1.08-.24-2.24-.1-3.21.36-.88.42-1.57 1.17-1.86 2.09-.28.91-.21 1.94.19 2.8.44.95 1.34 1.66 2.35 1.92s2.17.06 3.06-.35c1.03-.48 1.77-1.42 2.06-2.52.17-.67.24-1.37.24-2.06V.02z"/></svg> 
  }
];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isBookingModalOpen, openBooking, closeBooking } = useUI();
  const [isSeoDirOpen, setIsSeoDirOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on route change if no hash is present
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Use requestAnimationFrame for smoother performance on hash scroll
      requestAnimationFrame(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [pathname, hash]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col scroll-smooth">
      <Helmet>
        <link rel="canonical" href={`https://mayfieldphonerepair.com.au${pathname === '/' ? '' : pathname}`} />
        <meta property="og:url" content="https://mayfieldphonerepair.com.au" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="mayfieldphonerepair.com.au" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Mayfield Cell Phone Repairs",
            "image": "https://mayfieldphonerepair.com.au/logo.png",
            "@id": "https://mayfieldphonerepair.com.au",
            "url": "https://mayfieldphonerepair.com.au",
            "telephone": "02 4049 1735",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "276 Maitland Rd",
              "addressLocality": "Mayfield",
              "addressRegion": "NSW",
              "postalCode": "2304",
              "addressCountry": "AU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -32.8988,
              "longitude": 151.7345
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:30"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "15:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/mayfieldcellphonerepairs/",
              "https://www.instagram.com/mayfieldcellphonerepairs/",
              "https://www.pinterest.com/mayfieldcellphonerepairs0496"
            ]
          })}
        </script>
      </Helmet>
      {/* Top Utility Header */}
      <div className="bg-slate-900 text-slate-300 py-3 px-6 md:px-12 text-sm flex flex-col lg:flex-row justify-between items-center gap-3 relative z-50">
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2">
          <a 
            href="https://www.google.com/maps/search/?api=1&query=276+Maitland+Rd+Mayfield+NSW+2304" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <span>276 Maitland Rd, Mayfield, NSW, 2304</span>
          </a>
          <div className="hidden sm:block w-px h-4 bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Mon-Fri: 9am-5pm | Sat: 10am-4pm | Sun: 10am-2pm</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-semibold">
          <a href="tel:0240491735" className="flex items-center gap-1.5 hover:text-white transition">
            <Phone className="w-4 h-4 text-blue-400" />
            <span>02 4049 1735</span>
          </a>
          <div className="w-px h-4 bg-slate-700"></div>
          <a href="sms:0431618100" className="flex items-center gap-1.5 hover:text-white transition group">
            <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-400">Emergency SMS: 0431 618 100</span>
          </a>
          <div className="hidden xl:flex items-center gap-3 border-l border-slate-700 pl-6 ml-2">
            {socialLinks.slice(0, 4).map((link, idx) => {
               // Clone the icon to make it slightly smaller for the top bar
               const icon = { ...link.icon, props: { ...link.icon.props, className: 'w-4 h-4' } };
               return (
                 <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label={link.name}>
                   {icon}
                 </a>
               );
            })}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40 shadow-sm">
        <Link to="/" className="flex items-center shrink-0 group" onClick={closeMenu}>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-blue-600 flex items-center">
            Mayfield
            <div className="flex items-center justify-center mx-1.5 sm:mx-2 w-7 h-7 sm:w-8 sm:h-8 bg-slate-900 text-white rounded-[0.45rem] shadow-md group-hover:-rotate-6 transition-transform">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            Repair
          </span>
        </Link>
        
        {/* Desktop Nav Tabs */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 flex-1 justify-center ml-8 font-display">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/#brands" className="hover:text-blue-600 transition-colors">Brands</Link>
          <Link to="/#services" className="hover:text-blue-600 transition-colors">Services</Link>
          <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <Link to="/#why-us" className="hover:text-blue-600 transition-colors">Why Choose Us</Link>
          <Link to="/#contact" className="hover:text-blue-600 transition-colors">Location</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <button 
            onClick={openBooking}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition shadow-xl shadow-slate-200 font-black uppercase tracking-widest text-[10px] font-display"
          >
            Book a Repair
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden sticky top-20 z-30 shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link to="/" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Home</Link>
              <Link to="/#brands" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Brands</Link>
              <Link to="/#services" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Services</Link>
              <Link to="/blog" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Blog</Link>
              <Link to="/#why-us" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Why Choose Us</Link>
              <Link to="/#contact" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Location & Contact</Link>
              <div className="pt-6 mt-2 border-t border-slate-100 flex flex-col space-y-4">
                <Link to="/second-hand-phones" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Shop Phones</Link>
                <Link to="/accessories" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Accessories</Link>
                <Link to="/corporate-repairs" onClick={closeMenu} className="text-slate-800 font-bold hover:text-blue-600 text-lg">Corporate Repairs</Link>
              </div>
              <div className="pt-6 mt-2 border-t border-slate-100 flex flex-col space-y-4">
                <a href="tel:0240491735" className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 py-3 rounded-xl font-bold">
                  <Phone className="w-5 h-5" />
                  <span>Call: 02 4049 1735</span>
                </a>
                <button 
                  onClick={() => { openBooking(); closeMenu(); }}
                  className="bg-blue-600 text-white text-center px-5 py-3 rounded-xl font-bold shadow-lg shadow-blue-200"
                >
                  Book Online Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <LazyChat onOpenBooking={openBooking} />
      <LazyTawk />
      <VoiceAssistant />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBooking} />

      {/* Modern Footer */}
      <footer className="bg-slate-950 pt-32 pb-12 px-6 md:px-12 text-slate-500 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 mb-24 relative z-10">
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="inline-flex items-center group">
              <span className="text-2xl font-black tracking-tight text-white flex items-center font-display">
                Mayfield
                <div className="flex items-center justify-center mx-3 w-9 h-9 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 group-hover:-rotate-6 transition-transform">
                  <Smartphone className="w-5 h-5" strokeWidth={3} />
                </div>
                Repair
              </span>
            </Link>
            <p className="text-lg leading-relaxed text-slate-400 font-medium max-w-sm">
              The premier destination for certified mobile diagnostics and precision hardware restoration in Mayfield.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm hover:shadow-blue-600/20 hover:-translate-y-1"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid sm:grid-cols-4 gap-12">
             <div className="space-y-8">
               <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] font-display">Service Areas</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li><Link to="/phone-repair/newcastle" className="hover:text-blue-400 transition-colors">Newcastle</Link></li>
                 <li><Link to="/phone-repair/mayfield" className="hover:text-blue-400 transition-colors">Mayfield</Link></li>
                 <li><Link to="/phone-repair/waratah" className="hover:text-blue-400 transition-colors">Waratah</Link></li>
                 <li><Link to="/phone-repair/hamilton" className="hover:text-blue-400 transition-colors">Hamilton</Link></li>
                 <li><Link to="/phone-repair/wallsend" className="hover:text-blue-400 transition-colors">Wallsend</Link></li>
                 <li><Link to="/phone-repair/jesmond" className="hover:text-blue-400 transition-colors">Jesmond</Link></li>
               </ul>
             </div>
             <div className="space-y-8">
               <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] font-display">Specialist Pages</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li><Link to="/second-hand-phones" className="hover:text-blue-400 transition-colors">Buy Refurbished</Link></li>
                 <li><Link to="/accessories" className="hover:text-blue-400 transition-colors">Accessories</Link></li>
                 <li><Link to="/corporate-repairs" className="hover:text-blue-400 transition-colors">B2B Repairs</Link></li>
                 <li><Link to="/after-hours" className="hover:text-emerald-400 transition-colors font-bold">After Hours</Link></li>
                 <li><Link to="/#services" className="hover:text-blue-400 transition-colors">All Services</Link></li>
               </ul>
             </div>
             <div className="space-y-8">
               <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] font-display">Quick Links</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                 <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Repair Blog</Link></li>
                 <li className="hidden md:block"><Link to="/about-us" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                 <li><Link to="/#contact" className="hover:text-blue-400 transition-colors">Location</Link></li>
                 <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
               </ul>
             </div>
             <div className="space-y-8">
               <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] font-display">Contact Us</h4>
               <div className="space-y-4">
                 <a href="tel:0240491735" className="block text-xl font-bold text-white hover:text-blue-400 transition-colors font-display">02 4049 1735</a>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">Free advice & quotes.</p>
               </div>
             </div>
          </div>
        </div>

        {/* SEO Local Suburbs Mega Footer (Expandable) */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 mb-12 hidden md:block relative z-10">
           <button 
             onClick={() => setIsSeoDirOpen(!isSeoDirOpen)}
             className="flex items-center text-[10px] text-slate-600 uppercase tracking-[0.5em] font-black hover:text-blue-400 transition-colors w-full text-left focus:outline-none"
             aria-expanded={isSeoDirOpen}
           >
             Local Areas We Serve
             <svg 
               className={`w-4 h-4 ml-3 transform transition-transform duration-500 ${isSeoDirOpen ? 'rotate-180 text-blue-500' : ''}`} 
               fill="none" viewBox="0 0 24 24" stroke="currentColor"
             >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
             </svg>
           </button>
           
           <AnimatePresence>
             {isSeoDirOpen && (
               <motion.div 
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.5, ease: "circOut" }}
                 className="overflow-hidden"
               >
                 <div className="text-[10px] text-slate-600 leading-[2] text-justify opacity-40 hover:opacity-100 transition-all duration-500 pt-8 font-medium">
                   {suburbs.map((suburb, i) => (
                      <span key={suburb.id} className="inline-block">
                        {seoServices.map((service, j) => (
                          <span key={`${suburb.id}-${service.id}`}>
                            <Link to={`/${service.id}/${suburb.id}`} className="hover:text-blue-400 transition-colors">
                              {service.name} {suburb.name}
                            </Link>
                            {/* Add comma unless it's the very last item in both arrays */}
                            {!(i === suburbs.length - 1 && j === seoServices.length - 1) && <span className="mx-2 text-slate-800">/</span>}
                          </span>
                        ))}
                      </span>
                   ))}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] gap-8 border-t border-white/5 pt-12 opacity-30">
          <div>&copy; {new Date().getFullYear()} MAYFIELD PHONE REPAIR.</div>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms</Link>
            <Link to="/admin" className="text-slate-500 hover:text-blue-500 transition-colors border-l border-white/5 pl-8">Staff Portal</Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/5 opacity-40">
          <div className="flex flex-col gap-6 text-[9px] leading-relaxed text-slate-600 font-display font-black uppercase tracking-[0.2em] text-center md:text-left">
            <p>
              Aussibk with ABN 11433439336 trading as Mayfield Phone Repair.
            </p>
            <p className="max-w-4xl normal-case tracking-normal font-medium text-slate-700 italic">
              Mayfield Phone Repair is an independent repair service provider and is not affiliated with Apple Inc., Samsung Electronics, or any other original equipment manufacturer (OEM). All trademarks are the property of their respective owners. We use high-quality replacement parts for all repairs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
