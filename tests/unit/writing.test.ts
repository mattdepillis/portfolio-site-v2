import { describe, it, expect } from 'vitest';
import {
  writingSchema,
  isPublished,
  sortByDate,
  writingPathFromSlug,
  canonicalUrl,
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
