import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

const DIST_DIR = join(import.meta.dirname, '..', '..', 'dist');

const PRIMARY_PAGES = [
  { file: 'index.html', name: 'homepage' },
  { file: 'writing/index.html', name: 'writing archive' },
  { file: 'writing/foundation-fixture/index.html', name: 'fixture essay' },
  { file: 'about/index.html', name: 'about' },
  { file: '404.html', name: '404' },
];

function runBuild() {
  try {
    execSync('pnpm build', { cwd: join(import.meta.dirname, '..', '..'), stdio: 'pipe' });
  } catch {
    // Build may have already been run
  }
}

function readFile(path: string): string {
  return readFileSync(join(DIST_DIR, path), 'utf-8');
}

function fileExists(path: string): boolean {
  return existsSync(join(DIST_DIR, path));
}

function loadHtml(path: string): cheerio.CheerioAPI {
  return cheerio.load(readFile(path));
}

beforeAll(() => {
  if (!existsSync(DIST_DIR)) {
    runBuild();
  }
});

describe('Route generation', () => {
  it('generates homepage', () => {
    expect(fileExists('index.html')).toBe(true);
  });

  it('generates writing archive', () => {
    expect(fileExists('writing/index.html')).toBe(true);
  });

  it('generates fixture essay detail', () => {
    expect(fileExists('writing/foundation-fixture/index.html')).toBe(true);
  });

  it('generates about page', () => {
    expect(fileExists('about/index.html')).toBe(true);
  });

  it('generates 404 page', () => {
    expect(fileExists('404.html')).toBe(true);
  });

  it('does not generate draft route', () => {
    expect(fileExists('writing/draft-fixture/index.html')).toBe(false);
  });
});

describe('Exactly one h1 per page', () => {
  for (const { file, name } of PRIMARY_PAGES) {
    it(`${name} has exactly one h1`, () => {
      const $ = loadHtml(file);
      const h1Count = $('h1').length;
      expect(h1Count).toBe(1);
    });
  }
});

describe('Required landmarks', () => {
  for (const { file, name } of PRIMARY_PAGES) {
    it(`${name} has main landmark`, () => {
      const $ = loadHtml(file);
      expect($('main').length).toBeGreaterThanOrEqual(1);
    });

    it(`${name} has nav landmark`, () => {
      const $ = loadHtml(file);
      expect($('nav').length).toBeGreaterThanOrEqual(1);
    });
  }
});

describe('Descriptive title and meta description', () => {
  for (const { file, name } of PRIMARY_PAGES) {
    it(`${name} has a non-empty title`, () => {
      const $ = loadHtml(file);
      const title = $('title').text().trim();
      expect(title.length).toBeGreaterThan(0);
    });

    it(`${name} has a meta description`, () => {
      const $ = loadHtml(file);
      const desc = $('meta[name="description"]').attr('content');
      expect(desc).toBeDefined();
      expect(desc!.length).toBeGreaterThan(0);
    });
  }
});

describe('Canonical URLs', () => {
  const canonicalRoutes: Array<{ file: string; path: string }> = [
    { file: 'index.html', path: '/' },
    { file: 'writing/index.html', path: '/writing/' },
    { file: 'writing/foundation-fixture/index.html', path: '/writing/foundation-fixture/' },
    { file: 'about/index.html', path: '/about/' },
  ];

  for (const { file, path } of canonicalRoutes) {
    it(`${file} has correct canonical URL`, () => {
      const $ = loadHtml(file);
      const canonical = $('link[rel="canonical"]').attr('href');
      expect(canonical).toBe(`https://mattdepillis.com${path}`);
    });
  }
});

describe('Internal navigation resolves to generated routes', () => {
  it('homepage links to writing archive and about', () => {
    const $ = loadHtml('index.html');
    const internalLinks = $('a[href^="/"]')
      .toArray()
      .map((el) => $(el).attr('href')!);
    expect(internalLinks).toContain('/writing/');
    expect(internalLinks).toContain('/about/');
  });

  it('writing archive links to fixture essay', () => {
    const $ = loadHtml('writing/index.html');
    const internalLinks = $('a[href^="/"]')
      .toArray()
      .map((el) => $(el).attr('href')!);
    expect(internalLinks).toContain('/writing/foundation-fixture/');
  });
});

describe('Draft exclusion', () => {
  it('draft title not in any HTML file', () => {
    const files = readdirSync(DIST_DIR, { recursive: true, withFileTypes: true })
      .filter((f) => f.isFile() && f.name.endsWith('.html'))
      .map((f) => join(f.parentPath ?? DIST_DIR, f.name));

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      expect(content).not.toContain('Draft Fixture — Should Not Appear');
      expect(content).not.toContain('draft-fixture');
    }
  });
});

describe('No client JavaScript', () => {
  for (const { file, name } of PRIMARY_PAGES) {
    it(`${name} has no script tags`, () => {
      const $ = loadHtml(file);
      expect($('script').length).toBe(0);
    });
  }
});

describe('No third-party resources', () => {
  const selfOrigin = 'mattdepillis.com';

  for (const { file, name } of PRIMARY_PAGES) {
    it(`${name} loads no external resources`, () => {
      const $ = loadHtml(file);

      $('script[src]').each((_, el) => {
        const src = $(el).attr('src') || '';
        expect(src).not.toMatch(/^https?:\/\//);
      });

      $('link[href]').each((_, el) => {
        const href = $(el).attr('href') || '';
        if (href.match(/^https?:\/\//)) {
          expect(href).toContain(selfOrigin);
        }
      });

      $('img[src]').each((_, el) => {
        const src = $(el).attr('src') || '';
        if (src.match(/^https?:\/\//)) {
          expect(src).toContain(selfOrigin);
        }
      });
    });
  }
});
