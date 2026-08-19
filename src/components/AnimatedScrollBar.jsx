import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const numBars = 40; // Number of vertical lines

  return (
    <div className="flex items-center gap-[4px] pointer-events-none mt-1">
      {Array.from({ length: numBars }).map((_, i) => {
        const barPosition = i / (numBars - 1);
        
        // Use a function mapping to avoid WAAPI keyframe range errors
        const height = useTransform(scrollYProgress, (pos) => {
          const dist = Math.abs(pos - barPosition);
          if (dist > 0.15) return 6;
          return 24 - (dist / 0.15) * 18;
        });
        
        const opacity = useTransform(scrollYProgress, (pos) => {
          const dist = Math.abs(pos - barPosition);
          if (dist > 0.15) return 0.3;
          return 1 - (dist / 0.15) * 0.7;
        });

        return (
          <motion.div 
            key={i}
            style={{ height, opacity }}
            className="w-[2px] bg-content rounded-full"
          />
        );
      })}
    </div>
  );
};

export default AnimatedScrollBar;
