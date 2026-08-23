# Portfolio Site V2 MVP Development Plan

## Objective

Deliver a publishable writing-first site through bounded vertical slices. The first complete essay—not a library of generic components—is the proof that the product works.

## Delivery model

Each stage below should normally become one or more short-lived PRs. Before implementation, create a matching plan in `plan/slices/` with exact scope and verification.

Do not build later-stage infrastructure early unless the active slice demonstrates the need.

## Stage 0 — Planning foundation

Deliverables:

- tightened product plan
- focused design notes
- adapted development and agent rules
- explicit MVP and non-goals
- selected framework direction

Exit criteria:

- the founder agrees that writing is the product wedge
- Astro, repo-native MDX, and derivative cross-post artifacts are accepted defaults
- implementation can begin without inventing additional top-level product areas

## Stage 1 — Application foundation

Goal: establish a small, measurable Astro baseline.

Deliverables:

- Astro + TypeScript project
- package manager and pinned dependency policy
- formatting, linting, type checking, and test baseline
- CI for required checks
- initial route and source structure
- content collection with validated essay frontmatter
- local development and authoring instructions
- initial performance budget recorded from the baseline

Expected routes:

- `/`
- `/writing`
- `/writing/[slug]`
- `/about`

Exit criteria:

- the app builds and runs locally
- a fixture essay renders statically
- invalid content metadata fails the build clearly
- the baseline ships no unnecessary client JavaScript
- checks run locally and in CI

## Stage 2 — Visual system and shell

Goal: make the global experience feel like the intended publication.

Deliverables:

- light and dark design tokens
- selected local font strategy
- spacing and layout primitives
- editorial masthead and footer
- active navigation state
- responsive behavior across phone, tablet, and desktop
- focus and reduced-motion treatments
- first portrait treatment using the v1 asset as source

Exit criteria:

- the shell is legible and intentional at representative widths
- navigation works by keyboard and touch
- both themes meet contrast expectations
- portrait use feels recognizable but not mascot-like
- font and asset loading remain within the recorded budgets

## Stage 3 — Real essay vertical slice

Goal: publish one complete essay and let real content pressure-test the system.

Recommended first subject: why APIs and MCP servers should often be treated as core products before companies build agents.

Deliverables:

- complete essay content
- production essay template
- citations/footnotes
- at least one original figure, chart, or diagram
- captions, sources, alt text, and wide-figure behavior
- code treatment only if the essay genuinely needs it
- canonical and social metadata

Exit criteria:

- the essay is excellent to read on phone, tablet, and desktop
- figures remain understandable without interaction
- page output is static except for explicitly justified islands
- metadata and social preview behavior validate
- the founder would be comfortable publishing the piece

## Stage 4 — Homepage, archive, and About

Goal: turn the essay experience into a coherent small publication.

Deliverables:

- homepage identity composition
- featured and recent-writing sections
- chronological writing archive
- concise About page with compact career context and selected work
- final empty and one-item states for the initial catalog

Exit criteria:

- writing is visibly the primary reason to visit
- all primary routes are reachable without hidden navigation
- the site does not depend on placeholder project collections
- copy and hierarchy work with the real initial essay

## Stage 5 — Publishing essentials

Goal: make the site production-ready and easy to operate.

Deliverables:

- RSS/Atom feed
- sitemap and robots behavior
- canonical URLs
- reusable Open Graph image strategy
- image optimization pipeline
- 404 page
- deployment configuration
- domain/DNS checklist for `mattdepillis.com` and `www.mattdepillis.com`
- documented publish workflow

Exit criteria:

- production deployment succeeds from a clean checkout
- domain configuration is verified
- feed and sitemap contain the published essay
- social sharing metadata renders correctly
- publishing a second simple essay requires content work, not application code

## Stage 6 — Cross-post derivative proof

Goal: reduce the cost of adapting an essay for other platforms without automating editorial judgment.

Deliverables:

- local command or script accepting an essay slug
- Substack-ready Markdown or HTML output
- Twitter/X thread draft
- LinkedIn excerpt draft
- selected figure exports in useful aspect ratios
- generated artifacts written to a clearly ignored or reviewable output directory

Exit criteria:

- the command never publishes externally
- outputs preserve canonical-link guidance and sources
- unsupported MDX components fail or degrade clearly
- generated drafts are useful starting points rather than misleading claims of platform parity

## Stage 7 — First post-launch decision review

After at least several essays or a meaningful period of real use, evaluate evidence for:

- Notion draft import
- tags or search
- separate Projects section
- reusable interactive-chart infrastructure
- richer embeds
- analytics beyond basic operational needs

Do not schedule these as automatic follow-on stages. Each requires a demonstrated publishing or reader problem and a new bounded plan.

## MVP merge criteria

The MVP is ready for public replacement of v1 when:

- the four primary routes are polished
- at least one real illustrated essay is published
- authoring and deployment are documented
- cross-post drafts can be generated locally
- performance, accessibility, responsive, metadata, feed, and sitemap checks pass
- the configured production domains resolve correctly
- known limitations and deferred decisions are documented
