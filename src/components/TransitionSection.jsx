import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const CircularText = () => {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mt-[-2rem] mb-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text fill="var(--theme-content)" fontSize="9.5" fontWeight="bold" letterSpacing="1.5" style={{ textTransform: 'uppercase' }}>
            <textPath href="#circlePath" startOffset="0%">
              checkout the stuffs i made • checkout the stuffs i made • 
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Thick 3D Arrow */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="relative z-10 w-24 h-24 flex items-center justify-center text-content"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="transparent">
            {/* Thick 3D arrow paths */}
            <path d="M40 10 h20 v40 h20 L50 90 L20 50 h20 z" stroke="var(--theme-content)" strokeWidth="12" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
};

const TransitionSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [designFont, setDesignFont] = useState('"Impact", "Helvetica Neue", sans-serif');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setDesignFont('"Impact", "Helvetica Neue", sans-serif'); // Structural
    } else if (latest < 0.66) {
      setDesignFont('"Playfair Display", "Times New Roman", serif'); // Elegant
    } else {
      setDesignFont('"Fira Code", "Courier New", monospace'); // Technical Mono
    }
  });

  // User's requested invertScroll for "design" strip
  const invertScroll = useTransform(scrollY, v => v * -1);

  // Map scroll progress to font weights (100 to 900)
  const makeWeightRaw = useTransform(scrollYProgress, [0.2, 0.6], [100, 900]);
  const stuffWeightRaw = useTransform(scrollYProgress, [0.6, 0.95], [100, 900]);
  
  // Elevator door horizontal splits
  const makeX = useTransform(scrollYProgress, [0.2, 0.9], ['-20vw', '0vw']);
  const stuffsX = useTransform(scrollYProgress, [0.2, 0.9], ['20vw', '0vw']);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[150vh] bg-[var(--color-secondary)] text-content z-10"
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-10 pb-0">
        
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 text-center select-none pointer-events-none">
          
          <div className="text-[10vh] font-bold font-sans leading-none mb-[-1vh]">
            I
          </div>
          
          <motion.div 
            className="flex items-center gap-8 text-[14vh] leading-none transition-all duration-300 whitespace-nowrap uppercase w-full"
            style={{ 
              fontFamily: designFont,
              x: invertScroll 
            }}
          >
            {[...Array(20)].map((_, i) => (
              <span 
                key={i} 
                className={i % 2 === 0 ? "text-content" : "text-transparent"}
                style={i % 2 !== 0 ? { WebkitTextStroke: '2px #1E293B' } : {}}
              >
                DESIGN
              </span>
            ))}
          </motion.div>
          
          <div 
            className="text-[12vh] font-black leading-tight text-transparent"
            style={{ WebkitTextStroke: '3px #1E293B' }}
          >
            &amp;
          </div>
          
          {/* Elevator Door Split for Make Stuffs */}
          <div className="flex gap-4">
            <motion.div 
              className="text-[14vh] leading-none"
              style={{ 
                fontWeight: makeWeightRaw,
                x: makeX
              }}
            >
              make
            </motion.div>
            
            <motion.div 
              className="text-[14vh] leading-none"
              style={{ 
                fontWeight: stuffWeightRaw,
                x: stuffsX
              }}
            >
              stuffs
            </motion.div>
          </div>
        </div>

        {/* Circular Spinner placed directly below typography */}
        <div className="mt-20">
            <CircularText />
        </div>
      </div>
    </section>
  );
};

export default TransitionSection;
