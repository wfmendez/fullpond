import { getCurrentUser } from "@/lib/dal";
import { AppShell } from "@/components/app/AppShell";

// Shared authenticated shell. Does NOT force auth (so /vacancies stays public);
// per-page requireUser/requireAdmin + the Proxy handle gating.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return <AppShell user={user}>{children}</AppShell>;
}
