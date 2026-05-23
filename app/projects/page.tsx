"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

interface Project {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

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
    const updatedProjects = projects.filter((p) => p.id !== id);

    setProjects(updatedProjects);

    localStorage.setItem(
      "amar-ai-projects",
      JSON.stringify(updatedProjects)
    );

    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <a href="/dashboard" className="text-cyan-400">
          ← Back to Dashboard
        </a>

        <UserButton />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">
          My Projects 📁
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Your saved AI scripts, scenes, thumbnails, and voiceover projects.
        </p>

        {projects.length === 0 ? (
          <div className="border border-white/10 rounded-3xl p-20 text-center bg-white/5">
            <h2 className="text-4xl font-bold">
              No saved projects yet
            </h2>

            <p className="text-gray-400 mt-4 text-lg">
              Generate content from any AI tool, then save it as a project.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-white/10 rounded-3xl p-6 bg-white/5 hover:bg-white/10 transition"
                >
                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 mt-2 text-sm">
                    {project.createdAt}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-cyan-500 text-black py-3 rounded-2xl font-bold"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-500/20 text-red-300 border border-red-400/20 py-3 rounded-2xl font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedProject ? (
                <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
                  <h2 className="text-4xl font-bold mb-3">
                    {selectedProject.title}
                  </h2>

                  <p className="text-gray-400 mb-8">
                    {selectedProject.createdAt}
                  </p>

                  <div className="whitespace-pre-wrap text-gray-200 leading-8">
                    {selectedProject.content}
                  </div>
                </div>
              ) : (
                <div className="border border-white/10 rounded-3xl p-20 bg-white/5 text-center">
                  <h2 className="text-4xl font-bold">
                    Select a Project
                  </h2>

                  <p className="text-gray-400 mt-4 text-lg">
                    Open a saved project to view all content.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}