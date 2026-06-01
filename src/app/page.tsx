import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Obstacles } from "@/components/Obstacles";
import { Talent } from "@/components/Talent";
import { ConnectBanner } from "@/components/ConnectBanner";
import { Process } from "@/components/Process";
import { Benefits } from "@/components/Benefits";
import { Marquee } from "@/components/Marquee";
import { ApplyCta } from "@/components/ApplyCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Obstacles />
        <Talent />
        <ConnectBanner />
        <Process />
        <Benefits />
        <Marquee />
        <ApplyCta />
      </main>
      <Footer />
    </>
  );
}
