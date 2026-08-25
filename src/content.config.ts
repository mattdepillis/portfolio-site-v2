import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { writingSchema } from './lib/writing';

const writing = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/writing',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx$/, ''),
  }),
  schema: writingSchema,
});

export const collections = { writing };
