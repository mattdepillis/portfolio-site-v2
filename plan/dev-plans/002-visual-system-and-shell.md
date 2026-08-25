# Development Plan 002: Visual System and Publication Shell

## Status and authority

Proposed for founder and primary-integrator review before implementation.

The canonical scope is [Slice 002: Visual System and Publication Shell](../slices/002-visual-system-and-shell.md). That slice, the product plan, design notes, and testing rules override this implementation proposal if a conflict appears.

Primary integrator and design owner: Codex, working directly with the founder.

Expected implementation agent: OpenCode or another explicitly assigned coding agent after the founder approves this planning PR and the portrait assets are ready for implementation.

## Outcome

Produce a local, reviewable, production-build visual prototype of the publication shell. Unlike Stage 1, visual judgment is a required acceptance gate.

The implementation PR must end with a documented, running local preview that the founder can inspect directly. Automated green checks alone do not establish completion.

## Role split

### Founder

- approve the planning direction
- review the real light/dark prototype at representative widths
- approve or reject portrait treatment and typography
- decide merge readiness

### Primary integrator and designer

- own token values, type hierarchy, portrait art direction, responsive composition, and design acceptance
- provide or approve final v2-owned portrait inputs before the implementation agent integrates them
- resolve implementation questions that would change design or architecture
- audit the implementation diff, dependency costs, browser behavior, and final preview
- prepare the implementation PR or explicitly authorize the implementation agent to do so

### Implementation agent

- execute the approved file-level plan
- implement the shell and tests within explicit boundaries
- do not independently redesign the portrait, change the approved fonts, add components/routes, or reinterpret the product
- return a structured handoff and leave the requested local preview available for review

## Required reading

Before implementation, read completely in this order:

1. `AGENTS.md`
2. `plan/README.md`
3. `plan/plan.md`
4. `plan/design-notes.md`
5. `plan/dev-rules.md`
6. `plan/testing-rules.md`
7. `plan/mvp-dev-plan.md`
8. `plan/slices/README.md`
9. `plan/slices/002-visual-system-and-shell.md`
10. this development plan
11. `plan/agents/README.md`
12. `plan/agents/roles.md`
13. `plan/agents/handoff-template.md`

## Pre-implementation gates

Do not begin implementation until:

1. this planning PR is merged
2. a fresh feature branch is created from updated `main`
3. the primary integrator supplies or explicitly approves the portrait source/provenance and light/dark derived assets
4. exact current Playwright, axe, and font-source versions/compatibility are verified against primary documentation
5. the implementation agent confirms the allowed file list and current Stage 1 checks pass

If the portrait assets are not ready, implementation may begin on tokens, fonts, shell, and tests only if the primary integrator explicitly splits the task. Do not invent substitute portrait art.

## Primary implementation references

- [Instrument Sans upstream repository and OFL license](https://github.com/Instrument/instrument-sans)
- [Newsreader upstream repository and OFL license](https://github.com/productiontype/Newsreader)
- [Astro font guidance](https://docs.astro.build/en/guides/fonts/)
- [Playwright test documentation](https://playwright.dev/docs/intro)
- [Playwright accessibility testing with axe](https://playwright.dev/docs/accessibility-testing)

These references inform implementation choices but do not authorize downloading unpinned assets or packages without recording exact provenance in the implementation PR.

## Allowed files and directories

- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml` only when required for approved dependency build policy
- `.gitignore`
- `README.md`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `src/components/**`
- `src/layouts/**`
- `src/pages/**`
- `src/styles/**`
- `src/assets/fonts/**`
- `src/assets/images/portrait/**`
- `public/**` only for a justified static asset that cannot use the Astro asset pipeline
- `tests/e2e/**`
- `tests/build/**`
- current Stage 2 planning status/evidence updates approved by the primary integrator

Any additional file needs explanation in the handoff. Material design, content-model, route, framework, or dependency changes require primary-integrator approval before implementation.

## Out of scope

- `writing/plans/**` and real essay drafting
- changes to the legacy repository
- Notion/CMS/import work
- React or another client framework
- charts, figures, interactive essays, or generic MDX component systems
- Stage 4 final homepage/About content
- feeds, sitemap, Open Graph generation, deployment, hosting, or DNS
- Lighthouse
- Storybook or a component package
- new routes, tags, search, project grids, or résumé timelines

## Work package 1: Asset provenance and fonts

### Portrait inputs

Copy the approved v1 source portrait into a v2-owned provenance location or preserve a source checksum/provenance note beside derived assets. Recommended structure:

```text
src/assets/images/portrait/
  README.md
  source-cartoon-me.png
  portrait-light.webp
  portrait-dark.webp
```

PNG is acceptable when it produces materially better linework/alpha quality; otherwise prefer lossless or visually equivalent WebP. Do not convert mechanically without comparing output at actual display sizes.

The provenance note should state the legacy source path, original dimensions (1450 × 1450 RGBA), transfer date, treatment decisions, and derived filenames. After transfer, application/test code must not reference the legacy path.

Render the derived assets through Astro's image pipeline where practical, with explicit width/height and responsive source behavior. The homepage portrait should not load on routes that do not display it.

### Font inputs

Self-host the Latin variable web fonts and their OFL license/provenance:

- Instrument Sans: normal variable file covering required weight/width roles; add italic only if the implemented specimen genuinely uses it
- Newsreader: normal variable file for prose; add italic because editorial emphasis is real content behavior

Prefer checked-in WOFF2 files from a documented upstream or a pinned font package whose emitted files are auditable. Do not make runtime requests to Google Fonts or another CDN.

Use `font-display: swap` or an explicitly justified alternative. Preload only the files demonstrably required above the fold; do not preload every family/style. Provide metric-compatible fallback stacks where practical and verify layout shift manually.

Record exact built font count and bytes. Include OFL license files or a repository-level third-party notice that clearly satisfies redistribution requirements.

## Work package 2: Semantic tokens and global primitives

Refactor `src/styles/global.css` into an intentional but compact system.

Token categories:

- canvas, surface, primary/secondary ink, rule, accent, link, focus
- display and reading font families
- fluid type steps
- baseline spacing steps
- prose measure, wide measure, outer gutter, rule width
- border/focus treatments
- restrained motion duration/easing

Use semantic names such as `--color-canvas` rather than component-specific names such as `--header-beige`.

Apply light tokens by default and dark tokens through a stable `data-theme` or equivalent root attribute. Preserve sensible system-preference behavior when no explicit user preference exists.

Required primitives:

- global box sizing and canvas behavior
- readable body defaults
- visible `:focus-visible`
- underlined or otherwise unmistakable inline links
- text selection colors
- responsive outer wrapper
- prose and wide-content measures
- consistent vertical rhythm
- reduced-motion override
- visually hidden utility only if required for the theme control

Avoid a utility-class framework, reset package, CSS-in-JS, or generic component library.

## Work package 3: Theme behavior

Implement theme behavior with a small framework-free script.

Recommended contract:

- root attribute: `data-theme="light" | "dark"`
- local-storage key: a stable project-specific value
- first visit: use `prefers-color-scheme`
- early inline initializer in `<head>`: choose stored/system theme before paint
- masthead button: switch current theme and persist the explicit choice
- accessible label reflects the action or current state unambiguously
- no dependence on theme script for content, links, or route navigation

Do not add a framework or hydration directive for this behavior. Keep initialization and control logic centralized and small. Avoid duplicated scripts across components where a shared module or layout-owned implementation is clearer.

Tests must cover first-load behavior, manual change, persistence after navigation/reload, and readable no-JavaScript content.

## Work package 4: Publication shell components

Recommended component boundaries:

```text
src/components/
  Masthead.astro
  ThemeControl.astro
  SiteFooter.astro
  EssayList.astro       # only if homepage/archive repetition justifies it now
```

Do not create primitives merely to make the directory look systematic.

### Masthead

Build the approved editorial composition:

- identity and descriptor block
- Writing and About links
- obvious active-section state
- theme control
- precise rule/alignment relationship
- two-row phone layout without a hamburger

Ensure tap targets and focus states work at all widths. The active state should not rely on color alone.

### Footer

Keep it compact: identity/contact placeholder treatment, copyright/current year if useful, and top-level routes only when they add orientation. Do not add social-icon clutter or a newsletter form.

### Base layout

Update the base layout to apply theme initialization, shell structure, and shared metadata without hydrating the application. Preserve semantic landmarks and static content.

## Work package 5: Page compositions

### Homepage

Create a Stage 2 cover using real structure and fixture content:

- compact publication label/identity statement
- portrait as secondary visual punctuation
- latest fixture essay with title, description, date, and strong route
- archive link
- concise About route/footer

Use asymmetry, rules, type scale, and portrait placement for character. Avoid a centered generic hero, marketing CTA buttons, cards, badges, and skills grids.

This composition is an authentic design prototype with temporary content. Do not write final biography or expand the information architecture.

### Writing index

Style the chronological list with title, description, and date. It should scan like a journal contents page, not a card collection.

### Essay specimen

Style frontmatter title, deck, and date distinctly from MDX body. Apply Newsreader to the prose body while retaining Instrument Sans for headings/labels. Establish list, link, emphasis, strong, blockquote, and heading rhythm. Keep one page-level heading.

Add a local fixture typography specimen only when needed to exercise a missing real Markdown behavior; keep it clearly test content.

### About and 404

Bring them into the same system without pretending temporary copy is final. The 404 should feel authored but restrained.

## Work package 6: Browser and accessibility verification

Add exact pinned compatible versions of:

- `@playwright/test`
- `@axe-core/playwright`

Use a single Chromium browser initially. Configure Playwright to build and serve the production output automatically on an isolated local port, reusing no unrelated already-running service in CI.

Recommended test organization:

```text
tests/e2e/
  navigation.spec.ts
  theme.spec.ts
  accessibility.spec.ts
  responsive.spec.ts
```

Required coverage:

- primary routes load and expose expected visible content
- masthead links navigate correctly
- active navigation state is present
- keyboard Tab order reaches identity, destinations, theme control, and main content links logically
- theme selection updates root state and persists across reload/navigation
- console/page errors fail tests
- phone and desktop projects have no horizontal page overflow
- core page content exists with JavaScript disabled
- axe scans primary routes with WCAG A/AA tags; do not silently exclude broad containers

Add WebKit/Firefox only if the implementation creates a browser-specific risk. Do not add visual screenshot baselines before founder design approval.

Suggested command contract:

```text
pnpm test:e2e
pnpm test:a11y
pnpm verify:browser
pnpm verify:all
```

Keep `pnpm verify` as the fast deterministic Stage 1 gate. `pnpm verify:all` should run deterministic and browser gates. CI should install only Chromium and upload Playwright traces/screenshots/reports on failure.

## Work package 7: Resource budgets

Measure the completed clean build before changing thresholds.

Record and enforce:

- HTML count and total bytes
- CSS count and total bytes
- executable JavaScript count and total bytes
- font file count and total bytes
- portrait image count and total bytes
- third-party loaded request count: zero

The theme script changes the prior zero-JavaScript invariant. Replace it with a narrow explicit budget based on the measured output plus small reviewed headroom. Continue to reject framework/runtime chunks on static pages.

Budget assertions should distinguish the intentional theme script from unexpected page hydration.

Do not introduce Lighthouse or timing scores in this slice.

## Implementation sequence

1. Confirm planning and portrait asset gates.
2. Create a fresh implementation branch from `main`.
3. Run and record the clean Stage 1 verification baseline.
4. Add font assets, licenses, provenance, and minimal font-face declarations.
5. Implement semantic tokens, global primitives, and light/dark canvases.
6. Implement pre-paint theme initialization and accessible theme control.
7. Build the masthead, footer, and base layout.
8. Compose homepage, writing index, essay specimen, About, and 404.
9. Integrate approved portrait assets through the Astro image pipeline.
10. Review the live development preview with the primary integrator before locking tests to detailed behavior.
11. Add Playwright navigation/theme/responsive tests and axe scans.
12. Build production output, measure resources, and update deterministic budgets.
13. Run deterministic and browser verification twice.
14. Leave a production preview running when asked and hand the exact URL to the founder.
15. Return the structured agent handoff; do not merge independently.

## Required local design review

The implementation agent and primary integrator must review at:

- 375 × 812
- 768 × 1024
- 1280 × 800
- 1536 × 960

Review every primary route in both themes where the route exposes theme-dependent behavior.

Capture or document:

- masthead composition and focus order
- homepage title/portrait balance
- font loading and fallback behavior
- essay measure and hierarchy
- portrait crop/sharpness in both themes
- active navigation state
- theme state before/after reload
- overflow and 200% zoom behavior
- reduced-motion behavior
- automated axe results and manual contrast findings

The founder must receive a working preview, not screenshots alone. Screenshots may supplement the walkthrough.

## Implementation-agent return contract

Use `plan/agents/handoff-template.md` and include:

- branch and commit
- files changed
- dependency additions with exact versions and justification
- font upstream, files, license, axes/styles, preload choices, and built bytes
- portrait provenance, source/derived filenames, dimensions, formats, and built bytes
- theme script behavior and measured built bytes
- updated resource baseline and thresholds
- deterministic, browser, and axe command results
- routes/themes/viewports inspected manually
- exact live preview command and URL
- any screenshots used for review
- assumptions, known gaps, and questions for the primary integrator

Do not commit a root handoff artifact unless the primary integrator explicitly approves its location. Prefer the PR description or review comment.

## Primary-integrator review checklist

- The visual result matches the approved direction and is not merely technically styled.
- Instrument Sans and Newsreader roles are evident and comfortable.
- Light/dark themes feel related and individually designed.
- Portrait is recognizable, limited-ink, sharp, and subordinate to writing.
- Homepage feels like a publication cover without finalizing Stage 4 content.
- Tablet layout is deliberate.
- Theme JavaScript is isolated and justified.
- No framework or speculative component system entered the slice.
- Keyboard, focus, contrast, zoom, reduced motion, and axe evidence are credible.
- Browser tests run against production preview and do not depend on v1.
- Resource budgets reflect measured font/image/script output.
- The founder has personally inspected the live preview.

## Merge readiness

The implementation PR is ready for founder review only after the primary integrator has audited the code and design, all Stage 1 and Stage 2 gates pass, the preview remains available on request, and all material visual or accessibility risks are documented.
