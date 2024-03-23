import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      thumbnail: image(),
      accent: z.string(),
    }),
});

export const collections = {
  projects: projectCollection,
};
