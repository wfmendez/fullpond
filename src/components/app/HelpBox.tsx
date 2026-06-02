"use client";

import { useState } from "react";

type Step = { icon: string; text: string };

interface HelpBoxProps {
  title: string;
  steps: Step[];
  defaultOpen?: boolean;
}

/**
 * Collapsible help box for admin pages.
 * Shows a ℹ️ pill that expands to show a numbered how-to list.
 */
export function HelpBox({ title, steps, defaultOpen = false }: HelpBoxProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-6 rounded-2xl border-2 border-fp-blue/50 bg-fp-blue/10 p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fp-dark text-xs font-bold text-fp-blue">
            ?
          </span>
          <span className="text-sm font-semibold text-fp-dark">{title}</span>
        </div>
        <span className="text-xs text-fp-dark/50">{open ? "Hide" : "Show how"}</span>
      </button>

      {open && (
        <ol className="mt-4 space-y-2 border-t border-fp-dark/10 pt-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-fp-dark/75">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fp-dark/10 text-xs font-bold text-fp-dark">
                {i + 1}
              </span>
              <span>
                <span className="mr-1">{step.icon}</span>
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Inline tip — single line of contextual help below a field or section. */
export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs text-fp-dark/50">
      <span>💡</span>
      <span>{children}</span>
    </p>
  );
}
