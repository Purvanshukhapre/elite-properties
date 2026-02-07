// Premium Member Experience Constants
// Consistent with public brand but deeper, richer experience

export const MEMBER_BRAND = {
  // Core brand colors - maintaining consistency with public site
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',    // Main brand blue - consistent with public site
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Premium accent - deeper, more sophisticated
  accent: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',    // Teal accent for premium feel
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  
  // Rich neutral palette for depth
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  
  // Premium gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    premium: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)',
    hero: 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)',
    subtle: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  }
};

export const MEMBER_TYPOGRAPHY = {
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    display: 'Playfair Display, serif'  // Premium font for headlines
  },
  
  scale: {
    display: {
      '4xl': { 
        fontFamily: 'Playfair Display, serif',
        fontSize: '2.75rem', 
        lineHeight: '1.1', 
        fontWeight: '700',
        letterSpacing: '-0.025em'
      },
      '3xl': { 
        fontFamily: 'Playfair Display, serif',
        fontSize: '2.25rem', 
        lineHeight: '1.15', 
        fontWeight: '600',
        letterSpacing: '-0.02em'
      },
      '2xl': { 
        fontSize: '1.875rem', 
        lineHeight: '1.2', 
        fontWeight: '700',
        letterSpacing: '-0.015em'
      },
    },
    heading: {
      xl: { fontSize: '1.5rem', lineHeight: '1.25', fontWeight: '700' },
      lg: { fontSize: '1.25rem', lineHeight: '1.3', fontWeight: '600' },
      md: { fontSize: '1.125rem', lineHeight: '1.35', fontWeight: '600' },
      sm: { fontSize: '1rem', lineHeight: '1.4', fontWeight: '600' },
    },
    body: {
      lg: { fontSize: '1.125rem', lineHeight: '1.55', fontWeight: '400' },
      md: { fontSize: '1rem', lineHeight: '1.6', fontWeight: '400' },
      sm: { fontSize: '0.875rem', lineHeight: '1.65', fontWeight: '400' },
      xs: { fontSize: '0.75rem', lineHeight: '1.7', fontWeight: '400' },
    }
  }
};

export const MEMBER_SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem'
};

// Animation configuration
export const MEMBER_ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
};

export default {
  brand: MEMBER_BRAND,
  typography: MEMBER_TYPOGRAPHY,
  spacing: MEMBER_SPACING,
  animations: MEMBER_ANIMATIONS
};