import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = join(import.meta.dirname, '..', '..', 'dist');

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

describe('Page content', () => {
  it('homepage contains title and heading', () => {
    const html = readFile('index.html');
    expect(html).toContain('<title>');
    expect(html).toContain('<h1>');
    expect(html).toContain('Matt DePillis');
  });

  it('writing archive lists published entries', () => {
    const html = readFile('writing/index.html');
    expect(html).toContain('Foundation Fixture');
    expect(html).toContain('/writing/foundation-fixture/');
  });

  it('fixture essay renders content', () => {
    const html = readFile('writing/foundation-fixture/index.html');
    expect(html).toContain('Foundation Fixture');
    expect(html).toContain('test fixture');
    expect(html).toContain('<article>');
  });

  it('about page contains heading', () => {
    const html = readFile('about/index.html');
    expect(html).toContain('<h1>About</h1>');
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

describe('Semantic HTML', () => {
  it('pages have main landmark', () => {
    const html = readFile('index.html');
    expect(html).toContain('<main');
  });

  it('pages have nav landmark', () => {
    const html = readFile('index.html');
    expect(html).toContain('<nav');
  });

  it('pages have descriptive title', () => {
    const html = readFile('index.html');
    expect(html).toMatch(/<title>[^<]+<\/title>/);
  });

  it('pages have canonical URL', () => {
    const html = readFile('index.html');
    expect(html).toContain('https://mattdepillis.com');
  });
});

describe('No client JavaScript', () => {
  it('base pages contain no script tags', () => {
    const pages = ['index.html', 'writing/index.html', 'about/index.html', '404.html'];
    for (const page of pages) {
      const html = readFile(page);
      expect(html).not.toMatch(/<script[^>]*>/);
    }
  });
});

describe('No third-party resources', () => {
  it('no external origins in loaded resources', () => {
    const pages = [
      'index.html',
      'writing/index.html',
      'writing/foundation-fixture/index.html',
      'about/index.html',
    ];
    for (const page of pages) {
      const html = readFile(page);
      // Check for resource-loading attributes (script src, link href, img src, etc.)
      // but allow editorial hyperlinks (a href) which are reader-clicked links
      const externalSrcPattern = /src="https?:\/\/(?!mattdepillis\.com)/g;
      const externalLinkPattern = /<link[^>]+href="https?:\/\/(?!mattdepillis\.com)/g;
      expect(html).not.toMatch(externalSrcPattern);
      expect(html).not.toMatch(externalLinkPattern);
    }
  });
});
