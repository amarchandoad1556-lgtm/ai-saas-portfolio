"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function YouTubeScriptPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [script, setScript] = useState("");
  const [voiceover, setVoiceover] = useState("");

  const generateScript = async () => {
    if (!topic) return;

    setLoading(true);
    setScript("");
    setVoiceover("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Write a professional viral YouTube documentary script about ${topic}`,
        }),
      });

      const data = await response.json();

      setScript(data.result || "No script generated.");
    } catch (error) {
      console.log(error);
      setScript("Something went wrong.");
    }

    setLoading(false);
  };

  const generateVoiceover = async () => {
    if (!script) return;

    setVoiceLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Convert this YouTube script into a clean cinematic voiceover narration:\n\n${script}`,
        }),
      });

      const data = await response.json();

      setVoiceover(data.result || "No voiceover generated.");
    } catch (error) {
      console.log(error);
      setVoiceover("Something went wrong.");
    }

    setVoiceLoading(false);
  };

  const saveToProjects = (type: string, content: string) => {
    if (!content) return;

    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: topic || type,
      type,
      content,
      createdAt: new Date().toLocaleString(),
    };

    const updatedProjects = [newProject, ...existingProjects];

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify(updatedProjects)
    );

    alert(`${type} Saved Successfully!`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <section className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            🎬 AI Documentary Writer
          </div>

          <h1 className="text-5xl font-bold">YouTube Script Generator</h1>

          <p className="text-gray-400 mt-4">
            Generate cinematic viral YouTube documentary scripts and voiceovers.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Write your YouTube video topic..."
            className="w-full h-40 bg-black border border-white/10 rounded-2xl p-6 text-white outline-none text-xl"
          />

          <button
            onClick={generateScript}
            disabled={loading}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-2xl text-xl"
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </div>

        {script && (
          <div className="mt-10 p-8 rounded-3xl border border-white/10 bg-white/5">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
              <h2 className="text-4xl font-bold">Generated Script</h2>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(script)}
                  className="px-5 py-3 rounded-xl border border-white/10"
                >
                  Copy
                </button>

                <button
                  onClick={() => saveToProjects("YouTube Script", script)}
                  className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold"
                >
                  Save Script
                </button>

                <button
                  onClick={generateVoiceover}
                  disabled={voiceLoading}
                  className="px-5 py-3 rounded-xl bg-green-500 text-black font-bold"
                >
                  {voiceLoading ? "Generating..." : "Generate Voiceover"}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap leading-8 text-gray-200">
              {script}
            </div>
          </div>
        )}

        {voiceover && (
          <div className="mt-10 p-8 rounded-3xl border border-green-400/20 bg-green-500/5">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
              <h2 className="text-4xl font-bold text-green-300">
                Voiceover Text
              </h2>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(voiceover)}
                  className="px-5 py-3 rounded-xl border border-white/10"
                >
                  Copy
                </button>

                <button
                  onClick={() =>
                    saveToProjects("Voiceover Text", voiceover)
                  }
                  className="px-5 py-3 rounded-xl bg-green-500 text-black font-bold"
                >
                  Save Voiceover
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap leading-8 text-gray-200">
              {voiceover}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}