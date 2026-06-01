/**
 * Central site config — single source of truth for links & contact.
 * NOTE: replace APPLICANT_FORM_URL with the real Google Form link
 *       (the "FullPond Applicant Form").
 */
export const site = {
  name: "FullPond",
  legalName: "Full Pond Inc.",
  email: "sales@fullpond.co",
  phone: "+1 (208) 243-9399",
  phoneHref: "tel:+12082439399",
  // Internal applicant flow — open vacancies board (replaces the old Google Form).
  applicantFormUrl: "/vacancies",
  description:
    "Full Pond connects U.S. businesses with skilled, English-fluent professionals from Latin America and the Philippines. We provide highly qualified remote staff with expertise equivalent to bachelor’s or master’s level education, offering seamless support in roles like administration, finance, and eCommerce — all at budget-friendly rates.",
} as const;

export const navLinks = [
  { label: "Hire Top Talent", href: "#talent" },
  { label: "How it works", href: "#process" },
  { label: "Find a Job", href: "#apply" },
] as const;
