import { HireForm } from "./HireForm";
import { site } from "@/lib/site";

export const metadata = { title: "Hire talent — FullPond" };

export default function HirePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">For companies</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight text-ink-900">Hire top remote talent</h1>
        <p className="mt-3 text-stone-600">
          Tell us what you need and we&apos;ll match you with English-fluent, pre-screened professionals
          from Latin America &amp; the Philippines — at a fraction of local cost. No upfront fees.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
          <li>✓ Screened from 50–100 applicants</li>
          <li>✓ 3-step interview</li>
          <li>✓ ~25% of local cost</li>
        </ul>
      </header>

      <HireForm />

      <p className="mt-4 text-center text-xs text-stone-400">
        Prefer email? Write to{" "}
        <a href={`mailto:${site.email}`} className="text-brand-600 hover:underline">
          {site.email}
        </a>
        .
      </p>
    </div>
  );
}
