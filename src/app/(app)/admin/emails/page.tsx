import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { notifyNewVacancyAction } from "@/lib/actions/email";

export const metadata = { title: "Emails — Admin FullPond" };

const STATUS_STYLES: Record<string, string> = {
  RENDERED: "bg-amber-100 text-amber-700 ring-amber-300/50",
  SENT: "bg-emerald-100 text-emerald-700 ring-emerald-300/50",
  FAILED: "bg-red-100 text-red-700 ring-red-200",
};

export default async function EmailsPage() {
  await requireAdmin();
  const [vacancies, logs, userCount] = await Promise.all([
    db.vacancy.findMany({
      where: { status: "OPEN" },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
    db.emailLog.findMany({
      include: { user: { select: { name: true } }, vacancy: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.user.count({ where: { role: "USER" } }),
  ]);

  const demoMode = !process.env.RESEND_API_KEY;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Vacancy emails</h1>
      <p className="mt-1 text-stone-500">
        Notify your <strong>{userCount}</strong> registered candidate{userCount === 1 ? "" : "s"} about an open role.{" "}
        {demoMode ? (
          <span>
            <strong>Demo mode:</strong> each email is rendered &amp; logged (status <em>RENDERED</em>) but not actually
            sent. Set a <code>RESEND_API_KEY</code> to send for real.
          </span>
        ) : (
          <span>Emails are sent via Resend.</span>
        )}
      </p>

      <form
        action={notifyNewVacancyAction}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-stone-200 bg-white p-5"
      >
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-900">Open role</label>
          <select
            name="vacancyId"
            required
            defaultValue=""
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink-900"
          >
            <option value="" disabled>
              Select a vacancy…
            </option>
            {vacancies.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow ring-1 ring-inset ring-white/20 transition hover:brightness-110"
        >
          Send notifications
        </button>
      </form>

      <h2 className="mt-8 font-display text-lg text-ink-900">Email log ({logs.length})</h2>
      {logs.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-8 text-center text-stone-500">
          No emails yet. Pick a role above and send notifications.
        </div>
      ) : (
        <ul className="mt-3 space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm">
                  <span className="font-semibold text-ink-900">{log.user?.name ?? log.toEmail}</span>
                  <span className="text-stone-500"> · {log.toEmail}</span>
                  {log.vacancy && <span className="text-stone-400"> · {log.vacancy.title}</span>}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                    STATUS_STYLES[log.status] ?? STATUS_STYLES.RENDERED
                  }`}
                >
                  {log.status}
                </span>
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-medium text-brand-600 hover:text-brand-700">
                  Preview email
                </summary>
                <iframe
                  title={`Email to ${log.toEmail}`}
                  srcDoc={log.html}
                  sandbox=""
                  className="mt-2 h-[460px] w-full rounded-xl border border-stone-200"
                />
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
