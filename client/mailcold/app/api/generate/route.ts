import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fastApiResponse = await fetch("http://localhost:7000/generate_email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!fastApiResponse.ok) {
      return NextResponse.json(
        { error: `FastAPI error: ${fastApiResponse.statusText}` },
        { status: fastApiResponse.status }
      );
    }

    const data = await fastApiResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in Next.js /generate route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
