import { useEffect } from 'react';

// Custom cursor effect for luxury feel
export const useLuxuryCursor = () => {
  useEffect(() => {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('luxury-cursor');
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #2563EB;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease-out;
      transform: translate(-50%, -50%);
      background: transparent;
    `;
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('luxury-cursor-follower');
    cursorFollower.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid #2563EB;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      mix-blend-mode: difference;
      transition: transform 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out;
      transform: translate(-50%, -50%);
      background: transparent;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let requestRef;
    
    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const animate = () => {
      // Smooth animation for follower
      followerX += (mouseX - followerX) / 5;
      followerY += (mouseY - followerY) / 5;
      
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      
      requestRef = requestAnimationFrame(animate);
    };
    
    // Mouse interaction handlers
    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
    };
    
    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    };
    
    const handleMouseEnterInteractive = (e) => {
      if (e.target.closest('button, a, input, select, textarea, [role="button"], [role="link"]')) {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
      }
    };
    
    const handleMouseLeaveInteractive = (e) => {
      if (e.target.closest('button, a, input, select, textarea, [role="button"], [role="link"]')) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
      }
    };
    
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnterInteractive);
    document.addEventListener('mouseout', handleMouseLeaveInteractive);
    
    animate();
    
    return () => {
      cancelAnimationFrame(requestRef);
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (cursorFollower && cursorFollower.parentNode) {
        cursorFollower.parentNode.removeChild(cursorFollower);
      }
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnterInteractive);
      document.removeEventListener('mouseout', handleMouseLeaveInteractive);
    };
  }, []);
};

// Particle effect for interactive elements
export const createParticleEffect = (x, y) => {
  const particles = 15;
  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #2563EB;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9997;
      left: ${x}px;
      top: ${y}px;
      animation: particle-float-${i % 4} 1s ease-out forwards;
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes particle-float-0 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.cos(i * 0.5) * 30}px, ${Math.sin(i * 0.3) * 30}px) scale(0);
            opacity: 0;
          }
        }
        @keyframes particle-float-1 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.cos(i * 0.7) * 40}px, ${Math.sin(i * 0.5) * 40}px) scale(0);
            opacity: 0;
          }
        }
        @keyframes particle-float-2 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.cos(i * 0.3) * 50}px, ${Math.sin(i * 0.7) * 50}px) scale(0);
            opacity: 0;
          }
        }
        @keyframes particle-float-3 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.cos(i * 0.9) * 35}px, ${Math.sin(i * 0.4) * 35}px) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);
  }
};

// Add interactive click effects to all buttons
export const addClickEffects = () => {
  const buttons = document.querySelectorAll('button, [role="button"], a[href^="#"]');
  
  const handleClick = (e) => {
    const button = e.target.closest('button, [role="button"], a[href^="#"]');
    if (!button) return;
    
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(37, 99, 235, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    ripple.style.overflow = 'hidden';
    
    // Add ripple to button
    const originalPosition = button.style.position;
    if (originalPosition !== 'relative') {
      button.style.position = 'relative';
    }
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
      // Restore original position if needed
      if (originalPosition !== 'relative') {
        button.style.position = originalPosition;
      }
    }, 600);
    
    // Also create particle effect
    const xCoord = e.clientX;
    const yCoord = e.clientY;
    createParticleEffect(xCoord, yCoord);
  };
  
  // Create ripple animation keyframes
  const existingStyle = document.getElementById('ripple-animation-style');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'ripple-animation-style';
    style.textContent = `
      @keyframes ripple { 
        to { 
          transform: scale(2); 
          opacity: 0; 
        } 
      }
    `;
    document.head.appendChild(style);
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
  
  return () => {
    buttons.forEach(button => {
      button.removeEventListener('click', handleClick);
    });
  };
};