# Agent Roles

## Founder

The founder owns the publication, its voice, and final product decisions.

Responsibilities:

- set editorial, design, and product direction
- challenge architecture and implementation assumptions
- review plans and pull requests
- decide whether a change is ready to merge

The founder retains final authority over scope and merge decisions.

## Primary integrator

Default owner for this project: Codex, working directly with the founder. The founder may explicitly designate a different primary integrator for a later slice.

Responsibilities:

- translate product and visual direction into bounded, reviewable slices
- own architecture, design interpretation, implementation sequencing, and dependency discipline
- prepare or approve file-level implementation plans
- assign bounded work to implementation and review agents
- inspect agent output, resolve integration problems, and preserve planning consistency
- verify local browser behavior and stage-appropriate automated checks
- prepare implementation PRs and document residual risks

Do not delegate away product scope, design-system decisions, architecture boundaries, or merge-readiness judgment.

## Implementation agent

Examples include OpenCode or another explicitly assigned coding agent.

Responsibilities:

- read the active slice, matching dev plan, agent rules, and specific assignment
- implement only the assigned objective and allowed files
- add requested tests and run the applicable verification commands
- preserve the writing-first product, static-output defaults, and legacy independence
- report changed files, checks, assumptions, gaps, and questions using the handoff template

Do not independently change product or design direction, expand scope, add unapproved dependencies, import legacy code, install future-stage test tooling, open a PR, or merge changes.

If the approved task cannot be completed without a material architectural, dependency, or scope decision, stop and ask the primary integrator.

## Review agent

Responsibilities:

- inspect an assigned plan, diff, implementation, or verification result
- report correctness bugs, regressions, missing tests, and meaningful risk
- identify scope drift, unexpected client JavaScript, legacy coupling, and accessibility issues
- order findings by severity and cite precise files or behavior
- explicitly state when no actionable findings exist

Review agents do not invent new product requirements, broaden the assigned slice, or implement changes unless explicitly reassigned.
