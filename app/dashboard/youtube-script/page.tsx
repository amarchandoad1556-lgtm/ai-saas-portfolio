"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../../components/AppLayout";

export default function YouTubeScriptPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState("");

  const generateScript = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Write a professional YouTube documentary script about ${topic}`,
        }),
      });

      const data = await response.json();

      setScript(data.result || "No script generated.");
      toast.success("Script generated!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  const saveProject = () => {
    if (!script) {
      toast.error("Nothing to save.");
      return;
    }

    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: topic,
      type: "YouTube Script",
      content: script,
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
      <section className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            🎬 AI Script Generator
          </div>

          <h1 className="text-5xl font-bold">YouTube Script Generator</h1>

          <p className="text-gray-400 mt-4">
            Generate cinematic YouTube documentary scripts instantly.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Write your video topic..."
            className="w-full h-40 bg-black border border-white/10 rounded-2xl p-6 text-white outline-none text-xl"
          />

          <button
            onClick={generateScript}
            disabled={loading}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-2xl text-xl disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                AI is writing your script...
              </>
            ) : (
              "Generate Script"
            )}
          </button>
        </div>

        {script && (
          <div className="mt-10 p-8 rounded-3xl border border-white/10 bg-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold">Generated Script</h2>

              <button
                onClick={saveProject}
                className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold"
              >
                Save Project
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap leading-8 text-gray-200">
              {script}
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
}