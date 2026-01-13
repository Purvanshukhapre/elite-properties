// Smooth scrolling utility for premium scrolling experience
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Scroll to top with animation
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Enhanced scroll with custom easing
export const scrollToElement = (selector, options = {}) => {
  const element = document.querySelector(selector);
  if (element) {
    const defaults = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    };
    
    const scrollOptions = { ...defaults, ...options };
    element.scrollIntoView(scrollOptions);
  }
};

// Scroll with progress tracking
export const trackScrollProgress = () => {
  const scrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const totalScrollable = documentHeight - windowHeight;
  const scrollProgress = (scrollPosition / totalScrollable) * 100;
  
  return {
    position: scrollPosition,
    progress: scrollProgress,
    windowHeight,
    documentHeight
  };
};