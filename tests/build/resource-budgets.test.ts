import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import budgets from './resource-budgets.json';

const DIST_DIR = join(import.meta.dirname, '..', '..', 'dist');

function runBuild() {
  try {
    execSync('pnpm build', { cwd: join(import.meta.dirname, '..', '..'), stdio: 'pipe' });
  } catch {
    // Build may have already been run
  }
}

function getFiles(dir: string, ext: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith(ext))
    .map((f) => join(f.parentPath ?? dir, f.name));
}

function getTotalBytes(files: string[]): number {
  return files.reduce((sum, f) => sum + statSync(f).size, 0);
}

beforeAll(() => {
  if (!existsSync(DIST_DIR)) {
    runBuild();
  }
});

describe('Resource budgets', () => {
  it('HTML file count within budget', () => {
    const htmlFiles = getFiles(DIST_DIR, '.html');
    expect(htmlFiles.length).toBeLessThanOrEqual(budgets.maxHtmlFiles);
  });

  it('HTML total size within budget', () => {
    const htmlFiles = getFiles(DIST_DIR, '.html');
    const totalBytes = getTotalBytes(htmlFiles);
    expect(totalBytes).toBeLessThanOrEqual(budgets.maxTotalHtmlBytes);
  });

  it('no CSS files in foundation build', () => {
    const cssFiles = getFiles(DIST_DIR, '.css');
    expect(cssFiles.length).toBe(0);
  });

  it('no JavaScript files in foundation build', () => {
    const jsFiles = getFiles(DIST_DIR, '.js');
    expect(jsFiles.length).toBe(0);
  });

  it('no font files', () => {
    const fontExtensions = ['.woff', '.woff2', '.ttf', '.otf', '.eot'];
    for (const ext of fontExtensions) {
      const files = getFiles(DIST_DIR, ext);
      expect(files.length).toBe(0);
    }
  });

  it('no image files', () => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
    for (const ext of imageExtensions) {
      const files = getFiles(DIST_DIR, ext);
      expect(files.length).toBe(0);
    }
  });
});
