---
title: "feat: Anti-Slop Color Bundles (7 curated palettes with inline rationale)"
type: feat
status: completed
date: 2026-04-15
origin: docs/brainstorms/2026-04-15-anti-slop-color-bundles-requirements.md
---

# Anti-Slop Color Bundles

Seven curated 3-color palettes at the top of the editor's color panel, each carrying a one-sentence principle that teaches the lesson the palette was chosen to teach. Non-breaking, no new dependencies, ships as four atomic commits.

## Overview

The launch essay (`/why-i-built-this.html`) argues for **craft and agency vs. vibe coding** and is now live in prod. The product needs a mechanism that backs that claim on the visual-design side — today, Challenge 1 fires on *any* color change, which means a learner can "win" with a neon-pink + neon-cyan + violet combo and walk away having produced AI slop.

This feature ships seven curated color bundles at the top of the existing color panel. Each bundle:
- Sets `bg / ink / accent` in a single write via the existing state → panel → code → preview chain.
- Carries an inline 1–2 sentence rationale that names the **principle** the bundle teaches (not just the aesthetic).
- Persists the selection in `localStorage` so reloads restore the bundle baseline.
- Shows a "Using Editorial" → "Based on Editorial (modified)" indicator as the user tweaks away from the pristine bundle.

All seven clear WCAG-AA 4.5:1 for body text. One bundle (Newsprint) has an accent that lands at ~4.2:1 — which is the intentional "single pop of red" trick; the plan flags this explicitly so copy doesn't misuse the accent as body text.

## Problem Statement / Motivation

Mega-eval hater Lens 2 ("IA and voice don't know who they're for") and doc 05 §5 ("Craft and agency vs. vibe coding") both name the same gap: the product claims to teach taste but gives users an unconstrained color wheel as their first real design decision. The landing's new hero says "Type HTML. Watch it render." — the next question the beginner asks is "what colors?" and today we give them seventeen legacy presets with "Neon Nights," "Barbie Pink," and "Purple Haze" in the list.

The single-accent principle ("one hero color beats three") is the biggest anti-slop move in modern web design. Shipping seven bundles that *each* reinforce that principle, with inline rationale, turns the color panel from a playground into a lesson.

## Proposed Solution

Four atomic commits, landed in order:

1. **`feat(editor):`** Bundle data + apply function + indicator state — logic only, no UI visible yet.
2. **`feat(editor):`** Render the bundle grid at the top of the color panel (UI + CSS).
3. **`feat(editor):`** Persist bundle selection in `localStorage` + render the "Using / Based on" indicator.
4. **`style(editor):`** Final copy pass — section header + rationale text for all seven bundles, with user sign-off before commit.

Legacy `<select id="colorPreset">` (17 entries including the slop-core ones) stays in place for now. A later sprint can prune it; removing it in this sprint would regress users who rely on a specific legacy preset. The new bundle grid appears ABOVE the existing "Color Preset" dropdown with a clear visual hierarchy.

## Technical Approach

### Architecture

No architectural change. All additions live inside `editor.html` — one object-literal for bundle data, one apply function, one render routine, one indicator renderer. The existing `state → stateToPanel → stateToCode → codeToPreview` chain is reused verbatim; bundles set three keys and then call the chain once. No new files, no build step.

### Implementation Units

Each unit has Goal, Files, Approach, Patterns, Verification, and an Execution note where posture matters.

---

#### Unit 1 — Bundle data structure + apply function (R1, R3)

- **Goal:** Define the seven bundles as a single JS object literal and ship the function that applies a bundle to the editor state.
- **Files:** `editor.html` only. Place the additions near the existing `state` declaration (around line 5093) and the existing color-preset handler.
- **Approach:**
  1. Add a `COLOR_BUNDLES` object literal with the 7 entries (below). Each entry has `id`, `name`, `bg`, `ink`, `accent`, and a `rationale` string that Unit 4 will overwrite with the final copy. Unit 1 ships with placeholder rationale ("TBD — final copy in Unit 4") so the data shape is stable.
  2. Add `applyColorBundle(bundleId)` — pattern mirrors what the existing `colorPreset` change handler does (which planning verified at `editor.html:4462`-area). Pseudocode:
     ```js
     function applyColorBundle(bundleId) {
       const b = COLOR_BUNDLES[bundleId];
       if (!b) return;
       state.bgColor = b.bg;
       state.textColor = b.ink;
       state.accentColor = b.accent;
       state.linkColor = b.accent; // link defaults to accent per existing convention at line 6720
       // border + shadow left alone per R5
       stateToPanel();
       stateToCode();
       codeToPreview();
       // Persist + indicator updates handled by Unit 3; stub the call here for Unit 3 to fill in.
       if (typeof setCurrentBundle === 'function') setCurrentBundle(bundleId);
     }
     ```
  3. Do NOT touch `borderColor`, `shadowColor`, `fontFamily`, or any other state key.
- **Patterns to follow:** Existing `colorPreset` handler (find via `editor.html:4463` select element and its change listener). Match its state-write order, its reliance on the existing chain, and its error handling (returning early if the key doesn't match a known preset).
- **Verification:**
  - In DevTools, call `applyColorBundle('editorial')` and confirm `state.bgColor === '#fafaf7'`, `state.textColor === '#1a1a1a'`, `state.accentColor === '#c0392b'`, and the preview iframe updates.
  - `applyColorBundle('bogus')` is a no-op with no console error.
  - `COLOR_BUNDLES` has exactly 7 entries with the exact hex values from the data table below.
- **Execution note:** No UI visible yet. This is foundation; Unit 2 consumes it.

**Bundle data (exact values for the object literal):**

```js
const COLOR_BUNDLES = {
  editorial:  { id: 'editorial',  name: 'Editorial',  bg: '#fafaf7', ink: '#1a1a1a', accent: '#c0392b', rationale: 'TBD (Unit 4)' },
  studio:     { id: 'studio',     name: 'Studio',     bg: '#0f1117', ink: '#e8eaed', accent: '#5eead4', rationale: 'TBD (Unit 4)' },
  library:    { id: 'library',    name: 'Library',    bg: '#f5ecdb', ink: '#2d2419', accent: '#7a3b32', rationale: 'TBD (Unit 4)' },
  chalkboard: { id: 'chalkboard', name: 'Chalkboard', bg: '#2b2d36', ink: '#f3ebd8', accent: '#d4a84b', rationale: 'TBD (Unit 4)' },
  newsprint:  { id: 'newsprint',  name: 'Newsprint',  bg: '#ffffff', ink: '#111111', accent: '#e63946', rationale: 'TBD (Unit 4)' },
  meadow:     { id: 'meadow',     name: 'Meadow',     bg: '#f4efe6', ink: '#2e3828', accent: '#b36a3f', rationale: 'TBD (Unit 4)' },
  memo:       { id: 'memo',       name: 'Memo',       bg: '#faf4dc', ink: '#0a0a0a', accent: '#253245', rationale: 'TBD (Unit 4)' },
};
```

---

#### Unit 2 — Bundle grid UI in the color panel (R1, R2, R6)

- **Goal:** Render the seven bundles as a clickable grid at the top of the "3. Pick Your Colors" section, with each bundle card showing its name, three color chips, and inline rationale (from Unit 1's placeholder data).
- **Files:** `editor.html` only. Insert markup in the `<div class="group">` at line 4517 ("3. Pick Your Colors"), above the existing `<div class="help-hint">Not sure what looks good? Try a Color Preset from the dropdown above!</div>` at line 4520 (which also needs its copy updated — see Unit 4).
- **Approach:**
  1. Add a new `<div class="color-bundle-grid">` block directly inside the "3. Pick Your Colors" `<div class="group-content">`, as the FIRST child (before the existing help-hint).
  2. One `<button class="color-bundle">` per bundle, populated at DOM-ready from `COLOR_BUNDLES`. Each button:
     - Renders the bundle name (`<span class="cb-name">`)
     - Renders three color chips (`<span class="cb-chip" style="background:BG/INK/ACCENT">`)
     - Renders the rationale (`<span class="cb-rationale">`)
     - `data-bundle-id="<id>"` attribute
     - On click: `applyColorBundle(this.dataset.bundleId)` (from Unit 1)
  3. CSS uses the existing design tokens — no new custom properties:
     - Grid: `display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px;` (collapses to single-column on narrow sidebar)
     - Card: `background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; cursor: pointer; text-align: left;`
     - Chips: three small squares in a row, `width: 14px; height: 14px; border-radius: 3px; display: inline-block; margin-right: 3px;`
     - Hover: `border-color: var(--accent);`
     - Pressed/current bundle (Unit 3 adds the `data-current="true"` toggle): `border-color: var(--accent); background: rgba(61, 214, 140, 0.05);`
  4. Section header above the grid: a short `<p class="bundle-intro">` with a one-sentence framing. Final wording in Unit 4.
- **Patterns to follow:** The existing `<div class="two">` layouts in the color panel use the sidebar's `var(--card)` / `var(--border)` tokens — match those. No new tokens.
- **Verification:**
  - Open the editor at desktop width. Bundles render as a 1- or 2-column grid inside the color panel.
  - Clicking a bundle immediately updates the preview (because it calls Unit 1's `applyColorBundle`).
  - Clicking each of the 7 bundles in turn, then spot-check the preview renders visibly different for each.
  - On mobile viewport (360px), the grid stacks to 1 column and remains legible.
  - The existing individual color pickers (bgColor/textColor/accentColor/borderColor) are untouched and still below the grid.
- **Execution note:** Visual unit. After this commit, capture a screenshot for the PR.

---

#### Unit 3 — `localStorage` persistence + "Using / Based on" indicator (R7, R5 modifier)

- **Goal:** Persist the selected bundle id across reloads, and render an indicator that shows whether the user is still on the pristine bundle or has diverged.
- **Files:** `editor.html` only.
- **Approach:**
  1. **Storage key:** `colorBundleId`. Matches the project's existing camelCase, no-prefix convention (`completedCoreChallenges`, `hasSeenEditorWelcome`, `previewZoom`).
  2. **`setCurrentBundle(bundleId)`** — writes the id via `safeLocalStorageSet('colorBundleId', bundleId)` and updates the indicator. Called from `applyColorBundle` at the end.
  3. **`getCurrentBundle()`** — reads via `safeLocalStorageGet('colorBundleId', null)`; returns `null` if the stored value isn't a known bundle id.
  4. **Indicator element:** a small `<span id="currentBundleIndicator">` placed inside the `bundle-intro` header or directly below it. Text logic:
     - No bundle stored OR state doesn't match the stored bundle: indicator hidden.
     - State matches stored bundle's `{bg, ink, accent}` exactly: text reads *"Using **{Name}**."*
     - State diverges from stored bundle on any of the three: text reads *"Based on **{Name}** (modified)."*
  5. **Diff check (`isBundlePristine(bundleId)`):** compares `state.bgColor === b.bg && state.textColor === b.ink && state.accentColor === b.accent`. Case-insensitive string compare on the hex values.
  6. **Repaint triggers:** run `paintBundleIndicator()` on:
     - Initial load (DOMContentLoaded or right after existing `stateToPanel()`/`stateToCode()` calls — mirror the pattern from Unit 3 of the Launch-Ready sprint, which painted a similar indicator on `bws:completedCoreChallengesChanged` events).
     - After `applyColorBundle()` completes.
     - After `panelToState()` fires (so user tweaking individual pickers flips "Using" → "Based on ... (modified)" immediately).
  7. **Load-time behavior:** on first paint, read `colorBundleId` from localStorage and check if the current state matches the bundle's colors. If yes, show "Using X." If not (user edited), show "Based on X (modified)." If no stored id, hide the indicator. Do NOT auto-apply the bundle on load — that would override any code the user hand-edited; we only show provenance, not re-apply.
- **Patterns to follow:**
  - Existing `safeLocalStorageGet`/`Set` wrappers at `editor.html:6111` and `6137`.
  - The "paint on event" pattern from the per-core-challenge badge shipped in the Launch-Ready sprint (`editor.html` already contains `paintChallengeProgressBadge`). Mirror it.
- **Verification:**
  - Pick Editorial → reload → indicator shows "Using **Editorial**."
  - Pick Editorial → change `accentColor` to something else via the color picker → indicator flips to "Based on **Editorial** (modified)."
  - Clear localStorage → reload → indicator hidden.
  - Corrupt the `colorBundleId` value (`localStorage.setItem('colorBundleId', 'totally-not-a-bundle')`) → reload → indicator hidden, no console error.
  - Pick Editorial, then manually set `state.bgColor` back to Editorial's exact bg hex → indicator stays "Using **Editorial**." (Proves the diff is pure value comparison, not provenance tracking.)
- **Execution note:** Small JS addition (~30 lines). Test with DevTools localStorage edits before committing.

---

#### Unit 4 — Copy pass (R2, R6)

- **Goal:** Lock in the final rationale strings for all seven bundles, the intro sentence above the grid, and the updated help-hint. Requires user sign-off on copy before commit.
- **Files:** `editor.html` only — rewriting the `rationale` fields in `COLOR_BUNDLES`, the `bundle-intro` text, and the legacy help-hint at line 4520.
- **Approach (deliver two candidates per field for user to pick):**

  **Intro sentence (above the bundle grid)**
  - **A (Recommended)** — *"Start with a palette. Each one is shaped to avoid the AI-generated-landing-page patterns every modern site falls into."*
  - **B** — *"Seven palettes, each one built around a single design principle. Pick one; the whole page updates. Tweak individual colors below to fine-tune."*

  **Legacy help-hint replacement (at line 4520)**
  - **A (Recommended)** — Delete it entirely. The bundle grid IS the nudge now.
  - **B** — *"Not sure? Start with a palette above. Or use the Color Preset dropdown if you want the legacy theme list."* (keeps the dropdown discoverable)

  **Per-bundle rationale** (2 candidates each; user picks one per bundle at commit):

  | Bundle | Candidate A | Candidate B |
  |---|---|---|
  | **Editorial** | Black on off-white with a single red. One accent forces you to prioritize — The New Yorker has done this for 100 years. | One dark ink, one light paper, one red. The oldest anti-slop move in design: make one thing matter, let everything else support it. |
  | **Studio** | Dark mode without neon. Restraint is the whole move — pick one bright hue, use it sparingly. | Night mode done by someone who reads editorial magazines. A single teal accent carries everything; no gradients, no glow. |
  | **Library** | Warm cream and brown. Feels handmade on purpose — AI tools rarely land here. | A Penguin Classics palette. When colors are this warm, the page stops looking like a dashboard and starts looking like a thing someone made. |
  | **Chalkboard** | Dark doesn't have to feel tech. Warmth distinguishes from dashboard slop. | A diner menu board after close. Dark slate backgrounds carry more warmth than true black ever can. |
  | **Newsprint** | Pure black and white with a single pop of red. Radical by being normal. | The FT's palette. When everything else is monochrome, the red tells the reader exactly where to look. (Use the accent for accents; it's not body-text safe.) |
  | **Meadow** | Nature colours don't look AI-generated, because AI hasn't learned them well. | Olive on oat with a terracotta accent. Every color in this palette exists somewhere outdoors; none of them exist in a Figma starter kit. |
  | **Memo** | Pre-digital references read distinctive. The web didn't invent design. | A 1970s office memo. Butter-cream paper, dark-blue ink, radical only because it predates the web. |

- **Patterns to follow:** Match the voice of the launch essay — direct, slightly wry, never evangelical. If a candidate reads marketing-y, cut it.
- **Verification:**
  - Every `rationale` field in `COLOR_BUNDLES` is ≤ 180 characters so the grid stays scannable.
  - Rationale renders on two lines max at the default bundle-card width.
  - `grep -c 'TBD' editor.html` for `COLOR_BUNDLES` returns 0.
  - Maintainer reads each card in-browser, signs off voice/tone before merge.
- **Execution note:** Blocking user checkpoint. Do NOT commit with defaults from the candidates above; always pause for the maintainer's pick.

---

### Implementation Order & Commit Plan

| # | Commit | Unit | Depends on |
|---|--------|------|------------|
| 1 | `feat(editor): add COLOR_BUNDLES data + applyColorBundle()` | U1 | — |
| 2 | `feat(editor): render color-bundle grid at top of color panel` | U2 | U1 |
| 3 | `feat(editor): persist bundle id in localStorage + "based on X" indicator` | U3 | U1, U2 |
| 4 | `style(editor): final bundle rationale copy` (paused for sign-off) | U4 | U1, U2, U3 |

Units 1–3 ship without user checkpoint (scope-settled, non-breaking, atomic). Unit 4 requires sign-off on the copy, same pattern as the Launch-Ready sprint's hero rewrite.

## System-Wide Impact

### Interaction graph

- **On bundle click:** `click → applyColorBundle → state write (3–4 keys) → stateToPanel → stateToCode → codeToPreview → setCurrentBundle → safeLocalStorageSet → paintBundleIndicator`. Single event, single repaint, no debounce conflict. Mirrors the existing `colorPreset` select handler.
- **On individual picker change:** `input event → panelToState → stateToCode → codeToPreview → paintBundleIndicator` (the last hook is new). The indicator flips to "Based on ... (modified)" at the moment the user diverges from the bundle baseline.
- **On page load:** `DOMContentLoaded → existing state init → paintBundleIndicator` (no auto-apply; provenance only).

### Error propagation

- `safeLocalStorageGet`/`Set` already swallow quota and parse errors — the bundle feature inherits that safety net.
- `applyColorBundle('bogus')` returns early; no throw, no partial state write.
- Corrupted `colorBundleId` value in localStorage fails the `b = COLOR_BUNDLES[id]` lookup and is treated as "no current bundle" — indicator hidden, no error.

### State lifecycle risks

- **None.** Bundle application is a single synchronous sequence over in-memory state + one localStorage write. No DB, no network, no race.
- One minor case: if the user picks a bundle, then immediately imports a JSON template that overwrites `state.bgColor`, the indicator correctly flips to "Based on X (modified)" on the next paint. No orphaned state.

### API surface parity

- The existing `colorPreset` select is the only other surface that writes `state.bg/text/accent/borderColor` from a single gesture. The bundle grid is a sibling, not a replacement. Both patterns can coexist without conflict; each calls the same downstream chain.
- If a later sprint prunes the legacy `colorPreset` dropdown, the bundles stand alone without extra work.

### Integration test scenarios

1. **Pick bundle → reload → indicator persists.** Load `/editor.html`, click Editorial, reload, see "Using **Editorial**."
2. **Pick bundle → tweak accent → indicator flips.** Pick Editorial, open the accent color input, change to any other color → indicator reads "Based on **Editorial** (modified)" without reload.
3. **Pick bundle → template load → indicator flips or hides.** Pick Editorial, then load the "Portfolio" template (which carries its own bgColor) → indicator flips to "Based on **Editorial** (modified)" or hides if the template's bundle id is null. Document actual behavior in Unit 3 smoke test.
4. **No bundle picked → individual pickers work unchanged.** Open editor, never touch bundles, use only bg/text/accent pickers → no indicator ever appears, existing UX preserved.
5. **Legacy colorPreset select → no conflict.** Pick a legacy preset ("Ocean") → colors update → indicator stays hidden because no bundle id is set. Pick a bundle → indicator appears. Pick a legacy preset again → indicator flips to "Based on X (modified)" because the preset's colors don't match the bundle's baseline (by definition). Acceptable: the user used a legacy preset, which is a divergence.

## Acceptance Criteria

### Functional

- [ ] `COLOR_BUNDLES` exists in `editor.html` with exactly the 7 entries and exact hex values from the data table.
- [ ] `applyColorBundle(id)` applies bg/ink/accent/link and triggers the full state→panel→code→preview chain.
- [ ] The bundle grid renders at the TOP of the "3. Pick Your Colors" section; individual pickers remain below, unchanged.
- [ ] Clicking any bundle updates the preview within ~300ms.
- [ ] Each bundle card shows: name, three color chips in order (bg/ink/accent), one-line rationale.
- [ ] Indicator reads "Using **{Name}**" when state matches the bundle's colors exactly.
- [ ] Indicator flips to "Based on **{Name}** (modified)" when any of the three relevant state values diverges.
- [ ] Indicator is hidden when no `colorBundleId` is stored or the stored id isn't in `COLOR_BUNDLES`.
- [ ] Reload preserves the bundle id; indicator re-renders correctly.
- [ ] Clicking the legacy `colorPreset` dropdown still works (regression gate).
- [ ] Challenge 1 still fires on any bundle pick (regression gate — bundle apply counts as a color change).

### Non-Functional

- [ ] WCAG-AA body-text contrast (≥ 4.5:1) holds for ink-on-bg on all 7 bundles. Reference:

  | Bundle | ink/bg | accent/bg | Notes |
  |---|---|---|---|
  | Editorial | ~17:1 ✓ | ~5.3:1 ✓ | |
  | Studio | ~15:1 ✓ | ~10:1 ✓ | |
  | Library | ~11.5:1 ✓ | ~7:1 ✓ | |
  | Chalkboard | ~11:1 ✓ | ~6.5:1 ✓ | |
  | Newsprint | ~20:1 ✓ | ~4.2:1 ◑ | Accent passes R4's 3:1 min but **fails 4.5 AA-body** — intentional per the bundle's "single pop of red" principle. Copy for this bundle explicitly warns. |
  | Meadow | ~11:1 ✓ | ~5:1 ✓ | |
  | Memo | ~18:1 ✓ | ~12:1 ✓ | |

- [ ] Zero external requests (Trust & Safety invariant preserved). Verified by curl + grep.
- [ ] No new dependencies. `package.json` `devDependencies` unchanged.
- [ ] Mobile layout (≤ 360px viewport) stacks bundle grid to 1 column without horizontal scroll.
- [ ] Preview iframe sandbox attribute unchanged (`allow-forms allow-popups allow-scripts`, no `allow-same-origin`).

### Quality Gates

- [ ] Trust & Safety-style smoke test: local server, curl `/editor.html`, grep for the 7 bundle ids in the rendered markup; confirm 0 Google font refs.
- [ ] Each unit commit builds and runs cleanly on its own.
- [ ] Unit 4 lands only after maintainer sign-off on rationale copy.
- [ ] `VERSION` bumps to 2.13.0 at Unit 4 commit; `sw.js` cache key bumps to `bws-v2.13.0`; `CHANGELOG.md` gains a new release entry. (Version bump is bundled with Unit 4 since it's the user-facing-complete moment.)

## Success Metrics

- **Primary:** a user who picks a bundle and completes Challenge 1 produces a page that an experienced designer would not flag as "AI-generated slop." Verified via side-by-side eyeball comparison against a v0-generated portfolio during QA.
- **Secondary:** `localStorage.getItem('colorBundleId')` appears on the maintainer's own browser after a dogfood pass through all 7 bundles. If the bundle name never appears there after the maintainer's own usage, the feature is discoverable-adjacent and needs UX review.
- **Leading indicator:** sidebar smoke test — does the new bundle grid feel like "a lesson" when opened, or "one more theme picker"? If the latter, the rationale copy (Unit 4) isn't doing its job and needs a rewrite pass.

## Dependencies & Risks

| Risk | Mitigation |
|------|------------|
| Bundle-apply breaks the existing `colorPreset` select handler | Use sibling, not replacement. Both handlers call the same `stateToCode → codeToPreview` chain; they coexist. Regression tested as an acceptance gate. |
| Indicator logic incorrectly compares hex strings (case/spacing) | Canonicalize both sides to lowercase hex before comparison. Test with `#FFFFFF` vs `#ffffff`. |
| Tweaking a single picker causes the indicator to flash "modified" midway through a 3-color bundle apply | Call `paintBundleIndicator` AFTER the three state writes, not during. Sequence matters. |
| Newsprint accent fails strict interpretation of AA-body for anyone who uses it as body text | Explicit callout in the rationale and in the plan's contrast table. Accent is for accents. |
| Unit 4 copy gets stuck waiting for maintainer sign-off, blocking the ship | Ship Units 1–3 as-is with placeholder `rationale: 'TBD (Unit 4)'` — the grid still works, just without the teaching text, so no half-broken state on origin. |
| Future `fontFamily` bundles conflict with the `COLOR_BUNDLES` name | Name is color-specific; typography bundles would live in a separate `TYPE_BUNDLES` object. No conflict. |

## Alternative Approaches Considered

- **Replace the legacy `colorPreset` select entirely.** Rejected: breaks any user who has muscle memory for the existing presets. A later sprint can prune once the bundles have established themselves.
- **Auto-apply the stored bundle on load.** Rejected: would clobber hand-edited HTML. The indicator shows provenance; application is a user action.
- **Slop-detector / "you've picked 4 high-saturation colours, try fewer" nag.** Rejected in brainstorm (positive framing only; nags piss users off).
- **Ship all 7 bundles in a JSON file (`assets/color-bundles.json`) loaded at runtime.** Rejected: adds a network request (violates Trust & Safety invariant), and the total data is < 1KB — inline is both simpler and faster.
- **Make bundles multi-accent (bg/ink/accent-1/accent-2).** Rejected: contradicts the core principle ("one accent") the bundles teach. If a bundle needs two accents, the principle is wrong for that bundle.

## Sources & References

### Origin

- **Origin document:** [docs/brainstorms/2026-04-15-anti-slop-color-bundles-requirements.md](../brainstorms/2026-04-15-anti-slop-color-bundles-requirements.md) — key decisions carried forward verbatim:
  - 7 bundles, all 7 ship including Memo (brainstorm Q2).
  - Inline rationale next to each bundle, no separate page (brainstorm Q1).
  - Every bundle uses exactly one accent; the single-accent principle is the meta-lesson.
  - Bundles augment, don't replace, individual pickers.
  - No typography in this feature (separate future sprint).
  - WCAG-AA body-text contrast is a hard gate.

### Internal References

- Mega-eval §3 strengths and §Phase 1A hater Lens 2 — ICP/taste gap motivation.
- Launch essay `/why-i-built-this.html` §5 — "Craft and agency vs. vibe coding" thesis backing this feature.
- `editor.html:4462-4482` — existing `colorPreset` select (17 legacy presets). The new bundle grid lands above this.
- `editor.html:4517-4540` — "3. Pick Your Colors" section markup. Insertion point for the bundle grid.
- `editor.html:5093-5115` — `state` object defaults. Bundle apply mutates `bgColor`, `textColor`, `accentColor`, `linkColor` only.
- `editor.html:6111`, `6137` — `safeLocalStorageGet/Set` wrappers. Used for the bundle-id persistence (R7).
- `editor.html:6692-6773` — template literal substitution that uses `s.bgColor`, `s.textColor`, etc. This is downstream of the state write; the bundle feature doesn't touch this, just relies on it.
- `editor.html:7229` `stateToPanel`, `7242` `stateToCode`, `7252` `codeToPreview` — the chain invoked once per bundle-apply.
- `docs/plans/2026-04-15-001-feat-launch-ready-sprint-plan.md` Unit 3 — the per-challenge progress badge. Same "paint on event" pattern; mirror it.

### External References

- WCAG 2.1 Luminance & contrast formula: <https://www.w3.org/TR/WCAG21/#dfn-relative-luminance>. Used to pre-audit all 7 bundles in this plan.
- Color-accessibility guidance: <https://webaim.org/articles/contrast/>. Threshold language matches R4 in the origin.

## Sprint-Opening Actions (for `/ce:work`)

1. No blocking user input on Units 1–3. They can ship consecutively without pausing.
2. Run the Trust & Safety smoke-test pattern (curl all key URLs, grep for regressions) after Unit 2 (UI visible) and again after Unit 3 (persistence wired up).
3. **Unit 4 IS the pause point.** Do not auto-commit copy; ask the maintainer to pick one candidate per bundle + the intro-sentence candidate before merging.
4. Bundle the version bump (`VERSION` → 2.13.0, `sw.js` cache → `bws-v2.13.0`, `CHANGELOG.md` entry) with Unit 4's commit — that's the user-facing-complete moment.
5. Do NOT push between commits; push once the full 4-commit stack has been smoke-tested locally.
