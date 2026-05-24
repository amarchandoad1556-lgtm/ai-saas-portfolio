"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../../components/AppLayout";

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
    if (!script.trim()) {
      toast.error("Please paste a script first.");
      return;
    }

    setLoadingType("thumbnail");

    const result = await callAI(`
Based on this script, create a cinematic viral YouTube thumbnail prompt.

SCRIPT:
${script}
`);

    setThumbnailPrompt(result);
    setLoadingType("");
    toast.success("Thumbnail prompt generated!");
  };

  const generateScenes = async () => {
    if (!script.trim()) {
      toast.error("Please paste a script first.");
      return;
    }

    setLoadingType("scenes");

    const result = await callAI(`
Turn this script into a cinematic video scene plan.

SCRIPT:
${script}
`);

    setScenePlan(result);
    setLoadingType("");
    toast.success("Scene plan generated!");
  };

  const generateVoiceover = async () => {
    if (!script.trim()) {
      toast.error("Please paste a script first.");
      return;
    }

    setLoadingType("voiceover");

    const result = await callAI(`
Convert this script into a cinematic voiceover narration.

SCRIPT:
${script}
`);

    setVoiceover(result);
    setLoadingType("");
    toast.success("Voiceover generated!");
  };

  const saveProject = () => {
    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: "Script Assets Project",
      type: "Script Assets",
      content: `
SCRIPT:
${script}

THUMBNAIL:
${thumbnailPrompt}

SCENES:
${scenePlan}

VOICEOVER:
${voiceover}
`,
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify([newProject, ...existingProjects])
    );

    toast.success("Project saved!");
  };

  return (
    <AppLayout>
      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            🧩 Script-to-Assets Studio
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Turn Scripts into Assets
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Generate thumbnails, scene plans, and voiceovers from any script.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your full script here..."
            className="w-full h-72 bg-black border border-white/10 rounded-2xl p-6 text-white outline-none text-lg"
          />

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <button
              onClick={generateThumbnail}
              className="bg-yellow-500 text-black py-4 rounded-2xl font-bold"
            >
              {loadingType === "thumbnail"
                ? "Generating..."
                : "Thumbnail"}
            </button>

            <button
              onClick={generateScenes}
              className="bg-purple-500 text-black py-4 rounded-2xl font-bold"
            >
              {loadingType === "scenes"
                ? "Generating..."
                : "Scenes"}
            </button>

            <button
              onClick={generateVoiceover}
              className="bg-green-500 text-black py-4 rounded-2xl font-bold"
            >
              {loadingType === "voiceover"
                ? "Generating..."
                : "Voiceover"}
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
            <h2 className="text-4xl font-bold mb-8">
              Generated Assets
            </h2>

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
    </AppLayout>
  );
}