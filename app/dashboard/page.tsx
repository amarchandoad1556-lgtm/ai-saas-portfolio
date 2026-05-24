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
      title: "Script-to-Assets Studio",
      icon: "🧩",
      href: "/dashboard/script-to-assets",
      desc: "Paste any script and generate thumbnails, scenes, and voiceovers.",
      color: "from-orange-500/20 to-yellow-500/10",
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
    <main className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-cyan-400 font-semibold">🚀 Creator Workspace</p>
          <h1 className="text-4xl font-bold mt-2">CreatorForge AI</h1>
        </div>

        <UserButton />
      </div>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-bold leading-tight">
          Create YouTube Content Faster with AI
        </h2>

        <p className="text-gray-400 mt-6 text-lg max-w-3xl">
          Generate scripts, thumbnails, voiceovers, scene plans, and creator
          projects inside one cinematic AI workspace.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${tool.color} p-8 hover:border-cyan-400/50 transition`}
            >
              <div className="text-6xl mb-6">{tool.icon}</div>

              <h3 className="text-3xl font-bold">{tool.title}</h3>

              <p className="text-gray-300 mt-4">{tool.desc}</p>

              <p className="text-cyan-300 mt-8 font-semibold">Open Tool →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}