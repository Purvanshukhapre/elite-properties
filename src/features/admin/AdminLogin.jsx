import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminLoginAPI } from '../../api/admin.api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const handleInputChange = (e) => {
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

    try {
      // Call admin login API (same endpoint as normal login; role must be 'admin')
      const response = await adminLoginAPI(formData);

      if (response.success && response.data && response.data.token && response.data.user && response.data.user.role === 'admin') {
        const success = setAuthState(response.data.user, response.data.token);
        if (success) {
          navigate('/admin/dashboard');
        } else {
          setError('Failed to set authentication state');
        }
      } else {
        setError(response.message || 'Invalid admin credentials or not an admin account');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background with subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black opacity-20 blur-sm"></div>
      <div className="absolute inset-0 bg-[url('/colonial-style-house-night-scene.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left visual / brand panel (luxury executive panel) */}
        <div className="hidden lg:flex flex-col justify-center text-white p-10" aria-hidden>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold text-xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900">
              EP
            </div>
            <div>
              <h2 className="text-xl font-semibold text-premium-gold font-serif">Elite Properties</h2>
              <p className="text-xs uppercase text-neutral-400 tracking-wider mt-1">Executive Console</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-3xl font-light mb-4 text-white">Executive Access Portal</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">Secure administrative gateway with privileged access to critical platform operations. Reserved for authorized executives only.</p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-premium-gold mt-1.5 flex-shrink-0"></div>
              <div className="text-sm text-neutral-400">Critical operations may affect live platform performance</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-premium-gold mt-1.5 flex-shrink-0"></div>
              <div className="text-sm text-neutral-400">All actions are logged for security and compliance</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-premium-gold mt-1.5 flex-shrink-0"></div>
              <div className="text-sm text-neutral-400">Access granted to verified administrators only</div>
            </div>
          </div>
        </div>

        {/* Right - login form (premium glass card) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-white font-bold text-2xl mb-4">
              A
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Executive Authentication</h1>
            <p className="text-sm text-neutral-400">Verify your credentials for administrative access</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50/10 border border-red-500/30 rounded-lg bg-gradient-to-r from-red-900/20 to-transparent">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-all duration-200 w-full"
                placeholder="executive@eliteproperties.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-all duration-200 w-full"
                placeholder="Enter your secure password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-premium-gold text-black font-medium rounded-lg px-6 py-3 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-premium-gold/30 w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Authenticate Executive Access'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-400">
              Need to access user portal?{' '}
              <a href="/login" className="font-medium text-premium-gold hover:underline">Sign in as client</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;