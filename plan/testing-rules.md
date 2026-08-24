# Testing Rules

## Purpose

This document defines the durable verification strategy for `portfolio-site-v2`.

Testing should keep the publication trustworthy without turning a small static site into a test-infrastructure project. The strategy favors deterministic checks, production-build behavior, and representative browser flows.

## Independence from v1

V2 must build and test from a clean checkout without access to `personal-portfolio-site`.

The legacy repository may be inspected by humans and agents as a visual or content reference, but v2 must not:

- import source code, dependencies, configuration, or generated output from v1
- call a running v1 server in tests
- read v1 files through relative or absolute filesystem paths
- rely on Notion credentials, Notion APIs, or legacy environment variables
- compare screenshots against a running v1 instance as a correctness requirement
- require the two repositories to be sibling directories

Assets intentionally carried forward, such as the portrait, must be copied into v2 with clear provenance and then treated as v2-owned inputs. That transfer belongs to the visual-system slice, not the application-foundation slice.

## Test layers

### 1. Static quality checks

Run on every pull request:

- formatting check
- linting
- `astro check` for Astro and TypeScript diagnostics
- dependency lockfile consistency
- production build

These checks should be fast, deterministic, and runnable through a single local verification command.

### 2. Unit tests

Use Vitest for pure logic that has meaningful behavior, including:

- publication-state filtering
- chronological and featured ordering
- canonical URL construction
- reading-time or derived metadata logic, if introduced
- syndication transformations in the later publishing slice

Do not unit-test static markup merely to increase test counts. Prefer browser or build-output assertions for rendered behavior.

### 3. Content-contract tests

The content schema is part of the product contract.

Verify that:

- valid essay metadata is accepted
- required fields are enforced
- invalid dates and unsupported status values fail clearly
- drafts do not appear in production collections
- published entries produce stable slugs and canonical paths
- duplicate slugs or other ambiguous identifiers fail the build

Prefer exercising the real schema and content loader. Extract pure schema helpers only when doing so improves clarity rather than creating an artificial testing seam.

### 4. Production-build tests

Tests must exercise `astro build`, not only the development server.

Inspect the generated `dist/` output to verify:

- expected routes exist
- the fixture essay is statically generated
- primary pages contain usable HTML before JavaScript executes
- base pages do not emit unexpected page-level JavaScript bundles
- internal links resolve to generated routes
- required metadata is present
- draft content is absent
- the tracked foundation fixture is clearly identified and cannot be mistaken for a real essay

Generated-output checks should parse HTML rather than depend on brittle whitespace snapshots.

### 5. Browser tests

Use Playwright against the local production preview, started automatically by the test configuration.

The foundation suite should cover Chromium at representative desktop and mobile viewports. Add WebKit and Firefox when visual-system or interaction work creates browser-specific risk; do not triple every static smoke test without a reason.

Initial browser assertions should verify:

- `/`, `/writing`, `/writing/<fixture-slug>`, and `/about` return usable pages
- primary navigation reaches every top-level route
- the fixture essay title, description, and publication metadata render
- browser console errors are absent
- keyboard navigation can reach primary links
- no page depends on JavaScript for its core content

Visual regression screenshots should begin in the visual-system slice, after typography and layout are intentional. Do not create baselines from unstyled scaffolding.

### 6. Accessibility checks

Use semantic assertions and `@axe-core/playwright` in the browser suite.

Every primary route should have:

- one clear page-level heading
- a descriptive document title
- a landmark structure appropriate to the page
- keyboard-reachable navigation
- no serious or critical automated axe violations

Automated accessibility tests do not replace manual checks. User-facing slices must also review focus order, visible focus, contrast, zoom/reflow, reduced motion, and meaningful alternative text where applicable.

### 7. Performance checks

Performance has two kinds of gates:

#### Deterministic resource gates

These may block CI as soon as the foundation exists:

- no unexpected client JavaScript on static base pages
- no third-party requests in the foundation
- bounded CSS, font, image, and script counts/sizes
- no render-blocking third-party embeds

Record the actual clean-build baseline before selecting exact byte thresholds. Set budgets close enough to catch accidental regressions while leaving deliberate room for the visual-system assets.

#### Timing and score gates

Use Lighthouse CI against the built static output for performance, accessibility, best-practices, and SEO observations.

During the foundation slice:

- collect multiple local runs on representative routes
- record the median and range
- document the runner and throttling profile
- treat unstable timing metrics as reported evidence rather than immediate hard failures

Promote timing metrics and category scores to blocking CI thresholds only after the GitHub Actions baseline is stable. Avoid meaningless promises based on one local run.

## Local command contract

The foundation implementation should expose predictable package scripts:

```text
pnpm dev             # local authoring server
pnpm format:check    # formatting only
pnpm lint            # linting only
pnpm typecheck       # Astro/TypeScript diagnostics
pnpm test:unit       # Vitest
pnpm build           # production static build
pnpm test:build      # assertions against dist output
pnpm test:e2e        # Playwright against production preview
pnpm test:a11y       # focused accessibility browser checks, if kept separate
pnpm test:perf       # local Lighthouse collection/assertion
pnpm verify          # format, lint, type, unit, build, and dist-output gates
pnpm verify:browser  # production-preview browser and accessibility gates
pnpm verify:all      # complete required local/CI verification
```

The verification commands should be safe to run repeatedly and must not require network access after dependencies and browser binaries are installed. They must not publish, deploy, modify content, or write outside ignored build/test-output directories.

Performance collection may remain outside `pnpm verify` initially if local Chrome availability makes it environment-sensitive. CI should still retain deterministic resource-budget checks.

## CI contract

The initial GitHub Actions workflow should:

1. check out the repository
2. install the pinned Node and pnpm versions
3. install dependencies from the frozen lockfile
4. run deterministic verification
5. install only the Playwright browser required by the initial suite
6. run production-preview browser tests
7. upload Playwright artifacts only on failure

Use dependency caching provided by the package-manager setup. Do not cache build output until there is evidence that it improves runtime without hiding correctness problems.

CI must not require production secrets for a static content build. Draft content, tests, and fixtures must not rely on private external services.

## Fixtures

Use a small, clearly identified fixture essay containing enough structure to exercise the content contract:

- title and description
- publication metadata
- headings
- paragraph and list content
- internal and external links
- one local image placeholder only if image handling is in the active slice

The foundation fixture should exercise the same collection and detail route as a real essay while being unmistakably labeled as test content. Because this slice explicitly excludes deployment, it may exist in the generated local/CI output. It must be removed or replaced by real content before production deployment is enabled. Avoid a test-only content pipeline unless a genuine isolation problem justifies it.

## Failure artifacts

Keep debugging output useful and bounded:

- Playwright trace and screenshot on failure
- HTML report as an ignored local artifact
- Lighthouse reports in an ignored local directory
- clear schema and build errors in standard output

Do not commit generated test reports or browser binaries.

## Change expectations

Each implementation PR should state:

- which test layers apply
- commands run
- routes and viewports checked manually
- whether client JavaScript or resource budgets changed
- any skipped or environment-dependent checks
- residual accessibility or browser risk

Tests should grow with real behavior. A later slice must extend coverage when it introduces a new content contract, interactive island, publishing transformation, route class, or accessibility risk.
