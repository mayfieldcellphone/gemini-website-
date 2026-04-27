import { 
  Smartphone, 
  Phone, 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ArrowRight,
  ArrowUpRight,
  Mic,
  Laptop,
  Tablet,
  Watch,
  Gamepad2,
  Settings,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { suburbs, seoServices } from '../data/suburbs';
import ChatWidget from './ChatWidget';
import BookingModal from './BookingModal';
import { useUI } from '../contexts/UIContext';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isBookingModalOpen, openBooking, closeBooking } = useUI();
  const [isSeoDirOpen, setIsSeoDirOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
    setActiveDropdown(null);
  }, [pathname, hash]);

  const closeMenu = () => setIsMenuOpen(false);

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
      icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.25-.12 2.52-.61 3.69-.73 1.75-2.22 3.16-4.04 3.73-1.89.58-4.03.49-5.83-.41-1.65-.83-2.92-2.3-3.41-4.07-.46-1.64-.32-3.46.36-5.01.69-1.55 2.05-2.74 3.66-3.23 1.56-.47 3.29-.36 4.79.24V14.1c-1.08-.24-2.24-.1-3.21.36-.88.42-1.57 1.17-1.86 2.09-.28.91-.21 1.94.19 2.8.44.95 1.34 1.66 2.35 1.92s2.17.06 3.06-.35c1.03-.48 1.77-1.42 2.06-2.52.17-.67.24-1.37.24-2.06V.02z"/></svg> 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col scroll-smooth">
      <Helmet>
        <link rel="canonical" href={`https://mayfieldphonerepair.com.au${pathname === '/' ? '' : pathname}`} />
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

      {/* Mobile Menu (Drawer/Slide down) */}
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

      <ChatWidget onOpenBooking={openBooking} />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBooking} />

      {/* COMPREHENSIVE DARK FOOTER */}
      <footer className="bg-[#0e0e0d] pt-32 pb-12 px-6 md:px-12 text-slate-400 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 select-none pointer-events-none w-full">
           <h2 className="text-[12vw] font-black text-white/[0.03] leading-none text-center font-display tracking-tighter uppercase whitespace-nowrap">MAYFIELD.</h2>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-8">
              <div className="flex flex-col -space-y-1">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900">
                     <Smartphone className="w-6 h-6" />
                   </div>
                   <div className="flex flex-col -space-y-1">
                    <span className="text-2xl font-black tracking-tighter text-white">MAYFIELD</span>
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/50">PHONE REPAIR</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed max-w-xs font-medium">
                  Locally owned repair shop on Maitland Rd. Same-day iPhone, Samsung, iPad & MacBook repairs with a 12-month warranty.
                </p>
                <div className="flex gap-4 pt-6">
                  {['IG', 'FB', 'GM', 'YT'].map(social => (
                    <a key={social} href="#" className="text-[10px] font-black tracking-widest hover:text-white transition-colors">{social}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">REPAIRS</h4>
              <ul className="text-sm font-medium space-y-3">
                <li><Link to="/service/screen-repair" className="hover:text-white transition-colors">Screen repair</Link></li>
                <li><Link to="/service/battery-replacement" className="hover:text-white transition-colors">Battery replacement</Link></li>
                <li><Link to="/service/charging-port" className="hover:text-white transition-colors">Charging port</Link></li>
                <li><Link to="/service/water-damage" className="hover:text-white transition-colors">Water damage</Link></li>
                <li><Link to="/service/back-glass" className="hover:text-white transition-colors">Back glass</Link></li>
                <li><Link to="/service/camera-repair" className="hover:text-white transition-colors">Camera</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">DEVICES</h4>
              <ul className="text-sm font-medium space-y-3">
                <li><Link to="/brand/apple" className="hover:text-white transition-colors">iPhone</Link></li>
                <li><Link to="/brand/samsung" className="hover:text-white transition-colors">Samsung</Link></li>
                <li><Link to="/brand/google" className="hover:text-white transition-colors">Google Pixel</Link></li>
                <li><Link to="/brand/apple" className="hover:text-white transition-colors">iPad</Link></li>
                <li><Link to="/service/macbook" className="hover:text-white transition-colors">MacBook</Link></li>
                <li><Link to="/service/laptop" className="hover:text-white transition-colors">Laptops</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">SHOP</h4>
              <ul className="text-sm font-medium space-y-3">
                <li><Link to="/accessories" className="hover:text-white transition-colors">Phone accessories</Link></li>
                <li><Link to="/second-hand-phones" className="hover:text-white transition-colors">Second-hand phones</Link></li>
                <li><Link to="/accessories" className="hover:text-white transition-colors">Screen protectors</Link></li>
                <li><Link to="/accessories" className="hover:text-white transition-colors">Cases</Link></li>
                <li><Link to="/second-hand-phones" className="hover:text-white transition-colors">Trade-in</Link></li>
                <li><Link to="/corporate-repairs" className="hover:text-white transition-colors">Bulk orders</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">MAYFIELD</h4>
              <ul className="text-sm font-medium space-y-3">
                <li><Link to="/about-us" className="hover:text-white transition-colors">About us</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Suburbs we serve</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Reviews</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">SMART</h4>
              <ul className="text-sm font-medium space-y-3">
                <li><button className="hover:text-white transition-colors text-left">Voice check-in</button></li>
                <li><button className="hover:text-white transition-colors text-left">Web chat</button></li>
                <li><button onClick={openBooking} className="hover:text-white transition-colors text-left">Instant quote</button></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Track repair</Link></li>
                <li><button className="hover:text-white transition-colors text-left">SMS updates</button></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Customer portal</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-[2rem] overflow-hidden mb-24">
             <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/[0.02] transition-colors">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 block mb-4">VISIT</span>
               <h5 className="text-xl font-black text-white font-display mb-1">276 Maitland Rd</h5>
               <p className="text-sm font-medium text-slate-500">Mayfield NSW 2304</p>
             </div>
             <div className="p-8 border-b md:border-b-0 lg:border-r border-white/10 group hover:bg-white/[0.02] transition-colors">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 block mb-4">CALL</span>
               <a href="tel:0240491735" className="text-xl font-black text-white font-display mb-1 block">02 4049 1735</a>
               <p className="text-sm font-medium text-slate-500">Mon–Sun, business hrs</p>
             </div>
             <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/[0.02] transition-colors">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 block mb-4">EMAIL</span>
               <a href="mailto:mayfieldphonerepair@gmail.com" className="text-xl font-black text-white font-display mb-1 block overflow-hidden text-ellipsis">mayfieldphonerepair</a>
               <p className="text-sm font-medium text-slate-500">@gmail.com</p>
             </div>
             <div className="p-8 group hover:bg-white/[0.02] transition-colors">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 block mb-4">SMS</span>
               <h5 className="text-xl font-black text-white font-display mb-1">0485 864 772</h5>
               <p className="text-sm font-medium text-slate-500">Text for fast quote</p>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 py-12 border-t border-white/10">
            <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <span>© {new Date().getFullYear()} Mayfield Phone Repair</span>
               <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
               <span>ABN 11 433 439 336</span>
               <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
               <span className="text-white/60 italic">All repairs backed by 12-mo warranty</span>
            </div>
            
            <div className="flex gap-8 text-[11px] font-bold text-slate-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Warranty</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
