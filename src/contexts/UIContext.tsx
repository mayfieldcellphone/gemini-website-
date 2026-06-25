import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface UIContextType {
  isBookingModalOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBooking = useCallback(() => {
    setIsBookingModalOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  const value = useMemo(() => ({
    isBookingModalOpen,
    openBooking,
    closeBooking
  }), [isBookingModalOpen, openBooking, closeBooking]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
