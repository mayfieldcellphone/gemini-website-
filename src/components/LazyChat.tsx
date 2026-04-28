import { useState, useEffect, lazy, Suspense } from 'react';

const ChatWidget = lazy(() => import('./ChatWidget'));

export default function LazyChat({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Load after 7 seconds or on user scroll
    const timer = setTimeout(() => setShouldLoad(true), 7000);
    
    const handleScroll = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <ChatWidget onOpenBooking={onOpenBooking} />
    </Suspense>
  );
}
