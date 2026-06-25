import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Watch, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Check, 
  CalendarDays,
  Menu,
  Droplet,
  Camera,
  Layers,
  Wrench
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendSMSNotification } from '../lib/notifications';

// Meta Pixel tracking utility
const fireMetaPixelEvent = (eventName: string, pixelId?: string) => {
  if (!pixelId) return;
  
  // Try to fire if fbq exists
  // @ts-ignore
  if (window.fbq) {
    // @ts-ignore
    window.fbq('track', eventName);
  } else {
    console.log(`[Meta Pixel Log] Event tracked: ${eventName} (Pixel ID: ${pixelId})`);
  }
};

export default function FreeQuotePage() {
  // Configuration (Editable)
  const [pixelId, setPixelId] = useState(''); // Place your Meta Pixel ID here if desired
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    issue: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  // Initialize and track PageView for Meta Pixel
  useEffect(() => {
    if (pixelId) {
      // @ts-ignore
      if (!window.fbq) {
        // Load Meta Pixel code dynamically
        // @ts-ignore
        !(function (f, b, e, v, n, t, s) {
          // @ts-ignore
          if (f.fbq) return;
          // @ts-ignore
          n = f.fbq = function () {
            // @ts-ignore
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          // @ts-ignore
          if (!f._fbq) f._fbq = n;
          // @ts-ignore
          n.push = n;
          // @ts-ignore
          n.loaded = !0;
          // @ts-ignore
          n.version = "2.0";
          // @ts-ignore
          n.queue = [];
          t = b.createElement(e);
          // @ts-ignore
          t.async = !0;
          // @ts-ignore
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          // @ts-ignore
          s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        
        // @ts-ignore
        window.fbq("init", pixelId);
      }
      
      // @ts-ignore
      window.fbq("track", "PageView");
    }
  }, [pixelId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please fill in your name and mobile phone number.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Prepare standard schema for bookings collection to show in Admin
    const bookingPayload = {
      category: formData.device || 'Phone',
      brand: formData.device || 'Other',
      model: formData.device !== 'Other' ? formData.device : 'Customer Specified',
      service: formData.issue || 'Diagnostic',
      date: 'Today (ASAP)',
      time: 'Immediate Priority',
      customerName: formData.name.trim(),
      email: '', // Not requested in Facebook Lead form to maximize conversions
      phone: formData.phone.trim(),
      details: `[Facebook Ad Lead] Problem: ${formData.issue || 'Not Specified'}. Notes: ${formData.notes || 'None'}`,
    };

    try {
      console.log('Saving Facebook Ad lead to Firestore:', bookingPayload);
      await addDoc(collection(db, 'bookings'), {
        ...bookingPayload,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('Saved to Firestore successfully. Sending priority SMS notifications...');
      setIsSuccess(true);
      
      // Send urgent notification
      sendSMSNotification('booking', bookingPayload).catch(err => {
        console.warn('Notification failure:', err);
      });

      // Track Meta Pixel Lead Conversion
      fireMetaPixelEvent('Lead', pixelId);
    } catch (err) {
      console.error('Lead save error:', err);
      setError('Something went wrong. Please check your network and try again.');
      handleFirestoreError(err, OperationType.CREATE, 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#0d1b2a] font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-[#0d1b2a] text-[#cdd6e8] text-xs py-2 px-4 font-semibold text-center overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex gap-4 items-center justify-center">
          <span>⭐ <b className="text-white">4.7/5</b> from <b className="text-white">363+</b> Google Reviews</span>
          <span>•</span>
          <span><b className="text-white">90-Day</b> Warranty on Repairs</span>
          <span>•</span>
          <span>📍 276 Maitland Rd, Mayfield NSW</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-white to-[#f6f7fb] pt-12 pb-16 overflow-hidden md:py-24">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#0d1b2a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Pitch Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg leading-tight tracking-tight text-slate-900 font-display">Mayfield Phone Repair</h2>
                <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Newcastle&apos;s Trusted Diagnostic Lab</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Instant Price Guarantees &middot; Fully Local
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-slate-900 tracking-tight leading-none">
              Cracked, dead or water-damaged? <span className="text-blue-600 block">We&apos;ll fix it today.</span>
            </h1>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl">
              Most screens and batteries are repaired on-site at Maitland Rd in under 30 minutes. Tell us your device below and get an instant fixed-price quote with zero obligation.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-lg">
              <span className="text-amber-500 text-lg font-bold">★★★★★</span>
              <span className="text-sm font-semibold text-slate-800">
                Rated 4.7 &middot; Based on 363+ local Google Reviews
              </span>
            </div>

            {/* Micro Ticks */}
            <div className="grid grid-cols-2 gap-4 max-w-lg pt-2 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Same-day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>90-Day Priority Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>OEM-Spec Screen Assemblies</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>No Fix, No Fee Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form Column */}
          <div className="lg:col-span-5" id="quoteCard">
            <div className="bg-white border border-slate-250/60 rounded-[2.5rem] shadow-xl p-8 relative">
              
              {/* Highlight Badge */}
              <div className="absolute -top-3.5 left-8 bg-[#ff7a18] text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/20">
                100% Free Instant Quote
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="lead-form"
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="pt-2">
                      <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight">Get your repair quote</h3>
                      <p className="text-slate-500 text-sm">Fill in details and our Mayfield team will call or text you with a fixed price.</p>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm font-semibold rounded-xl">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1.5">Your Name</label>
                        <input 
                          id="name"
                          type="text" 
                          placeholder="e.g. Alex"
                          required
                          className="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>

                      {/* Mobile */}
                      <div>
                        <label htmlFor="phone" className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1.5">Mobile Phone Number</label>
                        <input 
                          id="phone"
                          type="tel" 
                          placeholder="e.g. 04xx xxx xxx"
                          required
                          className="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>

                      {/* Split Dropdowns */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="device" className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1.5">Device Type</label>
                          <select 
                            id="device"
                            className="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                            value={formData.device}
                            onChange={(e) => setFormData({...formData, device: e.target.value})}
                          >
                            <option value="">Select...</option>
                            <option value="iPhone">iPhone</option>
                            <option value="Samsung Galaxy">Samsung Galaxy</option>
                            <option value="Google Pixel">Google Pixel</option>
                            <option value="iPad / Tablet">iPad / Tablet</option>
                            <option value="MacBook / Laptop">MacBook / Laptop</option>
                            <option value="Other">Other Device</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="issue" className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1.5">Primary Problem</label>
                          <select 
                            id="issue"
                            className="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                            value={formData.issue}
                            onChange={(e) => setFormData({...formData, issue: e.target.value})}
                          >
                            <option value="">Select...</option>
                            <option value="Cracked screen">Cracked Screen</option>
                            <option value="Battery replacement">Battery / Shutting down</option>
                            <option value="Water damage">Liquid / Water Damage</option>
                            <option value="Charging port">Charging Port Failing</option>
                            <option value="Camera">Blurry Lens / Camera Error</option>
                            <option value="Back glass">Shattered rear glass</option>
                            <option value="Other">Other / Not Sure</option>
                          </select>
                        </div>
                      </div>

                      {/* Optional Notes */}
                      <div>
                        <label htmlFor="notes" className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-1.5">Additional Details (Optional)</label>
                        <textarea 
                          id="notes"
                          rows={2}
                          placeholder="e.g. iPhone 17 screen flickering, or Samsung S26 glass cracked"
                          className="w-full px-4 py-3 bg-[#fbfcff] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#ff7a18] to-[#e8620a] hover:from-[#ff882b] hover:to-[#f06e14] text-white font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl shadow-lg shadow-amber-500/20 active:translate-y-[1px] disabled:opacity-50 transition-all cursor-pointer flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Saving Lead...</>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Get My Free Quote
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>We respect your privacy. No spam. Secure database.</span>
                    </div>

                    <div className="border-t border-slate-100 pt-3 text-center sm:text-left">
                      <p className="text-slate-500 text-xs">
                        Prefer direct contact? Call our shop on{' '}
                        <a href="tel:61240491735" className="text-blue-600 hover:underline font-extrabold">(02) 4049 1735</a>
                      </p>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className="text-center py-8 space-y-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight">Lead Secured!</h3>
                      <p className="text-slate-600 text-sm px-4">
                        Thank you, {formData.name}! Our senior repair technicians at Maitland Rd have received your file. We will compile your quote and reach out ASAP.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl mx-2 text-xs text-slate-500 text-left space-y-2">
                      <div><b>Priority Code:</b> <span className="font-mono text-blue-600 text-xs font-bold">MPR-FB-{Math.floor(1000 + Math.random() * 9000)}</span></div>
                      <div><b>Est. Response Time:</b> Today &middot; Under 15 Minutes</div>
                    </div>

                    <div className="px-2">
                      <a 
                        href="tel:61240491735" 
                        className="w-full bg-slate-900 hover:bg-slate-850 text-white font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
                      >
                        <Phone className="w-4 h-4 animate-bounce" />
                        Call Shop Priority Line
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </header>

      {/* Starting Prices section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-black font-display tracking-tight text-slate-900">Transparent Starting Prices</h2>
          <p className="text-slate-500 font-medium">Real, upfront pricing guidelines. Exactly what you pay depends on physical components and model generations.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { brand: 'Apple iPhone', screen: '$129', battery: '$89' },
            { brand: 'Samsung Galaxy', screen: '$149', battery: '$99' },
            { brand: 'Google Pixel', screen: '$139', battery: '$89' },
            { brand: 'Oppo Series', screen: '$119', battery: '$79' },
            { brand: 'Motorola Devices', screen: '$99', battery: '$69' },
            { brand: 'Huawei Series', screen: '$129', battery: '$79' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200/50 rounded-2xl p-5 text-center hover:shadow-lg hover:border-blue-300 transition-all">
              <span className="font-extrabold text-[#0d1b2a] text-sm block font-display tracking-tight mb-3">{item.brand}</span>
              <div className="space-y-2">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Screen From</div>
                  <div className="text-lg font-black text-blue-600 font-display">{item.screen}</div>
                </div>
                <div className="pt-2 border-t border-slate-50">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Battery From</div>
                  <div className="text-lg font-black text-[#ff7a18] font-display">{item.battery}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 font-medium mt-6">
          * Starting estimates only. Premium flagships like iPhone 17 Pro Max and Samsung S26 Ultra vary. Get custom fixed prices via the form above.
        </p>
        <p className="text-center text-xs text-slate-400 font-medium mt-2">
          Prices verified by <a href="https://repairrange.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 font-semibold hover:underline">RepairRange.io</a> — Australia's independent repair cost database
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-black font-display tracking-tight text-slate-900">What We Specialized In</h2>
            <p className="text-slate-500 font-medium">From simple screens to advanced precision logic board micro-soldering, our team does it on-site.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'OLED & Screen Repair', desc: 'Cracked, black, flickering, or line-streaked displays replaced in under 30 minutes with calibrated TrueTone restore.', icon: Smartphone },
              { title: 'Battery Replacements', desc: 'Dying battery? We install maximum health OEM-spec cells to restore lasting daily performance.', icon: Clock },
              { title: 'Water Damage Revives', desc: 'Dropped at Merewether or Nobby’s Beach? Immediate microscopic ultrasonic motherboard sanitization.', icon: Droplet },
              { title: 'NFC & Charging Ports', desc: 'Loose or corrupted USB-C & Lightning slots extracted, cleaned, or freshly micro-soldered.', icon: CableHelperIcon },
              { title: 'Camera & Optics Fix', desc: 'Shattered lens covers or vibrating Optical Stabilization sensors swapped with original assemblies.', icon: Camera },
              { title: 'Back Glass Lasers', desc: 'Professional CAD-driven coordinate lasers to securely clean and replace fractured rear plates.', icon: Layers },
              { title: 'Laptops & MacBooks', desc: 'Screen panels, liquid logic board reflows, SSD data rescues, and battery swaps handled safely.', icon: Laptop },
              { title: 'Advanced Solder Work', desc: 'Audio IC chips, loop loops, bypass resistors, and other hard technical board failures solved in-house.', icon: Wrench },
            ].map((srv, idx) => (
              <div key={idx} className="p-6 bg-[#fbfcff] border border-slate-100 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold shrink-0">
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2 font-display">{srv.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Opening Hours map */}
      <section className="py-16 bg-[#0d1b2a] text-[#cdd6e8]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black font-display tracking-tight text-white">Find Us in Mayfield Store</h2>
            <p className="text-slate-400">
              Walk directly into our workshop. No long queues, no bookings strictly required for priority drop-ins. Parking sits directly behind.
            </p>

            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff7a18] shrink-0 mt-0.5" />
                <div>
                  <b className="text-white">276 Maitland Rd</b>
                  <p className="text-slate-400 text-xs mt-0.5">Mayfield NSW 2304</p>
                  <a 
                    href="https://maps.google.com/?q=276+Maitland+Rd+Mayfield+NSW+2304" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#ff7a18] underline text-xs font-bold inline-block mt-1 transition-colors"
                  >
                    Get Coordinates & Directions &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#ff7a18] shrink-0 mt-0.5" />
                <div>
                  <b className="text-white">(02) 4049 1735</b>
                  <p className="text-slate-400 text-xs mt-0.5">After hours text support: 0431 618 100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
            <h3 className="font-extrabold font-display text-white text-lg tracking-tight">Opening Hours</h3>
            <div className="space-y-3 font-semibold text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2 text-slate-300">
                <span>Monday – Friday</span>
                <span className="text-white font-bold">9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2 text-slate-300">
                <span>Saturday</span>
                <span className="text-white font-bold">10:00 AM – 3:00 PM</span>
              </div>
              <div className="flex justify-between pb-1 text-slate-300">
                <span>Sunday</span>
                <span className="text-white font-bold">10:00 AM – 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        <p className="font-semibold">&copy; {currentYear} Mayfield Phone Repair &middot; 276 Maitland Rd, Mayfield NSW 2304</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#a1a1a1', textAlign: 'center' }}>
          Partnered with <a href="https://repairrange.io" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>RepairRange</a> for Australia-wide phone repair price guides.
        </p>
      </footer>

      {/* Sticky Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-lg flex gap-3 text-center">
        <a 
          href="#quoteCard"
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-950 font-black uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <CalendarDays className="w-4 h-4" />
          Free Quote
        </a>
        <a 
          href="tel:61240491735"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
        >
          <Phone className="w-4 h-4 animate-pulse" />
          Call Shop Now
        </a>
      </div>
    </div>
  );
}

// Temporary inline replacement for Cable icon
function CableHelperIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h16M2 14h20" />
      <rect x="6" y="8" width="4" height="8" rx="1" />
      <rect x="14" y="8" width="4" height="8" rx="1" />
    </svg>
  );
}
