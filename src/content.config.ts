import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { icons } from "@lucide/svelte";

const blog = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    icon: z.enum(Object.keys(icons) as [string, ...string[]]).optional(),
  }),
});
export const collections = { blog };
