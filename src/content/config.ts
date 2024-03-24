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
  type: "data",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  pages: pageCollection,
  projects: projectCollection,
};
