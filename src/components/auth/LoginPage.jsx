import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BRAND } from '../../constants/brand';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email, password });
      // Use the auth context login method with proper credentials object
      const result = await login({ email, password });
      console.log('Login API successful:', result);
      console.log('Login successful, redirecting to /dashboard');
      // The redirect will be handled by the AuthContext or ProtectedRoute
    } catch (err) {
      console.error('Login API error caught:', err);
      console.error('Error message:', err.message);
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Google login attempt');
      // Simulate Google login
      const user = {
        id: 2,
        email: 'google.user@example.com',
        name: 'Google User',
        role: 'user'
      };
      
      localStorage.setItem('token', 'google-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', 'false');
      
      console.log('Google login successful, redirecting to /home');
      window.location.href = '/home';
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Premium Brand Panel */}
      <div className="hidden lg:flex lg:w-2/3 xl:w-3/5 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Image with Sophisticated Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
          }}
        ></div>
        
        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90"></div>
        
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-16 lg:p-24 xl:p-32 text-white brand-panel-content">
          {/* Premium Logo */}
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3 text-white">{BRAND.name}</h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-80"></div>
          </div>
          
          {/* Refined Brand Statement */}
          <h2 className="text-3xl md:text-4xl font-light mb-8 max-w-lg leading-tight text-slate-100">
            Connecting Global Real Estate Excellence
          </h2>
          
          {/* Value-Based Trust Elements */}
          <div className="space-y-5 max-w-md">
            <div className="flex items-start group">
              <div className="flex-shrink-0 mt-1.5">
                <div className="w-2 h-2 bg-cyan-400 rounded-full transition-all duration-300 group-hover:scale-125"></div>
              </div>
              <p className="ml-4 text-slate-300 font-light tracking-wide">Verified property listings with documented ownership</p>
            </div>
            
            <div className="flex items-start group">
              <div className="flex-shrink-0 mt-1.5">
                <div className="w-2 h-2 bg-cyan-400 rounded-full transition-all duration-300 group-hover:scale-125"></div>
              </div>
              <p className="ml-4 text-slate-300 font-light tracking-wide">Trusted by institutional investors & private owners</p>
            </div>
            
            <div className="flex items-start group">
              <div className="flex-shrink-0 mt-1.5">
                <div className="w-2 h-2 bg-cyan-400 rounded-full transition-all duration-300 group-hover:scale-125"></div>
              </div>
              <p className="ml-4 text-slate-300 font-light tracking-wide">Residential & commercial markets worldwide</p>
            </div>
          </div>
          
          {/* Sophisticated Decorative Elements */}
          <div className="absolute top-8 right-8 opacity-5">
            <div className="text-9xl font-thin text-white tracking-widest">ELITE</div>
          </div>
          
          <div className="absolute bottom-12 left-8 opacity-10">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Premium Login Form */}
      <div className="w-full lg:w-1/3 xl:w-2/5 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white form-container">
        <div className="w-full max-w-sm animate-fade-in form-card p-7 bg-white/95 backdrop-blur-sm rounded-[20px] border border-slate-200/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-500">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{BRAND.name}</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-2"></div>
          </div>
          
          {/* Refined Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 text-sm font-light">Access your property portfolio</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Refined Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-light text-slate-600 mb-2.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-[14px] focus:ring-2 focus:ring-slate-400 focus:border-slate-300 transition-all duration-300 bg-white/80 backdrop-blur-sm premium-input shadow-sm hover:border-slate-300"
                placeholder="your.email@company.com"
                required
              />
            </div>

            {/* Refined Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-light text-slate-600 mb-2.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 border border-slate-200 rounded-[14px] focus:ring-2 focus:ring-slate-400 focus:border-slate-300 transition-all duration-300 bg-white/80 backdrop-blur-sm premium-input shadow-sm hover:border-slate-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Refined Remember Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-slate-600 rounded border-slate-300 focus:ring-slate-500 focus:ring-2 transition-all duration-200 group-hover:border-slate-400" 
                />
                <span className="ml-2.5 text-sm text-slate-600 font-light tracking-wide group-hover:text-slate-700 transition-colors">Stay signed in</span>
              </label>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 transition-colors premium-link font-light">
                Reset password
              </a>
            </div>

            {/* Premium Primary Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden group bg-gradient-to-br from-slate-800 to-slate-900 text-white font-medium py-3.5 px-4 rounded-[14px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_-4px_rgba(0,0,0,0.25)] focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 premium-button before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                    Authenticating...
                  </span>
                ) : 'Access Portfolio'}
              </span>
            </button>
          </form>

          {/* Refined Divider */}
          <div className="my-7 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white/95 text-xs text-slate-400 font-light tracking-wider uppercase">alternative</span>
            </div>
          </div>

          {/* Secondary Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-[14px] text-slate-600 font-light hover:bg-slate-50/50 hover:border-slate-300 focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed google-button shadow-sm"
          >
            <FaGoogle className="text-red-400" size={16} />
            <span className="text-sm">Continue with Google</span>
          </button>

          {/* Subtle Sign Up Prompt */}
          <div className="mt-7 text-center">
            <p className="text-slate-500 text-xs font-light tracking-wide">
              New to Elite Properties?{' '}
              <Link 
                to="/register" 
                className="text-slate-700 hover:text-slate-900 font-normal transition-colors premium-link border-b border-slate-300 border-dashed hover:border-solid"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;