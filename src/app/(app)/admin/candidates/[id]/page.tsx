import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { ALL_STAGES, STAGE_LABELS, STAGE_STYLES } from "@/lib/stages";
import { updateApplicationAction } from "@/lib/actions/application";

export default async function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const app = await db.application.findUnique({
    where: { id },
    include: {
      vacancy: {
        select: {
          title: true,
          location: true,
          client: { select: { name: true } },
          questions: { orderBy: { order: "asc" }, select: { id: true, label: true, section: true } },
        },
      },
      user: { select: { email: true } },
    },
  });
  if (!app) notFound();

  const answers = (app.answers ?? {}) as Record<string, string>;

  // Group questions by section for the answer sheet.
  const sections: { name: string; items: { id: string; label: string }[] }[] = [];
  for (const q of app.vacancy.questions) {
    const sec = q.section || "Questions";
    let bucket = sections.find((s) => s.name === sec);
    if (!bucket) {
      bucket = { name: sec, items: [] };
      sections.push(bucket);
    }
    bucket.items.push({ id: q.id, label: q.label });
  }

  const contact: [string, string | null][] = [
    ["Email", app.email],
    ["Country", app.country],
    ["Preferred contact", app.contactMethod],
    ["WhatsApp", app.whatsapp],
    ["LinkedIn", app.linkedin],
    ["Salary expectation", app.salaryExpectation],
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/pipeline" className="text-sm text-stone-500 hover:text-ink-900">
        ← Pipeline
      </Link>

      <header className="mt-3 flex items-start justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink-900">{app.fullName}</h1>
          <p className="mt-1 text-sm text-stone-500">
            {app.vacancy.title}
            {app.vacancy.client ? ` · ${app.vacancy.client.name}` : ""} · {app.vacancy.location}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${STAGE_STYLES[app.stage]}`}
        >
          {STAGE_LABELS[app.stage]}
        </span>
      </header>

      {/* Contact */}
      <section className="mt-6 grid gap-3 rounded-2xl border border-stone-200 bg-white p-5 sm:grid-cols-2">
        {contact.map(([label, value]) => (
          <div key={label}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">{label}</p>
            <p className="text-sm text-ink-900">{value || "—"}</p>
          </div>
        ))}
      </section>

      {/* Recruiter controls */}
      <form
        action={updateApplicationAction}
        className="mt-6 rounded-2xl border border-stone-200 bg-white p-5"
      >
        <input type="hidden" name="id" value={app.id} />
        <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Stage</label>
            <select
              name="stage"
              defaultValue={app.stage}
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink-900"
            >
              {ALL_STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Recruiter notes</label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={app.notes ?? ""}
              placeholder="Internal notes about this candidate…"
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink-900"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90"
        >
          Save
        </button>
      </form>

      {/* Answers */}
      <section className="mt-6 space-y-5">
        {sections.map((section) => (
          <div key={section.name} className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="font-display text-lg text-ink-900">{section.name}</h2>
            <dl className="mt-3 space-y-3">
              {section.items.map((q) => (
                <div key={q.id}>
                  <dt className="text-sm font-medium text-stone-600">{q.label}</dt>
                  <dd className="text-sm text-ink-900">{answers[q.id] || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>
    </div>
  );
}
