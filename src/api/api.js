// Re-export all API modules for backward compatibility
export { authAPI } from './auth.api';
export { propertyAPI } from './property.api';
export { profileAPI } from './profile.api';
export { adminAPI } from './admin.api';
export { default as axiosInstance } from './axiosInstance';

// For backward compatibility - export the authAPI as default
import { authAPI } from './auth.api';
export default authAPI;