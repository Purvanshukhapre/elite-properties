import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../design-system/motion';

const PageHeader = ({ title, subtitle, backgroundImage }) => {
    return (
        <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-premium-onyx">
            {/* Background Image/Video */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />
                <div className="absolute inset-0 bg-premium-onyx/20 z-10 mix-blend-multiply" />

                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                >
                    <div className="mb-4 flex items-center justify-center gap-4 opacity-80">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-premium-gold"></div>
                        <span className="text-premium-gold font-serif tracking-[0.2em] uppercase text-xs">
                            Elite Properties
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-premium-gold"></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-medium text-white mb-6 tracking-tight leading-tight">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Scroll indicator subtle hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>
            </motion.div>
        </div>
    );
};

export default PageHeader;
