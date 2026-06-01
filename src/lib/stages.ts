import type { Stage } from "@prisma/client";

// Recruitment pipeline — single source of truth for stage order + labels,
// reused by the candidate tracker and the recruiter kanban.

export const PIPELINE_STAGES: Stage[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "CLIENT_INTERVIEW",
  "OFFER",
  "HIRED",
];

export const ALL_STAGES: Stage[] = [...PIPELINE_STAGES, "REJECTED"];

export const STAGE_LABELS: Record<Stage, string> = {
  APPLIED: "Applied",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  CLIENT_INTERVIEW: "Client interview",
  OFFER: "Offer",
  HIRED: "Hired",
  REJECTED: "Rejected",
};

// Tailwind classes per stage (badges / columns).
export const STAGE_STYLES: Record<Stage, string> = {
  APPLIED: "bg-stone-100 text-stone-700 ring-stone-200",
  SCREENING: "bg-aqua-300/20 text-brand-800 ring-aqua-400/30",
  INTERVIEW: "bg-brand-100 text-brand-800 ring-brand-300/40",
  CLIENT_INTERVIEW: "bg-gold-400/20 text-gold-500 ring-gold-400/40",
  OFFER: "bg-brand-500/15 text-brand-800 ring-brand-500/30",
  HIRED: "bg-emerald-100 text-emerald-700 ring-emerald-300/50",
  REJECTED: "bg-red-100 text-red-700 ring-red-200",
};
