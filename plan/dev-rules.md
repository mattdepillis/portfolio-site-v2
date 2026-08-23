# Development Rules

## Purpose

This document defines the working agreement for building `portfolio-site-v2`. It adapts the bounded planning and review discipline used in `training-memory` to a small, performance-sensitive publication.

## Core working model

Build the site in short, reviewable slices:

1. sync the repository's default branch
2. create a fresh short-lived branch
3. read the planning documents and active slice plan
4. implement only the approved slice
5. run proportional automated checks
6. verify the rendered result at desktop and mobile widths for user-facing changes
7. perform a self-review for scope drift, accessibility, performance, and visual regressions
8. push a PR with verification notes and residual risks
9. leave final merge authority to the founder

Recommended branch prefixes are `feat/`, `fix/`, `docs/`, and `chore/`. Do not stack unrelated work in one branch.

## Slice plans

Before a meaningful implementation slice, create a plan in `plan/slices/` containing:

- goal
- scope
- exact deliverables
- expected files or directories
- technical approach
- non-goals
- risks and open questions
- verification plan
- merge criteria

The plan should be concrete enough for a reviewer to understand what will change, why, and how completion will be judged. If an implementation discovery materially changes scope or architecture, update the plan before continuing.

## Product and scope rules

Protect the initial wedge: publishing excellent essays with original supporting visuals.

MVP scope is:

- homepage
- writing index
- essay detail pages
- short About page
- Markdown/MDX authoring
- a small set of editorial content components
- derivative cross-post drafts

Do not add the following without an explicit plan and demonstrated need:

- live Notion ingestion
- an internal CMS
- arbitrary runtime MDX imports
- a general block-rendering abstraction
- automatic posting to external platforms
- comments, accounts, search, or analytics dashboards
- animation libraries or global client state
- integrations added only to signal technical sophistication

## Architecture rules

- Prefer static HTML and server/build-time work.
- Client JavaScript must be opt-in and local to the component that needs it.
- Keep content independent from presentation where that improves portability, but do not invent a universal content AST for hypothetical sources.
- Use typed frontmatter and validate content during the build.
- Keep interactive essay modules isolated and lazily loaded.
- Prefer CSS and platform APIs over runtime libraries.
- Prefer explicit, legible code over clever abstraction.
- Promote an abstraction only after repeated real usage demonstrates it.

## Dependency rules

Dependencies should be added conservatively:

- use stable, explicit versions
- explain the user or author benefit in the PR
- consider bundle weight and build complexity
- avoid overlapping libraries for icons, styling, dates, or animation
- remove dependencies when the feature that justified them is removed

A content site should not require a large application dependency graph.

## Content rules

- The repository is the canonical source for published essays.
- Keep one directory per essay with its content, data, and local assets.
- Use semantic filenames and useful alt text.
- Store chart source data beside the essay when practical.
- Prefer SVG for diagrams and charts; use raster images when texture, photography, or illustration requires them.
- External-platform versions are generated derivatives, not the canonical source.
- Never publish externally as a side effect of a normal build.

## Design and UX rules

The site should feel fast, calm, editorial, and intentional.

- Typography, spacing, and hierarchy do most of the design work.
- Navigation must remain obvious, keyboard accessible, and touch friendly.
- Reading measure and contrast take priority over decorative composition.
- Motion must communicate state or add restrained polish; honor reduced-motion preferences.
- Dark mode must be designed, not mechanically inverted.
- Tablet is a first-class target alongside phone and desktop.
- Preserve the portrait as a recognizable identity asset without making it a repeated mascot.

## Performance rules

- Ship zero client JavaScript on a page unless the page needs it.
- Do not hydrate the global shell for isolated interactivity.
- Load fonts locally when licensing permits and subset them when useful.
- Set image dimensions and generate appropriately sized assets.
- Avoid layout shift, render-blocking third-party embeds, and globally loaded syntax or chart libraries.
- Establish performance budgets in the foundation slice and enforce them in CI when the app exists.

## Accessibility and metadata rules

- Use semantic HTML before ARIA.
- Maintain visible focus states and complete keyboard navigation.
- Check color contrast in both themes.
- Every essay needs title, description, publication date, canonical URL, and social image behavior.
- Generate a sitemap and feed from the same validated content collection.
- Interactive figures need a readable fallback or textual explanation.

## Review and verification rules

Every meaningful PR receives:

1. implementation self-review
2. formatting, linting, type checking, and relevant automated tests
3. rendered desktop and mobile verification for UI work
4. accessibility and reduced-motion spot checks when applicable
5. founder review before merge

PR descriptions should answer:

- What changed conceptually and why?
- What was true before and what is true after?
- Which files and surfaces changed?
- How can the reviewer verify it?
- What risks, omissions, or follow-ups remain?

Documentation-only PRs should include stale-reference and link checks. Prefer squash merges for bounded slices unless preserving commit structure has a clear benefit.
