# AI Development Agent Instructions

This repository is `tanaka03-sketch/roulette`. Use `https://github.com/tanaka03-sketch/ai-development-operations` as the read-only parent playbook repository for AI development operations.

## Required Reading Order

Before starting work, read these in order:

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/ai-development/goal.md`
4. `docs/ai-development/progress.md`
5. `docs/ai-development/automation-lock.md`
6. ChatGPT memory lock: `/workspace/memory/locks/roulette-schedule-lock.json`
7. `docs/requirements.md`
8. `docs/ai-development/requirements.md`
9. `docs/ai-development/work-log.md`
10. `docs/ai-development/job-instructions/{job}.md`
11. Related Issue, PR, handover, or design notes

## Source Of Truth

- Product requirements source of truth: `docs/requirements.md`
- AI development operations files: `docs/ai-development/`
- AI operation notes, open questions, Slack confirmation logs, and job-specific clarifications: `docs/ai-development/requirements.md`
- AI autonomous development goal: `docs/ai-development/goal.md`
- Current progress and next actions: `docs/ai-development/progress.md`
- Schedule lock procedure: `docs/ai-development/automation-lock.md`
- Active schedule lock state: ChatGPT memory `/workspace/memory/locks/roulette-schedule-lock.json`
- Deprecated GitHub lock marker: `docs/ai-development/automation-lock.json`; do not use it as live lock state.
- Do not duplicate product requirements. If a product requirement changes, update `docs/requirements.md` first or record the required human confirmation.

## Repository Assumptions

- Client-only browser app for registering roulette candidates and selecting one random result.
- Initial version has no authentication, no server-side persistence, no external API integration, and is for a single user.
- State persistence uses `localStorage`.
- Node.js follows `.nvmrc` and README guidance. Current recommended major version is Node.js 22.

## Scheduled Job Lock Rule

Every scheduled job must check ChatGPT memory `/workspace/memory/locks/roulette-schedule-lock.json` before doing work.

- If the memory lock is active and not expired, stop the job and report that a previous job is still running.
- If the memory lock is free or expired, acquire it by updating and saving the memory lock file.
- If the memory lock cannot be read, updated, or saved safely, stop and do not make GitHub changes.
- Release the memory lock only after updating the relevant progress or work-log notes.
- `docs/ai-development/automation-lock.json` is not a live lock and must not be updated for lock acquisition or release.

## Start Conditions

Before implementation, confirm:

- Requirements and relevant design are clear.
- Open questions and blockers are absent or explicitly out of scope.
- The target Issue is small enough for one focused change.
- Verification commands are clear.
- Security, permission, personal information, and input validation impacts are understood.
- Review findings have been triaged before implementation.

Implementation jobs may only work on Issues that are design-confirmed, unblocked, small, and have clear verification.

## Stop Conditions

Stop and record the reason in `docs/ai-development/work-log.md` when any of these apply:

- `docs/requirements.md` or `docs/ai-development/requirements.md` has an open blocker.
- The Issue is too large or not decomposed.
- The design is undecided.
- A Slack or human answer is still pending.
- Verification is unclear.
- Security, permissions, personal information, or input validation decisions are undecided.
- Review feedback has not been triaged.

## Slack Question Loop

If an unknown affects implementation, design, or verification, do not guess.

- If Slack posting is available, ask exactly one question per post.
- If Slack posting is unavailable, record the proposed question as `回答待ち` in `docs/ai-development/work-log.md`, the related Issue, and when relevant `docs/ai-development/requirements.md`.
- When an answer arrives, update the applicable requirements, design, instruction, handover, or work-log document before implementation.

## Human Approval Required

Human approval is required for production deployment, destructive migration, data deletion, permission model changes, authentication/authorization/secret/personal-information changes, irreversible changes, unclear-scope implementation expansion, merge with untriaged high-risk findings, and CAB or production readiness final decisions.

## Prohibited Operations

- Do not delete or replace `docs/requirements.md` as the requirements source of truth.
- Do not move or delete many existing documents in one change.
- Do not implement while open blockers or undecided issues remain.
- Do not send untriaged review findings directly into implementation.
- Do not guess unclear design, implementation, or verification decisions.
- Do not expand the initial scope into authentication, external APIs, or server persistence without explicit requirements.
- Do not edit the parent repository `tanaka03-sketch/ai-development-operations`; it is read-only reference material.
- Do not use GitHub-side `docs/ai-development/automation-lock.json` as live schedule lock state.

## Verification

Run these checks for implementation changes when feasible:

```bash
npm run typecheck
npm test
npm run build
```

For mobile UI changes, also follow README `Mobile verification` checks around 390px width.

## End Of Work

At the end of each work session, update `docs/ai-development/progress.md` when the current state or next action changes, update `docs/ai-development/work-log.md` with the job type, references, changes, verification, blockers, human-confirmation items, and next actions, then release the ChatGPT memory lock when one was acquired.
