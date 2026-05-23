import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  const features = [
    {
      icon: "🎬",
      title: "Script Generator",
      desc: "Create YouTube scripts, documentary narration, hooks, and outlines.",
    },
    {
      icon: "🎨",
      title: "Thumbnail Prompt AI",
      desc: "Generate cinematic, high-CTR thumbnail ideas and prompts.",
    },
    {
      icon: "🎥",
      title: "Scene Generator",
      desc: "Turn scripts into cinematic scenes, camera angles, and visual plans.",
    },
    {
      icon: "🎤",
      title: "Voiceover Studio",
      desc: "Create narration text and play voiceovers with browser voice support.",
    },
    {
      icon: "📦",
      title: "Export Workflow",
      desc: "Copy, clear, export, and reuse your AI-generated creator assets.",
    },
    {
      icon: "🚀",
      title: "Creator Workspace",
      desc: "One dashboard for scripts, scenes, thumbnails, and production ideas.",
    },
  ];

  const workflow = [
    "Idea",
    "Script",
    "Scenes",
    "Thumbnail",
    "Voiceover",
    "Export",
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-14 py-6 border-b border-white/10 backdrop-blur-xl">
        <a href="/" className="text-2xl font-bold text-cyan-400">
          Amar AI Studio
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-cyan-400">
            Features
          </a>
          <a href="#workflow" className="hover:text-cyan-400">
            Workflow
          </a>
          <a href="#pricing" className="hover:text-cyan-400">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:scale-105 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              href="/dashboard"
              className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:scale-105 transition"
            >
              Dashboard
            </a>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 text-center px-6 pt-28 pb-24">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
          🚀 AI Creator Production Studio
        </div>

        <h1 className="text-5xl md:text-7xl font-bold max-w-5xl mx-auto leading-tight">
          Create YouTube Content with AI
        </h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg md:text-xl">
          Generate scripts, cinematic scenes, thumbnail prompts, and voiceovers
          in one powerful creator workflow.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:scale-105 transition">
                Start Creating Free
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:scale-105 transition"
            >
              Open Dashboard
            </a>
          </SignedIn>

          <a
            href="#workflow"
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            See Workflow
          </a>
        </div>

        <div className="mt-16 max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">
          <div className="grid md:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <p className="text-gray-400 text-sm">AI Tools</p>
              <h3 className="text-3xl font-bold text-cyan-400 mt-2">6+</h3>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <p className="text-gray-400 text-sm">Workflow</p>
              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                Script → Video
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <p className="text-gray-400 text-sm">Voice</p>
              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                Browser AI
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <p className="text-gray-400 text-sm">Export</p>
              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                TXT Ready
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 lg:px-14 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything Creators Need
          </h2>
          <p className="text-gray-400 mt-4">
            Not just AI answers — a full creator workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-cyan-400/50 transition"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-2xl font-bold mt-5">{feature.title}</h3>
              <p className="text-gray-400 mt-3">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="relative z-10 px-6 lg:px-14 py-20">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 lg:p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            From Idea to Creator Assets
          </h2>

          <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            Your users do not need ten different tools. They can build a
            complete content workflow in one place.
          </p>

          <div className="grid md:grid-cols-6 gap-4 mt-12">
            {workflow.map((step, index) => (
              <div
                key={step}
                className="p-5 rounded-2xl bg-black/50 border border-white/10 text-center"
              >
                <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 px-6 lg:px-14 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple Pricing
          </h2>
          <p className="text-gray-400 mt-4">
            Start free, upgrade later when premium AI APIs are connected.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
            <h3 className="text-2xl font-bold">Free</h3>
            <p className="text-gray-400 mt-2">For testing and creators.</p>
            <p className="text-4xl font-bold mt-6">$0</p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li>✅ Script generation</li>
              <li>✅ Thumbnail prompts</li>
              <li>✅ Scene ideas</li>
              <li>✅ Browser voice</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-cyan-400 bg-cyan-500/10 scale-105">
            <h3 className="text-2xl font-bold">Creator Pro</h3>
            <p className="text-gray-400 mt-2">For serious YouTubers.</p>
            <p className="text-4xl font-bold mt-6">$9</p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li>✅ Real AI voices</li>
              <li>✅ MP3 downloads</li>
              <li>✅ Real thumbnails</li>
              <li>✅ Saved projects</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
            <h3 className="text-2xl font-bold">Studio</h3>
            <p className="text-gray-400 mt-2">For agencies and teams.</p>
            <p className="text-4xl font-bold mt-6">$29</p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li>✅ Team projects</li>
              <li>✅ Video workflow</li>
              <li>✅ Character upload</li>
              <li>✅ Priority generation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
          Build Content Faster with Amar AI Studio
        </h2>

        <p className="text-gray-400 mt-5">
          Start with one idea. Generate the full creator workflow.
        </p>

        <div className="mt-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:scale-105 transition">
                Start Creating Now
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:scale-105 transition"
            >
              Go to Dashboard
            </a>
          </SignedIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-14 py-10 text-center text-gray-500">
        © 2026 Amar AI Studio. Built for creators, students, and storytellers.
      </footer>
    </main>
  );
}