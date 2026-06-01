import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { VacancyForm } from "./VacancyForm";

export const metadata = { title: "New vacancy — Admin FullPond" };

export default async function NewVacancyPage() {
  await requireAdmin();
  const clients = await db.client.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/vacancies" className="text-sm text-stone-500 hover:text-ink-900">
        ← Vacancies
      </Link>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink-900">New vacancy</h1>
      <p className="mt-1 mb-8 text-stone-500">
        Define the role and the questions for its application form.
      </p>
      <VacancyForm clients={clients} />
    </div>
  );
}
