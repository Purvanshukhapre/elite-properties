import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ResetPasswordWithOTP = () => {
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword, forgotPassword } = useAuth();
  const otpInputRefs = useRef([]);

  const email = location.state?.email || '';

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score: 0, label: '', color: '' };

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 5) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleOTPChange = (index, value) => {
    // Only allow digits
    const digit = value.replace(/[^0-9]/g, '');

    if (digit.length <= 1) {
      const newOTP = formData.otp.split('');
      newOTP[index] = digit;
      setFormData(prev => ({ ...prev, otp: newOTP.join('') }));

      // Auto-focus next input
      if (digit && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, otp: pastedData }));

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  const validateForm = () => {
    if (!formData.otp.trim() || formData.otp.length !== 6) {
      return 'Please enter the complete 6-digit OTP';
    }
    if (!formData.newPassword) {
      return 'Please enter a new password';
    }
    if (formData.newPassword.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const res = await resetPassword(email, formData.otp, formData.newPassword);
      if (res && res.success) {
        setSuccess(res.message || 'Password reset successful!');
        setFormData({ otp: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(res?.message || 'Password reset failed');
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

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    try {
      await forgotPassword(email);
      setResendCooldown(60);
      setError('');
      setSuccess('New OTP sent to your email');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const passwordsMatch = formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword;
  const passwordsDontMatch = formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Brand Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-[62%] relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-blue-950/10"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}></div>

        {/* Soft radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 text-white max-w-2xl">
          {/* Brand mark */}
          <div className="mb-12 animate-[fadeIn_0.6s_ease-out]">
            <div className="inline-block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium mb-3 opacity-90">
                Elite Properties
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-slate-400/60 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl xl:text-6xl font-serif-display font-light leading-[1.1] mb-6 tracking-tight animate-[fadeIn_0.8s_ease-out_0.1s_both]">
            Secure Your
            <br />
            <span className="font-medium">Account Access</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-300 font-light leading-relaxed mb-12 max-w-md animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            Create a strong new password to protect your property portfolio and personal information.
          </p>

          {/* Trust indicators */}
          <div className="space-y-4 animate-[fadeIn_0.8s_ease-out_0.3s_both]">
            {[
              { text: 'Encrypted password storage' },
              { text: 'Two-factor verification' },
              { text: 'Secure session management' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <div className="mt-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-indigo-400 transition-colors duration-300"></div>
                </div>
                <p className="text-slate-300 font-light text-[15px] leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-[38%] flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md animate-[fadeIn_0.6s_ease-out_0.2s_both]">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-2xl font-serif-display font-medium text-slate-900 mb-2">Elite Properties</h1>
            <div className="w-12 h-[2px] bg-gradient-to-r from-slate-300 to-transparent rounded-full mx-auto"></div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif-display font-medium text-slate-900 mb-2">
                Reset Password
              </h2>
              <p className="text-slate-500 font-light text-[15px] leading-relaxed">
                Enter the verification code sent to{' '}
                <span className="font-medium text-slate-700">{email}</span>
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl animate-[slideUp_0.3s_ease-out]">
                <p className="text-red-700 text-sm font-light">{error}</p>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl animate-[slideUp_0.3s_ease-out]">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700 text-sm font-light">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-3">
                  Verification Code
                </label>
                <div className="flex gap-2 justify-between">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={formData.otp[index] || ''}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      onPaste={handleOTPPaste}
                      className="w-full h-14 text-center text-lg font-medium bg-white border border-slate-200 rounded-xl text-slate-900 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                      disabled={loading || success}
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <div className="mt-3 text-center">
                  {resendCooldown > 0 ? (
                    <p className="text-xs text-slate-400 font-light">
                      Resend code in {resendCooldown}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-xs text-slate-600 hover:text-slate-900 font-light transition-colors duration-200 border-b border-transparent hover:border-slate-300"
                    >
                      Didn't receive code? Resend
                    </button>
                  )}
                </div>
              </div>

              {/* New Password field with strength indicator */}
              <div className="group">
                <label
                  htmlFor="newPassword"
                  className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pr-12 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                    placeholder="Create a strong password"
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {formData.newPassword && (
                  <div className="mt-3 animate-[slideUp_0.3s_ease-out]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500 font-light">Password strength</span>
                      <span className={`text-xs font-medium ${passwordStrength.label === 'Weak' ? 'text-red-600' :
                          passwordStrength.label === 'Fair' ? 'text-orange-600' :
                            passwordStrength.label === 'Good' ? 'text-blue-600' :
                              'text-green-600'
                        }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5, 6].map((bar) => (
                        <div
                          key={bar}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${bar <= passwordStrength.score ? passwordStrength.color : 'bg-slate-200'
                            }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="group">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 bg-white border rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-4 hover:border-slate-300 ${passwordsMatch ? 'border-green-300 focus:border-green-400 focus:ring-green-100' :
                        passwordsDontMatch ? 'border-red-300 focus:border-red-400 focus:ring-red-100' :
                          'border-slate-200 focus:border-slate-400 focus:ring-slate-100'
                      }`}
                    placeholder="Confirm your new password"
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Match indicator */}
                  {passwordsMatch && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 text-green-500 animate-[fadeIn_0.2s_ease-out]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full h-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white font-medium rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] mt-8"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-light">Resetting password...</span>
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Password reset!</span>
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            {/* Back to login link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-light">
                Remember your password?{' '}
                <button
                  type="button"
                  className="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200 border-b border-slate-300 hover:border-slate-900"
                  onClick={() => navigate('/login')}
                >
                  Back to Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordWithOTP;