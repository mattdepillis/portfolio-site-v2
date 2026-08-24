# Slice 001: Application Foundation

## Status

Proposed for implementation after review and merge of this plan.

## Goal

Create an independent, production-buildable Astro foundation that proves the v2 architecture and verification loop before visual-system work begins.

The slice should answer four questions:

1. Can the publication build as static HTML from a clean checkout?
2. Can typed MDX content generate the intended route structure?
3. Can local and CI checks catch broken content, missing routes, unwanted JavaScript, and basic accessibility regressions?
4. Can a contributor preview and verify the site without any dependency on v1 or Notion?

## Product orientation

The repository is building a fast, writing-first personal publication. The current wedge is a reliable essay-authoring and reading foundation. This slice does not attempt to establish the finished brand, homepage composition, portrait treatment, or first real essay.

## Scope

### Application scaffold

- Astro in static-output mode
- TypeScript with strict diagnostics
- pnpm with pinned package-manager metadata and frozen lockfile behavior
- pinned supported Node major version documented in the repository
- minimal project configuration
- no React integration until an actual interactive component requires it

### Source structure

Target structure, subject to small implementation refinements:

```text
src/
  components/
  content.config.ts
  content/
    writing/
  layouts/
  pages/
    index.astro
    about.astro
    writing/
      index.astro
      [slug].astro
  styles/
tests/
  build/
  e2e/
  fixtures/
```

Avoid placeholder folders that have no owner or immediate use.

### Routes

Establish minimal semantic versions of:

- `/`
- `/writing`
- `/writing/[slug]`
- `/about`
- a not-found route or behavior appropriate to the static output

Pages should contain enough real structure for testing, but styling should remain intentionally minimal. The visual-system slice owns polished tokens, typography, navigation composition, themes, and portrait work.

### Content collection

Define a typed writing collection supporting MDX.

Initial required metadata:

- `title`
- `description`
- `publishedAt`
- `status`
- `featured`

Optional metadata:

- `updatedAt`
- `tags`
- `cover`
- `canonicalUrl`
- `syndication`

Use a narrow status model sufficient for the current workflow, such as `draft` and `published`. Directory-derived stable slugs are preferred unless implementation evidence favors an explicit field.

Include one clearly labeled, non-production fixture essay that exercises the real collection and detail route without pretending to be the first real article. This slice does not deploy publicly; removing or replacing the fixture is a prerequisite for the later deployment slice.

### Tooling

Establish only the tools needed for the verification contract:

- Astro diagnostics
- formatter
- linter where it adds checks not already covered by formatting/type diagnostics
- Vitest
- Playwright
- `@axe-core/playwright`
- Lighthouse CI or an equivalent local Lighthouse command for baseline collection

Dependency versions must be explicit and current at implementation time. The implementation PR should justify overlapping tools and omit any that do not yet provide distinct value.

### Developer workflow

Document:

- prerequisites
- install command
- local development command
- production build and preview commands
- deterministic verification command
- focused test commands
- where content and fixtures live
- confirmation that no v1 repository or Notion configuration is required
- distinction between `pnpm verify`, `pnpm verify:browser`, `pnpm verify:all`, and the non-blocking initial performance command

### Continuous integration

Add one understandable GitHub Actions workflow for pull requests and main-branch pushes.

Required blocking gates:

- frozen dependency install
- formatting/lint/type diagnostics
- unit and content-contract tests
- production build
- generated-output tests
- initial Chromium Playwright smoke/accessibility suite
- deterministic resource-budget assertions

Lighthouse timing scores may be reported rather than blocking until runner variance is measured. Do not upload reports to a public third-party service by default.

## Testing plan

The durable rules live in [testing-rules.md](../testing-rules.md). This slice implements their first useful subset.

### Unit and content contract

Verify:

- valid fixture metadata passes
- missing required metadata fails
- unsupported status fails
- published filtering excludes drafts
- chronological ordering is deterministic
- slug/path generation is stable

Prefer direct tests of real exported logic. Do not duplicate Astro internals in test-only code.

### Production output

After `astro build`, verify:

- expected HTML files exist for all primary routes and the fixture essay
- generated pages include titles, descriptions, canonical-path inputs, and semantic headings
- draft content does not generate a public detail page or archive entry
- the foundation fixture is visibly identified as test content
- navigation targets generated routes
- core page text exists in HTML without executing JavaScript
- base pages do not reference unexpected page JavaScript bundles

### Browser smoke and accessibility

Run Playwright against the production preview.

Desktop Chromium:

- visit every primary route
- follow top-level navigation links
- verify the fixture essay content and metadata
- assert no unexpected console errors
- run axe on every primary route

Mobile Chromium:

- repeat route availability and primary navigation checks at one representative phone viewport
- verify the document does not create horizontal page overflow

Keyboard:

- tab through top-level links in logical order
- verify focused links can be activated

Do not add visual snapshots until the visual system is intentional.

### Performance baseline

Against the static build:

- record resource counts and transfer sizes for HTML, CSS, JavaScript, fonts, and images
- assert zero third-party requests
- assert no client JavaScript on base pages unless Astro requires a documented minimal runtime
- run multiple Lighthouse collections for `/`, `/writing`, and the fixture essay
- record median/range rather than treating one run as truth
- convert stable resource limits into CI failures
- document which Lighthouse assertions remain informational and why

## Expected files

Likely additions or changes include:

- `package.json`
- `pnpm-lock.yaml`
- package-manager and Node version metadata
- `astro.config.*`
- `tsconfig.json`
- formatter/linter configuration
- Vitest configuration
- Playwright configuration
- Lighthouse configuration and resource budget
- `.github/workflows/ci.yml`
- `src/**`
- `tests/**`
- `.gitignore`
- root `README.md`
- planning status updates after implementation

The implementation plan may refine exact filenames, but it should explain material deviations.

## Non-goals

- importing or refactoring v1 code
- copying the v1 portrait or other assets
- Notion integration
- production deployment or DNS changes
- final color, typography, spacing, theme, or navigation design
- React or another client framework without a demonstrated need
- interactive charts or essay components
- the first real essay draft
- RSS, sitemap, social-image generation, or syndication tooling
- broad cross-browser visual regression coverage
- a CMS or remote-content loader

## Independence acceptance criteria

- a clean checkout of v2 installs, builds, and tests without v1 present
- repository search finds no runtime/test path references to `personal-portfolio-site`
- repository search finds no `react-notion-x`, Notion API, or v1 environment dependency
- CI uses only the v2 checkout
- test fixtures and generated output live entirely inside v2 ignored or tracked paths as appropriate

## Merge criteria

The implementation PR is merge-ready when:

- all required deterministic commands pass locally
- required GitHub Actions checks pass
- `pnpm verify:all` represents the complete required local and CI gate
- production-output and Playwright suites exercise the built site
- the clean baseline has documented resource and Lighthouse measurements
- all four primary routes and the fixture detail route work locally
- invalid content produces a clear failure
- no core content depends on client JavaScript
- no v1 or Notion dependency exists
- README authoring/development instructions are accurate from a clean checkout
- the PR documents skipped checks, observed variance, and residual risks

## Review focus

Reviewers should pay particular attention to:

- whether the dependency graph is larger than the behavior warrants
- whether tests exercise production output instead of only helpers
- whether fixture content can leak into the public publication
- whether CI and local commands behave the same way
- whether JavaScript/resource assertions are deterministic
- whether any legacy coupling has entered through convenience shortcuts
- whether this slice accidentally makes visual or publishing decisions reserved for later work
