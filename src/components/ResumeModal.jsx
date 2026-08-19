import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[var(--theme-primary)] rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/10 dark:bg-[#D9EAFD]/20 flex items-center justify-center text-content hover:bg-black/20 dark:hover:bg-[#D9EAFD]/40 transition-colors z-50 pointer-events-auto cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex flex-col md:flex-row min-h-max md:min-h-full">
            {/* Left Column: Header, Experience, Projects */}
            <div className="w-full md:w-7/12 p-8 md:p-12 border-b md:border-b-0 md:border-r border-content/10">
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-content dark:text-[#D9EAFD] mb-2 tracking-tight">Ayan Mekrani</h1>
                <p className="text-xl md:text-2xl text-content/70 font-medium mb-6">Software Engineer</p>
                
                <a 
                  href="https://drive.google.com/file/d/1Ql0aHzIGcawV8KRFAxPEwKgakqQXO-1h/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-content text-[var(--theme-primary)] dark:bg-[#D9EAFD] dark:text-[#0F172A] px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform pointer-events-auto cursor-pointer"
                >
                  Download PDF
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </a>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-content dark:text-[#D9EAFD] border-b border-content/10 pb-2 mb-6">Experience</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-content">Machine Learning Intern</h3>
                  <p className="text-sm font-semibold text-content/60 mb-2 uppercase tracking-wide">Ganpat University, Mehsana • Jun 2025 - Jul 2025</p>
                  <ul className="list-disc list-outside ml-4 text-content/80 space-y-1">
                    <li>Built and trained a dual-branch Vision Transformer model to classify crop leaf diseases using image datasets.</li>
                    <li>Added a custom channel-wise attention mechanism to combine class tokens, improving precision by 10%.</li>
                    <li>Tuned hyperparameters using Google Colab GPUs to reduce training time.</li>
                  </ul>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-content dark:text-[#D9EAFD] border-b border-content/10 pb-2 mb-6">Projects</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-content">College Library Management System</h3>
                  <p className="text-sm font-semibold text-content/60 mb-2">React, Node.js, Express.js, MongoDB, AWS EC2</p>
                  <ul className="list-disc list-outside ml-4 text-content/80 space-y-1">
                    <li>Built a full-stack library management system with 10 modules. Added JWT for user login and Razorpay.</li>
                    <li>Used cron jobs and MongoDB indexing in the backend to drop average API response times to 41.2ms.</li>
                    <li>Deployed the application on AWS EC2 and Vercel. Handled 23,000 HTTP requests at 50 requests per second.</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-content">KMT - B2B Automotive Wholesale Platform</h3>
                  <p className="text-sm font-semibold text-content/60 mb-2">React, Node.js, MongoDB</p>
                  <ul className="list-disc list-outside ml-4 text-content/80 space-y-1">
                    <li>Built a full-stack B2B platform for automotive parts with private catalogs and buyer verification.</li>
                    <li>Implemented JWT authentication, Google OAuth, and role-based access control for secure management.</li>
                    <li>Designed a responsive mobile-first UI and optimized APIs for smooth and scalable performance.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Skills, Education, Achievements */}
            <div className="w-full md:w-5/12 p-8 md:p-12 bg-black/5 dark:bg-white/5 h-full">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-content dark:text-[#D9EAFD] border-b border-content/10 pb-2 mb-6">Skills</h2>
                
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-content/70 uppercase mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['C', 'C++', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-content/10 dark:bg-[#D9EAFD] dark:text-[#0F172A] rounded-full text-sm font-medium text-content">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-content/70 uppercase mb-2">Web Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Node.js', 'Express.js', 'ASP.NET Core', 'Tailwind CSS'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-content/10 dark:bg-[#D9EAFD] dark:text-[#0F172A] rounded-full text-sm font-medium text-content">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-content/70 uppercase mb-2">Machine Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PyTorch', 'Scikit-learn', 'Pandas', 'Computer Vision', 'NLP', 'Transformers'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-content/10 dark:bg-[#D9EAFD] dark:text-[#0F172A] rounded-full text-sm font-medium text-content">{skill}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-content/70 uppercase mb-2">Databases & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {['MongoDB', 'PostgreSQL', 'AWS EC2', 'Docker', 'Git', 'Vercel'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-content/10 dark:bg-[#D9EAFD] dark:text-[#0F172A] rounded-full text-sm font-medium text-content">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-content dark:text-[#D9EAFD] border-b border-content/10 pb-2 mb-6">Education</h2>
                <div>
                  <h3 className="text-lg font-bold text-content">IIITDM Kurnool</h3>
                  <p className="text-sm font-semibold text-content/60 mb-1 uppercase tracking-wide">Aug 2023 - Present</p>
                  <p className="text-content/80">Bachelor of Technology in Computer Science and Engineering</p>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-content dark:text-[#D9EAFD] border-b border-content/10 pb-2 mb-6">Leadership & Achievements</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-content">Google Developer Groups (GDG)</h3>
                  <p className="text-sm font-semibold text-content/60 mb-1">Data Structures and Algorithms Coordinator</p>
                  <p className="text-sm text-content/80">Lead weekly coding workshops and practice sessions for 50 student members.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-content">Coding Competitions</h3>
                  <ul className="list-disc list-outside ml-4 text-sm text-content/80 space-y-1">
                    <li>Top 5% among 10,000 global participants in Codeforces.</li>
                    <li>Peak global rank of 286 in CodeChef (3-star rating).</li>
                    <li>1500 contest rating on LeetCode.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal;
