import React, { useRef, useEffect, useState, useCallback } from 'react';
import propertyAPI from '../../api/property.api';
import FeaturedPropertyCard from '../cards/FeaturedPropertyCard';

const FeaturedListings = () => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [displayListings, setDisplayListings] = useState([]);
  const [realListings, setRealListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [centerIndex, setCenterIndex] = useState(0);
  
  const BUFFER_SIZE = 5;
  const CARD_WIDTH = 380; // 360px card + 20px gap
  
  // Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      setLoadingListings(true);
      try {
        const res = await propertyAPI.getAllProperties({ limit: 20 });
        console.log('FeaturedListings API Response:', res);

        // Normalize backend response to array
        let list = [];
        if (res && res.success) {
          const d = res.data;
          console.log('Response data structure:', d);
          
          if (Array.isArray(d)) {
            list = d;
          } else if (Array.isArray(d?.posts)) {
            list = d.posts;
          } else if (Array.isArray(d?.propertyPosts)) {
            list = d.propertyPosts;
          } else if (Array.isArray(res?.data?.propertyPosts)) {
            list = res.data.propertyPosts;
          } else {
            console.warn('Could not normalize properties response; unrecognized structure:', d);
            list = [];
          }
          console.log('Normalized listings count:', list.length);
        } else {
          console.error('FeaturedListings API response unsuccessful:', res);
        }
        
        setRealListings(list);
        
        // Create display listings with seamless infinite loop logic
        if (list.length > 0) {
          // Create extended array with buffer items
          const extendedList = [];
          
          // Add buffer items at the beginning (copies of the last items)
          for (let i = list.length - BUFFER_SIZE; i < list.length; i++) {
            extendedList.push({ ...list[i % list.length], isBuffer: true, bufferType: 'start' });
          }
          
          // Add all real items
          list.forEach((item, idx) => {
            extendedList.push({ ...item, isBuffer: false, realIndex: idx });
          });
          
          // Add buffer items at the end (copies of the first items)
          for (let i = 0; i < BUFFER_SIZE; i++) {
            extendedList.push({ ...list[i % list.length], isBuffer: true, bufferType: 'end' });
          }
          
          setDisplayListings(extendedList);
        } else {
          setDisplayListings([]);
        }
      } catch (err) {
        console.error('FeaturedListings fetch error:', err);
        setDisplayListings([]);
      } finally {
        setLoadingListings(false);
      }
    };

    fetchListings();
  }, []);
  
  // Update center card based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const calculateCenterCard = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const centerPos = scrollLeft + containerWidth / 2;
      const cardIndex = Math.round(centerPos / CARD_WIDTH);
      
      // Account for buffer items
      const adjustedIndex = cardIndex - BUFFER_SIZE;
      setCenterIndex(Math.max(0, Math.min(realListings.length - 1, adjustedIndex)));
    };
    
    const handleScroll = () => {
      calculateCenterCard();
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [realListings.length]);
  
  // Auto scroll effect
  useEffect(() => {
    if (!scrollContainerRef.current || displayListings.length === 0 || isHovered || isDragging) return;
    
    let animationFrameId;
    const container = scrollContainerRef.current;
    const scrollSpeed = 0.6; // Slow speed for premium feel
    
    const autoScroll = () => {
      // Check if we're approaching the end buffer
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - (CARD_WIDTH * BUFFER_SIZE)) {
        // Instantly jump to equivalent position in real items
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = CARD_WIDTH * BUFFER_SIZE + (container.scrollLeft - (maxScroll - (CARD_WIDTH * BUFFER_SIZE)));
        container.style.scrollBehavior = 'smooth';
      } else {
        container.scrollLeft += scrollSpeed;
      }
      
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    animationFrameId = requestAnimationFrame(autoScroll);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, isDragging, displayListings.length]);
  
  // Handle drag functionality
  const handleMouseDown = useCallback((e) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setDragStart({
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    });
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStart.x) * 2; // Multiply to increase sensitivity
    container.scrollLeft = dragStart.scrollLeft - walk;
  }, [isDragging, dragStart]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Add event listeners for drag
  useEffect(() => {
    if (!isDragging) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  // Touch events for mobile
  const handleTouchStart = useCallback((e) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    });
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - dragStart.x) * 2;
    container.scrollLeft = dragStart.scrollLeft - walk;
  }, [isDragging, dragStart]);
  
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Edge Fade Effects */}
      <div className="absolute top-0 left-0 w-24 h-full z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" style={{ background: 'linear-gradient(to right, #f3f4f6, transparent)' }}></div>
      <div className="absolute top-0 right-0 w-24 h-full z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" style={{ background: 'linear-gradient(to left, #f3f4f6, transparent)' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-premium-gold font-bold tracking-widest text-sm uppercase mb-4 block">
            Curated Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Featured Estates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Discover extraordinary properties that redefine luxury living.
          </p>
        </div>
      </div>

      {loadingListings ? (
        <div className="w-full px-6 md:px-12 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-200 animate-spin">
              <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-gray-900"></div>
            </div>
            <p className="text-gray-500 font-medium">Loading Featured Properties...</p>
          </div>
        </div>
      ) : displayListings.length === 0 ? (
        <div className="w-full px-6 md:px-12 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-400 font-medium mb-2">No properties available right now</p>
            <p className="text-sm text-gray-500">Check back soon for more featured estates</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div
            className="w-full overflow-x-auto no-scrollbar pb-16 px-6 md:px-12 cursor-grab active:cursor-grabbing"
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            <div className="flex gap-5 w-max" style={{ minWidth: `${displayListings.length * CARD_WIDTH}px` }}>
              {displayListings.map((property, index) => {
                // Calculate transform based on distance from center
                const scrollPos = scrollContainerRef.current?.scrollLeft || 0;
                const containerWidth = scrollContainerRef.current?.clientWidth || 800;
                const centerPos = scrollPos + containerWidth / 2;
                const cardCenterPos = index * CARD_WIDTH + CARD_WIDTH / 2;
                const distanceFromCenter = Math.abs(centerPos - cardCenterPos);
                const maxDistance = containerWidth / 2;
                
                // Scale and opacity based on distance from center
                const scale = Math.max(0.9, 1.05 - (distanceFromCenter / maxDistance) * 0.15);
                const opacity = Math.max(0.6, 1 - (distanceFromCenter / maxDistance) * 0.4);
                
                const isCenter = Math.abs(index - (centerIndex + BUFFER_SIZE)) < 1;
                
                return (
                  <div 
                    key={`${property._id || property.id}-${index}`} 
                    className="w-[360px] h-[520px] flex-shrink-0 transition-all duration-300 ease-out"
                    style={{
                      transform: `scale(${scale})`,
                      opacity: opacity,
                      zIndex: isCenter ? 10 : 1,
                    }}
                  >
                    <FeaturedPropertyCard
                      property={property}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator Hint */}
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">Swipe or Drag to Explore • Hover to Pause</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedListings;