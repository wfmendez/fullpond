import { PrismaClient, QuestionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const JOB_DESCRIPTION = `We're looking for a **Business Development Analyst** who is self-driven and detail-oriented to fuel our sales pipeline by identifying and profiling supplement brands across TikTok, Amazon, Instagram, and other key retail platforms. You will act as the intelligence engine behind our sales team — surfacing high-potential target brands and delivering warm, ready-to-contact leads complete with verified decision-maker information.

This is a high-impact, research-forward role that blends social media savvy, market analysis, and sales support into one dynamic position. If you love discovering emerging brands, digging into data, and handing your team everything they need to close — this is your role.

## Key Responsibilities

**Brand Research & Target Identification**
- Monitor TikTok Shop, TikTok organic content, Amazon listings, Instagram brand profiles, Walmart Marketplace, GNC, iHerb, and emerging DTC supplement storefronts to identify prospective brand targets.
- Evaluate brand health using signals such as follower growth, review velocity, product ratings, ad-spend indicators, influencer partnerships, and market positioning.
- Build and maintain a prioritized target list segmented by size, channel, product category (protein, nootropics, weight management, hydration), and growth stage.
- Track competitor activity and flag high-velocity or trending brands for immediate outreach.

**Contact Discovery & Lead Enrichment**
- Use LinkedIn Sales Navigator, Keychain, Apollo, ZoomInfo and similar tools to identify and verify key decision-makers (Founders, CEOs, VP of Sales, Heads of Business Development, Procurement).
- Build complete contact profiles: name, title, LinkedIn URL, verified business email and phone.
- Cross-reference contact data across multiple sources to ensure accuracy and reduce bounce rates.

**Pipeline & CRM Management**
- Log research findings, target brand profiles, and contacts into the CRM (HubSpot, Salesforce) in a clean, standardized format.
- Assign lead scores and priority tiers; hand off warm leads with full context to the Sales team.
- Provide weekly research reports summarizing new targets, contacts added, and pipeline trends.

**Market Intelligence**
- Stay current on supplement-industry trends, regulatory shifts, and key brand announcements.
- Track TikTok Shop bestsellers, Amazon Movers & Shakers, and trending hashtags to spot emerging opportunities early.

## Skills & Qualities We Look For
- Exceptional English writing and verbal skills (C1 level minimum).
- 2+ years of experience in sales research, lead generation, or business-development support.
- Proficiency with LinkedIn Sales Navigator and contact-intelligence platforms (Keychain, Apollo.io, ZoomInfo).
- Strong understanding of Amazon Marketplace, TikTok Shop, and Instagram as discovery channels.
- Experience with CRM platforms (HubSpot, Salesforce, or similar).
- Excellent organization, attention to detail, and a self-starter mindset for a fully remote environment.`;

async function main() {
  const adminPassword = await bcrypt.hash("FullPond2026!", 10);
  const demoPassword = await bcrypt.hash("Demo2026!", 10);

  const admin = await db.user.upsert({
    where: { email: "wuillian.f.mendez@gmail.com" },
    update: { role: "ADMIN" },
    create: {
      email: "wuillian.f.mendez@gmail.com",
      name: "Wuillian Méndez",
      password: adminPassword,
      role: "ADMIN",
      country: "Honduras",
    },
  });

  await db.user.upsert({
    where: { email: "demo@fullpond.co" },
    update: {},
    create: {
      email: "demo@fullpond.co",
      name: "Demo Candidate",
      password: demoPassword,
      role: "USER",
      country: "Mexico",
    },
  });

  // Client (no unique field — create once by name).
  let client = await db.client.findFirst({ where: { name: "Peak Labs Supplements" } });
  if (!client) {
    client = await db.client.create({
      data: {
        name: "Peak Labs Supplements",
        contactName: "Sarah Whitfield",
        contactEmail: "sarah@peaklabs.example",
        industry: "Health & Supplements (DTC)",
        notes: "US-based supplement brand scaling on TikTok Shop & Amazon. Hiring remote BD talent.",
      },
    });
  }

  const slug = "business-development-analyst";
  const existing = await db.vacancy.findUnique({ where: { slug } });
  if (!existing) {
    await db.vacancy.create({
      data: {
        title: "Business Development Analyst",
        slug,
        summary:
          "Fuel our sales pipeline by identifying and profiling supplement brands across TikTok, Amazon, and Instagram, and delivering warm, ready-to-contact leads.",
        descriptionMd: JOB_DESCRIPTION,
        location: "Remote (LatAm / Philippines)",
        employmentType: "Full-time",
        salaryRange: "Based on experience",
        status: "OPEN",
        clientId: client.id,
        createdById: admin.id,
        questions: {
          create: [
            {
              order: 1,
              section: "Position",
              label:
                "Do you have experience supporting a sales team with lead generation or pipeline development?",
              type: QuestionType.RADIO,
              required: true,
              options: ["Yes", "No"],
            },
            {
              order: 2,
              section: "Position",
              label: "How many years of work experience do you have with Business Development?",
              type: QuestionType.SELECT,
              required: true,
              options: ["None", "Less than 1 year", "1 Year", "2 Years", "3 Years", "4+ Years"],
            },
            {
              order: 3,
              section: "General Questions",
              label: "Full Name",
              type: QuestionType.TEXT,
              required: true,
              mapsTo: "fullName",
            },
            {
              order: 4,
              section: "General Questions",
              label: "Country",
              type: QuestionType.TEXT,
              required: true,
              mapsTo: "country",
            },
            {
              order: 5,
              section: "General Questions",
              label: "Are you:",
              type: QuestionType.RADIO,
              required: true,
              options: ["Current Pathway Student", "Pathway Alum", "Not affiliated with Pathway"],
            },
            {
              order: 6,
              section: "General Questions",
              label: "My spoken English is:",
              type: QuestionType.SELECT,
              required: true,
              options: ["I don't speak English", "1", "2", "3", "4", "5", "I'm fluent with little to no accent"],
            },
            {
              order: 7,
              section: "General Questions",
              label: "My written English is:",
              type: QuestionType.SELECT,
              required: true,
              options: ["I can't write in English", "1", "2", "3", "4", "5", "I'm fluent with little to no grammar errors"],
            },
            {
              order: 8,
              section: "General Questions",
              label: "Have you taken the Cambridge Test?",
              type: QuestionType.RADIO,
              required: true,
              options: ["Yes", "No"],
            },
            {
              order: 9,
              section: "General Questions",
              label: "If you took the Cambridge Test, what did you score?",
              type: QuestionType.SELECT,
              required: false,
              options: ["A1", "A2", "B1", "B2", "C1", "C2"],
            },
            {
              order: 10,
              section: "General Questions",
              label: "What's your preferred contact method?",
              type: QuestionType.RADIO,
              required: true,
              options: ["Email", "Whatsapp", "LinkedIn"],
              mapsTo: "contactMethod",
            },
            {
              order: 11,
              section: "General Questions",
              label: "Please share your WhatsApp phone number",
              type: QuestionType.PHONE,
              required: true,
              mapsTo: "whatsapp",
            },
            {
              order: 12,
              section: "General Questions",
              label: "Please share your LinkedIn profile",
              type: QuestionType.URL,
              required: true,
              mapsTo: "linkedin",
            },
            {
              order: 13,
              section: "General Questions",
              label: "What's your monthly salary preference in $USD?",
              type: QuestionType.NUMBER,
              required: true,
              mapsTo: "salaryExpectation",
            },
            {
              order: 14,
              section: "General Questions",
              label: "How did you hear about us?",
              type: QuestionType.RADIO,
              required: true,
              options: ["Pathway program", "Email marketing", "LinkedIn", "A family member / friend", "Other"],
            },
          ],
        },
      },
    });
  }

  console.log("Seed complete: admin + demo user, 1 client, vacancy 'Business Development Analyst'.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
