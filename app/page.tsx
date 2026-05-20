export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      
      <h1 className="text-5xl font-bold">
        Amar AI Studio 🚀
      </h1>

      <p className="text-gray-400 mt-6 text-lg">
        My first SaaS portfolio deployed with Next.js and Vercel.
      </p>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
            <h3 className="text-xl font-semibold">
              AI SaaS Dashboard
            </h3>

            <p className="text-gray-400 mt-3">
              Analytics dashboard UI with modern design.
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
            <h3 className="text-xl font-semibold">
              AI Chatbot
            </h3>

            <p className="text-gray-400 mt-3">
              OpenAI-powered chatbot interface project.
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
            <h3 className="text-xl font-semibold">
              Portfolio Website
            </h3>

            <p className="text-gray-400 mt-3">
              SaaS-style developer portfolio system.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}