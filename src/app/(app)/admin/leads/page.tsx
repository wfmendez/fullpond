import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { updateHireLeadStatusAction, deleteHireLeadAction } from "@/lib/actions/hire";

export const metadata = { title: "Hire leads — Admin FullPond" };

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-brand-100 text-brand-800 ring-brand-300/40",
  CONTACTED: "bg-aqua-300/20 text-brand-800 ring-aqua-400/30",
  WON: "bg-emerald-100 text-emerald-700 ring-emerald-300/50",
  LOST: "bg-stone-100 text-stone-600 ring-stone-200",
};

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await db.hireLead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Hire requests</h1>
      <p className="mt-1 text-stone-500">Companies that asked to hire talent through the site.</p>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-stone-500">
          No hire requests yet. They&apos;ll appear here when a company submits the “Hire talent” form.
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg text-ink-900">{lead.company}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.NEW}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-stone-600">
                    {lead.name} ·{" "}
                    <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                      {lead.email}
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    {lead.roleNeeded ? `Role: ${lead.roleNeeded}` : "Role: —"}
                    {lead.teamSize ? ` · ${lead.teamSize} hire(s)` : ""}
                  </p>
                  {lead.message && (
                    <p className="mt-2 rounded-lg bg-paper/70 p-3 text-sm text-stone-600">{lead.message}</p>
                  )}
                  <p className="mt-2 text-xs text-stone-400">
                    {lead.createdAt.toLocaleString("en-US")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <form action={updateHireLeadStatusAction} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-xs text-ink-900"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="WON">Won</option>
                      <option value="LOST">Lost</option>
                    </select>
                    <button
                      type="submit"
                      className="rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700"
                    >
                      Save
                    </button>
                  </form>
                  <form action={deleteHireLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
