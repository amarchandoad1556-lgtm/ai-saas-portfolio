"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

type Message = {
  role: "user" | "ai";
  content: string;
};

type Tool = {
  title: string;
  icon: string;
  prompt: string;
  description: string;
};

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState("General AI");

  const tools: Tool[] = [
    {
      title: "General AI",
      icon: "🤖",
      description: "Ask anything and get smart answers.",
      prompt: "",
    },
    {
      title: "YouTube Script AI",
      icon: "🎬",
      description: "Create video scripts and story ideas.",
      prompt: "Write a YouTube script about ",
    },
    {
      title: "Startup Idea AI",
      icon: "💡",
      description: "Generate SaaS and business ideas.",
      prompt: "Give me a profitable SaaS startup idea about ",
    },
    {
      title: "Content Writer",
      icon: "✍️",
      description: "Write blogs, posts, and marketing content.",
      prompt: "Write high-quality content about ",
    },
    {
      title: "Thumbnail Prompt AI",
      icon: "🖼️",
      description: "Create AI image prompts for thumbnails.",
      prompt: "Create a cinematic YouTube thumbnail prompt for ",
    },
    {
      title: "Business Planner",
      icon: "📈",
      description: "Make business plans and strategies.",
      prompt: "Create a business plan for ",
    },
  ];

  useEffect(() => {
    const savedMessages = localStorage.getItem("amar-ai-chat-history");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("amar-ai-chat-history", JSON.stringify(messages));
  }, [messages]);

  const typeAIResponse = (text: string) => {
    let index = 0;
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    const interval = setInterval(() => {
      index++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          content: text.slice(0, index),
        };
        return updated;
      });

      if (index >= text.length) clearInterval(interval);
    }, 18);
  };

  const generateAI = async () => {
    if (!prompt.trim()) return;

    const finalPrompt = `[${activeTool}] ${prompt}`;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();
      setPrompt("");
      setLoading(false);

      typeAIResponse(data.result || data.error || "No response generated.");
    } catch {
      setLoading(false);
      typeAIResponse("Something went wrong. Please try again.");
    }
  };

  const selectTool = (tool: Tool) => {
    setActiveTool(tool.title);
    setPrompt(tool.prompt);
  };

  const clearChat = () => {
    setMessages([]);
    setPrompt("");
    localStorage.removeItem("amar-ai-chat-history");
  };

  const copyLastAnswer = async () => {
    const lastAI = [...messages].reverse().find((m) => m.role === "ai");
    if (lastAI) {
      await navigator.clipboard.writeText(lastAI.content);
      alert("Copied latest AI answer!");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      {/* SIDEBAR */}
      <aside className="relative z-10 w-64 border-r border-white/10 p-6 hidden lg:block bg-white/5 backdrop-blur-2xl">
        <h1 className="text-3xl font-bold text-cyan-400">Amar AI</h1>

        <nav className="mt-10 space-y-4 text-sm">
          <div className="p-3 rounded-xl bg-cyan-500 text-black font-semibold">
            AI Tools
          </div>
          <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10">
            Dashboard
          </div>
          <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10">
            Projects
          </div>
          <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10">
            Settings
          </div>
        </nav>

        <div className="mt-10 p-4 rounded-2xl bg-black/40 border border-white/10">
          <p className="text-sm text-gray-400">Active Tool</p>
          <p className="mt-2 text-cyan-400 font-semibold">{activeTool}</p>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/10">
          <p className="text-sm text-gray-400">Status</p>
          <p className="mt-2 text-green-400 font-semibold">Gemini Connected</p>
        </div>
      </aside>

      {/* MAIN */}
      <section className="relative z-10 flex-1 p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
              🚀 Multi-Tool AI Platform
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold">
              Amar AI Tools Workspace ⚡
            </h1>

            <p className="text-gray-400 mt-2">
              Choose an AI tool, write your prompt, and generate powerful results.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />

            <button
              onClick={copyLastAnswer}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              Copy Answer
            </button>

            <button
              onClick={clearChat}
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-400/20 hover:bg-red-500/30"
            >
              Clear
            </button>
          </div>
        </div>

        {/* AI TOOL CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.title}
              onClick={() => selectTool(tool)}
              className={`text-left p-5 rounded-3xl border backdrop-blur-2xl transition hover:scale-[1.02] ${
                activeTool === tool.title
                  ? "bg-cyan-500/20 border-cyan-400"
                  : "bg-white/5 border-white/10 hover:border-cyan-400/50"
              }`}
            >
              <div className="text-4xl">{tool.icon}</div>
              <h3 className="text-xl font-bold mt-4">{tool.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{tool.description}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* CHAT */}
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 min-h-[650px] flex flex-col shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-5 pr-2">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-center text-gray-400">
                  <div>
                    <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-3xl">
                      🤖
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                      Choose an AI tool and start creating
                    </h2>

                    <p className="mt-3 max-w-md">
                      Build scripts, business ideas, content, plans, and more.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                        : "bg-black/50 border border-white/10 text-gray-200"
                    }`}
                  >
                    {msg.content}
                    {msg.role === "ai" &&
                      index === messages.length - 1 &&
                      !loading && (
                        <span className="ml-1 animate-pulse text-cyan-400">
                          ▍
                        </span>
                      )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 w-fit text-gray-400 animate-pulse">
                  AI is thinking...
                </div>
              )}
            </div>

            <div className="mt-5">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder={`Use ${activeTool}...`}
                className="w-full p-4 rounded-2xl bg-black/60 border border-white/10 outline-none resize-none focus:border-cyan-400 transition"
              />

              <button
                onClick={generateAI}
                disabled={loading}
                className="mt-3 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold hover:scale-[1.01] transition disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                {loading ? "Generating..." : `Generate with ${activeTool}`}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 shadow-2xl">
            <h2 className="text-xl font-bold">Workspace Stats</h2>

            <div className="mt-5 space-y-4">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                <p className="text-gray-400 text-sm">Messages</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {messages.length}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                <p className="text-gray-400 text-sm">AI Tools</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {tools.length}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                <p className="text-gray-400 text-sm">Model</p>
                <p className="text-lg font-bold text-green-400">
                  Gemini
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-black/50 border border-white/10">
              <h3 className="font-bold">Next Features</h3>
              <ul className="text-gray-400 text-sm mt-3 space-y-2">
                <li>• Separate pages for each tool</li>
                <li>• Export to PDF</li>
                <li>• Cloud chat history</li>
                <li>• Paid plans</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}