import Link from "next/link";

export default function DashboardPage() {
  const tools = [
    {
      title: "YouTube Script AI",
      icon: "🎬",
      href: "/dashboard/youtube-script",
      desc: "Generate scripts, scenes, thumbnails, and voiceovers.",
    },
    {
      title: "Thumbnail Generator",
      icon: "🎨",
      href: "/dashboard/thumbnail-generator",
      desc: "Create viral cinematic thumbnail prompts.",
    },
    {
      title: "My Projects",
      icon: "📁",
      href: "/projects",
      desc: "Open your saved creator projects.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold">Creator Dashboard 🚀</h1>

        <p className="text-gray-400 mt-4">Your AI creator workspace.</p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-cyan-400/50 transition"
            >
              <div className="text-5xl">{tool.icon}</div>

              <h2 className="text-2xl font-bold mt-5">{tool.title}</h2>

              <p className="text-gray-400 mt-3">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}