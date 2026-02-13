import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useScrollToTop } from '../utils/scrollToTop';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AuthLayout from '../components/layout/AuthLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Feature pages (Existing)
import { Login, Register, VerifyEmail, ForgotPassword, ResetPasswordWithOTP } from '../features/auth';
import { PropertyList, PropertyDetails, PostProperty } from '../features/property';

// Public pages
import { HeroSection, FeaturedListings, BuyerCategories, WhyChooseUs, Testimonials, CallToAction } from '../components/sections';
import { PropertyMap } from '../components/widgets';
import { AboutPage, ContactPage, ServicesPage } from '../components/pages-legacy';

// User pages
import UserHome from '../features/user/pages/UserHome';
import UserInvest from '../features/user/pages/UserInvest';
import UserMyProperties from '../features/user/pages/UserMyProperties';
import UserLeads from '../features/user/pages/UserLeads';
import UserSaved from '../features/user/pages/UserSaved';
import UserVisits from '../features/user/pages/UserVisits';
import UserProfile from '../features/user/pages/UserProfile';
import UserSettings from '../features/user/pages/UserSettings';
import UserSupport from '../features/user/pages/UserSupport';
import ViewedProperties from '../features/user/pages/ViewedProperties';
import EnquiriesSent from '../features/user/pages/EnquiriesSent';

// Admin pages
import {
  AdminLogin,
  AdminDashboard,
  AdminProperties,
  AdminUsers,
  AdminPropertyDetails
} from '../features/admin';

// --- Guards ---

// 1. Public Guard (Redirects logged-in users to dashboard)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

// 2. Protected Guard (Requires login, blocks restricted flows)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginIntent, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // If user is logged in but has "postProperty" intent, they cannot access normal user routes
  if (isAuthenticated && loginIntent === 'postProperty') {
    return <Navigate to="/user/seller/post-property" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 2.5 Post Property Guard (Requires login AND postProperty intent)
const PostPropertyRoute = ({ children }) => {
  const { isAuthenticated, loginIntent, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // If no postProperty intent, block access
  if (loginIntent !== 'postProperty') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// 3. Admin Guard (Requires admin role)
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return isAuthenticated && isAdmin ? children : <Navigate to="/admin/login" replace />;
};

const ScrollToTopWrapper = ({ children }) => {
  useScrollToTop();
  return children;
};

const AppRoutes = () => {
  return (
    <ScrollToTopWrapper>
      <Routes>
        {/* =================================================================
              1. PUBLIC ROUTES (Marketing, Discovery)
              Layout: PublicLayout (Navbar + Footer)
              Guard: PublicOnlyRoute (No logged-in users)
             ================================================================= */}
        <Route element={
          <PublicOnlyRoute>
            <PublicLayout />
          </PublicOnlyRoute>
        }>
          {/* Note: We need a wrapper component for the Home page to combine sections */}
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturedListings />
              <PropertyMap />
              <BuyerCategories />
              <WhyChooseUs />
              <Testimonials />
              <CallToAction />
            </>
          } />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />

          {/* Public static pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />



        </Route>
        
        {/* =================================================================
              1. AUTH ROUTES (Login, Registration)
              Layout: AuthLayout (No footer)
              Guard: PublicOnlyRoute (No logged-in users)
             ================================================================= */}
        <Route element={
          <PublicOnlyRoute>
            <AuthLayout />
          </PublicOnlyRoute>
        }>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password-otp" element={<ResetPasswordWithOTP />} />
        </Route>
        


        {/* =================================================================
              2. PROTECTED USER PAGES (Accessible when logged in)
              Layout: PublicLayout (Same as public pages)
              Guard: ProtectedRoute
             ================================================================= */}
        <Route element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }>
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/properties" element={<PropertyList />} />
          <Route path="/user/invest" element={<UserInvest />} />
          <Route path="/user/saved" element={<UserSaved />} />
          <Route path="/user/visits" element={<UserVisits />} />
          <Route path="/user/leads" element={<UserLeads />} />

          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/support" element={<UserSupport />} />
          <Route path="/user/viewed" element={<ViewedProperties />} />
          <Route path="/user/enquiries" element={<EnquiriesSent />} />
        </Route>


        {/* =================================================================
              3. SELLER ROUTES (Focused Flow)
              Layout: PublicLayout (Same as public pages)
              Guard: PostPropertyRoute (Requires intent)
             ================================================================= */}
        <Route path="/user/seller" element={
          <PostPropertyRoute>
            <PublicLayout />
          </PostPropertyRoute>
        }>
          <Route path="post-property" element={<PostProperty />} />
          <Route path="my-properties" element={<UserMyProperties />} />
        </Route>

        {/* =================================================================
              4. ADMIN ROUTES (Isolated Management)
              Layout: AdminLayout (Dense Sidebar)
              Guard: AdminRoute
             ================================================================= */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="properties/:id" element={<AdminPropertyDetails />} />
          <Route path="users" element={<AdminUsers />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Admin Login (Public but separate) */}
        <Route path="/admin/login" element={
          <PublicOnlyRoute>
            <AdminLogin />
          </PublicOnlyRoute>
        } />

        {/* Redirect handling */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </ScrollToTopWrapper>
  );
};

export default AppRoutes;