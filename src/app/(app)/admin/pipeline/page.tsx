import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { PipelineBoard, type PipelineCard } from "./PipelineBoard";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Pipeline — Admin FullPond" };

const HELP_STEPS = [
  { icon: "↔️", text: "Drag a candidate card left or right to move them to a new stage." },
  { icon: "👁️", text: "Click "View profile" on any card to see their full answers and add recruiter notes." },
  { icon: "🤝", text: ""Client interview" means the candidate meets the hiring company — use this stage when you've set that up." },
  { icon: "✅", text: ""Hired" means placement is confirmed. "Rejected" removes the candidate from active consideration." },
  { icon: "🔍", text: "Filter by vacancy using the URL param ?vacancy=ID, or use the Vacancies page → "View candidates" button." },
];

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
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark">
        ← Overview
      </Link>
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Recruitment pipeline</h1>
      <p className="mt-1 text-stone-500">
        Drag candidates across stages — including the <strong>Client interview</strong> &amp; hiring steps.
      </p>

      <div className="mt-4">
        <HelpBox title="How to use the pipeline board" steps={HELP_STEPS} />
      </div>

      {cards.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center">
          <p className="text-stone-500">No applications yet.</p>
          <p className="mt-2 text-sm text-stone-400">
            Once candidates apply to a vacancy, their cards will appear here under <strong>Applied</strong>.
          </p>
          <Link href="/admin/vacancies" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-fp-dark px-4 py-2 text-sm font-semibold text-fp-blue transition hover:opacity-90">
            Go to Vacancies →
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          <PipelineBoard initialCards={cards} />
        </div>
      )}
    </div>
  );
}
