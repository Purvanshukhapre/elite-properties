// Premium Brand Identity System for Elite Properties
// Sophisticated color palette with deep jewel tones and luxury aesthetics

export const PREMIUM_BRAND = {
  // Primary Color Palette - Deep Jewel Tones
  colors: {
    primary: {
      midnight: '#0F172A',      // Deep midnight blue for luxury foundations
      sapphire: '#1E3A8A',      // Rich sapphire blue for premium accents
      royal: '#3B82F6',         // Royal blue for primary actions
      azure: '#60A5FA',         // Azure blue for secondary elements
    },
    secondary: {
      amethyst: '#8B5CF6',      // Amethyst purple for sophistication
      emerald: '#10B981',       // Emerald green for success states
      gold: '#F59E0B',          // Warm gold for premium highlights
      platinum: '#9CA3AF',      // Platinum silver for elegant neutrals
    },
    luxury: {
      onyx: '#111827',          // Deep onyx black for ultimate sophistication
      obsidian: '#1F2937',      // Obsidian gray for premium backgrounds
      pearl: '#F9FAFB',         // Pearl white for clean luxury
      ivory: '#FEF7ED',         // Warm ivory for subtle backgrounds
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    }
  },

  // Typography System - Luxury Fonts
  typography: {
    fonts: {
      display: {
        family: "'Playfair Display', serif",
        weights: [400, 500, 600, 700, 800, 900],
        sizes: {
          xs: '0.75rem',      // 12px
          sm: '0.875rem',     // 14px
          base: '1rem',       // 16px
          lg: '1.125rem',     // 18px
          xl: '1.25rem',      // 20px
          '2xl': '1.5rem',    // 24px
          '3xl': '1.875rem',  // 30px
          '4xl': '2.25rem',   // 36px
          '5xl': '3rem',      // 48px
          '6xl': '3.75rem',   // 60px
          '7xl': '4.5rem',    // 72px
          '8xl': '6rem',      // 96px
          '9xl': '8rem'       // 128px
        }
      },
      body: {
        family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        weights: [300, 400, 500, 600, 700],
        sizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem'
        }
      }
    },
    leading: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // Spacing System - Sophisticated Scale
  spacing: {
    xs: '0.25rem',      // 4px
    sm: '0.5rem',       // 8px
    md: '1rem',         // 16px
    lg: '1.5rem',       // 24px
    xl: '2rem',         // 32px
    '2xl': '3rem',      // 48px
    '3xl': '4rem',      // 64px
    '4xl': '6rem',      // 96px
    '5xl': '8rem',      // 128px
    '6xl': '12rem',     // 192px
    '7xl': '16rem',     // 256px
    '8xl': '20rem'      // 320px
  },

  // Border Radius - Elegant Curves
  borderRadius: {
    none: '0',
    sm: '0.125rem',     // 2px
    md: '0.25rem',      // 4px
    lg: '0.5rem',       // 8px
    xl: '0.75rem',      // 12px
    '2xl': '1rem',      // 16px
    '3xl': '1.5rem',    // 24px
    full: '9999px'
  },

  // Shadows - Premium Depth
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },

  // Global Brand Guidelines
  brand: {
    name: 'Elite Properties',
    tagline: 'Where Luxury Meets Investment',
    description: 'The premier global destination for luxury real estate investment',
    values: [
      'Excellence',
      'Sophistication', 
      'Trust',
      'Innovation',
      'Global Perspective'
    ],
    mission: 'To connect discerning investors with the world\'s most exceptional properties',
    vision: 'To be the definitive platform for luxury real estate investment globally'
  }
};

// Utility functions for brand system
export const getBrandColor = (category, shade) => {
  return PREMIUM_BRAND.colors[category]?.[shade] || '#000000';
};

export const getTypography = (type, property) => {
  return PREMIUM_BRAND.typography[type]?.[property];
};

export const getSpacing = (size) => {
  return PREMIUM_BRAND.spacing[size] || '0';
};

export default PREMIUM_BRAND;