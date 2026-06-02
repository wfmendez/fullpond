import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/dal";
import { ApplyForm, type FormQuestion } from "./ApplyForm";

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await requireUser();

  const vacancy = await db.vacancy.findUnique({
    where: { slug },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!vacancy || vacancy.status !== "OPEN") notFound();

  const existing = await db.application.findUnique({
    where: { vacancyId_userId: { vacancyId: vacancy.id, userId: user.id } },
  });
  if (existing) redirect("/dashboard");

  const questions: FormQuestion[] = vacancy.questions.map((q) => ({
    id: q.id,
    section: q.section,
    label: q.label,
    type: q.type,
    required: q.required,
    options: Array.isArray(q.options) ? (q.options as string[]) : null,
    mapsTo: q.mapsTo,
  }));

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-fp-violet">Application</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight text-ink-900">{vacancy.title}</h1>
        <p className="mt-2 text-sm text-stone-500">
          Complete the form — it takes 5–7 minutes. Your answers go straight to the FullPond team.
        </p>
      </header>

      <ApplyForm
        vacancyId={vacancy.id}
        questions={questions}
        prefill={{ name: user.name, country: user.country }}
      />
    </div>
  );
}
