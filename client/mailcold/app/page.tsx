"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/ui/navbar";

function MouseTrail() {
  const [dots, setDots] = useState<{ x: number; y: number; id: string }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setDots((prevDots) => [
        ...prevDots,
        {
          x: e.clientX,
          y: e.clientY,
          id: Math.random().toString(36).substring(2),
        },
      ]);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (dots.length > 30) {
      setDots((prevDots) => prevDots.slice(prevDots.length - 30));
    }
  }, [dots]);

  return (
    <>
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="fixed pointer-events-none animate-dot"
          style={{
            top: dot.y,
            left: dot.x,
          }}
        />
      ))}
    </>
  );
}

function ColdMailForm() {
  const [file, setFile] = useState<File | null>(null);
  const [professorName, setProfessorName] = useState("");
  const [generatedMail, setGeneratedMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !professorName) return;

    setIsLoading(true);


    try {

      const formData = new FormData();

      formData.append("prospect_name", professorName);
      formData.append("cv", file);
      // formData.append("extra_link", "...");
      // formData.append("product_description", "...");
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
      alert("An error occurred while generating the cold mail. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div style={{ animationDelay: "0.2s" }}>
        <Label htmlFor="cv" className="text-gray-700 dark:text-gray-200 font-medium">
          Upload your CV (PDF)
        </Label>
        <Input
          id="cv"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="mt-2 bg-white/70 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200
                     placeholder-gray-500 dark:placeholder-gray-400
                     border-gray-300 dark:border-gray-700
                     focus:ring-gray-500 focus:border-gray-500 transition duration-200"
        />
      </div>

      <div style={{ animationDelay: "0.4s" }}>
        <Label htmlFor="professorName" className="text-gray-700 dark:text-gray-200 font-medium">
          Professor&apos;s Name
        </Label>
        <Input
          id="professorName"
          value={professorName}
          onChange={(e) => setProfessorName(e.target.value)}
          required
          className="mt-2 bg-white/70 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200
                     placeholder-gray-500 dark:placeholder-gray-400
                     border-gray-300 dark:border-gray-700
                     focus:ring-gray-500 focus:border-gray-500 transition duration-200"
          placeholder="Enter professor's name"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-500
                   text-white font-semibold transition-all duration-300 disabled:opacity-70 mt-4"
        style={{ animationDelay: "0.6s" }}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Cold Mail"}
      </Button>

      {generatedMail && (
        <div className="mt-8" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Generated Cold Mail:
          </h2>
          <Textarea
            value={generatedMail}
            readOnly
            className="w-full h-64 bg-white/70 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200
                       placeholder-gray-500 dark:placeholder-gray-400
                       resize-none border-gray-300 dark:border-gray-700
                       focus:ring-gray-500 focus:border-gray-500"
          />
          </div>

      )}
      </form>

  );
}

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
    <Navbar/>
    <div className={darkMode ? "dark" : ""}>
      <MouseTrail />
      <div
        className={`min-h-screen w-full transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <header className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Generate Your Cold Email
          </h1>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 px-4 py-2
                       transition-colors duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </header>

        <main className="flex flex-col items-center justify-center">
          <div
            className="max-w-xl w-full p-6 m-4
                       bg-white/30 dark:bg-gray-800/30
                       backdrop-blur-sm
                       border border-white/20 dark:border-gray-700/30
                       rounded-2xl shadow-xl animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <ColdMailForm />
          </div>
        </main>
      </div>
      </div>
      </>

  );
}
