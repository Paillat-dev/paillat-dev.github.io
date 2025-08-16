import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    githubSlug: z.string().optional(),
    liveUrl: z.string().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date().optional(),
    image: z.string().optional(),
    archived: z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectsCollection,
} as const;