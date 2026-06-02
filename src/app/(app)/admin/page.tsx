import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { STAGE_LABELS, ALL_STAGES, STAGE_STYLES, PIPELINE_STAGES } from "@/lib/stages";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Overview — FullPond" };

const HELP_STEPS = [
  { icon: "📋", text: "Create a vacancy in Vacancies — it appears on the public site so candidates can apply." },
  { icon: "👤", text: "When someone applies, their card appears in the Pipeline under Applied." },
  { icon: "↔️", text: "Drag their card across stages: Screening → Interview → Client interview → Offer → Hired." },
  { icon: "🏢", text: "Add the hiring company in Clients and link it to the vacancy." },
  { icon: "📧", text: "Use Emails to notify your talent pool when a new role opens." },
  { icon: "🎯", text: "Companies that fill the Hire talent form on the site appear as Leads." },
];

// ── Funnel bar chart (horizontal) ────────────────────────────────
function FunnelChart({ data }: { data: { label: string; count: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="space-y-3">
      {data.map((d) => {
        const pct = Math.max((d.count / max) * 100, d.count > 0 ? 5 : 1);
        return (
          <div key={d.label} className="flex items-center gap-3">
            <div className="w-32 shrink-0 text-right text-xs font-semibold text-fp-dark/60">{d.label}</div>
            <div className="flex-1 rounded-full bg-stone-100 h-5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                style={{ width: `${pct}%`, background: d.color }}
              >
                {d.count > 0 && <span className="text-[10px] font-bold text-white">{d.count}</span>}
              </div>
            </div>
            {d.count === 0 && <span className="text-xs text-fp-dark/30">0</span>}
          </div>
        );
      })}
    </div>
  );
}

// ── 7-day bar chart ────────────────────────────────────────────
function BarChart({ days }: { days: { label: string; count: number }[] }) {
  const max = Math.max(...days.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-28">
      {days.map((d) => {
        const h = Math.max((d.count / max) * 100, d.count > 0 ? 8 : 2);
        return (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            {d.count > 0 && <span className="text-xs font-bold text-fp-dark/70">{d.count}</span>}
            <div
              className="w-full rounded-t-lg transition-all duration-700"
              style={{ height: `${h}%`, background: d.count > 0 ? "#64bcff" : "#e7e5e4", minHeight: "4px" }}
            />
            <span className="text-[10px] text-fp-dark/40">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────
function StatCard({
  label, value, sub, href, accent, icon,
}: {
  label: string; value: number | string; sub: string; href: string; accent: string; icon: string;
}) {
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-fp-blue hover:shadow-md">
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: accent }} />
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-fp-dark/40">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="mt-3 font-display text-5xl font-semibold text-fp-dark">{value}</p>
      <p className="mt-1 text-sm text-fp-dark/50">{sub}</p>
      <p className="mt-4 text-xs font-semibold text-fp-dark/25 transition group-hover:text-fp-dark">View →</p>
    </Link>
  );
}

export default async function AdminHomePage() {
  await requireAdmin();

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalVacancies, openVacancies, totalApplications,
    byStage, clients, newLeads, recentApps, appsByDay,
  ] = await Promise.all([
    db.vacancy.count(),
    db.vacancy.count({ where: { status: "OPEN" } }),
    db.application.count(),
    db.application.groupBy({ by: ["stage"], _count: true }),
    db.client.count(),
    db.hireLead.count({ where: { status: "NEW" } }),
    db.application.findMany({
      take: 5, orderBy: { createdAt: "desc" },
      include: { vacancy: { select: { title: true } }, user: { select: { name: true } } },
    }),
    db.application.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  const stageCount = (s: string) => byStage.find((b) => b.stage === s)?._count ?? 0;

  // 7-day chart
  const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const count = appsByDay.filter((a) => a.createdAt.toDateString() === d.toDateString()).length;
    return { label: DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1], count };
  });

  // Funnel
  const FUNNEL_COLORS: Record<string, string> = {
    APPLIED: "#94a3b8", SCREENING: "#64bcff", INTERVIEW: "#5157a4",
    CLIENT_INTERVIEW: "#5231ff", OFFER: "#34d399", HIRED: "#059669",
  };
  const funnelData = PIPELINE_STAGES.map((s) => ({
    label: STAGE_LABELS[s], count: stageCount(s), color: FUNNEL_COLORS[s] ?? "#64bcff",
  }));

  const conversionRate = totalApplications > 0
    ? Math.round((stageCount("HIRED") / totalApplications) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-fp-dark/40">
            {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-fp-dark">
            Recruitment overview
          </h1>
          <p className="mt-1 text-fp-dark/50">Your hiring activity at a glance.</p>
        </div>
        <Link href="/admin/vacancies/new"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">
          + New vacancy
        </Link>
      </div>

      {/* Help */}
      <HelpBox title="New here? Here's how the dashboard works" steps={HELP_STEPS} defaultOpen={totalApplications === 0} />

      {/* ── KPI cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open roles"    value={openVacancies}       sub={`${totalVacancies} total`}         href="/admin/vacancies" accent="#64bcff" icon="📋" />
        <StatCard label="Applications"  value={totalApplications}   sub="all time"                          href="/admin/pipeline"  accent="#5157a4" icon="👥" />
        <StatCard label="Hired"         value={stageCount("HIRED")} sub={`${conversionRate}% conversion`}  href="/admin/pipeline"  accent="#059669" icon="✅" />
        <StatCard label="New leads"     value={newLeads}            sub="companies waiting"                 href="/admin/leads"     accent="#5231ff" icon="🎯" />
      </div>

      {/* ── Analytics charts ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl text-fp-dark">Applications — last 7 days</h2>
              <p className="text-xs text-fp-dark/40">{appsByDay.length} application{appsByDay.length !== 1 ? "s" : ""} this week</p>
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "#64bcff", color: "#392a0c" }}>
              {appsByDay.length}
            </span>
          </div>
          <BarChart days={chartDays} />
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl text-fp-dark">Pipeline funnel</h2>
              <p className="text-xs text-fp-dark/40">Candidates per stage</p>
            </div>
            <Link href="/admin/pipeline" className="text-xs font-semibold text-fp-dark/40 hover:text-fp-dark">
              Open board →
            </Link>
          </div>
          <FunnelChart data={funnelData} />
        </div>
      </div>

      {/* ── Stage summary + Recent activity ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl text-fp-dark mb-4">Stage breakdown</h2>
          <div className="flex flex-wrap gap-2">
            {ALL_STAGES.map((s) => (
              <span key={s} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${STAGE_STYLES[s]}`}>
                {STAGE_LABELS[s]}: <strong>{stageCount(s)}</strong>
              </span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-stone-100 pt-5 text-center">
            <div>
              <p className="font-display text-3xl font-semibold text-fp-dark">{conversionRate}%</p>
              <p className="text-[11px] text-fp-dark/40">Hire rate</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-fp-dark">{stageCount("REJECTED")}</p>
              <p className="text-[11px] text-fp-dark/40">Rejected</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-fp-dark">{clients}</p>
              <p className="text-[11px] text-fp-dark/40">Clients</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-fp-dark">Recent applicants</h2>
            <Link href="/admin/pipeline" className="text-xs font-semibold text-fp-dark/40 hover:text-fp-dark">See all →</Link>
          </div>
          {recentApps.length === 0 ? (
            <div className="flex h-36 items-center justify-center text-sm text-fp-dark/30">
              No applications yet — publish a vacancy to get started.
            </div>
          ) : (
            <ul className="space-y-3">
              {recentApps.map((app) => (
                <li key={app.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-fp-dark"
                    style={{ background: "#64bcff" }}>
                    {app.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-fp-dark truncate">{app.user.name}</p>
                    <p className="text-xs text-fp-dark/40 truncate">{app.vacancy.title}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${STAGE_STYLES[app.stage]}`}>
                    {STAGE_LABELS[app.stage]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/vacancies" className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100">Manage vacancies</Link>
        <Link href="/admin/clients"   className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100">Add client</Link>
        <Link href="/admin/emails"    className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100">Send email blast</Link>
      </div>
    </div>
  );
}
