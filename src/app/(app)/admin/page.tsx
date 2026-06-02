import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { STAGE_LABELS, ALL_STAGES, STAGE_STYLES } from "@/lib/stages";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Overview — FullPond" };

const HELP_STEPS = [
  { icon: "📋", text: "Create a vacancy in Vacancies → it appears on the public site so candidates can apply." },
  { icon: "👤", text: "When someone applies, their card appears in the Pipeline under "Applied"." },
  { icon: "↔️", text: "Drag their card across stages: Screening → Interview → Client interview → Offer → Hired." },
  { icon: "🏢", text: "Add the hiring company in Clients and link it to the vacancy." },
  { icon: "📧", text: "Use Emails to notify your talent pool when a new role opens." },
  { icon: "🎯", text: "Companies that fill the "Hire talent" form on the site appear as Leads." },
];

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
    { label: "Vacancies", value: totalVacancies, sub: `${openVacancies} open`, href: "/admin/vacancies" },
    { label: "Applications", value: totalApplications, sub: "total", href: "/admin/pipeline" },
    { label: "Clients", value: clients, sub: "companies", href: "/admin/clients" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Recruitment overview</h1>
      <p className="mt-1 text-stone-500">FullPond activity at a glance.</p>

      <div className="mt-5">
        <HelpBox title="New here? Here's how the recruiter dashboard works" steps={HELP_STEPS} defaultOpen={totalApplications === 0} />
      </div>

      {/* Stats */}
      <div className="mt-2 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-fp-blue hover:shadow-md">
            <p className="text-sm text-stone-500">{s.label}</p>
            <p className="mt-1 font-display text-4xl text-ink-900">{s.value}</p>
            <p className="mt-1 text-xs text-stone-400">{s.sub}</p>
            <p className="mt-3 text-xs font-medium text-fp-dark/40 transition group-hover:text-fp-dark">View →</p>
          </Link>
        ))}
      </div>

      {/* Pipeline snapshot */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg text-ink-900">Pipeline</h2>
            <p className="text-xs text-stone-400">Candidates grouped by stage. Drag cards to advance them.</p>
          </div>
          <Link href="/admin/pipeline" className="text-sm font-medium text-fp-dark/60 hover:text-fp-dark">
            Open board →
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_STAGES.map((s) => (
            <span key={s} className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${STAGE_STYLES[s]}`}>
              {STAGE_LABELS[s]}: {stageCount(s)}
            </span>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/vacancies/new" className="inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">
          + New vacancy
        </Link>
        <Link href="/admin/vacancies" className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100">
          Manage vacancies
        </Link>
      </div>
    </div>
  );
}
