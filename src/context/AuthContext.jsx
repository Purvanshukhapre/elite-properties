import React, { createContext, useContext, useEffect, useState } from 'react';
import authAPI from '../api/auth.api';
import { getProfileAPI, updateProfileAPI } from '../api/profile.api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginIntent, setLoginIntent] = useState(localStorage.getItem('loginIntent'));

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem('token');

    const restoreAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      // If we have a cached user, restore immediately without extra API calls.
      // The presence of a valid token in localStorage is sufficient proof of an active session.
      try {
        const cached = localStorage.getItem('user');
        if (cached) {
          const parsed = JSON.parse(cached);
          setUser(parsed);
          setIsAuthenticated(true);
          setIsAdmin(parsed.role === 'admin');
          console.log('Auth restored from cache — token verified on localStorage');
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Error parsing cached user during restoreAuth:', e);
      }

      // Only try to fetch profile if there's no cached user (first login or cache cleared).
      // This reduces unnecessary API calls and avoids 404 errors on non-existent endpoints.
      try {
        const profileRes = await getProfileAPI();
        if (profileRes && profileRes.success) {
          const userFromApi = profileRes.data;
          const transformedUser = {
            id: userFromApi.id || userFromApi._id,
            email: userFromApi.email,
            name: userFromApi.fullName || userFromApi.name,
            role: userFromApi.role,
            phoneNo: userFromApi.phoneNo || userFromApi.phone
          };

          localStorage.setItem('user', JSON.stringify(transformedUser));
          localStorage.setItem('isAdmin', (transformedUser.role === 'admin').toString());

          setUser(transformedUser);
          setIsAuthenticated(true);
          setIsAdmin(transformedUser.role === 'admin');
        } else {
          // Profile fetch failed — if no cached user, clear auth as a fallback
          console.warn('Profile fetch failed and no cached user available — clearing auth.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('isAdmin');
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (e) {
        console.error('Error fetching profile during restoreAuth:', e);
        // Network or unexpected error — clear auth as a fallback if no cached user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  const login = async (credentials) => {
    try {
      console.log('=== LOGIN FUNCTION CALLED ===');
      console.log('Received credentials parameter:', credentials);
      console.log('Type of credentials:', typeof credentials);
      console.log('Credentials keys:', Object.keys(credentials));
      console.log('Full credentials object:', JSON.stringify(credentials, null, 2));

      // Check if credentials is actually the user object
      if (credentials.id && credentials.fullName && credentials.role) {
        console.error('ERROR: Received user object instead of credentials!');
        console.error('This suggests the login function is being called with cached user data');
        throw new Error('Invalid login data - received user object instead of credentials');
      }

      // Validate that we have the required fields
      if (!credentials.email || !credentials.password) {
        console.error('ERROR: Missing required credentials fields');
        console.error('Email:', credentials.email);
        console.error('Password:', credentials.password ? '[PROVIDED]' : '[MISSING]');
        throw new Error('Email and password are required');
      }

      console.log('Sending login credentials to API:', {
        email: credentials.email,
        password: '[HIDDEN]'
      });

      // Call the actual API
      const response = await authAPI.login({
        email: credentials.email,
        password: credentials.password
      });

      const respData = response?.data || {};
      if (respData && respData.success && respData.token) {
        const token = respData.token;

        // Persist token first so axiosInstance can use it for subsequent requests
        localStorage.setItem('token', token);

        // Fetch authoritative profile from /api/profile
        try {
          const profileRes = await getProfileAPI();
          if (profileRes && profileRes.success) {
            const userFromApi = profileRes.data;
            const transformedUser = {
              id: userFromApi.id || userFromApi._id,
              email: userFromApi.email,
              name: userFromApi.fullName || userFromApi.name,
              role: userFromApi.role,
              phoneNo: userFromApi.phoneNo || userFromApi.phone
            };

            const isAdminUser = transformedUser.role === 'admin';
            localStorage.setItem('user', JSON.stringify(transformedUser));
            localStorage.setItem('isAdmin', isAdminUser.toString());

            setUser(transformedUser);
            setIsAuthenticated(true);
            setIsAdmin(isAdminUser);

            return response;
          }
        } catch (e) {
          console.warn('Login: profile fetch failed after storing token, falling back to response user if available', e);
        }

        // Fallback: if profile fetch failed, use user sent in login response
        const userData = respData.user || {};
        const transformedUser = {
          id: userData.id || userData._id,
          email: userData.email,
          name: userData.fullName || userData.name,
          role: userData.role,
          phoneNo: userData.phoneNo || userData.phone
        };
        const isAdminUser = transformedUser.role === 'admin';
        localStorage.setItem('user', JSON.stringify(transformedUser));
        localStorage.setItem('isAdmin', isAdminUser.toString());
        setUser(transformedUser);
        setIsAuthenticated(true);
        setIsAdmin(isAdminUser);

        return response;
      } else {
        throw new Error(respData?.message || 'Login failed');
      }
    } catch (error) {
      console.error('=== LOGIN ERROR DETAILS ===');
      console.error('Error object:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);

      if (error.response) {
        console.error('Server responded with error:');
        console.error('Status:', error.response.status);
        console.error('Status text:', error.response.statusText);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);
      }

      if (error.request) {
        console.error('Request made but no response received:');
        console.error('Request:', error.request);
      }

      console.error('=== END ERROR DETAILS ===');

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
          case 500: {
            // For 500 errors, let's show the actual server message if available
            const serverMessage = error.response.data?.message || error.response.data?.error || 'Internal server error';
            throw new Error(`Server Error (500): ${serverMessage}`);
          }
          case 401:
            throw new Error('Invalid email or password.');
          case 400:
            throw new Error(error.response.data?.message || 'Bad request. Please check your input.');
          case 404:
            throw new Error('Login service not found. Please contact support.');
          default:
            throw new Error(error.response.data?.message || `Server error (${error.response.status})`);
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error. Please check your connection.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Login failed');
      }
    }
  };

  const signup = async (userData) => {
    try {
      console.log('Signup attempt with data:', userData);
      console.log('Full signup data:', JSON.stringify(userData, null, 2));

      // Transform frontend data to match API expectations
      const apiUserData = {
        fullName: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        phoneNo: userData.phoneNo || '',
        password: userData.password
      };

      console.log('Sending to API:', apiUserData);

      const response = await authAPI.signup(apiUserData);

      console.log('Signup API Response:', response);
      console.log('Response data:', response.data);

      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Signup failed');
      }
    } catch (error) {
      console.error('=== SIGNUP ERROR DETAILS ===');
      console.error('Error object:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);

      if (error.response) {
        console.error('Server responded with error:');
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }

      console.error('=== END ERROR DETAILS ===');

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
          case 500: {
            const serverMessage = error.response.data?.message || error.response.data?.error || 'Internal server error';
            throw new Error(`Server Error (500): ${serverMessage}`);
          }
          case 400:
            throw new Error(error.response.data?.message || 'Bad request. Please check your input.');
          case 409:
            throw new Error('User already exists with this email.');
          default:
            throw new Error(error.response.data?.message || `Server error (${error.response.status})`);
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error. Please check your connection.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Signup failed');
      }
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      // Note: The API uses verifyEmailOTP, but we'll adapt the function name
      const response = await authAPI.verifyEmailOTP({ email, otp });
      const respData = response?.data || {};
      if (respData && respData.success) return respData;
      throw new Error(respData?.message || 'Email verification failed');
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      const respData = response?.data || {};
      if (respData && respData.success) return respData;
      throw new Error(respData?.message || 'Failed to send reset link');
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await authAPI.resetPassword({ email, otp, newPassword });
      const respData = response?.data || {};
      if (respData && respData.success) return respData;
      throw new Error(respData?.message || 'Password reset failed');
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const updateLoginIntent = (intent) => {
    if (intent) {
      localStorage.setItem('loginIntent', intent);
      setLoginIntent(intent);
    } else {
      localStorage.removeItem('loginIntent');
      setLoginIntent(null);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loginIntent');

    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoginIntent(null);
  };

  const updateUserData = async (userData) => {
    try {
      const response = await updateProfileAPI(userData);

      if (response && response.success) {
        const updatedUser = response.data;
        const transformedUser = {
          id: updatedUser.id || updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.fullName || updatedUser.name,
          role: updatedUser.role,
          phoneNo: updatedUser.phoneNo || updatedUser.phone
        };
        setUser(transformedUser);
        localStorage.setItem('user', JSON.stringify(transformedUser));
        return response;
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Function to manually set authentication state (used after direct API calls)
  const setAuthState = (userData, token) => {
    try {
      // Transform user data if needed
      const transformedUser = {
        id: userData.id,
        email: userData.email,
        name: userData.fullName || userData.name,
        role: userData.role,
        phoneNo: userData.phoneNo
      };

      // Determine if user is admin based on role
      const isAdminUser = userData.role === 'admin';

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(transformedUser));
      localStorage.setItem('isAdmin', isAdminUser.toString());

      // Update state
      setUser(transformedUser);
      setIsAuthenticated(true);
      setIsAdmin(isAdminUser);

      console.log('Auth state updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating auth state:', error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    signup,
    verifyEmail,
    forgotPassword,
    resetPassword,
    logout,
    updateUserData,
    setAuthState,
    loginIntent,
    setLoginIntent: updateLoginIntent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};