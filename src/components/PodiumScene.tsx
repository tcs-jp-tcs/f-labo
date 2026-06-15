type Props = {
  rd: number;
  dateLabel: string;
};

export default function PodiumScene({ rd, dateLabel }: Props) {
  return (
    <div
      className="relative mx-auto w-full max-w-md rounded-2xl border border-flabo-red/40 bg-gradient-to-br from-flabo-darker via-flabo-carbon to-flabo-darker p-6 shadow-[0_0_45px_rgba(225,6,0,0.25)] overflow-hidden"
      role="img"
      aria-label={`Fラボ検定 Rd.${rd} 表彰台`}
    >
      <div className="text-center space-y-3">
        <p className="font-display tracking-[0.32em] text-[0.7rem] text-flabo-red">
          PODIUM FINISH
        </p>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 220 150"
            className="w-full max-w-[280px] h-auto drop-shadow-[0_0_18px_rgba(225,6,0,0.35)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="podiumGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE57A" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
              <linearGradient id="podiumSilver" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#8a8a8a" />
              </linearGradient>
              <linearGradient id="podiumBronze" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CD7F32" />
                <stop offset="100%" stopColor="#7a4a1c" />
              </linearGradient>
            </defs>

            {/* Spotlight glow behind podium */}
            <ellipse
              cx="110"
              cy="60"
              rx="90"
              ry="32"
              fill="#E10600"
              opacity="0.15"
            />

            {/* 2nd place (left, silver) */}
            <rect
              x="20"
              y="70"
              width="58"
              height="60"
              fill="url(#podiumSilver)"
              stroke="#5a5a5a"
              strokeWidth="1.2"
            />
            <text
              x="49"
              y="106"
              textAnchor="middle"
              fontSize="22"
              fontWeight="900"
              fill="#222"
              fontFamily="system-ui, sans-serif"
            >
              2
            </text>
            {/* Figure on 2nd — highlighted */}
            <circle cx="49" cy="56" r="9" fill="#E10600" />
            <rect
              x="42"
              y="64"
              width="14"
              height="14"
              rx="2"
              fill="#E10600"
            />
            <text
              x="49"
              y="42"
              textAnchor="middle"
              fontSize="14"
              fill="#FFD700"
            >
              ★
            </text>

            {/* 1st place (center, gold) */}
            <rect
              x="80"
              y="50"
              width="60"
              height="80"
              fill="url(#podiumGold)"
              stroke="#8B6508"
              strokeWidth="1.2"
            />
            <text
              x="110"
              y="98"
              textAnchor="middle"
              fontSize="26"
              fontWeight="900"
              fill="#5a3d00"
              fontFamily="system-ui, sans-serif"
            >
              1
            </text>
            {/* Figure on 1st (greyed) */}
            <circle cx="110" cy="34" r="9" fill="#666" />
            <rect
              x="103"
              y="42"
              width="14"
              height="14"
              rx="2"
              fill="#666"
            />

            {/* 3rd place (right, bronze) */}
            <rect
              x="142"
              y="80"
              width="58"
              height="50"
              fill="url(#podiumBronze)"
              stroke="#4a2c10"
              strokeWidth="1.2"
            />
            <text
              x="171"
              y="113"
              textAnchor="middle"
              fontSize="20"
              fontWeight="900"
              fill="#fff"
              fontFamily="system-ui, sans-serif"
            >
              3
            </text>
            {/* Figure on 3rd (greyed) */}
            <circle cx="171" cy="66" r="8" fill="#666" />
            <rect
              x="165"
              y="73"
              width="12"
              height="12"
              rx="2"
              fill="#666"
            />

            {/* Floor line */}
            <line
              x1="0"
              y1="130"
              x2="220"
              y2="130"
              stroke="#444"
              strokeWidth="1"
            />

            {/* Sparkles */}
            <text x="20" y="30" fontSize="12" fill="#FFD700">
              ✦
            </text>
            <text x="195" y="42" fontSize="14" fill="#FFD700">
              ✦
            </text>
            <text x="190" y="22" fontSize="10" fill="#fff">
              ✦
            </text>
            <text x="28" y="52" fontSize="9" fill="#fff">
              ✦
            </text>
          </svg>
        </div>

        <p className="text-base font-bold text-white">
          Fラボ検定 Rd.{rd} <span className="text-flabo-red">2位 表彰台</span>
        </p>
        <p className="text-sm text-white/75 leading-relaxed">
          おめでとう！次は頂点を狙え。
        </p>

        <div className="flex items-center justify-center gap-3 pt-1 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
          <span>{dateLabel}</span>
          <span className="text-flabo-red">●</span>
          <span>F-LABO</span>
        </div>
      </div>
    </div>
  );
}
