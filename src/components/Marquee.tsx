import type { CSSProperties } from "react";

const items = [
  "Motivated & Inspired",
  "Fluent English",
  "Highly Skilled",
  "U.S. Time Zones",
  "Bachelor’s & Master’s Level",
];

/** A tiny concentric ripple — the brand motif, used as a separator. */
function RippleDot() {
  return (
    <span aria-hidden className="shrink-0 text-gold-500">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2" fill="currentColor" />
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
    </span>
  );
}

export function Marquee() {
  // duplicated track for a seamless -50% loop
  const track = [...items, ...items];

  return (
    <section className="border-y border-stone-200 bg-paper-deep py-7">
      <div className="mask-fade-x flex overflow-hidden">
        <div
          className="animate-marquee flex shrink-0 items-center gap-8 pr-8"
          style={{ "--marquee-duration": "36s" } as CSSProperties}
        >
          {track.map((item, i) => (
            <div key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-xl font-medium italic tracking-tight text-ink-900 md:text-2xl">
                {item}
              </span>
              <RippleDot />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
