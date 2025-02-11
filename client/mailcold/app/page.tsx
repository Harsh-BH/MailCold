"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FunkyNavbar from "@/components/ui/navbar";

// -------------------------------------------
// SVG Background Animation (unchanged)
// -------------------------------------------
function BackgroundSVGs() {
  const [svgs, setSvgs] = useState<
    { id: string; left: string; top: string; delay: string }[]
  >([]);

  useEffect(() => {
    const newSvgs = [];
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

// -------------------------------------------
// ColdMailSection handles only the form inputs
// -------------------------------------------
type ColdMailSectionProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  professorName: string;
  setProfessorName: React.Dispatch<React.SetStateAction<string>>;
  ProjectInfo: string;
  setProjectInfo: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handleSubmit: () => void;
};

function ColdMailSection({
  file,
  setFile,
  professorName,
  setProfessorName,
  ProjectInfo,
  setProjectInfo,
  isLoading,
  handleSubmit,
}: ColdMailSectionProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* CV Upload */}
      <div className="funky-input-group" style={{ animationDelay: "0.2s" }}>
        <Label htmlFor="cv" className="funky-label block mb-2">
          Upload your CV (PDF)
        </Label>
        <label htmlFor="cv" className="funky-file-label">
          Choose a File
        </label>
        <input
          id="cv"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="funky-input"
        />
        {file && <p className="funky-file-name">{file.name}</p>}
      </div>

      {/* Professor Name */}
      <div className="funky-input-group" style={{ animationDelay: "0.4s" }}>
        <Label htmlFor="professorName" className="funky-label block mb-2">
          Professor&apos;s Name
        </Label>
        <input
          id="professorName"
          value={professorName}
          onChange={(e) => setProfessorName(e.target.value)}
          placeholder="Enter professor's name"
          className="mt-2 funky-input w-full"
        />
      </div>

      {/* Professor's Project Information */}
      <div className="funky-input-group" style={{ animationDelay: "0.4s" }}>
        <Label htmlFor="ProjectInfo" className="funky-label block mb-2">
          Professor&apos;s Project Information
        </Label>
        <input
          id="ProjectInfo"
          value={ProjectInfo}
          onChange={(e) => setProjectInfo(e.target.value)}
          placeholder="Enter professor's Project info"
          className="mt-2 funky-input w-full"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full funky-button"
        style={{ animationDelay: "0.6s" }}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Cold Mail"}
      </Button>
    </div>
  );
}

// -------------------------------------------
// Main Page
// -------------------------------------------
export default function Page() {
  // States for inputs and outputs
  const [file, setFile] = useState<File | null>(null);
  const [professorName, setProfessorName] = useState("");
  const [ProjectInfo, setProjectInfo] = useState("");

  // States for server-generated results
  const [generatedMail, setGeneratedMail] = useState("");
  const [ContextualSuggestion, setContextualSuggestion] = useState("");
  const [SubjectLines, setSubjectLines] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------
  // Handle the submission: fetch from /api/generate
  // -------------------------------------------
  const handleSubmit = async () => {
    if (!file || !professorName) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("prospect_name", professorName);
      formData.append("cv", file);
      formData.append("project_info", ProjectInfo);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate email.");
      }

      const result = await response.json();

      setGeneratedMail(result.email || "Error: No response from server.");
      setContextualSuggestion(
        result.contextual_suggestions || "Error: No response from server."
      );
      setSubjectLines(
        result.subject_lines || "Error: No response from the server."
      );
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
    <>
      <FunkyNavbar />
      <div>
        <BackgroundSVGs />
        <div className="min-h-screen w-full duration-300">
          <header className="p-4 text-center relative z-10">
            <h1 className="funky-header">Generate Your Cold Email</h1>
          </header>

          {/* Main content */}
          <main className="flex flex-col items-center justify-center relative z-10 py-1 w-full">
            {/* Card with the input form */}
            <div
              className="max-w-xl w-full p-9 m-4 funky-card"
              style={{ animationDelay: "0.1s" }}
            >
              <ColdMailSection
                file={file}
                setFile={setFile}
                professorName={professorName}
                setProfessorName={setProfessorName}
                ProjectInfo={ProjectInfo}
                setProjectInfo={setProjectInfo}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
              />
            </div>

            {/*
              Now we render each of the three outputs in its own
              *full-width* container
            */}
            {generatedMail && (
              <div
                className="w-[90%] mt-8 px-4 funky-output"
                style={{ animationDelay: "0.8s" }}
              >
                <h2 className="text-2xl font-semibold funky-output-title mb-4">
                  Generated Cold Mail:
                </h2>
                <Textarea
                  value={generatedMail}
                  readOnly
                  className="w-full h-64 funky-textarea funky-textarea-generated"
                />
              </div>
            )}

            {ContextualSuggestion && (
              <div
                className="w-[90%] mt-8 px-6 funky-output"
                style={{ animationDelay: "0.8s" }}
              >
                <h2 className="text-xl font-semibold funky-output-title mb-4">
                  Contextual Suggestions:
                </h2>
                <Textarea
                  value={ContextualSuggestion}
                  readOnly
                  className="w-full h-64 funky-textarea"
                />
              </div>
            )}

            {SubjectLines && (
              <div
                className="w-[90%] mt-8 px-4 funky-output"
                style={{ animationDelay: "0.8s" }}
              >
                <h2 className="text-xl font-semibold funky-output-title mb-4">
                  Subject Lines Suggestions:
                </h2>
                <Textarea
                  value={SubjectLines}
                  readOnly
                  className="w-full h-64 funky-textarea"
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
