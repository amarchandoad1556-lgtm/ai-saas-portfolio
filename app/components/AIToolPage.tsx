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

  const [language, setLanguage] = useState("English");
  const [voiceStyle, setVoiceStyle] = useState("Documentary Narrator");
  const [emotion, setEmotion] = useState("Dramatic");

  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [sceneLoading, setSceneLoading] = useState(false);
  const [voiceTextLoading, setVoiceTextLoading] = useState(false);
  const [realVoiceLoading, setRealVoiceLoading] = useState(false);

  const generateAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");
    setThumbnailPrompt("");
    setSceneIdeas("");
    setVoiceoverScript("");
    setAudioUrl("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Create a cinematic YouTube thumbnail prompt based on this content:

${result}

The thumbnail should be emotional, cinematic, viral YouTube style, dramatic lighting, ultra detailed.
`,
        }),
      });

      const data = await res.json();
      setThumbnailPrompt(data.result || data.error || "No thumbnail generated.");
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Based on this script:

${result}

Generate cinematic movie scenes.

For every scene include:
- scene number
- cinematic description
- camera angle
- lighting
- environment
- mood
- visual style
`,
        }),
      });

      const data = await res.json();
      setSceneIdeas(data.result || data.error || "No scenes generated.");
    } catch {
      setSceneIdeas("Something went wrong.");
    }

    setSceneLoading(false);
  };

  const generateVoiceoverScript = async () => {
    if (!result) return;

    setVoiceTextLoading(true);
    setAudioUrl("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Convert this content into a professional cinematic voiceover narration.

CONTENT:
${result}

VOICE SETTINGS:
Language: ${language}
Voice Style: ${voiceStyle}
Emotion: ${emotion}

Make it sound like a professional narrator speaking for a YouTube documentary.
Add pauses, emotional delivery, and cinematic narration style.
`,
        }),
      });

      const data = await res.json();
      setVoiceoverScript(data.result || data.error || "No voiceover generated.");
    } catch {
      setVoiceoverScript("Something went wrong.");
    }

    setVoiceTextLoading(false);
  };

  const generateRealVoice = async () => {
    const textToSpeak = voiceoverScript || result;

    if (!textToSpeak) return;

    setRealVoiceLoading(true);
    setAudioUrl("");

    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToSpeak.slice(0, 2500),
        }),
      });

      if (!res.ok) {
        setVoiceoverScript("Voice generation failed. Check ElevenLabs API key or credits.");
        setRealVoiceLoading(false);
        return;
      }

      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);

      setAudioUrl(url);
    } catch {
      setVoiceoverScript("Voice generation failed.");
    }

    setRealVoiceLoading(false);
  };

  const copyAnswer = async () => {
    await navigator.clipboard.writeText(result);
    alert("Answer copied!");
  };

  const clearResult = () => {
    setResult("");
    setThumbnailPrompt("");
    setSceneIdeas("");
    setVoiceoverScript("");
    setAudioUrl("");
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

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${title}-voiceover.mp3`;
    link.click();
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
            className="mt-5 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {result && (
            <>
              <div className="grid md:grid-cols-5 gap-3 mt-6">
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
                  🎤 Real Voiceover Studio
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full mt-2 p-3 rounded-xl bg-black border border-white/10"
                    >
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Hindi</option>
                      <option>Arabic</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">
                      Voice Style
                    </label>
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

                <div className="grid md:grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={generateVoiceoverScript}
                    disabled={voiceTextLoading}
                    className="w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold"
                  >
                    {voiceTextLoading
                      ? "Writing Narration..."
                      : "Generate Voiceover Text"}
                  </button>

                  <button
                    onClick={generateRealVoice}
                    disabled={realVoiceLoading}
                    className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold"
                  >
                    {realVoiceLoading
                      ? "Generating MP3..."
                      : "Generate Real Voice"}
                  </button>
                </div>

                {audioUrl && (
                  <div className="mt-6 p-5 rounded-2xl bg-black border border-white/10">
                    <audio controls className="w-full" src={audioUrl} />

                    <button
                      onClick={downloadAudio}
                      className="mt-4 w-full border border-green-400 text-green-300 py-3 rounded-2xl hover:bg-green-400 hover:text-black transition"
                    >
                      Download MP3
                    </button>
                  </div>
                )}
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