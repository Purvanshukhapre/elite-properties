import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertySearch from './components/PropertySearch';
import FeaturedListings from './components/FeaturedListings';
import PropertyMap from './components/PropertyMap';
import BuyerCategories from './components/BuyerCategories';
import LuxuryHighlights from './components/LuxuryHighlights';
import BlogInsights from './components/BlogInsights';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { AnimationPerformanceMonitor, getAnimationSettings } from './utils/performance';
import { useLuxuryCursor, addClickEffects } from './utils/cursorEffects';

function App() {
  useLuxuryCursor();
  
  useEffect(() => {
    // Add click effects to buttons
    const cleanupClickEffects = addClickEffects();
    
    // Initialize performance monitoring
    const perfMonitor = new AnimationPerformanceMonitor();
    
    // Apply animation settings based on user preferences
    getAnimationSettings();
    
    // Add performance monitoring to animation frames
    const animationFrame = requestAnimationFrame(function monitor() {
      const fps = perfMonitor.update();
      if (fps !== null) {
        // Log FPS to console for performance monitoring
        // console.log(`Animation FPS: ${fps}`);
      }
      requestAnimationFrame(monitor);
    });
    

    
    return () => {
      cleanupClickEffects();
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-text-primary overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div id="properties">
        <PropertySearch />
      </div>
      <div id="listings">
        <FeaturedListings />
      </div>
      <PropertyMap />
      <div id="buyers">
        <BuyerCategories />
      </div>
      <div id="highlights">
        <LuxuryHighlights />
      </div>
      <div id="insights">
        <BlogInsights />
      </div>
      <div id="contact">
        <CallToAction />
      </div>
      <Footer />
      
      {/* Floating Action Button for quick access */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          className="w-14 h-14 bg-gradient-to-r from-primary-blue to-secondary-blue text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
          aria-label="Quick access"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App;
