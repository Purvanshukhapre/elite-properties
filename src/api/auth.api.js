import axiosInstance from './axiosInstance';

// Authentication API endpoints
export const authAPI = {
  // User signup
  signup: (userData) => {
    console.log('Sending signup data:', userData);
    return axiosInstance.post('/api/auth/signup', userData);
  },
  
  // User login
  login: (credentials) => {
    console.log('Sending login credentials:', credentials);
    return axiosInstance.post('/api/auth/login', credentials);
  },
  
  // Verify email with OTP
  verifyEmailOTP: (verificationData) => {
    console.log('Sending email verification data:', verificationData);
    return axiosInstance.post('/api/auth/verify-email-otp', verificationData);
  },
  
  // Forgot password - request OTP
  forgotPassword: (emailData) => {
    console.log('Sending forgot password data:', emailData);
    return axiosInstance.post('/api/auth/forgot-password', emailData);
  },
  
  // Reset password with OTP
  resetPassword: (resetData) => {
    console.log('Sending reset password data:', resetData);
    return axiosInstance.post('/api/auth/reset-password', resetData);
  },
};

export default authAPI;