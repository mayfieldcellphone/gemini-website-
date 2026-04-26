import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  PhoneCall,
  Search,
  Building2,
  Mail,
  Smartphone
} from 'lucide-react';

interface Quote {
  id: string;
  name: string;
  phone: string;
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

export default function AdminDashboard() {
  const { user, isAdmin, login, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'quotes' | 'corporate'>('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [corporateLeads, setCorporateLeads] = useState<CorporateLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    // Listen to Quotes
    const qQuotes = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
    const unsubQuotes = onSnapshot(qQuotes, (snapshot) => {
      setQuotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quote)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'quotes'));

    // Listen to Corporate Leads
    const qLeads = query(collection(db, 'corporate_leads'), orderBy('createdAt', 'desc'));
    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      setCorporateLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CorporateLead)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'corporate_leads'));

    return () => {
      unsubQuotes();
      unsubLeads();
    };
  }, [isAdmin]);

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      await updateDoc(doc(db, 'quotes', id), { 
        status, 
        updatedAt: serverTimestamp() 
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'quotes');
    }
  };

  const updateLeadStatus = async (id: string, status: CorporateLead['status']) => {
    try {
      await updateDoc(doc(db, 'corporate_leads', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'corporate_leads');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-8">
           <Smartphone className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-display">Staff Portal</h1>
        <p className="text-slate-500 mb-8 max-w-sm italic">This area is for Mayfield Cellphone Repairs staff only. Please sign in with your authorized Google account.</p>
        <button 
          onClick={login}
          className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 overflow-hidden shadow-lg border-2 border-slate-100 flex items-center justify-center">
                 {user.photoURL ? (
                   <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" />
                 ) : (
                   <Users className="text-white" />
                 )}
              </div>
              <div>
                 <h2 className="text-2xl font-bold text-slate-900 font-display">Hello, {user.displayName || 'Staff'}</h2>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{user.email}</p>
              </div>
           </div>
           <div className="flex gap-4">
              <button onClick={logout} className="p-4 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-2xl hover:bg-rose-50 transition-all border border-slate-100">
                 <LogOut className="w-5 h-5" />
              </button>
           </div>
        </header>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                 <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-4xl font-bold text-slate-900">{quotes.length}</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Total Quotes</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                 <Building2 className="w-6 h-6" />
              </div>
              <p className="text-4xl font-bold text-slate-900">{corporateLeads.length}</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Corproate Leads</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                 <Clock className="w-6 h-6" />
              </div>
              <p className="text-4xl font-bold text-slate-900">
                {quotes.filter(q => q.status === 'pending').length}
              </p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Pending Quotes</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                 <Users className="w-6 h-6" />
              </div>
              <p className="text-4xl font-bold text-slate-900">Mayfield</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Primary Branch</p>
           </div>
        </div>

        {/* Tab Selection & Search */}
        <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
           <div className="flex bg-slate-50 p-1.5 rounded-2xl flex-1 w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('quotes')}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${activeTab === 'quotes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Quote Requests
              </button>
              <button 
                onClick={() => setActiveTab('corporate')}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${activeTab === 'corporate' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Corporate Leads
              </button>
           </div>
           <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search inquiries..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-medium"
              />
           </div>
        </div>

        {/* List Content */}
        <div className="space-y-6">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="grid gap-6"
             >
               {activeTab === 'quotes' ? (
                  quotes
                    .filter(q => q.name.toLowerCase().includes(searchTerm.toLowerCase()) || q.phone.includes(searchTerm))
                    .map(quote => (
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
                  corporateLeads
                    .filter(l => l.organization.toLowerCase().includes(searchTerm.toLowerCase()) || l.contactName.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(lead => (
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
               {(activeTab === 'quotes' ? quotes : corporateLeads).length === 0 && (
                 <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-100">
                    <p className="text-slate-400 font-medium italic">No entries found matching your criteria.</p>
                 </div>
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
