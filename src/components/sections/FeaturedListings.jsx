import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import propertyAPI from '../../api/property.api';
import FeaturedPropertyCard from '../cards/FeaturedPropertyCard';
import { fadeInUp } from '../../design-system/motion';

const FeaturedListings = () => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        container.scrollLeft += scrollSpeed;

        // Reset to start when reaching the end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoadingListings(true);
      try {
        const res = await propertyAPI.getAllProperties({ limit: 8 });
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
        setListings(list);
      } catch (err) {
        console.error('FeaturedListings fetch error:', err);
        setListings([]);
      } finally {
        setLoadingListings(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <span className="text-premium-gold font-bold tracking-widest text-sm uppercase mb-4 block">
            Curated Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Featured Estates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Discover extraordinary properties that redefine luxury living.
          </p>
        </motion.div>
      </div>

      {/* Drag/Scroll Container */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {loadingListings ? (
        <div className="w-full px-6 md:px-12 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-200 animate-spin">
              <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-gray-900"></div>
            </div>
            <p className="text-gray-500 font-medium">Loading Featured Properties...</p>
          </div>
        </div>
      ) : listings.length === 0 ? (
        <div className="w-full px-6 md:px-12 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-400 font-medium mb-2">No properties available right now</p>
            <p className="text-sm text-gray-500">Check back soon for more featured estates</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="w-full overflow-x-auto no-scrollbar pb-16 px-6 md:px-12 cursor-grab active:cursor-grabbing"
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            style={{
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-8 w-max">
              {listings.map((property, index) => (
                <div key={`${property._id || property.id}-${index}`} className="w-[360px] md:w-[400px] h-[520px] flex-shrink-0">
                  <FeaturedPropertyCard
                    property={property}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator Hint */}
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">Swipe or Drag to Explore</p>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedListings;