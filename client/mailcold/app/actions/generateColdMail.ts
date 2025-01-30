"use server"

import { promises as fs } from "fs"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function generateColdMail(formData: FormData): Promise<string> {
  const file = formData.get("cv") as File
  const professorName = formData.get("professorName") as string

  if (!file || !professorName) {
    throw new Error("Missing required fields")
  }

  // Save the file temporarily
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const tempDir = join(process.cwd(), "tmp")
  await fs.mkdir(tempDir, { recursive: true })
  const filePath = join(tempDir, `${uuidv4()}.pdf`)
  await fs.writeFile(filePath, buffer)

  // Here you would typically parse the CV and extract relevant information
  // For this example, we'll just use a placeholder
  const skills = ["React", "Node.js", "TypeScript"]
  const experience = "2 years of web development"

  // Generate the cold mail
  const coldMail = `
Dear Professor ${professorName},

I hope this email finds you well. My name is [Your Name], and I am writing to express my strong interest in joining your research group as a [position, e.g., graduate student, research assistant].

I recently came across your work on [specific research area], and I was particularly impressed by [mention a specific paper or project]. Your research aligns closely with my academic interests and career goals.

Allow me to briefly introduce myself:

- Skills: ${skills.join(", ")}
- Experience: ${experience}

I have attached my CV for your review. I would be grateful for the opportunity to discuss how my background and skills could contribute to your ongoing research projects.

Thank you for your time and consideration. I look forward to the possibility of speaking with you further.

Best regards,
[Your Name]
  `.trim()

  // Clean up the temporary file
  await fs.unlink(filePath)

  return coldMail
}

