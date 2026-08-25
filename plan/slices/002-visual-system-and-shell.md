# Slice 002: Visual System and Publication Shell

## Status

Proposed for founder review. Implementation begins only after this slice and its matching development plan are approved and merged.

## Goal

Turn the technically correct Stage 1 scaffold into the first visually authored version of the publication.

This slice must produce something the founder can open locally and judge as a design—not another invisible infrastructure milestone. It establishes the global visual language, responsive shell, typography, themes, and portrait treatment that later real content will pressure-test.

## Product orientation

The site is a writing-first personal publication by a technical builder with product and systems judgment. It should feel like a carefully printed technical journal translated to the web: warm, precise, forceful, readable, and unmistakably authored.

The useful Le Labo cues are typographic confidence, exact labels, material restraint, thin rules, and disciplined spacing. The site must not become a generic cream blog, a typewriter-themed costume, or a software-dashboard component library.

## Intended review experience

After the implementation PR is available, the founder should be able to run one documented command and inspect a stable local production preview containing:

- an authored homepage cover using the fixture essay as temporary content
- the chronological writing index
- an essay specimen showing the complete typographic hierarchy
- the concise About scaffold
- the 404 page
- working light and dark themes
- the reworked portrait in its intended homepage composition

The implementation agent or primary integrator must leave the preview running when explicitly handing it to the founder for review. A dead localhost link is not acceptable review evidence.

## Approved visual direction

### Typography

Use the already approved working pair:

- Instrument Sans for masthead, navigation, titles, labels, metadata, and interface text
- Newsreader for essay body, quotations, and selected editorial descriptions
- no monospace in this slice

Both families are open source under the SIL Open Font License. Self-host them, include their license and provenance, and load only the Latin files and axes the current specimen needs.

Instrument Sans should provide energy through weight, width, scale, and spacing. Newsreader should make continuous reading comfortable without making the site feel nostalgic or precious.

Do not implement ABC Diatype, Suisse, or other comparison fonts in parallel. Those remain later alternatives only if the approved pair demonstrably fails in real layouts.

### Color and material

Establish semantic light and dark tokens, not scattered literal colors.

Light direction:

- warm paper canvas rather than white
- dense near-black primary ink
- graphite secondary ink
- warm-gray rules
- muted ochre as the primary accent
- desaturated ink blue and restrained rose only where the portrait or a small editorial detail needs them

Dark direction:

- charcoal canvas rather than black
- warm light-gray primary ink
- quieter warm-gray secondary ink
- low-luminance rules
- ochre/blue accents retuned for contrast

Do not add simulated paper noise unless the clean implementation feels materially incomplete. If any texture is used, it must be CSS-only or an extremely small local asset, nearly imperceptible, and proven not to soften type or create banding.

### Portrait

Carry the recognizable hand-drawn portrait forward from the v1 source asset, `public/cartoon-me.png` in the legacy repository.

The Stage 2 v2 repository must own copied source/provenance and derived assets. No runtime or test path may reference the legacy repository.

Required treatment:

- preserve the original linework and recognizable face
- use a tighter head-and-shoulders crop
- map the background/empty field to the paper canvas
- map outlines to near-black ink
- reduce the interior to paper/flesh neutral, muted ochre hair, desaturated ink-blue hoodie, and restrained optional rose
- simplify soft shading without flattening the handmade character
- allow selective halftone or slight print misregistration in shadows only
- produce separately tuned light- and dark-theme outputs
- do not pixelate, algorithmically invert, or ship the unchanged full-color source as the final homepage treatment

The portrait is punctuation within the homepage cover, not a full-page hero or repeated mascot. Preserve the original v1 asset in a clearly labeled source/provenance directory or document its origin beside the derived assets.

### Layout and shell

Use a shared outer grid with a narrow reading measure and deliberate wider figure allowance.

The editorial masthead should include:

- Matt DePillis identity link
- a short descriptor such as `ENGINEER + WRITER · NEW YORK`
- Writing and About destinations
- a compact accessible theme control
- a thin rule anchoring the composition

On narrow screens, use a compact two-row composition. Do not introduce a hamburger for three destinations.

The homepage remains temporary in content but should work as a convincing publication cover:

1. identity statement and portrait composition
2. featured/latest fixture essay treatment
3. compact route to the archive
4. compact About/contact-oriented footer treatment

Do not finalize Stage 4 content strategy, add fake project cards, or invent more homepage sections.

The essay specimen should establish:

- display title and deck
- date/status metadata treatment
- comfortable Newsreader body measure, size, and leading
- heading hierarchy
- link, list, emphasis, and blockquote treatment
- prose-width and future wide-figure layout variables, even if no real figure is added yet

## Theme behavior

Implement a small accessible light/dark theme control without a component framework.

- Follow the system preference on first visit.
- Persist an explicit user choice locally.
- Apply the stored/system theme before first paint to avoid a visible flash.
- Expose a clear accessible name and visible state.
- Keep the script small, local, and independent from core content/navigation.
- Core content must remain fully usable when JavaScript is disabled; only manual theme persistence/toggling may degrade.

This is the first explicitly justified client-side JavaScript in the project. Record its built byte cost and protect it with the resource budgets.

## Responsive targets

Treat the following as representative review widths, not device-specific designs:

- phone: 375 × 812
- tablet: 768 × 1024
- laptop: 1280 × 800
- wide desktop: 1536 × 960

At each width verify masthead wrapping, tap targets, portrait crop/resolution, display-title balance, essay measure, list rhythm, footer behavior, and absence of horizontal overflow.

## Accessibility requirements

- Semantic landmarks and single page-level headings remain intact.
- Primary links and the theme control are keyboard reachable in a logical order.
- Focus indicators are clearly visible in both themes.
- Touch targets are comfortably operable.
- Text and non-text contrast meet WCAG AA expectations.
- The portrait has purposeful alternative text or is decorative based on its compositional role; make that decision explicit.
- Motion respects `prefers-reduced-motion`.
- At 200% zoom and representative narrow widths, content remains readable without horizontal page scrolling.
- Automated axe checks report no serious or critical violations; target no WCAG A/AA violations unless a documented false positive is reviewed.

## Testing scope

Keep all Stage 1 deterministic gates and extend them with:

- Playwright against the production preview
- Chromium desktop and phone projects only
- primary navigation flows
- theme-control state and persistence
- keyboard focus/order smoke coverage
- console-error checks
- responsive overflow checks
- `@axe-core/playwright` scans on primary routes in both themes where useful
- font and portrait asset/resource assertions

Do not add Lighthouse yet. Timing and score baselines begin in Stage 3 with a real essay and representative imagery.

Visual-regression screenshots may be introduced only after the founder approves the initial Stage 2 composition. Do not turn the first design draft into a permanent golden baseline.

## Deliverables

- semantic light/dark token system
- self-hosted Instrument Sans and Newsreader with licenses/provenance
- base type roles and responsive fluid scale
- global spacing, measure, rule, focus, and motion primitives
- editorial masthead and footer
- accessible persisted theme control
- authored temporary homepage cover
- styled writing index, essay specimen, About, and 404
- light/dark derived portrait assets plus source provenance
- responsive behavior at four representative widths
- Playwright and axe Stage 2 test layers
- updated deterministic resource budgets
- updated README commands for browser verification and local visual review

## Non-goals

- first real essay content or research
- final Stage 4 homepage/About copy and information architecture
- new top-level routes
- project cards, résumé timeline, tags, search, or filters
- real charts, figures, citations, or interactive essay modules
- RSS, sitemap, Open Graph generation, deployment, hosting, or DNS
- Lighthouse or score-based performance gates
- React or another UI framework
- a general design-system package or Storybook
- animation libraries, page transitions, parallax, or ambient motion
- monospace or syntax-highlighting payloads
- automatic external publishing or syndication work
- editing the original v1 repository

## Risks and decisions

- Portrait derivation requires visual judgment and should be approved by the founder before being treated as final.
- Variable font files can be unnecessarily large; the implementation must record actual files, axes, preload behavior, and built bytes.
- A persisted theme control adds client JavaScript; it must remain tiny and isolated.
- The fixture essay is not representative prose. Use a sufficiently long local typography specimen if necessary, but do not begin the real essay or create fake thought-leadership copy.
- Stage 2 may expose that the approved font pair needs adjustment. Do not change typefaces without a side-by-side founder review and plan update.

## Merge criteria

This slice is merge-ready when:

- the founder has inspected the live local production preview
- the result feels intentional enough to judge as the publication's first real visual direction
- both themes and portrait treatments are explicitly reviewed
- every primary route works at phone, tablet, laptop, and wide-desktop widths
- keyboard, focus, zoom/reflow, reduced-motion, and contrast checks are documented
- Playwright navigation/theme tests and axe scans pass
- Stage 1 gates continue to pass
- core content remains static and usable without JavaScript
- the only client JavaScript is the justified theme behavior
- font, image, CSS, and JavaScript resource budgets are measured and enforced
- no v1 runtime/test coupling exists
- intentionally temporary content and deferred Stage 3/4 work are clearly identified

## Review focus

Reviewers should challenge:

- whether the shell feels authored rather than generically minimalist
- whether the typography has enough force without harming reading comfort
- whether portrait treatment preserves identity without dominating the product
- whether dark mode is genuinely designed
- whether the theme script or dependencies are larger than the behavior warrants
- whether responsive behavior is deliberate at tablet widths
- whether automated tests support rather than replace visual and accessibility judgment
