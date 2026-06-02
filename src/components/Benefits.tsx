import { Container } from "./ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";
import { IconHolidays, IconPto, IconPerformance } from "./icons";

const benefits = [
  {
    Icon: IconHolidays,
    title: "Take your local holidays",
    body: "Celebrate the days that matter where you are — your calendar, respected.",
  },
  {
    Icon: IconPto,
    title: "Paid time off (PTO)",
    body: "Real rest, built in. Recharge without worrying about your paycheck.",
  },
  {
    Icon: IconPerformance,
    title: "Performance-based benefits",
    body: "Do great work, get rewarded for it. Your growth is recognized.",
  },
];

export function Benefits() {
  return (
    <section id="careers" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="absolute inset-0 bg-grain opacity-[0.5] mix-blend-multiply" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-fp-dark/20" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fp-dark/60">
              For candidates
            </span>
            <span className="h-px w-8 bg-fp-dark/20" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fp-dark text-balance md:text-5xl">
            Some other <span className="italic">benefits</span>
          </h2>
          <p className="mt-4 text-lg text-fp-dark/60 text-pretty">
            Joining the pond means more than great work — it means being taken care of.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {benefits.map(({ Icon, title, body }) => (
            <RevealItem key={title} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-4xl border-2 border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-fp-blue hover:shadow-xl hover:shadow-fp-blue/20">
                <Ripples
                  count={4}
                  className="pointer-events-none absolute -bottom-12 -right-12 aspect-square w-44 text-fp-blue/0 transition-colors duration-500 group-hover:text-fp-blue/40"
                />
                <div className="relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fp-blue/15 text-fp-dark shadow-sm transition-all duration-300 group-hover:bg-fp-blue group-hover:text-fp-dark">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-fp-dark">
                    {title}
                  </h3>
                  <p className="mt-2 text-fp-dark/60 text-pretty">{body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
