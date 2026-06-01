import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4 py-12 text-white">
      {/* Brand ambience */}
      <div aria-hidden className="bg-spotlight absolute inset-x-0 top-0 h-[55vh]" />
      <div
        aria-hidden
        className="ripple-rings pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-brand-500/10"
        style={{ ["--ring-gap" as string]: "44px" }}
      />
      <div
        aria-hidden
        className="ripple-rings pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] text-aqua-400/10"
        style={{ ["--ring-gap" as string]: "44px" }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center text-white transition-opacity hover:opacity-90"
        >
          <span className="font-display text-2xl font-semibold tracking-tight">FullPond</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
