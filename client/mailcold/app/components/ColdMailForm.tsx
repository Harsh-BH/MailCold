"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateColdMail } from "../actions/generateColdMail"

export default function ColdMailForm() {
  const [file, setFile] = useState<File | null>(null)
  const [professorName, setProfessorName] = useState("")
  const [generatedMail, setGeneratedMail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !professorName) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("cv", file)
    formData.append("professorName", professorName)

    try {
      const result = await generateColdMail(formData)
      setGeneratedMail(result)
    } catch (error) {
      console.error("Error generating cold mail:", error)
      alert("An error occurred while generating the cold mail. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Label htmlFor="cv" className="text-gray-700">
          Upload your CV (PDF)
        </Label>
        <Input
          id="cv"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="mt-1 bg-white bg-opacity-50 text-gray-800 placeholder-gray-500"
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <Label htmlFor="professorName" className="text-gray-700">
          Professor's Name
        </Label>
        <Input
          id="professorName"
          value={professorName}
          onChange={(e) => setProfessorName(e.target.value)}
          required
          className="mt-1 bg-white bg-opacity-50 text-gray-800 placeholder-gray-500"
          placeholder="Enter professor's name"
        />
      </div>
      <Button
        type="submit"
        className="w-full animate-fade-in bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
        style={{ animationDelay: "0.8s" }}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Cold Mail"}
      </Button>
      {generatedMail && (
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "1s" }}>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Generated Cold Mail:</h2>
          <Textarea
            value={generatedMail}
            readOnly
            className="w-full h-64 bg-white bg-opacity-50 text-gray-800 placeholder-gray-500 resize-none"
          />
        </div>
      )}
    </form>
  )
}

