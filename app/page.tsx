"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectedBackground from "./ConnectedBackground";

const sections = ["Home", "About", "Projects", "Contact"];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [active, setActive] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Splash timing
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle wheel scroll snapping
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0 && active < sections.length - 1) {
        // scroll down
        setActive((prev) => prev + 1);
      } else if (e.deltaY < 0 && active > 0) {
        // scroll up
        setActive((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // prevent rapid scrolling
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [active]);

  // Scroll to section when active changes
  useEffect(() => {
    const el = document.getElementById(sections[active].toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setShowBar(true);
  }, [active]);

  return (
    <>
      {/* Splash stays the same */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
          >
            <motion.h1
              className="text-6xl font-bold tracking-widest"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ opacity: 0, scale: 5, transition: { duration: 1.5, ease: "easeInOut" } }}
            >
              PRASAD
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing page */}
      {!showSplash && (
        <div className="fixed inset-0 text-white">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-800" />
          <ConnectedBackground />

          {/* Scroll container */}
          <div ref={containerRef} className="relative z-10 h-dvh overflow-hidden">
            {sections.map((s) => (
              <section
                key={s}
                id={s.toLowerCase()}
                className="h-dvh flex items-center justify-center"
              >
                <div className="text-center p-10">
                  {s === "Home" && (
                    <>
                      <h1 className="text-6xl font-bold">Hi! I'm Prasad 👨🏻‍💻</h1>
                      <p className="mt-10 text-2xl text-gray-200">Software Developer 🚀</p>
                      <p className="mt-4 text-xl text-gray-300">
                        I build things that scale — from silicon chips to web apps. 💻
                      </p>
                    </>
                  )}
                  {s === "About" && <h1 className="text-5xl font-bold">About Me</h1>}
                  {s === "Projects" && <h1 className="text-5xl font-bold">Projects</h1>}
                  {s === "Contact" && <h1 className="text-5xl font-bold">Contact Me</h1>}
                </div>
              </section>
            ))}
          </div>

          {/* Right-side bar */}
          {showBar && (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  aria-label={`Go to ${s}`}
                  onClick={() => setActive(i)}
                  className="rounded-full"
                  animate={{
                    backgroundColor: i === active ? "rgba(146, 34, 238, 1)" : "rgba(255,255,255,0.35)",
                    width: i === active ? 12 : 8,
                    height: i === active ? 60 : 40,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
