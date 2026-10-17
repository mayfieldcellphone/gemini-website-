import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Smartphone, Laptop, Gamepad2, Tablet, CheckCircle2, ChevronRight, User, Phone, Info, Watch, Search, ChevronLeft, Settings } from 'lucide-react';
import { sendSMSNotification } from '../lib/notifications';
import { brands } from '../data/brands';
import { servicesData } from '../data/services';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'Phone', label: 'Phone Repair', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'iPad', label: 'iPad / Tablet', icon: Tablet, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'MacBook Repair', label: 'Laptop / PC', icon: Laptop, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'Apple Watch', label: 'Smart Watch', icon: Watch, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'Console', label: 'Game Console', icon: Gamepad2, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'Other', label: 'Other Device', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50' }
];

const TIME_SLOTS = [
  'Walk-In ASAP', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isManualModel, setIsManualModel] = useState(false);
  const [customModel, setCustomModel] = useState('');
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    category: 'Phone',
    brand: '',
    model: '',
    service: '',
    date: todayStr,
    time: 'Walk-In ASAP',
    customerName: '',
    email: '',
    phone: '',
    details: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setError(null);
      setIsManualModel(false);
      setCustomModel('');
      setFormData({
        category: 'Phone',
        brand: '',
        model: '',
        service: '',
        date: todayStr,
        time: 'Walk-In ASAP',
        customerName: '',
        email: '',
        phone: '',
        details: ''
      });
    }, 500);
  };

  const availableModels = useMemo(() => {
    if (!formData.brand || !formData.category) return [];
    const brandData = brands.find(b => b.name === formData.brand);
    if (!brandData) return [];
    
    const categoryData = brandData.deviceCategories.find(c => 
      c.name.toLowerCase().includes(formData.category.toLowerCase()) || 
      formData.category.toLowerCase().includes(c.name.toLowerCase())
    );
    
    return categoryData ? categoryData.models : [];
  }, [formData.brand, formData.category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const [{ db, handleFirestoreError, OperationType }, { collection, addDoc, serverTimestamp }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/firestore')
      ]);

      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      setIsSuccess(true);
      
      sendSMSNotification('booking', formData).catch(err => {
        console.warn('Notification error:', err);
      });
    } catch (err) {
      console.error('Submit error:', err);
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(3, prev + 1));
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const renderStepIndicator = () => (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className={`h-1.5 rounded-full transition-all duration-300 ${
            step === i ? 'w-8 bg-blue-600' : 
            step > i ? 'w-4 bg-blue-200' : 'w-4 bg-slate-100'
          }`} 
        />
      ))}
      <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Step {step} of 3</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Fast Repair Booking &amp; Quote</h3>
                {renderStepIndicator()}
              </div>
              <button 
                onClick={handleClose}
                aria-label="Close booking modal"
                className="p-1.5 md:p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900 shadow-sm"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {isSuccess ? (
                <div className="py-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900">Booking Confirmed!</h4>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Thanks <span className="text-slate-950 font-bold">{formData.customerName}</span>! Your {formData.brand} {formData.model} ({formData.service || 'Repair'}) is logged for:
                    </p>
                    <div className="flex items-center justify-center gap-4 text-blue-600 font-black uppercase tracking-widest text-xs py-2 bg-white rounded-xl shadow-sm border border-blue-50">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {formData.date}</span>
                      <span className="h-4 w-[1px] bg-blue-100" />
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> {formData.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 italic">We will call or text you at {formData.phone} shortly.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleClose}
                      className="w-full px-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition shadow-xl"
                    >
                      Done
                    </button>
                    <a 
                      href={`sms:0431618100?body=Hi, I just booked a ${formData.brand} ${formData.model} repair for ${formData.date} (${formData.time}). My name is ${formData.customerName}.`}
                      className="w-full px-8 py-5 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4"/> Send SMS Backup
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Device Category, Brand & Model */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">1. Device Type</label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, category: cat.id, model: '' })}
                              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 text-center ${
                                formData.category === cat.id
                                  ? 'border-blue-600 bg-blue-50/60 shadow-sm'
                                  : 'border-slate-100 hover:border-blue-200 bg-white'
                              }`}
                            >
                              <cat.icon className={`w-5 h-5 ${cat.color}`} />
                              <span className="font-bold text-slate-900 text-[11px] leading-tight">
                                {cat.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">2. Choose Brand</label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {brands.map(brand => (
                            <button
                              key={brand.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, brand: brand.name, model: '' })}
                              className={`py-3 px-2 rounded-2xl border-2 font-bold text-sm transition-all ${
                                formData.brand === brand.name
                                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                                  : 'border-slate-100 hover:border-slate-200 text-slate-600'
                              }`}
                            >
                              {brand.name}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, brand: 'Other', model: '' })}
                            className={`py-3 px-2 rounded-2xl border-2 font-bold text-sm transition-all ${
                              formData.brand === 'Other'
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-slate-100 hover:border-slate-200 text-slate-600'
                            }`}
                          >
                            Other
                          </button>
                        </div>
                      </div>

                      {formData.brand && formData.brand !== 'Other' && (
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">3. Select Model (Optional)</label>
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                            {availableModels.length > 0 ? (
                              <>
                                {availableModels.map(model => (
                                  <button
                                    key={model}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, model });
                                      setIsManualModel(false);
                                      nextStep();
                                    }}
                                    className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                                      formData.model === model && !isManualModel
                                        ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                                        : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-200'
                                    }`}
                                  >
                                    {model}
                                  </button>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsManualModel(true);
                                    setFormData({ ...formData, model: '' });
                                  }}
                                  className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                                    isManualModel
                                      ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                                      : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-200'
                                  }`}
                                >
                                  Other / Not Listed
                                </button>
                                
                                {isManualModel && (
                                  <div className="col-span-2 pt-1">
                                    <input
                                      type="text"
                                      placeholder="Type your model (e.g. iPhone 15 Pro)"
                                      value={customModel}
                                      onChange={(e) => {
                                        setCustomModel(e.target.value);
                                        setFormData({ ...formData, model: e.target.value });
                                      }}
                                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900 text-sm"
                                      autoFocus
                                    />
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="col-span-2">
                                <input
                                  type="text"
                                  placeholder="Enter your model (e.g. Pixel 9 Pro)"
                                  value={formData.model}
                                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900 text-sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.brand === 'Other' && (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">Device Details</label>
                          <input
                            type="text"
                            placeholder="e.g. Nintendo Switch OLED"
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Service / Issue */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="text-center space-y-1 mb-4">
                        <h4 className="text-xl font-black text-slate-900">What&apos;s the issue?</h4>
                        <p className="text-slate-500 text-sm font-medium">Tap an issue to continue</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {servicesData.slice(0, 10).map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, service: service.title });
                              nextStep();
                            }}
                            className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-left ${
                              formData.service === service.title
                                ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                : 'border-slate-100 bg-white hover:border-blue-200'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 ${formData.service === service.title ? 'bg-blue-600 text-white' : ''}`}>
                              <service.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-slate-900 text-sm block truncate">{service.title}</span>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate">{service.features[0]}</p>
                            </div>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, service: 'Other / Diagnostic' });
                            nextStep();
                          }}
                          className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-left sm:col-span-2 ${
                            formData.service === 'Other / Diagnostic'
                              ? 'border-blue-600 bg-blue-50/50'
                              : 'border-slate-100 bg-white hover:border-blue-200'
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl bg-slate-100 text-slate-600 ${formData.service === 'Other / Diagnostic' ? 'bg-blue-600 text-white' : ''}`}>
                            <Search className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-slate-900 text-sm">Other / Not Sure (Free Diagnostic Check)</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Details & Optional Preferred Time */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <User className="w-3 h-3 text-blue-600" /> Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all font-bold text-slate-900 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <Phone className="w-3 h-3 text-blue-600" /> Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0400 000 000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all font-bold text-slate-900 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <Calendar className="w-3 h-3 text-blue-600" /> Preferred Day
                          </label>
                          <input
                            type="date"
                            min={todayStr}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold text-slate-900 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <Clock className="w-3 h-3 text-blue-600" /> Preferred Time
                          </label>
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold text-slate-900 text-sm"
                          >
                            {TIME_SLOTS.map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          <Info className="w-3 h-3 text-blue-600" /> Notes (Optional)
                        </label>
                        <textarea
                          placeholder="e.g. Cracked front glass, need price quote or part held..."
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900 text-sm"
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                          <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-rose-900">Submission Failed</p>
                            <p className="text-xs text-rose-600 font-medium leading-relaxed">{error}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3.5 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button
                        type="button"
                        disabled={(step === 1 && !formData.brand) || (step === 2 && !formData.service)}
                        onClick={nextStep}
                        className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition shadow-xl disabled:opacity-20 flex items-center gap-2"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.customerName || !formData.phone}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Confirming...' : 'Get Instant Quote & Book'}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


