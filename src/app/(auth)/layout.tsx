import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: "#64bcff" }}
    >
      {/* Subtle concentric ripple motif */}
      <div
        aria-hidden
        className="ripple-rings pointer-events-none absolute inset-0 text-fp-dark/10"
        style={{ ["--ring-gap" as string]: "64px" }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Wordmark */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center font-display text-3xl font-semibold tracking-tight text-fp-dark transition-opacity hover:opacity-80"
        >
          FullPond
        </Link>

        {children}
      </div>
    </main>
  );
}
