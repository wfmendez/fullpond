import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { notifyNewVacancyAction } from "@/lib/actions/email";
import { HelpBox } from "@/components/app/HelpBox";

export const metadata = { title: "Emails — Admin FullPond" };

const STATUS_STYLES: Record<string, string> = {
  RENDERED: "bg-amber-100 text-amber-700 ring-amber-300/50",
  SENT: "bg-emerald-100 text-emerald-700 ring-emerald-300/50",
  FAILED: "bg-red-100 text-red-700 ring-red-200",
};

export default async function EmailsPage() {
  await requireAdmin();
  const [vacancies, logs, userCount] = await Promise.all([
    db.vacancy.findMany({ where: { status: "OPEN" }, select: { id: true, title: true }, orderBy: { createdAt: "desc" } }),
    db.emailLog.findMany({ include: { user: { select: { name: true } }, vacancy: { select: { title: true } } }, orderBy: { createdAt: "desc" }, take: 50 }),
    db.user.count({ where: { role: "USER" } }),
  ]);

  const demoMode = !process.env.RESEND_API_KEY;

  const HELP_STEPS = [
    { icon: '📋', text: `Choose an open role — the email goes to all ${userCount} registered candidates at once.` },
    { icon: '👁️', text: 'After sending, scroll to the Email log and expand any row to preview the email.' },
    { icon: demoMode ? '⚠️' : '✅', text: demoMode ? 'Demo mode: emails are rendered and logged but NOT delivered. Add a RESEND_API_KEY in Vercel to send for real.' : 'Live mode: emails are delivered via Resend to each candidate inbox.' },
    { icon: '📜', text: 'The log keeps a permanent record of every notification, with status SENT, RENDERED or FAILED.' },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-fp-dark/60 hover:text-fp-dark">← Overview</Link>
      <h1 className="font-display text-3xl tracking-tight text-ink-900">Vacancy emails</h1>
      <p className="mt-1 text-stone-500">
        Notify your <strong>{userCount}</strong> registered candidate{userCount !== 1 ? "s" : ""} about a new open role.
      </p>

      <div className="mt-5">
        <HelpBox title="How vacancy emails work" steps={HELP_STEPS} defaultOpen />
      </div>

      <form action={notifyNewVacancyAction} className="mt-2 flex flex-wrap items-end gap-3 rounded-2xl border border-stone-200 bg-white p-5">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-900">
            Open role <span className="font-normal text-stone-400">(only Open vacancies appear here)</span>
          </label>
          <select name="vacancyId" required defaultValue="" className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-fp-dark focus:outline-none focus:ring-2 focus:ring-fp-dark/10">
            <option value="" disabled>Select a vacancy…</option>
            {vacancies.map((v) => (<option key={v.id} value={v.id}>{v.title}</option>))}
          </select>
          {vacancies.length === 0 && (
            <p className="mt-1.5 text-xs text-stone-400">💡 No open vacancies. <Link href="/admin/vacancies" className="underline hover:text-fp-dark">Publish one first →</Link></p>
          )}
        </div>
        <button type="submit" disabled={vacancies.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90 disabled:opacity-40">
          Send notifications
        </button>
      </form>

      <h2 className="mt-8 font-display text-lg text-ink-900">
        Email log <span className="text-sm font-normal text-stone-400">({logs.length} total)</span>
      </h2>
      {logs.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-8 text-center text-stone-500">
          No emails yet. Pick a role above and click "Send notifications".
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
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[log.status] ?? STATUS_STYLES.RENDERED}`}>
                  {log.status}
                </span>
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-medium text-fp-dark/50 hover:text-fp-dark">Preview email ↓</summary>
                <iframe title={`Email to ${log.toEmail}`} srcDoc={log.html} sandbox="" className="mt-2 h-[460px] w-full rounded-xl border border-stone-200" />
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
