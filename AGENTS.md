# Agent Entrypoint

If you are an AI coding agent working in this repository, read these files before changing code:

1. [plan/README.md](/Users/mattdepillis/dev/projects/portfolio-site-v2/plan/README.md)
2. [plan/plan.md](/Users/mattdepillis/dev/projects/portfolio-site-v2/plan/plan.md)
3. [plan/design-notes.md](/Users/mattdepillis/dev/projects/portfolio-site-v2/plan/design-notes.md)
4. [plan/dev-rules.md](/Users/mattdepillis/dev/projects/portfolio-site-v2/plan/dev-rules.md)
5. [plan/mvp-dev-plan.md](/Users/mattdepillis/dev/projects/portfolio-site-v2/plan/mvp-dev-plan.md)
6. the active slice plan in `plan/slices/`, when one exists

## Required orientation

Before implementation, be able to state:

1. The product thesis: this is a fast, writing-first personal publication, not a general-purpose CMS or portfolio platform.
2. The current bounded objective and the document that defines it.
3. What is explicitly out of scope for the slice.
4. How the change will be verified on desktop and mobile.
5. Whether the change adds client JavaScript, a dependency, or publishing complexity, and why that cost is justified.

## Operating rule

Build through bounded, reviewable slices. Do not infer a larger redesign, CMS, integration, or component platform from a narrow task. The default reading experience is the product; protect its speed, clarity, and editorial character.

The primary integrator owns product direction, architecture, scope control, integration, review, and PR readiness. Bounded implementation or review work may be delegated, but agents must not independently broaden product scope.
