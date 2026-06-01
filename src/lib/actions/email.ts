"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { buildNewVacancyEmail, sendEmail } from "@/lib/email";

// Notifies every candidate (role USER) about a vacancy. In demo mode (no
// RESEND_API_KEY) it renders + logs each email without sending; with a key it
// actually sends. Either way an EmailLog row is written for the preview screen.
export async function notifyNewVacancyAction(formData: FormData) {
  await requireAdmin();
  const vacancyId = String(formData.get("vacancyId") ?? "");
  if (!vacancyId) return;

  const vacancy = await db.vacancy.findUnique({ where: { id: vacancyId } });
  if (!vacancy) return;

  const users = await db.user.findMany({
    where: { role: "USER" },
    select: { id: true, name: true, email: true },
  });

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://fullpond.vercel.app";
  const vacancyUrl = `${base}/vacancies/${vacancy.slug}`;

  for (const u of users) {
    const { subject, html } = buildNewVacancyEmail({
      name: u.name,
      vacancyTitle: vacancy.title,
      vacancySummary: vacancy.summary,
      vacancyLocation: vacancy.location,
      vacancyUrl,
    });
    const status = await sendEmail(u.email, subject, html);
    await db.emailLog.create({
      data: { vacancyId: vacancy.id, userId: u.id, toEmail: u.email, subject, html, status },
    });
  }

  revalidatePath("/admin/emails");
}
