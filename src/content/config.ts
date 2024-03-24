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
  }),
});
const homepageCollection = defineCollection({});

export const collections = {
  pages: pageCollection,
  projects: projectCollection,
  homepage: homepageCollection,
};
