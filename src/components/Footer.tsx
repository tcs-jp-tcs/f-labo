import { sns } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="max-w-[1280px] mx-auto px-6 py-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 relative z-10">
      <div>
        <svg viewBox="0 0 120 50" width="72" height="30">
          <g transform="skewX(-9)">
            <rect x="16" y="4" width="9" height="34" fill="#E10600" opacity="0.5" />
            <rect x="16" y="4" width="26" height="7" fill="#E10600" opacity="0.5" />
            <rect x="16" y="16" width="20" height="6" fill="#E10600" opacity="0.5" />
          </g>
          <g transform="skewX(-9)">
            <rect x="48" y="4" width="9" height="34" fill="#FFF" opacity="0.3" />
            <rect x="48" y="32" width="20" height="5" fill="#FFF" opacity="0.3" />
          </g>
          <text
            x="62"
            y="31"
            fontFamily="Arial, sans-serif"
            fontSize="14"
            fontWeight="500"
            fontStyle="italic"
            fill="#666"
            transform="skewX(-4)"
          >
            abo
          </text>
        </svg>
      </div>
      <div className="flex gap-4">
        <a
          href={sns.x.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-flabo-grey hover:text-white text-xs transition-colors"
        >
          X {sns.x.handle}
        </a>
        <a
          href={sns.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-flabo-grey hover:text-white text-xs transition-colors"
        >
          IG {sns.instagram.handle}
        </a>
      </div>
      <div className="text-xs text-white/25">© 2026 フォーミュラ研究所（Fラボ）</div>
    </footer>
  );
}
