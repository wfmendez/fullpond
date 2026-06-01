"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { startSession, destroySession } from "@/lib/dal";
import { loginSchema, registerSchema } from "@/lib/validations";

export type AuthState = { error?: string };

export async function loginAction(
  _prev: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Invalid email or password." };

  const { email, password } = parsed.data;
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return { error: "Incorrect email or password." };
  }

  await startSession(user.id, user.role);
  redirect(user.role === "ADMIN" ? "/admin" : "/dashboard");
}

export async function registerAction(
  _prev: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    country: formData.get("country"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  const { name, email, password, country } = parsed.data;
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with that email already exists." };

  const hash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { name, email, password: hash, country: country || null, role: "USER" },
  });

  await startSession(user.id, user.role);
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
