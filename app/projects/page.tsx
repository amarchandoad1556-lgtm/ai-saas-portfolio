"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

type Project = {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const savedProjects = JSON.parse(
      localStorage.getItem("amar-ai-projects") || "[]"
    );

    setProjects(savedProjects);
  }, []);

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);

    setProjects(updatedProjects);
    localStorage.setItem("amar-ai-projects", JSON.stringify(updatedProjects));

    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const exportProject = (project: Project) => {
    const file = new Blob([project.content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${project.title}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <section className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
            📁 Creator Project Library
          </div>

          <h1 className="text-5xl font-bold">My Projects</h1>

          <p className="text-gray-400 mt-4">
            Your saved AI scripts, thumbnails, scenes, and voiceover content.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-white/5 text-center">
            <h2 className="text-3xl font-bold">No saved projects yet</h2>

            <p className="text-gray-400 mt-4">
              Generate content from any AI tool and click Save Project.
            </p>

            <a
              href="/dashboard"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold"
            >
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-5 rounded-3xl border transition ${
                    selectedProject?.id === project.id
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                      {project.type || "AI Project"}
                    </span>

                    <span className="text-xs text-gray-500">
                      {project.createdAt}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mt-4">{project.title}</h2>

                  <p className="text-gray-400 mt-3 line-clamp-3 whitespace-pre-wrap">
                    {project.content}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="py-2 rounded-xl bg-cyan-500 text-black font-bold"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => exportProject(project)}
                      className="py-2 rounded-xl border border-white/10 text-gray-200"
                    >
                      Export
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="py-2 rounded-xl border border-red-400/20 text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedProject ? (
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                        {selectedProject.type || "AI Project"}
                      </span>

                      <h2 className="text-4xl font-bold mt-4">
                        {selectedProject.title}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        {selectedProject.createdAt}
                      </p>
                    </div>

                    <button
                      onClick={() => exportProject(selectedProject)}
                      className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold"
                    >
                      Export Project
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-black border border-white/10 whitespace-pre-wrap text-gray-200 leading-8">
                    {selectedProject.content}
                  </div>
                </div>
              ) : (
                <div className="p-12 rounded-3xl border border-white/10 bg-white/5 text-center">
                  <h2 className="text-3xl font-bold">Select a project</h2>

                  <p className="text-gray-400 mt-4">
                    Click Open on any saved project to view it here.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}