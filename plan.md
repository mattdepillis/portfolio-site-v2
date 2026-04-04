# Portfolio Site V2 Plan

## Purpose

This document is the shared working plan for redesigning `mattdepillis.com` as a faster, more mature, more intentional personal website.

It is written for both humans and agents:

- to keep product and engineering decisions aligned
- to preserve the reasoning behind major tradeoffs
- to define a staged build approach we can execute incrementally

This is a plan for **version 2**, to be built in:

- `projects/portfolio-site-v2`

The current production site and its source remain useful as reference, but **v2 should be treated as a fresh product**, not a visual or architectural extension of v1.

## Resolved Direction From Discussion

The following inputs have been explicitly provided and should be treated as defaults for v2 planning unless changed later.

### Stack posture

- No attachment to the current stack
- Priority is the best balance of flexibility and performance
- We should choose the stack intentionally instead of inheriting old decisions

### Authoring posture

- Preferred model is a mix of Notion and markdown
- There should be room for partial customization and custom rules
- Authoring should eventually support macro-like behavior:
  - reusable content patterns
  - shortcodes/components
  - structured inserts for embeds, callouts, code walkthroughs, references, and other repeated patterns

### Visual posture

- Dark mode is desirable, but only if it is elegant and clearly designed
- Dark mode is now a requirement, not a maybe
- The homepage should foreground your serious professional identity
- The site should move away from casual personality-first framing
- The icon should retain continuity with the current hand-drawn identity, but can be reinterpreted:
  - pixelated
  - monochrome
  - multi-tone pixel treatment
  - derived from either the existing drawing or a processed photo
  - explored from both the current drawing and a portrait/photo source

### Editorial posture

- Writing should be rational, thoughtful, and grounded
- The point is articulation and learning, not engagement bait or pseudo-thought leadership
- Essays should reflect your perspective as a 28-year-old engineer working in tech
- Project writing should explain what you pursued, why, and what the work reveals about how you think
- Project pages should not overreach into over-produced case studies
- The preferred feel is closer to a technical journal with personal thoughtfulness than a polished “thought leadership” blog
- The writing should usually focus on implications, systems, technology, business, and society rather than getting deeply implementation-heavy

## What We Learned From V1

### Current v1 state

The current site at `www.mattdepillis.com` is effectively a Notion-rendered site built on top of:

- Next.js 12
- `react-notion-x`
- Notion page/block semantics as the core rendering model
- a large CSS override layer to restyle Notion UI

### Main weaknesses in v1

- Too much of the experience is defined by Notion’s structure instead of the site’s own product design.
- `react-notion-x` pulls the project toward a heavier client bundle and a more complex rendering path than is justified for a personal site.
- The site is visually closer to “customized Notion” than a distinct, polished brand.
- Styling depends heavily on overrides and block-specific hacks, which makes the system fragile.
- The current presentation is more personal / playful than the direction you now want.
- The live UX reads more like a rendered document than a purposeful portfolio product.

### What should carry over from v1

- The hand-drawn personal icon is distinctive and worth preserving in evolved form.
- Notion is still useful as a content source if used as a CMS, not as the UI.
- Writing, project showcasing, and rich content should remain first-class.
- The site should still feel authored and personal, but with stronger editorial restraint and professional maturity.

## Product Goals

### Primary goals

- Sleek
- Fast
- Professional
- Highly readable
- Visually distinctive without being loud
- Easy to maintain and publish through chat + markdown planning workflows

### Experience goals

- The site should feel calm, sharp, and considered.
- The visual language should evoke Le Labo style cues:
  - off-white paper-like surfaces
  - black ink
  - restrained typography
  - label-inspired hierarchy
  - high information clarity
- Motion should add polish, not spectacle.
- Rich content should feel intentional and interactive, but never heavy or gimmicky.

### Content goals

- Present you as a serious engineer with taste, judgment, and range.
- Support durable pages such as:
  - Home
  - About
  - Projects
  - Writing
  - Possibly a Now / Notes / Experiments layer later
- Support richer embeds and interactive content when content actually benefits from them.

### Professional framing goals

- Present a clearer point of view on your work as an engineer
- Demonstrate seriousness without becoming stiff or self-important
- Show capability through specificity, restraint, and evidence
- Let writing and project selection reinforce professional maturity

## Non-Goals

- Recreating Notion’s block model on the public website
- Shipping a visually maximal, trendy portfolio
- Building a CMS UI from scratch in v1 of this codebase
- Downloading heavy client-side libraries by default for all visitors
- Making every page highly animated

## Design Direction

### Core visual direction

The visual reference is not “copy Le Labo.” It is:

- editorial labeling
- precision
- tactile neutrality
- premium restraint

But the experiential center of gravity should lean slightly away from pure product-label minimalism and toward:

- technical journal
- considered notes
- informed but informal reflection
- a serious personal publication

We want a site that feels like:

- a well-designed technical portfolio
- a printed object translated to the web
- understated, but memorable

### Likely design characteristics

- Warm off-white background instead of pure white
- Dense black or near-black typography
- One primary grotesk / neo-grotesk / utility font pairing with possible monospace accent
- Strong spacing system with obvious rhythm
- Label-like metadata treatment for dates, categories, roles, technologies
- Thin rules, quiet dividers, subtle paper-like texture or grain only if it stays cheap
- Large readable type for headings, disciplined body measure, strong mobile readability

### Personal icon direction

The existing drawn icon should be explored as a v2 brand asset.

Potential directions:

- black-only version
- simplified monochrome mark
- slightly pixelated or dithered variant
- stamped / printed label treatment

Constraint:

- it should feel integrated into the system, not like a leftover mascot from a different product

### Motion direction

Use a small number of deliberate effects:

- page-load fade/slide reveals
- image or card hover treatment
- section transition polish
- optional canvas interactions that activate only where useful

Avoid:

- constant motion
- scroll-jacking
- animation-first layouts

## Product Structure

### Recommended top-level IA

Initial information architecture:

- `/` Home
- `/about`
- `/projects`
- `/writing`
- `/writing/[slug]`
- `/projects/[slug]`

Possible later additions:

- `/lab`
- `/uses`
- `/now`
- `/bookmarks`

### Recommended homepage role

The homepage should not be a generic hero-plus-cards landing page. It should work as a tightly edited front door:

- concise positioning statement rooted in your professional identity
- a short introduction that frames what kind of engineer and writer you are
- a compact identity signal such as location, role, and focus
- selected project highlights
- selected writing highlights
- a compact signal of active technical interests or current lines of inquiry

The homepage should answer:

- who you are
- what kind of engineer you are
- what you build
- what is worth clicking next

It should not lead with:

- hobby-first identity
- “passion project” framing
- lifestyle signals that weaken the professional tone

It should also avoid:

- a “currently thinking about” module on the homepage

Reason:

- the homepage should stay evergreen, tightly edited, and low-noise

Homepage cues likely worth preserving in evolved form:

- your icon as a recognizable anchor
- New York as part of your professional identity
- software engineer framing
- a navigation pattern that feels novel and intentional without becoming obstructive

### About page role

The About page should become meaningfully more mature than v1.

It should emphasize:

- a concise view of your career
- engineering judgment
- product sense
- systems thinking
- breadth across frontend, backend, platform, and delivery
- intellectual interests beyond raw implementation
- what you are trying to build toward

Recommended tone and format:

- short
- direct
- personal but professionally framed
- more “career + interests + direction” than memoir or manifesto
- likely a hybrid of short prose plus a compact visual/timeline element

It should avoid:

- reading like a casual autobiography
- sounding inflated or over-branded
- repeating resume bullets without synthesis

Potential structure:

- short intro paragraph
- compact career timeline
- brief note on interests, capabilities, and what you are building toward

Timeline concept currently in scope:

- UVA
- Capital One
- DoorDash

The timeline can become an interactive module if it stays elegant and cheap to load.

### Projects page role

The Projects page should present selected work with stronger narrative framing:

- what the project is
- why it mattered
- what role you played
- key technical and product decisions
- outcome, learning, or tradeoff

The default unit should be a **compact but thoughtful professional project entry**, not a giant case study.

Each project should generally feel like:

- a sharp explanation of what you built or explored
- a statement of why it was worth pursuing
- a signal of your engineering judgment

Deep dives can exist, but they should be the exception.

GitHub and demo links should be handled per project, not enforced uniformly.

That means:

- some projects can foreground GitHub or live links
- some can treat links as secondary
- the template should support both without feeling inconsistent

### Writing section role

The Writing section should feel editorial, not blog-template generic.

It should support:

- essays
- technical posts
- project reflections
- curated notes / references later if desired

The writing stance should be:

- rational
- reflective
- independent
- non-performative
- informed but informal
- more “serious notes and essays” than “polished content brand”

The writing should avoid:

- engagement bait
- faux-contrarianism
- generic AI discourse
- overclaiming expertise

The strongest writing likely sits at the intersection of:

- engineering
- AI and software practice
- product/common-sense business thinking
- lessons from real work and lived technical experience
- broader implications for how technology interacts with work, organizations, and society

### Writing index and discovery

The writing index should support more than one browsing mode.

Recommended modes:

- list view for clarity and scanning
- gallery/card view for a more visual browsing experience when cover images are strong

This can borrow the spirit of Notion collection views without inheriting Notion UI.

Recommended filters:

- optional tags
- optional featured grouping
- chronological ordering by default

View mode should be:

- user-switchable between list and gallery

## Content Model Strategy

### Core principle

Use Notion as a **content source**, not as a presentation engine.

That means:

- Notion stores structured content and assets
- the site transforms Notion data into its own rendering model
- the frontend owns UX, layout, typography, interactions, and performance

### Recommended content model

Instead of relying on arbitrary block rendering, define a limited internal content schema for v2.

Suggested content entities:

- `siteSettings`
- `aboutPage`
- `project`
- `post`
- `linkCollection` or `curationItem` later

### Hybrid authoring model

Recommended publishing model:

- Notion for operational content management, lightweight structure, drafts, and asset organization
- markdown or MDX-like repo content for pieces that benefit from tighter control, custom components, versioning, or richer author-defined formatting

Working default:

- markdown-first for long-form published essays
- Notion available for drafting, metadata, simpler pages, and CMS-oriented content

This gives us:

- CMS convenience where useful
- repo-native control where useful
- less lock-in to one authoring experience

### Recommended split of responsibility

Use Notion for:

- project metadata
- post metadata
- editorial queue / draft tracking
- link collections
- assets and references
- simpler content bodies when the content is mostly text + media
- lightweight collection management if we want list/gallery editorial control

Use repo markdown for:

- polished essays
- posts that need custom formatting
- content using custom components/macros
- technically dense posts with code, diagrams, or unusual structure
- pages that should be easy to diff and evolve with the codebase
- long-form writing with embedded links, images, graphs, or custom visual modules

### Macro / shortcode concept

The “Excel macro” instinct is valid, but we should implement it as a safe authoring abstraction.

Recommended form:

- custom markdown directives
- MDX components with strict allowed imports
- or a small shortcode syntax that compiles into approved site components

Examples:

- `GitHubCard`
- `YouTubeCard`
- `SpotifyTrack`
- `Diagram`
- `Graph`
- `Canvas`
- `SideNote`
- `Callout`
- `ProjectMeta`
- `Expandable`
- `ReferenceList`

Important constraint:

- custom authoring power should be intentionally bounded
- authors should not be writing arbitrary application logic inside content files

### Suggested project fields

- `title`
- `slug`
- `summary`
- `year`
- `status`
- `role`
- `teamContext`
- `techStack`
- `coverImage`
- `thumbnail`
- `externalUrl`
- `githubUrl`
- `content`
- `featured`

### Suggested post fields

- `title`
- `slug`
- `excerpt`
- `publishedAt`
- `updatedAt`
- `tags`
- `coverImage`
- `content`
- `featured`

### Content body format

Preferred approach:

- support two content inputs:
  - normalized Notion content
  - markdown/MDX content compiled in-repo
- transform both into a common internal rendering contract where practical
- render only the subset of block/content types we choose to support

Supported initial body components might include:

- paragraph
- heading
- list
- quote
- image
- code block
- callout
- divider
- embed card
- simple diagram image
- disclosure / accordion
- graph / chart block
- lightweight custom canvas module

Visual assets should primarily assume:

- static images
- static charts/graphs
- curated internet-sourced imagery where appropriate
- AI-generated images where useful
- hand-drawn or iPad-created illustrations where they improve the piece

This gives us rich content without inheriting Notion’s full UI complexity.

### Rendering contract idea

To keep the system coherent, the website should not care whether a paragraph, image, or embed card came from Notion or markdown.

The better long-term design is:

- content source adapters
- shared normalized content shapes
- shared render components

That allows us to preserve one design system across multiple authoring sources.

## Technical Strategy

### Recommended stack

We should choose the stack on present goals, not familiarity.

#### Option A: modern Next.js App Router

Strengths:

- strong flexibility for both content pages and richer interactive modules
- React Server Components support a server-first model
- excellent ecosystem depth
- good path for custom data pipelines, API endpoints, and selective interactivity
- strong future-proofing if the site grows beyond “content site”

Weaknesses:

- easier to accidentally ship more client code than intended
- requires discipline to preserve performance excellence

#### Option B: Astro

Strengths:

- excellent performance baseline for content-heavy sites
- island architecture naturally enforces limited hydration
- very good fit for editorial pages and partial interactivity

Weaknesses:

- slightly less natural if the site evolves into richer React-heavy interactions
- a second layer of decisions appears if we want a lot of custom interactive modules

#### Recommendation

Current recommendation:

- use modern Next.js App Router with a strict server-first architecture

Reason:

- it gives the best flexibility/performance combination for this specific site
- it can stay very fast if we keep client components rare
- it will better accommodate the richer interactive canvas and custom content modules you may want later

Recommended baseline:

- current-generation Next.js App Router
- TypeScript
- React Server Components by default
- minimal client components
- static generation or ISR where appropriate
- custom design system using CSS modules or a disciplined styling approach
- a narrow content compilation pipeline for markdown and Notion

Possible additions:

- `next/font` for local or optimized font loading
- MDX or custom markdown directives for controlled macros/components
- light content transformation utilities for Notion ingestion
- optional motion library only if its bundle cost and usage are justified
- local content collections or typed validation where useful

### Rendering strategy

Default to server-rendered, content-first pages.

Rules:

- pages should render useful HTML without client hydration dependency
- client JavaScript should be reserved for components that are actually interactive
- embeds and heavy widgets should load lazily and only where present
- markdown/macros should compile to stable server-rendered output whenever possible

### Why this architecture

This directly addresses the v1 problems:

- faster by default
- no full Notion renderer in the browser
- stronger control over layout and visual identity
- cleaner long-term maintainability
- easier to design rich interactions intentionally instead of inheriting them

## Rich UX Without Heavy Delivery

### Requirement

You want:

- interactive canvas
- code blocks
- diagrams
- pictures
- dropdown links
- clickable content
- embeds from GitHub / Notion / Spotify / YouTube

But also:

- no heavy default payload
- no unnecessary client-side complexity

### Proposed solution

Adopt a progressive enhancement model.

#### Tier 1: default cheap content

Always cheap:

- text
- images
- metadata
- project cards
- expandable sections using native HTML patterns where possible
- syntax-highlighted code rendered server-side or at build time

#### Tier 2: conditional rich modules

Only loaded when present:

- Spotify embed wrapper
- YouTube embed wrapper
- GitHub repo / gist / commit / PR cards
- diagram viewer
- interactive figure / canvas modules

GitHub treatment should be variable:

- lightweight metadata card
- simple external link
- richer embedded context where justified

#### Tier 3: opt-in advanced interactive canvas

For special pages only:

- lightweight interactive diagrams
- annotated system diagrams
- code walkthrough cards
- hotspot-based media
- author-defined canvas-like modules for richer article experiences

This should be implemented as isolated, intentionally loaded components, not as a site-wide dependency.

## Integration Strategy

### Notion

Recommended role:

- CMS and asset source
- structured databases for projects and posts
- simple content body source
- editorial workflow layer

Recommended constraint:

- avoid depending on complex nested Notion layouts or advanced block behavior

### GitHub

Potential uses:

- project metadata sync
- pinned repositories or selected repo cards
- commit/activity references later
- automatic fetch of stars/language/update info for showcased repos

Recommendation:

- do not make live GitHub API calls from every request
- fetch and cache server-side
- degrade gracefully if GitHub data is unavailable

### Spotify / YouTube

Recommendation:

- support as optional embeds or link cards
- default to lightweight preview cards first
- hydrate actual embeds only when needed or on interaction where possible

## Navigation Strategy

### Requirement

Navigation should feel intentional and memorable, but it should not become a usability tax.

Avoid:

- buried hamburger-only mobile navigation
- novelty that makes page discovery harder
- repeating the v1 dock pattern if it no longer fits the product

### Recommended direction

Explore a navigation system that is:

- visible
- elegant
- touch-friendly
- keyboard-friendly
- easy to understand on first use

Possible directions:

- persistent top rail with expressive section switching
- compact side or corner rail on larger screens that collapses gracefully on mobile
- segmented editorial navigator
- hybrid header + section index pattern

Working instruction:

- explore multiple concepts before choosing
- favor options that remain intuitive without forcing hamburger-first navigation

Evaluation criteria:

- easy on iPhone
- calm on iPad
- polished on Mac
- does not obstruct reading
- distinct enough to feel authored

### Markdown / MDX

Recommended role:

- source of truth for high-value written pieces and custom-composed content
- place for macro-like reusable content components
- version-controlled long-form writing
- default source for published long-form essays

Recommendation:

- keep the allowed custom component surface area curated and documented
- do not turn content into arbitrary frontend code

### Dark mode

Recommendation:

- support dark mode as a first-class counterpart, not a color inversion

Launch rule:

- dark mode must ship with design parity, not as an afterthought

If included, dark mode should preserve:

- the editorial restraint
- the paper/ink metaphor in a night-friendly form
- legibility and contrast discipline
- the premium minimal feel

### Notion embeds inside site content

If you want to reference Notion pages or docs, prefer:

- screenshot/card/summary treatment
- or a simple external link card

Avoid embedding raw Notion UI unless a page specifically needs that behavior.

## Performance Principles

These should be hard constraints for the build.

- Fast initial paint on content pages
- Minimal JavaScript on non-interactive routes
- No large UI libraries without strong justification
- No full-client Notion renderer
- Images optimized and dimensioned properly
- Fonts loaded intentionally and kept lean
- Animation budgets respected
- Third-party embeds isolated and lazy

## Responsive Design Principles

This site must be designed intentionally for all surfaces, not merely adapted after desktop design.

North-star surfaces:

- iPhone
- iPad
- MacBook and desktop-class Apple displays

### Requirements

- every core route should feel native and complete on mobile
- tap targets should be comfortable and obvious
- typography should remain readable without zooming
- navigation should work cleanly on touch and pointer devices
- gallery/list views should reflow intentionally, not collapse awkwardly
- images and media should preserve composition across breakpoints
- animations should remain smooth and restrained on smaller devices

### Design approach

- mobile-first for constraints
- desktop-aware for spaciousness and editorial rhythm
- tablet treated as a real target surface, not an in-between accident

### Performance budget mindset

Every new dependency should answer:

- why is this better than custom code?
- what does it cost in JS/CSS/network?
- can it be server-rendered or deferred?

## Editorial / Tone Direction

### Desired tone

- intelligent
- grounded
- serious
- technically credible
- aesthetically literate

### Avoid

- over-sharing
- startup cliché copy
- inflated self-mythologizing
- unserious whimsy on core professional pages

### Writing style for key pages

- tighter
- more deliberate
- more reflective
- more outcome- and judgment-oriented

### Writing philosophy

The site should treat writing as part of professional identity, not side content.

That means:

- essays are evidence of taste and clarity, not “content marketing”
- technical writing should prioritize articulation over performance
- posts should read like someone thinking carefully in public
- even informal pieces should maintain standards for reasoning and prose

Most essays should land in one of these modes:

- technical-journal reflection
- implications-oriented analysis
- practical thinking about AI, business, software, and institutions
- grounded observations from real engineering work

### Project philosophy

Projects should not be forced into grand narratives.

A project page can succeed by doing three things well:

- naming the problem or curiosity
- showing what was built or explored
- revealing the quality of your thinking

This is a better fit than padding entries into fake case studies.

## Build Plan

### Phase 0: Foundation and Direction Lock

Deliverables:

- this `plan.md`
- visual direction notes
- final stack decision
- initial content model decision
- route map
- navigation concept exploration

Questions to settle in this phase:

- font direction
- content source details
- animation appetite
- initial scope of interactive canvas
- icon asset treatment direction
- preferred navigation direction after concept exploration

### Phase 1: Scaffold V2 Application

Goals:

- create the new app shell
- establish design tokens
- establish typography
- define layout primitives
- implement top-level routes

Deliverables:

- app scaffold
- shared layout
- navigation
- footer
- theme variables
- placeholder pages
- content source abstraction layer stub
- responsive layout primitives

### Phase 2: Design System and Brand Layer

Goals:

- translate the Le Labo-inspired direction into reusable UI primitives
- define card styles, metadata labels, rules, buttons, content wrappers
- explore the personal icon treatment
- explore several navigation concepts and select one

Deliverables:

- color system
- typography system
- spacing system
- motion rules
- icon treatment direction
- light and dark theme rules with parity by design
- responsive behavior rules for phone, tablet, and desktop
- navigation concept comparisons

### Phase 3: Content Ingestion Pipeline

Goals:

- define how content comes from Notion and markdown
- transform both sources into a smaller normalized site model
- keep unsupported block behavior out of scope

Deliverables:

- content fetch utilities
- markdown compilation path
- typed transformation layer
- caching strategy
- schema documentation
- authoring rules for macros/components

### Phase 4: Core Pages

Goals:

- build polished, production-quality versions of:
  - Home
  - About
  - Projects index
  - Project detail
  - Writing index
  - Writing detail

Deliverables:

- complete page templates
- empty/loading/error states
- mobile refinement
- tablet refinement
- metadata and social previews

### Phase 5: Rich Content Modules

Goals:

- add lightweight enhanced content blocks without bloating the site

Candidate modules:

- code block renderer
- image figure / gallery
- disclosure groups
- embed cards
- lazy media embeds
- interactive diagram/canvas primitives

Selection rule:

- no module should ship unless it clearly improves the reading or exploration experience

### Phase 6: Performance and Polish

Goals:

- tune bundle size
- check mobile rendering
- refine animation
- finalize accessibility and SEO basics

Deliverables:

- performance pass
- accessibility pass
- responsive pass
- deployment readiness

### Phase 7: Content Workflow

Goals:

- make future publishing easy through chat + markdown planning
- create a repeatable “ideate -> plan -> implement -> publish” loop

Deliverables:

- content workflow docs
- templates for new posts/projects
- rules for when content comes from Notion vs repo files

## Recommended Implementation Order

If we want the best ratio of momentum to clarity, the order should be:

1. Decide v2 technical baseline and visual system.
2. Scaffold the new app in `portfolio-site-v2`.
3. Build the shell and top-level navigation.
4. Implement the content model and fetch pipeline.
5. Build Home and About first, because they define tone.
6. Build Projects and Writing indexes next.
7. Build detail-page templates.
8. Add rich modules only after the core reading experience is excellent.
9. Tune performance at the end of each major phase, not only once.

## Proposed Key Decisions

These are the current recommended decisions unless we deliberately override them.

### Decision 1: Do not use `react-notion-x` in v2

Reason:

- wrong abstraction level for the site you now want
- preserves too much Notion UI baggage
- works against performance and distinct design goals

### Decision 2: Keep Notion as CMS, but restrict the supported surface area

Reason:

- preserves editing convenience
- avoids over-building authoring tools
- keeps presentation fully under site control

### Decision 2A: Add markdown as a first-class source for selected content

Reason:

- supports versioned long-form writing
- makes custom formatting and macros practical
- reduces dependence on Notion for every authored experience

### Decision 2B: Markdown is the default publishing path for long-form essays

Reason:

- best fit for links, images, graphs, and custom modules
- easiest to evolve with code and content together
- matches the journal/essay direction better than block-first authoring

### Decision 3: Server-first by default

Reason:

- best fit for speed, SEO, and reading experience
- aligns with the requirement to avoid shipping too much client code

### Decision 4: Rich interactions should be modular, not global

Reason:

- keeps normal pages lean
- lets special content be special
- avoids turning the whole site into a JS application

### Decision 5: The About page should be treated as product copy, not resume copy

Reason:

- this page will shape perceived maturity more than almost anything else

### Decision 6: The homepage leads with professional identity first

Reason:

- matches the repositioning goal
- creates a clearer first impression for employers, peers, collaborators, and readers
- still leaves room for personality through design and writing rather than casual framing

### Decision 7: Projects default to concise, thoughtful entries instead of case studies

Reason:

- better matches your real intent
- avoids bloat and overclaiming
- keeps the emphasis on judgment and substance

### Decision 8: Writing should be treated as serious intellectual output, not audience bait

Reason:

- aligns the site with your actual motivation
- produces more durable content
- strengthens the credibility of the entire portfolio

### Decision 9: Writing tone should lean toward an informal technical journal

Reason:

- captures the right balance of seriousness and personality
- creates room for ideas about technology, business, and society without sounding performative
- differentiates the writing from both diary-style blogging and overproduced technical essays

### Decision 10: Icon exploration should start from both the drawing and portrait reference

Reason:

- preserves continuity with the current identity
- gives us more room to find a strong modernized mark
- allows us to compare illustrated versus photo-derived pixel treatments

### Decision 11: Writing index should support both list and gallery modes

Reason:

- captures some of Notion’s useful collection flexibility without inheriting its UI
- lets strong cover images improve browsing when appropriate
- preserves a cleaner list mode for scanning-heavy readers

### Decision 11A: List and gallery should be user-switchable

Reason:

- matches how you want to browse the writing section
- preserves flexibility without locking the section into one presentation
- gives readers control based on whether they prefer scanning or browsing visually

### Decision 12: GitHub treatment should be variable by project

Reason:

- not every project benefits from the same link hierarchy
- some work should foreground code, while other work should foreground explanation
- the template should fit the project instead of forcing a uniform pattern

### Decision 13: Responsive design is a first-order product requirement

Reason:

- the site must feel intentionally designed on iPhone, iPad, and Mac-class screens
- navigation and reading quality depend on responsive discipline
- mobile and tablet cannot be treated as a later cleanup pass

### Decision 14: The homepage should remain evergreen and tightly edited

Reason:

- avoids clutter on the most important page
- keeps attention on identity, projects, and writing
- prevents the homepage from becoming a running notes feed

### Decision 15: The About page should combine short prose with a compact career timeline

Reason:

- matches your preference for something simple and informative
- gives enough professional history without turning the page into a resume dump
- creates room for an elegant interactive timeline treatment if it improves the page

## Risks and Mitigations

### Risk: design drift into generic minimal portfolio

Mitigation:

- define visual principles early
- build reusable motifs from the label/editorial direction
- be explicit about typography, density, and metadata styling

### Risk: content model becomes too close to rebuilding Notion

Mitigation:

- support only a narrow set of intentional block types
- reject “render everything” scope creep

### Risk: embeds bloat the experience

Mitigation:

- use preview cards by default
- lazy load real embeds
- isolate heavy widgets

### Risk: the site becomes too sterile or impersonal

Mitigation:

- retain distinctive personal assets
- keep a strong authored voice
- use the icon and selected visual flourishes with restraint

## Open Questions

These are the remaining clarifications that would improve implementation quality, but they no longer block the high-level plan.

1. For the About timeline, do you want a strictly chronological strip, or something more spatial/editorial with logos and short annotations?
2. Should the timeline live directly inside the main About flow, or as a compact module beneath the intro prose?
3. For navigation exploration, do you want the most experimental option still kept within “clearly obvious to first-time visitors,” or are you open to something slightly more novel if it remains learnable?

## Working Recommendation Summary

If we started implementation right now, the recommended baseline would be:

- Next.js App Router
- TypeScript
- server-first architecture
- Notion plus markdown hybrid content model
- controlled macros/components for rich authored content
- elegant light and dark themes designed together
- professional-first homepage framing
- evergreen homepage without a “currently thinking” module
- concise but thoughtful project entries
- markdown-first long-form writing with rational, non-bait tone
- icon exploration using both current drawing and portrait reference
- responsive-first design across iPhone, iPad, and Mac
- list and gallery browsing modes for writing
- compact About page with prose plus a career timeline

## Collaboration Workflow

The workflow you described should become the standard operating model for this repo.

### Planned workflow

1. Use chat to define or refine a page, content idea, feature, or design direction.
2. Capture the result in markdown planning files inside the repo.
3. Translate the plan into code and content model changes.
4. Review the output visually and structurally.
5. Iterate in small, traceable passes.

### Why this workflow fits the project

- it keeps intent explicit
- it makes agent work more reliable
- it gives you a durable design and editorial record
- it lowers the chance of ad hoc UX drift

### Recommended planning file types

As the project grows, it will help to standardize a few markdown document types:

- `plan.md` for product/architecture direction
- `design-notes.md` for visual system and page composition decisions
- `content-notes.md` for page copy strategy and editorial ideas
- `implementation-notes.md` for technical decisions, constraints, and follow-ups

## Immediate Next Step

After this plan is approved, the next step should be:

- initialize the v2 application
- lock the stack
- create the first visual system pass
- build the top-level shell and homepage structure

At that point we can start iterating in the workflow you described:

- ideate in chat
- capture decisions in markdown
- implement against the plan
