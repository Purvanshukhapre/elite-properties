import React, { useState } from 'react';
import PremiumHero from './components/sections/PremiumHero';
import SmartPropertyDiscovery from './components/sections/SmartPropertyDiscovery';
import AdvancedPropertySearch from './components/widgets/AdvancedPropertySearch';
import GlobalMarkets from './components/sections/GlobalMarkets';
import PremiumInvestorDashboard from './features/investor/PremiumInvestorDashboard';
import { PREMIUM_BRAND } from './constants/premium-brand';

const PremiumShowcase = () => {
  const [activeView, setActiveView] = useState('homepage');

  const views = [
    { id: 'homepage', label: 'Homepage', icon: '🏠' },
    { id: 'dashboard', label: 'Investor Dashboard', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-premium-pearl">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-premium-sapphire">
                Elite Properties
              </div>
            </div>
            
            <div className="flex space-x-4">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    activeView === view.id
                      ? 'bg-premium-sapphire text-white'
                      : 'text-premium-onyx hover:bg-premium-ivory'
                  }`}
                >
                  <span className="mr-2">{view.icon}</span>
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {activeView === 'homepage' ? (
        <div>
          {/* Hero Section */}
          <PremiumHero />
          
          {/* Property Discovery */}
          <SmartPropertyDiscovery />
          
          {/* Advanced Search */}
          <AdvancedPropertySearch />
          
          {/* Global Markets */}
          <GlobalMarkets />
          
          {/* Footer */}
          <footer className="bg-premium-onyx text-white py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Elite Properties</h3>
                  <p className="text-premium-platinum">
                    The premier global destination for luxury real estate investment
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Markets</h4>
                  <ul className="space-y-2 text-premium-platinum">
                    <li>New York</li>
                    <li>London</li>
                    <li>Paris</li>
                    <li>Dubai</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Services</h4>
                  <ul className="space-y-2 text-premium-platinum">
                    <li>Property Search</li>
                    <li>Investment Advisory</li>
                    <li>Market Analytics</li>
                    <li>Portfolio Management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect</h4>
                  <ul className="space-y-2 text-premium-platinum">
                    <li>+1 (555) 123-4567</li>
                    <li>info@eliteproperties.com</li>
                    <li>24/7 Global Support</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-premium-platinum/20 mt-12 pt-8 text-center text-premium-platinum">
                © 2024 Elite Properties. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <PremiumInvestorDashboard />
      )}
    </div>
  );
};

export default PremiumShowcase;