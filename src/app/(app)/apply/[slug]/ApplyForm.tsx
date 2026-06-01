"use client";

import { useActionState } from "react";
import { applyAction, type ApplyState } from "@/lib/actions/application";

export type FormQuestion = {
  id: string;
  section: string | null;
  label: string;
  type: string;
  required: boolean;
  options: string[] | null;
  mapsTo: string | null;
};

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20";

function Field({
  q,
  prefill,
  error,
}: {
  q: FormQuestion;
  prefill: { name: string; country: string | null };
  error?: string;
}) {
  const name = `q_${q.id}`;
  const defaultValue =
    q.mapsTo === "fullName" ? prefill.name : q.mapsTo === "country" ? prefill.country ?? "" : undefined;

  let control: React.ReactNode;
  if (q.type === "TEXTAREA") {
    control = (
      <textarea name={name} required={q.required} defaultValue={defaultValue} rows={4} className={inputCls} />
    );
  } else if (q.type === "SELECT") {
    control = (
      <select name={name} required={q.required} defaultValue="" className={inputCls}>
        <option value="" disabled>
          Select…
        </option>
        {(q.options ?? []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  } else if (q.type === "RADIO") {
    control = (
      <div className="space-y-2">
        {(q.options ?? []).map((o) => (
          <label key={o} className="flex items-center gap-2.5 text-sm text-stone-700">
            <input type="radio" name={name} value={o} required={q.required} className="accent-brand-500" />
            {o}
          </label>
        ))}
      </div>
    );
  } else {
    const htmlType =
      q.type === "EMAIL" ? "email" : q.type === "NUMBER" ? "number" : q.type === "URL" ? "url" : q.type === "PHONE" ? "tel" : "text";
    control = (
      <input type={htmlType} name={name} required={q.required} defaultValue={defaultValue} className={inputCls} />
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-900">
        {q.label}
        {q.required && <span className="ml-0.5 text-brand-600">*</span>}
      </label>
      {control}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function ApplyForm({
  vacancyId,
  questions,
  prefill,
}: {
  vacancyId: string;
  questions: FormQuestion[];
  prefill: { name: string; country: string | null };
}) {
  const boundAction = applyAction.bind(null, vacancyId);
  const [state, formAction, pending] = useActionState<ApplyState | undefined, FormData>(
    boundAction,
    undefined,
  );

  // Group questions by section, preserving order.
  const sections: { name: string; items: FormQuestion[] }[] = [];
  for (const q of questions) {
    const sec = q.section || "Questions";
    let bucket = sections.find((s) => s.name === sec);
    if (!bucket) {
      bucket = { name: sec, items: [] };
      sections.push(bucket);
    }
    bucket.items.push(q);
  }

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {sections.map((section) => (
        <fieldset key={section.name} className="rounded-2xl border border-stone-200 bg-white p-6">
          <legend className="px-2 font-display text-lg text-ink-900">{section.name}</legend>
          <div className="mt-2 space-y-5">
            {section.items.map((q) => (
              <Field key={q.id} q={q} prefill={prefill} error={state?.fieldErrors?.[q.id]} />
            ))}
          </div>
        </fieldset>
      ))}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 ring-1 ring-inset ring-white/20 transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
