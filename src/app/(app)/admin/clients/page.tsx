import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { createClientAction, deleteClientAction } from "@/lib/actions/client";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Clients — Admin FullPond" };

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition focus:border-fp-dark focus:ring-2 focus:ring-fp-dark/10";

const HELP_STEPS = [
  { icon: "🏢", text: "Clients are the U.S. companies that hire through FullPond. Add them here first." },
  { icon: "🔗", text: "When creating a vacancy, pick a client to link it. The client name shows on each candidate card." },
  { icon: "🤝", text: "During Client interview, the candidate meets this company — having their contact info here is handy for your team." },
];

export default async function AdminClientsPage() {
  await requireAdmin();
  const clients = await db.client.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark">← Overview</Link>
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Clients</h1>
      <p className="mt-1 text-stone-500">Companies that hire talent through FullPond.</p>

      <div className="mt-5">
        <HelpBox title="How clients work" steps={HELP_STEPS} />
      </div>

      <form action={createClientAction} className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg text-ink-900">Add a client</h2>
        <p className="mb-4 text-sm text-stone-400">Only Company name is required.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Company name *</label>
            <input name="name" required placeholder="e.g. Peak Labs Supplements" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Contact name</label>
            <input name="contactName" placeholder="e.g. Sarah Whitfield" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Contact email</label>
            <input name="contactEmail" type="email" placeholder="sarah@company.com" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Industry</label>
            <input name="industry" placeholder="e.g. Health & Supplements" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Notes</label>
            <textarea name="notes" rows={2} placeholder="Context useful for your team during hiring..." className={inputCls} />
          </div>
        </div>
        <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">+ Add client</button>
      </form>

      {clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-stone-500">No clients yet. Add the first company above.</div>
      ) : (
        <ul className="space-y-4">
          {clients.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div>
                <h2 className="font-display text-lg text-ink-900">{c.name}</h2>
                {c.industry && <p className="text-sm text-stone-500">{c.industry}</p>}
                {c.contactName && (
                  <p className="mt-1 text-sm text-stone-400">
                    {c.contactName}
                    {c.contactEmail && (<> · <a href={`mailto:${c.contactEmail}`} className="text-fp-dark/70 hover:underline">{c.contactEmail}</a></>)}
                  </p>
                )}
                {c.notes && <p className="mt-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-500">{c.notes}</p>}
              </div>
              <form action={deleteClientAction} className="shrink-0">
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">Remove</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
