import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineChatAlt2,
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineGlobe,
  HiOutlineCurrencyDollar,
  HiOutlineLocationMarker,
  HiOutlineBadgeCheck,
  HiOutlineStar,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineBell,
  HiOutlineCalculator,
  HiOutlineClock,
  HiOutlineUserCircle
} from 'react-icons/hi';

const UserHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const stats = {
    savedProperties: 12,
    scheduledVisits: 3,
    recentInquiries: 8,
    portfolioValue: '₹4.2 Cr',
    marketIndex: '+12.4%',
    globalReach: 14,
    propertiesViewed: 47,
    avgPropertyRating: 4.8
  };

  const quickActions = [
    { 
      title: "Search Properties", 
      description: "Discover premium listings across global markets", 
      icon: <HiOutlineHome className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      path: "/user/buy",
      gradient: "bg-gradient-to-br"
    },
    { 
      title: "My Collection", 
      description: "View and manage your saved properties", 
      icon: <HiOutlineHeart className="w-8 h-8" />,
      color: "from-rose-500 to-pink-600",
      path: "/user/saved",
      gradient: "bg-gradient-to-br"
    },
    { 
      title: "Market Intelligence", 
      description: "Track property insights and analytics", 
      icon: <HiOutlineLightningBolt className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      path: "/user/visits",
      gradient: "bg-gradient-to-br"
    },
    { 
      title: "Portfolio Analytics", 
      description: "View performance metrics and reports", 
      icon: <HiOutlineChartBar className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      path: "/user/dashboard",
      gradient: "bg-gradient-to-br"
    },
    { 
      title: "Property Alerts", 
      description: "Get notified of new listings matching your criteria", 
      icon: <HiOutlineBell className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      path: "/user/alerts",
      gradient: "bg-gradient-to-br"
    },
    { 
      title: "Investment Calculator", 
      description: "Calculate ROI and property valuations", 
      icon: <HiOutlineCalculator className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
      path: "/user/calculator",
      gradient: "bg-gradient-to-br"
    }
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Penthouse in Mumbai",
      location: "South Mumbai, Maharashtra",
      price: "₹15.5 Cr",
      type: "Premium Apartment",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      status: "New Listing",
      bedrooms: 4,
      bathrooms: 5,
      area: "3,200 sq.ft"
    },
    {
      id: 2,
      title: "Heritage Villa in Delhi",
      location: "South Delhi, New Delhi",
      price: "₹8.2 Cr",
      type: "Independent House",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      status: "Price Reduced",
      bedrooms: 5,
      bathrooms: 4,
      area: "4,500 sq.ft"
    },
    {
      id: 3,
      title: "Modern Apartment in Bangalore",
      location: "Koramangala, Bangalore",
      price: "₹4.8 Cr",
      type: "Luxury Apartment",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      status: "High Demand",
      bedrooms: 3,
      bathrooms: 3,
      area: "1,800 sq.ft"
    },
    {
      id: 4,
      title: "Beachfront Villa in Goa",
      location: "Calangute, Goa",
      price: "₹12.5 Cr",
      type: "Beach Villa",
      image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=800",
      status: "Exclusive",
      bedrooms: 6,
      bathrooms: 7,
      area: "5,200 sq.ft"
    }
  ];

  const marketInsights = [
    { metric: "Market Sentiment", value: "Bullish", change: "+8.2%", trend: "up", description: "Strong buyer confidence" },
    { metric: "Price Index", value: "1,245", change: "+2.1%", trend: "up", description: "Quarterly growth" },
    { metric: "Transaction Volume", value: "142", change: "+15%", trend: "up", description: "Monthly activity" },
    { metric: "Inventory Levels", value: "Low", change: "-12%", trend: "down", description: "Limited supply" },
    { metric: "Rental Yields", value: "4.8%", change: "+0.3%", trend: "up", description: "Average returns" },
    { metric: "Foreign Investment", value: "↑ 22%", change: "+22%", trend: "up", description: "International buyers" }
  ];

  const recentActivities = [
    { 
      action: "New property saved", 
      property: "Luxury Penthouse, Mumbai", 
      time: "2 hours ago",
      type: "save"
    },
    { 
      action: "Visit scheduled", 
      property: "Heritage Villa, Delhi", 
      time: "1 day ago",
      type: "visit"
    },
    { 
      action: "Price alert triggered", 
      property: "Modern Apartment, Bangalore", 
      time: "2 days ago",
      type: "alert"
    },
    { 
      action: "Market report generated", 
      property: "Quarterly Analysis", 
      time: "3 days ago",
      type: "report"
    }
  ];

  const testimonials = [
    {
      name: "Amit Patel",
      role: "Luxury Property Investor",
      quote: "Elite Properties has transformed how I approach real estate investments. Their market intelligence is unmatched.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Priya Sharma",
      role: "First-time Home Buyer",
      quote: "The personalized concierge service made finding my dream home effortless and stress-free.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Rajesh Kumar",
      role: "Real Estate Developer",
      quote: "Elite Properties' network and market reach have been instrumental in our project launches.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 flex flex-col font-sans relative overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-rose-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* PREMIUM WELCOME HEADER */}
      <header className="relative pt-28 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90"></div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover brightness-75 scale-110"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-black tracking-widest uppercase text-white/80">
                Authenticated Registry • User ID: {user?.id?.slice(0,8) || 'EL-5092'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif-display leading-none mb-8 text-white">
              Welcome back, <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                {user?.name?.split(' ')[0] || 'Investor'}
              </span>
            </h1>
            
            <p className="text-white/90 font-light text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 opacity-90">
              Your global real estate portfolio is actively synchronized. Market opportunities are at peak resonance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => navigate('/user/buy')}
                className="group relative px-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl flex items-center gap-4 text-sm font-black uppercase tracking-widest shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Explore Premium Listings</span>
                <HiOutlineArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button
                onClick={() => navigate('/user/saved')}
                className="group px-10 py-6 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl flex items-center gap-4 text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all duration-300"
              >
                <HiOutlineHeart className="w-5 h-5" />
                <span>View Collection</span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* PREMIUM STATISTICS DASHBOARD */}
      <section className="relative -mt-20 z-20 container mx-auto px-6 lg:px-24 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Portfolio Value", 
              value: stats.portfolioValue, 
              change: "+12.4%", 
              icon: <HiOutlineCurrencyDollar className="w-6 h-6" />,
              color: "from-emerald-500 to-teal-600"
            },
            { 
              title: "Saved Properties", 
              value: stats.savedProperties, 
              change: "+3", 
              icon: <HiOutlineHeart className="w-6 h-6" />,
              color: "from-rose-500 to-pink-600"
            },
            { 
              title: "Scheduled Visits", 
              value: stats.scheduledVisits, 
              change: "2 this week", 
              icon: <HiOutlineCalendar className="w-6 h-6" />,
              color: "from-blue-500 to-indigo-600"
            },
            { 
              title: "Global Reach", 
              value: `${stats.globalReach} cities`, 
              change: "Expanding", 
              icon: <HiOutlineGlobe className="w-6 h-6" />,
              color: "from-purple-500 to-indigo-600"
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
              className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.includes('+') || stat.change.includes('Expanding') ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUICK ACTION CARDS */}
      <section className="container mx-auto px-6 lg:px-24 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif-display text-slate-900 mb-6">
            Your Command Center
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Access your most important tools and insights with a single click
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickActions.map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className={`w-16 h-16 ${action.gradient} ${action.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{action.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{action.description}</p>
                <div className="mt-6 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Access Now <HiOutlineArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROPERTIES PREVIEW */}
      <section className="container mx-auto px-6 lg:px-24 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif-display text-slate-900 mb-6">
            Premium Listings
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Curated selection of the finest properties in your market
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + idx * 0.2, duration: 0.8 }}
              whileHover={{ y: -15 }}
              className="group cursor-pointer"
              onClick={() => navigate('/user/buy')}
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                      {property.status}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlineHome className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{property.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <HiOutlineLocationMarker className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif-display text-blue-600">{property.price}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <HiOutlineStar className="w-4 h-4" />
                      <HiOutlineStar className="w-4 h-4" />
                      <HiOutlineStar className="w-4 h-4" />
                      <HiOutlineStar className="w-4 h-4" />
                      <HiOutlineStar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/user/buy')}
            className="group px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <span>Explore All Listings</span>
            <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* MARKET INTELLIGENCE DASHBOARD */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <HiOutlineLightningBolt className="w-8 h-8 text-blue-400" />
              <h2 className="text-4xl md:text-5xl font-serif-display">Market Intelligence</h2>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-time insights and analytics to guide your investment decisions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketInsights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 + idx * 0.1, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-200">{insight.metric}</h3>
                  {insight.trend === 'up' ? (
                    <HiOutlineBadgeCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <HiOutlineDocumentText className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="text-3xl font-serif-display mb-2">{insight.value}</div>
                <div className={`flex items-center gap-2 text-sm ${insight.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span>{insight.change}</span>
                  <span>{insight.trend === 'up' ? '↗' : '↘'}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => navigate('/user/visits')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <HiOutlineAcademicCap className="w-6 h-6" />
              <span>Access Full Market Intelligence Suite</span>
              <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
      <br />
      <br />

      {/* PREMIUM TESTIMONIAL SHOWCASE */}
      <section className="container mx-auto px-6 lg:px-24 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <HiOutlineBadgeCheck className="w-8 h-8 text-emerald-500" />
            <h2 className="text-4xl md:text-5xl font-serif-display text-slate-900">
              Client Success Stories
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hear from investors who transformed their real estate journey with Elite Properties
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15)_0%,transparent_50%)]"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.15)_0%,transparent_50%)]"></div>
            </div>
            
            {/* Glowing Orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Featured Testimonial */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                      <HiOutlineUserCircle className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center border-4 border-slate-900">
                      <HiOutlineStar className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                </div>

                <blockquote className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed">
                  "Elite Properties transformed how I approach real estate investments. Their market intelligence and personalized service helped me achieve returns I never thought possible."
                </blockquote>

                <div className="mb-10">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar key={i} className="w-6 h-6 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">Amit Patel</p>
                    <p className="text-slate-300">Luxury Property Investor</p>
                  </div>
                </div>

                {/* Client Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">24x</div>
                    <div className="text-sm text-slate-300 uppercase tracking-wider">ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                    <div className="text-sm text-slate-300 uppercase tracking-wider">Properties Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">3 Years</div>
                    <div className="text-sm text-slate-300 uppercase tracking-wider">Partnership</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all shadow-lg">
              <HiOutlineArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all shadow-lg">
              <HiOutlineArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              role: "First-time Home Buyer",
              quote: "The personalized concierge service made finding my dream home effortless and stress-free.",
              rating: 5,
              image: "https://randomuser.me/api/portraits/women/44.jpg",
              tag: "Home Buyer Success"
            },
            {
              name: "Rajesh Kumar",
              role: "Real Estate Developer",
              quote: "Elite Properties' network and market reach have been instrumental in our project launches.",
              rating: 5,
              image: "https://randomuser.me/api/portraits/men/67.jpg",
              tag: "Developer Partnership"
            },
            {
              name: "Sunita Mehta",
              role: "International Investor",
              quote: "Their global market expertise helped me diversify my portfolio across multiple countries seamlessly.",
              rating: 5,
              image: "https://randomuser.me/api/portraits/women/68.jpg",
              tag: "Global Investment"
            }
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 + idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover border-3 border-slate-200 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full">
                  {testimonial.tag}
                </span>
              </div>
              
              <blockquote className="text-slate-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiOutlineStar key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <HiOutlineArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-10 border border-slate-200/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Happy Clients", icon: <HiOutlineUserGroup className="w-8 h-8 text-blue-600 mx-auto mb-3" /> },
              { number: "4.9/5", label: "Average Rating", icon: <HiOutlineStar className="w-8 h-8 text-amber-500 fill-current mx-auto mb-3" /> },
              { number: "98%", label: "Success Rate", icon: <HiOutlineBadgeCheck className="w-8 h-8 text-emerald-600 mx-auto mb-3" /> },
              { number: "15+", label: "Global Markets", icon: <HiOutlineGlobe className="w-8 h-8 text-purple-600 mx-auto mb-3" /> }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                {stat.icon}
                <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PREMIUM SERVICES SHOWCASE */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif-display text-slate-900 mb-6">
              Premium Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Exclusive offerings for discerning real estate investors
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Intelligence Suite",
                description: "Advanced analytics, trend forecasting, and investment insights powered by AI",
                features: ["Real-time market data", "Predictive analytics", "Investment risk assessment"],
                icon: <HiOutlineLightningBolt className="w-8 h-8" />,
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "Concierge Advisory",
                description: "Dedicated property advisors for personalized investment guidance",
                features: ["One-on-one consultations", "Portfolio strategy", "Negotiation support"],
                icon: <HiOutlineUserCircle className="w-8 h-8" />,
                color: "from-purple-500 to-pink-600"
              },
              {
                title: "Global Network Access",
                description: "Exclusive partnerships with international real estate markets",
                features: ["Off-market opportunities", "Cross-border investments", "Legal & tax advisory"],
                icon: <HiOutlineGlobe className="w-8 h-8" />,
                color: "from-emerald-500 to-teal-600"
              }

            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8 + idx * 0.2, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCIERGE SERVICES */}
      <section className="container mx-auto px-6 lg:px-24 py-32">
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/50 p-16 lg:p-24 rounded-[3rem] flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden group shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-3xl"></div>
          
          <div className="w-full lg:w-2/5 aspect-square rounded-[2.5rem] overflow-hidden shrink-0 border-8 border-white shadow-2xl relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Concierge" 
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <HiOutlineShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Vikram Singh</p>
                    <p className="text-white/80 text-sm">Senior Market Advisor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow relative z-10">
            <span className="text-sm font-black tracking-widest uppercase text-blue-600 mb-6 block">
              Exclusive Concierge Services
            </span>
            <h2 className="text-5xl font-serif-display mb-8 text-slate-900">
              Private <span className="italic text-slate-500">Market Access.</span>
            </h2>
            <p className="text-2xl text-slate-600 font-light leading-relaxed mb-10">
              Direct access to off-market opportunities and private acquisition channels with our elite network of advisors.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                "Pre-launch property access",
                "Off-market negotiations", 
                "Private equity opportunities",
                "Exclusive market insights"
              ].map((service, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{service}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                <HiOutlineChatAlt2 className="w-5 h-5" />
                <span>Initiate Consultation</span>
              </button>
              <button className="group flex items-center justify-center gap-4 px-8 py-5 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold uppercase tracking-widest text-sm hover:border-slate-900 hover:text-slate-900 transition-all duration-300">
                <HiOutlineUserGroup className="w-5 h-5" />
                <span>Request Introduction</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default UserHome;