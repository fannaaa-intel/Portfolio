# PLAN.md — Mark George B. Reduca · Developer Portfolio

> Build spec for Claude Code. Read this whole file before writing any code.
> Work through the **Build Steps** (section 9) in order, and check in with me after each step.

---

## 1. Goal

A fast, minimalist, **monochrome** personal portfolio that presents Mark as a calm, careful full-stack developer.
Recruiters and freelance clients should understand within 10 seconds who he is, what he builds and how to contact him.

---

## 2. Tech Stack

| Layer      | Choice                                                                 |
|------------|------------------------------------------------------------------------|
| Framework  | **Astro** (latest) + **TypeScript** (strict)                           |
| Styling    | **Tailwind CSS** (add via `npx astro add tailwind`)                    |
| Content    | **MDX** content collections for projects (`npx astro add mdx`)         |
| Fonts      | `@fontsource-variable/geist` + `@fontsource-variable/geist-mono` + `@fontsource-variable/fraunces` (italic, opsz axis only) (fallback: Inter + JetBrains Mono + Georgia) |
| SEO        | `@astrojs/sitemap`, Open Graph / Twitter meta tags                     |
| Icons      | Inline SVG (or `astro-icon` with Lucide); **no** icon fonts            |
| Hosting    | GitHub repo → **Vercel** (free tier, auto-deploy on push)              |

Rules:
- Ship as little client-side JS as possible. Use small vanilla `<script>` tags only for the theme toggle, the cursor blink and scroll reveals.
- No UI component libraries. Everything is hand-built with Tailwind.

---

## 3. Design System — Monochrome Minimalist

### Colors (CSS variables, swapped by theme)

| Token        | Light      | Dark       |
|--------------|------------|------------|
| `--bg`       | `#FAFAFA`  | `#0A0A0A`  |
| `--fg`       | `#0A0A0A`  | `#FAFAFA`  |
| `--muted`    | `#737373`  | `#A3A3A3`  |
| `--border`   | `#E5E5E5`  | `#262626`  |
| `--surface`  | `#FFFFFF`  | `#111111`  |

No other colors anywhere. **The only color on the site appears in project screenshots and the profile photo on hover.**

### Typography — mixed fonts
Three families, each with one job:
- Headings: Geist Sans, tight tracking (`-0.02em`), large sizes (hero name ~`clamp(2.5rem, 7vw, 5.5rem)`)
- Body: Geist Sans, 16–18px, line-height 1.7, max width ~65ch
- Accents: **Geist Mono** for labels, tags, dates, section numbers, nav links and buttons
- **Hooks: Fraunces italic** (class `hook`). Mixed *into* sans headlines for one or two key words, never for whole paragraphs. Uses:
  - Hero name: Mark George *B.* Reduca
  - Tagline: Think clearly. Plan carefully. Build what *lasts*.
  - About pull quote: Good software starts with *good thinking*.
  - Project card sub-hooks, e.g. GovPulse — *public service, measured.*
  - Contact: Let's build something that *lasts*.
  - Big outlined section numerals (see element 11)

Visual theme: **"drafting table"**. Blueprint-style marks reflect the "plan carefully" tagline.

### Signature elements ("minimalist with elements")
1. **Section indexes** in mono: `01 / About`, `02 / Stack`, `03 / Projects`, `04 / Experience`, `05 / Contact`
2. **Subtle background grid**: faint 1px lines or dot pattern using `--border`, fading out with a radial mask
3. **Thin 1px borders** on cards and dividers, with no shadows
4. **Invert-on-hover cards**: project cards flip from fg-on-bg to bg-on-fg (200ms ease)
5. **Grayscale → color**: profile photo and project screenshots use `grayscale` and turn to full color on hover
6. **Blinking cursor** `▍` after the hero tagline
7. **Link underline animation**: underline grows from left on hover
8. **Scroll reveal**: sections fade and slide up 12px once, via IntersectionObserver
9. **Tags** as small mono pills with a 1px border, e.g. `[ Flutter ]`
10. **Theme toggle** (light/dark) in the nav, mono text `light / dark`, saved in localStorage, defaulting to the system preference, with no flash on load (inline script in `<head>`)
11. **Outlined serif numerals**: a huge italic Fraunces `01`, `02`… with a 1px muted stroke and no fill, sitting behind each section header (class `numeral-outline`, decorative, `aria-hidden`)
12. **Corner crop marks**: drafting-style L-ticks on the hero photo frame (class `corners`) and on project cards, where they appear and tighten in on hover (`corners corners-hover`)
13. **Dimension line**: blueprint-style `|——— est. 2023 · freelance ———|` mono annotation under the hero name (class `dim`)
14. **Stack marquee**: a slow, infinite mono ticker of the stack between Hero and About, separated by SVG asterisks; pauses on hover; decorative and `aria-hidden` (component `Marquee.astro`)
15. **Rotating badge**: circular mono text `AVAILABLE FOR WORK · OPEN 2026 ·` slowly rotating around an asterisk, overlapping the bottom-left corner of the hero photo (component `RotatingBadge.astro`)
16. **Drafting asterisk** glyph as a separator, drawn as inline SVG so it never renders as a color emoji (component `Asterisk.astro`)

### Motion & accessibility
- Respect `prefers-reduced-motion`: disable the cursor blink, status pulse, badge rotation, marquee, reveals and transitions
- Text contrast is at least WCAG AA in both themes
- Visible focus rings (2px `--fg` outline with offset)
- Semantic HTML, alt text on all images, keyboard-navigable nav
- Mobile-first: no horizontal scroll at 360px wide

---

## 4. Site Structure

```
/                      Home (single page, all sections)
/projects/[slug]       Project case study pages (from MDX collection)
/404                   Minimal 404: "404 — this page wandered off." + link home
/resume.pdf            Static file (CV)
```

### Home sections (in order)

**Nav (sticky, blurred bg, 1px bottom border)**
- Left: `mark.reduca` (mono) → links to top
- Right: About · Projects · Experience · Contact · theme toggle
- Mobile: collapses to a simple `menu` / `close` text toggle

**Hero**
- Small mono label: `Full-Stack Developer — Cagayan, PH`
- Name: **Mark George B. Reduca**
- Tagline (with blinking cursor): **"Think clearly. Plan carefully. Build what lasts."**
- One-line intro: *"I design and build web, mobile and business systems that solve real problems for real people."*
- Buttons (mono, bordered): `View Projects →` · `Download CV ↓` · `GitHub ↗`
- Profile photo on the right (desktop) / above the text (mobile): grayscale, color on hover, 1px border, square crop focused on the face
- Small status line: `● Available for freelance work` (the dot is `--fg`, pulsing slowly)

**01 / About**

> I'm Mark, a full-stack developer and 4th-year Information and Computing Sciences student at Cagayan State University – Aparri, where I'm a Dean's Lister.
>
> I'm a calm, critical thinker who likes to plan before I build. I take time to understand the problem, map out the structure, and then write software that is reliable, clear and easy to use. Since 2023 I've been building systems for local businesses as a freelancer, from point-of-sale and accounting tools to AI-driven mobile apps.
>
> Good software starts with good thinking. The code comes after.

Small fact row in mono beside or below the text:
`Based in — Cagayan, Philippines` · `Focus — Web · Mobile · Business Systems` · `Status — Open to work`

**02 / Stack**
Grouped grid of logo tiles (1px hairline borders, invert on hover). Each tile has a **monochrome logo** (Simple Icons, CC0, drawn in `currentColor` so it follows the theme, with no brand colors), a mono index and the name. Tools without a Simple Icons mark (C#) get a solid square with the name knocked out, matching the JS/TS marks. The stack marquee shows the same logos.
- **Languages:** VB.NET (.NET mark) · C# · Java (OpenJDK mark) · JavaScript · TypeScript · HTML · CSS · Dart
- **Frameworks:** React · React Native · Expo · Flutter
- **Databases & Backend:** Supabase · MySQL · SQLite

**03 / Projects**
Grid of project cards (2 columns desktop, 1 mobile). Each card shows: index (`P/01`), name, one-liner, tech tags, a screenshot (or the placeholder pattern), and links (`Live ↗`, `Code ↗`, `Case study →`). GovPulse is the featured card and spans the full width.

**04 / Experience**
Vertical timeline with a 1px line and mono dates:
- **2023 — Present · Freelance Full-Stack Developer** — Self-employed, Aparri, Cagayan
  - Designed, built and deployed custom software for local business clients
  - Built desktop business systems (POS, inventory, procurement, accounting) in VB.NET with MySQL
  - Developed web and mobile apps with React, Flutter, Supabase, HTML, CSS and JavaScript
- **2022 — Present · BS Information and Computing Sciences** — Cagayan State University, Aparri Campus · Dean's Lister

**05 / Contact**
- Big heading: **"Let's build something that lasts."**
- Line: *"Have a project in mind or an opportunity to talk about? My inbox is open."*
- Large email link: `reducamark1@gmail.com` with a copy-to-clipboard button (mono `copy` → `copied ✓`)
- Social links row rendered from `site.ts` (only the links that exist)

**Footer**
`© {current year} Mark George B. Reduca — Designed & built with Astro.` · `Back to top ↑`

---

## 5. Content

### 5.1 Site config — `src/data/site.ts`
All personal data lives here so the layout never needs editing.

```ts
export const site = {
  name: "Mark George B. Reduca",
  shortName: "mark.reduca",
  title: "Full-Stack Developer",
  tagline: "Think clearly. Plan carefully. Build what lasts.",
  location: "Cagayan, Philippines",
  email: "reducamark1@gmail.com",
  resume: "/resume.pdf",
  availableForWork: true,
  url: "https://mark-reduca-dev.vercel.app", // update after deploy / custom domain
  socials: [
    { label: "GitHub", href: "https://github.com/fannaaa-intel" },
    // { label: "LinkedIn", href: "" },  // TODO: add in a future update
  ],
};
```

### 5.2 Projects — `src/content/projects/*.mdx`

Collection schema (`src/content.config.ts`, using Zod):
`title, slug, fullName, summary, hook, tech: string[], role, year, featured: boolean, order: number, live?: url, repo?: url, cover?: image, coverAlt?: string, status: "Live" | "Completed" | "In development"`

(`fullName` = long name on the case study page; `hook` = italic serif sub-hook on cards, e.g. GovPulse — *public service, measured.*)

Before writing the Ledgerly and Palette case studies, **read the READMEs and source of their GitHub repos** (links below) so the feature lists are accurate. If a repo can't be reached, keep the drafts below and mark unconfirmed features with `{/* TODO: verify */}`.

---

#### P/01 — GovPulse ★ featured
- **Full name:** GovPulse — AI-Driven Mobile Analytics for Public Service Quality Prediction
- **Summary:** An AI-powered platform that turns citizen feedback into clear, predictive insights on public service quality.
- **Tech:** Flutter, Dart, Supabase, PostgreSQL
- **Role:** Full-stack developer (capstone project)
- **Live:** https://govpulse.aparri.org.ph/
- **Repo:** none (private), so hide the "Code" link
- **Status:** Live
- **Case study:**
  - *Problem:* Local government offices collect citizen feedback but have no easy way to measure or predict how well their services perform.
  - *Solution:* One Flutter codebase delivering both a citizen feedback app and an admin analytics dashboard, on mobile and web.
  - *What I built:*
    - Mobile and web apps in Flutter from a single codebase
    - Supabase backend: PostgreSQL schema, authentication and real-time data sync
    - AI-driven analytics that predict and rank public service quality from citizen feedback
  - *Outcome:* Deployed and live for public use at govpulse.aparri.org.ph.

#### P/02 — Ledgerly
> Verified against the repo in Step 3: it is an offline **Expo / React Native Android app** for OJT interns (in-app name "OJT Budget"), not a React web app. Tech and copy were corrected to match.
- **Full name:** Ledgerly — OJT Budget Tracker
- **Summary:** An offline budget app that shows OJT interns exactly where their allowance goes, from the daily commute to the total cost of their internship.
- **Tech:** React Native, Expo, TypeScript, SQLite
- **Role:** Solo developer
- **Repo:** https://github.com/fannaaa-intel/ojtBudgetTracker
- **Live:** none
- **Status:** Completed
- **Case study (draft, verify against the repo):**
  - *Problem:* Tracking spending in notebooks or spreadsheets is tedious, so people stop doing it.
  - *Solution:* A simple web app to log income and expenses, organize them by category, and see a clear summary at a glance.
  - *Features:* add / edit / delete transactions · categories · balance and spending summary · local persistence with SQLite

#### P/03 — Palette
- **Full name:** Palette — All-in-One Business Suite
- **Summary:** A complete desktop system that runs a paint store's sales, stock, purchasing and books in one place.
- **Tech:** VB.NET, MySQL
- **Role:** Freelance developer (built for a local business client)
- **Repo:** https://github.com/fannaaa-intel/PaintStore_POS
- **Live:** none (desktop app)
- **Status:** Completed
- **Case study:**
  - *Problem:* The client managed sales, stock, suppliers and accounting separately, which caused errors and wasted time.
  - *Solution:* One integrated desktop system with four connected modules:
    - **POS:** fast checkout, receipts, daily sales
    - **Inventory:** stock levels, product tracking, low-stock awareness
    - **Procurement:** suppliers and purchase orders
    - **Accounting:** transaction records and financial reports
  - *Outcome:* Delivered to and used by a local business client.

### 5.3 Case study page layout (`/projects/[slug]`)
Back link `← All projects` · mono meta row (Year · Role · Status) · title · summary · tech tags · Live/Code buttons · cover image (grayscale → color on hover) · MDX body with sections **Problem / Solution / What I built / Outcome** · "Next project →" link at the bottom.

---

## 6. Assets

Files are in `_assets/`. Move them during setup:

| From                          | To                                   | Use                                 |
|-------------------------------|--------------------------------------|-------------------------------------|
| `_assets/profile.jpg`         | `src/assets/profile.jpg`             | Hero photo (optimize with `<Image>`) |
| `_assets/Mark_Reduca_CV.pdf`  | `public/resume.pdf`                  | Download CV button                  |

Then delete `_assets/`.

**Project screenshots:** none yet. Create a placeholder for each card: a bordered box with the dot-grid pattern and the project name in mono. Add a commented `cover:` field to each MDX file so real screenshots can be dropped into `src/assets/projects/` later.

**Favicon:** generate a simple monochrome SVG favicon with the letters `MR` in mono, black on white (inverted in dark mode via `prefers-color-scheme` inside the SVG).

**OG image:** a static `public/og.png` (1200×630): black background, white name and title in mono, with a subtle grid.

---

## 7. SEO & Meta
- `<title>`: `Mark George B. Reduca — Full-Stack Developer`
- Description: `Full-stack developer from Cagayan, Philippines building web, mobile and business systems with React, Flutter, Supabase and VB.NET.`
- Open Graph and Twitter card tags, canonical URL, sitemap, `robots.txt`
- `lang="en"`, theme-color meta for both themes

---

## 8. Folder Structure (target)

```
mark-reduca-portfolio/
├─ public/
│  ├─ resume.pdf
│  ├─ favicon.svg
│  ├─ og.png
│  └─ apple-touch-icon.png
├─ src/
│  ├─ assets/
│  │  ├─ profile.jpg
│  │  └─ projects/            # future screenshots
│  ├─ components/
│  │  ├─ Nav.astro
│  │  ├─ ThemeToggle.astro
│  │  ├─ Hero.astro
│  │  ├─ SectionHeader.astro  # "01 / About" style
│  │  ├─ About.astro
│  │  ├─ Stack.astro
│  │  ├─ ProjectCard.astro
│  │  ├─ Projects.astro
│  │  ├─ Experience.astro
│  │  ├─ Contact.astro
│  │  ├─ Tag.astro
│  │  ├─ Asterisk.astro       # SVG drafting asterisk
│  │  ├─ Marquee.astro        # stack ticker
│  │  ├─ RotatingBadge.astro  # circular "available" badge
│  │  ├─ TechIcon.astro       # monochrome tech logo (simple-icons)
│  │  └─ Footer.astro
│  ├─ content/
│  │  └─ projects/
│  │     ├─ govpulse.mdx
│  │     ├─ ledgerly.mdx
│  │     └─ palette.mdx
│  ├─ content.config.ts
│  ├─ data/
│  │  └─ site.ts
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ 404.astro
│  │  ├─ robots.txt.ts         # generated from `site`, so the sitemap URL is always right
│  │  └─ projects/[slug].astro
│  └─ styles/
│     └─ global.css
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ README.md
└─ PLAN.md
```

---

## 9. Build Steps

Stop after each step, summarize what was done, and wait for my "next".

> **Deployment comes last.** Build and finish the whole site locally first (Steps 1–7). Only after everything is built and QA'd do we deploy to **Vercel** in Step 8. Don't push to GitHub or connect Vercel before then.

1. **Scaffold.** This folder already contains `PLAN.md` and `_assets/`. Scaffold Astro into the current folder (`npm create astro@latest .` with the minimal template, TypeScript strict). Keep both. Add Tailwind, MDX and sitemap. Initialize git. Confirm `npm run dev` works.
2. **Design system.** `global.css` with theme variables, fonts, grid background, base typography, focus styles and reduced-motion rules. Build `BaseLayout` with meta tags and a no-flash theme script, plus `ThemeToggle`.
3. **Data and content.** Create `site.ts`, the content collection schema and the three project MDX files (check the repos first for Ledgerly and Palette). Move the assets.
4. **Home page.** Nav, Hero, About, Stack, Projects, Experience, Contact and Footer, with all signature elements from section 3.
5. **Case study pages.** `/projects/[slug]` plus 404.
6. **Polish.** Scroll reveals, hover states, mobile menu, favicon, OG image, sitemap and robots.txt.
7. **QA.** Run `npm run build` with zero errors and zero TS warnings. Check at 360px, 768px and 1280px in both themes. Check keyboard navigation and reduced motion. Aim for 95+ on all Lighthouse scores.
8. **README and deploy.** Write a README covering the stack, running locally, how to edit `site.ts`, how to add a project and how to deploy. Then walk me through pushing to GitHub (**`https://github.com/fannaaa-intel/Portfolio.git`**) and importing it to Vercel as project **`mark-reduca-dev`** (→ `https://mark-reduca-dev.vercel.app`). Update `site.url` in `site.ts` and `site` in `astro.config.mjs` to the real Vercel URL.

---

## 10. Future Updates (not now)
- [x] Add LinkedIn to `socials` in `site.ts` (done 2026-11-14)
- [ ] Real project screenshots
- [ ] Custom domain (e.g. `markreduca.dev`)
- [ ] Contact form (Formspree or Resend)
- [ ] Blog section
- [ ] Privacy-friendly analytics (Umami or Plausible)
