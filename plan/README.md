# Planning Workspace

This directory is the durable source of truth for the portfolio-site-v2 product and its implementation.

## Read order

1. [plan.md](plan.md) — product thesis, scope, content model, and technical direction
2. [design-notes.md](design-notes.md) — visual and interaction system
3. [dev-rules.md](dev-rules.md) — working agreement for implementation and review
4. [testing-rules.md](testing-rules.md) — durable verification strategy and quality gates
5. [mvp-dev-plan.md](mvp-dev-plan.md) — staged path to a publishable MVP
6. [slices/](slices/) — bounded plans for active implementation work

## Authority

The documents above replace the earlier broad v2 direction. When old task history, v1 behavior, or stale planning conflicts with these files, these files win.

Each meaningful implementation slice should get a short plan in `plan/slices/` defining its goal, scope, deliverables, non-goals, verification, and merge criteria. Chat history is useful context, but it is not the project record.

Essay theses, research agendas, and outlines live in `writing/plans/` until they are promoted into publishable content.
