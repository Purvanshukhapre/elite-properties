import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute Component
 * 
 * Protects routes that require admin privileges
 * Redirects non-admin users to appropriate pages
 * 
 * Usage:
 * <Route path="/admin" element={
 *   <AdminRoute>
 *     <AdminDashboard />
 *   </AdminRoute>
 * } />
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Redirect to member area if user is not admin
  if (!isAdmin) {
    return <Navigate to="/premium" replace />;
  }

  // Render children if authenticated and admin
  return children;
};

export default AdminRoute;