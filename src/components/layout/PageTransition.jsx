import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageTransition } from '../../design-system/motion';

const PageTransition = ({ children, className = "" }) => {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
