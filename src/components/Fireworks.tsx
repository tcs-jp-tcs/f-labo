"use client";

import { useMemo } from "react";

const PARTICLE_COUNT = 80;
const COLORS = ["#E10600", "#FFD700", "#ffffff", "#ff4444", "#00FF88", "#00AAFF"];

export default function Fireworks() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 220;
        return {
          id: i,
          color: COLORS[i % COLORS.length],
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance,
          delay: Math.random() * 0.4,
          size: 6 + Math.random() * 8,
        };
      }),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute block rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 12px ${p.color}`,
              animation: `flabo-firework 1.4s ${p.delay}s ease-out forwards`,
              ["--tx" as string]: `${p.tx}px`,
              ["--ty" as string]: `${p.ty}px`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes flabo-firework {
          0% { transform: translate(0, 0) scale(0.6); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
