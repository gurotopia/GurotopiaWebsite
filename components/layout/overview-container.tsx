import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export function OverviewContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground font-sans w-full min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-[1080px] flex px-3 pt-[calc(3.5rem+0.75rem)] md:pt-0">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
