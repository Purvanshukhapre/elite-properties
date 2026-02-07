import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/api';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    try {
      const response = await authAPI.resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      
      if (response.data.success) {
        setSuccess(response.data.message || 'Password reset successful!');
        // Clear form after successful reset
        setFormData({
          email: '',
          otp: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.data.message || 'Password reset failed');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Password reset failed');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Brand Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
        {/* Subtle radial light */}
        <div className="absolute inset-0 bg-radial-gradient(from-slate-800/20 to-transparent)"></div>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMjA2MTciLz48Y2lyY2xlIGN4PSI1JSIgY3k9IjUlIiByPSIyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48Y2lyY2xlIGN4PSI5NSUiIGN5PSI5NSUiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjxjaXJjbGUgY3g9IjIwJSIgY3k9IjgwJSIgcj0iMS41IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDEiLz48L3N2Zz4=')]"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="max-w-md">
            {/* Small label */}
            <div className="text-xs uppercase tracking-widest text-blue-300 font-medium mb-4">
              ELITE PROPERTIES
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Find property that<br />
              matches your ambition
            </h1>
            
            {/* Subline */}
            <p className="text-xl text-slate-300 mb-10 font-light">
              Buy, rent, or invest with confidence
            </p>
            
            {/* Feature bullets with icons */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-200">Verified listings</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-200">Zero brokerage focus</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-200">Trusted by thousands</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Auth Card */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600">
                Enter your email, OTP, and new password to reset your password.
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter the OTP code"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your new password"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your new password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remember your password? <button 
                  type="button"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;