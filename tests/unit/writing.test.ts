import { describe, it, expect } from 'vitest';
import {
  writingSchema,
  isPublished,
  sortByDate,
  writingPathFromSlug,
  canonicalUrl,
  isValidSlug,
  validatePublishedSlugs,
  type WritingEntry,
} from '../../src/lib/writing';

function makeEntry(overrides: Partial<WritingEntry> = {}): { data: WritingEntry } {
  return {
    data: {
      title: 'Test Title',
      description: 'Test description',
      publishedAt: new Date('2025-01-15'),
      status: 'published',
      featured: false,
      ...overrides,
    },
  };
}

describe('writingSchema', () => {
  it('accepts valid metadata', () => {
    const result = writingSchema.safeParse({
      title: 'Valid Title',
      description: 'Valid description',
      publishedAt: '2025-01-15',
      status: 'published',
      featured: false,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty title', () => {
    const result = writingSchema.safeParse({
      title: '',
      description: 'Valid description',
      publishedAt: '2025-01-15',
      status: 'published',
      featured: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty description', () => {
    const result = writingSchema.safeParse({
      title: 'Valid Title',
      description: '',
      publishedAt: '2025-01-15',
      status: 'published',
      featured: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid date', () => {
    const result = writingSchema.safeParse({
      title: 'Valid Title',
      description: 'Valid description',
      publishedAt: 'not-a-date',
      status: 'published',
      featured: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects unsupported status', () => {
    const result = writingSchema.safeParse({
      title: 'Valid Title',
      description: 'Valid description',
      publishedAt: '2025-01-15',
      status: 'archived',
      featured: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing featured field', () => {
    const result = writingSchema.safeParse({
      title: 'Valid Title',
      description: 'Valid description',
      publishedAt: '2025-01-15',
      status: 'published',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional fields', () => {
    const result = writingSchema.safeParse({
      title: 'Valid Title',
      description: 'Valid description',
      publishedAt: '2025-01-15',
      status: 'published',
      featured: false,
      updatedAt: '2025-02-01',
      tags: ['technology', 'writing'],
    });
    expect(result.success).toBe(true);
  });
});

describe('isPublished', () => {
  it('returns true for published entries', () => {
    expect(isPublished(makeEntry({ status: 'published' }))).toBe(true);
  });

  it('returns false for draft entries', () => {
    expect(isPublished(makeEntry({ status: 'draft' }))).toBe(false);
  });
});

describe('sortByDate', () => {
  it('sorts by publishedAt descending', () => {
    const entries = [
      makeEntry({ publishedAt: new Date('2025-01-01'), title: 'First' }),
      makeEntry({ publishedAt: new Date('2025-03-01'), title: 'Third' }),
      makeEntry({ publishedAt: new Date('2025-02-01'), title: 'Second' }),
    ];
    const sorted = sortByDate(entries);
    expect(sorted[0].data.title).toBe('Third');
    expect(sorted[1].data.title).toBe('Second');
    expect(sorted[2].data.title).toBe('First');
  });

  it('uses title as tiebreaker for same date', () => {
    const entries = [
      makeEntry({ publishedAt: new Date('2025-01-01'), title: 'Bravo' }),
      makeEntry({ publishedAt: new Date('2025-01-01'), title: 'Alpha' }),
    ];
    const sorted = sortByDate(entries);
    expect(sorted[0].data.title).toBe('Alpha');
    expect(sorted[1].data.title).toBe('Bravo');
  });
});

describe('writingPathFromSlug', () => {
  it('generates correct path', () => {
    expect(writingPathFromSlug('foundation-fixture')).toBe('/writing/foundation-fixture/');
  });
});

describe('canonicalUrl', () => {
  it('generates correct canonical URL', () => {
    expect(canonicalUrl('/writing/test/')).toBe('https://mattdepillis.com/writing/test/');
  });
});

describe('isValidSlug', () => {
  it('accepts simple slug', () => {
    expect(isValidSlug('my-essay')).toBe(true);
  });

  it('accepts single word', () => {
    expect(isValidSlug('essay')).toBe(true);
  });

  it('accepts slug with numbers', () => {
    expect(isValidSlug('post-42')).toBe(true);
  });

  it('rejects nested path', () => {
    expect(isValidSlug('topic/example')).toBe(false);
  });

  it('rejects traversal attempt', () => {
    expect(isValidSlug('../secret')).toBe(false);
  });

  it('rejects absolute path', () => {
    expect(isValidSlug('/etc/passwd')).toBe(false);
  });

  it('rejects uppercase letters', () => {
    expect(isValidSlug('My-Essay')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidSlug('')).toBe(false);
  });

  it('rejects slug with spaces', () => {
    expect(isValidSlug('my essay')).toBe(false);
  });

  it('rejects slug with special characters', () => {
    expect(isValidSlug('my_essay')).toBe(false);
  });

  it('rejects slug starting with hyphen', () => {
    expect(isValidSlug('-essay')).toBe(false);
  });

  it('rejects slug ending with hyphen', () => {
    expect(isValidSlug('essay-')).toBe(false);
  });
});

describe('validatePublishedSlugs', () => {
  it('passes when all published slugs are valid', () => {
    const entries = [
      { id: 'my-essay', data: { ...makeEntry().data, status: 'published' as const } },
      { id: 'another-post', data: { ...makeEntry().data, status: 'published' as const } },
    ];
    expect(() => validatePublishedSlugs(entries)).not.toThrow();
  });

  it('ignores draft entries with invalid slugs', () => {
    const entries = [
      { id: 'valid-slug', data: { ...makeEntry().data, status: 'published' as const } },
      { id: 'bad/slug', data: { ...makeEntry().data, status: 'draft' as const } },
    ];
    expect(() => validatePublishedSlugs(entries)).not.toThrow();
  });

  it('throws on published entry with nested slug', () => {
    const entries = [
      { id: 'topic/example', data: { ...makeEntry().data, status: 'published' as const } },
    ];
    expect(() => validatePublishedSlugs(entries)).toThrow(/invalid slugs/);
    expect(() => validatePublishedSlugs(entries)).toThrow('topic/example');
  });

  it('throws on published entry with traversal slug', () => {
    const entries = [
      { id: '../secret', data: { ...makeEntry().data, status: 'published' as const } },
    ];
    expect(() => validatePublishedSlugs(entries)).toThrow(/invalid slugs/);
  });

  it('reports all invalid slugs in error message', () => {
    const entries = [
      { id: 'bad/one', data: { ...makeEntry().data, status: 'published' as const } },
      { id: 'bad/two', data: { ...makeEntry().data, status: 'published' as const } },
    ];
    expect(() => validatePublishedSlugs(entries)).toThrow('bad/one');
    expect(() => validatePublishedSlugs(entries)).toThrow('bad/two');
  });

  it('returns the original entries array', () => {
    const entries = [
      { id: 'good-slug', data: { ...makeEntry().data, status: 'published' as const } },
    ];
    expect(validatePublishedSlugs(entries)).toBe(entries);
  });
});
