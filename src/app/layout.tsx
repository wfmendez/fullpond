import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

// Body / UI — clean, warm humanist grotesque
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Display — warm high-contrast serif with optical sizing + italic for emphasis
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fullpond.co"),
  title: "FullPond — Cut Costs, Not Quality | Global Remote Talent",
  description:
    "FullPond connects U.S. businesses with skilled, English-fluent professionals from Latin America and the Philippines — top-tier remote talent at a fraction of the cost of local hires.",
  keywords: [
    "remote talent",
    "offshore staffing",
    "Latin America developers",
    "Philippines virtual assistants",
    "hire remote team",
  ],
  openGraph: {
    title: "FullPond — Cut Costs, Not Quality",
    description:
      "Tap into a full pond of global top-tier talent at a fraction of the cost of local hires.",
    type: "website",
    siteName: "FullPond",
  },
  twitter: {
    card: "summary_large_image",
    title: "FullPond — Cut Costs, Not Quality",
    description:
      "Global top-tier remote talent at a fraction of the cost of local hires.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
