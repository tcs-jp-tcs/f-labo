export default function MainLogo({ width = 240 }: { width?: number }) {
  return (
    <svg viewBox="-20 0 300 125" width={width} aria-label="フォーミュラ研究所">
      <defs>
        <pattern
          id="ck"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-9)"
        >
          <rect width="5" height="5" fill="#E10600" />
          <rect x="5" width="5" height="5" fill="#8B0000" />
          <rect y="5" width="5" height="5" fill="#8B0000" />
          <rect x="5" y="5" width="5" height="5" fill="#E10600" />
        </pattern>
        <pattern id="kh" x="0" y="0" width="12" height="8" patternUnits="userSpaceOnUse">
          <rect width="12" height="4" fill="#E10600" />
          <rect y="4" width="12" height="4" fill="#FFF" />
        </pattern>
        <pattern id="kv" x="0" y="0" width="8" height="12" patternUnits="userSpaceOnUse">
          <rect width="4" height="12" fill="#E10600" />
          <rect x="4" width="4" height="12" fill="#FFF" />
        </pattern>
        <pattern
          id="tr"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="4" height="4" fill="#2a2a2a" />
          <rect width="1.5" height="4" fill="#363636" />
        </pattern>
      </defs>
      <line x1="0" y1="22" x2="35" y2="22" stroke="#E10600" strokeWidth="2.5" opacity="0.5" />
      <line x1="0" y1="35" x2="22" y2="35" stroke="#E10600" strokeWidth="2" opacity="0.3" />
      <line x1="0" y1="46" x2="12" y2="46" stroke="#E10600" strokeWidth="1.5" opacity="0.2" />
      <g transform="skewX(-9)">
        <rect x="35" y="8" width="22" height="80" fill="url(#ck)" />
        <rect x="35" y="8" width="62" height="18" fill="url(#ck)" />
        <rect x="35" y="38" width="48" height="15" fill="url(#ck)" />
      </g>
      <g transform="skewX(-9)">
        <rect x="110" y="8" width="14" height="62" fill="#3a3a3a" />
        <rect x="106" y="8" width="4" height="62" fill="url(#kh)" />
        <rect x="124" y="8" width="4" height="62" fill="url(#kh)" />
      </g>
      <g transform="skewX(-9)">
        <path
          d="M110,66 L110,80 Q110,90 120,90 L124,90 L124,66 Z"
          fill="#3a3a3a"
        />
        <path
          d="M106,66 L106,80 Q106,94 120,94 L120,90 Q110,90 110,80 L110,66 Z"
          fill="url(#kh)"
        />
        <rect x="120" y="90" width="4" height="4" fill="url(#kv)" />
        <rect x="124" y="66" width="4" height="10" fill="url(#kh)" />
      </g>
      <g transform="skewX(-9)">
        <rect x="122" y="78" width="80" height="12" fill="#3a3a3a" />
        <rect x="122" y="74" width="80" height="4" fill="url(#kv)" />
        <rect x="122" y="90" width="80" height="4" fill="url(#kv)" />
      </g>
      <text
        x="134"
        y="76"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="32"
        fontWeight="500"
        fontStyle="italic"
        fill="#CCC"
        transform="skewX(-4)"
      >
        ab
      </text>
      <g transform="translate(182, 62) skewX(-4)">
        <circle cx="0" cy="0" r="13" fill="url(#tr)" stroke="#444" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="#111" stroke="#555" strokeWidth="1" />
        <line x1="0" y1="-4.5" x2="0" y2="-2" stroke="#777" strokeWidth="1" strokeLinecap="round" />
        <line x1="4.3" y1="-1.4" x2="1.9" y2="-0.6" stroke="#777" strokeWidth="1" strokeLinecap="round" />
        <line x1="2.6" y1="3.7" x2="1.2" y2="1.6" stroke="#777" strokeWidth="1" strokeLinecap="round" />
        <line x1="-2.6" y1="3.7" x2="-1.2" y2="1.6" stroke="#777" strokeWidth="1" strokeLinecap="round" />
        <line x1="-4.3" y1="-1.4" x2="-1.9" y2="-0.6" stroke="#777" strokeWidth="1" strokeLinecap="round" />
        <circle cx="0" cy="0" r="1.2" fill="#888" />
      </g>
      <line x1="199" y1="55" x2="225" y2="55" stroke="#E10600" strokeWidth="2" opacity="0.5" />
      <line x1="199" y1="62" x2="215" y2="62" stroke="#E10600" strokeWidth="1.5" opacity="0.3" />
      <line x1="199" y1="69" x2="208" y2="69" stroke="#E10600" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
