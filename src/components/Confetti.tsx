"use client";

import { useMemo } from "react";

const PIECES = 60;
const COLORS = ["#E10600", "#FFD700", "#ffffff", "#ff8aa0", "#00AAFF", "#00FF88"];

export default function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: PIECES }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 3.5 + Math.random() * 2.5,
        rotate: Math.random() * 360,
        drift: -40 + Math.random() * 80,
        width: 6 + Math.random() * 6,
        height: 10 + Math.random() * 8,
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-6 block"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `flabo-confetti ${p.duration}s ${p.delay}s linear forwards`,
            ["--drift" as string]: `${p.drift}px`,
            boxShadow: `0 0 6px ${p.color}55`,
          }}
        />
      ))}
      <style>{`
        @keyframes flabo-confetti {
          0% { transform: translate(0, -10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(var(--drift), 110vh) rotate(720deg); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
