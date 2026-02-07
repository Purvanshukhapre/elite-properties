/**
 * Application Constants
 * 
 * Centralized constants used throughout the application
 */

// Brand Identity Constants
export const BRAND = {
  name: 'Elite Properties',
  tagline: 'Residential & Commercial Real Estate',
  slogan: 'Find Property That Matches Your Ambition',
  description: 'Exceptional real estate solutions for clients seeking quality and value'
};

// Color Palette
export const COLORS = {
  primary: {
    background: '#FFFFFF',      // White background
    surface: '#F9FAFB',         // Soft gray surface
    textPrimary: '#111827',     // Primary text
    textSecondary: '#6B7280',   // Secondary text
  },
  accent: {
    primaryBlue: '#2563EB',     // Primary blue accent
    secondaryBlue: '#1D4ED8',   // Secondary blue accent
    accentPurple: '#7C3AED',    // Purple accent
    accentTeal: '#0D9488',      // Teal accent
    accentOrange: '#EA580C',    // Orange accent
    accentGreen: '#059669',     // Green accent
    softHighlight: '#3B82F6',   // Soft highlight
    borderColor: '#E5E7EB',     // Border color
  }
};

// Typography
export const TYPOGRAPHY = {
  display: {
    fontFamily: 'Playfair Display, serif',
    weights: {
      thin: 400,
      regular: 500,
      bold: 600,
      extraBold: 700,
      black: 900
    }
  },
  body: {
    fontFamily: 'Inter, sans-serif',
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    }
  }
};

// Spacing System
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  xxxl: '4rem'
};

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
};

// Authentication Constants
export const AUTH = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user_data',
  REFRESH_TOKEN_KEY: 'refresh_token',
  PASSWORD_MIN_LENGTH: 6,
  OTP_LENGTH: 6
};

// Property Constants
export const PROPERTY = {
  STATUS: {
    AVAILABLE: 'available',
    SOLD: 'sold',
    RENTED: 'rented',
    PENDING: 'pending'
  },
  TYPES: {
    RESIDENTIAL: 'residential',
    COMMERCIAL: 'commercial',
    LAND: 'land'
  },
  PRICE_RANGES: {
    LOW: 0,
    MEDIUM: 500000,
    HIGH: 1000000,
    LUXURY: 2000000
  }
};

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  AGENT: 'agent'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
  NOTIFICATIONS: 'notifications_enabled',
  RECENT_SEARCHES: 'recent_searches'
};

// Animation Durations
export const ANIMATION = {
  FAST: '150ms',
  MEDIUM: '300ms',
  SLOW: '500ms',
  TRANSITION: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  TERMS_REQUIRED: 'Please accept the terms and privacy policy'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check the form for errors.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTRATION_SUCCESS: 'Registration successful! Please verify your email.',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  PASSWORD_RESET_SUCCESS: 'Password reset successful!',
  PROPERTY_SAVED: 'Property saved successfully!',
  ENQUIRY_SENT: 'Enquiry sent successfully!'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  RESET_PASSWORD_OTP: '/reset-password-otp',
  DASHBOARD: '/home',
  PROFILE: '/profile',
  BUY: '/buy',
  RENT: '/rent',
  SELL: '/sell',
  PROPERTY_DETAILS: '/property/:id',
  ADMIN: '/admin'
};