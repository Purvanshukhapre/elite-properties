import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ANIMATION_PRESETS, 
  PREMIUM_COMPONENTS 
} from '../../design-system/premium-design-system';

// Move components outside render function
const StatCard = ({ title, value, change, icon, color = 'blue' }) => (
  <motion.div
    className="bg-white rounded-2xl p-6 shadow-lg"
    style={PREMIUM_COMPONENTS.cards.premium.base}
    whileHover={PREMIUM_COMPONENTS.cards.premium.hover}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-premium-platinum text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-premium-onyx">{value}</p>
        <p className={`text-sm font-medium ${
          change.startsWith('+') ? 'text-premium-emerald' : 'text-red-500'
        }`}>
          {change}
        </p>
      </div>
      <div className={`text-4xl ${color === 'blue' ? 'text-premium-sapphire' : 'text-premium-gold'}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ activity }) => (
  <motion.div
    className="flex items-center justify-between p-4 bg-premium-ivory rounded-xl mb-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
        activity.status === 'completed' ? 'bg-premium-emerald/20' :
        activity.status === 'received' ? 'bg-premium-gold/20' :
        'bg-premium-sapphire/20'
      }`}>
        {activity.type === 'purchase' && '🏠'}
        {activity.type === 'dividend' && '💰'}
        {activity.type === 'valuation' && '📊'}
      </div>
      <div>
        <h4 className="font-semibold text-premium-onyx">{activity.property}</h4>
        <p className="text-premium-platinum text-sm">
          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-premium-onyx">{activity.amount}</p>
      <p className="text-premium-platinum text-sm">{activity.date}</p>
    </div>
  </motion.div>
);

const PremiumInvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Portfolio Overview', icon: '📊' },
    { id: 'properties', label: 'My Properties', icon: '🏢' },
    { id: 'analytics', label: 'Market Analytics', icon: '📈' },
    { id: 'alerts', label: 'Investment Alerts', icon: '🔔' }
  ];

  useEffect(() => {
    // Simulate API call for portfolio data
    setTimeout(() => {
      setPortfolioData({
        totalValue: '$12,850,000',
        totalROI: '15.7%',
        properties: 8,
        activeInvestments: 5,
        monthlyIncome: '$85,000',
        yearlyGrowth: '22.3%',
        diversification: {
          residential: 65,
          commercial: 25,
          luxury: 10
        },
        recentActivity: [
          {
            id: 1,
            type: 'purchase',
            property: 'Manhattan Penthouse',
            amount: '$2,500,000',
            date: '2024-01-15',
            status: 'completed'
          },
          {
            id: 2,
            type: 'dividend',
            property: 'London Office Building',
            amount: '$12,500',
            date: '2024-01-10',
            status: 'received'
          },
          {
            id: 3,
            type: 'valuation',
            property: 'Beverly Hills Estate',
            amount: '$9,200,000',
            date: '2024-01-05',
            status: 'updated'
          }
        ]
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-premium-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-premium-sapphire mx-auto mb-4"></div>
          <p className="text-premium-platinum">Loading your premium dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-ivory">
      {/* Header */}
      <div className="hero-premium text-white">
        <div className="page-container">
          <motion.div
            {...ANIMATION_PRESETS.slideUp}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 typography-display">Investor Dashboard</h1>
            <p className="text-premium-pearl">Your premium real estate portfolio management center</p>
          </motion.div>
        </div>
      </div>

      <div className="page-container py-12">
        {/* Navigation Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'btn-base btn-primary'
                  : 'bg-white text-premium-onyx hover:bg-premium-ivory'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            {...ANIMATION_PRESETS.staggerContainer}
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard 
                title="Total Portfolio Value" 
                value={portfolioData.totalValue} 
                change="+12.5% this year"
                icon="💰"
                color="gold"
              />
              <StatCard 
                title="Overall ROI" 
                value={portfolioData.totalROI} 
                change="+3.2% this quarter"
                icon="📈"
                color="blue"
              />
              <StatCard 
                title="Active Properties" 
                value={portfolioData.properties.toString()} 
                change={`${portfolioData.activeInvestments} currently generating income`}
                icon="🏢"
                color="blue"
              />
              <StatCard 
                title="Monthly Income" 
                value={portfolioData.monthlyIncome} 
                change="+8.7% vs last month"
                icon="💵"
                color="gold"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Portfolio Diversification */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                style={PREMIUM_COMPONENTS.cards.premium.base}
                whileHover={PREMIUM_COMPONENTS.cards.premium.hover}
              >
                <h3 className="text-xl font-bold text-premium-onyx mb-6">Portfolio Diversification</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-premium-onyx">Residential</span>
                      <span className="font-bold text-premium-sapphire">{portfolioData.diversification.residential}%</span>
                    </div>
                    <div className="w-full bg-premium-platinum/20 rounded-full h-3">
                      <div 
                        className="bg-premium-sapphire h-3 rounded-full" 
                        style={{ width: `${portfolioData.diversification.residential}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-premium-onyx">Commercial</span>
                      <span className="font-bold text-premium-gold">{portfolioData.diversification.commercial}%</span>
                    </div>
                    <div className="w-full bg-premium-platinum/20 rounded-full h-3">
                      <div 
                        className="bg-premium-gold h-3 rounded-full" 
                        style={{ width: `${portfolioData.diversification.commercial}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-premium-onyx">Luxury</span>
                      <span className="font-bold text-premium-amethyst">{portfolioData.diversification.luxury}%</span>
                    </div>
                    <div className="w-full bg-premium-platinum/20 rounded-full h-3">
                      <div 
                        className="bg-premium-amethyst h-3 rounded-full" 
                        style={{ width: `${portfolioData.diversification.luxury}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
                style={PREMIUM_COMPONENTS.cards.premium.base}
                whileHover={PREMIUM_COMPONENTS.cards.premium.hover}
              >
                <h3 className="text-xl font-bold text-premium-onyx mb-6">Recent Activity</h3>
                <div>
                  {portfolioData.recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
                <button
                  style={PREMIUM_COMPONENTS.buttons.secondary.base}
                  whileHover={PREMIUM_COMPONENTS.buttons.secondary.hover}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4"
                >
                  View All Activity
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <motion.div
            {...ANIMATION_PRESETS.slideUp}
          >
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-premium-onyx mb-2">Your Property Portfolio</h3>
              <p className="text-premium-platinum">Manage and monitor all your premium real estate investments</p>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            {...ANIMATION_PRESETS.slideUp}
          >
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-premium-onyx mb-2">Market Analytics</h3>
              <p className="text-premium-platinum">Advanced analytics and market insights for informed decisions</p>
            </div>
          </motion.div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <motion.div
            {...ANIMATION_PRESETS.slideUp}
          >
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-2xl font-bold text-premium-onyx mb-2">Investment Alerts</h3>
              <p className="text-premium-platinum">Real-time notifications for market opportunities and portfolio updates</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PremiumInvestorDashboard;