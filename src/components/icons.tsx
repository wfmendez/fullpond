import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── Brand mark: a droplet hitting a pond (ripples) ─────────────── */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M16 3c3.2 4 5.4 7 5.4 9.8A5.4 5.4 0 0 1 16 18.2a5.4 5.4 0 0 1-5.4-5.4C10.6 10 12.8 7 16 3Z"
        fill="currentColor"
      />
      <path
        d="M4 22.5c2.4 1.6 4.4 1.6 6 0s3.6-1.6 6 0 4.4 1.6 6 0"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        d="M5.5 27c2.1 1.4 3.9 1.4 5.3 0s3.2-1.4 5.3 0 3.9 1.4 5.3 0"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.4}
      />
    </svg>
  );
}

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export const IconX = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h3l1.5 5L7 10.5a13 13 0 0 0 6.5 6.5L15 14l5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

/* ── Talent category icons ──────────────────────────────────────── */
export const IconOffice = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.5a3 3 0 0 1 0 5.6M17 20a5.5 5.5 0 0 0-3-4.9" />
  </svg>
);

export const IconCreative = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.7V16h5.2v-.4c0-.7.3-1.3.9-1.7A6 6 0 0 0 12 3Z" />
  </svg>
);

export const IconMarketing = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V7L6 11H4a1 1 0 0 0-1 0Z" />
    <path d="M10 7l8-4v18l-8-4" />
    <path d="M19 9a3 3 0 0 1 0 6" />
  </svg>
);

export const IconProfessional = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M7 21h10" />
    <path d="M5 7h14M8 7 5 13a3 3 0 0 0 6 0L8 7ZM16 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
  </svg>
);

export const IconEngineering = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 7l-2 10" />
  </svg>
);

export const IconSales = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 17l5-5 3 3 7-7" />
    <path d="M16 8h5v5" />
  </svg>
);

/* ── Applicant benefit icons ────────────────────────────────────── */
export const IconHolidays = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="3.2" />
    <path d="M12 2v1.5M12 14.5V16M5 9H3.5M20.5 9H19M6.7 3.7l1 1M16.3 3.7l-1 1M4 21c2-2 4-3 8-3s6 1 8 3" />
  </svg>
);

export const IconPto = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 16l8-2 4-9c.6-1.3 2-1.6 2.8-.8.8.8.5 2.2-.8 2.8l-9 4-2 8-1.5-4.5L2 16Z" />
  </svg>
);

export const IconPerformance = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 21h8M12 17v4" />
    <path d="M5 4h14v5a7 7 0 0 1-14 0V4Z" />
    <path d="M5 6H3v1a3 3 0 0 0 2 2.8M19 6h2v1a3 3 0 0 1-2 2.8" />
  </svg>
);
