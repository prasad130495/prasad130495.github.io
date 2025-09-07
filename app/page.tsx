"use client"; // Marks this component as a client-side component (Next.js app directory rule)

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // animation library
import ConnectedBackground from "./ConnectedBackground"; // your custom animated background

// Sections of your landing page (order matters)
const sections = ["Home", "About", "Projects", "Contact"];

export default function Home() {
  // State to control splash visibility
  const [showSplash, setShowSplash] = useState(true);

  // Index of currently active section
  const [active, setActive] = useState(0);

  // State to show/hide the right-side navigation bar
  const [showBar, setShowBar] = useState(false);

  // Ref to the scroll container (we’ll attach wheel events here)
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevents multiple scrolls firing at once
  const isScrolling = useRef(false);

  // --- Splash timing ---
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500); // hide splash after 1.5s
    return () => clearTimeout(timer);
  }, []);

  // --- Handle wheel scroll snapping ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (isScrolling.current) return; // ignore if already scrolling
      isScrolling.current = true;

      if (e.deltaY > 0 && active < sections.length - 1) {
        // scroll down → move to next section
        setActive((prev) => prev + 1);
      } else if (e.deltaY < 0 && active > 0) {
        // scroll up → move to previous section
        setActive((prev) => prev - 1);
      }

      // Allow another scroll after 800ms
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    // Attach wheel event listener
    container.addEventListener("wheel", onWheel, { passive: false });

    // Cleanup listener on unmount
    return () => container.removeEventListener("wheel", onWheel);
  }, [active]);

  // --- Scroll into view whenever active section changes ---
  useEffect(() => {
    const el = document.getElementById(sections[active].toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" }); // snap to section smoothly
    setShowBar(true); // show the side nav bar once user starts interacting
  }, [active]);

  return (
    <>
      {/* Splash Screen (PRASAD text) */}
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
              exit={{
                opacity: 0,
                scale: 5, // grows big before fading out
                transition: { duration: 1.5, ease: "easeInOut" },
              }}
            >
              PRASAD
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Page (after splash) */}
      {!showSplash && (
        <div className="fixed inset-0 text-white">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-800" />

          {/* Animated techy lines background */}
          <ConnectedBackground />

          {/* Scrollable container with sections */}
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

          {/* Right-side progress/navigation bar */}
          {showBar && (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  aria-label={`Go to ${s}`}
                  onClick={() => setActive(i)} // jump to section when clicked
                  className="rounded-full"
                  animate={{
                    backgroundColor:
                      i === active ? "rgba(146, 34, 238, 1)" : "rgba(255,255,255,0.35)",
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
