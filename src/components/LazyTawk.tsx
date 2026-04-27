import { useEffect } from 'react';

export default function LazyTawk() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.async = true;
      script.src = 'https://embed.tawk.to/69eef12f47a5081c3064a841/1jn6ls8j0';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
    }, 5000); // Wait 5 seconds to not block FCP/LCP

    return () => clearTimeout(timer);
  }, []);

  return null;
}
