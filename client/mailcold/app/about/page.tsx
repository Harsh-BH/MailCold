"use client"; // If needed for client-side interactivity

import FunkyNavbar from "@/components/ui/navbar";
import React, { useEffect, useState } from "react";

function FloatingShapes() {
  const [shapes, setShapes] = useState<
    { id: string; left: string; top: string; animationDelay: string; type: number; rotation: string; color: string }[]
  >([]);

  useEffect(() => {
    const newShapes = [];
    const NUMBER_OF_SHAPES = 12;
    const colors = ["#ff69b4", "#ff1493", "#d1478d", "#9370db", "#ad5389", "#fed7aa"];
    
    for (let i = 0; i < NUMBER_OF_SHAPES; i++) {
      newShapes.push({
        id: Math.random().toString(36).substring(2),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        type: Math.floor(Math.random() * 6), // 0-5 for different shapes
        rotation: `${Math.random() * 360}deg`,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setShapes(newShapes);
  }, []);
  
  const renderShape = (type: number, color: string) => {
    switch(type) {
      case 0: // Star
        return (
          <svg viewBox="0 0 24 24" fill={color}>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
          </svg>
        );
      case 1: // Triangle
        return (
          <svg viewBox="0 0 24 24" fill={color}>
            <path d="M12 0 L24 24 L0 24 Z"/>
          </svg>
        );
      case 2: // Square with cut corner
        return (
          <svg viewBox="0 0 24 24" fill={color}>
            <path d="M0 0h16l8 8v16H0z"/>
          </svg>
        );
      case 3: // Heart
        return (
          <svg viewBox="0 0 24 24" fill={color}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 4: // Hexagon
        return (
          <svg viewBox="0 0 24 24" fill={color}>
            <path d="M12 2l10 6v8l-10 6-10-6V8z"/>
          </svg>
        );
      default: // Squiggly line
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
            <path d="M2 12s4-8 10 0 10-10 10 0"/>
          </svg>
        );
    }
  };

  return (
    <>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float opacity-40"
          style={{
            left: shape.left,
            top: shape.top,
            animationDelay: shape.animationDelay,
            transform: `rotate(${shape.rotation}) scale(${0.5 + Math.random() * 0.8})`,
            width: '40px',
            height: '40px',
          }}
        >
          {renderShape(shape.type, shape.color)}
        </div>
      ))}
    </>
  );
}

// Text typing animation component
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [text]);
  
  return <span className={className}>{displayedText}<span className="animate-blink">|</span></span>;
}

// Animated paragraph component with staggered reveal
function AnimatedParagraph({ 
  children, 
  delay 
}: { 
  children: React.ReactNode; 
  delay: string 
}) {
  return (
    <p 
      className="opacity-0 transform translate-y-4 animate-slide-up"
      style={{ 
        animationDelay: delay, 
        animationFillMode: 'forwards' 
      }}
    >
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <FunkyNavbar />
      <div className="relative min-h-screen overflow-hidden bg-[#fff8dc] p-8 textfont">
        <FloatingShapes />

        <div className="max-w-5xl mx-auto relative z-10 mt-10">
          {/* Replaced with typing animation */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#d1478d]">
            <TypingText text="Hello, I'm Harsh Bhatt" />
          </h1>

          {/* Profile Image with enhanced animation */}
          <div
            className="flex items-center mb-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHpOc-f0f3SYg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712610875428?e=1753920000&v=beta&t=Sysg_ZI_TmRXtlqVqZGegUordFrdJHyr9NOF1GbRloU"
              alt="Harsh Bhatt"
              className="w-24 h-24 rounded-full ring-4 ring-pink-400 mr-4 hover:scale-110 transition-transform duration-300"
            />
            <p className="text-3xl text-gray-700 animate-fade-right" style={{ animationDelay: "0.6s" }}>
              A passionate developer &amp; designer
            </p>
          </div>

          {/* Main About Content with staggered animations */}
          <div className="space-y-4 text-gray-700">
            <AnimatedParagraph delay="1.0s">
              I&apos;m a <strong>Full-Stack Developer</strong> with a love for
              building beautiful, responsive, and user-friendly applications.
              Over the years, I&apos;ve honed my skills in React, Next.js,
              Node.js, and many more technologies.
            </AnimatedParagraph>
            
            <AnimatedParagraph delay="1.3s">
              When I&apos;m not coding, you can find me exploring the world,
              reading sci-fi novels, or experimenting with new UI/UX trends.
              My greatest joy is tackling complex problems and transforming them
              into elegant, optimized solutions that bring value to end-users.
            </AnimatedParagraph>
            
            <AnimatedParagraph delay="1.6s">
              In the past, I&apos;ve worked for several startups, led design
              workshops, and collaborated with talented teams globally. If
              you&apos;d like to know more about my work, feel free to check out
              my projects or connect with me on social media.
            </AnimatedParagraph>
          </div>

          {/* Enhanced Button Animation */}
          <div
            className="mt-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "2s", animationFillMode: 'forwards' }}
          >
            <a
              href="https://github.com/Harsh-BH"
              className="inline-block bg-[#d1478d] text-white py-3 px-6 rounded-md font-medium
                         hover:bg-[#e05a9d] hover:scale-105 transition-all duration-300
                         relative overflow-hidden group"
            >
              <span className="relative z-10">Let&apos;s Connect!</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
