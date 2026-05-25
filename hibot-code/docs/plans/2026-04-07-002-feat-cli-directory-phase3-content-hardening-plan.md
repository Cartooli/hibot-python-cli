---
title: "feat: CLI Directory — Phase 3 content fill & Phase 4 hardening"
type: feat
status: active
date: 2026-04-07
origin: docs/brainstorms/2026-04-07-in-app-cli-reference-requirements.md
prior_plan: docs/plans/2026-04-07-001-feat-in-app-cli-reference-plan.md
---

# feat: CLI Directory — Phase 3 content fill & Phase 4 hardening

## Overview

**Prerequisite:** [2026-04-07-001-feat-in-app-cli-reference-plan.md](./2026-04-07-001-feat-in-app-cli-reference-plan.md) — Phases 1–2 are **shipped**: `cli-reference-data.js` (schema v1, Appendix A-style tree, stubs + one **complete** section sample: OS → Navigation & files), `createWideModal` + `cliReference.show()` in [editor.html](../../editor.html), Learning Tools entry, [sw.js](../../sw.js) precache `bws-v2.9.1`.

This plan continues the same product intent (see origin **R1–R7**): finish **Phase 3 — editorial fill** and **Phase 4 — hardening** from 001, with explicit priorities and acceptance checks. Carry forward: bundled offline content (**R6**), stub honesty (**R4**), entry completeness (**R3**, **R5**), navigability (**R7**), accessibility parity (origin **Success Criteria**).

**(see origin:** [docs/brainstorms/2026-04-07-in-app-cli-reference-requirements.md](../brainstorms/2026-04-07-in-app-cli-reference-requirements.md)**)**

## Problem Statement / Motivation

The shell and navigation exist, but most sections remain **stub** — learners still cannot rely on the directory as a primary reference until more sections reach **complete** with real command entries (origin **Problem Frame**). On small viewports and assistive tech, the wide modal needs validation against the same bar as other learning modals (origin accessibility success criterion; 001 Phase 4).

## Proposed Solution

### Phase 3 — Editorial fill (iterative, data-only + CHANGELOG)

1. **Editorial guidelines (lightweight)** — Document in a short comment block at the top of `cli-reference-data.js` (or a sibling `CLI_REFERENCE_EDITORIAL.md` only if the team wants a separate doc — default: keep **one file** to avoid drift):
   - Examples assume **Unix/macOS/Linux** shell unless the section is explicitly Windows-focused; one-line note when a command differs on Windows (Git Bash, WSL).
   - Prefer **`npx`** or **local** binaries where relevant for Node tooling sections (defer exact wording per section).
   - Every **complete** command row includes `verifyHint` for volatile stacks (**R5**).

2. **Promotion workflow** — For each section moved from `stub` → `complete`: fill `commands[]` until the section teaches a coherent slice (not necessarily exhaustive encyclopedic coverage). Update **CHANGELOG** Unreleased with a bullet per meaningful release slice.

3. **Suggested priority order** (adjustable; aligns with 001 “learner value” note):
   - **3a.** OS: complete **Streams, search & JSON** (`grep`, `tail`, `curl` + `jq` minimal patterns).
   - **3b.** Git: **Daily workflow** — `status`, `add`, `commit`, `push`, `pull`, `branch`, `checkout`/`switch`.
   - **3c.** Package managers: **Node** — `npm install`, `npm run`, `npx`; optional one line each for `pnpm` / `bun` if space allows.
   - **3d.** Frontend: **Vite** — `vite`, `vite build`, `vite preview` (or framework-neutral “see `--help`”).
   - Then continue through Appendix A categories in whatever order fits curriculum goals.

4. **Quality gate** — Before marking a section **complete**, run the **10-entry spot check** called out in origin success criteria on that section’s commands (or across the release if multiple sections ship).

### Phase 4 — Hardening (UI/UX + a11y + optional persistence)

1. **Responsive layout** — Ensure TOC + detail **stack** on narrow viewports (e.g. `flex-direction: column` below ~640px, TOC `max-height` + scroll, detail below). Avoid horizontal-only access to half the UI. (Implements **R7** “navigability at scale” on mobile.)

2. **Focus management** — On open, move focus to the filter input or first TOC control; on close, **return focus** to the **CLI Directory** trigger button (001 SpecFlow step 5 — verify/fix). Consider `aria-labelledby` / `aria-describedby` already partially present — audit.

3. **Keyboard** — Confirm Tab order through filter → TOC buttons → Close; Escape closes (already wired via `createWideModal`).

4. **Bundle size** — After each content wave, note approximate `cli-reference-data.js` size in CHANGELOG or plan checklist; if a threshold is exceeded (e.g. **>150KB** gzipped — measure in planning/CI informally), open a follow-up task: **optional** split into multiple `<script src>` chunks (still no `fetch`; preserves **R6**).

5. **Optional (origin 001):** `localStorage` key for last selected `cat`/`sec` — only if it does not complicate privacy story (local-only; no network). Product call during implementation.

## Technical Considerations

- **Single source of truth:** Continue editing [cli-reference-data.js](../../cli-reference-data.js); avoid duplicating content in markdown elsewhere unless generating from MD later (out of scope unless needed).
- **Rendering:** No change required to schema for Phase 3 if fields stay stable; if adding optional `platformNote` or `tags`, bump `schemaVersion` and document in file header.
- **Service worker:** Bump `CACHE_NAME` in [sw.js](../../sw.js) when shipping meaningful content or data file changes so repeat visitors get fresh CLI data.

## System-Wide Impact

- **Users:** Richer offline reference; slightly larger download on first load after deploy.
- **Maintainers:** Editorial burden scales with sections; keep sections small and coherent to avoid burnout.

## Acceptance Criteria

### Phase 3

- [ ] Editorial mini-guidelines exist (comment block or linked doc per decision above).
- [ ] At minimum **four additional sections** reach `complete` status in `cli-reference-data.js` covering **3a–3d** priority list (or documented substitute if product changes order).
- [ ] Each **complete** command satisfies origin **R3**; **R5** satisfied via `verifyHint` where applicable.
- [ ] **CHANGELOG** Unreleased documents the content wave.
- [ ] **10-entry spot check** performed and noted (inline in PR description or short note in CHANGELOG).

### Phase 4

- [ ] Layout usable on a **375px-wide** viewport (TOC and detail both reachable without broken flex).
- [ ] Focus returns to **CLI Directory** button after Close / Escape.
- [ ] No regression to offline behavior: still **no network** required to read directory (**R6**).
- [ ] `sw.js` cache version bumped if required for production cache coherence.

## Dependencies & Risks

- **Risk:** Content accuracy — mitigate with “verify” hints and conservative wording; not claiming exhaustive CLI coverage (origin **Scope Boundaries**).
- **Risk:** `editor.html` growth — Phase 4 changes should prefer **CSS class** on existing shell rather than large new inline blocks where possible.

## Deferred (future plans)

- Outbound **optional** links to official docs (**R6**) — clearly labeled external; not required for Phase 3–4.
- Lazy-loading by category without breaking offline/`file://` — only if bundle-size research demands (origin **Deferred**).

## Sources & References

- **Origin document:** [docs/brainstorms/2026-04-07-in-app-cli-reference-requirements.md](../brainstorms/2026-04-07-in-app-cli-reference-requirements.md) — R1–R7, Appendix A, success criteria.
- **Prior plan:** [docs/plans/2026-04-07-001-feat-in-app-cli-reference-plan.md](./2026-04-07-001-feat-in-app-cli-reference-plan.md) — Phases 1–4 outline.
- **Implementation:** [cli-reference-data.js](../../cli-reference-data.js), [editor.html](../../editor.html) (`cliReference`, `createWideModal`), [sw.js](../../sw.js).

## SpecFlow (Phase 3–4)

1. Maintainer fills **Streams, search & JSON** with real commands → saves → reload editor → section shows **complete** without “Coming soon” when commands exist.
2. User on mobile opens **CLI Directory** → can scroll TOC and read detail without layout overlap.
3. User Tab-navigates → reaches Close → activates → focus returns to trigger.
4. Airplane mode / offline: open editor from SW cache → CLI Directory still works.

---

Plan written to `docs/plans/2026-04-07-002-feat-cli-directory-phase3-content-hardening-plan.md`.
