"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FunkyNavbar from "@/components/ui/navbar";
import { showFunkyToast } from "@/components/ui/funky-toast";

// -------------------------------------------
// Replacing simple envelope SVGs with FloatingShapes
// -------------------------------------------
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
      case 5: // Mail icon (keeping one email-related shape)
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22,6L12,13L2,6" />
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
            zIndex: 0,
          }}
        >
          {renderShape(shape.type, shape.color)}
        </div>
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
  emailType: string;
  setEmailType: React.Dispatch<React.SetStateAction<string>>;
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
  emailType,
  setEmailType,
  isLoading,
  handleSubmit,
}: ColdMailSectionProps) {
  // Email type options with descriptions
  const emailTypes = [
    {
      value: "research_inquiry",
      name: "Research Inquiry",
      description: "Request to join a professor's research group or collaborate on research"
    },
    {
      value: "internship_application",
      name: "Internship Application",
      description: "Apply for an internship position in the professor's lab or project"
    },
    {
      value: "collaboration_proposal",
      name: "Collaboration Proposal",
      description: "Suggest a collaboration on a specific project or paper"
    },
    {
      value: "follow_up",
      name: "Follow-up Email",
      description: "Follow up on a previous conversation or application"
    }
  ];

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
      
      {/* Email Type Selection - Updated with funky styling */}
      <div className="funky-input-group" style={{ animationDelay: "0.5s" }}>
        <Label htmlFor="emailType" className="funky-label block mb-2">
          Email Type
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {emailTypes.map((type) => (
            <div 
              key={type.value}
              className={`email-type-card ${emailType === type.value ? 'selected' : ''}`}
              onClick={() => setEmailType(type.value)}
            >
              <h3 className="email-type-title">
                {type.name}
              </h3>
              <p className="email-type-desc mt-1">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full funky-button"
        style={{ animationDelay: "0.6s" }}
        disabled={isLoading || !emailType}
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
  const [emailType, setEmailType] = useState("research_inquiry"); // Default email type

  // States for server-generated results
  const [generatedMail, setGeneratedMail] = useState("");
  const [ContextualSuggestion, setContextualSuggestion] = useState("");
  const [SubjectLines, setSubjectLines] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------
  // Handle the submission: fetch from /api/generate
  // -------------------------------------------
  const handleSubmit = async () => {
    if (!file || !professorName || !emailType) return;
    
    // Validate file is a PDF
    if (!file.name.toLowerCase().endsWith('.pdf') || file.type !== 'application/pdf') {
      showFunkyToast.error("Please upload a valid PDF file.");
      return;
    }
    
    setIsLoading(true);
    
   
  
    try {
      const formData = new FormData();
      
      // Log form data before sending
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });
      
      formData.append("prospect_name", professorName);
      formData.append("cv", file);
      formData.append("project_info", ProjectInfo);
      formData.append("email_type", emailType);
      formData.append("extra_link", "");
      
      console.log("Sending data with fields:", Array.from(formData.keys()));
  
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate email.");
      }
  
      const result = await response.json();
  
      setGeneratedMail(result.email || "Error: No response from server.");
      setContextualSuggestion(
        result.contextual_suggestions || "Error: No response from server."
      );
      setSubjectLines(
        result.subject_lines || "Error: No response from the server."
      );
      
      // Show success toast
      showFunkyToast.success("Your cold email has been generated!");
    } catch (error) {
      console.error("Error generating cold mail:", error);
      showFunkyToast.error(
        error instanceof Error 
          ? error.message 
          : "An error occurred while generating the cold mail. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <FunkyNavbar />
      <div className="relative overflow-x-hidden">
        <FloatingShapes />
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
                emailType={emailType}
                setEmailType={setEmailType}
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
    </div>
  );
}
