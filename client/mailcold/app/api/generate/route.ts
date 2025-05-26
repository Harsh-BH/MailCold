import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // More detailed logging
    console.log("Sending form data fields:", Array.from(formData.keys()));
    
    // Get the file and check if it's valid
    const file = formData.get("cv") as File;
    if (!file || !(file instanceof File)) {
      console.error("Invalid file object:", file);
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }
    
    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });
    
    // Ensure field names match what FastAPI expects
    const originalData = formData.get("professorName");
    if (originalData && !formData.has("prospect_name")) {
      formData.set("prospect_name", originalData as string);
      formData.delete("professorName");
    }

    const projectData = formData.get("ProjectInfo");
    if (projectData && !formData.has("project_info")) {
      formData.set("project_info", projectData as string);
      formData.delete("ProjectInfo");
    }

    // Add empty extra_link if not present
    if (!formData.has("extra_link")) {
      formData.append("extra_link", "");
    }

    const fastApiResponse = await fetch("http://localhost:7000/api/generate_email", {
      method: "POST",
      body: formData,
    });

    if (!fastApiResponse.ok) {
      // Try to get more detailed error message
      let errorDetail = fastApiResponse.statusText;
      try {
        const errorJson = await fastApiResponse.json();
        if (errorJson.detail) {
          errorDetail = JSON.stringify(errorJson.detail);
        }
      } catch {
        // If json parsing fails, use text
        try {
          errorDetail = await fastApiResponse.text();
        } catch {
          // Keep using statusText if all else fails
        }
      }
      
      console.error("FastAPI error details:", errorDetail);
      
      return NextResponse.json(
        { error: `FastAPI error: ${fastApiResponse.status} - ${errorDetail}` },
        { status: fastApiResponse.status }
      );
    }

    const data = await fastApiResponse.json();
    return NextResponse.json(data);
  }
  catch (error: unknown) {
    // Check if error is an instance of Error to safely access its properties
    if (error instanceof Error) {
      console.error("Error in Next.js /generate route:", error.message);
    } else {
      console.error("Error in Next.js /generate route: Unknown error", error);
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

