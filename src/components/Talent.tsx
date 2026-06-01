import type { ComponentType, SVGProps } from "react";
import { Container } from "./ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";
import {
  IconOffice,
  IconCreative,
  IconMarketing,
  IconProfessional,
  IconEngineering,
  IconSales,
} from "./icons";

type Category = {
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  roles: string[];
};

const categories: Category[] = [
  {
    title: "Office & HR",
    Icon: IconOffice,
    roles: [
      "Executive Assistants",
      "Bookkeeping & Accounting",
      "Payroll",
      "ERPs & custom apps",
      "Phone Support / Customer Service",
    ],
  },
  {
    title: "Creative",
    Icon: IconCreative,
    roles: [
      "Video Editors",
      "Graphic Designers",
      "Adobe Suite",
      "Canva",
      "SketchUp",
      "FL Studio",
      "Procreate",
    ],
  },
  {
    title: "Marketing & Ads",
    Icon: IconMarketing,
    roles: ["Social Media Managers", "Copywriting", "Email Campaigns", "SEO"],
  },
  {
    title: "Professional",
    Icon: IconProfessional,
    roles: ["Legal Experts & Staff", "Architects", "Accountants"],
  },
  {
    title: "Engineering",
    Icon: IconEngineering,
    roles: ["Front End Developers", "Back End Developers"],
  },
  {
    title: "Sales & Success",
    Icon: IconSales,
    roles: ["Sales Reps", "Lead Follow-up", "CRM Specialists"],
  },
];

export function Talent() {
  return (
    <section id="talent" className="relative overflow-hidden bg-paper-deep py-24 md:py-32">
      <Container className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 left-0 select-none font-display text-[9rem] italic leading-none text-ink-900/[0.04] md:text-[13rem]"
        >
          02
        </span>

        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-500/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Our pond
            </span>
            <span className="h-px w-8 bg-brand-500/40" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900 text-balance md:text-5xl">
            Popular talent in our <span className="italic">“Pond”</span>
          </h2>
          <p className="mt-4 text-lg text-stone-500 text-pretty">
            Hand-picked specialists across every function your business runs on.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, Icon, roles }) => (
            <RevealItem key={title} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-4xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                <Ripples
                  count={4}
                  className="pointer-events-none absolute -bottom-12 -right-12 aspect-square w-44 text-brand-500/0 transition-colors duration-500 group-hover:text-brand-500/15"
                />
                <div className="relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-gradient-to-b group-hover:from-brand-400 group-hover:to-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                    {title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <li
                        key={role}
                        className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
