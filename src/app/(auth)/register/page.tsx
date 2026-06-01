"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction, type AuthState } from "@/lib/auth-actions";

export default function RegisterPage() {
  const [state, action, pending] = useActionState<AuthState | undefined, FormData>(
    registerAction,
    undefined,
  );
  const [show, setShow] = useState(false);

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-400/20";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
      <h1 className="font-display text-3xl tracking-tight">Create your account</h1>
      <p className="mt-1 text-sm text-white/50">Apply to FullPond&apos;s open roles.</p>

      {state?.error && (
        <p className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <form action={action} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className={labelCls}>Full name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="country" className={labelCls}>Country (optional)</label>
          <input id="country" name="country" type="text" autoComplete="country-name" placeholder="e.g. Mexico" className={inputCls} />
        </div>
        <div>
          <label htmlFor="password" className={labelCls}>Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className={inputCls + " pr-11"}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              tabIndex={-1}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/60"
            >
              {show ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 ring-1 ring-inset ring-white/20 transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-300 hover:text-brand-200">
          Sign in
        </Link>
      </p>
    </div>
  );
}
