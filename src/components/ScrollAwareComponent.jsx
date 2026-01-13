import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion'; // eslint-disable-line no-unused-vars



// RevealOnScroll component - reveals content as user scrolls
export const RevealOnScroll = ({ children, threshold = 0.1, once = true }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );
    
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, threshold, once]);
  
  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        staggerChildren: 0.15
      } 
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// ParallaxSection component - creates parallax effects
export const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY;
        const scrolled = scrollY * speed;
        
        setPosition({
          x: 0,
          y: scrolled
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${position.y}px)`
      }}
    >
      {children}
    </div>
  );
};

// FloatingElements component - adds floating elements with scroll awareness
export const FloatingElements = ({ elements = [] }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {elements.map((element, index) => {
        const translateY = scrollY * element.endY * 0.01;
        const rotation = scrollY * element.endRotation * 0.001 + (element.startRotation || 0);
        
        return (
          <motion.div
            key={index}
            className={element.className}
            style={{
              left: element.left,
              top: element.top,
            }}
            animate={{
              y: translateY,
              rotate: rotation,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            {element.content}
          </motion.div>
        );
      })}
    </>
  );
};

// ScrollIndicator component - shows scroll progress
export const ScrollIndicator = ({ color = "#006AFF" }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollY(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 z-50"
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div
        className="h-full"
        style={{ backgroundColor: color }}
        animate={{ width: `${scrollY}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

// FadeInSection component - fades in sections as they come into view
export const FadeInSection = ({ children, threshold = 0.1 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold }
    );
    
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, threshold]);
  
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" 
      } 
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};