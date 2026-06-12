export default function HeaderLogo({ width = 96 }: { width?: number }) {
  return (
    <svg viewBox="0 0 120 50" width={width} height={width * (50 / 120)} aria-label="Fラボ" className="notranslate">
      <line x1="0" y1="12" x2="14" y2="12" stroke="#E10600" strokeWidth="2" opacity="0.5" />
      <line x1="0" y1="18" x2="9" y2="18" stroke="#E10600" strokeWidth="1.5" opacity="0.3" />
      <line x1="0" y1="24" x2="5" y2="24" stroke="#E10600" strokeWidth="1" opacity="0.2" />
      <g transform="skewX(-9)">
        <rect x="16" y="4" width="9" height="34" fill="#E10600" />
        <rect x="16" y="4" width="26" height="7" fill="#E10600" />
        <rect x="16" y="16" width="20" height="6" fill="#E10600" />
      </g>
      <g transform="skewX(-9)">
        <rect x="48" y="4" width="9" height="34" fill="#FFF" />
        <rect x="48" y="32" width="20" height="5" fill="#FFF" />
      </g>
      <text
        x="62"
        y="31"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="500"
        fontStyle="italic"
        fill="#CCC"
        transform="skewX(-4)"
      >
        abo
      </text>
    </svg>
  );
}
