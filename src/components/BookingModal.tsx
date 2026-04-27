import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Smartphone, Laptop, Gamepad2, Tablet, CheckCircle2, ChevronRight, User, Phone, Mail, Info } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_TYPES = [
  { id: 'phone', label: 'Phone Repair', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'laptop', label: 'Laptop / PC', icon: Laptop, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'tablet', label: 'iPad / Tablet', icon: Tablet, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'console', label: 'Game Console', icon: Gamepad2, color: 'text-rose-600', bg: 'bg-rose-50' }
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    customerName: '',
    email: '',
    phone: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const isStep1Valid = formData.serviceType !== '';
  const isStep2Valid = formData.date !== '' && formData.time !== '';
  const isStep3Valid = formData.customerName.trim() !== '' && formData.phone.trim() !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Book Your Repair</h3>
                <p className="text-sm text-slate-500 font-medium italic">Step {step} of 3</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900 shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {isSuccess ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900">Booking Received!</h4>
                  <p className="text-slate-600 max-w-sm mx-auto font-medium italic">
                    Great news! Your repair slot is requested. A technician will call you shortly at 
                    <span className="text-blue-600 font-bold block mt-1">{formData.phone}</span>
                    to confirm.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition shadow-xl"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Service Type */}
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Select Specialist Area</label>
                      <div className="grid grid-cols-2 gap-4">
                        {SERVICE_TYPES.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, serviceType: service.label })}
                            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 text-center group ${
                              formData.serviceType === service.label
                                ? 'border-blue-600 bg-blue-50/50 shadow-lg'
                                : 'border-slate-100 hover:border-blue-200 bg-white'
                            }`}
                          >
                            <div className={`p-4 rounded-2xl ${service.bg} ${service.color} group-hover:scale-110 transition-transform`}>
                              <service.icon className="w-8 h-8" />
                            </div>
                            <span className={`font-bold transition-colors ${formData.serviceType === service.label ? 'text-blue-600' : 'text-slate-900'}`}>
                              {service.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
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
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <User className="w-3 h-3" /> Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
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
                          <Info className="w-3 h-3" /> Issue Description
                        </label>
                        <textarea
                          placeholder="Tell us what's wrong with your device..."
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          rows={4}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Footer Buttons */}
                  <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-4 text-slate-400 hover:text-slate-900 font-bold transition-colors"
                      >
                        Go Back
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button
                        type="button"
                        disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                        onClick={nextStep}
                        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition shadow-xl disabled:opacity-20 flex items-center gap-3"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !isStep3Valid}
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
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
