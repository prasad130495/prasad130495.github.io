"use client";

import { useEffect, useRef } from "react";

export default function ConnectedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create particles
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const numParticles = 200;

    for (let i = 0; i < numParticles; i++) {
        
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
      });
    }

    function animate() {
        if (!ctx) {
      console.error("2D context not available");
      return;
    }
      ctx.clearRect(0, 0, width, height);

      // draw particles
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); // radius 3 for visibility
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
      }

      // draw connecting lines
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);


          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            gradient.addColorStop(0, "rgba(0, 255, 255, 0.7)"); // cyan
            gradient.addColorStop(1, "rgba(255, 0, 255, 0.7)"); // magenta
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
    />
  );
}
