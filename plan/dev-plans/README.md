# Implementation Development Plans

This directory contains reviewed, implementation-oriented writeback plans for approved slices.

## Purpose

Use a dev plan to translate an active slice into:

- environment prerequisites and execution assumptions
- explicit agent and file boundaries
- concrete implementation sequencing
- file-level contracts and package choices
- deterministic verification commands
- review evidence and a structured implementation handoff

The primary integrator writes, reviews, or approves the dev plan before meaningful implementation begins.

## Authority

- [../slices/](../slices/) defines the approved **what** and **why**.
- `plan/dev-plans/` proposes the implementation **how**.
- [../agents/](../agents/) defines the role, task, handoff, and review contracts.

A dev plan is a review artifact, not independent product or architecture authority. If it conflicts with the active slice, product direction, design notes, or founder decisions, stop and resolve the conflict before implementation.

## Active plan

- [002: Visual system and publication shell](002-visual-system-and-shell.md)

## Completed plans

- [001: Application foundation](001-application-foundation.md) — implemented in PR #5

Dev plans may be updated when implementation reveals a better in-scope approach, but material scope or architecture changes require primary-integrator review and an update to the authoritative slice when necessary.
