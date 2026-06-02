import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { PipelineBoard, type PipelineCard } from "./PipelineBoard";

export const metadata = { title: "Pipeline — Admin FullPond" };

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: Promise<{ vacancy?: string }>;
}) {
  await requireAdmin();
  const { vacancy } = await searchParams;

  const applications = await db.application.findMany({
    where: vacancy ? { vacancyId: vacancy } : {},
    include: { vacancy: { select: { title: true, client: { select: { name: true } } } } },
    orderBy: { stageUpdatedAt: "desc" },
  });

  const cards: PipelineCard[] = applications.map((a) => ({
    id: a.id,
    fullName: a.fullName,
    vacancyTitle: a.vacancy.title,
    clientName: a.vacancy.client?.name ?? null,
    stage: a.stage,
    country: a.country,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark"
      >
        ← Overview
      </Link>
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Recruitment pipeline</h1>
      <p className="mt-1 text-stone-500">
        Drag candidates across stages — including the <strong>Client interview</strong> &amp; hiring steps.
      </p>

      {cards.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-stone-500">
          No applications yet.
        </div>
      ) : (
        <div className="mt-6">
          <PipelineBoard initialCards={cards} />
        </div>
      )}
    </div>
  );
}
