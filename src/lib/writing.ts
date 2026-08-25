import { z } from 'astro/zod';

export const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const writingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  publishedAt: z.coerce.date(),
  status: z.enum(['draft', 'published']),
  featured: z.boolean(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
  canonicalUrl: z.string().optional(),
  syndication: z
    .object({
      substack: z.boolean().optional(),
      twitter: z.boolean().optional(),
      linkedin: z.boolean().optional(),
    })
    .optional(),
});

export type WritingEntry = z.infer<typeof writingSchema>;

export function isPublished(entry: { data: WritingEntry }): boolean {
  return entry.data.status === 'published';
}

export function sortByDate<T extends { data: WritingEntry }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const dateA = a.data.publishedAt.getTime();
    const dateB = b.data.publishedAt.getTime();
    if (dateA !== dateB) return dateB - dateA;
    return a.data.title.localeCompare(b.data.title);
  });
}

export function writingPathFromSlug(slug: string): string {
  return `/writing/${slug}/`;
}

export function canonicalUrl(path: string): string {
  const base = 'https://mattdepillis.com';
  return `${base}${path}`;
}

export function isValidSlug(slug: string): boolean {
  return SAFE_SLUG_RE.test(slug) && !slug.includes('/');
}

export function validatePublishedSlugs<T extends { id: string; data: WritingEntry }>(
  entries: T[],
): T[] {
  const published = entries.filter(isPublished);
  const invalid = published.filter((e) => !isValidSlug(e.id));
  if (invalid.length > 0) {
    const ids = invalid.map((e) => `"${e.id}"`).join(', ');
    throw new Error(
      `Published essays have invalid slugs (must be single lowercase alphanumeric segments): ${ids}`,
    );
  }
  return entries;
}
