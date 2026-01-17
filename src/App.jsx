import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedListings from './components/FeaturedListings';
import PropertyMap from './components/PropertyMap';
import BuyerCategories from './components/BuyerCategories';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import PropertyDetails from './components/PropertyDetails';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BuyPage from './components/BuyPage';
import RentPage from './components/RentPage';
import SellPage from './components/SellPage';
import AgentsPage from './components/AgentsPage';
import ServicesPage from './components/ServicesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Navbar />
                <main>
                  <HeroSection />
                  <FeaturedListings />
                  <PropertyMap />
                  <BuyerCategories />
                  <WhyChooseUs />
                  <Testimonials />
                  <CallToAction />
                </main>
                <Footer />
              </>
            } 
          />
          <Route path="/buy" element={
            <>
              <Navbar />
              <BuyPage />
              <Footer />
            </>
          } />
          <Route path="/rent" element={
            <>
              <Navbar />
              <RentPage />
              <Footer />
            </>
          } />
          <Route path="/sell" element={
            <>
              <Navbar />
              <SellPage />
              <Footer />
            </>
          } />
          <Route path="/agents" element={
            <>
              <Navbar />
              <AgentsPage />
              <Footer />
            </>
          } />
          <Route path="/services" element={
            <>
              <Navbar />
              <ServicesPage />
              <Footer />
            </>
          } />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={
                      <>
                        <Navbar />
                        <AboutPage />
                        <Footer />
                      </>
                    } />
          <Route path="/contact" element={
                      <>
                        <Navbar />
                        <ContactPage />
                        <Footer />
                      </>
                    } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;