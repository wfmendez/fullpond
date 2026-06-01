type RipplesProps = {
  className?: string;
  /** Number of concentric rings. */
  count?: number;
  /** "still" = fixed concentric rings; "emanate" = rings expand outward like a droplet. */
  variant?: "still" | "emanate";
};

/**
 * FullPond's signature motif: concentric ripples on still water.
 * Strokes use currentColor + non-scaling-stroke, so set tone/alpha with a
 * text-color utility (e.g. `text-brand-400/30`) and size it with w-* + aspect-square.
 */
export function Ripples({
  className,
  count = 6,
  variant = "still",
}: RipplesProps) {
  const rings = Array.from({ length: count });

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
      className={className}
    >
      {rings.map((_, i) => {
        if (variant === "emanate") {
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r="74"
              stroke="currentColor"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="animate-ripple"
              style={{ animationDelay: `${(-i * 7) / count}s` }}
            />
          );
        }
        const r = 14 + i * (86 / count);
        return (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={Math.max(0.06, 0.62 - i * (0.55 / count))}
          />
        );
      })}
    </svg>
  );
}
