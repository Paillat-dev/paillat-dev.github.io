import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      languages: z.array(z.string()).default([]),
      platforms: z.array(z.string()).default([]),
      archived: z.boolean().default(false),
      githubSlug: z.string().optional(),
      liveUrl: z.string().optional(),
      featured: z.boolean().default(false),
      publishedAt: z.date().optional(),
      image: image().optional(),
    }),
});

export const collections = {
  projects: projectsCollection,
} as const;
