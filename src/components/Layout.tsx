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

  const navigation = [
    { 
      name: 'Repairs', 
      href: '/#services',
      dropdown: {
        title: 'REPAIRS',
        subtitle: 'Most fixes walk out same-day.',
        sections: [
          {
            title: 'BY ISSUE',
            links: [
              { name: 'Screen repair', href: '/service/screen-repair' },
              { name: 'Battery replacement', href: '/service/battery-replacement' },
              { name: 'Charging port', href: '/service/charging-port' },
              { name: 'Water damage', href: '/service/water-damage' },
              { name: 'Back glass', href: '/service/back-glass' },
              { name: 'Camera repair', href: '/service/camera-repair' },
            ]
          },
          {
            title: 'BY DEVICE',
            links: [
              { name: 'iPhone', href: '/brand/apple' },
              { name: 'Samsung Galaxy', href: '/brand/samsung' },
              { name: 'Google Pixel', href: '/brand/google' },
              { name: 'iPad', href: '/brand/apple' },
              { name: 'MacBook', href: '/service/macbook' },
              { name: 'Laptops', href: '/service/laptop' },
            ]
          },
          {
            title: 'QUICK ACTIONS',
            links: [
              { name: 'Instant quote', href: '/#contact' },
              { name: 'Book appointment', href: '#', onClick: openBooking },
              { name: 'Track your repair', href: '/#contact' },
              { name: 'Start voice check-in', href: '#' },
              { name: 'Get SMS updates', href: '/#contact' },
              { name: 'Trade-in valuation', href: '/second-hand-phones' },
            ]
          }
        ],
        featured: {
          title: 'iPhone 15 screen · from $179',
          desc: 'OEM display, True-tone preserved, 45 min turnaround.',
          cta: 'Book now →',
          href: '#',
          onClick: openBooking
        }
      }
    },
    { 
      name: 'iPhone', 
      href: '/brand/apple',
      dropdown: {
        title: 'APPLE REPAIRS',
        subtitle: 'Specialized diagnostic center.',
        sections: [
          {
            title: 'MODELS',
            links: [
              { name: 'iPhone 15 Series', href: '/brand/apple' },
              { name: 'iPhone 14 Series', href: '/brand/apple' },
              { name: 'iPhone 13 Series', href: '/brand/apple' },
              { name: 'iPhone 12 Series', href: '/brand/apple' },
              { name: 'Legacy Models', href: '/brand/apple' },
            ]
          },
          {
            title: 'SERVICES',
            links: [
              { name: 'Screen Replacement', href: '/service/screen-repair' },
              { name: 'Battery Health fix', href: '/service/battery-replacement' },
              { name: 'Logic Board Repair', href: '/#contact' },
              { name: 'Data Recovery', href: '/service/data-recovery' },
            ]
          }
        ]
      }
    },
    { 
      name: 'Samsung', 
      href: '/brand/samsung',
      dropdown: {
        title: 'SAMSUNG CARE',
        subtitle: 'Certified part handling.',
        sections: [
          {
            title: 'MODELS',
            links: [
              { name: 'S24 / S23 Series', href: '/brand/samsung' },
              { name: 'S22 / S21 Series', href: '/brand/samsung' },
              { name: 'A-Series Models', href: '/brand/samsung' },
              { name: 'Tab Series', href: '/brand/samsung' },
            ]
          }
        ]
      }
    },
    { 
      name: 'iPad & Mac', 
      href: '/service/macbook',
      dropdown: {
        title: 'TABLETS & LAPTOPS',
        subtitle: 'Advanced hardware repair.',
        sections: [
          {
            title: 'DEVICES',
            links: [
              { name: 'iPad Pro / Air', href: '/brand/apple' },
              { name: 'MacBook Pro / Air', href: '/service/macbook' },
              { name: 'Surface Pro', href: '#' },
              { name: 'PC Laptops', href: '/service/laptop' },
            ]
          }
        ]
      }
    },
    { name: 'Shop', href: '/second-hand-phones' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about-us' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfc] font-sans text-slate-900 flex flex-col scroll-smooth">
      <Helmet>
        <link rel="canonical" href={`https://mayfieldphonerepair.com.au${pathname === '/' ? '' : pathname}`} />
      </Helmet>

      {/* Top Utility Header */}
      <div className="bg-[#0e0e0d] text-white py-2 px-6 md:px-12 text-[10px] font-black uppercase tracking-[0.2em] flex justify-between items-center relative z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>OPEN TODAY • 9:00 - 5:00</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-rose-500">SAME-DAY REPAIRS</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-white">12-MO WARRANTY</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="hidden lg:flex items-center gap-2 hover:text-blue-400 transition">
            <span>276 MAITLAND RD, MAYFIELD NSW</span>
          </a>
          <span className="hidden lg:block w-1 h-1 rounded-full bg-slate-700"></span>
          <a href="tel:0240491735" className="flex items-center gap-2 hover:text-blue-400 transition">
            <span>02 4049 1735</span>
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700"></span>
          <Link to="/#contact" className="hidden sm:flex items-center gap-1 hover:text-blue-400 transition">
            <span>TRACK REPAIR</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="h-20 bg-[#f8f7f3] border-b border-slate-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center shrink-0" onClick={closeMenu}>
            <div className="mr-3 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
              <Smartphone className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tighter text-blue-700 leading-none">MAYFIELD</span>
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-900 leading-none">PHONE REPAIR</span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={item.href} 
                  className={`text-[13px] font-bold flex items-center gap-1 transition-colors ${activeDropdown === item.name ? 'text-blue-600' : 'text-slate-800'}`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown / Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[800px]"
                    >
                      <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-10 overflow-hidden">
                        <div className="grid grid-cols-12 gap-12">
                          <div className="col-span-8 grid grid-cols-3 gap-8">
                            <div className="col-span-3 pb-6 border-b border-slate-50">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-2 block">▽ {item.dropdown.title}</span>
                              <h3 className="text-3xl font-black font-display tracking-tight text-slate-900">{item.dropdown.subtitle}</h3>
                            </div>
                            {item.dropdown.sections.map((section) => (
                              <div key={section.title} className="space-y-4">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{section.title}</h4>
                                <ul className="space-y-2.5">
                                  {section.links.map((link) => (
                                    <li key={link.name}>
                                      {link.onClick ? (
                                        <button onClick={link.onClick} className="text-[13px] font-bold text-slate-600 hover:text-blue-600 transition-colors text-left block w-full">{link.name}</button>
                                      ) : (
                                        <Link to={link.href} className="text-[13px] font-bold text-slate-600 hover:text-blue-600 transition-colors block">{link.name}</Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="col-span-4">
                            {item.dropdown.featured && (
                              <div className="bg-[#0e0e0d] p-8 rounded-3xl text-white h-full flex flex-col justify-between">
                                <div>
                                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-500 mb-2 block">FEATURED</span>
                                  <h4 className="text-xl font-bold mb-4 font-display leading-tight">{item.dropdown.featured.title}</h4>
                                  <p className="text-xs text-slate-400 leading-relaxed">{item.dropdown.featured.desc}</p>
                                </div>
                                <button 
                                  onClick={item.dropdown.featured.onClick}
                                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mt-8"
                                >
                                  {item.dropdown.featured.cta}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden xl:flex items-center gap-3 px-6 py-3 bg-[#f3f1eb] rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#eae7df] transition-colors group">
            <div className="w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-white relative">
              <Mic className="w-3 h-3" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#f3f1eb] animate-pulse"></span>
            </div>
            <span>Voice check-in</span>
          </button>
          
          <button 
            onClick={openBooking}
            className="bg-[#0e0e0d] text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-3 group shadow-xl shadow-slate-200"
          >
            <span className="text-[11px] font-black uppercase tracking-widest">Book repair</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Sliding) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#f8f7f3] z-[60] lg:hidden flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-black tracking-tighter text-blue-700">MAYFIELD</span>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-900">PHONE REPAIR</span>
              </div>
              <button onClick={closeMenu} className="p-2 bg-white rounded-full shadow-sm border border-slate-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} onClick={closeMenu} className="text-4xl font-black font-display tracking-tight text-slate-900 border-b border-slate-200 pb-4">
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-12">
              <button 
                onClick={() => { openBooking(); closeMenu(); }}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-100"
              >
                Book Repair Now
              </button>
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
