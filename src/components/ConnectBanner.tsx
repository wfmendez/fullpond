import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";

export function ConnectBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-600">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-500 to-aqua-500" />
      <Ripples
        variant="emanate"
        count={4}
        className="absolute left-[12%] top-1/2 aspect-square w-[40rem] -translate-y-1/2 text-white/15"
      />
      <Ripples
        count={6}
        className="absolute -right-24 top-1/2 aspect-square w-[34rem] -translate-y-1/2 text-white/10"
      />
      <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay" />

      <Container className="relative py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl font-medium leading-snug text-white text-balance md:text-[2rem]">
            We can connect you with top talent for{" "}
            <span className="italic underline decoration-white/40 decoration-1 underline-offset-[6px]">
              anything
            </span>{" "}
            that can be done remotely.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
