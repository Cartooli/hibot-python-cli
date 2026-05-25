---
title: "feat: In-app CLI reference directory (full survey, stub-first)"
type: feat
status: active
date: 2026-04-07
origin: docs/brainstorms/2026-04-07-in-app-cli-reference-requirements.md
---

# feat: In-app CLI reference directory (full survey, stub-first)

## Overview

Add an in-app, offline-readable **CLI directory**: hierarchical categories (see origin Appendix A), command entries with description + summary use case + example, **full navigation tree from day one**, and clearly marked stubs for content not yet written. Aligns with Hi Bot Code’ educational positioning and privacy-first model (see origin **R6**).

**Origin document:** [docs/brainstorms/2026-04-07-in-app-cli-reference-requirements.md](../brainstorms/2026-04-07-in-app-cli-reference-requirements.md) — key decisions carried forward: in-app surface (not repo-only), full-survey breadth over time, stub-first TOC (**R4**), bundled static content (**R6**), navigability at scale (**R7**), accessibility parity with other learning UI.

## Problem Statement / Motivation

Learners graduate from HTML/CSS/JS to tooling, Git, installs, and deployment. A structured, trustworthy in-product reference reduces context-switching and supports the product’s teaching mission without sending users to ad-heavy or inconsistent sources for basic command literacy (see origin **Problem Frame**).

## Proposed Solution

1. **Content model** — Define a small, versioned schema (e.g. categories with stable string IDs, optional child sections, command entries with fields matching origin **R3**). Each node carries a `contentStatus`: `stub` | `draft` | `complete` (or equivalent) to satisfy **R4** and success-criteria spot checks.

2. **Data packaging** — Store corpus in one or more **static** assets bundled with the app (e.g. JSON loaded at runtime, or JS module exporting a constant). Avoid embedding tens of thousands of lines inline in `editor.html` (see origin **Dependencies**: maintainable format). Prefer a dedicated file such as `cli-reference-data.json` (or `.js`) at repo root of `Hi Bot Code/` and load via `<script>` or dynamic import pattern consistent with the project’s no-build or minimal-build setup.

3. **UI** — New learner-facing entry point in the **Learning Tools** area (alongside Learning Path / Daily Challenge pattern) opening a **large modal or full-screen overlay** (existing `createModal` uses `max-width:600px` — likely **too narrow** for a two-pane TOC + detail layout; extend or add a dedicated shell with wider `max-width`, e.g. `min(960px, 95vw)`, two columns on desktop, stacked on mobile). Components:
   - **Left (or top):** collapsible category tree matching origin **Appendix A** plus nested sections.
   - **Right (or below):** detail view for selected section or command; stubs show explicit “Coming soon” / outline.
   - **Search/filter** (minimal v1): filter TOC labels and command names client-side string match — satisfies **R7** “no wall of text”.

4. **Phased content** — Implementation ships **stub nodes for all Appendix A branches** first; editorial passes fill `complete` entries incrementally (origin **Key Decisions**). No network required for reading (**R6**).

## Technical Considerations

- **Architecture:** Follow existing patterns: `learningPath.show()`-style object + `createModal` / `safeSetInnerHTML` (see `editor.html` ~15811+, ~13283+). New `cliReference` (or similar) namespace.
- **Performance:** Large JSON may affect load time; if bundle grows, defer **lazy loading** by category chunk (multiple JSON files + fetch) — only if fetch is acceptable; origin requires **no network for normal read**. Prefer **single synchronous load** of one bundled file or split files included via multiple `<script src>` tags so everything remains offline on `file://` and static hosting.
- **Security:** If any user-generated search or HTML rendering touches untrusted strings, use existing `safeSetInnerHTML` / escaping patterns; reference content is static and trusted.
- **A11y:** Keyboard focus trap in modal (verify against existing modals), heading hierarchy for TOC and detail, sufficient contrast — align with origin success criterion on accessibility parity.

## System-Wide Impact

- **Interaction graph:** Button click → modal open → in-modal navigation only; should not mutate user project or `localStorage` unless we add “last opened section” persistence (optional, not in origin — default omit).
- **Error propagation:** If data file fails to load, show a single friendly error state in the modal (rare for static bundle).
- **Bundle size:** Risk for mobile; track size in acceptance criteria; plan for optional chunking in deferred work (origin **Deferred**: bundle-size research).

## Acceptance Criteria

- [ ] **R1:** “CLI Directory” (or agreed name) is visible from the Learning Tools / learning area and opens without reading README.
- [ ] **R2 / Appendix A:** All **10** top-level categories from the origin appendix appear in the tree with stable IDs; nested structure can be stubbed but navigation must not dead-end.
- [ ] **R3:** For any section marked **complete**, entries include invocation, description, summary use case, and example (or explicit waiver per origin **R3**).
- [ ] **R4:** Stubbed sections are **clearly** labeled; user testing “confusion test” passes informally (spot check with one reviewer).
- [ ] **R5:** Completed entries for volatile tools include a short “verify on your machine” line (`--help`, etc.).
- [ ] **R6:** Browsing works with **no network** after page load (static assets only).
- [ ] **R7:** Two-pane or equivalent navigation; filter/search reduces scrolling through long lists.
- [ ] **Accessibility:** Keyboard can open modal, move focus, close with Escape (existing pattern), and navigate TOC entries (buttons or roving tabindex — specify in implementation).
- [ ] **Spot-check:** For any release that marks a section **complete**, 10 random entries pass **R3** review.

## Implementation Phases

### Phase 1 — Schema + stub corpus

- Define JSON (or JS) schema for categories, sections, commands, `contentStatus`.
- Generate stub tree covering Appendix A + minimal placeholder children so the tree is representative.
- Land data file(s) under `Hi Bot Code/` with a short **README** comment block at top of file describing schema version.

### Phase 2 — UI shell

- Add entry button and `cliReference.show()` (name TBD).
- Implement wide modal/layout, TOC list, detail pane, stub styling.
- Client-side filter input.

### Phase 3 — Editorial fill (iterative)

- Prioritize sections by learner value (suggested order for first **complete** sections: OS basics + Git + one package manager + static server — **editorial**, not blocking).
- Promote nodes from `stub` → `complete` per release notes / CHANGELOG.

### Phase 4 — Hardening

- Mobile layout polish, focus management audit, performance check on low-end devices.
- Optional: `localStorage` remember last category (if approved — origin silent).

## Dependencies & Risks

- **Risk:** `editor.html` size/complexity — mitigate by external data file and isolated functions.
- **Risk:** Modal width — new variant or CSS class for “wide modals” to avoid breaking existing `createModal` consumers.
- **Deferred from origin:** Exact editorial guidelines (POSIX vs Windows), lazy-loading strategy if bundle exceeds budget, primary button placement (**Deferred to Planning** items in origin — resolve during Phase 1–2).

## Sources & References

- **Origin document:** [docs/brainstorms/2026-04-07-in-app-cli-reference-requirements.md](../brainstorms/2026-04-07-in-app-cli-reference-requirements.md) — stub-first full TOC, in-app only, Appendix A taxonomy, R1–R7.
- **Implementation patterns:** [editor.html](../../editor.html) — `learningPath.show`, `createModal` (~13283), Learning Tools buttons (~17032+).

## SpecFlow / user flows (concise)

1. User opens app → sidebar **Learning Tools** → **CLI Directory** → modal opens → sees TOC + empty/detail pane.
2. User selects **Category 3 (Package managers)** → sees stub banner + outline or placeholder text.
3. User selects a **complete** subpage (when available) → sees command entries with example and verify hint.
4. User types in filter → TOC narrows.
5. User presses Escape → modal closes; focus returns to trigger button (verify focus restoration).

---

Plan written to `docs/plans/2026-04-07-001-feat-in-app-cli-reference-plan.md`.
