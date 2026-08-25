# Agent Entrypoint

If you are an AI coding agent working in this repository, read these files before changing code:

1. [plan/README.md](plan/README.md)
2. [plan/plan.md](plan/plan.md)
3. [plan/design-notes.md](plan/design-notes.md)
4. [plan/dev-rules.md](plan/dev-rules.md)
5. [plan/testing-rules.md](plan/testing-rules.md)
6. [plan/mvp-dev-plan.md](plan/mvp-dev-plan.md)
7. [plan/slices/README.md](plan/slices/README.md) and the active slice it identifies
8. the matching reviewed implementation plan in `plan/dev-plans/`, when one exists
9. [plan/agents/README.md](plan/agents/README.md) and the template relevant to your role

The active slice defines approved scope. Its matching dev plan proposes implementation details but cannot override the slice, product plan, design notes, or founder decisions.

## Required orientation

Before implementation, be able to state:

1. The product thesis: this is a fast, writing-first personal publication, not a general-purpose CMS or portfolio platform.
2. What has already been merged and which slice is currently active.
3. The bounded objective, its authoritative slice, and its reviewed implementation plan.
4. Your role: primary integrator, implementation agent, review agent, or founder.
5. Which files are allowed and what is explicitly out of scope.
6. Which verification gates apply to the current stage, including manual browser checks where appropriate.
7. Whether the change adds client JavaScript, a dependency, or publishing complexity, and why that cost is justified.

## Operating rule

Build through bounded, reviewable slices. Do not infer a larger redesign, CMS, integration, or component platform from a narrow task. The default reading experience is the product; protect its speed, clarity, and editorial character.

The primary integrator owns product and design interpretation, architecture, scope control, integration, review, and PR readiness. Bounded implementation or review work may be delegated. Implementation agents must follow their approved file boundaries and return a structured handoff; review agents report findings without independently changing scope. The founder retains final product and merge authority.
