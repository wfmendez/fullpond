"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Stage } from "@prisma/client";
import { db } from "@/lib/db";
import { requireUser, requireAdmin } from "@/lib/dal";

export type ApplyState = { error?: string; fieldErrors?: Record<string, string> };

const STAGES: Stage[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "CLIENT_INTERVIEW",
  "OFFER",
  "HIRED",
  "REJECTED",
];

// vacancyId is bound via .bind(null, vacancyId) in the client form.
export async function applyAction(
  vacancyId: string,
  _prev: ApplyState | undefined,
  formData: FormData,
): Promise<ApplyState> {
  const user = await requireUser();

  const vacancy = await db.vacancy.findUnique({
    where: { id: vacancyId },
    include: { questions: true },
  });
  if (!vacancy || vacancy.status !== "OPEN") {
    return { error: "This vacancy is no longer available." };
  }

  const dup = await db.application.findUnique({
    where: { vacancyId_userId: { vacancyId, userId: user.id } },
  });
  if (dup) redirect("/dashboard");

  const answers: Record<string, string> = {};
  const mapped: Record<string, string> = {};
  const fieldErrors: Record<string, string> = {};

  for (const q of vacancy.questions) {
    const raw = formData.get(`q_${q.id}`);
    const val = typeof raw === "string" ? raw.trim() : "";
    if (q.required && !val) fieldErrors[q.id] = "This field is required.";
    answers[q.id] = val;
    if (q.mapsTo && val) mapped[q.mapsTo] = val;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please complete the required fields.", fieldErrors };
  }

  await db.application.create({
    data: {
      vacancyId,
      userId: user.id,
      fullName: mapped.fullName || user.name,
      email: user.email,
      country: mapped.country ?? user.country ?? null,
      contactMethod: mapped.contactMethod ?? null,
      whatsapp: mapped.whatsapp ?? null,
      linkedin: mapped.linkedin ?? null,
      salaryExpectation: mapped.salaryExpectation ?? null,
      answers,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard?applied=1");
}

// ── Recruiter: move a candidate between pipeline stages (called from the kanban) ─
export async function moveStageAction(applicationId: string, toStage: Stage) {
  await requireAdmin();
  if (!STAGES.includes(toStage)) return { ok: false as const };

  await db.application.update({
    where: { id: applicationId },
    data: { stage: toStage, stageUpdatedAt: new Date() },
  });

  revalidatePath("/admin/pipeline");
  revalidatePath(`/admin/candidates/${applicationId}`);
  return { ok: true as const };
}

// ── Recruiter: update a candidate's stage + notes from the profile page ─────────
export async function updateApplicationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const notes = String(formData.get("notes") ?? "");
  const stage = String(formData.get("stage") ?? "");

  const data: { notes: string; stage?: Stage; stageUpdatedAt?: Date } = { notes };
  if ((STAGES as string[]).includes(stage)) {
    data.stage = stage as Stage;
    data.stageUpdatedAt = new Date();
  }

  await db.application.update({ where: { id }, data });
  revalidatePath(`/admin/candidates/${id}`);
  revalidatePath("/admin/pipeline");
}
