# Portfolio Site V2

A fast, writing-first personal publication by Matt DePillis.

## Prerequisites

- Node.js 22 (see `.nvmrc`)
- pnpm 11.23.0 (pinned in `package.json`)

## Setup

```bash
corepack enable
corepack prepare pnpm@11.23.0 --activate
pnpm install --frozen-lockfile
```

## Development

```bash
pnpm dev
```

Opens the local development server at `http://localhost:4321`.

## Build

```bash
pnpm build
pnpm preview
```

## Verification

```bash
pnpm verify
```

This runs formatting, linting, type checking, unit tests, production build, and build-output assertions.

### Individual commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:build
```

## Content

Essays live in `src/content/writing/` as MDX files with frontmatter validated against the schema in `src/lib/writing.ts`.

### Published entries

Set `status: published` in frontmatter to include an entry in the public archive.

### Draft entries

Set `status: draft` to keep content private. Drafts never generate public routes or appear in HTML output.

### Fixture entries

Stage 1 includes test fixtures that should be removed when the first real essay lands:

- `foundation-fixture` — published test content
- `draft-fixture` — draft test content

## Independence

This project builds independently from v1 (`personal-portfolio-site`), Notion, secrets, or external services.
