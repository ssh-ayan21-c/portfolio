import React, { useState } from 'react';

const projects = [
  { 
    id: 1, 
    title: 'KMT - B2B Automotive Wholesale Platform', 
    color: '#D9EAFD', 
    description: 'A full-stack platform for automotive parts featuring private catalogs, JWT/OAuth security, and a responsive mobile-first UI.',
    image: '/project1.png'
  },
  { 
    id: 2, 
    title: 'Cross crop leaf disease detection', 
    color: '#F8FAFC', 
    description: 'A dual-branch Vision Transformer with custom channel-wise attention to classify crop diseases, tuned to outperform traditional ML baselines.' 
  },
  { 
    id: 3, 
    title: 'College Library Management System', 
    color: '#9AA6B2', 
    description: 'A scalable full-stack system deployed on AWS EC2 featuring 10 modules, Razorpay, and backend optimizations handling 23,000 load test requests.' 
  },
  { 
    id: 4, 
    title: 'Real-time AI Voice Agent', 
    color: '#DCF5F6', 
    description: 'A low-latency multilingual voice agent for healthcare and finance, featuring WebSocket audio, secure PII-redacting RAG, and live conversation analysis.' 
  },
];

const ProjectsSection = () => {
  const [activeProjectId, setActiveProjectId] = useState(null);

  const toggleProject = (id) => {
    setActiveProjectId(activeProjectId === id ? null : id);
  };

  return (
    <section id="projects" className="relative w-full min-h-screen px-8 pb-8 pt-0 bg-[var(--color-secondary)] z-20 mt-[-25vh]">
      <div className="curved-container w-full min-h-[90vh] relative overflow-hidden py-16 bg-[var(--color-primary)]">
        
        {/* Top Left Heading */}
        <h3 className="absolute top-8 left-12 z-50 text-2xl font-serif text-[#1E293B]/50 italic">
          Tiny section of my works...
        </h3>
        
        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-3xl mx-auto h-[70vh]">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`absolute w-full h-auto min-h-[55vh] rounded-[40px] p-6 md:p-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col justify-between cursor-pointer group transition-all duration-500 overflow-hidden ${activeProjectId === project.id ? '-translate-y-8' : 'hover:-translate-y-8'}`}
              onClick={() => toggleProject(project.id)}
              style={{ 
                  backgroundColor: project.color,
                  top: `${index * 80}px`,
                  zIndex: activeProjectId === project.id ? 50 : index,
              }}
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="max-w-[70%]">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1E293B] group-hover:scale-105 transition-transform duration-500 origin-top-left">
                    {project.title}
                  </h3>
                  
                  {/* Expandable Description */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${activeProjectId === project.id ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}
                  >
                    <p className="text-xl md:text-2xl text-[#1E293B]/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-medium text-[#1E293B]/50">
                  0{index + 1}
                </span>
              </div>

              {project.image && (
                <div className="absolute right-0 bottom-4 w-48 md:w-64 opacity-80 mix-blend-multiply pointer-events-none group-hover:scale-110 transition-transform duration-700 origin-bottom-right">
                  <img src={project.image} alt={project.title} className="w-full h-auto object-contain" />
                </div>
              )}

              <div className="flex justify-end items-end pb-10 relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#1E293B] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
