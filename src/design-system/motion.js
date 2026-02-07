// Premium Cinematic Ease (easeOutQuint-like but smoother)
export const TRANSITION_EASE = [0.16, 1, 0.3, 1];
export const DURATION_FAST = 0.4;
export const DURATION_NORMAL = 0.8; // Slower for luxury feel
export const DURATION_SLOW = 1.2;

export const STAGGER_CHILD = 0.15; // More distinct staggering
export const STAGGER_SECTION = 0.2;

// Parent variants for staggering children
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CHILD,
      delayChildren: 0.2, // Slight initial delay to let UI settle
    },
  },
};

// Standard fade up for content - Increased distance for visibility
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 }, // Increased from 30 to 60 for verified movement
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: TRANSITION_EASE,
      duration: DURATION_NORMAL,
    },
  },
};

// Reveal for images (scale and fade)
export const imageReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 40 }, // More dramatic scale/y
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ease: TRANSITION_EASE,
      duration: DURATION_SLOW,
    },
  },
};

// Page transition wrapper variants
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: DURATION_FAST, ease: TRANSITION_EASE },
};

// Admin reduced motion variants
export const adminFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
};
