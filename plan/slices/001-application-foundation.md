# Slice 001: Application Foundation

## Status

Proposed for implementation after review and merge of this plan.

## Goal

Create an independent, production-buildable Astro foundation that proves the v2 architecture and verification loop before visual-system work begins.

The slice should answer four questions:

1. Can the publication build as static HTML from a clean checkout?
2. Can typed MDX content generate the intended route structure?
3. Can local and CI checks catch broken content, missing routes, unwanted JavaScript, and missing semantic page structure?
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
  fixtures/
  unit/
```

Place Vitest tests in `tests/unit/` and generated-output assertions in `tests/build/`. Add `tests/e2e/` in Stage 2 when browser automation becomes useful. Avoid placeholder folders that have no owner or immediate use.

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

Include one clearly labeled, non-production fixture essay that exercises the real collection and detail route without pretending to be the first real article. Retire or replace the fixture as part of Stage 3 when the first real essay lands; production deployment remains a final backstop, not the intended removal point.

### Tooling

Establish only the tools needed for the verification contract:

- Astro diagnostics
- formatter
- linter where it adds checks not already covered by formatting/type diagnostics
- Vitest

Dependency versions must be explicit and current at implementation time. The implementation PR should justify overlapping tools and omit any that do not yet provide distinct value.

Do not install Playwright, `@axe-core/playwright`, or Lighthouse for this slice. Stage 2 introduces browser and automated accessibility coverage once there is styled navigation and a meaningful visual system to verify. Stage 3 introduces Lighthouse after a real essay, typography, and images create a representative performance target.

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
- confirmation that `pnpm verify` is the complete Stage 1 local and CI gate

### Continuous integration

Add one understandable GitHub Actions workflow for pull requests and main-branch pushes.

Required blocking gates:

- frozen dependency install
- formatting/lint/type diagnostics
- unit and content-contract tests
- production build
- generated-output tests
- deterministic resource-budget assertions

Do not install browsers or collect Lighthouse results in the foundation workflow. Those checks enter CI only in the later stages that introduce the corresponding user-facing risks.

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

### Manual browser and semantic checks

Start the local production preview and manually verify:

- every primary route and the fixture detail route load
- navigation reaches the expected destinations
- the fixture essay title and metadata are visible
- a representative phone-width viewport does not produce obvious horizontal overflow

Use generated-output tests to assert descriptive document titles, semantic landmarks, and a clear page-level heading. Automated Playwright, axe, keyboard-flow, and visual-regression coverage begins in Stage 2 after real navigation and styling exist.

### Deterministic resource baseline

Against the static build:

- record resource counts and transfer sizes for HTML, CSS, JavaScript, fonts, and images
- assert zero third-party requests
- assert no client JavaScript on base pages unless Astro requires a documented minimal runtime
- convert stable resource limits into CI failures

Do not collect Lighthouse scores against unstyled scaffolding. Stage 3 establishes timing and category-score baselines against real essay content and representative visual assets.

## Expected files

Likely additions or changes include:

- `package.json`
- `pnpm-lock.yaml`
- package-manager and Node version metadata
- `astro.config.*`
- `tsconfig.json`
- formatter/linter configuration
- Vitest configuration
- deterministic resource-budget configuration or assertions
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
- Playwright or browser-automation dependencies
- automated axe accessibility scans
- Lighthouse installation, score tracking, or timing budgets
- broad cross-browser visual regression coverage
- a CMS or remote-content loader

## Risks and open questions

- Supported Astro, Node, pnpm, MDX, and Vitest versions must be verified against current official documentation during implementation.
- Exact resource byte budgets cannot be selected responsibly until a clean static build exists and its output has been measured.
- Astro's current content-collection and MDX conventions may change the proposed filenames or slug implementation; material differences should be documented in the implementation PR.
- The fixture must exercise the real content path without being mistaken for a publishable essay, and Stage 3 must explicitly remove or replace it.
- Formatter and linter choices may overlap with Astro diagnostics; add a separate tool only where it provides meaningful additional coverage.
- Browser automation and automated accessibility scans are intentionally deferred until Stage 2; manual preview checks and semantic build assertions are the accepted temporary coverage boundary.
- Lighthouse is intentionally deferred until Stage 3 because an unstyled fixture page is not a representative performance target.

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
- `pnpm verify` represents the complete required Stage 1 local and CI gate
- generated-output tests exercise the production build
- the clean baseline has documented deterministic resource measurements
- all four primary routes and the fixture detail route work locally
- invalid content produces a clear failure
- no core content depends on client JavaScript
- no v1 or Notion dependency exists
- README authoring/development instructions are accurate from a clean checkout
- the PR documents intentionally deferred browser/accessibility/performance automation and residual risks

## Review focus

Reviewers should pay particular attention to:

- whether the dependency graph is larger than the behavior warrants
- whether tests exercise production output instead of only helpers
- whether fixture content can leak into the public publication
- whether CI and local commands behave the same way
- whether JavaScript/resource assertions are deterministic
- whether any legacy coupling has entered through convenience shortcuts
- whether this slice accidentally makes visual or publishing decisions reserved for later work
