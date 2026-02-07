import axiosInstance from './axiosInstance';

// Profile API functions
export const getProfileAPI = async () => {
  // Try primary endpoint, then fall back to common alternatives when a 404 is returned.
  const endpoints = ['/api/profile', '/api/auth/profile', '/api/auth/me', '/api/user/profile'];
  for (const ep of endpoints) {
    try {
      const response = await axiosInstance.get(ep);
      return { success: true, data: response.data };
    } catch (error) {
      // If not found, try next endpoint. For other errors, return immediately.
      const status = error.response?.status;
      if (status && status !== 404) {
        console.error(`Get profile error for ${ep}:`, error);
        return { success: false, message: error.response?.data?.message || 'Failed to get profile', error };
      }
      // If 404, continue to next candidate
      console.warn(`Profile endpoint ${ep} returned ${status}, trying next candidate.`);
    }
  }

  // If none of the endpoints worked, return a consolidated failure
  return { success: false, message: 'Profile endpoint not found (404) on all known routes', error: null };
};

export const updateProfileAPI = async (profileData) => {
  try {
    const response = await axiosInstance.put('/api/profile', profileData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile',
      error: error
    };
  }
};

// Existing profileAPI object
export const profileAPI = {
  // Get user profile (uses same fallback logic as getProfileAPI)
  getProfile: getProfileAPI,
  
  // Update user profile — keep primary update path but also try common alternatives when used directly
  updateProfile: (profileData) => axiosInstance.put('/api/profile', profileData),
};

export default profileAPI;