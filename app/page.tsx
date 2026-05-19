"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_45%)] pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="flex justify-between items-center px-6 md:px-10 py-5">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Amar AI Studio
          </h1>

          <nav className="hidden md:flex space-x-8 text-sm text-gray-300">
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-28 md:pt-36">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold leading-tight"
        >
          Build SaaS Products <br />
          Like a Real Startup 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mt-6 max-w-2xl text-base md:text-lg"
        >
          I design and develop AI-powered SaaS applications, dashboards,
          automation tools, and modern web experiences using Next.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col md:flex-row gap-4"
        >
          <button className="bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            View Projects
          </button>

          <button className="border border-white/20 px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition">
            Contact Me
          </button>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="mt-40 px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Skills & Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind",
            "Framer Motion",
            "Cursor AI",
            "Firebase",
            "GitHub"
          ].map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl hover:border-cyan-400 hover:scale-105 transition"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mt-40 px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI SaaS Dashboard",
              desc: "Analytics dashboard with AI insights and modern UI.",
              icon: "📊"
            },
            {
              title: "AI Chatbot Builder",
              desc: "Create custom AI chatbots with OpenAI integration.",
              icon: "🤖"
            },
            {
              title: "Portfolio System",
              desc: "Developer portfolio with SaaS-grade design system.",
              icon: "💼"
            }
          ].map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400 hover:-translate-y-2 transition"
            >
              <div className="text-4xl mb-4">{project.icon}</div>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-400 mt-3">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-40 text-center px-6 pb-20">
        <h2 className="text-4xl md:text-5xl font-bold">
          Let’s Build Something Powerful
        </h2>

        <p className="text-gray-400 mt-5 max-w-xl mx-auto">
          Available for freelance work, SaaS projects, and AI product development.
        </p>

        <button className="mt-8 bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
          Contact Me
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Amar AI Studio. Built with Next.js & Framer Motion.
      </footer>

    </main>
  );
}