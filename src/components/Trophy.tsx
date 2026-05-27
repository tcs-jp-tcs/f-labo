type Props = {
  vol: number;
  dateLabel: string;
};

export default function Trophy({ vol, dateLabel }: Props) {
  return (
    <div
      className="relative mx-auto w-full max-w-md rounded-2xl border-2 border-flabo-yellow bg-gradient-to-br from-[#1a1407] via-[#3a2a08] to-[#1a1407] p-6 shadow-[0_0_70px_rgba(255,215,0,0.4)] overflow-hidden"
      role="img"
      aria-label={`Fラボ検定 Vol.${vol} ワールドチャンピオン トロフィー`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "repeating-conic-gradient(from 45deg, #ffffff 0deg 90deg, #000000 90deg 180deg)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 25%, transparent 75%, rgba(0,0,0,0.7))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 25%, transparent 75%, rgba(0,0,0,0.7))",
        }}
      />

      <div className="relative z-10 text-center space-y-3">
        <p className="font-display tracking-[0.32em] text-[0.6rem] text-flabo-yellow">
          WORLD CHAMPION TROPHY
        </p>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 120 140"
            className="w-28 h-32 drop-shadow-[0_0_24px_rgba(255,215,0,0.65)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="cupGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE57A" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
              <linearGradient id="baseGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#8B6508" />
              </linearGradient>
            </defs>
            {/* Handles */}
            <path
              d="M22 42 Q4 52 14 84 Q22 96 34 92"
              fill="none"
              stroke="url(#cupGold)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M98 42 Q116 52 106 84 Q98 96 86 92"
              fill="none"
              stroke="url(#cupGold)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Cup body */}
            <path
              d="M22 30 H98 V60 Q98 96 60 102 Q22 96 22 60 Z"
              fill="url(#cupGold)"
              stroke="#8B6508"
              strokeWidth="1.5"
            />
            {/* Rim highlight */}
            <ellipse
              cx="60"
              cy="32"
              rx="38"
              ry="5"
              fill="#FFF3B0"
              opacity="0.85"
            />
            {/* Stem */}
            <rect x="54" y="100" width="12" height="14" fill="url(#baseGold)" />
            {/* Base layers */}
            <rect
              x="34"
              y="114"
              width="52"
              height="8"
              rx="2"
              fill="url(#baseGold)"
            />
            <rect
              x="26"
              y="122"
              width="68"
              height="12"
              rx="2"
              fill="url(#baseGold)"
            />
            {/* Plate text mark */}
            <rect
              x="36"
              y="124"
              width="48"
              height="8"
              rx="1"
              fill="#1a1407"
              opacity="0.7"
            />
            <text
              x="60"
              y="131"
              textAnchor="middle"
              fontSize="6"
              fontWeight="900"
              fill="#FFD700"
              fontFamily="system-ui, sans-serif"
            >
              F-LABO
            </text>
            {/* Star on cup */}
            <text
              x="60"
              y="74"
              textAnchor="middle"
              fontSize="34"
              fill="#fff"
              opacity="0.9"
            >
              ★
            </text>
          </svg>
        </div>

        <p className="text-xl font-bold text-flabo-yellow drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
          Fラボ検定 Vol.{vol} ワールドチャンピオン
        </p>
        <p className="text-sm text-white/85 leading-relaxed">
          全問正解おめでとう！
        </p>

        <div className="flex items-center justify-center gap-3 pt-2 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
          <span>{dateLabel}</span>
          <span className="text-flabo-yellow">●</span>
          <span>F-LABO</span>
        </div>
      </div>
    </div>
  );
}
