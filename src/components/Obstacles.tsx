import { Container } from "./ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";
import { IconCheck, IconX } from "./icons";

const problems = [
  "Rising payroll cost",
  "Lengthy interview processes",
  "Expensive and tedious termination protocols",
  "Inefficient job postings",
  "Inferior quality",
  "Prolonged onboarding timelines",
];

const solutions = [
  "Top talent for 25% of local price",
  "3-step interview process",
  "Flexible termination protocols",
  "We find people who “Get it” when it comes to working in the US",
  "Experienced and qualified talent",
  "Interview our top candidates tailored to your needs",
];

export function Obstacles() {
  return (
    <section id="why" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="absolute inset-0 bg-grain opacity-[0.5] mix-blend-multiply" />

      <Container className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[9rem] italic leading-none text-ink-900/[0.04] md:text-[13rem]"
        >
          01
        </span>

        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-500/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              The shift
            </span>
            <span className="h-px w-8 bg-brand-500/40" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900 text-balance md:text-5xl">
            Eliminate growth obstacles
          </h2>
          <p className="mt-4 text-lg text-stone-500 text-pretty">
            The old way of hiring slows you down. We flipped every pain point
            into an advantage.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Problems */}
          <Reveal className="flex">
            <div className="flex w-full flex-col rounded-4xl border border-stone-200 bg-white/70 p-8 backdrop-blur-sm md:p-10">
              <p className="font-display text-sm italic text-stone-400">
                The old way
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-ink-900">
                Current hiring problems
              </h3>
              <RevealGroup className="mt-8 space-y-4" stagger={0.06}>
                {problems.map((item) => (
                  <RevealItem key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-400">
                      <IconX className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                    <span className="text-stone-500">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>

          {/* Solution — dominant "deep water" card */}
          <Reveal className="flex" delay={0.1}>
            <div className="relative flex w-full flex-col overflow-hidden rounded-4xl bg-ink-900 p-8 shadow-2xl shadow-ink-900/25 md:p-10">
              <div className="absolute inset-0 bg-spotlight opacity-80" />
              <Ripples
                count={6}
                className="absolute -right-20 -top-24 aspect-square w-[26rem] text-brand-300/20"
              />
              <div className="relative">
                <p className="font-display text-sm italic text-brand-300">
                  The FullPond solution
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                  Built to remove the friction
                </h3>
                <RevealGroup className="mt-8 space-y-4" stagger={0.06}>
                  {solutions.map((item) => (
                    <RevealItem key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 text-white ring-1 ring-inset ring-white/20">
                        <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                      <span className="text-stone-100">{item}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
