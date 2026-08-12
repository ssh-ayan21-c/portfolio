import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedScrollBar from "./AnimatedScrollBar";
import { techLogos } from './TechLogos';

const textArray = "Ayan Mekrani".split("");

const AmuseHero = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [letters, setLetters] = useState([]);
  
  const letterNodes = useRef({});
  const groundNodes = useRef({});
  const { scrollY } = useScroll();
  
  // Fade out slightly on scroll
  const nameOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Wait briefly to ensure DOM spans have painted and font is loaded
    // to get accurate getBoundingClientRect measurements.
    const initPhysics = () => {
      const W = window.innerWidth - 64;
      const H = window.innerHeight - 64;

      const engine = Matter.Engine.create();
      engine.world.gravity.y = 0.4;
      engineRef.current = engine;
      
      const render = Matter.Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: W,
          height: H,
          wireframes: false,
          background: 'transparent',
        }
      });

      render.canvas.style.position = 'absolute';
      render.canvas.style.top = '0';
      render.canvas.style.left = '0';
      render.canvas.style.zIndex = '50';
      
      const containerRect = sceneRef.current.getBoundingClientRect();
      const groundParts = [];

      // Base flat ground below the text so things don't fall indefinitely
      const baseGround = Matter.Bodies.rectangle(W / 2, H - 5, W * 2, 40, { isStatic: true, render: { visible: false } });
      groundParts.push(baseGround);

      // Create Topographical Ground using exact DOM measurements
      for (let i = 0; i < textArray.length; i++) {
        const char = textArray[i];
        if (char === ' ') continue;
        
        const span = groundNodes.current[i];
        if (!span) continue;
        
        const rect = span.getBoundingClientRect();
        
        // Exact horizontal placement based on natural kerning
        const localX = (rect.left - containerRect.left) + (rect.width / 2);
        
        // Fine-tune vertical hitboxes based on character typography
        let h = rect.height;
        let yOffset = 0;
        
        if (['a', 'n', 'e', 'r'].includes(char)) {
          // Lowercase letters (x-height)
          h = rect.height * 0.65; 
          yOffset = rect.height * 0.175; // Shift down to baseline
        } else if (char === 'y') {
          // Descender letter
          h = rect.height * 0.8;
          yOffset = rect.height * 0.2; 
        } else {
          // Caps and ascenders ('A', 'M', 'k', 'i')
          h = rect.height * 0.85; // slightly shrink bounding box for realism
          yOffset = rect.height * 0.075;
        }

        const localY = (rect.top - containerRect.top) + (h / 2) + yOffset;
        
        const part = Matter.Bodies.rectangle(localX, localY, rect.width * 0.85, h, { isStatic: true, render: { visible: false } });
        groundParts.push(part);
      }

      const leftWall = Matter.Bodies.rectangle(-50, H / 2, 100, H * 2, { isStatic: true, render: { visible: false } });
      const rightWall = Matter.Bodies.rectangle(W + 50, H / 2, 100, H * 2, { isStatic: true, render: { visible: false } });

      Matter.World.add(engine.world, [...groundParts, leftWall, rightWall]);

      // Add mouse control
      const mouse = Matter.Mouse.create(render.canvas);
      
      // CRITICAL: Prevent Matter.js from hijacking the native page scroll
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
      
      // Some versions of Matter attach 'wheel' or touch listeners.
      mouse.element.removeEventListener("wheel", mouse.mousewheel);
      // We explicitly override the mousewheel function to do nothing
      mouse.mousewheel = () => {};

      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });
      Matter.World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      let syncId;
      const updateHTML = () => {
        Matter.Engine.update(engine, 1000 / 60);
        
        engine.world.bodies.forEach(body => {
          if (body.label && (body.label.startsWith('letter-') || body.label.startsWith('tech-logo-'))) {
            const node = letterNodes.current[body.id];
            if (node) {
              node.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
            }
          }
        });
        syncId = requestAnimationFrame(updateHTML);
      };
      
      syncId = requestAnimationFrame(updateHTML);
      spawnLetters(W, H);

      return { syncId, render };
    };

    // Run initialization slightly deferred to allow DOM to paint and apply fonts
    let cleanupData;
    const timeoutId = setTimeout(() => {
      cleanupData = initPhysics();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (cleanupData) {
        cancelAnimationFrame(cleanupData.syncId);
        Matter.Render.stop(cleanupData.render);
        if (engineRef.current) {
          Matter.World.clear(engineRef.current.world);
          Matter.Engine.clear(engineRef.current);
        }
        if (cleanupData.render.canvas) cleanupData.render.canvas.remove();
      }
    };
  }, []);

  const spawnLetters = (W, H) => {
    if (!engineRef.current) return;

    const size = 220; 
    const t = 45; // thickness of the strokes

    // Create Composite Body for 'A'
    const aX = W / 2 - 80;
    const aY = -300;
    const aLeftLeg = Matter.Bodies.rectangle(aX - 25, aY, t, size, { angle: 0.3 });
    const aRightLeg = Matter.Bodies.rectangle(aX + 25, aY, t, size, { angle: -0.3 });
    const aCrossBar = Matter.Bodies.rectangle(aX, aY + 10, 60, t);
    
    const bodyA = Matter.Body.create({
      parts: [aLeftLeg, aRightLeg, aCrossBar],
      restitution: 0.3,
      friction: 0.2,
      label: 'letter-A',
    });
    Matter.Body.setPosition(bodyA, { x: W / 2 - 120, y: -300 });

    // Create Composite Body for 'M'
    const mX = W / 2 + 120;
    const mY = -600;
    const mLeftLeg = Matter.Bodies.rectangle(mX - 50, mY, t, size);
    const mRightLeg = Matter.Bodies.rectangle(mX + 50, mY, t, size);
    const mLeftDiag = Matter.Bodies.rectangle(mX - 25, mY - 20, t, size * 0.8, { angle: -0.5 });
    const mRightDiag = Matter.Bodies.rectangle(mX + 25, mY - 20, t, size * 0.8, { angle: 0.5 });
    
    const bodyM = Matter.Body.create({
      parts: [mLeftLeg, mRightLeg, mLeftDiag, mRightDiag],
      restitution: 0.3,
      friction: 0.2,
      label: 'letter-M',
    });
    Matter.Body.setPosition(bodyM, { x: W / 2 + 120, y: -600 });
    
    // Create bodies for all tech logos
    const techBodies = techLogos.map((logo, index) => {
      const x = W / 4 + Math.random() * (W / 2);
      const y = -400 - Math.random() * 1100;
      const angle = Math.random() * Math.PI * 2;
      
      return Matter.Bodies.rectangle(x, y, 60, 60, {
        restitution: 0.5,
        friction: 0.1,
        angle: angle,
        label: `tech-logo-${index}`,
      });
    });

    const techLetterObjects = techBodies.map((body, index) => ({
      id: body.id,
      char: techLogos[index],
      size: 60,
      isLogo: true,
    }));

    Matter.World.add(engineRef.current.world, [bodyA, bodyM, ...techBodies]);
    setLetters([
      { id: bodyA.id, char: 'A', size },
      { id: bodyM.id, char: 'M', size },
      ...techLetterObjects
    ]);
  };

  return (
    <section id="amuse" className="relative w-full h-screen p-8 bg-[var(--color-secondary)]">
      <div className="curved-container w-full h-full relative overflow-hidden">
        
        {/* Top Left Heading */}
        <h3 className="absolute top-8 left-12 z-50 text-2xl font-serif text-[#1E293B]/50 italic">
          Discovery starts here...
        </h3>

        {/* Resume Top-Right Menu & ScrollBar */}
        <div className="fixed top-10 right-12 z-[100] flex items-center gap-6">
          <AnimatedScrollBar />
          <a 
            href="https://drive.google.com/file/d/1Ql0aHzIGcawV8KRFAxPEwKgakqQXO-1h/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1E293B] text-xl md:text-2xl font-bold tracking-widest uppercase hover:opacity-70 transition-opacity cursor-pointer"
          >
            Resume
          </a>
        </div>
        
        {/* Physics Canvas Container */}
        <div ref={sceneRef} className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing" />

        {/* HTML Rendered Falling Letters */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          {letters.map((letter) => (
            <div
              key={letter.id}
              ref={(el) => (letterNodes.current[letter.id] = el)}
              className="absolute top-0 left-0 flex items-center justify-center text-3d font-black"
              style={{
                width: `${letter.size}px`,
                height: `${letter.size}px`,
                marginLeft: `-${letter.size / 2}px`,
                marginTop: `-${letter.size / 2}px`,
                fontSize: `${letter.size}px`,
                lineHeight: 1,
                fontFamily: letter.isLogo ? undefined : "'Arial Black', Impact, sans-serif",
              }}
            >
              {letter.char}
            </div>
          ))}
        </div>

        {/* Topographical Floor Block - Rendered naturally to preserve perfect kerning */}
        <motion.div 
          className="absolute z-20 pointer-events-none select-none text-gray-800 opacity-20 whitespace-nowrap"
          style={{ 
            opacity: nameOpacity,
            right: '64px',
            bottom: '10px',
          }}
        >
          <div className="flex w-full">
            {textArray.map((char, idx) => (
              <span 
                key={idx} 
                ref={(el) => (groundNodes.current[idx] = el)}
                className="text-[11vw] font-bold leading-none tracking-tighter"
                style={{ 
                  fontFamily: "'Helvetica Neue', sans-serif",
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AmuseHero;
