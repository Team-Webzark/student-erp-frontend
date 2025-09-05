"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function GlobalLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Start progress bar when route changes
    NProgress.start();

    // Simulate route load delay (for smoother effect)
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null; // nothing to render
}
