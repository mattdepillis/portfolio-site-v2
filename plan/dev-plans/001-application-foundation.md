# Development Plan 001: Application Foundation

## Status and authority

Proposed for founder and primary-integrator review before implementation.

The canonical scope is [Slice 001: Application Foundation](../slices/001-application-foundation.md). That slice, the product plan, the design notes, and the staged testing rules override this implementation writeback if a conflict appears.

Primary integrator: Codex, working with the founder.

Expected implementation agent: OpenCode or another explicitly assigned coding agent.

## Outcome

After the implementation PR lands, a clean checkout can install dependencies, start a local Astro server, render the four agreed routes and one clearly marked published fixture essay, build independently of v1, and pass one deterministic Stage 1 verification command locally and in GitHub Actions.

The founder should be able to open the local development or production-preview URL in a browser. The result will be intentionally plain: this stage proves the publication and authoring foundation, not the finished visual system.

## Current baseline and prerequisites

At the time this plan was prepared:

- `main` contains planning documents and the first essay outline, but no application scaffold.
- `node --version` returns `v22.14.0` in the local development environment.
- `pnpm --version` fails because pnpm is not currently installed.
- `corepack --version` returns `0.31.0`, but a working Corepack executable alone does not prove pnpm has been activated or can be downloaded.

Current official Astro documentation requires Node `v22.12.0` or newer, and the Node project currently lists Node 22 as an LTS line. Therefore:

1. Pin Node major `22` for this foundation in `.nvmrc`, package metadata, and CI.
2. Require Node `>=22.12.0 <23` so the current machine and CI agree.
3. Use the current stable pnpm 11 release, pinned to its exact resolved version in `package.json`.
4. Bootstrap pnpm through an approved installation or Corepack method before attempting installation; do not silently modify global tooling or assume the command already exists.
5. Recheck the current Astro, official MDX integration, pnpm, Node, Vitest, formatter, linter, and GitHub Actions compatibility before resolving exact package versions.
6. Prefer Node 24 in a future maintenance update when a coordinated local/CI upgrade is useful; changing Node versions is not required to start this slice.

Reference documentation:

- [Astro installation prerequisites](https://docs.astro.build/en/install-and-setup/)
- [Astro build-time content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [pnpm installation and Node compatibility](https://pnpm.io/installation)
- [Node.js release status](https://nodejs.org/en/about/previous-releases)

Exact dependency versions belong in the implementation commit and lockfile after current compatibility is verified; do not freeze speculative version numbers in this planning PR.

## Implementation-agent assignment

### Role and required reading

You are the bounded implementation agent, not the product owner, designer, architect, primary integrator, or merge authority.

Before changing code, read:

1. [../../AGENTS.md](../../AGENTS.md)
2. [../README.md](../README.md)
3. [../plan.md](../plan.md)
4. [../design-notes.md](../design-notes.md)
5. [../dev-rules.md](../dev-rules.md)
6. [../testing-rules.md](../testing-rules.md)
7. [../mvp-dev-plan.md](../mvp-dev-plan.md)
8. [../slices/README.md](../slices/README.md)
9. [../slices/001-application-foundation.md](../slices/001-application-foundation.md)
10. this document
11. [../agents/README.md](../agents/README.md)
12. [../agents/roles.md](../agents/roles.md)
13. [../agents/handoff-template.md](../agents/handoff-template.md)

Implement only Stage 1 from a fresh feature branch based on the merged planning branch's `main` commit.

### Allowed files and directories

- `package.json`
- `pnpm-lock.yaml`
- `.nvmrc`
- `.gitignore`
- `README.md`
- `astro.config.*`
- `tsconfig.json`
- the minimum justified formatter and linter configuration files
- `vitest.config.*`
- `.github/workflows/ci.yml`
- `src/**`
- `tests/unit/**`
- `tests/build/**`
- `plan/slices/001-application-foundation.md` and this dev plan only for small implementation-status or evidence updates approved by the primary integrator

If an additional root configuration file is genuinely necessary, explain it in the handoff. If additional product scope, an architectural change, or a substantial dependency becomes necessary, stop and ask the primary integrator.

### Explicitly out of scope

- `writing/plans/**` and the first real essay
- all files or assets in `personal-portfolio-site`
- the portrait, self-hosted fonts, final color tokens, theme switching, or polished visual design
- React, other client frameworks, interactive islands, chart libraries, or animation packages
- Notion, CMS integrations, remote content, secrets, analytics, or network-dependent tests
- Playwright, `@axe-core/playwright`, Lighthouse, or browser binaries
- RSS, sitemap, syndication, social-image generation, deployment, hosting, or DNS
- PR creation, merge, or changes to unrelated planning documents unless explicitly reassigned

## Proposed implementation structure

```text
.github/
  workflows/
    ci.yml
.gitignore
.nvmrc
README.md
astro.config.mjs
eslint.config.mjs                 # minimal Astro-aware checks with documented distinct value
package.json
pnpm-lock.yaml
prettier.config.mjs              # exact formatter filename may vary
tsconfig.json
vitest.config.ts
src/
  components/
    Masthead.astro               # deliberately minimal semantic navigation
  content/
    writing/
      foundation-fixture/
        index.mdx                # the only public Stage 1 fixture essay
      draft-fixture/
        index.mdx                # non-public contract fixture proving draft exclusion
  content.config.ts
  layouts/
    BaseLayout.astro
  lib/
    writing.ts                   # real collection schema and reusable publication helpers
  pages/
    404.astro
    about.astro
    index.astro
    writing/
      [slug].astro
      index.astro
  styles/
    global.css
tests/
  build/
    resource-budgets.json        # measured baseline plus reviewed regression headroom
    site-output.test.ts
  unit/
    writing.test.ts
```

Exact filenames may vary when current Astro conventions or a meaningfully simpler implementation justify it. Preserve the approved source boundaries and document material deviations.

The canonical slice calls for one clearly marked fixture essay. This plan uses exactly one **published, public** fixture plus a second tiny **draft-only contract fixture** so generated-output tests can prove a real draft never reaches the archive, homepage, or detail-route build. The draft must not generate a route or appear in public HTML.

## Work package 1: Runtime, package manager, and scaffold

Create a minimal static Astro project directly in the existing repository without replacing planning files or importing a starter theme.

### Package and runtime contract

`package.json` should:

- mark the repository as private
- use ESM where current Astro tooling expects it
- pin the exact resolved stable pnpm 11 version through `packageManager`
- constrain Node to `>=22.12.0 <23`
- include only justified Stage 1 dependencies
- define the required local and CI command surface

Use `.nvmrc` containing the pinned major `22`. Check in a pnpm lockfile. CI must install with `pnpm install --frozen-lockfile`.

Expected direct package categories:

- Astro and the official `@astrojs/mdx` integration
- TypeScript and Astro diagnostics where required by the current integration
- Prettier plus Astro-aware formatting support
- ESLint and the minimum Astro-aware configuration needed to enforce meaningful source-quality checks beyond formatting and diagnostics
- Vitest
- one small explicit HTML parser only if generated-output assertions cannot be kept robust without it

Do not add React, Tailwind, an icon library, browser testing libraries, accessibility runners, Lighthouse, a CSS framework, or a production hosting adapter.

### Required scripts

```text
pnpm dev
pnpm preview
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:build
pnpm verify
```

`pnpm verify` must execute formatting, linting, Astro/TypeScript diagnostics, unit/content-contract tests, the production build, and generated-output/resource checks in that order. `pnpm test:build` should fail clearly when a required `dist/` output does not exist instead of silently running against an unrelated stale directory.

`pnpm preview` is a local manual inspection command, not a required background service for `pnpm verify`.

### Base configuration

- Configure Astro for static output and integrate MDX.
- Set the site origin to `https://mattdepillis.com` solely as the expected production identity for canonical-URL generation and correctness tests; this configuration does not choose a hosting provider, configure deployment, or authorize DNS changes.
- Extend Astro's strict or strictest TypeScript configuration.
- Ignore dependencies, `.astro` output, `dist/`, and generated local reports.
- Keep configuration understandable without speculative plugin layers.

## Work package 2: Typed repository-native content

Implement a single `writing` content collection using current Astro build-time collection conventions.

### Loader and identity

In `src/content.config.ts`:

- define the collection with `defineCollection` from `astro:content`
- use Astro's `glob` loader from `astro/loaders`
- load `src/content/writing/**/index.mdx`
- derive a stable public slug from the containing essay directory
- use `generateId` only if the default collection ID includes an unwanted `/index` suffix
- ensure nested or invalid identifiers cannot accidentally create a public route outside `/writing/[slug]`

The canonical content source is the repository, not v1, Notion, an API, or generated output.

### Frontmatter schema

Export the actual writing schema from a small real application module such as `src/lib/writing.ts`, then import that same schema into the content collection. Use Astro's current Zod export rather than introducing a second unrelated validation dependency when possible.

Required fields:

- `title`: meaningful nonempty string
- `description`: meaningful nonempty string
- `publishedAt`: valid coerced date
- `status`: enum containing only `draft` and `published`
- `featured`: explicit boolean

Optional fields should support the approved contract without inventing behavior: `updatedAt`, `tags`, `cover`, `canonicalUrl`, and `syndication`.

Keep `syndication` narrow or explicitly defer its detailed inner shape until Stage 6; do not design a cross-platform publishing system in the foundation.

### Publication helpers

Create only the pure helpers the actual routes and tests use:

- determine whether an entry is published
- sort published entries by publication date, with a deterministic tie breaker
- convert a valid writing slug to `/writing/<slug>/`
- construct canonical page URLs if this is clearer as a shared helper than as a layout expression

Do not create a repository abstraction, generalized content service, universal renderer, or speculative featured-content engine.

### Fixtures

`foundation-fixture/index.mdx` should:

- set `status: published`
- identify itself prominently in title and body as a non-production foundation/test fixture
- include valid description, publication date, and `featured` metadata
- contain a heading, paragraphs, a list, and internal/external links
- avoid portrait assets, real essay copy, remote images, and unnecessary components

`draft-fixture/index.mdx` should:

- set `status: draft`
- have a unique easily searchable title and slug
- remain present in the tracked collection for real exclusion tests
- never appear in generated public HTML or route output

Both fixture entries must be removed, replaced, or deliberately isolated in the real-essay stage.

## Work package 3: Semantic static routes

Create a small shared HTML layout and obvious text-based navigation.

### Shared layout

`BaseLayout.astro` should render:

- document language and viewport metadata
- a useful per-page title and description
- a canonical URL derived from the configured site origin
- a semantic header/navigation and one main landmark
- a visible page heading supplied by the page
- only a tiny global CSS baseline needed for readable manual inspection

The layout must not include client-side scripts, view-transition machinery, analytics, theme toggles, custom fonts, third-party resources, or production visual-system choices.

### Navigation

`Masthead.astro` may contain:

- a text link to `/`
- an explicit `Writing` link to `/writing/`
- an explicit `About` link to `/about/`

Treat this as a semantic scaffold, not the final editorial masthead. Current-state polish, responsive art direction, theme behavior, and final type treatment belong to Stage 2.

### Routes

- `/`: brief writing-first placeholder with a link to the published fixture and About.
- `/writing/`: list published entries only, sorted chronologically.
- `/writing/foundation-fixture/`: prerender the actual MDX fixture, title, description, and publication date.
- `/about/`: concise clearly temporary author-context placeholder.
- `/404.html`: static not-found behavior suitable for a later hosting target.

The dynamic essay route must derive `getStaticPaths()` from published entries only. Filtering an archive while still generating a draft detail page is not acceptable.

Do not build the final homepage composition, real essay design, portrait placement, featured-entry system, feed, or deployment behavior.

## Work package 4: Deterministic verification

### Unit and content-contract tests

Create `tests/unit/writing.test.ts` against the real exported schema and helpers.

Cover:

- a complete valid metadata object
- missing or blank title/description
- invalid publication dates
- unsupported publication status
- missing or non-boolean `featured`
- draft exclusion and published inclusion
- reverse chronological ordering plus a deterministic tie breaker
- safe, stable writing route generation

Use the same schema registered in the Astro collection. Do not build an independent test-only schema or claim to test Astro internals.

### Production-output tests

After `astro build`, inspect real generated HTML in `tests/build/site-output.test.ts`.

Assert:

- the homepage, archive, About page, fixture essay, and static 404 output exist
- every primary page contains usable pre-rendered text, a document title, description, canonical URL, one clear page-level heading, and a main landmark
- global navigation links resolve to built top-level routes
- the published fixture appears under `/writing/foundation-fixture/` and is visibly labeled as test content
- the draft title and slug never appear in generated public HTML
- no draft detail route is generated
- no page requires JavaScript for core text or navigation
- no unexpected executable client scripts or JavaScript bundles appear on static pages
- no scripts, stylesheets, fonts, image assets, or other loaded page resources point at third-party origins

An ordinary external editorial hyperlink is allowed: a reader-clicked `<a href="https://...">` is not a third-party request made during page load.

Parse HTML structurally instead of asserting brittle whitespace snapshots. If Astro and the chosen test environment do not expose a suitable parser directly, add one small explicit development dependency and justify it; do not import an undeclared transitive package.

### Resource baselines

Measure the first complete clean `dist/` build before selecting thresholds.

Record:

- route count
- HTML file counts and byte sizes
- CSS file count and total bytes
- executable JavaScript file/reference count and bytes
- font count and bytes
- image count and bytes

Add a small reviewed checked-in budget file or equivalent readable assertions. Set deterministic limits based on actual measured output plus deliberate headroom; do not invent page-weight numbers before measurement.

Expected initial hard invariants:

- zero executable client-side JavaScript for static routes
- zero third-party loaded resources
- zero custom font assets
- zero copied portrait/image assets unless Astro itself creates a justified framework asset

Keep browser automation, axe scanning, Lighthouse scores, visual snapshots, and timing metrics out of Stage 1.

## Work package 5: Documentation and CI

### README

Replace or create the repository root `README.md` with:

- one-paragraph product orientation
- Node 22 and pinned pnpm prerequisites
- the approved pnpm bootstrap/install process
- `pnpm install --frozen-lockfile`
- `pnpm dev` and the local browser URL it prints
- `pnpm build` and `pnpm preview`
- `pnpm verify` and each focused Stage 1 command
- the location and format of published and draft MDX entries
- the public fixture's purpose and its planned Stage 3 removal
- explicit confirmation that v1, Notion, secrets, and external services are not required
- references to the canonical planning and active agent-workflow documents

Do not describe deployment, public launch, cross-posting, or future tooling as already implemented.

### GitHub Actions

Create one workflow that runs on pull requests and pushes to `main`.

It should:

1. check out the v2 repository only
2. install the pinned Node 22 version
3. install the exact pnpm version from project metadata using a supported current setup action
4. restore package-manager caching where the setup action supports it
5. run `pnpm install --frozen-lockfile`
6. run `pnpm verify`

Pin GitHub Actions to their current maintained major versions after verifying their official documentation. Do not install browsers, add production credentials, contact v1, deploy artifacts, or split the foundation into an elaborate CI matrix.

## Execution sequence

1. Confirm the approved plan is merged and create a fresh implementation branch from `main`.
2. Check Node and pnpm availability; resolve the pnpm prerequisite through an approved method.
3. Verify current dependency and GitHub Actions compatibility against primary documentation.
4. Create the package manifest, runtime pin, static Astro/MDX configuration, and initial lockfile.
5. Add the real schema, collection loader, publication helpers, and published/draft fixture entries.
6. Implement the shared layout, minimal navigation, static pages, and filtered essay paths.
7. Add formatting, linting where justified, type diagnostics, and real-schema unit tests.
8. Run a clean production build and inspect the generated route and asset output.
9. Add structural build-output tests and derive deterministic resource budgets from the measured baseline.
10. Add the single GitHub Actions workflow and root development instructions.
11. Run the complete verification command twice to confirm repeatability.
12. Start the local preview and inspect every agreed route at desktop and representative phone widths.
13. Return a structured handoff to the primary integrator; do not independently create or merge a PR.

## Required evidence

Implementation handoff must include:

- exact Node and pnpm versions used
- direct dependencies and the reason each exists
- the clean production-build route list
- the measured HTML/CSS/JavaScript/font/image baseline and chosen budget headroom
- results of `pnpm verify` and any focused commands
- local development or preview URL and manually inspected routes/viewports
- proof the draft fixture produces neither a route nor leaked public text
- proof base pages contain no executable client JavaScript or third-party loaded resources
- confirmation that no runtime or test code references v1, Notion, production secrets, or external services
- skipped checks, environment issues, and decisions requiring primary-integrator review

Follow [../agents/handoff-template.md](../agents/handoff-template.md).

## Primary-integrator review checklist

Before preparing the implementation PR, verify:

- the change remains inside the canonical Stage 1 slice
- the environment bootstrap and README work on the founder's actual machine
- fixture routes are useful locally without masquerading as real publication content
- schema tests use production code and output tests inspect the actual build
- archive filtering and static-path generation both exclude drafts
- formatter, linter, diagnostics, and dependencies each provide distinct documented value
- the whole verification loop works without Playwright, axe, Lighthouse, v1, secrets, or network access after installation
- the local browser result is easy for the founder to inspect
- no Stage 2 visual decisions or Stage 3 essay decisions were silently pulled forward
- CI and local `pnpm verify` represent the same deterministic gate

## Merge readiness

The implementation is ready for founder review when all required Stage 1 checks pass, the routes work in a local browser, resource budgets are measured and enforced, fixture/draft behavior is safe, the dependency surface is justified, and the primary integrator has reviewed the agent handoff and residual risks.
