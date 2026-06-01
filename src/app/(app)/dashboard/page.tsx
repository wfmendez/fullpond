import Link from "next/link";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { PIPELINE_STAGES, STAGE_LABELS, STAGE_STYLES } from "@/lib/stages";
import { IconArrowRight } from "@/components/icons";

export const metadata = { title: "My applications — FullPond" };

export default async function DashboardPage() {
  const user = await requireUser();
  const applications = await db.application.findMany({
    where: { userId: user.id },
    include: { vacancy: { select: { title: true, slug: true, location: true } } },
    orderBy: { createdAt: "desc" },
  });

  const firstName = user.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Hi, {firstName}</h1>
      <p className="mt-1 text-stone-500">Track the status of your applications.</p>

      {applications.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center">
          <p className="text-stone-600">You haven&apos;t applied to any roles yet.</p>
          <Link
            href="/vacancies"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow ring-1 ring-inset ring-white/20 transition hover:brightness-110"
          >
            View open roles
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {applications.map((app) => {
            const idx = PIPELINE_STAGES.indexOf(app.stage);
            const rejected = app.stage === "REJECTED";
            return (
              <li key={app.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-lg text-ink-900">{app.vacancy.title}</h2>
                    <p className="text-sm text-stone-500">{app.vacancy.location}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${STAGE_STYLES[app.stage]}`}
                  >
                    {STAGE_LABELS[app.stage]}
                  </span>
                </div>

                {/* Progress tracker */}
                {!rejected && (
                  <div className="mt-5 flex items-center gap-1.5">
                    {PIPELINE_STAGES.map((stage, i) => (
                      <div key={stage} className="flex-1">
                        <div
                          className={`h-1.5 rounded-full ${i <= idx ? "bg-brand-500" : "bg-stone-200"}`}
                          title={STAGE_LABELS[stage]}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-3 text-xs text-stone-400">
                  Applied on {app.createdAt.toLocaleDateString("en-US")}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
