import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      thumbnail: image().optional(),
      accent: z.string(),
    }),
});

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishStatus: z.optional(z.string()),
  }),
});
const homepageCollection = defineCollection({});
const projectGroupCollection = defineCollection({
  schema: z.object({
    discriminant: z.string(),
    value: z.array(z.string()),
  }),
});
export const collections = {
  pages: pageCollection,
  projects: projectCollection,
  homepage: homepageCollection,
  portfolioGroups: projectGroupCollection,
};
