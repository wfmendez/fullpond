import { Container } from "./ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";

const steps = [
  {
    n: "01",
    title: "We get to know you and your business",
    body: "We work closely with you to understand your unique needs and make a perfect match.",
  },
  {
    n: "02",
    title: "We find the best talent in our “Pond”",
    body: "Our team rigorously screens 50–100 applicants, narrowing down to the very best.",
  },
  {
    n: "03",
    title: "Interview your top 2–3 candidates",
    body: "You’ll interview and choose from the top 2–3 candidates, ensuring a perfect match.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-ink-900 py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-spotlight opacity-60" />
      <Ripples
        variant="emanate"
        count={5}
        className="absolute left-1/2 top-0 aspect-square w-[120%] max-w-[1000px] -translate-x-1/2 text-brand-300/15"
      />
      <div className="absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-300/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
              How it works · 03
            </span>
            <span className="h-px w-8 bg-brand-300/50" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            We source. <span className="italic">You onboard.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-400 text-pretty">
            A simple, three-step path from “we need help” to “welcome aboard.”
          </p>
        </Reveal>

        <RevealGroup className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* connecting line on desktop */}
          <div className="absolute inset-x-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

          {steps.map((step) => (
            <RevealItem key={step.n} className="relative">
              <div className="group relative h-full overflow-hidden rounded-4xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-brand-400/40">
                <Ripples
                  count={4}
                  className="pointer-events-none absolute -right-10 -top-10 aspect-square w-40 text-brand-300/0 transition-colors duration-500 group-hover:text-brand-300/20"
                />
                <span className="relative block bg-gradient-to-br from-aqua-300 to-brand-500 bg-clip-text font-display text-6xl font-semibold italic leading-none text-transparent md:text-7xl">
                  {step.n}
                </span>
                <h3 className="relative mt-5 font-display text-xl font-semibold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-stone-400">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
