import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { updateHireLeadStatusAction, deleteHireLeadAction } from "@/lib/actions/hire";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Hire leads — Admin FullPond" };

const HELP_STEPS = [
  { icon: "🌐", text: "Leads come from the Hire talent form on the public website — companies wanting to hire through FullPond." },
  { icon: "📧", text: "Click the email address to open your mail client and contact them directly." },
  { icon: "🔄", text: "Update the status to track progress: New → Contacted → Won (deal closed) or Lost." },
  { icon: "➡️", text: "Once a lead becomes a client, add them in the Clients section and link them to a vacancy." },
];

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-fp-blue/20 text-fp-dark ring-fp-blue/30",
  CONTACTED: "bg-aqua-300/20 text-fp-dark ring-aqua-400/30",
  WON: "bg-emerald-100 text-emerald-700 ring-emerald-300/50",
  LOST: "bg-stone-100 text-stone-600 ring-stone-200",
};

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await db.hireLead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark">← Overview</Link>
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Hire requests</h1>
      <p className="mt-1 text-stone-500">Companies that submitted the "Hire talent" form on the site.</p>

      <div className="mt-5">
        <HelpBox title="How to handle leads" steps={HELP_STEPS} />
      </div>

      {leads.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center">
          <p className="text-stone-500">No hire requests yet.</p>
          <p className="mt-1 text-sm text-stone-400">They appear here when a company fills the "Hire talent" form on the landing page.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display text-lg text-ink-900">{lead.company}</h2>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.NEW}`}>{lead.status}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-stone-600">
                    {lead.name} · <a href={`mailto:${lead.email}`} className="text-fp-dark/70 hover:underline">{lead.email}</a>
                  </p>
                  {(lead.roleNeeded || lead.teamSize) && (
                    <p className="mt-1 text-sm text-stone-500">
                      {lead.roleNeeded ? `Role: ${lead.roleNeeded}` : ""}{lead.teamSize ? ` · ${lead.teamSize} hire(s)` : ""}
                    </p>
                  )}
                  {lead.message && <p className="mt-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-600 italic">"{lead.message}"</p>}
                  <p className="mt-2 text-xs text-stone-400">Received {lead.createdAt.toLocaleString("en-US")}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <form action={updateHireLeadStatusAction} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={lead.id} />
                    <select name="status" defaultValue={lead.status} className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-xs text-ink-900">
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="WON">Won</option>
                      <option value="LOST">Lost</option>
                    </select>
                    <button type="submit" className="rounded-full bg-fp-dark px-3 py-1.5 text-xs font-semibold text-fp-blue transition hover:opacity-80">Save</button>
                  </form>
                  <form action={deleteHireLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button type="submit" className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">Delete</button>
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
