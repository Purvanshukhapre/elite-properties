/**
 * Form Validation Utilities
 * 
 * Reusable validation functions for forms across the application
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number validation regex (supports various formats)
const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

// Password validation (at least 6 characters)
const PASSWORD_MIN_LENGTH = 6;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePhone = (phone) => {
  return PHONE_REGEX.test(phone.replace(/\s/g, ''));
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePassword = (password) => {
  return password.length >= PASSWORD_MIN_LENGTH;
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} - True if not empty, false otherwise
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate password confirmation match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} - True if matches, false otherwise
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validate terms acceptance
 * @param {boolean} accepted - Terms acceptance status
 * @returns {boolean} - True if accepted, false otherwise
 */
export const validateTermsAcceptance = (accepted) => {
  return accepted === true;
};

/**
 * Comprehensive form validation for registration
 * @param {Object} formData - Registration form data
 * @returns {string|null} - Error message or null if valid
 */
export const validateRegistrationForm = (formData) => {
  if (!validateRequired(formData.firstName)) {
    return 'First name is required';
  }
  
  if (!validateRequired(formData.lastName)) {
    return 'Last name is required';
  }
  
  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!validatePhone(formData.phoneNo)) {
    return 'Please enter a valid phone number';
  }
  
  if (!validatePassword(formData.password)) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }
  
  if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    return 'Passwords do not match';
  }
  
  if (!validateTermsAcceptance(formData.acceptTerms)) {
    return 'Please accept the terms and privacy policy';
  }
  
  return null;
};

/**
 * Comprehensive form validation for login
 * @param {Object} formData - Login form data
 * @returns {string|null} - Error message or null if valid
 */
export const validateLoginForm = (formData) => {
  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!validateRequired(formData.password)) {
    return 'Password is required';
  }
  
  return null;
};

/**
 * Comprehensive form validation for password reset
 * @param {Object} formData - Password reset form data
 * @returns {string|null} - Error message or null if valid
 */
export const validatePasswordResetForm = (formData) => {
  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!validateRequired(formData.otp)) {
    return 'OTP is required';
  }
  
  if (!validatePassword(formData.newPassword)) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }
  
  if (!validatePasswordMatch(formData.newPassword, formData.confirmPassword)) {
    return 'Passwords do not match';
  }
  
  return null;
};