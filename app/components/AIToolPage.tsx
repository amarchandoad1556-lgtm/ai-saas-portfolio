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
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");

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
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const copyAnswer = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    alert("Answer copied!");
  };

  const clearResult = () => {
    setResult("");
  };

  const exportAnswer = () => {
    if (!result) return;

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

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <section className="max-w-5xl mx-auto">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <div className="text-5xl">{icon}</div>

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
            className="mt-5 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold disabled:opacity-50 hover:scale-[1.01] transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {result && (
            <>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <button
                  onClick={copyAnswer}
                  className="border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition"
                >
                  Copy
                </button>

                <button
                  onClick={clearResult}
                  className="border border-red-400/20 text-red-300 py-3 rounded-2xl hover:bg-red-500/20 transition"
                >
                  Clear
                </button>

                <button
                  onClick={exportAnswer}
                  className="border border-cyan-400 text-cyan-400 py-3 rounded-2xl hover:bg-cyan-400 hover:text-black transition"
                >
                  Export
                </button>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap text-gray-200">
                {result}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}