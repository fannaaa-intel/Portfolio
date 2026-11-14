# Mark George B. Reduca — Portfolio

Personal portfolio of **Mark George B. Reduca**, a full-stack developer from Cagayan, Philippines.
A fast, minimalist, monochrome site with a "drafting table" look: thin borders, crop marks,
dimension lines, outlined numerals and italic serif "hook" words mixed into sans headlines.

**Live:** https://mark-reduca-portfolio.vercel.app (planned address, confirmed after the first Vercel deploy)

## Stack

| Layer     | Choice                                                                   |
| --------- | ------------------------------------------------------------------------ |
| Framework | [Astro](https://astro.build) 7 + TypeScript (strict)                     |
| Styling   | Tailwind CSS v4, hand-built components, no UI libraries                  |
| Content   | MDX content collection for project case studies                         |
| Fonts     | Geist, Geist Mono, Fraunces Italic (self-hosted via Fontsource)          |
| Icons     | Inline SVG; monochrome tech logos from [Simple Icons](https://simpleicons.org) (CC0) |
| SEO       | `@astrojs/sitemap`, Open Graph / Twitter tags, generated `robots.txt`    |
| Hosting   | Vercel (auto-deploys on every push to `main`)                            |

Client-side JavaScript is limited to small vanilla scripts: theme toggle, mobile menu,
scroll reveal, active-section highlight and copy-email.

## Run it locally

Requires **Node.js 22.23.4 or newer** (see `engines` in `package.json`; developed on Node 26).

```bash
npm install
npm run dev       # http://localhost:4321
```

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload                |
| `npm run build`   | Build the static site into `dist/`                  |
| `npm run preview` | Serve the built `dist/` locally                     |
| `npm run check`   | Type-check all `.astro` / `.ts` files               |

## Edit your details — `src/data/site.ts`

All personal content lives in **`src/data/site.ts`**, so you never need to touch the layout.

- `site`: name, title, tagline, intro, email, location, availability, social links and the site `url`
- `about`: section title, paragraphs and the facts list
- `stack`: tool groups shown as logo tiles and in the scrolling ticker
- `experience`: timeline entries
- `contact`: heading and line

**Hook words:** wrap a word in `*asterisks*` to render it in italic Fraunces, e.g.
`"Build what *lasts*."`

**Social links:** add an entry to `socials` (e.g. LinkedIn) and it appears in the contact section.

**Site URL:** `site.url` is the single source for canonical links, Open Graph tags, the sitemap
and `robots.txt` (`astro.config.mjs` reads it). Update it if the domain changes.

**Tech logos:** names in `stack` are matched to logos in `src/lib/techIcons.ts`. A name with no
logo gets a solid square with its name knocked out (like C#).

## Add a project

1. Create `src/content/projects/<slug>.mdx`:

   ```mdx
   ---
   title: MyApp
   slug: myapp
   fullName: MyApp — What It Is
   summary: One sentence for cards and search results.
   hook: short italic tagline.
   tech: [React, Supabase]
   role: Solo developer
   year: 2026
   featured: false
   order: 4            # position on the page and the P/04 index
   live: https://example.com          # optional
   repo: https://github.com/you/myapp # optional
   # cover: ../../assets/projects/myapp.png
   # coverAlt: MyApp dashboard
   status: Completed   # Live | Completed | In development
   ---

   ## Problem
   ...

   ## Solution
   ...

   ## What I built
   - ...

   ## Outcome
   ...
   ```

2. The card on the home page and the `/projects/myapp` case study are generated automatically.
   `npm run check` validates the frontmatter against the schema in `src/content.config.ts`.

**Screenshots:** drop an image into `src/assets/projects/` and uncomment `cover` / `coverAlt`.
Without a cover, the card shows a dot-grid placeholder. Images are optimized at build time and
shown in grayscale until hovered.

Only one project should have `featured: true`; it gets the full-width card.

## Other assets

| File                          | Purpose                                          |
| ----------------------------- | ------------------------------------------------ |
| `src/assets/profile.jpg`      | Hero photo (optimized to WebP at build time)     |
| `public/resume.pdf`           | "Download CV" button: replace to update the CV   |
| `public/favicon.svg`          | "MR" favicon, auto-inverts in dark mode          |
| `public/apple-touch-icon.png` | iOS home-screen icon (180×180)                   |
| `public/og.png`               | Social share image (1200×630). It is static, so regenerate it if the name, title or tagline changes |

## Deploy (Vercel)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Vercel detects **Astro** automatically (build `npm run build`, output `dist`). Click **Deploy**.
4. Every push to `main` redeploys. Pull requests get preview URLs.
5. If the final URL differs from `site.url`, update it in `src/data/site.ts` and push.

**Custom domain:** Vercel project → **Settings → Domains** → add the domain, follow the DNS
instructions, then update `site.url`.

## Accessibility & performance

- Light / dark theme follows the system and is saved per visitor, with no flash on load
- Respects `prefers-reduced-motion` (all animation off)
- Keyboard navigable with visible focus rings and a skip link
- WCAG AA contrast in both themes; verified with axe-core (0 violations)
- Lighthouse: 98–100 on mobile, 100 on desktop

## License

© Mark George B. Reduca. All rights reserved. No open-source license has been chosen yet.
The personal content (text, photo and CV) is not for reuse.
