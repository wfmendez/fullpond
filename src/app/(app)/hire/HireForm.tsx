"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createHireLeadAction, type HireState } from "@/lib/actions/hire";
import { IconArrowRight, IconCheck } from "@/components/icons";

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-900";

export function HireForm() {
  const [state, action, pending] = useActionState<HireState | undefined, FormData>(
    createHireLeadAction,
    undefined,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <IconCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-2xl text-ink-900">Thanks — we&apos;re on it!</h2>
        <p className="mt-2 text-stone-600">
          Our team will review your request and reach out within 1 business day with a shortlist of
          matched talent.
        </p>
        <Link
          href="/vacancies"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Browse open roles meanwhile
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      {state?.error && (
        <p className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelCls}>Company *</label>
          <input id="company" name="company" required className={inputCls} placeholder="Acme Inc." />
        </div>
        <div>
          <label htmlFor="name" className={labelCls}>Your name *</label>
          <input id="name" name="name" required className={inputCls} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Work email *</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="teamSize" className={labelCls}>How many hires?</label>
          <select id="teamSize" name="teamSize" defaultValue="" className={inputCls}>
            <option value="">Select…</option>
            <option value="1">Just 1</option>
            <option value="2-5">2–5</option>
            <option value="6-20">6–20</option>
            <option value="20+">20+</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="roleNeeded" className={labelCls}>Role(s) you&apos;re hiring for</label>
          <input id="roleNeeded" name="roleNeeded" className={inputCls} placeholder="e.g. Customer support, Bookkeeper, Developer" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>Anything else? (optional)</label>
          <textarea id="message" name="message" rows={4} className={inputCls} placeholder="Tell us about the role, timeline, or budget." />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 ring-1 ring-inset ring-white/20 transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request talent"}
        {!pending && <IconArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
