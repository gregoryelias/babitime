"use client";

import { useMemo, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const CATS = ["🐱", "😺", "😸", "😻", "🐈"];

function FloatingCats() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const size = 24 + Math.random() * 24;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 6 + Math.random() * 6;
        const delay = Math.random() * 4;
        const cat = CATS[i % CATS.length];

        return (
          <span
            key={i}
            className="absolute animate-float select-none"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {cat}
          </span>
        );
      })}
    </div>
  );
}

export default function Page() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);

  const phrases = useMemo(
    () => [
      "HCCCCCCC 😠",
      "clicki yes for free kissis 😽",
      "PFFFFFT 💢",
      "look at the little ceati facis 🥺",
      "u neo lovi me? 😭",
    ],
    []
  );

  const moveNo = () => {
    const nextX = clamp(Math.floor((Math.random() - 0.5) * 260), -140, 140);
    const nextY = clamp(Math.floor((Math.random() - 0.5) * 180), -90, 90);
    setNoPos({ x: nextX, y: nextY });
  };

  if (accepted) {
    return (
      <main className="relative min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex items-center justify-center p-6">
        <FloatingCats />
        <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur shadow-xl p-10 text-center">
          <div className="text-6xl">😻💘😻</div>
          <h1 className="mt-4 text-4xl font-extrabold text-rose-700">
            The ceatis approve!!!
          </h1>
          <p className="mt-3 text-lg text-rose-900/80">
            ah hyah! 💞
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex items-center justify-center p-6">
      <FloatingCats />

      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur shadow-xl p-10 text-center overflow-hidden">
        <div className="text-6xl">🐱💝🐱</div>
        <h1 className="mt-4 text-4xl font-extrabold text-rose-700">
          Will you be my babitime?
        </h1>
        <p className="mt-3 text-rose-900/70">
          Neo hurti the ceati feelingis
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="rounded-2xl bg-rose-600 px-7 py-3 text-white font-semibold shadow hover:bg-rose-700 transition"
            onClick={() => setAccepted(true)}
          >
            Yaur 😻
          </button>

          <div className="relative">
            <button
              className="rounded-2xl bg-white px-7 py-3 text-rose-700 font-semibold shadow border border-rose-200 hover:bg-rose-50 transition"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              }}
              onMouseEnter={moveNo}
              onClick={() => {
                setNoClicks((c) => c + 1);
                moveNo();
              }}
            >
              Naur 😼
            </button>

            {noClicks > 0 && (
              <p className="mt-3 text-sm text-rose-900/70">
                {phrases[Math.min(noClicks - 1, phrases.length - 1)]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tailwind animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </main>
  );
}
