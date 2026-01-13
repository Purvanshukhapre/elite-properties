// Performance optimization utilities for animations

// Debounce function for scroll and resize events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for high-frequency events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Animation frame wrapper for smooth animations
export const animate = (callback) => {
  let animationId;
  const animateFrame = () => {
    callback();
    animationId = requestAnimationFrame(animateFrame);
  };
  animateFrame();
  return () => cancelAnimationFrame(animationId);
};

// Lazy loading for images
export const lazyLoadImage = (imageRef, src) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = src;
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(imageRef.current);
  } else {
    // Fallback for older browsers
    imageRef.current.src = src;
  }
};

// Optimize component rendering
export const shouldComponentUpdate = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) !== JSON.stringify(nextProps);
};

// Animation performance monitor
export class AnimationPerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 0;
  }

  update() {
    this.frameCount++;
    const now = performance.now();
    const delta = now - this.lastTime;

    if (delta >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / delta);
      this.frameCount = 0;
      this.lastTime = now;
      return this.fps;
    }
    return null;
  }

  getFPS() {
    return this.fps;
  }
}

// Animation quality settings based on device performance
export const getAnimationQuality = () => {
  const isHighPerformance = window.deviceMemory && window.deviceMemory >= 8;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isHighPerformance) {
    return 'high';
  } else if (isTouchDevice) {
    return 'medium';
  } else {
    return 'low';
  }
};

// Optimize animation settings based on user preferences
export const getAnimationSettings = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animationQuality = getAnimationQuality();
  
  if (prefersReducedMotion) {
    return {
      duration: 0,
      easing: 'linear',
      enabled: false
    };
  }
  
  switch (animationQuality) {
    case 'high':
      return {
        duration: 0.6,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enabled: true
      };
    case 'medium':
      return {
        duration: 0.4,
        easing: 'ease-out',
        enabled: true
      };
    case 'low':
      return {
        duration: 0.2,
        easing: 'ease-out',
        enabled: true
      };
    default:
      return {
        duration: 0.6,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enabled: true
      };
  }
};