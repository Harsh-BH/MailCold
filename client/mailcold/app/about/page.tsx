"use client"; // If needed for client-side interactivity

import React, { useEffect, useState } from "react";

/**
 * Optional: You can separate this out into its own component file if desired.
 * This just generates floating SVG shapes in random positions for a fun effect.
 */
function FloatingShapes() {
  const [shapes, setShapes] = useState<
    { id: string; left: string; top: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    const newShapes = [];
    // Change the number of shapes as you like
    const NUMBER_OF_SHAPES = 8;
    for (let i = 0; i < NUMBER_OF_SHAPES; i++) {
      newShapes.push({
        id: Math.random().toString(36).substring(2),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        // random delay to stagger floating animations
        animationDelay: `${Math.random() * 2}s`,
      });
    }
    setShapes(newShapes);
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <svg
          key={shape.id}
          className="absolute w-12 h-12 text-pink-300 opacity-60 animate-ping-slow"
          // The `animate-ping-slow` is a custom utility we will define below,
          // or you can use a built-in like animate-ping with a custom duration.
          style={{
            left: shape.left,
            top: shape.top,
            animationDelay: shape.animationDelay,
          }}
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          {/* Just a simple circle shape; replace with any shape/path you like */}
          <circle cx="50" cy="50" r="50" />
        </svg>
      ))}
    </>
  );
}

/**
 * About Page Component
 */
export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff8dc] p-8">
      {/* Floating shapes in the background */}
      <FloatingShapes />

      <div className="max-w-3xl mx-auto relative z-10 mt-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#d1478d] animate-fade-in">
          Hello, I’m Jane Doe
        </h1>

        {/* Profile Image or Avatar */}
        <div className="flex items-center mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <img
            src="/path/to/your/profile-image.jpg"
            alt="Jane Doe"
            className="w-24 h-24 rounded-full ring-4 ring-blue-200 mr-4 hover:scale-105 transition-transform"
          />
          <p className="text-lg text-gray-700">
            A passionate developer & designer
          </p>
        </div>

        {/* Main About Content */}
        <div className="space-y-4 text-gray-700 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p>
            I'm a <strong>Full-Stack Developer</strong> with a love for building beautiful, responsive, and user-friendly applications.
            Over the years, I’ve honed my skills in React, Next.js, Node.js, and many more technologies.
          </p>
          <p>
            When I'm not coding, you can find me exploring the world, reading sci-fi novels, or experimenting with new UI/UX trends.
            My greatest joy is tackling complex problems and transforming them into elegant, optimized solutions that bring value to end-users.
          </p>
          <p>
            In the past, I’ve worked for several startups, led design workshops, and collaborated with talented teams globally.
            If you’d like to know more about my work, feel free to check out my projects or connect with me on social media.
          </p>
        </div>

        {/* Fun, Bouncy Button */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <a
            href="https://github.com/Harsh-BH"
            className="inline-block bg-[#d1478d] text-white py-3 px-6 rounded-md font-medium
                       hover:bg-[#d1478d] transition-colors
                       animate-bounce hover:animate-none"
          >
            Let’s Connect!
          </a>
        </div>
      </div>
    </div>
  );
}
