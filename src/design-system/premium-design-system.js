// Advanced Premium Design System for Elite Properties
// Sophisticated component library with micro-interactions and physics-based motion

import { motion } from 'framer-motion';
import { PREMIUM_BRAND } from '../constants/premium-brand';

// Animation Presets - Physics-based Motion
export const ANIMATION_PRESETS = {
  // Entrance Animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },

  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  },

  slideDown: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  },

  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },

  // Hover Effects
  hoverLift: {
    whileHover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  },

  hoverGlow: {
    whileHover: {
      boxShadow: "0 20px 40px rgba(30, 58, 138, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  },

  // Staggered Animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
};

// Premium Component Styles
export const PREMIUM_COMPONENTS = {
  // Button Styles
  buttons: {
    primary: {
      base: {
        backgroundColor: PREMIUM_BRAND.colors.primary.royal,
        color: PREMIUM_BRAND.colors.luxury.pearl,
        padding: `${PREMIUM_BRAND.spacing.md} ${PREMIUM_BRAND.spacing.xl}`,
        borderRadius: PREMIUM_BRAND.borderRadius.lg,
        fontWeight: '600',
        fontSize: PREMIUM_BRAND.typography.body,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        position: 'relative',
        overflow: 'hidden'
      },
      hover: {
        backgroundColor: PREMIUM_BRAND.colors.primary.sapphire,
        transform: 'translateY(-2px)',
        boxShadow: PREMIUM_BRAND.shadows.xl
      },
      active: {
        transform: 'translateY(0)'
      }
    },

    secondary: {
      base: {
        backgroundColor: 'transparent',
        color: PREMIUM_BRAND.colors.primary.royal,
        padding: `${PREMIUM_BRAND.spacing.md} ${PREMIUM_BRAND.spacing.xl}`,
        borderRadius: PREMIUM_BRAND.borderRadius.lg,
        fontWeight: '600',
        fontSize: PREMIUM_BRAND.typography.body,
        border: `2px solid ${PREMIUM_BRAND.colors.primary.royal}`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
      },
      hover: {
        backgroundColor: PREMIUM_BRAND.colors.primary.royal,
        color: PREMIUM_BRAND.colors.luxury.pearl,
        transform: 'translateY(-2px)',
        boxShadow: PREMIUM_BRAND.shadows.lg
      }
    },

    luxury: {
      base: {
        backgroundColor: PREMIUM_BRAND.colors.secondary.gold,
        color: PREMIUM_BRAND.colors.luxury.onyx,
        padding: `${PREMIUM_BRAND.spacing.lg} ${PREMIUM_BRAND.spacing['2xl']}`,
        borderRadius: PREMIUM_BRAND.borderRadius.xl,
        fontWeight: '700',
        fontSize: PREMIUM_BRAND.typography.body,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        position: 'relative',
        overflow: 'hidden'
      },
      hover: {
        backgroundColor: PREMIUM_BRAND.colors.secondary.amethyst,
        color: PREMIUM_BRAND.colors.luxury.pearl,
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: `0 25px 50px ${PREMIUM_BRAND.colors.secondary.amethyst}40`
      }
    }
  },

  // Card Styles
  cards: {
    premium: {
      base: {
        backgroundColor: PREMIUM_BRAND.colors.luxury.pearl,
        borderRadius: PREMIUM_BRAND.borderRadius['2xl'],
        padding: PREMIUM_BRAND.spacing.xl,
        boxShadow: PREMIUM_BRAND.shadows.lg,
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        border: `1px solid ${PREMIUM_BRAND.colors.luxury.platinum}20`,
        position: 'relative',
        overflow: 'hidden'
      },
      hover: {
        transform: 'translateY(-10px)',
        boxShadow: PREMIUM_BRAND.shadows['2xl']
      }
    },

    luxury: {
      base: {
        backgroundColor: PREMIUM_BRAND.colors.luxury.ivory,
        borderRadius: PREMIUM_BRAND.borderRadius['3xl'],
        padding: PREMIUM_BRAND.spacing['2xl'],
        boxShadow: `0 20px 40px ${PREMIUM_BRAND.colors.primary.midnight}10`,
        transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        border: `1px solid ${PREMIUM_BRAND.colors.secondary.gold}20`,
        position: 'relative',
        overflow: 'hidden'
      },
      hover: {
        transform: 'translateY(-5px) scale(1.01)',
        boxShadow: `0 30px 60px ${PREMIUM_BRAND.colors.primary.midnight}15`,
        border: `1px solid ${PREMIUM_BRAND.colors.secondary.gold}40`
      }
    }
  },

  // Input Styles
  inputs: {
    premium: {
      base: {
        backgroundColor: PREMIUM_BRAND.colors.luxury.pearl,
        border: `2px solid ${PREMIUM_BRAND.colors.luxury.platinum}40`,
        borderRadius: PREMIUM_BRAND.borderRadius.lg,
        padding: `${PREMIUM_BRAND.spacing.md} ${PREMIUM_BRAND.spacing.lg}`,
        fontSize: PREMIUM_BRAND.typography.body,
        color: PREMIUM_BRAND.colors.luxury.onyx,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        outline: 'none'
      },
      focus: {
        borderColor: PREMIUM_BRAND.colors.primary.royal,
        boxShadow: `0 0 0 3px ${PREMIUM_BRAND.colors.primary.royal}20`
      },
      hover: {
        borderColor: PREMIUM_BRAND.colors.primary.azure
      }
    }
  }
};

// Theme System
export const THEMES = {
  light: {
    background: PREMIUM_BRAND.colors.luxury.pearl,
    surface: PREMIUM_BRAND.colors.luxury.ivory,
    text: PREMIUM_BRAND.colors.luxury.onyx,
    accent: PREMIUM_BRAND.colors.primary.royal,
    border: PREMIUM_BRAND.colors.luxury.platinum
  },

  dark: {
    background: PREMIUM_BRAND.colors.luxury.onyx,
    surface: PREMIUM_BRAND.colors.luxury.obsidian,
    text: PREMIUM_BRAND.colors.luxury.pearl,
    accent: PREMIUM_BRAND.colors.secondary.gold,
    border: PREMIUM_BRAND.colors.luxury.platinum
  }
};

// Micro-interactions
export const MICRO_INTERACTIONS = {
  // Button ripple effect
  buttonRipple: (e, element) => {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  },

  // Smooth scroll to element
  smoothScrollTo: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Parallax effect
  parallax: (element, speed = 0.5) => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    element.style.transform = `translateY(${rate}px)`;
  }
};

// CSS Keyframes for animations
export const CSS_ANIMATIONS = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      transform: translateY(30px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

export default {
  ANIMATION_PRESETS,
  PREMIUM_COMPONENTS,
  THEMES,
  MICRO_INTERACTIONS,
  CSS_ANIMATIONS
};