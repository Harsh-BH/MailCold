"use client";

import { useState } from "react";

export default function HomePage() {
  const [prospectName, setProspectName] = useState("");
  const [extraLink, setExtraLink] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedEmail("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prospectName, extraLink }),
      });

      if (!res.ok) {
        throw new Error("Error while generating email");
      }

      const data = await res.json();
      setGeneratedEmail(data.generatedEmail);
    } catch (err) {
      console.error(err);
      setGeneratedEmail("Error generating email. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!generatedEmail) return;
    const to = prompt("Enter recipient email:");
    if (!to) return;

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject: "My Cold Outreach",
          content: generatedEmail,
        }),
      });

      const data = await res.json();
      alert(data.message || "Mail sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending email. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-4 p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold">Cold Email Generator</h1>
        <input
          className="border w-full p-2 rounded"
          placeholder="Prospect Name"
          value={prospectName}
          onChange={(e) => setProspectName(e.target.value)}
        />
        <input
          className="border w-full p-2 rounded"
          placeholder="Extra Link (LinkedIn, Website, etc.)"
          value={extraLink}
          onChange={(e) => setExtraLink(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full py-2 rounded disabled:bg-gray-400"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>

        {generatedEmail && (
          <div className="mt-4 border p-3 rounded bg-gray-100">
            <p className="text-sm font-semibold">Generated Email:</p>
            <p className="whitespace-pre-line mt-2">{generatedEmail}</p>
            <button
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
