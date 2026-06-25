import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface BusinessHours {
  [key: number]: { open: string; close: string; closed: boolean };
}

const HOURS: BusinessHours = {
  1: { open: '09:00', close: '17:00', closed: false }, // Mon
  2: { open: '09:00', close: '17:00', closed: false }, // Tue
  3: { open: '09:00', close: '17:00', closed: false }, // Wed
  4: { open: '09:00', close: '17:00', closed: false }, // Thu
  5: { open: '09:00', close: '17:00', closed: false }, // Fri
  6: { open: '10:00', close: '16:00', closed: false }, // Sat
  0: { open: '10:00', close: '14:00', closed: false }, // Sun
};

const formatTime = (timeStr: string) => {
  const [hour, min] = timeStr.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}${min === 0 ? '' : `:${min}`}${ampm}`;
};

export const OpeningStatus: React.FC<{ className?: string; compact?: boolean }> = ({ className = "", compact = false }) => {
  const [status, setStatus] = useState<{ isOpen: boolean; message: string; subMessage: string }>({
    isOpen: false,
    message: 'Loading...',
    subMessage: ''
  });

  useEffect(() => {
    const updateStatus = () => {
      // Get current Newcastle time (AEST/AEDT)
      const now = new Date();
      const nclTime = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).formatToParts(now);

      const parts: { [key: string]: string } = {};
      nclTime.forEach(({ type, value }) => {
        parts[type] = value;
      });

      // weekday returns 1-7 (Mon-Sun in en-AU usually, but let's be careful)
      // Actually weekday: 'numeric' for en-AU: 1 is Mon, 7 is Sun? 
      // Let's use a safer way to get the numeric day compatible with our HOURS object (0 is Sun)
      const nclDate = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
      const day = nclDate.getDay(); 
      const hours = nclDate.getHours();
      const minutes = nclDate.getMinutes();
      const currentTime = hours * 100 + minutes;

      const config = HOURS[day];
      
      const [openH, openM] = config.open.split(':').map(Number);
      const [closeH, closeM] = config.close.split(':').map(Number);
      
      const openTime = openH * 100 + openM;
      const closeTime = closeH * 100 + closeM;

      if (config.closed) {
        setStatus({
          isOpen: false,
          message: 'Closed Today',
          subMessage: `Reopens tomorrow at ${formatTime(HOURS[(day + 1) % 7].open)}`
        });
      } else if (currentTime < openTime) {
        setStatus({
          isOpen: false,
          message: 'Closed Now',
          subMessage: `Opens today at ${formatTime(config.open)}`
        });
      } else if (currentTime < closeTime) {
        // Calculate minutes remaining
        const remainingMinutes = (closeH * 60 + closeM) - (hours * 60 + minutes);
        
        if (remainingMinutes < 60) {
          setStatus({
            isOpen: true,
            message: `Closing Soon`,
            subMessage: `Closes in ${remainingMinutes} mins`
          });
        } else {
          setStatus({
            isOpen: true,
            message: 'Open Now',
            subMessage: `Open until ${formatTime(config.close)} today`
          });
        }
      } else {
        // Find next open day
        let nextDay = (day + 1) % 7;
        let daysToWait = 1;
        while (HOURS[nextDay].closed) {
          nextDay = (nextDay + 1) % 7;
          daysToWait++;
        }
        
        const nextDayName = daysToWait === 1 ? 'tomorrow' : 
                          nextDay === 1 ? 'Monday' : 
                          nextDay === 2 ? 'Tuesday' : 
                          nextDay === 3 ? 'Wednesday' : 
                          nextDay === 4 ? 'Thursday' : 
                          nextDay === 5 ? 'Friday' : 
                          nextDay === 6 ? 'Saturday' : 'Sunday';

        setStatus({
          isOpen: false,
          message: 'Closed Now',
          subMessage: `Reopens ${nextDayName} at ${formatTime(HOURS[nextDay].open)}`
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`}></div>
      <div className={`flex ${compact ? 'flex-row items-center gap-2' : 'flex-col sm:flex-row sm:items-center sm:gap-2'}`}>
        <span className={`font-black text-[10px] uppercase tracking-[0.2em] ${status.isOpen ? (compact ? 'text-blue-400' : 'text-white') : 'text-slate-400'}`}>
          {status.message}
        </span>
        <span className={`text-[10px] text-slate-500 font-medium italic ${compact ? 'hidden md:inline' : ''}`}>
          {status.subMessage}
        </span>
      </div>
    </div>
  );
};
