# Portfolio Site V2 Product Plan

## Product thesis

`mattdepillis.com` should be a fast, writing-first personal publication by a working engineer with strong product and systems instincts.

Its job is to make Matt want to publish ideas, make those ideas excellent to read, and provide enough professional context for a reader to understand who wrote them. It is not a general-purpose CMS, a comprehensive personal archive, or a conventional portfolio full of project cards.

The v1 source remains a reference, but v2 is a fresh product. V1 is optimized for rendering arbitrary Notion pages; v2 will own its content model, markup, design, and performance.

## Outcomes

The site succeeds when:

- publishing an illustrated essay feels straightforward
- writing is visibly the primary product
- pages are fast and highly readable on phone, tablet, and desktop
- the visual identity is distinctive without becoming ornamental
- a single canonical essay can produce reviewable derivatives for other platforms
- the site can grow through real publishing needs instead of speculative infrastructure

## Audience

Primary readers include:

- engineers and product-minded technologists
- founders, operators, and investors interested in technology and company building
- colleagues and prospective collaborators learning how Matt thinks
- curious readers arriving through a specific essay

The site should reward a reader who arrives for an argument, not require prior interest in Matt as a person.

## Editorial position

The writing should be rational, grounded, curious, and willing to connect technical choices with product, business, organizational, and societal implications.

Initial essay territory includes:

- why more companies should treat APIs and MCP servers as core products instead of rushing to wrap everything in agents
- why professional sports franchise valuations have expanded and what that teaches builders and investors in other industries

Avoid engagement bait, generic AI commentary, faux certainty, and inflated thought-leadership language. The voice should feel informed but informal: a serious technical journal with personal judgment.

## Information architecture

### `/` — Home

The homepage is the cover and contents page of the publication. It contains:

- compact identity and positioning
- restrained use of the hand-drawn portrait
- two or three featured essays
- a chronological list of recent writing
- a short route to About

It should not contain a generic hero, a large skills grid, a project carousel, social proof, or a constantly maintained “currently thinking about” module.

### `/writing`

A chronological, scannable archive of essays. Start with one excellent list view. Add tags or alternate discovery modes only after the catalog is large enough to make them useful.

### `/writing/[slug]`

The core product surface. It supports long-form text, citations, figures, code when necessary, original drawings, charts, and rare interactive explanations.

### `/about`

A short professional page covering:

- who Matt is
- the problems and systems he likes working on
- a compact career history
- selected work or projects where useful
- current interests and contact links

Career, Projects, Media, and Art are not separate MVP sections. Their strongest material can appear in About or within relevant essays.

## Navigation

Use a compact editorial masthead rather than the v1 macOS-style dock:

- name or mark on the left
- Writing and About as plain-language destinations
- optional theme control
- clear current-section treatment
- two-line or otherwise compact adaptation on narrow screens

The v1 dock's ambition should survive—navigation should feel authored—but its icon ambiguity, permanent viewport occupation, and equal weighting of six sections should not.

No hamburger is required for three destinations. Navigation must be keyboard accessible, touch friendly, and legible without hover.

## Content model

Repository Markdown/MDX is the canonical publication source.

Recommended structure:

```text
content/
  writing/
    apis-before-agents/
      index.mdx
      cover.png
      architecture.svg
      sources.md
```

Required essay fields:

- `title`
- `description`
- `publishedAt`
- `slug` or directory-derived slug
- `status`
- `featured`

Optional fields:

- `updatedAt`
- `tags`
- `cover`
- `canonicalUrl`
- `syndication`

Drafting may happen in chat, Notion, or another editor, but publishing should not depend on a live Notion renderer or API. If copying drafts becomes a demonstrated bottleneck, add a one-way importer later.

## Editorial components

Begin with the normal Markdown vocabulary plus a small allowlist:

- `Figure`
- `Aside`
- `PullQuote`
- `Chart`
- `Comparison`
- `Footnotes`

Add `Expandable`, rich embeds, or interactive canvases only for real essays that need them. Content files may compose approved components; they should not contain arbitrary application logic.

Static SVG is the default for charts and diagrams because it is fast, crisp, accessible, portable, and reusable in syndication. Interactive figures should be isolated client islands with static or textual fallbacks.

## Cross-posting model

The website is canonical. Other platforms receive derivatives generated from the same essay source:

- Substack-ready Markdown or HTML
- Twitter/X thread draft
- LinkedIn excerpt draft
- Open Graph image
- square and landscape exports of selected figures

A future command may take the form `pnpm syndicate <slug>`. It should write reviewable artifacts locally and never publish automatically. Platform-specific editing remains expected; the goal is portability, not identical content everywhere.

## Technical direction

Use Astro with TypeScript and MDX for the initial implementation.

Why Astro now fits better than the earlier Next.js recommendation:

- the clarified product is a publication first
- static HTML and zero-JavaScript defaults directly support the performance goal
- content collections and MDX fit repo-native essays
- React or another supported island can still power the occasional interactive figure
- the framework makes it harder to hydrate the entire experience accidentally

Technical defaults:

- static generation for public pages
- Astro content collections with validated frontmatter
- scoped or global token-driven CSS without a runtime styling library
- local/optimized fonts
- minimal JavaScript, loaded per interactive component
- RSS, sitemap, canonical metadata, and social-image support
- deployment target selected during the foundation slice after checking the existing domain and hosting state

Revisit the framework only if a real requirement makes interactive application behavior central to most pages.

## Visual direction

Interpret the Le Labo reference as discipline rather than imitation:

- warm paper-like canvas
- dense near-black ink
- firm typographic hierarchy
- small utilitarian labels and metadata
- thin rules and exact spacing
- sparse accent color
- subtle tactile character where it does not reduce sharpness

Typography should do most of the branding work. The working system is Instrument Sans for display, navigation, labels, and metadata, paired with Newsreader for long-form reading. Use Instrument Sans's variable width and weight to give titles force. Do not add a dedicated monospace initially; evaluate one later only if real code content justifies the payload and role.

Retain the hand-drawn portrait as the durable identity asset. Do not pixelate it or ship the unchanged full-color v1 asset as the final treatment. Preserve its linework and reinterpret it as a tightly cropped, limited-ink editorial illustration using the paper canvas, near-black outlines, muted ochre hair, desaturated ink-blue clothing, restrained optional rose, and selective halftone texture. Produce separately tuned light- and dark-theme versions.

Dark mode is required, but it should be a designed charcoal-and-warm-gray counterpart rather than a mechanical inversion.

## Performance posture

- render HTML by default
- no global hydration
- no third-party embed scripts on initial load
- no globally loaded chart, code, icon, or animation libraries
- optimize and dimension every image
- self-host and subset fonts when licensing allows
- treat Core Web Vitals, accessibility, and reduced-motion behavior as acceptance criteria

Exact budgets will be recorded in the app-foundation slice once the generated baseline can be measured.

## MVP

The MVP is complete when it includes:

- a production-quality homepage
- writing index and essay template
- concise About page
- light and dark visual systems
- responsive editorial navigation
- validated MDX content pipeline
- one real, complete essay with at least one original visual
- feed, sitemap, canonical metadata, and social sharing image
- a local cross-post derivative proof of concept
- documented authoring and deployment workflows

## Non-goals

- live Notion CMS integration
- arbitrary Notion block rendering
- separate Career, Projects, Media, Art, Now, Uses, or Lab sections
- list/gallery toggles before enough content exists
- comments, accounts, reactions, or on-site social features
- automatic external publishing
- integration showcases for GitHub, Spotify, or YouTube
- a general visualization platform
- animation as a primary design device

## Decisions deferred until evidence exists

- whether drafts need a Notion importer
- whether the writing archive needs tags or search
- whether projects deserve a separate section
- whether an essay justifies a reusable interactive visualization framework
- whether dark mode should follow system only or expose a persistent manual control
- which hosting provider best fits the implemented prototype
- whether real layouts expose a strong enough reason to replace the default typography with a paid alternative
