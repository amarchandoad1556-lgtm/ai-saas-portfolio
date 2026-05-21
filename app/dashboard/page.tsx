"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "ai",
        content: data.result || data.error || "No response generated.",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setPrompt("");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    setPrompt("");
  };

  const copyLastAnswer = async () => {
    const lastAI = [...messages].reverse().find((m) => m.role === "ai");
    if (lastAI) {
      await navigator.clipboard.writeText(lastAI.content);
      alert("Copied latest AI answer!");
    }
  };

  const templates = [
    "Write me a business idea",
    "Create a SaaS startup plan",
    "Write YouTube video ideas",
    "Make a client proposal",
  ];

  return (
    <main className="min-h-screen bg-black text-white flex">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6 hidden lg:block bg-white/5">
        <h1 className="text-3xl font-bold text-cyan-400">Amar AI</h1>

        <nav className="mt-10 space-y-4 text-sm">
          <div className="p-3 rounded-xl bg-cyan-500 text-black font-semibold">
            AI Workspace
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

        <div className="mt-10 p-4 rounded-2xl bg-black border border-white/10">
          <p className="text-sm text-gray-400">Status</p>
          <p className="mt-2 text-green-400 font-semibold">
            Gemini Connected
          </p>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <section className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Amar AI Workspace ⚡</h1>
            <p className="text-gray-400 mt-2">
              A premium AI workspace powered by Gemini API
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyLastAnswer}
              className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
            >
              Copy Answer
            </button>
            <button
              onClick={clearChat}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* CHAT BOX */}
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-5 min-h-[650px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-5 pr-2">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-center text-gray-400">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Start building ideas with AI
                    </h2>
                    <p className="mt-3">
                      Ask anything about SaaS, business, coding, content, or clients.
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
                        ? "bg-cyan-500 text-black"
                        : "bg-black border border-white/10 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="bg-black border border-white/10 rounded-2xl p-4 w-fit text-gray-400">
                  Thinking...
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="mt-5">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Ask Amar AI anything..."
                className="w-full p-4 rounded-2xl bg-black border border-white/10 outline-none resize-none"
              />

              <button
                onClick={generateAI}
                disabled={loading}
                className="mt-3 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold hover:scale-[1.01] transition disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Response"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-bold">Prompt Templates</h2>
            <p className="text-gray-400 text-sm mt-2">
              Click one to start fast.
            </p>

            <div className="mt-5 space-y-3">
              {templates.map((template) => (
                <button
                  key={template}
                  onClick={() => setPrompt(template)}
                  className="w-full text-left p-3 rounded-xl bg-black border border-white/10 hover:border-cyan-400 transition"
                >
                  {template}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-black border border-white/10">
              <h3 className="font-bold">Next Features</h3>
              <ul className="text-gray-400 text-sm mt-3 space-y-2">
                <li>• Save chat history</li>
                <li>• User login</li>
                <li>• Export to PDF</li>
                <li>• Paid plans</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}