/**
 * All personal data lives here so the layout never needs editing.
 * Wrap a word or phrase in *asterisks* to render it as an italic serif "hook".
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ExperienceItem {
  dates: string;
  role: string;
  org: string;
  note?: string;
  points?: string[];
}

export const site = {
  name: "Mark George B. Reduca",
  shortName: "mark.reduca",
  title: "Full-Stack Developer",
  tagline: "Think clearly. Plan carefully. Build what *lasts*.",
  intro: "I design and build web, mobile and business systems that solve real problems for real people.",
  description:
    "Full-stack developer from Cagayan, Philippines building web, mobile and business systems with React, Flutter, Supabase and VB.NET.",
  location: "Cagayan, Philippines",
  locationShort: "Cagayan, PH",
  since: "est. 2023 · freelance",
  email: "reducamark1@gmail.com",
  resume: "/resume.pdf",
  availableForWork: true,
  availabilityBadge: "Available for work · Open 2026 · ",
  url: "https://mark-reduca-dev.vercel.app", // update after deploy / custom domain
  socials: [
    { label: "GitHub", href: "https://github.com/fannaaa-intel" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mark-reduca-b5951544b" },
  ] as SocialLink[],
};

export const about = {
  title: "Good software starts with *good thinking*.",
  paragraphs: [
    "I'm Mark, a full-stack developer and 4th-year Information and Computing Sciences student at Cagayan State University – Aparri, where I'm a Dean's Lister.",
    "I'm a calm, critical thinker who likes to plan before I build. I take time to understand the problem, map out the structure, and then write software that is reliable, clear and easy to use. Since 2023 I've been building systems for local businesses as a freelancer, from point-of-sale and accounting tools to AI-driven mobile apps.",
  ],
  closing: "The code comes after.",
  facts: [
    { label: "Based in", value: "Cagayan, Philippines" },
    { label: "Focus", value: "Web · Mobile · Business Systems" },
    { label: "Status", value: "Open to work" },
  ] as Fact[],
};

export const stack = {
  title: "Tools I *reach for*.",
  groups: [
    {
      label: "Languages",
      items: ["VB.NET", "C#", "Java", "JavaScript", "TypeScript", "HTML", "CSS", "Dart"],
    },
    { label: "Frameworks", items: ["React", "React Native", "Expo", "Flutter"] },
    { label: "Databases & Backend", items: ["Supabase", "MySQL", "SQLite"] },
  ] as StackGroup[],
};

export const experience = {
  title: "Where I've been *building*.",
  items: [
    {
      dates: "2023 — Present",
      role: "Freelance Full-Stack Developer",
      org: "Self-employed · Aparri, Cagayan",
      points: [
        "Designed, built and deployed custom software for local business clients",
        "Built desktop business systems (POS, inventory, procurement, accounting) in VB.NET with MySQL",
        "Developed web and mobile apps with React, Flutter, Supabase, HTML, CSS and JavaScript",
      ],
    },
    {
      dates: "2022 — Present",
      role: "BS Information and Computing Sciences",
      org: "Cagayan State University · Aparri Campus",
      note: "Dean's Lister",
    },
  ] as ExperienceItem[],
};

export const contact = {
  title: "Let's build something that *lasts*.",
  line: "Have a project in mind or an opportunity to talk about? My inbox is open.",
};

/** Theme colors, kept in sync with the --bg tokens in global.css */
export const themeColors = {
  light: "#FAFAFA",
  dark: "#0A0A0A",
} as const;
