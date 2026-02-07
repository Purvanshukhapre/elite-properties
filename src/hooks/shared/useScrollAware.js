/**
 * Scroll Awareness Hook
 * 
 * Tracks scroll position, direction, and scrolling state
 * 
 * Usage:
 * const { scrollPosition, scrollDirection, isScrolling, scrollPercentage } = useScrollAware();
 * 
 * @returns {Object} - Scroll information object
 *   - scrollPosition: {number} - Current scroll position in pixels
 *   - scrollDirection: {string} - 'up' or 'down'
 *   - isScrolling: {boolean} - Whether user is currently scrolling
 *   - scrollPercentage: {number} - Scroll percentage (0-100)
 */
import { useState, useEffect } from 'react';

const useScrollAware = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      
      // Set scrolling state
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 150);
      
      // Determine scroll direction
      if (currentScrollPosition > scrollPosition) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [scrollPosition]);

  // Calculate scroll percentage
  const scrollPercentage = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
  };

  return {
    scrollPosition,
    scrollDirection,
    isScrolling,
    scrollPercentage: scrollPercentage(),
  };
};

export default useScrollAware;