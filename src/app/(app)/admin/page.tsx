import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { STAGE_LABELS, ALL_STAGES, STAGE_STYLES } from "@/lib/stages";

export const metadata = { title: "Overview — FullPond" };

export default async function AdminHomePage() {
  await requireAdmin();

  const [totalVacancies, openVacancies, totalApplications, byStage, clients] = await Promise.all([
    db.vacancy.count(),
    db.vacancy.count({ where: { status: "OPEN" } }),
    db.application.count(),
    db.application.groupBy({ by: ["stage"], _count: true }),
    db.client.count(),
  ]);

  const stageCount = (s: string) => byStage.find((b) => b.stage === s)?._count ?? 0;

  const stats = [
    { label: "Vacancies", value: totalVacancies, sub: `${openVacancies} open` },
    { label: "Applications", value: totalApplications, sub: "total" },
    { label: "Clients", value: clients, sub: "companies" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Recruitment overview</h1>
      <p className="mt-1 text-stone-500">FullPond activity at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">{s.label}</p>
            <p className="mt-1 font-display text-4xl text-ink-900">{s.value}</p>
            <p className="mt-1 text-xs text-stone-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-ink-900">Pipeline</h2>
          <Link href="/admin/pipeline" className="text-sm font-medium text-fp-dark/70 hover:text-fp-dark">
            View board →
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_STAGES.map((s) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${STAGE_STYLES[s]}`}
            >
              {STAGE_LABELS[s]}: {stageCount(s)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/admin/vacancies/new"
          className="inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90"
        >
          + New vacancy
        </Link>
        <Link
          href="/admin/vacancies"
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Manage vacancies
        </Link>
      </div>
    </div>
  );
}
