"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FunkyNavbar from "@/components/ui/navbar";

function MouseTrail() {
  const [dots, setDots] = useState<{ x: number; y: number; id: string }[]>([]);

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setDots((prevDots) => [
  //       ...prevDots,
  //       {
  //         x: e.clientX,
  //         y: e.clientY,
  //         id: Math.random().toString(36).substring(2),
  //       },
  //     ]);
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  // useEffect(() => {
  //   if (dots.length > 30) {
  //     setDots((prevDots) => prevDots.slice(prevDots.length - 30));
  //   }
  // }, [dots]);

  return (
    <>
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="fixed pointer-events-none animate-dot"
          style={{ top: dot.y, left: dot.x }}
        />
      ))}
    </>
  );
}

function BackgroundSVGs() {
  const [svgs, setSvgs] = useState<
    { id: string; left: string; top: string; delay: string }[]
  >([]);

  useEffect(() => {
    const newSvgs = [];
    // Generate 7 SVG elements at random positions with random animation delays
    for (let i = 0; i < 7; i++) {
      newSvgs.push({
        id: Math.random().toString(36).substring(2),
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        delay: Math.random() * 5 + "s",
      });
    }
    setSvgs(newSvgs);
  }, []);

  return (
    <>
      {svgs.map((svg) => (
        <svg
          key={svg.id}
          className="background-svg"
          style={{ left: svg.left, top: svg.top, animationDelay: svg.delay }}
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Example envelope icon */}
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      ))}
    </>
  );
}

function ColdMailSection() {
  const [file, setFile] = useState<File | null>(null);
  const [professorName, setProfessorName] = useState("");
  const [generatedMail, setGeneratedMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedTemplate, setSelectedTemplate] = useState("research_inquiry");

  // Handle the submission via button click (no form submission event)
  const handleSubmit = async () => {
    if (!file || !professorName) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("prospect_name", professorName);
      formData.append("cv", file);
      // formData.append("selected_template_key", selectedTemplate);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate email.");
      }
      const result = await response.json();
      setGeneratedMail(result.email || "Error: No response from server.");
    } catch (error) {
      console.error("Error generating cold mail:", error);
      alert(
        "An error occurred while generating the cold mail. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="funky-input-group" style={{ animationDelay: "0.2s" }}>
        <Label htmlFor="cv" className="funky-label block mb-2">
          Upload your CV (PDF)
        </Label>
        <Input
          id="cv"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="mt-2 funky-input w-full"
        />
      </div>

      <div className="funky-input-group" style={{ animationDelay: "0.4s" }}>
        <Label htmlFor="professorName" className="funky-label block mb-2">
          Professor&apos;s Name
        </Label>
        <input
  id="professorName"
  value={professorName}
  onChange={(e) => {
    console.log("Typing:", e.target.value);
    setProfessorName(e.target.value);
  }}
  placeholder="Enter professor's name"
  className="mt-2 funky-input w-full"
        />
      </div>
      {/* <div className="funky-input-group" style={{ animationDelay: "0.4s" }}>
        <Label htmlFor="template" className="funky-label block mb-2">
          Select Email Template
        </Label>
        <select
          id="template"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="mt-2 funky-input w-full"
        >
          <option value="research_inquiry">Research Inquiry</option>
          <option value="collaboration_request">Collaboration Request</option>
          <option value="job_application">Job Application</option>
        </select>
      </div> */}

      <Button
        onClick={handleSubmit}
        className="w-full funky-button"
        style={{ animationDelay: "0.6s" }}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Cold Mail"}
      </Button>

      {generatedMail && (
        <div className="mt-8 funky-output" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-xl font-semibold funky-output-title mb-4">
            Generated Cold Mail:
          </h2>
          <Textarea
            value={generatedMail}
            readOnly
            className="w-full h-64 funky-textarea"
          />
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <>
      {/* Pass dark mode state and toggle function to the navbar */}
      <FunkyNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={darkMode ? "dark" : ""}>
        <MouseTrail />
        <BackgroundSVGs />
        {/* Main container with a creamy background similar to the inputs */}
        <div
          className={`min-h-screen w-full transition-colors duration-300 ${
            darkMode ? "bg-gray-900/40" : "bg-white/70"
          }`}
        >
          <header className="p-4 text-center relative z-10">
            <h1 className="funky-header">Generate Your Cold Email</h1>
          </header>
          <main className="flex flex-col items-center justify-center relative z-10 py-12">
            <div
              className="max-w-xl w-full p-9 m-4 funky-card"
              style={{ animationDelay: "0.1s" }}
            >
              <ColdMailSection />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
