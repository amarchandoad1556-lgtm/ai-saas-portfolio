"use client";

import { ReactNode, useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Sidebar";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("creatorforge-sidebar");
  
    if (savedState !== null) {
      setSidebarOpen(savedState === "true");
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {sidebarOpen && <Sidebar />}

      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:pl-72" : "pl-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <button
            onClick={() => {
                const newState = !sidebarOpen;
              
                setSidebarOpen(newState);
              
                localStorage.setItem(
                  "creatorforge-sidebar",
                  String(newState)
                );
              }}
            className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>

          <UserButton />
        </div>

        <div className="p-6 md:p-8">{children}</div>
      </div>
    </main>
  );
}