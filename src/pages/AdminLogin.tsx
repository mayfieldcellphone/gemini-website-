import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Smartphone, LogIn, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLogin() {
  const { user, isAdmin, loading, login, loginWithRedirect } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="bg-blue-600 p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">CRM Login</h1>
          <p className="text-blue-100 font-medium">Mayfield Phone Repair Admin</p>
        </div>

        <div className="p-12 space-y-8">
          {user && !isAdmin ? (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-sm font-medium">
              You are signed in as <span className="font-bold">{user.email}</span>, but you don't have administrator privileges. Please contact the system administrator to grant access.
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-500 text-center text-sm font-medium leading-relaxed px-4">
                Access to the administrative control panel is restricted to authorized personnel only. Please sign in with your Google account.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <button 
              onClick={login}
              className="w-full flex items-center justify-center gap-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4" />
              Sign In with Google (Popup)
            </button>

            <button 
              onClick={loginWithRedirect}
              className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-900 text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl hover:bg-slate-50 transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              Login with Redirect
            </button>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-[10px] text-center font-black uppercase tracking-widest text-slate-400">
              Security Protocol Enabled
            </p>
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-xs font-medium">
        &copy; {new Date().getFullYear()} Mayfield Phone Repair. All rights reserved.
      </p>
    </div>
  );
}
