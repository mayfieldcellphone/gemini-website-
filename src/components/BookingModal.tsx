import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Smartphone, Laptop, Gamepad2, Tablet, CheckCircle2, ChevronRight, User, Phone, Mail, Info, Watch, Search, ChevronLeft, Settings } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isManualModel, setIsManualModel] = useState(false);
  const [customModel, setCustomModel] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    service: '',
    date: '',
    time: '',
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
        category: '',
        brand: '',
        model: '',
        service: '',
        date: '',
        time: '',
        customerName: '',
        email: '',
        phone: '',
        details: ''
      });
    }, 500);
  };

  const filteredBrands = useMemo(() => {
    if (!formData.category) return brands;
    // Simple filter: if category is Phone, show all smartphone brands. 
    // For iPad/MacBook, filter the deviceCategories within brands.
    return brands; 
  }, [formData.category]);

  const availableModels = useMemo(() => {
    if (!formData.brand || !formData.category) return [];
    const brandData = brands.find(b => b.name === formData.brand);
    if (!brandData) return [];
    
    // Find matching category in brand data
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
      console.log('Attempting to save booking:', formData);
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('Booking saved to Firestore, sending notifications...');
      setIsSuccess(true);
      
      // Send notifications in background (includes external CRM sync)
      sendSMSNotification('booking', formData).catch(err => {
        console.warn('Notification error:', err);
      });
    } catch (err) {
      console.error('Submit error:', err);
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      handleFirestoreError(err, OperationType.CREATE, 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStepIndicator = () => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`h-1.5 rounded-full transition-all duration-300 ${
            step === i ? 'w-8 bg-blue-600' : 
            step > i ? 'w-4 bg-blue-200' : 'w-4 bg-slate-100'
          }`} 
        />
      ))}
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
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Repair Booking</h3>
                {renderStepIndicator()}
              </div>
              <button 
                onClick={handleClose}
                className="p-1.5 md:p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900 shadow-sm"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {isSuccess ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900">Booking Confirmed!</h4>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Thanks <span className="text-slate-950 font-bold">{formData.customerName}</span>! Your {formData.brand} {formData.model} repair is booked for:
                    </p>
                    <div className="flex items-center justify-center gap-4 text-blue-600 font-black uppercase tracking-widest text-xs py-2 bg-white rounded-xl shadow-sm border border-blue-50">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {formData.date}</span>
                      <span className="h-4 w-[1px] bg-blue-100" />
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> {formData.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 italic">We will call you at {formData.phone} shortly.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleClose}
                      className="w-full px-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition shadow-xl"
                    >
                      Awesome, See You Then
                    </button>
                    <a 
                      href={`sms:0431618100?body=Hi, I just booked a ${formData.brand} ${formData.model} repair for ${formData.date} at ${formData.time}. My name is ${formData.customerName}.`}
                      className="w-full px-8 py-5 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4"/> Send SMS Backup
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Category */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center space-y-2 mb-8">
                        <h4 className="text-2xl font-black text-slate-900">What are we fixing?</h4>
                        <p className="text-slate-500 font-medium italic">Select your device type to begin</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => { setFormData({ ...formData, category: cat.id }); nextStep(); }}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 text-center group ${
                              formData.category === cat.id
                                ? 'border-blue-600 bg-blue-50/50 shadow-lg'
                                : 'border-slate-100 hover:border-blue-200 bg-white hover:shadow-xl hover:shadow-slate-100'
                            }`}
                          >
                            <div className={`p-4 rounded-2xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                              <cat.icon className="w-8 h-8" />
                            </div>
                            <span className="font-bold text-slate-900 text-sm whitespace-nowrap">
                              {cat.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Brand & Model */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">Choose Brand</label>
                        <div className="grid grid-cols-3 gap-3">
                          {brands.map(brand => (
                            <button
                              key={brand.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, brand: brand.name })}
                              className={`py-4 rounded-2xl border-2 font-bold transition-all ${
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
                            onClick={() => setFormData({ ...formData, brand: 'Other' })}
                            className={`py-4 rounded-2xl border-2 font-bold transition-all ${
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
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">Select Model</label>
                          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {availableModels.length > 0 ? (
                              <>
                                {availableModels.map(model => (
                                  <button
                                    key={model}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, model });
                                      setIsManualModel(false);
                                    }}
                                    className={`p-4 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                                      formData.model === model && !isManualModel
                                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                                        : 'border-slate-50 bg-slate-50 text-slate-600 hover:border-blue-100'
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
                                  className={`p-4 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                                    isManualModel
                                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                                      : 'border-slate-50 bg-slate-50 text-slate-600 hover:border-blue-100'
                                  }`}
                                >
                                  Other / Not Listed
                                </button>
                                
                                {isManualModel && (
                                  <div className="col-span-2 pt-2">
                                    <input
                                      type="text"
                                      placeholder="Type your model (e.g. iPhone 6)"
                                      value={customModel}
                                      onChange={(e) => {
                                        setCustomModel(e.target.value);
                                        setFormData({ ...formData, model: e.target.value });
                                      }}
                                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                                      autoFocus
                                    />
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="col-span-2">
                                <input
                                  type="text"
                                  placeholder="Enter your model (e.g. Pixel 8 Pro)"
                                  value={formData.model}
                                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.brand === 'Other' && (
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block">Device Details</label>
                          <input
                            type="text"
                            placeholder="e.g. Nintendo Switch OLED"
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Service */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center space-y-2 mb-8">
                        <h4 className="text-2xl font-black text-slate-900">What\'s the issue?</h4>
                        <p className="text-slate-500 font-medium italic">Select a service category</p>
                      </div>
                      <div className="grid gap-3">
                        {servicesData.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: service.title })}
                            className={`p-5 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                              formData.service === service.title
                                ? 'border-blue-600 bg-blue-50/50 shadow-md'
                                : 'border-slate-100 bg-white hover:border-blue-100'
                            }`}
                          >
                            <div className={`p-3 rounded-xl bg-slate-100 text-slate-600 ${formData.service === service.title ? 'bg-blue-600 text-white' : ''}`}>
                              <service.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <span className="font-bold text-slate-900">{service.title}</span>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{service.features[0]}</p>
                            </div>
                            {formData.service === service.title && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, service: 'Other / Diagnostic' })}
                          className={`p-5 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                            formData.service === 'Other / Diagnostic'
                              ? 'border-blue-600 bg-blue-50/50'
                              : 'border-slate-100 bg-white hover:border-blue-100'
                          }`}
                        >
                          <div className={`p-3 rounded-xl bg-slate-100 text-slate-600 ${formData.service === 'Other / Diagnostic' ? 'bg-blue-600 text-white' : ''}`}>
                            <Search className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-slate-900">Other / Not Sure</span>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Free Diagnostic Check</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Date & Time */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                          <Calendar className="w-4 h-4" /> Pick a Date
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                          <Clock className="w-4 h-4" /> Preferred Time
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setFormData({ ...formData, time: slot })}
                              className={`py-3 rounded-xl border-2 text-xs font-black transition-all ${
                                formData.time === slot
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100'
                                  : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-blue-100'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Final Details */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <User className="w-3 h-3" /> Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <Phone className="w-3 h-3" /> Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0400 000 000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                          <Info className="w-3 h-3" /> Additional Details (Optional)
                        </label>
                        <textarea
                          placeholder="e.g. The screen works but the touch is broken..."
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          rows={4}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900"
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
                  <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-4 text-slate-400 hover:text-slate-900 font-bold transition-colors flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Go Back
                      </button>
                    ) : <div />}

                    {step < 5 ? (
                      <button
                        type="button"
                        disabled={(step === 2 && !formData.brand) || (step === 3 && !formData.service) || (step === 4 && (!formData.date || !formData.time))}
                        onClick={nextStep}
                        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition shadow-xl disabled:opacity-20 flex items-center gap-3"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.customerName || !formData.phone}
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Confirming...' : 'Request Booking'}
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

