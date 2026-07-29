'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrolled / total) * 100;
      setProgress(percentage);
    };

    window.addEventListener('scroll', updateProgress);

    // Cleanup — remove listener when we leave the page
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${progress}%`,
      height: '3px',
      background: 'var(--accent)',
      zIndex: 999,
      transition: 'width 0.1s ease',
    }} />
  );
}
