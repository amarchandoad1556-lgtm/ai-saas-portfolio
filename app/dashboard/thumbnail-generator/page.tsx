"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../../components/AppLayout";

export default function ThumbnailGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [thumbnailPrompt, setThumbnailPrompt] = useState("");

  const generatePrompt = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic.");
      return;
    }

    const prompt = `
Create a high-quality cinematic YouTube thumbnail about "${topic}".

Style:
- Ultra realistic
- 3D cinematic lighting
- High contrast
- Viral YouTube style
- Bright glowing text
- Emotional facial expression
- Dramatic atmosphere
- Sharp focus
- 4K quality
- Modern documentary thumbnail

Composition:
- Main subject centered
- Dynamic camera angle
- Powerful cinematic background
- Bold colors
- Viral click-through style

Aspect Ratio:
16:9 YouTube thumbnail
`;

    setThumbnailPrompt(prompt);

    toast.success("Thumbnail prompt generated!");
  };

  const saveProject = () => {
    if (!thumbnailPrompt) {
      toast.error("Nothing to save.");
      return;
    }

    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: topic || "Thumbnail Prompt",
      type: "Thumbnail Prompt",
      content: thumbnailPrompt,
      createdAt: new Date().toLocaleString(),
    };

    const updatedProjects = [newProject, ...existingProjects];

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify(updatedProjects)
    );

    toast.success("Project saved!");
  };

  return (
    <AppLayout>
      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            🎨 Thumbnail Prompt Generator
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Generate Thumbnail Prompts
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Create cinematic viral thumbnail prompts instantly.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Write your thumbnail topic..."
            className="w-full h-40 bg-black border border-white/10 rounded-2xl p-6 text-white outline-none text-2xl"
          />

          <button
            onClick={generatePrompt}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-2xl text-2xl"
          >
            Generate Thumbnail Prompt
          </button>
        </div>

        {thumbnailPrompt && (
          <div className="mt-10 p-8 rounded-3xl border border-white/10 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 className="text-4xl font-bold">
                Thumbnail Prompt
              </h2>

              <button
                onClick={saveProject}
                className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold"
              >
                Save Project
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap leading-8 text-gray-200">
              {thumbnailPrompt}
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
}