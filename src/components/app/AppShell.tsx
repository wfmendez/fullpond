import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logoutAction } from "@/lib/auth-actions";

type ShellUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  avatar: string | null;
  country: string | null;
  phone: string | null;
} | null;

export function AppShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-paper/85 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-7">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink-900"
            >
              FullPond
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
              {isAdmin ? (
                <>
                  <Link href="/admin" className="transition-colors hover:text-ink-900">Overview</Link>
                  <Link href="/admin/vacancies" className="transition-colors hover:text-ink-900">Vacancies</Link>
                  <Link href="/admin/pipeline" className="transition-colors hover:text-ink-900">Pipeline</Link>
                  <Link href="/admin/clients" className="transition-colors hover:text-ink-900">Clients</Link>
                  <Link href="/admin/emails" className="transition-colors hover:text-ink-900">Emails</Link>
                  <Link href="/admin/leads" className="transition-colors hover:text-ink-900">Leads</Link>
                </>
              ) : (
                <>
                  <Link href="/vacancies" className="transition-colors hover:text-ink-900">Vacancies</Link>
                  {user && (
                    <Link href="/dashboard" className="transition-colors hover:text-ink-900">
                      My applications
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden text-sm text-stone-500 sm:block">{user.name}</span>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-stone-600 transition-colors hover:text-ink-900">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-4 py-1.5 text-sm font-semibold text-white shadow ring-1 ring-inset ring-white/20 transition hover:brightness-110"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </Container>
      </header>

      <main className="flex-1 py-10">
        <Container>{children}</Container>
      </main>

      <footer className="border-t border-stone-200 py-6">
        <Container className="flex items-center justify-between text-xs text-stone-400">
          <span>© {new Date().getFullYear()} FullPond</span>
          <span>Talent platform · demo</span>
        </Container>
      </footer>
    </div>
  );
}
