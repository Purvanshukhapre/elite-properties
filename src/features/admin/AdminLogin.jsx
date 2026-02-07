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
    <div className="min-h-screen admin-login-bg flex items-center justify-center py-12 px-4">
      <div className="page-container">
        <div className="admin-container max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left visual / brand panel (minimal) */}
          <div className="hidden lg:flex flex-col justify-center admin-left-panel" aria-hidden>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:48,height:48,borderRadius:8,background:'#0F172A',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>EP</div>
              <div>
                <h2 className="text-lg font-semibold" style={{color:'var(--text-primary)'}}>Elite Properties</h2>
                <p className="text-xs uppercase" style={{color:'var(--text-muted)',letterSpacing:'0.06em'}}>Administrative Console</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2" style={{color:'var(--text-primary)'}}>Administrative Access</h3>
              <p className="text-sm" style={{color:'var(--text-secondary)'}}>This portal controls live platform data. Authorized personnel only.</p>
            </div>

            <div style={{marginTop:20}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:8,height:8,borderRadius:2,background: 'var(--primary-action)'}}></div>
                <div style={{color:'var(--text-secondary)',fontSize:13}}>Actions here may affect production — proceed carefully.</div>
              </div>
            </div>
          </div>

          {/* Right - login form */}
          <div className="admin-form-card">
            <div className="text-center mb-6">
              <div style={{width:56,height:56,margin:'0 auto',borderRadius:8,background:'#0F172A',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:20}}>A</div>
              <h1 className="text-2xl font-semibold mt-4" style={{color:'var(--text-primary)'}}>Administrative Access</h1>
              <p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>This portal controls live platform data. Authorized personnel only.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md">
                <p className="text-sm" style={{color:'#b91c1c'}}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label-premium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-premium w-full"
                  placeholder="admin@eliteproperties.com"
                />
              </div>

              <div>
                <label className="label-premium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="input-premium w-full"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-base btn-primary w-full"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign in as Administrator'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm" style={{color:'var(--text-secondary)'}}>
                Need to access user portal?{' '}
                <a href="/login" className="font-medium" style={{color:'var(--primary-action)'}}>Sign in here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;