import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginIntent } = useAuth();

  // Parse redirect URL from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use AuthContext login to handle token storage and profile fetch
      await login({ email: formData.email, password: formData.password });

      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

      if (loginIntent === 'postProperty') {
        navigate('/user/seller/post-property');
      } else if (redirectPath) {
        navigate(redirectPath);
      } else if (storedUser?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Brand Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-[62%] relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/10"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}></div>

        {/* Soft radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

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
            Your Gateway to
            <br />
            <span className="font-medium">Exceptional Properties</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-300 font-light leading-relaxed mb-12 max-w-md animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            Access exclusive listings, manage your portfolio, and discover your next investment opportunity.
          </p>

          {/* Trust indicators */}
          <div className="space-y-4 animate-[fadeIn_0.8s_ease-out_0.3s_both]">
            {[
              { text: 'Verified property listings with complete documentation' },
              { text: 'Trusted by institutional investors worldwide' },
              { text: 'Secure, encrypted transactions' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <div className="mt-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-blue-400 transition-colors duration-300"></div>
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
                Welcome Back
              </h2>
              <p className="text-slate-500 font-light text-[15px]">
                Sign in to access your account
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl animate-[slideUp_0.3s_ease-out]">
                <p className="text-red-700 text-sm font-light">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Password field */}
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
                    placeholder="Enter your password"
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
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-200 focus:ring-offset-0 transition-all duration-200 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 font-light group-hover:text-slate-900 transition-colors duration-200">
                    Remember me
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-slate-600 hover:text-slate-900 font-light transition-colors duration-200 border-b border-transparent hover:border-slate-300"
                >
                  Forgot password?
                </Link>
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
                    <span className="font-light">Signing in...</span>
                  </span>
                ) : (
                  'Sign In'
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

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-light">
                New to Elite Properties?{' '}
                <Link
                  to="/register"
                  className="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200 border-b border-slate-300 hover:border-slate-900"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;