export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="text-center px-6 py-28 bg-gradient-to-b from-black via-gray-900 to-black">
        
        <div className="inline-block px-4 py-2 mb-6 text-sm border border-white/20 rounded-full text-gray-300">
          🚀 Available for Freelance & SaaS Projects
        </div>

        <h1 className="text-6xl font-bold leading-tight">
          I Build Modern AI SaaS Products
        </h1>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Software Engineer specializing in Next.js, AI tools, automation systems, and startup-grade web apps.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
          >
            Hire Me
          </a>

          <a
            href="https://wa.me/923000000000"
            target="_blank"
            className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition"
          >
            WhatsApp Me
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-10 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          What I Can Build For You
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold">AI SaaS Apps</h3>
            <p className="text-gray-400 mt-2">
              Full-stack SaaS products with AI integrations and dashboards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold">Business Websites</h3>
            <p className="text-gray-400 mt-2">
              Modern landing pages that convert visitors into clients.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold">Automation Tools</h3>
            <p className="text-gray-400 mt-2">
              Systems that save time and automate business workflows.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING */}
      <section className="px-10 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Freelance Packages
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold">Basic</h3>
            <p className="text-gray-400 mt-2">Landing page website</p>
            <p className="text-2xl mt-4">$50 - $100</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-cyan-500">
            <h3 className="text-xl font-bold">Standard</h3>
            <p className="text-gray-400 mt-2">Full business website</p>
            <p className="text-2xl mt-4">$150 - $300</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold">Premium SaaS</h3>
            <p className="text-gray-400 mt-2">AI SaaS application</p>
            <p className="text-2xl mt-4">$500+</p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-10 py-20 text-center">
        
        <h2 className="text-4xl font-bold">
          Let’s Work Together 🚀
        </h2>

        <p className="text-gray-400 mt-4">
          Send me a message and I’ll reply within 24 hours
        </p>

        <form
          action="https://formsubmit.co/amarchandoad1566@gmail.com"
          method="POST"
          className="mt-10 max-w-xl mx-auto space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 border-t border-white/10">
        © 2026 AI SaaS Portfolio | Built with Next.js
      </footer>

    </main>
  );
}