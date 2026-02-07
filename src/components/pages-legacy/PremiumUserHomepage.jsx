import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PremiumUserHomepage = () => {
  
  // State for scroll-based reveals
  const [reveals, setReveals] = useState({
    eyebrow: false,
    headlineLine1: false,
    headlineLine2: false,
    paragraph: false,
    services: [false, false, false, false, false, false, false, false, false, false, false, false]
  });

  // State for scroll-driven card animations
  const [cardOffsets, setCardOffsets] = useState(Array(12).fill(0));
  const [isSectionPinned, setIsSectionPinned] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasBeenAnimated, setHasBeenAnimated] = useState(false);

  // Refs for scroll-based reveals
  const eyebrowRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const serviceRef1 = useRef(null);
  const serviceRef2 = useRef(null);
  const serviceRef3 = useRef(null);
  const serviceRef4 = useRef(null);
  const serviceRef5 = useRef(null);
  const serviceRef6 = useRef(null);
  const serviceRef7 = useRef(null);
  const serviceRef8 = useRef(null);
  const serviceRef9 = useRef(null);
  const serviceRef10 = useRef(null);
  const serviceRef11 = useRef(null);
  const serviceRef12 = useRef(null);
  const sectionRef = useRef(null);

  // Array of service refs for easier iteration
  const serviceRefs = useMemo(() => [serviceRef1, serviceRef2, serviceRef3, serviceRef4, serviceRef5, serviceRef6, serviceRef7, serviceRef8, serviceRef9, serviceRef10, serviceRef11, serviceRef12], [
    serviceRef1, serviceRef2, serviceRef3, serviceRef4, serviceRef5, serviceRef6, serviceRef7, serviceRef8, serviceRef9, serviceRef10, serviceRef11, serviceRef12
  ]);

  // Mock data for editorial services
  const editorialServices = [
    'Property Acquisition',
    'Private Sales',
    'Investment Advisory',
    'White-Glove Service',
    'Market Analysis',
    'Portfolio Management',
    'Luxury Property Sourcing',
    'International Relocation',
    'Property Valuation',
    'Tenant Screening',
    'Lease Negotiation',
    'Property Maintenance'
  ];

  // Scroll observer effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% of section is visible
      rootMargin: '0px 0px -100px 0px' // Start slightly before section enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current && !hasBeenAnimated && !isSectionPinned) {
            setIsSectionPinned(true);
          }
          
          // Handle other reveal animations
          if (entry.target === eyebrowRef.current) {
            setReveals(prev => ({ ...prev, eyebrow: true }));
          } else if (entry.target === headlineLine1Ref.current) {
            setReveals(prev => ({ ...prev, headlineLine1: true }));
          } else if (entry.target === headlineLine2Ref.current) {
            setReveals(prev => ({ ...prev, headlineLine2: true }));
          } else if (entry.target === paragraphRef.current) {
            setReveals(prev => ({ ...prev, paragraph: true }));
          } else {
            const serviceIndex = serviceRefs.findIndex(ref => ref.current === entry.target);
            if (serviceIndex !== -1) {
              setReveals(prev => ({
                ...prev,
                services: prev.services.map((val, idx) => idx === serviceIndex ? true : val)
              }));
            }
          }
        } else if (entry.target === sectionRef.current) {
          if (animationComplete) {
            setIsSectionPinned(false);
          }
        }
      });
    }, observerOptions);

    // Observe all elements
    if (eyebrowRef.current) observer.observe(eyebrowRef.current);
    if (headlineLine1Ref.current) observer.observe(headlineLine1Ref.current);
    if (headlineLine2Ref.current) observer.observe(headlineLine2Ref.current);
    if (paragraphRef.current) observer.observe(paragraphRef.current);
    if (sectionRef.current) observer.observe(sectionRef.current);
    serviceRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, [hasBeenAnimated, isSectionPinned, animationComplete, serviceRefs]);

  // Scroll-driven card animation effect - Scroll Lock Implementation with Proper Release
  useEffect(() => {
    // Early return if not actively animating
    if (!isSectionPinned || animationComplete || hasBeenAnimated) {
      return;
    }

    let scrollProgressInternal = 0;
    let isProcessingScroll = false;
    let wheelListener = null;
    let touchStartListener = null;
    let touchMoveListener = null;

    const handleWheel = (e) => {
      // Double-check conditions to prevent any post-completion interference
      if (!isSectionPinned || animationComplete || hasBeenAnimated || isProcessingScroll) {
        return;
      }
      
      e.preventDefault();
      isProcessingScroll = true;
      
      // Calculate scroll direction and amount
      const scrollDelta = e.deltaY > 0 ? 0.05 : -0.05;
      scrollProgressInternal = Math.max(0, Math.min(scrollProgressInternal + scrollDelta, 1));
      
      setScrollProgress(scrollProgressInternal);
      
      // Calculate card offsets
      const newOffsets = cardOffsets.map((offset, index) => {
        const baseOffset = scrollProgressInternal * 300;
        const staggerDelay = index * 0.05;
        const effectiveProgress = Math.max(0, Math.min(scrollProgressInternal - staggerDelay, 1));
        return effectiveProgress * baseOffset;
      });
      
      setCardOffsets(newOffsets);
      
      // Check completion and release scroll lock
      if (scrollProgressInternal >= 1) {
        setAnimationComplete(true);
        setHasBeenAnimated(true);
        setIsSectionPinned(false);
        // Immediately remove all scroll interceptors
        cleanupListeners();
      }
      
      setTimeout(() => {
        isProcessingScroll = false;
      }, 16);
    };

    // Touch event handlers
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (!isSectionPinned || animationComplete || hasBeenAnimated || isProcessingScroll) {
        return;
      }
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      if (Math.abs(deltaY) > 5) {
        e.preventDefault();
        isProcessingScroll = true;
        
        const scrollDelta = deltaY > 0 ? 0.03 : -0.03;
        scrollProgressInternal = Math.max(0, Math.min(scrollProgressInternal + scrollDelta, 1));
        
        setScrollProgress(scrollProgressInternal);
        
        const newOffsets = cardOffsets.map((offset, index) => {
          const baseOffset = scrollProgressInternal * 300;
          const staggerDelay = index * 0.05;
          const effectiveProgress = Math.max(0, Math.min(scrollProgressInternal - staggerDelay, 1));
          return effectiveProgress * baseOffset;
        });
        
        setCardOffsets(newOffsets);
        
        if (scrollProgressInternal >= 1) {
          setAnimationComplete(true);
          setHasBeenAnimated(true);
          setIsSectionPinned(false);
          cleanupListeners();
        }
        
        touchStartY = touchY;
        
        setTimeout(() => {
          isProcessingScroll = false;
        }, 16);
      }
    };

    // Cleanup function to remove all listeners
    const cleanupListeners = () => {
      if (wheelListener) {
        window.removeEventListener('wheel', wheelListener);
        wheelListener = null;
      }
      if (touchStartListener) {
        window.removeEventListener('touchstart', touchStartListener);
        touchStartListener = null;
      }
      if (touchMoveListener) {
        window.removeEventListener('touchmove', touchMoveListener);
        touchMoveListener = null;
      }
    };

    // Store listener references for cleanup
    wheelListener = handleWheel;
    touchStartListener = handleTouchStart;
    touchMoveListener = handleTouchMove;

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup on unmount or when conditions change
    return () => {
      cleanupListeners();
    };
  }, [isSectionPinned, animationComplete, hasBeenAnimated, cardOffsets]);
  
  // Effect to handle the transition when animation completes
  useEffect(() => {
    if (animationComplete) {
      // Small delay to ensure DOM updates complete
      setTimeout(() => {
        // Reset scroll behavior to normal
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 50);
    }
  }, [animationComplete]);

  // Final scroll release safeguard
  useEffect(() => {
    // Ensure no scroll interception persists after animation
    const handleGlobalWheel = () => {
      // Only allow normal scrolling if animation is truly complete
      if (animationComplete && hasBeenAnimated) {
        // Do NOT prevent default - allow normal scroll behavior
        return;
      }
    };

    // Add passive listener to monitor but not intercept
    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [animationComplete, hasBeenAnimated]);



  return (
    <div className="min-h-screen bg-white">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-medium">
            Welcome back, Purvanshu! Ready to explore premium properties?
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Premium Real Estate <br />
              <span className="font-thin text-blue-600">Experiences</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Discover exclusive properties curated for discerning clients. Our white-glove service ensures every detail meets your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/protected/buy" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Explore Properties
              </Link>
              <Link 
                to="/protected/contact" 
                className="inline-block bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-all duration-300 transform hover:-translate-y-1 shadow hover:shadow-md"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ EDITORIAL SCROLL SECTION - Brand Authority & Trust */}
      <section ref={sectionRef} className={`relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden`} style={{ height: '90vh' }}>
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 h-full">
            {/* LEFT COLUMN - FIXED CONTENT */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="space-y-12 max-w-lg">
                <p 
                  ref={eyebrowRef}
                  className={`text-sm uppercase tracking-widest text-gray-300 letter-spacing-1 transition-all duration-1000 ease-out ${
                    reveals.eyebrow 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 -translate-y-4'
                  }`}
                >
                  OUR EXPERTISE
                </p>
                
                <div>
                  <h2 
                    ref={headlineLine1Ref}
                    className={`text-5xl md:text-6xl font-light leading-tight transition-all duration-1000 ease-out ${
                      reveals.headlineLine1 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-6'
                    }`}
                  >
                    Unparalleled
                  </h2>
                  <h2 
                    ref={headlineLine2Ref}
                    className={`text-5xl md:text-6xl font-light leading-tight transition-all duration-1000 ease-out ${
                      reveals.headlineLine2 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-6'
                    }`}
                  >
                    Service
                  </h2>
                </div>
                
                <p 
                  ref={paragraphRef}
                  className={`text-xl text-gray-300 leading-relaxed transition-all duration-1000 ease-out ${
                    reveals.paragraph 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 -translate-y-4'
                  }`}
                >
                  With decades of experience in luxury real estate, we provide white-glove service to discerning clients worldwide.
                </p>
              </div>
            </div>
            
            {/* RIGHT COLUMN - SCROLLING STORY WITH DIVIDER */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
              <div className="pl-10 space-y-24" style={{ transform: `translateY(${scrollProgress * -300}px)` }}>
                {editorialServices.map((service, index) => (
                  <div 
                    key={index}
                    ref={serviceRefs[index]}
                    className={`transition-all duration-1000 ease-out ${
                      reveals.services[index] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ 
                      transform: `translateY(${cardOffsets[index]}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-3">{service}</h3>
                      <div className="h-px bg-gradient-to-r from-transparent to-gray-700 w-16"></div>
                    </div>
                    <div className="text-gray-400 text-base max-w-md">
                      {service === 'Property Acquisition' && 'Expert guidance through every step of your purchase, from initial search to final closing.'}
                      {service === 'Private Sales' && 'Exclusive access to off-market properties and confidential transactions for discerning clients.'}
                      {service === 'Investment Advisory' && 'Strategic advice on property investments with focus on long-term value and market trends.'}
                      {service === 'White-Glove Service' && 'Comprehensive support including staging, legal coordination, and post-sale assistance.'}
                      {service === 'Market Analysis' && 'In-depth research and analysis of market trends to guide your investment decisions.'}
                      {service === 'Portfolio Management' && 'Professional oversight of your property portfolio for optimal performance.'}
                      {service === 'Luxury Property Sourcing' && 'Specialized search for high-end properties meeting your exacting standards.'}
                      {service === 'International Relocation' && 'Seamless transition services for clients moving across borders.'}
                      {service === 'Property Valuation' && 'Accurate assessment of property values with detailed market comparables.'}
                      {service === 'Tenant Screening' && 'Comprehensive background checks and approval process for quality tenants.'}
                      {service === 'Lease Negotiation' && 'Expert negotiation of lease terms favorable to your interests.'}
                      {service === 'Property Maintenance' && 'Ongoing maintenance and care to preserve your property value.'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/10 to-transparent pointer-events-none"></div>
      </section>

      {/* Property Search Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Find Your Dream Property</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use our advanced search to filter properties based on your specific requirements
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Locations</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                  <option>Miami</option>
                  <option>San Francisco</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Types</option>
                  <option>Houses</option>
                  <option>Condos</option>
                  <option>Townhouses</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any Price</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                </select>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-12 rounded-lg transition-colors duration-300">
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Hub */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive services tailored to meet your real estate needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Property Management', desc: 'End-to-end property management services', icon: '🏢' },
              { title: 'Investment Advisory', desc: 'Expert guidance for property investments', icon: '💼' },
              { title: 'Legal Services', desc: 'Comprehensive legal support', icon: '⚖️' },
              { title: 'Home Staging', desc: 'Professional home staging services', icon: '🏠' }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumUserHomepage;