import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  LogOut, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Quote {
  id: string;
  name: string;
  phone: string;
  suburb: string;
  details: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: any;
}

interface CorporateLead {
  id: string;
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'scheduled' | 'completed';
  createdAt: any;
}

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: string;
  date: string;
  time: string;
  details: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: any;
}

interface VoiceMessage {
  id: string;
  customerName: string;
  customerPhone: string;
  audioUrl: string; // Base64 or URL
  duration: number;
  status: 'new' | 'listened' | 'archived';
  createdAt: any;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, logout: performLogout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab ] = useState<'bookings' | 'quotes' | 'corporate' | 'voice_messages'>('bookings');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [corporateLeads, setCorporateLeads] = useState<CorporateLead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [voiceMessages, setVoiceMessages] = useState<VoiceMessage[]>([]);
  const [lastBookingCount, setLastBookingCount] = useState<number | null>(null);
  const [lastQuoteCount, setLastQuoteCount] = useState<number | null>(null);

  // sound notification
  const playNotificationSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  };

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendLocalNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
    playNotificationSound();
  };
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
      return;
    }

    if (user && isAdmin) {
      // Quotes Listener
    const quotesQuery = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
    const unsubscribeQuotes = onSnapshot(quotesQuery, (snapshot) => {
      const updatedQuotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quote));
      setQuotes(updatedQuotes);
      
      // Trigger notification for new quotes
      if (lastQuoteCount !== null && updatedQuotes.length > lastQuoteCount) {
        const newQuote = updatedQuotes[0];
        sendLocalNotification('New Quote Request', `${newQuote.name} requested a quote for a repair.`);
      }
      setLastQuoteCount(updatedQuotes.length);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'quotes'));

    // Corporate Leads Listener
    const corporateQuery = query(collection(db, 'corporate_leads'), orderBy('createdAt', 'desc'));
    const unsubscribeCorporate = onSnapshot(corporateQuery, (snapshot) => {
      setCorporateLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CorporateLead)));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'corporate_leads'));

    // Bookings Listener
    const bookingsQuery = query(collection(db, 'bookings'), orderBy('date', 'desc'), orderBy('time', 'asc'));
    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const updatedBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(updatedBookings);

      // Trigger notification for new bookings
      if (lastBookingCount !== null && updatedBookings.length > lastBookingCount) {
        const newBooking = updatedBookings.find(b => b.status === 'pending');
        if (newBooking) {
           sendLocalNotification('New Appointment', `${newBooking.customerName} booked at ${newBooking.time} on ${newBooking.date}`);
        }
      }
      setLastBookingCount(updatedBookings.length);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'bookings'));

    // Voice Messages Listener
    const voiceQuery = query(collection(db, 'voice_messages'), orderBy('createdAt', 'desc'));
    const unsubscribeVoice = onSnapshot(voiceQuery, (snapshot) => {
      setVoiceMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VoiceMessage)));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'voice_messages'));

      return () => {
        unsubscribeQuotes();
        unsubscribeCorporate();
        unsubscribeBookings();
        unsubscribeVoice();
      };
    }
  }, [user, isAdmin, authLoading, navigate]);

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      await updateDoc(doc(db, 'quotes', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `quotes/${id}`);
    }
  };

  const updateLeadStatus = async (id: string, status: CorporateLead['status']) => {
    try {
      await updateDoc(doc(db, 'corporate_leads', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `corporate_leads/${id}`);
    }
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status, updatedAt: serverTimestamp() });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const updateVoiceStatus = async (id: string, status: VoiceMessage['status']) => {
    try {
      await updateDoc(doc(db, 'voice_messages', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `voice_messages/${id}`);
    }
  };

  const logout = () => {
    performLogout();
    navigate('/');
  };

  const filteredItems = (activeTab === 'bookings' ? bookings : activeTab === 'quotes' ? quotes : activeTab === 'corporate' ? corporateLeads : voiceMessages).filter(item => {
    const searchStr = searchTerm.toLowerCase();
    if (activeTab === 'bookings') {
      const b = item as Booking;
      return b.customerName.toLowerCase().includes(searchStr) || b.phone.toLowerCase().includes(searchStr) || b.serviceType.toLowerCase().includes(searchStr);
    } else if (activeTab === 'quotes') {
      const q = item as Quote;
      return q.name.toLowerCase().includes(searchStr) || q.suburb.toLowerCase().includes(searchStr);
    } else if (activeTab === 'corporate') {
      const l = item as CorporateLead;
      return l.organization.toLowerCase().includes(searchStr) || l.contactName.toLowerCase().includes(searchStr);
    } else {
      const v = item as VoiceMessage;
      return v.customerName.toLowerCase().includes(searchStr) || v.customerPhone.toLowerCase().includes(searchStr);
    }
  });

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Authenticating Session...</p>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 hidden xl:flex flex-col p-8 z-50">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Smartphone className="text-white w-6 h-6" />
            </div>
            <h1 className="font-black text-xl tracking-tight text-slate-900">Mayfield CRM</h1>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'bookings', icon: Calendar, label: 'Appointments' },
              { id: 'quotes', icon: BarChart3, label: 'Repair Quotes' },
              { id: 'corporate', icon: Users, label: 'Corporate Leads' },
              { id: 'voice_messages', icon: PhoneCall, label: 'Voice Messages' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setCurrentPage(1); }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a 
                href="https://repairbill-erp-302106920849.asia-southeast1.run.app/" 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-between gap-4 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border-2 border-transparent hover:border-blue-100"
              >
                <div className="flex items-center gap-4">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  <span>RepairBill Inbox</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="xl:pl-80">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-bold text-slate-900 leading-none mb-1">{user?.displayName || 'Admin User'}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Operations Manager</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-900 overflow-hidden shadow-lg border-2 border-slate-100">
              {user?.photoURL ? <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl uppercase">{user?.email?.[0]}</div>}
            </div>
          </div>
        </header>

        <main className="p-8 pb-32">
          {/* Dashboard Title Section */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                {activeTab === 'bookings' ? 'Direct Appointments' : activeTab === 'quotes' ? 'Repair Requests' : activeTab === 'corporate' ? 'Corporate Partners' : activeTab === 'voice_messages' ? 'Voice Messages' : 'Live Support'}
              </h2>
              <p className="text-slate-400 font-medium italic">Manage and track your incoming business requests</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-6"
            >
              {activeTab === 'bookings' ? (
                (currentItems as Booking[]).map(booking => (
                  <div key={booking.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group">
                    <div className="flex flex-col xl:flex-row gap-8 justify-between xl:items-center">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Calendar className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-900">{booking.customerName}</h3>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                              booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5 text-blue-600">
                               <Smartphone className="w-3.5 h-3.5" /> {booking.serviceType}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-600">
                               <Calendar className="w-3.5 h-3.5" /> {booking.date} @ {booking.time}
                            </span>
                            <a href={`tel:${booking.phone}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                               <Phone className="w-3.5 h-3.5" /> {booking.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl flex-1 max-w-xl">
                         <p className="text-sm text-slate-600 font-medium italic line-clamp-2">
                           "{booking.details || 'No additional details provided'}"
                         </p>
                      </div>
                      
                      <div className="flex gap-4">
                        {booking.status === 'pending' && (
                          <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100">
                             Confirm
                          </button>
                        )}
                        <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors" title="Mark as Fixed">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="p-3 bg-rose-50 text-rose-400 hover:text-rose-600 rounded-xl hover:bg-rose-100 transition-colors" title="Cancel Booking">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : activeTab === 'voice_messages' ? (
                (currentItems as VoiceMessage[]).map(vm => (
                  <div key={vm.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group">
                    <div className="flex flex-col lg:flex-row gap-8 justify-between lg:items-center">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                          <PhoneCall className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <h3 className="text-xl font-bold text-slate-900">{vm.customerName || 'Voice Message'}</h3>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              vm.status === 'new' ? 'bg-blue-100 text-blue-700' :
                              vm.status === 'listened' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {vm.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                            <a href={`tel:${vm.customerPhone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors uppercase tracking-widest font-black text-[10px]">
                              <Phone className="w-4 h-4" /> {vm.customerPhone}
                            </a>
                            <div className="flex items-center gap-2 uppercase tracking-widest font-black text-[10px]">
                              <Clock className="w-4 h-4" /> 
                              {vm.createdAt ? format(vm.createdAt.toDate(), 'PPP p') : 'Pending...'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 max-w-xl">
                        <audio controls src={vm.audioUrl} className="w-full h-10" />
                      </div>

                      <div className="flex gap-3">
                        {vm.status === 'new' && (
                          <button onClick={() => updateVoiceStatus(vm.id, 'listened')} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Mark as Listened">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        )}
                        <button onClick={() => updateVoiceStatus(vm.id, 'archived')} className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors" title="Archive">
                          <LogOut className="w-5 h-5 rotate-90" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : activeTab === 'quotes' ? (
                (currentItems as Quote[]).map(quote => (
                  <div key={quote.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group">
                    <div className="flex flex-col lg:flex-row gap-8 justify-between lg:items-center">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-bold text-slate-900">{quote.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            quote.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            quote.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                            quote.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
                          <a href={`tel:${quote.phone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <PhoneCall className="w-4 h-4" /> {quote.phone}
                          </a>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> 
                            {quote.createdAt ? format(quote.createdAt.toDate(), 'PPP p') : 'Pending...'}
                          </div>
                        </div>
                        <p className="text-slate-600 italic bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-2xl">{quote.details}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button onClick={() => updateQuoteStatus(quote.id, 'contacted')} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors tooltip" title="Mark as Contacted">
                          <PhoneCall className="w-5 h-5" />
                        </button>
                        <button onClick={() => updateQuoteStatus(quote.id, 'completed')} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors" title="Mark as Completed">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => updateQuoteStatus(quote.id, 'cancelled')} className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors" title="Reject / Cancel">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                (currentItems as CorporateLead[]).map(lead => (
                  <div key={lead.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
                    <div className="flex flex-col lg:flex-row gap-8 justify-between lg:items-center">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-bold text-slate-900">{lead.organization}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            lead.status === 'new' ? 'bg-indigo-100 text-indigo-700' :
                            lead.status === 'scheduled' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
                          <div className="flex items-center gap-2">
                             <Users className="w-4 h-4" /> {lead.contactName}
                          </div>
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                             <Mail className="w-4 h-4" /> {lead.email}
                          </a>
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                             <PhoneCall className="w-4 h-4" /> {lead.phone}
                          </a>
                        </div>
                        <p className="text-slate-600 italic bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-2xl">{lead.message}</p>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => updateLeadStatus(lead.id, 'scheduled')} className="px-6 py-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all font-bold text-xs uppercase tracking-widest">
                          Schedule
                        </button>
                        <button onClick={() => updateLeadStatus(lead.id, 'completed')} className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all font-bold text-xs uppercase tracking-widest">
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-100 mt-8">
              <p className="text-slate-400 font-medium italic">No entries found matching your criteria.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[2rem] border border-slate-200 mt-8">
              <p className="text-sm text-slate-400 font-medium italic">
                Showing <span className="font-bold text-slate-600">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to <span className="font-bold text-slate-600">{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}</span> of <span className="font-bold text-slate-600">{totalItems}</span> entries
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1 items-center px-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                        currentPage === i + 1 
                          ? 'bg-slate-900 text-white shadow-lg' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
