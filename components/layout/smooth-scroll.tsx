"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// @note provides smooth scrolling using lenis library
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // @note destroy existing lenis instance if it exists
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.destroy();
      delete window.lenis;
    }

    // @note scroll to top when route changes
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    // @note handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement && targetElement instanceof HTMLElement) {
            // @note offset -200 to account for navbar height and center of section
            lenis.scrollTo(targetElement, { offset: -200, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
