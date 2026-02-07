import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();

  // Capture redirect intent from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score: 0, label: '', color: '' };

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Determine label and color
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 5) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update password strength on password change
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!formData.acceptTerms) {
      return 'Please accept the terms and privacy policy';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const resp = await signup(formData);

      if (resp && resp.success) {
        alert(resp.message || 'Registration successful! Please verify your email.');
        navigate('/verify-email', {
          state: {
            email: formData.email,
            redirectPath: redirectPath
          }
        });
      } else {
        setError(resp?.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Brand Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-[62%] relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-blue-950/10"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}></div>

        {/* Soft radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
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
            Begin Your Journey
            <br />
            <span className="font-medium">With Elite Properties</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-300 font-light leading-relaxed mb-12 max-w-md animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            Join thousands of investors and property seekers who trust our platform for their real estate needs.
          </p>

          {/* Trust indicators */}
          <div className="space-y-4 animate-[fadeIn_0.8s_ease-out_0.3s_both]">
            {[
              { text: 'Instant access to exclusive property listings' },
              { text: 'Secure account with encrypted data protection' },
              { text: 'Personalized property recommendations' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <div className="mt-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-purple-400 transition-colors duration-300"></div>
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
                Create Account
              </h2>
              <p className="text-slate-500 font-light text-[15px]">
                Join Elite Properties today
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl animate-[slideUp_0.3s_ease-out]">
                <p className="text-red-700 text-sm font-light">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label
                    htmlFor="firstName"
                    className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                    placeholder="John"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="lastName"
                    className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Phone field */}
              <div className="group">
                <label
                  htmlFor="phoneNo"
                  className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  required
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Password field with strength indicator */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-xs uppercase tracking-wider text-slate-600 font-medium mb-2.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pr-12 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 hover:border-slate-300"
                    placeholder="Create a strong password"
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
                {formData.password && (
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
                  Confirm Password
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
                    placeholder="Confirm your password"
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

              {/* Terms checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-200 focus:ring-offset-0 transition-all duration-200 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-sm text-slate-600 font-light leading-relaxed">
                  I accept the{' '}
                  <a href="#" className="text-slate-900 hover:text-slate-700 font-medium border-b border-slate-300 hover:border-slate-900 transition-colors duration-200">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-slate-900 hover:text-slate-700 font-medium border-b border-slate-300 hover:border-slate-900 transition-colors duration-200">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white font-medium rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] mt-8"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-light">Creating account...</span>
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-xs uppercase tracking-wider text-slate-400 font-light">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social signup */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert('Google signup would be implemented here')}
                className="flex items-center justify-center gap-2 h-11 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4" />
                </svg>
                <span className="text-sm text-slate-600 font-light group-hover:text-slate-900 transition-colors duration-200">Google</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Facebook signup would be implemented here')}
                className="flex items-center justify-center gap-2 h-11 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group"
              >
                <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm text-slate-600 font-light group-hover:text-slate-900 transition-colors duration-200">Facebook</span>
              </button>
            </div>

            {/* Sign in link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-light">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200 border-b border-slate-300 hover:border-slate-900"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;