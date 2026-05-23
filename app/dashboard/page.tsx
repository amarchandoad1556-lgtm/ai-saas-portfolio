import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const tools = [
    {
      title: "YouTube Script AI",
      icon: "🎬",
      href: "/dashboard/youtube-script",
      desc: "Generate cinematic YouTube scripts and voiceovers.",
      color: "from-cyan-500/20 to-blue-500/10",
    },
    {
      title: "Thumbnail Generator",
      icon: "🎨",
      href: "/dashboard/thumbnail-generator",
      desc: "Create viral cinematic thumbnail prompts instantly.",
      color: "from-purple-500/20 to-pink-500/10",
    },
    {
      title: "My Projects",
      icon: "📁",
      href: "/projects",
      desc: "Manage saved scripts, voiceovers, and creator assets.",
      color: "from-green-500/20 to-emerald-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6 border-b border-white/10 backdrop-blur-xl">
        <div>
          <p className="text-cyan-400 text-sm font-semibold">
            🚀 Creator Workspace
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Amar AI Studio
          </h1>
        </div>

        <UserButton />
      </header>

      {/* HERO */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            AI Creator Production Suite
          </div>

          <h2 className="text-4xl md:text-7xl font-bold mt-8 leading-tight">
            Create YouTube Content Faster with AI
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-3xl">
            Generate scripts, thumbnails, voiceovers, and creator projects
            inside one cinematic AI workspace.
          </p>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <p className="text-gray-400 text-sm">AI Tools</p>

              <h3 className="text-4xl font-bold mt-3 text-cyan-400">
                3+
              </h3>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <p className="text-gray-400 text-sm">Creator Workflow</p>

              <h3 className="text-4xl font-bold mt-3 text-cyan-400">
                Script → Voice
              </h3>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <p className="text-gray-400 text-sm">Project Storage</p>

              <h3 className="text-4xl font-bold mt-3 text-cyan-400">
                Local Save
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="relative z-10 px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-4xl font-bold">
                Creator Tools
              </h2>

              <p className="text-gray-400 mt-3">
                Launch your content workflow with AI.
              </p>
            </div>

            <a
              href="/"
              className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              View Landing Page
            </a>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${tool.color} p-8 hover:border-cyan-400/50 transition duration-300`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/5" />

                <div className="relative z-10">
                  <div className="text-6xl mb-6">
                    {tool.icon}
                  </div>

                  <h3 className="text-3xl font-bold">
                    {tool.title}
                  </h3>

                  <p className="text-gray-300 mt-4 leading-7">
                    {tool.desc}
                  </p>

                  <div className="mt-8 flex items-center text-cyan-300 font-semibold">
                    Open Tool →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-8 text-center text-gray-500">
        © 2026 Amar AI Studio — AI tools for creators and storytellers.
      </footer>
    </main>
  );
}