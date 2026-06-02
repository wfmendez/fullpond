import Link from "next/link";
import { db } from "@/lib/db";
import { IconArrowRight } from "@/components/icons";

export const metadata = { title: "Open roles — FullPond" };

export default async function VacanciesPage() {
  const vacancies = await db.vacancy.findMany({
    where: { status: "OPEN" },
    include: { client: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-fp-violet">Find a Job</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight text-ink-900">Open roles</h1>
        <p className="mt-2 text-stone-500">
          Apply to remote roles with U.S. brands. Your profile travels with every application.
        </p>
      </header>

      {vacancies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-stone-500">
          No open roles right now. Check back soon.
        </div>
      ) : (
        <ul className="space-y-4">
          {vacancies.map((v) => (
            <li key={v.id}>
              <Link
                href={`/vacancies/${v.slug}`}
                className="group block rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl text-ink-900">{v.title}</h2>
                    <p className="mt-1 text-sm text-stone-500">
                      {v.location}
                      {v.employmentType ? ` · ${v.employmentType}` : ""}
                      {v.client ? ` · ${v.client.name}` : ""}
                    </p>
                  </div>
                  <IconArrowRight className="h-5 w-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-fp-violet" />
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">{v.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
