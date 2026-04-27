import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isBookingModalOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBooking = () => setIsBookingModalOpen(true);
  const closeBooking = () => setIsBookingModalOpen(false);

  return (
    <UIContext.Provider value={{ isBookingModalOpen, openBooking, closeBooking }}>
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
