import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      thumbnail: image().optional(),
      accent: z.string(),
    }),
});
/* 
customNavigation:
  discriminant: true
  value:
    - title: some projects
      subItems: custom-group
    - title: All Projects */
const pageCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishStatus: z.optional(z.string()),
    customNavigation: z.discriminatedUnion("discriminant", [
      z.object({ discriminant: z.literal(false), value: z.string() }),
      z.object({
        discriminant: z.literal(true),
        value: z.array(z.object({ title: z.string(), subItems: z.string() })),
      }),
    ]),
  }),
});
const homepageCollection = defineCollection({});
const projectGroupCollection = defineCollection({
  schema: z.object({
    projectSource: z.discriminatedUnion("discriminant", [
      z.object({ discriminant: z.literal("all"), value: z.string() }),
      z.object({
        discriminant: z.literal("selected"),
        value: z.array(z.string()),
      }),
    ]),
  }),
});
export const collections = {
  pages: pageCollection,
  projects: projectCollection,
  homepage: homepageCollection,
  portfolioGroups: projectGroupCollection,
};
