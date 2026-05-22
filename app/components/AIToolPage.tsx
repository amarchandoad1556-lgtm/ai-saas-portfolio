"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function AIToolPage({
  title,
  icon,
  description,
  starterPrompt,
}: {
  title: string;
  icon: string;
  description: string;
  starterPrompt: string;
}) {
  const [prompt, setPrompt] = useState(starterPrompt);

  const [result, setResult] = useState("");

  const [thumbnailPrompt, setThumbnailPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const generateAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setResult("");
    setThumbnailPrompt("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      setResult(data.result || data.error || "No response generated.");
    } catch {
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const generateThumbnailPrompt = async () => {
    if (!result) return;

    setThumbnailLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Create a cinematic YouTube thumbnail prompt based on this content:

${result}

The thumbnail should be:
- emotional
- high CTR
- cinematic lighting
- expressive faces
- viral YouTube style
- ultra detailed
`,
        }),
      });

      const data = await res.json();

      setThumbnailPrompt(
        data.result || data.error || "No thumbnail prompt generated."
      );
    } catch {
      setThumbnailPrompt("Something went wrong.");
    }

    setThumbnailLoading(false);
  };

  const copyAnswer = async () => {
    await navigator.clipboard.writeText(result);

    alert("Answer copied!");
  };

  const clearResult = () => {
    setResult("");
    setThumbnailPrompt("");
  };

  const exportAnswer = () => {
    const file = new Blob([result], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${title}.txt`;

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      {/* MAIN */}
      <section className="max-w-6xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          {/* HEADER */}
          <div className="text-6xl">{icon}</div>

          <h1 className="text-5xl font-bold mt-6">
            {title}
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            {description}
          </p>

          {/* INPUT */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={7}
            className="w-full mt-8 p-5 rounded-2xl bg-black border border-white/10 outline-none"
          />

          {/* GENERATE */}
          <button
            onClick={generateAI}
            disabled={loading}
            className="mt-5 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold hover:scale-[1.01] transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {/* RESULT */}
          {result && (
            <>
              {/* ACTION BUTTONS */}
              <div className="grid md:grid-cols-4 gap-3 mt-6">
                <button
                  onClick={copyAnswer}
                  className="border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition"
                >
                  Copy
                </button>

                <button
                  onClick={clearResult}
                  className="border border-red-400/20 text-red-300 py-3 rounded-2xl hover:bg-red-500/20 transition"
                >
                  Clear
                </button>

                <button
                  onClick={exportAnswer}
                  className="border border-cyan-400 text-cyan-400 py-3 rounded-2xl hover:bg-cyan-400 hover:text-black transition"
                >
                  Export
                </button>

                <button
                  onClick={generateThumbnailPrompt}
                  disabled={thumbnailLoading}
                  className="border border-yellow-400 text-yellow-300 py-3 rounded-2xl hover:bg-yellow-400 hover:text-black transition disabled:opacity-50"
                >
                  {thumbnailLoading
                    ? "Generating..."
                    : "Generate Thumbnail"}
                </button>
              </div>

              {/* SCRIPT RESULT */}
              <div className="mt-8 p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap text-gray-200">
                {result}
              </div>

              {/* THUMBNAIL PROMPT */}
              {thumbnailPrompt && (
                <div className="mt-8 p-6 rounded-2xl border border-yellow-400/20 bg-yellow-500/5">
                  <h2 className="text-2xl font-bold text-yellow-300 mb-4">
                    🎨 Thumbnail Prompt
                  </h2>

                  <div className="whitespace-pre-wrap text-gray-200">
                    {thumbnailPrompt}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}