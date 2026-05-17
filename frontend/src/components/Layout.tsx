import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen relative">

      {/* Full-page video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover -z-10"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />
      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.7] mix-blend-overlay -z-10" />
      {/* Gradient */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/80 -z-10" />

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}