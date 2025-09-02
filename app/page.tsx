"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectedBackground from "./ConnectedBackground";


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500); // 1.5s splash
    return () => clearTimeout(timer);
  }, []);

  return (
<div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-800">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.0, ease: "easeInOut" },
            }}
          >
            <motion.h1
              className="text-6xl font-bold tracking-widest"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 5,
                transition: { duration: 1.5, ease: "easeInOut" },
              }}
            >
              PRASAD
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Page */}
      {!showSplash && (
        <>
          {/* Animated background */}
          <ConnectedBackground />

          {/* Content */}
          <motion.div
            className="p-10 text-center relative z-10"
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold">Hi! I'm Prasad 👨🏻‍💻 </h1>
            <p className="mt-10 text-2xl text-gray-300">Software Developer 🚀</p>
            <p className="mt-4 text-xl text-gray-300">I build things that scale — from silicon chips to web apps. 💻</p>
          </motion.div>
        </>
      )}
    </div>
  );
}
