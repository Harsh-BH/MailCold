"use client"; // If needed for client-side interactivity

import FunkyNavbar from "@/components/ui/navbar";
import React, { useEffect, useState } from "react";

function FloatingShapes() {
  const [shapes, setShapes] = useState<
    { id: string; left: string; top: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    const newShapes = [];
    const NUMBER_OF_SHAPES = 8;
    for (let i = 0; i < NUMBER_OF_SHAPES; i++) {
      newShapes.push({
        id: Math.random().toString(36).substring(2),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
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
          style={{
            left: shape.left,
            top: shape.top,
            animationDelay: shape.animationDelay,
          }}
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      ))}
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <FunkyNavbar />
      <div className="relative min-h-screen overflow-hidden bg-[#fff8dc] p-8 textfont">
        <FloatingShapes />

        <div className="max-w-5xl mx-auto relative z-10 mt-10">
          {/* Escaped apostrophe here */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#d1478d] animate-fade-in">
            Hello, I&apos;m Harsh Bhatt
          </h1>

          {/* Profile Image or Avatar */}
          <div
            className="flex items-center mb-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHpOc-f0f3SYg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1712610875428?e=1744848000&v=beta&t=CSA_Z0QD954Td8mVyJn0k3jQWLcVq6UBnS2-tYySyRw"
              alt="Harsh Bhatt"
              className="w-24 h-24 rounded-full ring-4 ring-blue-200 mr-4 hover:scale-105 transition-transform"
            />
            <p className="text-3xl text-gray-700">
              A passionate developer &amp; designer
            </p>
          </div>

          {/* Main About Content */}
          <div
            className="space-y-4 text-gray-700 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            {/* Escaped apostrophe here */}
            <p>
              I&apos;m a <strong>Full-Stack Developer</strong> with a love for
              building beautiful, responsive, and user-friendly applications.
              Over the years, I&apos;ve honed my skills in React, Next.js,
              Node.js, and many more technologies.
            </p>
            {/* Escaped apostrophe here */}
            <p>
              When I&apos;m not coding, you can find me exploring the world,
              reading sci-fi novels, or experimenting with new UI/UX trends.
              My greatest joy is tackling complex problems and transforming them
              into elegant, optimized solutions that bring value to end-users.
            </p>
            {/* Escaped apostrophe here */}
            <p>
              In the past, I&apos;ve worked for several startups, led design
              workshops, and collaborated with talented teams globally. If
              you&apos;d like to know more about my work, feel free to check out
              my projects or connect with me on social media.
            </p>
          </div>

          {/* Fun, Bouncy Button */}
          <div
            className="mt-8 animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="https://github.com/Harsh-BH"
              className="inline-block bg-[#d1478d] text-white py-3 px-6 rounded-md font-medium
                         hover:bg-[#d1478d] transition-colors
                         animate-bounce hover:animate-none"
            >
              Let&apos;s Connect!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
