# AI Development Agent Instructions

This repository is `tanaka03-sketch/roulette`. Use `https://github.com/tanaka03-sketch/ai-development-operations` as the read-only parent playbook repository for AI development operations.

Do not edit the parent repository. The editable target repository is only `tanaka03-sketch/roulette` unless the user explicitly says otherwise.

## Required Reading Order

Before starting work, read these in order:

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/goal.md`
6. `docs/ai-development/completion-scorecard.md`
7. `docs/ai-development/progress.md`
8. `docs/ai-development/work-log.md` or the relevant `docs/ai-development/logs/` entry
9. `docs/ai-development/job-instructions/{job}.md` when a job-specific file applies
10. Related Issue, PR, handover, design notes, and the parent playbook needed for the selected loop

For scheduled maintenance or automation work, also read `docs/ai-development/automation-lock.md`.

## Source Of Truth

- Product requirements source of truth: `docs/requirements.md`
- Implementation task source: `docs/implementation-tasks.md`
- Document classification guide: `docs/requirements/document-catalog-2026-05-18.md`
- AI development operations files: `docs/ai-development/`
- AI operation notes, open questions, Slack confirmation logs, and job clarifications: `docs/ai-development/requirements.md`
- AI operation purpose: `docs/ai-development/goal.md`
- Completion scoring against the purpose: `docs/ai-development/completion-scorecard.md`
- Current operation progress and next prioritized work: `docs/ai-development/progress.md`

Do not duplicate product requirements. If a product requirement changes, update `docs/requirements.md` first or record the required human confirmation.

## Parent Playbook References

Use the parent repository as read-only reference material. Current parent cycle references are:

- `README.md`
- `playbooks/automated-development-flow.md`
- `playbooks/github-development-loop.md`
- `playbooks/minimal-implementation-review.md`
- `playbooks/review-finding-triage.md`
- `playbooks/spec-gate.md`
- `playbooks/storage-conflict-guard.md`
- `playbooks/completion-scorecard.md`
- `playbooks/service-publication-review.md`
- `operations/scheduled-run-lock.md`
- `operations/repository-decision-queue.md`
- `templates/github-issue/ai-development-task.md`
- `templates/github-issue/human-decision.md`
- `templates/github-issue/review-finding.md`
- `templates/github-pr/pull-request-template.md`
- `templates/repository-decision-queue/agent-decisions.yml`

If an adoption or template path from older instructions is missing in the parent repository, record that fact and use the current parent README / playbooks / templates plus the `roulette` sources of truth. Do not invent a replacement rule.

## Repository Assumptions

- Client-only browser app for registering roulette candidates and selecting one random result.
- Initial version has no authentication, no server-side persistence, no external API integration, and is for a single user.
- State persistence uses `localStorage`.
- Node.js follows `.nvmrc` and README guidance. Current recommended major version is Node.js 22.

## Development Cycle

Follow only the development cycle that exists in the parent repository, with the `roulette` completion scorecard used as a local reporting gate.

Parent flow:

1. Issue Intake
2. Orchestrator
3. Research
4. Design Review
5. Human Decision when needed
6. Implementation
7. Code Review
8. Review Triage
9. Fix Implementation
10. Test & Quality
11. Completion Review
12. Handover

GitHub Development Loop types:

- Issue Intake
- Implementation PR
- Review Triage
- CI Failure
- Scheduled Maintenance

Gates and review playbooks:

- Spec Gate
- Storage Conflict Guard
- Minimal Implementation Review
- Completion Scorecard
- Service Publication Review when publish readiness needs deeper review
- Repository Decision Queue for GitHub-based human decisions

Do not restore or use the old 12-job scheduled cycle. Review, triage, design update, implementation, verification, human check, Slack handling, minimal implementation review, service publication review, and completion scoring are handled inside the parent flow, loop types, and gates above.

## Minimal Implementation Rules

Before implementation, check the parent `playbooks/minimal-implementation-review.md` when the change could add new code, abstractions, dependencies, settings, workflow behavior, or broader scope.

Record the result in the related Issue, PR, or log:

- what not to build
- existing code or documents to reuse
- standard or native functionality that is enough
- whether a new dependency is avoided or justified
- the smallest implementation plan
- quality requirements that must not be reduced, especially security, input validation, data loss prevention, rollback, and accessibility

Minimalism findings from review must be triaged before implementation.

## Completion Scorecard Rules

Every development item must keep a 100-point completion score against the AI operation purpose and product purpose.

Use `docs/ai-development/completion-scorecard.md` for local scoring and the parent `playbooks/completion-scorecard.md` as the reference model. Record the score in at least one of these places before handover or merge readiness:

- the related Issue or PR body/comment
- `docs/ai-development/completion-scorecard.md` when updating the standing scorecard
- `docs/ai-development/progress.md` or the relevant `docs/ai-development/logs/` entry for scheduled runs

The score must explicitly answer:

- Is the current output safe to publish for the stated purpose?
- Is it suitable for continued operation under the current AI development cycle?
- What is missing from 100 points?
- What is the next single action to raise the score?

A score below 80 means the item is not ready for publish / merge readiness. A score below 90 is not publish-ready under the parent scorecard. A score below 95 is not treated as fully complete for autonomous operation in this repository. Final publish, production readiness, and CAB decisions remain human-approved.

## Human Decision Queue

When a decision must be made by a human and should be tracked in GitHub, use the parent `operations/repository-decision-queue.md` model:

- fixed file: `.github/agent-decisions.yml`
- required label: `needs-human-decision`
- ready label after decision: `ready-for-automation`
- Issue title: `Decision: <Decision ID> <short title>`
- Issue template: `.github/ISSUE_TEMPLATE/human-decision.md`

Slack can still be used for the repository's existing clarification loop, but durable decisions that affect implementation, publish readiness, permissions, destructive actions, or automation should be reflected back into GitHub records before implementation proceeds.

## Scheduled Run Policy

The active ChatGPT schedules are split into three user-approved cycles while still using only the parent repository loop and gate definitions.

1. Implementation fast cycle: run at the shortest available interval supported by ChatGPT schedules, currently every 15 minutes. This cycle may only handle Implementation PR, CI Failure, Spec Gate, Storage Conflict Guard, Minimal Implementation Review, and Completion Scorecard work. It must not treat an item as complete without a recorded score.
2. Review cycle: run once per hour. This cycle may handle Code Review, Review Triage, Spec Gate, Storage Conflict Guard, Minimal Implementation Review, Service Publication Review, and Completion Scorecard work. It must review whether the current item is safe to publish for its purpose and suitable for continued operation, then record the score or the reason scoring is blocked.
3. Human-check and Slack cycle: run once per hour. This cycle handles human approval items, Slack questions, answer-waiting records, Repository Decision Queue items, and applying received answers to requirements, AI-operation notes, work logs, handover, progress, or completion-scorecard records before implementation.

All active schedules must:

1. Check the ChatGPT-side memory lock described in `docs/ai-development/automation-lock.md`.
2. Read `docs/ai-development/progress.md` and select exactly one highest-priority task for that cycle.
3. Classify that task into one parent loop or gate.
4. Execute only the smallest safe unit allowed by that loop.
5. Use the Slack question loop below when a design, implementation, verification, publish-readiness, or operation-readiness decision is unclear.
6. Use Repository Decision Queue records when the decision should be durable in GitHub.
7. Record the result, stopped reason, verification, completion score or scoring blocker, and next task in `docs/ai-development/progress.md` and `docs/ai-development/work-log.md` or `docs/ai-development/logs/`.
8. Release the memory lock.

GitHub-side lock JSON files are not lock sources. The old 12-job scheduled cycle must remain disabled and must not be used as the development cycle.

## Start Conditions

Before implementation, confirm:

- Requirements and relevant design are clear.
- Open questions and blockers are absent or explicitly out of scope.
- The target Issue is small enough for one focused change.
- Verification commands are clear.
- Security, permission, personal information, input validation, publish-readiness, and operation-readiness impacts are understood.
- Review findings have been triaged before implementation.
- Minimal implementation choices are recorded when relevant.
- Completion scoring criteria are clear enough to judge the item against its purpose.

Implementation may only work on Issues that are design-confirmed, unblocked, small, and have clear verification.

## Stop Conditions

Stop and record the reason in `docs/ai-development/work-log.md` or `docs/ai-development/logs/` when any of these apply:

- `docs/requirements.md` or `docs/ai-development/requirements.md` has an open blocker.
- The Issue is too large or not decomposed.
- The design is undecided.
- A Slack or human answer is still pending.
- Verification is unclear.
- Security, permissions, personal information, input validation, publish readiness, or operation readiness decisions are undecided.
- Review feedback has not been triaged.
- Minimalism findings have not been triaged.
- Completion scoring cannot be performed because the purpose, acceptance criteria, or target output is unclear.
- The work requires unapproved schedule registration, PR creation, product-code change, production operation, destructive change, data migration, or permission change.
- The memory lock cannot be acquired or released.
- A write target has a stale snapshot or duplicate-operation risk.

## Slack Question Loop

If an unknown affects implementation, design, verification, publish readiness, or operation readiness, do not guess.

- Slack confirmation destination: `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP` (`channel_id: C0BCAL9FFSP`).
- Slack posting is reserved for new decision material: post only when there is a new fact, blocker, trade-off, or approval item that needs a human answer before design, implementation, verification, publish readiness, or operation can proceed.
- Do not post routine hourly reports, no-issue reports, repeated known blockers, or progress summaries to Slack. Keep those in the ChatGPT scheduled-run report and in `docs/ai-development/progress.md` / `docs/ai-development/work-log.md` / `docs/ai-development/logs/`.
- If Slack posting is available and the posting condition is met, post to `C0BCAL9FFSP` in Japanese and ask exactly one question per post.
- Each Slack question must include concise numbered or labeled choices so the human can answer by selecting an option. Include a free-form / other option when the provided choices may not cover the decision.
- Direction-setting replies in Slack are accepted from anyone who can reply in the destination channel. The channel's membership and posting permissions are the authority boundary; do not require a specific named person unless a separate user instruction says so.
- If Slack posting is unavailable, posting fails, or the posting condition is not met, record the proposed question or internal confirmation item as `回答待ち` or `ChatGPT 内確認事項` in `docs/ai-development/work-log.md`, the related Issue, and when relevant `docs/ai-development/requirements.md`.
- When an answer arrives, update the applicable requirements, design, instruction, handover, completion-scorecard, progress, or work-log document before implementation.

## Human Approval Required

Human approval is required for schedule registration or re-enablement, production deployment, public release / publish readiness final approval, destructive migration, data deletion, permission model changes, authentication/authorization/secret/personal-information changes, irreversible changes, unclear-scope implementation expansion, merge with untriaged high-risk findings, and CAB or production readiness final decisions.

## Prohibited Operations

- Do not delete or replace `docs/requirements.md` as the requirements source of truth.
- Do not move or delete many existing product documents in one change.
- Do not implement while open blockers or undecided issues remain.
- Do not send untriaged review findings directly into implementation.
- Do not guess unclear design, implementation, verification, publish-readiness, or operation-readiness decisions.
- Do not mark an item complete without a completion score or an explicit scoring blocker.
- Do not expand the initial scope into authentication, external APIs, or server persistence without explicit requirements.
- Do not edit the parent repository `tanaka03-sketch/ai-development-operations`; it is read-only reference material.
- Do not restore the old 12-job scheduled cycle.

## Verification

Run these checks for implementation changes when feasible:

```bash
npm run typecheck
npm test
npm run build
```

For mobile UI changes, also follow README `Mobile verification` checks around 390px width.

## End Of Work

At the end of each work session, update `docs/ai-development/progress.md` when the current state or next action changes, update `docs/ai-development/completion-scorecard.md` or the related Issue / PR / log with the completion score when applicable, and update `docs/ai-development/work-log.md` or `docs/ai-development/logs/` with the loop type, references, changes, verification, blockers, human-confirmation items, and next actions.
