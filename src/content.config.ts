import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      /** Short name shown on cards, e.g. "GovPulse" */
      title: z.string(),
      /** URL segment: /projects/<slug> */
      slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and dashes only"),
      /** Long name for the case study page */
      fullName: z.string(),
      /** One-liner for cards and meta descriptions */
      summary: z.string(),
      /** Italic serif sub-hook on cards, e.g. "public service, measured." */
      hook: z.string(),
      tech: z.array(z.string()).min(1),
      role: z.string(),
      year: z.number().int().min(2000).max(2100),
      featured: z.boolean().default(false),
      /** Lower numbers come first; also used for the P/01 index */
      order: z.number().int().positive(),
      live: z.url().optional(),
      repo: z.url().optional(),
      /** Screenshot in src/assets/projects/. Omit to show the dot-grid placeholder. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Extra screenshots shown as a strip on the case study page (phone screens work best). */
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .optional(),
      /** Demo video served from public/, e.g. "/videos/ledgerly-demo.mp4". */
      video: z
        .object({
          src: z.string().startsWith("/"),
          poster: z.string().startsWith("/"),
          orientation: z.enum(["portrait", "landscape"]).default("landscape"),
          /** Shown as a label, e.g. "1:14" */
          duration: z.string().optional(),
          description: z.string().optional(),
          /** Clickable chapter list; `at` is "m:ss" */
          chapters: z
            .array(z.object({ at: z.string().regex(/^\d+:[0-5]\d$/, 'use "m:ss"'), label: z.string() }))
            .optional(),
        })
        .optional(),
      status: z.enum(["Live", "Completed", "In development"]),
    }),
});

export const collections = { projects };
