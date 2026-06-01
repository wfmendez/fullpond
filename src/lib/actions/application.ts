"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/dal";

export type ApplyState = { error?: string; fieldErrors?: Record<string, string> };

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
