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
  const [sceneIdeas, setSceneIdeas] = useState("");
  const [voiceoverScript, setVoiceoverScript] = useState("");

  const [language, setLanguage] = useState("en-US");
  const [voiceStyle, setVoiceStyle] = useState("Documentary Narrator");
  const [emotion, setEmotion] = useState("Dramatic");

  const [loading, setLoading] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [sceneLoading, setSceneLoading] = useState(false);
  const [voiceTextLoading, setVoiceTextLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const saveProject = () => {
    if (!result) {
      alert("Generate a project first.");
      return;
    }

    const existing = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: prompt || title || "Untitled Project",
      content: `
SCRIPT:
${result}

THUMBNAIL:
${thumbnailPrompt || "No thumbnail generated yet."}

SCENES:
${sceneIdeas || "No scenes generated yet."}

VOICEOVER:
${voiceoverScript || "No voiceover generated yet."}
`,
      createdAt: new Date().toLocaleString(),
    };

    const updatedProjects = [newProject, ...existing];

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify(updatedProjects)
    );

    alert("Project Saved 🚀");
  };

  const generateAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");
    setThumbnailPrompt("");
    setSceneIdeas("");
    setVoiceoverScript("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result || data.error || "No response generated.");
    } catch {
      setResult("Something went wrong.");
    }

    setLoading(false);
  };

  const generateThumbnailPrompt = async () => {
    if (!result) return;

    setThumbnailLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Create a cinematic YouTube thumbnail prompt based on this content:

${result}

Make it high CTR, emotional, dramatic, cinematic, and ultra-detailed.`,
        }),
      });

      const data = await res.json();
      setThumbnailPrompt(
        data.result || data.error || "No thumbnail generated."
      );
    } catch {
      setThumbnailPrompt("Something went wrong.");
    }

    setThumbnailLoading(false);
  };

  const generateScenes = async () => {
    if (!result) return;

    setSceneLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Based on this script:

${result}

Generate cinematic movie scenes with:
- scene number
- camera angle
- lighting
- mood
- environment
- visual style
- AI video prompt`,
        }),
      });

      const data = await res.json();
      setSceneIdeas(data.result || data.error || "No scenes generated.");
    } catch {
      setSceneIdeas("Something went wrong.");
    }

    setSceneLoading(false);
  };

  const generateVoiceoverText = async () => {
    if (!result) return;

    setVoiceTextLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
Convert this content into a professional voiceover narration.

CONTENT:
${result}

VOICE SETTINGS:
Language: ${language}
Voice Style: ${voiceStyle}
Emotion: ${emotion}

Make it natural, cinematic, emotional, and ready to speak.
`,
        }),
      });

      const data = await res.json();
      setVoiceoverScript(
        data.result || data.error || "No voiceover generated."
      );
    } catch {
      setVoiceoverScript("Something went wrong.");
    }

    setVoiceTextLoading(false);
  };

  const playBrowserVoice = () => {
    const textToSpeak = voiceoverScript || result;

    if (!textToSpeak) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = window.speechSynthesis.getVoices();

    let selectedVoice: SpeechSynthesisVoice | null = null;

    if (language === "ur-PK") {
      selectedVoice =
        voices.find((v) => v.lang.toLowerCase().includes("ur")) ||
        voices.find((v) => v.lang.toLowerCase().includes("hi")) ||
        null;
    }

    if (language === "en-US") {
      selectedVoice =
        voices.find((v) => v.name.toLowerCase().includes("david")) ||
        voices.find((v) => v.lang.toLowerCase().includes("en")) ||
        null;
    }

    if (language === "hi-IN") {
      selectedVoice =
        voices.find((v) => v.lang.toLowerCase().includes("hi")) || null;
    }

    if (language === "ar-SA") {
      selectedVoice =
        voices.find((v) => v.lang.toLowerCase().includes("ar")) || null;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (voiceStyle === "Energetic YouTuber") {
      utterance.rate = 1.15;
      utterance.pitch = 1.2;
    }

    if (voiceStyle === "Documentary Narrator") {
      utterance.rate = 0.9;
      utterance.pitch = 0.9;
    }

    if (voiceStyle === "Emotional Female") {
      utterance.rate = 0.95;
      utterance.pitch = 1.3;
    }

    if (voiceStyle === "Cinematic Male") {
      utterance.rate = 0.88;
      utterance.pitch = 0.75;
    }

    if (emotion === "Dramatic") {
      utterance.rate -= 0.05;
    }

    if (emotion === "Inspirational") {
      utterance.rate += 0.05;
      utterance.pitch += 0.05;
    }

    if (emotion === "Dark") {
      utterance.rate -= 0.08;
      utterance.pitch -= 0.1;
    }

    if (emotion === "Motivational") {
      utterance.rate += 0.08;
      utterance.volume = 1;
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopBrowserVoice = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const copyAnswer = async () => {
    await navigator.clipboard.writeText(result);
    alert("Answer copied!");
  };

  const clearResult = () => {
    window.speechSynthesis.cancel();
    setResult("");
    setThumbnailPrompt("");
    setSceneIdeas("");
    setVoiceoverScript("");
    setSpeaking(false);
  };

  const exportAnswer = () => {
    const file = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${title}.txt`;
    link.click();

    URL.revokeObjectURL(url);
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
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="text-6xl">{icon}</div>

          <h1 className="text-5xl font-bold mt-6">{title}</h1>

          <p className="text-gray-400 mt-4 text-lg">{description}</p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={7}
            className="w-full mt-8 p-5 rounded-2xl bg-black border border-white/10 outline-none"
          />

          <button
            onClick={generateAI}
            disabled={loading}
            className="mt-5 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {result && (
            <>
              <div className="grid md:grid-cols-6 gap-3 mt-6">
                <button
                  onClick={copyAnswer}
                  className="border border-white/10 py-3 rounded-2xl"
                >
                  Copy
                </button>

                <button
                  onClick={clearResult}
                  className="border border-red-400/20 text-red-300 py-3 rounded-2xl"
                >
                  Clear
                </button>

                <button
                  onClick={exportAnswer}
                  className="border border-cyan-400 text-cyan-400 py-3 rounded-2xl"
                >
                  Export
                </button>

                <button
                  onClick={saveProject}
                  className="border border-green-400 text-green-300 py-3 rounded-2xl"
                >
                  Save Project
                </button>

                <button
                  onClick={generateThumbnailPrompt}
                  disabled={thumbnailLoading}
                  className="border border-yellow-400 text-yellow-300 py-3 rounded-2xl"
                >
                  {thumbnailLoading ? "Generating..." : "Thumbnail"}
                </button>

                <button
                  onClick={generateScenes}
                  disabled={sceneLoading}
                  className="border border-purple-400 text-purple-300 py-3 rounded-2xl"
                >
                  {sceneLoading ? "Generating..." : "Scenes"}
                </button>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap text-gray-200">
                {result}
              </div>

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

              {sceneIdeas && (
                <div className="mt-8 p-6 rounded-2xl border border-purple-400/20 bg-purple-500/5">
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">
                    🎬 Cinematic Scene Ideas
                  </h2>

                  <div className="whitespace-pre-wrap text-gray-200">
                    {sceneIdeas}
                  </div>
                </div>
              )}

              <div className="mt-8 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/5">
                <h2 className="text-2xl font-bold text-cyan-300 mb-6">
                  🎤 Free Browser Voice Studio
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full mt-2 p-3 rounded-xl bg-black border border-white/10"
                    >
                      <option value="en-US">English</option>
                      <option value="ur-PK">Urdu</option>
                      <option value="hi-IN">Hindi</option>
                      <option value="ar-SA">Arabic</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Voice Style</label>
                    <select
                      value={voiceStyle}
                      onChange={(e) => setVoiceStyle(e.target.value)}
                      className="w-full mt-2 p-3 rounded-xl bg-black border border-white/10"
                    >
                      <option>Documentary Narrator</option>
                      <option>Cinematic Male</option>
                      <option>Emotional Female</option>
                      <option>Energetic YouTuber</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Emotion</label>
                    <select
                      value={emotion}
                      onChange={(e) => setEmotion(e.target.value)}
                      className="w-full mt-2 p-3 rounded-xl bg-black border border-white/10"
                    >
                      <option>Dramatic</option>
                      <option>Inspirational</option>
                      <option>Dark</option>
                      <option>Motivational</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-6">
                  <button
                    onClick={generateVoiceoverText}
                    disabled={voiceTextLoading}
                    className="bg-cyan-500 text-black py-4 rounded-2xl font-bold"
                  >
                    {voiceTextLoading ? "Writing..." : "Generate Voiceover Text"}
                  </button>

                  <button
                    onClick={playBrowserVoice}
                    disabled={speaking}
                    className="bg-green-500 text-black py-4 rounded-2xl font-bold"
                  >
                    {speaking ? "Speaking..." : "Play Voice"}
                  </button>

                  <button
                    onClick={stopBrowserVoice}
                    className="bg-red-500/20 text-red-300 border border-red-400/20 py-4 rounded-2xl font-bold"
                  >
                    Stop Voice
                  </button>
                </div>
              </div>

              {voiceoverScript && (
                <div className="mt-8 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/5">
                  <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                    🎙 Voiceover Text
                  </h2>

                  <div className="whitespace-pre-wrap text-gray-200">
                    {voiceoverScript}
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