import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';

const ContactMeSection = () => {
  const socials = [
    { name: 'Email', icon: <FaEnvelope />, href: 'mailto:ayanmekrani21@gmail.com' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ayan-mekrani-bb091b2a6/' },
    { name: 'GitHub', icon: <FaGithub />, href: 'https://github.com/ssh-ayan21-c/' },
    { name: 'Twitter', icon: <FaXTwitter />, href: 'https://x.com/Ayan21Its' },
  ];

  return (
    <section id="contact" className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#111] text-white z-10 px-8 py-24 border-t-2 border-[#222]">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter leading-none text-center mb-16 text-transparent"
        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
      >
        GET IN TOUCH
      </motion.h2>

      <div className="flex gap-8 md:gap-16 items-center justify-center">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl md:text-6xl text-white/50 hover:text-white transition-colors duration-300"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1, // Stagger effect
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      <div className="absolute bottom-8 text-white/30 text-sm font-mono tracking-widest uppercase">
        © {new Date().getFullYear()} Ayan Mekrani.
      </div>
    </section>
  );
};

export default ContactMeSection;
