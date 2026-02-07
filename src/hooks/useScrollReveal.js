import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('show');
        }
    }, [controls, inView]);

    return { ref, controls };
};
