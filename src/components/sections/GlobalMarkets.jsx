import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ANIMATION_PRESETS, 
  PREMIUM_COMPONENTS 
} from '../../design-system/premium-design-system';

const GlobalMarkets = () => {
  const [activeMarket, setActiveMarket] = useState('newyork');
  const [currency, setCurrency] = useState('USD');

  const markets = [
    {
      id: 'newyork',
      name: 'New York',
      country: 'United States',
      flag: '🇺🇸',
      properties: 1247,
      avgPrice: '$2.8M',
      roi: '8.2%',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      trend: 'up'
    },
    {
      id: 'london',
      name: 'London',
      country: 'United Kingdom',
      flag: '🇬🇧',
      properties: 892,
      avgPrice: '£4.2M',
      roi: '6.8%',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      trend: 'stable'
    },
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      flag: '🇫🇷',
      properties: 634,
      avgPrice: '€3.1M',
      roi: '5.9%',
      image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      trend: 'up'
    },
    {
      id: 'dubai',
      name: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      properties: 456,
      avgPrice: 'AED 2.1M',
      roi: '12.5%',
      image: 'https://images.unsplash.com/photo-1517451518004-8ecce07c508a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      trend: 'up'
    },
    {
      id: 'singapore',
      name: 'Singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      properties: 321,
      avgPrice: 'S$4.8M',
      roi: '7.3%',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      trend: 'stable'
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      flag: '🇯🇵',
      properties: 789,
      avgPrice: '¥520M',
      roi: '4.2%',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      trend: 'down'
    }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  const MarketCard = ({ market, index }) => (
    <motion.div
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${
        activeMarket === market.id ? 'ring-4 ring-premium-gold' : ''
      }`}
      style={PREMIUM_COMPONENTS.cards.premium.base}
      whileHover={{ 
        ...PREMIUM_COMPONENTS.cards.premium.hover,
        scale: 1.02
      }}
      onClick={() => setActiveMarket(market.id)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="relative h-48">
        <img 
          src={market.image} 
          alt={market.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-onyx/70 to-transparent"></div>
        
        {/* Market Flag */}
        <div className="absolute top-4 left-4 text-3xl">
          {market.flag}
        </div>
        
        {/* Market Stats */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold mb-1">{market.name}</h3>
          <p className="text-premium-platinum text-sm">{market.country}</p>
          
          <div className="flex justify-between items-center mt-3">
            <div className="text-white">
              <div className="text-sm text-premium-platinum">Avg. Price</div>
              <div className="font-bold">{market.avgPrice}</div>
            </div>
            <div className={`text-white text-right ${
              market.trend === 'up' ? 'text-premium-emerald' : 
              market.trend === 'down' ? 'text-red-500' : 'text-premium-platinum'
            }`}>
              <div className="text-sm">ROI</div>
              <div className="font-bold flex items-center">
                {market.roi}
                {market.trend === 'up' && (
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {market.trend === 'down' && (
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const activeMarketData = markets.find(m => m.id === activeMarket);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          {...ANIMATION_PRESETS.slideUp}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-premium-gold/10 mb-6">
            <span className="text-premium-gold font-medium">Global Markets</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-premium-onyx mb-6">
            International Investment Opportunities
          </h2>
          <p className="text-xl text-premium-platinum max-w-3xl mx-auto">
            Explore premium real estate markets across the globe with real-time data and expert insights
          </p>
        </motion.div>

        {/* Currency Selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currency === curr.code
                  ? 'bg-premium-sapphire text-white'
                  : 'bg-premium-ivory text-premium-onyx hover:bg-premium-platinum/20'
              }`}
            >
              {curr.symbol} {curr.code}
            </button>
          ))}
        </motion.div>

        {/* Market Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {markets.map((market, index) => (
            <MarketCard key={market.id} market={market} index={index} />
          ))}
        </div>

        {/* Detailed Market View */}
        {activeMarketData && (
          <motion.div
            className="bg-gradient-to-r from-premium-sapphire to-premium-royal rounded-3xl p-8 text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl mb-4">{activeMarketData.flag}</div>
                <h3 className="text-3xl font-bold mb-2">{activeMarketData.name}</h3>
                <p className="text-premium-platinum mb-6">{activeMarketData.country}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-premium-platinum text-sm">Active Properties</div>
                    <div className="text-2xl font-bold">{activeMarketData.properties.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-premium-platinum text-sm">Average Price</div>
                    <div className="text-2xl font-bold">{activeMarketData.avgPrice}</div>
                  </div>
                  <div>
                    <div className="text-premium-platinum text-sm">ROI Potential</div>
                    <div className="text-2xl font-bold text-premium-emerald">{activeMarketData.roi}</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-xl font-bold mb-6">Market Insights</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">94%</div>
                    <div className="text-premium-platinum text-sm">Market Stability</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">24/7</div>
                    <div className="text-premium-platinum text-sm">Monitoring</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">15+</div>
                    <div className="text-premium-platinum text-sm">Years History</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">500+</div>
                    <div className="text-premium-platinum text-sm">Investors</div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    style={PREMIUM_COMPONENTS.buttons.secondary.base}
                    whileHover={{
                      ...PREMIUM_COMPONENTS.buttons.secondary.hover,
                      backgroundColor: 'white',
                      color: PREMIUM_COMPONENTS.buttons.secondary.hover.backgroundColor
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white border-white"
                  >
                    Explore {activeMarketData.name} Market
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Investment Advisory */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-premium-onyx mb-4">
            Professional Investment Advisory
          </h3>
          <p className="text-premium-platinum mb-8 max-w-2xl mx-auto">
            Our global team of real estate experts provides personalized guidance for international investments
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-sapphire mb-2">50+</div>
              <div className="text-premium-platinum">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-sapphire mb-2">200+</div>
              <div className="text-premium-platinum">Market Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-sapphire mb-2">$50B+</div>
              <div className="text-premium-platinum">Assets Under Management</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalMarkets;