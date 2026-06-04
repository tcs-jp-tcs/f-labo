export function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.998 21.75H1.687l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"
      />
    </svg>
  );
}

/**
 * Instagram glyph — single-color outline only (Meta Brand Resources style).
 * Stroked rounded-square camera body + circle lens + corner dot. Use with currentColor.
 */
export function InstagramLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * YouTube glyph — single-color rounded play button (official logo shape).
 * Rounded-rectangle body + centered play triangle. Use with currentColor.
 */
export function YouTubeLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        fill="currentColor"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"
      />
    </svg>
  );
}
