import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  const features = [
    {
      icon: "🎬",
      title: "Script Generator",
      desc: "Create cinematic YouTube scripts, hooks, and storytelling content.",
    },
    {
      icon: "🎨",
      title: "Thumbnail Generator",
      desc: "Generate viral thumbnail prompts for high-click content.",
    },
    {
      icon: "🎤",
      title: "Voiceover Creator",
      desc: "Turn scripts into clean narration and voiceover text.",
    },
    {
      icon: "🧩",
      title: "Script-to-Assets",
      desc: "Paste any script and generate thumbnails, scenes, and voiceovers.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <header className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-cyan-400">
          CreatorForge AI
        </h1>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold"
          >
            Open Dashboard
          </Link>

          <UserButton />
        </div>
      </header>

      <section className="relative z-10 px-6 md:px-12 py-24 text-center">
        <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
          AI Creator Production Platform
        </div>

        <h2 className="text-5xl md:text-7xl font-bold mt-8 max-w-5xl mx-auto leading-tight">
          Forge Viral Content with AI
        </h2>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg md:text-xl">
          Generate scripts, thumbnails, voiceovers, scene plans, and creator
          projects in one powerful AI workspace.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold"
          >
            Start Creating
          </Link>

          <a
            href="#features"
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5"
          >
            Explore Features
          </a>
        </div>
      </section>

      <section id="features" className="relative z-10 px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Everything Creators Need
          </h2>

          <p className="text-gray-400 text-center mt-4">
            From idea to production assets in one workflow.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-7 rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="text-5xl">{feature.icon}</div>

                <h3 className="text-2xl font-bold mt-5">
                  {feature.title}
                </h3>

                <p className="text-gray-400 mt-3">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Built for YouTube Creators
          </h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto">
            CreatorForge AI helps creators save time by turning one idea or
            one script into content assets ready for production.
          </p>

          <div className="grid md:grid-cols-5 gap-4 mt-10">
            {["Idea", "Script", "Thumbnail", "Voiceover", "Project"].map(
              (step, index) => (
                <div
                  key={step}
                  className="p-5 rounded-2xl bg-black border border-white/10"
                >
                  <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="font-semibold">{step}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 md:px-12 py-8 text-center text-gray-500">
        © 2026 CreatorForge AI. Built for creators and storytellers.
      </footer>
    </main>
  );
}