import Link from "next/link";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠" },
    { name: "YouTube Script", href: "/dashboard/youtube-script", icon: "🎬" },
    { name: "Thumbnail Prompt", href: "/dashboard/thumbnail-generator", icon: "🎨" },
    { name: "Thumbnail Image", href: "/dashboard/thumbnail-image-generator", icon: "🖼️" },
    { name: "Video Generator", href: "/dashboard/video-generator", icon: "🎥" },
    { name: "Script Assets", href: "/dashboard/script-to-assets", icon: "🧩" },
    { name: "Projects", href: "/projects", icon: "📁" },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-black border-r border-white/10 p-6 flex-col z-50">
      <Link href="/" className="text-2xl font-bold text-cyan-400 mb-10">
        CreatorForge AI
      </Link>

      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">
        <p className="text-cyan-300 font-bold">Creator Workspace</p>
        <p className="text-gray-400 text-sm mt-2">
          Build scripts, thumbnails, voiceovers, and video plans.
        </p>
      </div>
    </aside>
  );
}