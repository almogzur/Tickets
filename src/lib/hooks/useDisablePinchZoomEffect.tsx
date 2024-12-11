import React, { useEffect } from 'react';

function DisableZoomEffect() :void {
  useEffect(() => {
    // Prevent zoom with the wheel
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Prevent zoom with keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    };

    // Prevent pinch-to-zoom
    const handleTouchMove = (e: TouchEvent) => {
      console.log(e.touches);
      
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap-to-zoom
    let lastTouchTime = 0;
    const handleTouchStart = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchTime <= 300) {
        e.preventDefault();
      }
      lastTouchTime = now;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    // Clean up event listeners
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return null;
}

export default DisableZoomEffect;
