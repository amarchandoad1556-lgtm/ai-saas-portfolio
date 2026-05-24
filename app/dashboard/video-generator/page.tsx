"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../../components/AppLayout";

export default function VideoGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Cinematic Documentary");
  const [duration, setDuration] = useState("60 seconds");
  const [aspectRatio, setAspectRatio] = useState("16:9 YouTube");
  const [videoPlan, setVideoPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideoPlan = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a video topic.");
      return;
    }

    setLoading(true);
    setVideoPlan("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Create a complete AI video production plan.

TOPIC:
${topic}

STYLE:
${style}

DURATION:
${duration}

ASPECT RATIO:
${aspectRatio}

Generate:
1. Video title
2. Hook
3. Scene-by-scene storyboard
4. Camera angles
5. Lighting and mood
6. Voiceover narration
7. Subtitle style
8. Background music suggestion
9. AI video prompts
10. Export checklist
`,
        }),
      });

      const data = await response.json();

      setVideoPlan(data.result || "No video plan generated.");
      toast.success("Video plan generated!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  const saveProject = () => {
    if (!videoPlan) {
      toast.error("Nothing to save.");
      return;
    }

    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: topic || "AI Video Project",
      type: "AI Video Plan",
      content: videoPlan,
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
            🎥 AI Video Generator
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Generate Full Video Plans
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Create cinematic storyboards, narration, scene prompts, and
            creator-ready video plans.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
            <label className="text-sm text-gray-400">Video Topic</label>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: The rise of Cristiano Ronaldo"
              className="w-full h-40 mt-3 bg-black border border-white/10 rounded-2xl p-5 outline-none text-lg"
            />

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="text-sm text-gray-400">Video Style</label>

                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full mt-3 bg-black border border-white/10 rounded-2xl p-4 outline-none"
                >
                  <option>Cinematic Documentary</option>
                  <option>YouTube Explainer</option>
                  <option>Motivational Story</option>
                  <option>Dark Mystery</option>
                  <option>Animated Cartoon</option>
                  <option>Shorts/Reels Style</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Duration</label>

                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full mt-3 bg-black border border-white/10 rounded-2xl p-4 outline-none"
                >
                  <option>30 seconds</option>
                  <option>60 seconds</option>
                  <option>3 minutes</option>
                  <option>5 minutes</option>
                  <option>10 minutes</option>
                </select>
              </div>
            </div>

            <label className="block mt-6 text-sm text-gray-400">
              Aspect Ratio
            </label>

            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full mt-3 bg-black border border-white/10 rounded-2xl p-4 outline-none"
            >
              <option>16:9 YouTube</option>
              <option>9:16 Shorts/Reels</option>
              <option>1:1 Square</option>
            </select>

            <button
              onClick={generateVideoPlan}
              disabled={loading}
              className="w-full mt-6 bg-cyan-500 text-black py-5 rounded-2xl font-bold text-xl disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  AI is building your video plan...
                </>
              ) : (
                "Generate Video Plan"
              )}
            </button>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
            <h2 className="text-3xl font-bold mb-6">Video Preview</h2>

            <div className="aspect-video rounded-2xl border border-white/10 bg-black flex items-center justify-center text-center p-8">
              <div>
                <div className="text-6xl mb-4">🎬</div>

                <p className="text-gray-400">
                  Real AI video rendering will connect here later.
                </p>
              </div>
            </div>

            {videoPlan && (
              <button
                onClick={saveProject}
                className="w-full mt-6 py-4 rounded-2xl bg-cyan-500 text-black font-bold"
              >
                Save Project
              </button>
            )}
          </div>
        </div>

        {videoPlan && (
          <div className="mt-8 p-8 rounded-3xl border border-white/10 bg-white/5">
            <h2 className="text-3xl font-bold mb-4">
              Generated Video Plan
            </h2>

            <div className="whitespace-pre-wrap text-gray-200 leading-8">
              {videoPlan}
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
}