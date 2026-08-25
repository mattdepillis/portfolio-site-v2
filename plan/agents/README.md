# Agent Workflow

This directory defines how AI agents collaborate on `portfolio-site-v2` without turning a focused publication into an overbuilt application.

## Required read order

Before meaningful implementation or review:

1. Read the repository [AGENTS.md](../../AGENTS.md) and follow its planning read order.
2. Find the active scope in [../slices/README.md](../slices/README.md).
3. Read the active slice and its matching reviewed implementation plan in [../dev-plans/](../dev-plans/), when present.
4. Read [roles.md](roles.md).
5. Read the assignment, handoff, or review template relevant to your role.

If the assignment conflicts with the active slice, stop and ask the primary integrator. A dev plan is an implementation proposal, not permission to expand approved product scope.

## Workflow

1. The founder and primary integrator agree on an implementation slice.
2. The primary integrator writes or reviews a concrete execution plan.
3. A bounded task is assigned using [task-template.md](task-template.md).
4. An implementation agent executes only the approved task and file scope.
5. The agent reports its work using [handoff-template.md](handoff-template.md).
6. The primary integrator audits the diff, verification evidence, product fit, and residual risk.
7. A review agent may inspect the result using [review-template.md](review-template.md).
8. The founder reviews the PR and decides whether to merge.

## Files

- [roles.md](roles.md): founder, primary-integrator, implementation-agent, and review-agent responsibilities.
- [task-template.md](task-template.md): bounded implementation assignment.
- [handoff-template.md](handoff-template.md): required implementation return contract.
- [review-template.md](review-template.md): findings-first review contract.

The process should scale to the task. Small, obvious changes do not require performative delegation or additional planning documents.
