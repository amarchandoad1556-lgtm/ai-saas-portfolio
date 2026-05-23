"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function ThumbnailGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [thumbnailPrompt, setThumbnailPrompt] = useState("");

  const generateThumbnail = () => {
    if (!topic.trim()) {
      alert("Please enter a thumbnail topic.");
      return;
    }

    const prompt = `Create a high-quality cinematic YouTube thumbnail about "${topic}".

Style:
- Ultra realistic
- 3D cinematic lighting
- High contrast
- Viral YouTube style
- Emotional facial expressions
- Dramatic background
- Orange and blue cinematic color grading
- Hyper detailed
- 4K quality

Composition:
- Main subject large in center
- Eye-catching expression
- Glowing bold text
- Professional movie poster feel

Aspect Ratio:
16:9 YouTube thumbnail`;

    setThumbnailPrompt(prompt);
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(thumbnailPrompt);
    alert("Thumbnail prompt copied!");
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">
          Thumbnail Generator 🎨
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Generate viral cinematic AI thumbnail prompts instantly.
        </p>

        <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter thumbnail topic..."
            className="w-full h-40 bg-black border border-white/10 rounded-2xl p-6 text-xl outline-none"
          />

          <button
            onClick={generateThumbnail}
            className="w-full mt-6 bg-cyan-500 text-black py-5 rounded-2xl text-xl font-bold"
          >
            Generate Thumbnail Prompt
          </button>
        </div>

        {thumbnailPrompt && (
          <div className="border border-white/10 rounded-3xl p-8 bg-white/5 mt-10">
            <h2 className="text-3xl font-bold mb-6">
              Thumbnail Prompt
            </h2>

            <div className="whitespace-pre-wrap text-gray-200 leading-8">
              {thumbnailPrompt}
            </div>

            <button
              onClick={copyPrompt}
              className="w-full mt-8 bg-green-500 text-black py-5 rounded-2xl text-xl font-bold"
            >
              Copy Prompt
            </button>
          </div>
        )}
      </div>
    </main>
  );
}