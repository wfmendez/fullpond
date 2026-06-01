"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { slugify } from "@/lib/utils";
import type { QuestionType, VacancyStatus } from "@prisma/client";

export type VacancyFormState = { error?: string };

const QUESTION_TYPES = ["TEXT", "TEXTAREA", "SELECT", "RADIO", "NUMBER", "EMAIL", "PHONE", "URL"];
const STATUSES = ["DRAFT", "OPEN", "CLOSED"];

type QuestionInput = {
  label?: string;
  type?: string;
  required?: boolean;
  options?: string[];
  section?: string;
  mapsTo?: string;
};

async function uniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || "vacante";
  let slug = base;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await db.vacancy.findUnique({ where: { slug } })) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

function parseQuestions(raw: FormDataEntryValue | null): QuestionInput[] {
  try {
    const parsed = JSON.parse(typeof raw === "string" ? raw : "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function createVacancyAction(
  _prev: VacancyFormState | undefined,
  formData: FormData,
): Promise<VacancyFormState> {
  const admin = await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const descriptionMd = String(formData.get("descriptionMd") ?? "").trim();
  if (!title || !summary || !descriptionMd) {
    return { error: "Title, summary and description are required." };
  }

  const statusRaw = String(formData.get("status") ?? "DRAFT");
  const status = (STATUSES.includes(statusRaw) ? statusRaw : "DRAFT") as VacancyStatus;
  const clientId = String(formData.get("clientId") ?? "").trim() || null;
  const questions = parseQuestions(formData.get("questionsJson"));

  const slug = await uniqueSlug(title);

  await db.vacancy.create({
    data: {
      title,
      slug,
      summary,
      descriptionMd,
      location: String(formData.get("location") ?? "Remote").trim() || "Remote",
      employmentType: String(formData.get("employmentType") ?? "").trim() || null,
      salaryRange: String(formData.get("salaryRange") ?? "").trim() || null,
      status,
      clientId,
      createdById: admin.id,
      questions: {
        create: questions
          .filter((q) => q.label && q.label.trim())
          .map((q, i) => ({
            order: i,
            section: q.section?.trim() || null,
            label: q.label!.trim(),
            type: (q.type && QUESTION_TYPES.includes(q.type) ? q.type : "TEXT") as QuestionType,
            required: !!q.required,
            options:
              Array.isArray(q.options) && q.options.length > 0
                ? q.options.map((o) => String(o).trim()).filter(Boolean)
                : undefined,
            mapsTo: q.mapsTo?.trim() || null,
          })),
      },
    },
  });

  revalidatePath("/admin/vacancies");
  revalidatePath("/vacancies");
  redirect("/admin/vacancies");
}

export async function updateVacancyStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const statusRaw = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(statusRaw)) return;

  await db.vacancy.update({ where: { id }, data: { status: statusRaw as VacancyStatus } });
  revalidatePath("/admin/vacancies");
  revalidatePath("/vacancies");
}

export async function deleteVacancyAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.vacancy.delete({ where: { id } });
  revalidatePath("/admin/vacancies");
  revalidatePath("/vacancies");
}
