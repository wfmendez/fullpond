import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { updateVacancyStatusAction, deleteVacancyAction } from "@/lib/actions/vacancy";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Vacancies — Admin FullPond" };

const HELP_STEPS = [
  { icon: "📝", text: "Click + New vacancy to create a role. Write its title, description and build its application form with custom questions." },
  { icon: "🔒", text: "Draft — only visible to admins. Open — live on the site, candidates can apply. Closed — hidden from candidates." },
  { icon: "👥", text: "View candidates opens the pipeline filtered to that specific vacancy." },
  { icon: "🗑️", text: "Deleting a vacancy also deletes all of its applications — be careful!" },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  DRAFT:  { label: "Draft",  color: "bg-stone-100 text-stone-600" },
  OPEN:   { label: "Open",   color: "bg-emerald-100 text-emerald-700" },
  CLOSED: { label: "Closed", color: "bg-red-100 text-red-600" },
};

export default async function AdminVacanciesPage() {
  await requireAdmin();
  const vacancies = await db.vacancy.findMany({
    include: {
      _count: { select: { applications: true } },
      client: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark">
        ← Overview
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink-900">Vacancies</h1>
          <p className="mt-1 text-stone-500">Create, publish and manage your open roles.</p>
        </div>
        <Link href="/admin/vacancies/new" className="inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">
          + New vacancy
        </Link>
      </div>

      <div className="mt-5">
        <HelpBox title="How vacancies work" steps={HELP_STEPS} />
      </div>

      {vacancies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center">
          <p className="text-stone-500">No vacancies yet. Create your first role to get started.</p>
          <Link href="/admin/vacancies/new" className="mt-4 inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue transition hover:opacity-90">
            + New vacancy
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {vacancies.map((v) => (
            <li key={v.id} className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg text-ink-900">{v.title}</h2>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_LABELS[v.status]?.color ?? ""}`}>
                    {STATUS_LABELS[v.status]?.label ?? v.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-stone-500">
                  {v._count.applications} application{v._count.applications !== 1 ? "s" : ""}
                  {v.client ? ` · ${v.client.name}` : ""}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/pipeline?vacancy=${v.id}`} className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100">
                  View candidates
                </Link>
                <form action={updateVacancyStatusAction} className="flex items-center gap-1.5">
                  <input type="hidden" name="id" value={v.id} />
                  <select name="status" defaultValue={v.status} className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-xs text-ink-900" title="Change status">
                    <option value="DRAFT">Draft</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <button type="submit" className="rounded-full bg-fp-dark px-3 py-1.5 text-xs font-semibold text-fp-blue transition hover:opacity-80">
                    Save
                  </button>
                </form>
                <form action={deleteVacancyAction}>
                  <input type="hidden" name="id" value={v.id} />
                  <button type="submit" className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50" title="Delete this vacancy and all its applications">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
