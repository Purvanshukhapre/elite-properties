// Elite Properties Polish Design System
// Unified design language for premium, consistent user experience

// Unified Color Palette - Luxury Consistency
export const POLISH_COLORS = {
  // Primary Luxury Palette
  primary: {
    midnight: '#0F172A',      // Deep foundation
    sapphire: '#1E3A8A',      // Rich accent
    royal: '#3B82F6',         // Main action color
    azure: '#60A5FA',         // Light accent
  },
  
  // Secondary Sophistication
  secondary: {
    amethyst: '#8B5CF6',      // Premium purple
    emerald: '#10B981',       // Success green
    gold: '#F59E0B',          // Luxury gold
    platinum: '#9CA3AF',      // Elegant neutral
  },
  
  // Luxury Foundations
  luxury: {
    onyx: '#111827',          // Deep text
    obsidian: '#1F2937',      // Premium backgrounds
    pearl: '#F9FAFB',         // Clean luxury
    ivory: '#FEF7ED',         // Warm subtle
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  }
};

// Unified Typography System - Consistent Hierarchy
export const POLISH_TYPOGRAPHY = {
  // Display Fonts - Premium Headlines
  display: {
    family: "'Playfair Display', serif",
    weights: [400, 500, 600, 700, 800, 900],
    sizes: {
      '4xl': '2.25rem',    // 36px - Hero headlines
      '3xl': '1.875rem',   // 30px - Section titles
      '2xl': '1.5rem',     // 24px - Sub-headers
      xl: '1.25rem',       // 20px - Card titles
      lg: '1.125rem'       // 18px - Emphasis
    },
    lineHeight: {
      tight: '1.1',
      normal: '1.2',
      relaxed: '1.3'
    }
  },
  
  // Body Fonts - Readable Content
  body: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: [300, 400, 500, 600, 700],
    sizes: {
      base: '1rem',        // 16px - Body text
      sm: '0.875rem',      // 14px - Secondary text
      xs: '0.75rem'        // 12px - Metadata
    },
    lineHeight: {
      snug: '1.4',
      normal: '1.6',
      relaxed: '1.8'
    }
  }
};

// Unified Spacing System - Rhythmic Consistency
export const POLISH_SPACING = {
  // Base scale - 8px system
  xs: '0.25rem',      // 4px
  sm: '0.5rem',       // 8px
  md: '1rem',         // 16px
  lg: '1.5rem',       // 24px
  xl: '2rem',         // 32px
  '2xl': '3rem',      // 48px
  '3xl': '4rem',      // 64px
  '4xl': '6rem'       // 96px
};

// Unified Border Radius - Elegant Curves
export const POLISH_RADIUS = {
  none: '0',
  sm: '0.125rem',     // 2px
  md: '0.25rem',      // 4px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px'
};

// Unified Shadows - Premium Depth
export const POLISH_SHADOWS = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
};

// Premium Component Styles - Consistent Interactions
export const POLISH_COMPONENTS = {
  // Buttons - Unified Style
  buttons: {
    primary: {
      base: {
        backgroundColor: POLISH_COLORS.primary.royal,
        color: POLISH_COLORS.luxury.pearl,
        padding: `${POLISH_SPACING.md} ${POLISH_SPACING.xl}`,
        borderRadius: POLISH_RADIUS.lg,
        fontWeight: '600',
        fontSize: POLISH_TYPOGRAPHY.body.sizes.base,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        position: 'relative',
        overflow: 'hidden'
      },
      hover: {
        backgroundColor: POLISH_COLORS.primary.sapphire,
        transform: 'translateY(-2px)',
        boxShadow: POLISH_SHADOWS.xl
      }
    },
    
    secondary: {
      base: {
        backgroundColor: 'transparent',
        color: POLISH_COLORS.primary.royal,
        padding: `${POLISH_SPACING.md} ${POLISH_SPACING.xl}`,
        borderRadius: POLISH_RADIUS.lg,
        fontWeight: '600',
        fontSize: POLISH_TYPOGRAPHY.body.sizes.base,
        border: `2px solid ${POLISH_COLORS.primary.royal}`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
      },
      hover: {
        backgroundColor: POLISH_COLORS.primary.royal,
        color: POLISH_COLORS.luxury.pearl,
        transform: 'translateY(-2px)',
        boxShadow: POLISH_SHADOWS.lg
      }
    },
    
    luxury: {
      base: {
        backgroundColor: POLISH_COLORS.secondary.gold,
        color: POLISH_COLORS.luxury.onyx,
        padding: `${POLISH_SPACING.lg} ${POLISH_SPACING['2xl']}`,
        borderRadius: POLISH_RADIUS.xl,
        fontWeight: '700',
        fontSize: POLISH_TYPOGRAPHY.body.sizes.lg,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        position: 'relative'
      },
      hover: {
        backgroundColor: POLISH_COLORS.secondary.amethyst,
        color: POLISH_COLORS.luxury.pearl,
        transform: 'translateY(-3px) scale(1.02)',
        boxShadow: `0 25px 50px ${POLISH_COLORS.secondary.amethyst}40`
      }
    }
  },
  
  // Cards - Consistent Elevation
  cards: {
    premium: {
      base: {
        backgroundColor: POLISH_COLORS.luxury.pearl,
        borderRadius: POLISH_RADIUS['2xl'],
        padding: POLISH_SPACING.xl,
        boxShadow: POLISH_SHADOWS.lg,
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        border: `1px solid ${POLISH_COLORS.luxury.platinum}20`,
        position: 'relative'
      },
      hover: {
        transform: 'translateY(-8px)',
        boxShadow: POLISH_SHADOWS['2xl']
      }
    }
  },
  
  // Inputs - Unified Form Elements
  inputs: {
    premium: {
      base: {
        backgroundColor: POLISH_COLORS.luxury.pearl,
        border: `2px solid ${POLISH_COLORS.luxury.platinum}40`,
        borderRadius: POLISH_RADIUS.lg,
        padding: `${POLISH_SPACING.md} ${POLISH_SPACING.lg}`,
        fontSize: POLISH_TYPOGRAPHY.body.sizes.base,
        color: POLISH_COLORS.luxury.onyx,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        outline: 'none'
      },
      focus: {
        borderColor: POLISH_COLORS.primary.royal,
        boxShadow: `0 0 0 3px ${POLISH_COLORS.primary.royal}20`
      }
    }
  }
};

// Animation Presets - Sophisticated Motion
export const POLISH_ANIMATIONS = {
  // Entrance Animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  slideUp: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -30, opacity: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  // Hover Effects
  hoverLift: {
    whileHover: { 
      y: -6,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.2 } 
    }
  },
  
  hoverGlow: {
    whileHover: { 
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  }
};

// Utility Functions
export const getPolishColor = (category, shade) => {
  return POLISH_COLORS[category]?.[shade] || '#000000';
};

export const getPolishTypography = (type, property) => {
  return POLISH_TYPOGRAPHY[type]?.[property];
};

export const getPolishSpacing = (size) => {
  return POLISH_SPACING[size] || '0';
};

// CSS Utility Classes
export const POLISH_CSS = `
  .polish-glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .polish-gradient {
    background: linear-gradient(135deg, ${POLISH_COLORS.primary.sapphire} 0%, ${POLISH_COLORS.primary.royal} 100%);
  }
  
  .polish-text-gradient {
    background: linear-gradient(135deg, ${POLISH_COLORS.secondary.gold} 0%, ${POLISH_COLORS.secondary.amethyst} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .polish-shadow {
    box-shadow: ${POLISH_SHADOWS['2xl']};
  }
  
  .polish-hover-lift {
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  
  .polish-hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(30, 58, 138, 0.3);
  }
`;

export default {
  POLISH_COLORS,
  POLISH_TYPOGRAPHY,
  POLISH_SPACING,
  POLISH_RADIUS,
  POLISH_SHADOWS,
  POLISH_COMPONENTS,
  POLISH_ANIMATIONS,
  POLISH_CSS
};