import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Sidebar";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white lg:pl-72">
      <Sidebar />

      <div className="p-6 md:p-8">
        <div className="flex justify-end mb-8">
          <UserButton />
        </div>

        {children}
      </div>
    </main>
  );
}