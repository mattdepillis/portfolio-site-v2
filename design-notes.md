# Portfolio Site V2 Design Notes

## Purpose

This document translates the product plan into a more concrete design brief.

It is intended to answer:

- what the site should feel like
- how the core pages should be composed
- what navigation concepts are worth exploring
- how the icon and brand layer should evolve
- what should be built first once design direction is approved

This file should be reviewed before the first implementation PR.

## Working Design Summary

The site should feel like a serious personal technical journal and portfolio:

- calm
- readable
- intentional
- slightly novel
- professional without being corporate
- personal without being diaristic

The reference point is not “luxury minimalism” by itself. The better framing is:

- Le Labo discipline
- editorial labeling
- technical journal clarity
- thoughtful personal publication

This means the site should feel:

- less like a SaaS landing page
- less like a Notion clone
- less like a playful personal scrapbook
- more like an authored publication by a working engineer with taste

## Core Design Principles

### Principle 1: Reading comes first

The site is primarily for:

- understanding who you are
- reading what you think
- seeing what you build

Every visual decision should support those goals.

### Principle 2: Novel, not confusing

The site should have a distinct interaction model, but novelty must remain within familiar mental models.

The user should never wonder:

- where am I?
- how do I get somewhere else?
- how do I close this?

### Principle 3: Quiet confidence

The design should signal confidence through:

- typography
- spacing
- hierarchy
- clarity

Not through:

- visual clutter
- excessive motion
- oversized self-branding

### Principle 4: System over one-off styling

The visual language should come from a coherent system:

- color tokens
- spacing rules
- content wrappers
- metadata patterns
- motion rules

Not from page-specific hacks.

### Principle 5: Multi-surface by design

The site should feel intentional on:

- iPhone
- iPad
- Mac

Tablet is a real target, not a fallback breakpoint.

## Visual Direction

### Overall mood

Key adjectives:

- editorial
- tactile
- sharp
- modern
- warm
- disciplined

### Light theme direction

Primary mood:

- off-white paper
- soft black ink
- faint structural lines
- warm neutrals

Likely palette direction:

- paper background rather than pure white
- black or near-black text
- muted grays for secondary metadata
- one restrained accent family for states and emphasis

Accent usage should be sparse. It should not read like a brand-heavy startup site.

### Dark theme direction

Dark mode should not be a simple inversion.

Target feel:

- dark editorial desk
- muted charcoal background
- warm gray text
- controlled contrast
- slightly luminous lines/highlights

Dark theme should preserve:

- readability
- spacing rhythm
- the paper/ink metaphor translated for night

### Texture and background treatment

Potential background treatments:

- plain paper tone
- subtle noise/grain overlay
- very faint grid or ruled-paper reference
- soft spotlight or vignette in hero sections

Recommendation:

- keep this extremely subtle
- default toward restraint
- avoid effects that make text feel less sharp

## Typography Direction

### Tone

Typography needs to do most of the branding work.

It should feel:

- serious
- readable
- contemporary
- slightly editorial

### Recommended structure

Use a restrained three-role system:

- display or heading face
- body face
- monospace utility face

### Heading direction

Headings should feel:

- firm
- readable
- not overly ornamental

Avoid:

- soft geometric startup fonts
- overly trendy editorial serifs unless they clearly outperform sans options

### Body direction

Body text should be:

- highly readable
- slightly compact
- comfortable for long essays

The body should support:

- strong list rhythm
- good blockquote treatment
- clean metadata rows
- elegant captions

### Monospace direction

Use monospace sparingly for:

- labels
- metadata
- code
- subtle UI signals

It should reinforce the technical journal feel without turning the whole site into a terminal aesthetic.

## Brand and Icon Direction

## Goal

The icon should become a durable identity anchor for the new site.

It should feel:

- personal
- recognizable
- refined enough to live in a more serious system

### Source material

We should begin from:

- the existing hand-drawn icon
- your portrait reference

### Candidate directions

#### Direction A: Pixelated drawing

Take the existing drawing and convert it into:

- a monochrome pixel icon
- a dithered portrait mark
- a crisp avatar-like symbol

Best for:

- continuity with v1
- keeping the identity personal

Risk:

- could feel too playful if the treatment is too cute

#### Direction B: Pixelated portrait

Use the portrait reference as source material and derive:

- a reduced pixel portrait
- a black-and-off-white graphic treatment
- a slightly posterized avatar

Best for:

- maturity
- a stronger sense of real-person identity

Risk:

- can feel generic if not stylized enough

#### Direction C: Hybrid mark

Use the drawing as the base silhouette and the portrait to tune:

- hair shape
- face proportions
- expression

Then render the result as:

- a pixel or dithered mark
- a monochrome label stamp
- a compact editorial avatar

Best for:

- balancing continuity and seriousness

Current recommendation:

- explore all three quickly
- expect Direction C to be the strongest long-term option

### Placement ideas

The icon can appear in:

- homepage identity block
- header/navigation system
- favicon/app icon derivative
- About page accent

Constraint:

- it should not appear so often that it becomes mascot-like

## Navigation Concepts

Navigation needs to be a signature element of the site.

Requirements:

- obvious
- elegant
- responsive
- touch-friendly
- keyboard-friendly
- not hamburger-first

Below are the strongest concepts worth exploring before implementation.

### Concept 1: Editorial Top Rail

Description:

- a persistent top navigation bar
- section links treated like editorial categories
- compact identity block on the left
- optional right-side utility controls for theme and writing view mode

Desktop behavior:

- stable top row
- subtle underline or indicator for current section
- hover states with restrained motion

Mobile behavior:

- remains visible
- converts to a horizontally scrollable segmented rail or condensed stacked header
- no buried hamburger required

Pros:

- highly intuitive
- strong baseline usability
- easiest to keep elegant

Cons:

- least novel if not styled carefully

Best fit:

- if we want the safest and most universally usable option

### Concept 2: Corner Rail / Vertical Spine

Description:

- compact left-side or corner-attached navigation on large screens
- acts like a publication spine or table of contents
- collapses into a top rail on smaller screens

Desktop behavior:

- vertical stack or anchored corner menu
- strong sense of identity
- section indicator can feel editorial and spatial

Mobile behavior:

- becomes a clean top bar
- avoids forcing a hamburger drawer

Pros:

- more distinctive than a normal top nav
- creates a stronger “publication object” feel

Cons:

- can become intrusive if too heavy
- needs careful responsive behavior

Best fit:

- if we want a more authored desktop feel without sacrificing mobile usability

### Concept 3: Segmented Navigator

Description:

- navigation behaves like a segmented control or mode switcher
- each top-level section feels like switching views in a publication/workspace

Desktop behavior:

- centered or partially centered segmented strip
- active section strongly indicated

Mobile behavior:

- still visible and tappable
- can become a swipeable segmented header

Pros:

- clean
- tactile
- modern
- works well with list/gallery toggles and other view controls

Cons:

- needs enough room for labels
- can feel too app-like if overdone

Best fit:

- if we want a slightly product-like but still editorial interaction model

### Concept 4: Hybrid Header + Section Index

Description:

- simple persistent header for global navigation
- contextual sub-navigation or section index on certain pages

Example:

- top rail for Home / About / Projects / Writing
- writing pages gain an additional local index or filter rail
- About page gains a timeline jump control

Pros:

- most scalable
- strong for content-heavy sections
- intuitive on desktop and mobile

Cons:

- more system design work
- can get heavy if not restrained

Best fit:

- if we expect writing and projects to grow substantially

### Navigation Recommendation

Start design exploration with:

1. `Editorial Top Rail`
2. `Corner Rail / Vertical Spine`
3. `Hybrid Header + Section Index`

Do not lead with:

- hamburger-only nav
- bottom mobile dock repeat from v1
- hidden drawer as primary interaction

## Homepage Concepts

The homepage should be strong, fast, and memorable.

It should answer:

- who Matt is
- what he does
- why his work/thinking is worth opening

It should remain evergreen and tightly edited.

### Homepage content blocks

Core blocks that likely belong:

- identity block
- concise positioning line
- selected projects
- selected writing
- navigation anchor

Potential supporting blocks:

- mini credentials/location line
- selected technologies or themes
- small media/artifact area if it materially improves the page

Do not include:

- constantly updated “what I’m thinking about”
- large autobiographical intro
- too many cards above the fold

### Concept A: Identity Ledger

Description:

- homepage opens with a strong identity panel
- icon, name, location, role, and concise descriptor
- sections below read like labeled entries in a well-designed ledger

Visual feel:

- label-inspired
- structured
- quiet
- premium

Strength:

- very aligned with the original design brief

Risk:

- can feel too static if not given one strong interaction idea

### Concept B: Journal Front Page

Description:

- homepage feels like the cover/front page of a technical journal
- strong heading + intro block
- featured writing and projects presented as editorial entries
- navigation integrated into the publication motif

Visual feel:

- more publication-first
- slightly more informal than Concept A

Strength:

- best fit for the “technical journal + personal thoughts” direction

Risk:

- could underplay the portfolio side if project signals are too soft

### Concept C: Split Identity + Work

Description:

- hero is split into:
  - identity/personal anchor on one side
  - selected work/writing cues on the other

Visual feel:

- more dynamic
- more modern
- easier to make feel alive with restrained motion

Strength:

- balances person and output well

Risk:

- easier to drift into generic portfolio composition if not designed carefully

### Homepage Recommendation

Primary recommendation:

- start from `Journal Front Page`

Secondary direction:

- borrow structural discipline from `Identity Ledger`

This likely produces the best balance of:

- seriousness
- personality
- writing-forward identity
- portfolio utility

## About Page Concepts

The About page should be simple, clear, and mature.

It should not feel:

- over-produced
- too biographical
- resume-like in a literal sense

### Required elements

- short prose introduction
- concise articulation of interests and capabilities
- brief statement of what you are trying to build toward
- compact career timeline

### Timeline requirements

Timeline should cover:

- UVA
- Capital One
- DoorDash

Possible timeline enrichments:

- logos
- role labels
- dates
- one-line annotation per stop

### About Concept A: Prose First, Timeline Below

Description:

- short intro and interest/capabilities prose first
- timeline module beneath it

Strength:

- easiest to read
- easiest to keep elegant

Risk:

- timeline may feel secondary

### About Concept B: Split About + Timeline

Description:

- prose and timeline coexist in the upper composition
- timeline appears beside or integrated with the prose on larger screens
- stacks on mobile

Strength:

- feels more designed
- gives the page stronger visual structure

Risk:

- requires careful responsive handling

### About Concept C: Interactive Timeline Anchor

Description:

- the timeline is a compact interactive module
- clicking or tapping a milestone updates the adjacent prose panel

Strength:

- memorable
- fits the “simple but cool” instinct

Risk:

- can be overbuilt if the content is too short to justify it

### About Recommendation

Start with:

- `Split About + Timeline`

Fallback if it feels too busy:

- `Prose First, Timeline Below`

If an interactive version is built, keep it light:

- no heavy timeline library
- simple transitions
- static-first rendering

## Writing Section Concepts

The writing section should feel like a real publication.

### Core requirements

- list view
- gallery view
- switchable control
- optional tags
- optional cover images
- good metadata hierarchy

### List view behavior

List view should optimize for:

- scanning
- chronology
- titles and excerpts
- reading density

It should feel:

- sharp
- calm
- highly readable

### Gallery view behavior

Gallery view should optimize for:

- browsing
- visual variety
- cover image support

It should be useful only when images are good enough. The list view should remain the default-safe mode.

### Writing card system

Cards/items should support:

- title
- excerpt
- date
- tags
- optional cover

Metadata should feel label-like and restrained.

## Projects Section Concepts

Projects should feel concise and credible.

### Core project card content

- title
- short summary
- role or context
- technologies or themes
- optional external links

### Project detail page tone

Project detail pages should feel like:

- thoughtful build notes
- compact project essays
- proof of judgment

Not:

- bloated case studies
- design agency portfolio pages

### Link handling

GitHub/demos should be variable by project.

Template behavior should allow:

- links near the top when they matter
- links lower on the page when narrative is more important

## Motion Strategy

Motion should support the editorial system, not overpower it.

### Appropriate motion types

- soft page reveals
- hover elevation or emphasis
- section transition polish
- timeline state transitions
- list/gallery toggle transitions

### Avoid

- dramatic springy UI everywhere
- constant floating or pulsing elements
- motion that competes with text

### Motion budget

If an animation does not make the interface feel more legible or polished, remove it.

## Image and Visual Asset Strategy

### Default content mode

Most visual support should be:

- static images
- static graphs/charts
- screenshots
- diagrams
- illustrations

### Source types

Likely asset sources:

- internet-sourced reference images
- AI-generated images
- iPad drawings
- custom diagrams
- code screenshots where useful

### Recommendation

Design the content system around strong static media first. Interactive canvas modules should be reserved for pieces that genuinely need them.

## Recommended First Design Pass

The first design pass should compare a small set of combinations instead of trying to decide everything at once.

### Pass 1 deliverables

- 3 navigation concepts
- 2 homepage directions
- 2 About/timeline directions
- 3 icon treatments
- light/dark token direction

### Recommended concept combinations to explore

#### Combination 1: Journal Rail

- Navigation: `Editorial Top Rail`
- Homepage: `Journal Front Page`
- About: `Split About + Timeline`
- Icon: `Hybrid mark`

Why:

- strongest balanced direction

#### Combination 2: Spine Publication

- Navigation: `Corner Rail / Vertical Spine`
- Homepage: `Identity Ledger`
- About: `Split About + Timeline`
- Icon: `Pixelated drawing`

Why:

- most distinctive desktop identity

#### Combination 3: Modern Editorial App

- Navigation: `Hybrid Header + Section Index`
- Homepage: `Split Identity + Work`
- About: `Interactive Timeline Anchor`
- Icon: `Pixelated portrait`

Why:

- tests the upper bound of novelty while staying within the brief

## Review Questions

When reviewing the first design pass, we should decide:

1. Which navigation concept feels most intuitive and authored?
2. Which homepage composition best balances writing and professional identity?
3. Does the icon feel too playful, too generic, or appropriately distinctive?
4. Does the About/timeline module feel elegant or overbuilt?
5. Does the visual system feel too minimal, too branded, or properly restrained?

## Implementation Workflow After Design Review

Once this design brief is reviewed, implementation should proceed through small PRs with local testing at each stage.

### Proposed workflow

1. Review and approve `design-notes.md`.
2. Turn the approved direction into a PR sequence.
3. Scaffold the app and baseline design system.
4. Run locally and review before moving to content/data integration.
5. Build sections incrementally and review each in-browser.

### PR philosophy

Each PR should:

- have a narrow scope
- include clear rationale
- be locally runnable
- be easy to review visually and technically

### Likely initial PR sequence

#### PR 1: App scaffold and design tokens

Includes:

- framework setup
- typography
- color tokens
- layout shell
- theme infrastructure

#### PR 2: Navigation and homepage shell

Includes:

- chosen navigation pattern
- homepage structure
- placeholder content
- responsive behavior

#### PR 3: About page and timeline

Includes:

- About prose layout
- timeline module
- initial icon integration

#### PR 4: Writing index and detail template

Includes:

- list/gallery switch
- content templates
- markdown pipeline

#### PR 5: Projects index and detail template

Includes:

- project cards
- variable link treatment
- project detail structure

#### PR 6: Content integrations and enhancement modules

Includes:

- Notion integration
- GitHub cards
- media embeds
- optional canvas modules

## Immediate Next Step

Review this document and choose the preferred direction set.

Once reviewed, I should create:

- a PR-by-PR implementation plan
- the initial app scaffold
- local run instructions so you can test each phase in the browser
