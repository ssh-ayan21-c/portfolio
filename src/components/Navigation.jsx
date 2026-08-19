import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('#amuse');

  const navItems = [
    { name: 'Home', href: '#amuse' },
    { name: 'Projects', href: '#projects' },
    { name: 'About me', href: '#about' },
    { name: 'Contact me', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      let current = '#amuse';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is currently mostly occupying the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = `#${section}`;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-12 left-12 z-[100] mix-blend-difference text-white">
      <ul className="flex flex-col gap-2">
        {navItems.map((item, index) => (
          <li 
            key={item.name}
            className="relative flex items-center"
          >
            {/* The sliding triangular arrow */}
            {activeSection === item.href && (
              <motion.div 
                layoutId="navArrow"
                className="absolute -left-6 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <a 
              href={item.href}
              className={`relative group text-2xl md:text-3xl font-bold tracking-tight transition-opacity ${activeSection === item.href ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full pointer-events-none"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
