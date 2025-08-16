import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      githubSlug: z.string().optional(),
      liveUrl: z.string().optional(),
      featured: z.boolean().default(false),
      publishedAt: z.date().optional(),
      image: image().optional(),
      archived: z.boolean().default(false),
    }),
});

export const collections = {
  projects: projectsCollection,
} as const;
