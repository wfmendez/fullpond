import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { createClientAction, deleteClientAction } from "@/lib/actions/client";

export const metadata = { title: "Clients — Admin FullPond" };

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition focus:border-fp-dark focus:ring-2 focus:ring-fp-dark/10";

export default async function ClientsPage() {
  await requireAdmin();
  const clients = await db.client.findMany({
    include: { _count: { select: { vacancies: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark">
        ← Overview
      </Link>
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Clients</h1>
      <p className="mt-1 text-stone-500">
        The companies FullPond recruits talent for — linked to vacancies and the <strong>Client interview</strong> stage.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[320px_1fr]">
        {/* Add client */}
        <form action={createClientAction} className="h-fit rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="font-display text-lg text-ink-900">Add a client</h2>
          <div className="mt-3 space-y-3">
            <input name="name" required placeholder="Company name *" className={inputCls} />
            <input name="industry" placeholder="Industry" className={inputCls} />
            <input name="contactName" placeholder="Contact name" className={inputCls} />
            <input name="contactEmail" type="email" placeholder="Contact email" className={inputCls} />
            <textarea name="notes" rows={2} placeholder="Notes" className={inputCls} />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90"
            >
              Add client
            </button>
          </div>
        </form>

        {/* List */}
        {clients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-stone-500">
            No clients yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {clients.map((c) => (
              <li
                key={c.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-ink-900">{c.name}</h3>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {c.industry || "—"} · {c._count.vacancies} vacancies
                  </p>
                  {(c.contactName || c.contactEmail) && (
                    <p className="mt-1 text-sm text-stone-600">
                      {c.contactName}
                      {c.contactEmail ? ` · ${c.contactEmail}` : ""}
                    </p>
                  )}
                  {c.notes && <p className="mt-1 text-xs text-stone-400">{c.notes}</p>}
                </div>
                <form action={deleteClientAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
