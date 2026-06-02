"use client";

import { useActionState, useState } from "react";
import { createVacancyAction, type VacancyFormState } from "@/lib/actions/vacancy";

type ClientOption = { id: string; name: string };
type QRow = {
  label: string;
  section: string;
  type: string;
  required: boolean;
  options: string;
  mapsTo: string;
};

const TYPES = ["TEXT", "TEXTAREA", "SELECT", "RADIO", "NUMBER", "EMAIL", "PHONE", "URL"];
const MAPS = ["", "fullName", "country", "contactMethod", "whatsapp", "linkedin", "salaryExpectation"];

const newRow = (): QRow => ({
  label: "",
  section: "General Questions",
  type: "TEXT",
  required: true,
  options: "",
  mapsTo: "",
});

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition focus:border-fp-dark focus:ring-2 focus:ring-fp-dark/10";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-900";

export function VacancyForm({ clients }: { clients: ClientOption[] }) {
  const [state, action, pending] = useActionState<VacancyFormState | undefined, FormData>(
    createVacancyAction,
    undefined,
  );
  const [rows, setRows] = useState<QRow[]>([newRow()]);

  const questionsJson = JSON.stringify(
    rows
      .filter((r) => r.label.trim())
      .map((r) => ({
        label: r.label,
        section: r.section,
        type: r.type,
        required: r.required,
        options:
          r.type === "SELECT" || r.type === "RADIO"
            ? r.options
                .split(/\r?\n|,/)
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        mapsTo: r.mapsTo,
      })),
  );

  function update(i: number, patch: Partial<QRow>) {
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input name="title" required className={inputCls} placeholder="Business Development Analyst" />
          </div>
          <div>
            <label className={labelCls}>Short summary *</label>
            <textarea name="summary" required rows={2} className={inputCls} placeholder="One line describing the role." />
          </div>
          <div>
            <label className={labelCls}>Full description * (Markdown: ## headings, **bold**, - bullets)</label>
            <textarea name="descriptionMd" required rows={10} className={inputCls} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Location</label>
              <input name="location" defaultValue="Remote" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <input name="employmentType" placeholder="Full-time" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Salary range</label>
              <input name="salaryRange" placeholder="Based on experience" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select name="status" defaultValue="OPEN" className={inputCls}>
                <option value="DRAFT">Draft</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Client (company)</label>
              <select name="clientId" defaultValue="" className={inputCls}>
                <option value="">— No client —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic question editor */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-ink-900">Form questions</h3>
          <button
            type="button"
            onClick={() => setRows((rs) => [...rs, newRow()])}
            className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100"
          >
            + Add question
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {rows.map((r, i) => (
            <div key={i} className="rounded-xl border border-stone-200 bg-paper/60 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-stone-500">Label</label>
                  <input
                    value={r.label}
                    onChange={(e) => update(i, { label: e.target.value })}
                    className={inputCls}
                    placeholder="How many years of experience do you have?"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Section</label>
                  <input value={r.section} onChange={(e) => update(i, { section: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Type</label>
                  <select value={r.type} onChange={(e) => update(i, { type: e.target.value })} className={inputCls}>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                {(r.type === "SELECT" || r.type === "RADIO") && (
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-stone-500">
                      Options (comma or newline separated)
                    </label>
                    <textarea
                      value={r.options}
                      onChange={(e) => update(i, { options: e.target.value })}
                      rows={2}
                      className={inputCls}
                      placeholder="Yes, No"
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Maps to (optional)</label>
                  <select value={r.mapsTo} onChange={(e) => update(i, { mapsTo: e.target.value })} className={inputCls}>
                    {MAPS.map((m) => (
                      <option key={m} value={m}>
                        {m === "" ? "— None —" : m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={r.required}
                      onChange={(e) => update(i, { required: e.target.checked })}
                      className="accent-fp-violet"
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() => setRows((rs) => rs.filter((_, idx) => idx !== i))}
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input type="hidden" name="questionsJson" value={questionsJson} readOnly />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-fp-dark px-7 py-3 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create vacancy"}
      </button>
    </form>
  );
}
