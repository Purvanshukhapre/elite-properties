import React from 'react';
import PremiumHero from '../../../components/sections/PremiumHero';
import SmartPropertyDiscovery from '../../../components/sections/SmartPropertyDiscovery';
import AdvancedPropertySearch from '../../../components/widgets/AdvancedPropertySearch';
import GlobalMarkets from '../../../components/sections/GlobalMarkets';

const PremiumLanding = () => {
  return (
    <div className="min-h-screen bg-premium-pearl">
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
  );
};

export default PremiumLanding;