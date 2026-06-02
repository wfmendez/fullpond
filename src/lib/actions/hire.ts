"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

export type HireState = { ok?: boolean; error?: string };

const STATUSES = ["NEW", "CONTACTED", "WON", "LOST"];

// Public — anyone (a business) can submit a "hire talent" request from /hire.
export async function createHireLeadAction(
  _prev: HireState | undefined,
  formData: FormData,
): Promise<HireState> {
  const company = String(formData.get("company") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!company || !name || !email) {
    return { error: "Please fill in your company, name, and work email." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  await db.hireLead.create({
    data: {
      company,
      name,
      email,
      roleNeeded: String(formData.get("roleNeeded") ?? "").trim() || null,
      teamSize: String(formData.get("teamSize") ?? "").trim() || null,
      message: String(formData.get("message") ?? "").trim() || null,
    },
  });

  revalidatePath("/admin/leads");
  return { ok: true };
}

export async function updateHireLeadStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status)) return;
  await db.hireLead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function deleteHireLeadAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.hireLead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
