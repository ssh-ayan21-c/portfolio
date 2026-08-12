import React from 'react';
import Navigation from './components/Navigation';
import AmuseHero from './components/AmuseHero';
import TransitionSection from './components/TransitionSection';
import ProjectsSection from './components/ProjectsSection';
import AboutMeSection from './components/AboutMeSection';
import ContactMeSection from './components/ContactMeSection';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] relative overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      {/* Hero Section */}
      <AmuseHero />

      <TransitionSection />
      <ProjectsSection />
      <AboutMeSection />
      <ContactMeSection />
    </div>
  );
}

export default App;
