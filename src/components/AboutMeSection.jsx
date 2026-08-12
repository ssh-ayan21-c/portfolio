import React from 'react';
import { motion } from 'framer-motion';

const UnblurText = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ filter: 'blur(10px)', opacity: 0, y: 20, skewY: 5 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, skewY: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} 
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

const AboutMeSection = () => {
  return (
    <section id="about" className="relative w-full h-screen px-8 pb-8 pt-0 bg-[var(--color-secondary)] z-30">
      <div className="curved-container w-full h-full relative overflow-hidden py-12 px-8 md:px-24 bg-[#E0FAF1] shadow-2xl flex flex-col justify-center">
        
        {/* Top Left Heading */}
        <h3 className="absolute top-8 left-12 z-50 text-2xl font-serif text-[#1E293B]/50 italic">
          A peek into my life...
        </h3>
        
        <div className="max-w-5xl mx-auto w-full">
          {/* Quote Section */}
          <div className="mb-4 pl-8 md:pl-48">
            <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-tight tracking-tighter">
              <span className="block">Crack complex algorithms.</span>
              <span className="block text-[#1E293B]/60">Design with bold intent.</span>
              <span className="block">Wire intelligence into pixels.</span>
            </h2>
            <svg width="120" height="20" viewBox="0 0 120 20" className="mt-4 text-[#1E293B]">
              <path d="M0,10 Q15,0 30,10 T60,10 T90,10 T120,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Bio Section */}
          <div className="space-y-2 text-2xl md:text-3xl text-[#1E293B] font-['Caveat'] text-right ml-auto max-w-3xl leading-relaxed mt-4">
            <UnblurText delay={0.1}>
              <p>Hey! I'm Ayan, a 21-year-old CS undergrad bridging the gap between sleek web interfaces and deep learning.</p>
            </UnblurText>
            
            <UnblurText delay={0.2}>
              <p>I love wiring computer vision into smart apps and casually untangling algorithms just to keep my logic sharp.</p>
            </UnblurText>
            
            <UnblurText delay={0.3}>
              <p>Outside the editor, you'll find me spending way too much time on socials, sketching out new ideas, framing up a good photo or completely absorbed in a cricket match.</p>
            </UnblurText>
          </div>

          {/* Education Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 pt-6 border-t-2 border-[#1E293B]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
          >
            <div>
              <h3 className="text-lg font-bold text-[#1E293B]/70 uppercase tracking-wider mb-1">Education</h3>
              <a href="https://iiitk.ac.in/" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-black text-[#1E293B] hover:text-[#1E293B]/70 transition-colors">
                Indian Institute of Information Technology Design & Manufacturing Kurnool
              </a>
            </div>
            <div className="text-left md:text-right flex flex-col items-start md:items-end">
              <span className="text-xl font-bold text-[#1E293B]">B.Tech Computer Science</span>
              <span className="text-lg text-[#1E293B]/70 font-semibold">(2023 - 27)</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
