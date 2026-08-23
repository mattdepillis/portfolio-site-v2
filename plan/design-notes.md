# Portfolio Site V2 Design Notes

## Design brief

The site should feel like a printed technical journal translated carefully to the web: calm, sharp, warm, readable, and unmistakably authored.

The useful parts of the Le Labo reference are precision, labeling, material restraint, and typographic confidence. Avoid turning those cues into a cream-and-typewriter-font costume.

## Principles

### Reading is the product

Essay typography, measure, hierarchy, figures, citations, and navigation outrank decorative composition. A page should remain excellent when every optional effect is removed.

### Distinct through systems

Personality should emerge from type, spacing, rules, image treatment, and voice. Do not rely on novelty components or a different layout trick on every page.

### Familiar interactions, authored treatment

Links should look interactive, navigation should use words, and the current location should be obvious. Distinction belongs in the treatment—not in making readers decode controls.

### Restraint must still have energy

Minimalism is not empty space plus gray text. Display type should have force, rules should align exactly, and spacing changes should create a deliberate rhythm.

## Visual system

### Color

Light theme direction:

- warm off-white paper canvas
- dense, slightly softened black text
- muted graphite metadata
- faint warm-gray rules
- one sparse accent chosen after typography is tested

Dark theme direction:

- charcoal rather than black
- warm light-gray body text
- quieter secondary text
- low-luminance rules
- the same accent family, retuned for contrast

Texture is optional and must remain nearly imperceptible. It cannot soften type, cause banding, or add material page weight.

### Typography

Use at most three roles:

1. Display: forceful grotesk or condensed sans for titles and major statements.
2. Text: highly readable face for long essays, with excellent italics, punctuation, and numeral behavior.
3. Utility: restrained monospace for dates, labels, figure numbers, and code.

Selection criteria:

- distinctive at headline sizes
- comfortable through a long essay
- strong mobile rendering
- practical licensing and self-hosting
- useful variable axes only when they earn their file cost

Do not use monospace for all body copy or metadata merely to imply engineering.

### Layout

- Use a narrow, comfortable essay measure.
- Allow figures and comparisons to break wider than prose intentionally.
- Use a consistent outer gutter and baseline spacing rhythm.
- Make tablet compositions deliberate, not interpolated desktop layouts.
- Avoid generic card grids where a list and rule communicate hierarchy better.

### Rules and surfaces

Thin rules, labels, and alignment can carry the product-label influence. Rounded cards and shadows should be rare. Content should generally sit directly on the canvas rather than inside stacked containers.

## Global masthead

Preferred structure:

```text
MATT DEPILLIS                         WRITING   ABOUT   THEME
Engineer and writer · New York
───────────────────────────────────────────────────────────
```

This is a composition reference, not literal final copy.

Behavior:

- present on every page
- plain-language links
- clear current-section state
- visible keyboard focus
- compact two-line adaptation on phone widths
- no hamburger for the MVP navigation set
- theme control may be icon-only only when it has an accessible name and familiar visual treatment

The old dock is not retained. Its authored quality survives through exact typography, active-state motion, and responsive composition.

## Homepage

The homepage is a publication cover and table of contents.

Recommended order:

1. identity statement with restrained portrait placement
2. featured writing
3. recent writing list
4. compact About/contact footer

Avoid oversized introductory copy, skills matrices, technology badges, testimonial language, and a gallery of half-maintained personal categories.

The portrait should work as punctuation rather than the entire hero. Candidate treatments include a tight crop, reduced palette, halftone print, or an ink-like version derived from the original drawing.

## Writing index

Begin with one chronological list. Each entry should expose only information useful for choosing what to read:

- title
- short description
- publication date
- optional reading time or topic label

Featured status can affect placement without turning the archive into a card gallery. Add filters only when the number of essays creates a real discovery problem.

## Essay page

The essay template should support:

- forceful title and precise metadata
- short deck/description
- optional table of contents for genuinely long pieces
- comfortable body copy
- sidenotes or footnotes
- full-width and prose-width figures
- captions and sources
- pull quotes used sparingly
- previous/next or related writing only when the catalog supports it

Code is supported when the argument requires it, not as a mandatory visual motif.

### Figures and charts

Every figure should include:

- figure number when referenced in prose
- useful caption
- source or methodology where relevant
- alt text or adjacent textual explanation
- stable dimensions to avoid layout shift

Static SVG is preferred for authored diagrams and charts. Interactive figures must enhance understanding, work with keyboard input, respect reduced motion, and provide a static or textual fallback.

## About page

Keep it concise and professionally mature:

- short introduction
- compact career chronology
- selected work or projects
- substantive interests
- contact links

Avoid a résumé dump, personal manifesto, or interactive timeline unless real content proves that interactivity improves comprehension.

## Motion

Motion may support:

- active navigation state
- link and control feedback
- gentle initial reveal
- transitions inside an interactive figure

Avoid constant ambient motion, scroll-jacking, parallax, cursor effects, and large page-transition systems. CSS is the default. Honor `prefers-reduced-motion`.

## Responsive acceptance

Review the core pages at minimum in representative phone, tablet, laptop, and wide desktop widths.

Check:

- masthead wrapping and tap targets
- essay measure and text size
- title balance
- wide figure behavior
- tables and code overflow
- focus visibility
- theme contrast
- portrait crop and resolution

## Initial design decisions still required

The first design/foundation slice should resolve:

- exact display and text typefaces
- initial light and dark tokens
- portrait treatment
- masthead composition at three target widths
- homepage title and featured-entry rhythm
- essay measure and figure-width rules
- whether the manual theme control belongs in the MVP shell

Resolve these through a working prototype with real essay copy, not isolated moodboards alone.
