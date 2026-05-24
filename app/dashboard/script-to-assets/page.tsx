"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function ScriptToAssetsPage() {
  const [script, setScript] = useState("");
  const [thumbnailPrompt, setThumbnailPrompt] = useState("");
  const [scenePlan, setScenePlan] = useState("");
  const [voiceover, setVoiceover] = useState("");
  const [loadingType, setLoadingType] = useState("");

  const callAI = async (prompt: string) => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.result || data.error || "No result generated.";
  };

  const generateThumbnail = async () => {
    if (!script.trim()) return;

    setLoadingType("thumbnail");

    const result = await callAI(`
Based on this script, create a cinematic viral YouTube thumbnail prompt.

SCRIPT:
${script}

Include:
- main subject
- background
- facial expression
- lighting
- colors
- text suggestion
- 16:9 YouTube thumbnail style
`);

    setThumbnailPrompt(result);
    setLoadingType("");
  };

  const generateScenes = async () => {
    if (!script.trim()) return;

    setLoadingType("scenes");

    const result = await callAI(`
Turn this script into a cinematic video scene plan.

SCRIPT:
${script}

For each scene include:
- scene number
- visual description
- camera angle
- lighting
- mood
- AI image/video prompt
`);

    setScenePlan(result);
    setLoadingType("");
  };

  const generateVoiceover = async () => {
    if (!script.trim()) return;

    setLoadingType("voiceover");

    const result = await callAI(`
Convert this script into a clean cinematic voiceover narration.

SCRIPT:
${script}

Make it emotional, natural, and ready for a narrator.
`);

    setVoiceover(result);
    setLoadingType("");
  };

  const saveProject = () => {
    if (!script.trim()) return;

    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: "Script to Assets Project",
      type: "Script Assets",
      content: `
SCRIPT:
${script}

THUMBNAIL PROMPT:
${thumbnailPrompt || "Not generated yet."}

SCENE PLAN:
${scenePlan || "Not generated yet."}

VOICEOVER:
${voiceover || "Not generated yet."}
`,
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify([newProject, ...existingProjects])
    );

    alert("Project Saved!");
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(`
SCRIPT:
${script}

THUMBNAIL PROMPT:
${thumbnailPrompt}

SCENE PLAN:
${scenePlan}

VOICEOVER:
${voiceover}
`);

    alert("Copied all assets!");
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            🧩 Script-to-Assets Studio
          </div>

          <h1 className="text-5xl font-bold">
            Turn Any Script into Creator Assets
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Paste your existing script and generate thumbnails, scene plans,
            and voiceover text.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your script here..."
            className="w-full h-72 bg-black border border-white/10 rounded-2xl p-6 text-white outline-none text-lg"
          />

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <button
              onClick={generateThumbnail}
              disabled={loadingType === "thumbnail"}
              className="bg-yellow-500 text-black py-4 rounded-2xl font-bold"
            >
              {loadingType === "thumbnail" ? "Generating..." : "Thumbnail"}
            </button>

            <button
              onClick={generateScenes}
              disabled={loadingType === "scenes"}
              className="bg-purple-500 text-black py-4 rounded-2xl font-bold"
            >
              {loadingType === "scenes" ? "Generating..." : "Scenes"}
            </button>

            <button
              onClick={generateVoiceover}
              disabled={loadingType === "voiceover"}
              className="bg-green-500 text-black py-4 rounded-2xl font-bold"
            >
              {loadingType === "voiceover" ? "Generating..." : "Voiceover"}
            </button>

            <button
              onClick={saveProject}
              className="bg-cyan-500 text-black py-4 rounded-2xl font-bold"
            >
              Save Project
            </button>
          </div>
        </div>

        {(thumbnailPrompt || scenePlan || voiceover) && (
          <div className="mt-10 p-8 rounded-3xl border border-white/10 bg-white/5">
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
              <h2 className="text-4xl font-bold">Generated Assets</h2>

              <button
                onClick={copyAll}
                className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold"
              >
                Copy All
              </button>
            </div>

            {thumbnailPrompt && (
              <div className="mb-8 p-6 rounded-2xl bg-black border border-yellow-400/20">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                  🎨 Thumbnail Prompt
                </h3>
                <div className="whitespace-pre-wrap text-gray-200">
                  {thumbnailPrompt}
                </div>
              </div>
            )}

            {scenePlan && (
              <div className="mb-8 p-6 rounded-2xl bg-black border border-purple-400/20">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">
                  🎬 Scene Plan
                </h3>
                <div className="whitespace-pre-wrap text-gray-200">
                  {scenePlan}
                </div>
              </div>
            )}

            {voiceover && (
              <div className="p-6 rounded-2xl bg-black border border-green-400/20">
                <h3 className="text-2xl font-bold text-green-300 mb-4">
                  🎤 Voiceover
                </h3>
                <div className="whitespace-pre-wrap text-gray-200">
                  {voiceover}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}