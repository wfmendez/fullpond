import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/dal";
import { Markdown } from "@/components/Markdown";
import { IconArrowRight } from "@/components/icons";

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vacancy = await db.vacancy.findUnique({
    where: { slug },
    include: { client: { select: { name: true } } },
  });
  if (!vacancy || vacancy.status !== "OPEN") notFound();

  const user = await getCurrentUser();
  const alreadyApplied = user
    ? !!(await db.application.findUnique({
        where: { vacancyId_userId: { vacancyId: vacancy.id, userId: user.id } },
      }))
    : false;

  const applyHref = user ? `/apply/${vacancy.slug}` : `/login?from=/apply/${vacancy.slug}`;

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/vacancies" className="text-sm text-stone-500 hover:text-ink-900">
        ← All roles
      </Link>

      <header className="mt-4 border-b border-stone-200 pb-6">
        <h1 className="font-display text-4xl tracking-tight text-ink-900">{vacancy.title}</h1>
        <p className="mt-2 text-sm text-stone-500">
          {vacancy.location}
          {vacancy.employmentType ? ` · ${vacancy.employmentType}` : ""}
          {vacancy.salaryRange ? ` · ${vacancy.salaryRange}` : ""}
          {vacancy.client ? ` · ${vacancy.client.name}` : ""}
        </p>

        <div className="mt-5">
          {alreadyApplied ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-300/50">
              You&apos;ve already applied to this role
            </span>
          ) : (
            <Link
              href={applyHref}
              className="inline-flex items-center gap-2 rounded-full bg-fp-dark px-6 py-3 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90"
            >
              Apply to this role
              <IconArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </header>

      <div className="mt-6">
        <p className="text-base leading-relaxed text-stone-700">{vacancy.summary}</p>
        <Markdown content={vacancy.descriptionMd} />
      </div>

      {!alreadyApplied && (
        <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 text-center">
          <p className="text-stone-600">Interested in this role?</p>
          <Link
            href={applyHref}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-fp-dark px-6 py-3 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90"
          >
            Apply now
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </article>
  );
}
