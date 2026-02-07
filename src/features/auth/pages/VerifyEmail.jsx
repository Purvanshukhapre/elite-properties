import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, forgotPassword } = useAuth();
  const otpInputRefs = useRef([]);

  const email = location.state?.email || '';

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOTPChange = (index, value) => {
    // Only allow digits
    const digit = value.replace(/[^0-9]/g, '');

    if (digit.length <= 1) {
      const newOTP = otp.split('');
      newOTP[index] = digit;
      setOtp(newOTP.join(''));

      // Auto-focus next input
      if (digit && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(pastedData);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !loading && !success) {
      handleSubmit();
    }
  }, [otp]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const res = await verifyEmail(email, otp);
      if (res && res.success) {
        setSuccess(res.message || 'Email verified successfully!');
        const redirectPath = location.state?.redirectPath;
        setTimeout(() => navigate(redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : '/login'), 1500);
      } else {
        setError(res?.message || 'Verification failed');
      }
    } catch (err) {
      console.error('Verification error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Verification failed');
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
      setLoading(true);
      // Call resend OTP API - using signup endpoint to trigger new OTP
      await forgotPassword(email);
      setResendCooldown(60);
      setError('');
      setSuccess('New verification code sent to your email');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to resend verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Brand Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-[62%] relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/20 via-transparent to-blue-950/10"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}></div>

        {/* Soft radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
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
            Almost There!
            <br />
            <span className="font-medium">Verify Your Email</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-300 font-light leading-relaxed mb-12 max-w-md animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            We've sent a verification code to your email. Enter it below to activate your account and start exploring exclusive properties.
          </p>

          {/* Trust indicators */}
          <div className="space-y-4 animate-[fadeIn_0.8s_ease-out_0.3s_both]">
            {[
              { text: 'Secure email verification' },
              { text: 'Instant account activation' },
              { text: 'Access to exclusive listings' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <div className="mt-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-teal-400 transition-colors duration-300"></div>
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
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif-display font-medium text-slate-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-slate-500 font-light text-[15px] leading-relaxed">
                We sent a code to{' '}
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
                <label className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-3 text-center">
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
                      value={otp[index] || ''}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      onPaste={handleOTPPaste}
                      className="w-full h-14 text-center text-lg font-medium bg-white border border-slate-200 rounded-xl text-slate-900 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                      disabled={loading || success}
                    />
                  ))}
                </div>

                {/* Auto-submit indicator */}
                {loading && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 animate-[fadeIn_0.3s_ease-out]">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-light">Verifying...</span>
                  </div>
                )}

                {/* Resend OTP */}
                <div className="mt-4 text-center">
                  {resendCooldown > 0 ? (
                    <p className="text-xs text-slate-400 font-light">
                      Resend code in {resendCooldown}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="text-xs text-slate-600 hover:text-slate-900 font-light transition-colors duration-200 border-b border-transparent hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Didn't receive code? Resend
                    </button>
                  )}
                </div>
              </div>

              {/* Manual submit button (optional, auto-submits on completion) */}
              <button
                type="submit"
                disabled={loading || success || otp.length !== 6}
                className="w-full h-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white font-medium rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {success ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Verified!</span>
                  </span>
                ) : (
                  'Verify Email'
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-light">
                Already verified?{' '}
                <button
                  type="button"
                  className="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200 border-b border-slate-300 hover:border-slate-900"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;