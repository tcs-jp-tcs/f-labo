import type { Series } from "@/lib/data";

type Category = Series | "F2/F3";

const CATEGORY_THEME: Record<Category, { from: string; to: string; label: string; sub: string }> = {
  F1: { from: "#E10600", to: "#7a0300", label: "F1", sub: "FORMULA 1" },
  F2: { from: "#0078FF", to: "#003a7a", label: "F2", sub: "FORMULA 2" },
  F3: { from: "#0078FF", to: "#003a7a", label: "F3", sub: "FORMULA 3" },
  "F2/F3": { from: "#0078FF", to: "#003a7a", label: "F2/F3", sub: "FORMULA 2 / 3" },
  SF: { from: "#FFD700", to: "#7a6800", label: "SF", sub: "SUPER FORMULA" },
  INDY: { from: "#00FF88", to: "#005a32", label: "INDY", sub: "INDYCAR" },
};

export default function CategoryArt({
  category,
  className = "",
  compact = false,
}: {
  category: Category;
  className?: string;
  compact?: boolean;
}) {
  const theme = CATEGORY_THEME[category];
  const gradId = `grad-${category.replace("/", "-")}`;
  const stripeId = `stripe-${category.replace("/", "-")}`;

  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.from} />
          <stop offset="100%" stopColor={theme.to} />
        </linearGradient>
        <pattern id={stripeId} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="14" height="14" fill="rgba(0,0,0,0.0)" />
          <rect width="3" height="14" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#${gradId})`} />
      <rect width="320" height="180" fill={`url(#${stripeId})`} />
      {/* speed lines */}
      <g opacity="0.45" stroke="white" strokeWidth="2" strokeLinecap="round">
        <line x1="20" y1="140" x2="80" y2="140" />
        <line x1="40" y1="155" x2="130" y2="155" />
        <line x1="10" y1="125" x2="55" y2="125" />
      </g>
      <text
        x="24"
        y={compact ? 90 : 110}
        fontFamily="'Orbitron', sans-serif"
        fontWeight="900"
        fontSize={compact ? 56 : 78}
        fill="white"
        style={{ letterSpacing: 2 }}
      >
        {theme.label}
      </text>
      <text
        x="24"
        y={compact ? 110 : 134}
        fontFamily="'Orbitron', sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="rgba(255,255,255,0.7)"
        style={{ letterSpacing: 4 }}
      >
        {theme.sub}
      </text>
      <text
        x="296"
        y="160"
        textAnchor="end"
        fontFamily="'Orbitron', sans-serif"
        fontWeight="700"
        fontSize="10"
        fill="rgba(255,255,255,0.55)"
        style={{ letterSpacing: 3 }}
      >
        FLABO
      </text>
    </svg>
  );
}
