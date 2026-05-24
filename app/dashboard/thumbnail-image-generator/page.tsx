"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function ThumbnailImageGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Cinematic YouTube");
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!topic.trim()) {
      alert("Please enter a thumbnail topic.");
      return;
    }

    setLoading(true);

    const finalPrompt = `Create a 16:9 YouTube thumbnail image about "${topic}".

Style: ${style}
Details:
- viral YouTube thumbnail
- cinematic lighting
- dramatic composition
- emotional expression
- bold high contrast colors
- ultra detailed
- professional creator thumbnail
- no blurry text
- 4K look`;

    setPrompt(finalPrompt);

    // Temporary preview until real image API is connected
    setTimeout(() => {
      setImageUrl(
        "https://placehold.co/1280x720/020617/22d3ee?text=CreatorForge+Thumbnail"
      );
      setLoading(false);
    }, 1200);
  };

  const saveProject = () => {
    if (!prompt) return;

    const existingProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    const newProject = {
      id: Date.now().toString(),
      title: topic || "Thumbnail Image Project",
      type: "Thumbnail Image",
      content: `
THUMBNAIL TOPIC:
${topic}

STYLE:
${style}

IMAGE PROMPT:
${prompt}

IMAGE URL:
${imageUrl || "Image API not connected yet."}
`,
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify([newProject, ...existingProjects])
    );

    alert("Thumbnail image project saved!");
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "creatorforge-thumbnail.png";
    link.click();
  };

  const copyPrompt = async () => {
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            🎨 Thumbnail Image Generator
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Generate Thumbnail Images
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Create AI-ready thumbnail image prompts and preview layouts. Real
            image generation API will connect later.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
            <label className="text-sm text-gray-400">Thumbnail Topic</label>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: MrBeast trapped inside a futuristic prison"
              className="w-full h-40 mt-3 bg-black border border-white/10 rounded-2xl p-5 outline-none text-lg"
            />

            <label className="block mt-6 text-sm text-gray-400">
              Thumbnail Style
            </label>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full mt-3 bg-black border border-white/10 rounded-2xl p-4 outline-none"
            >
              <option>Cinematic YouTube</option>
              <option>MrBeast Style</option>
              <option>Documentary Style</option>
              <option>Gaming Thumbnail</option>
              <option>Luxury / Business</option>
              <option>Dark Mystery</option>
              <option>Cartoon 3D</option>
            </select>

            <button
              onClick={generateImage}
              disabled={loading}
              className="w-full mt-6 bg-cyan-500 text-black py-5 rounded-2xl font-bold text-xl disabled:opacity-50"
            >
              {loading ? "Generating Preview..." : "Generate Thumbnail Image"}
            </button>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
            <h2 className="text-3xl font-bold mb-6">Preview</h2>

            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated thumbnail preview"
                className="w-full rounded-2xl border border-white/10"
              />
            ) : (
              <div className="aspect-video rounded-2xl border border-white/10 bg-black flex items-center justify-center text-gray-500">
                Thumbnail preview will appear here
              </div>
            )}

            {imageUrl && (
              <div className="grid md:grid-cols-3 gap-3 mt-6">
                <button
                  onClick={downloadImage}
                  className="py-3 rounded-xl bg-green-500 text-black font-bold"
                >
                  Download
                </button>

                <button
                  onClick={saveProject}
                  className="py-3 rounded-xl bg-cyan-500 text-black font-bold"
                >
                  Save Project
                </button>

                <button
                  onClick={copyPrompt}
                  className="py-3 rounded-xl border border-white/10"
                >
                  Copy Prompt
                </button>
              </div>
            )}
          </div>
        </div>

        {prompt && (
          <div className="mt-8 p-8 rounded-3xl border border-white/10 bg-white/5">
            <h2 className="text-3xl font-bold mb-4">Generated Image Prompt</h2>

            <div className="whitespace-pre-wrap text-gray-200 leading-8">
              {prompt}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}