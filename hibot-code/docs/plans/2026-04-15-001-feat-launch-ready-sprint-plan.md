---
title: "feat: Launch-Ready Sprint (repo hygiene, LICENSE, hero, /challenges/)"
type: feat
status: completed
date: 2026-04-15
origin: docs/brainstorms/2026-04-15-launch-ready-sprint-requirements.md
---

# Launch-Ready Sprint

Static-site hygiene and launch-fit work gating the Phase 3 content-outline launch essay (`sessions/mega-eval-2026-04-14/05-content-strategy-outline.md`). Five requirements, four atomic commits, non-breaking. Sprint ordering matters: later units depend on earlier ones.

## Overview

Yesterday's Trust & Safety sprint (`docs/brainstorms/2026-04-14-trust-and-safety-sprint-requirements.md`, shipped at `0d885c6` → `1491a24` on `main`) closed the privacy/security/compliance/version gaps. This sprint closes the remaining four gates the content outline (doc 05) names before the maintainer can credibly publish the adult-self-learner launch essay:

1. Repo reads "product," not "abandoned hobby project" (Fix 5 — repo cruft).
2. License is unambiguous (Fix 6 — `LICENSE` file, MIT).
3. Landing hero talks to the adult self-learner ICP (doc 04 §Design).
4. `/challenges/` exists as a real destination for the essay's single-action CTA (doc 04 §Next-Step #6).

All decisions carried forward from the brainstorm (see origin). Exact hero copy is the only item planning hands back to the user for sign-off before commit.

## Problem Statement / Motivation

- **Public surface mismatches the ICP.** `index.html`'s hero says "Type code. See it live. Ship it." with a subhead naming "frameworks, accounts, webpack." The ICP — adult career-curious self-learners who bounced off VS Code — doesn't have that vocabulary yet. See mega-eval hater Lens 9 (`sessions/mega-eval-2026-04-14/01-hater-mode-feedback.md`), Lens 2, and strengths-doc ICP ranking (`sessions/mega-eval-2026-04-14/03-strengths-opportunities.md` §Ideal Use Cases).
- **Five challenges are hidden inside a dropdown.** They exist (`editor.html:13727` `challenges` object — challenge1…challenge5 + 3 capstones) but have no crawlable URLs, no progress UI, and no "path" framing. This is both an SEO miss (5–30 potential indexable pages per doc 03 §Growth Opportunity #4) and a completion-hostile UX (doc 03 §Success Conditions: "the current 'five challenges hidden in the editor' framing is completion-hostile").
- **41 of 49 root `*.md` files are dev artifacts.** `FIX_*`, `TEST_REPORT_v*`, `DEPLOY_v*`, etc. Grep confirms no live HTML/JS/XML/JSON links them (planning verification below). They're visible-only on GitHub, and they cost trust with educators/parents/procurement (see hater Lens 4, Lens 10).
- **"MIT-ish" in README blocks FOSS-org and school-district partnerships.** Explicit blocker for the doc 04 strategic move "one partnership."

## Proposed Solution

Four atomic commits on `main`, landed in this order:

1. **`chore(docs):`** Add proper `LICENSE` (MIT, Expat form); replace "MIT-ish" prose.
2. **`chore(docs):`** Move 41 dev-artifact `*.md` files into `docs/archive/`; add `CONTRIBUTING.md` at root.
3. **`feat(editor):`** Track per-core-challenge completion in localStorage (unblocks R5).
4. **`feat(site):`** Ship `/challenges/` hub + 5 per-challenge pages + progress indicator + nav entry.
5. **`style(landing):`** Rewrite `index.html` hero, subhead, stats strip, and CTA to target the adult self-learner ICP (depends on `/challenges/colors.html` existing).

(Commits 3–5 could collapse to fewer, but keeping them atomic preserves the discipline from the Trust & Safety sprint and makes revert granular.)

## Technical Approach

### Architecture

Static site, no build step. All changes are hand-edited HTML/CSS/JS plus file moves. Typography and color tokens established by the Trust & Safety sprint are the design system — no new CSS language. The existing `preview.srcdoc` pattern and sandboxed iframe from R2 are not touched. No new dependencies; no Vercel-specific moves (deploys via GitHub Actions to GitHub Pages per `.github/workflows/deploy.yml`).

### Implementation Units

Each unit has Goal, Files, Approach, Patterns, Verification, and an Execution note where posture matters.

---

#### Unit 1 — `LICENSE` + "MIT-ish" removal (R2)

- **Goal:** Ship a verbatim MIT (Expat form) `LICENSE` at repo root. Remove every "MIT-ish" reference from the repo's live prose and point to `LICENSE` instead.
- **Files:** `LICENSE` (new), `README.md` (grep + edit), `sessions/*` and `docs/*` are *not* live prose (do not touch — they're historical artifacts). Check also `INDEX.md` and any other user-facing doc that ships with the site.
- **Approach:**
  1. Write `LICENSE` with canonical MIT text, year 2025–2026 range, copyright holder "code.hibot.space contributors" (matches README's collaborative framing; avoids assigning sole personal ownership).
  2. `grep -rn "MIT-ish\|MIT ish\|MIT (ish)" -- . :^docs/archive/ :^sessions/ :^node_modules/` — edit each live match to read `MIT (see [LICENSE](LICENSE))`.
  3. If README has a `## License` section, point it to `LICENSE`.
- **Patterns to follow:** none in-repo; follow https://opensource.org/licenses/MIT Expat text verbatim.
- **Verification:**
  - `LICENSE` file exists; `head -1 LICENSE` contains "MIT License".
  - `grep -rn "MIT-ish" -- . :^docs/archive/ :^sessions/ :^node_modules/ 2>/dev/null` returns zero matches.
- **Execution note:** trivial; no test-first.

---

#### Unit 2 — Archive 41 dev-artifact markdown files + add `CONTRIBUTING.md` (R1, R1a)

- **Goal:** Root `*.md` count goes from 49 → ≤9. `docs/archive/` holds the moved files. Root gains `CONTRIBUTING.md`.
- **Files:**
  - **Move to `docs/archive/`** (41 files; pattern enumerated in brainstorm §R1 and confirmed by grep in planning): `FIX_*.md`, `TEST_*.md` (except `TEST_RESULTS.md` pattern — see list), `DEPLOY_v*.md`, `USABILITY_*.md`, `IMPLEMENTATION_*.md`, `COMPLETION_REPORT.md`, `SYNC_STATUS_REPORT.md`, `MOBILE_*.md`, `CLICKABILITY_FIX_*.md`, `EMOJI_CHARACTER_FIX_*.md`, `CURSOR_FIX_*.md`, `BUTTON_ENHANCEMENTS_*.md`, `SAFETY_IMPLEMENTATION_PLAN.md`, `CACHE_BUSTING.md`, `TEMPLATE_ENHANCEMENTS.md`, `INTEGRATION_SUCCESS.md`, `DEPLOYMENT_READY.md`, `FINAL_*.md`, `COMPREHENSIVE_*.md`, `QUICK_*.md` (QUICK_REFERENCE, QUICK_START_GUIDE, QUICK_SUMMARY), `NEW_FEATURES.md`, `FEATURE_ADDITIONS.js` (keep — it's live content, do NOT move), `README_NEW_FEATURES.md`, `TESTING_REPORT.md`, `VIBESHARE_*.md`, `VISUAL_SUMMARY.md`, `WORLD_CLASS_ROADMAP.md`, `FIXES_APPLIED.md`, `MANUAL_TEST_CHECKLIST.md`, `PROJECT_SUMMARY.md`, `TEST_RESULTS.md`, `TEST_REPORT_v*.md`, `USER_GRIPE_FIXES.md`.
  - **Keep at root** (9 files): `README.md`, `CHANGELOG.md`, `LICENSE` (just shipped), `CONTRIBUTING.md` (new this unit), `DEPLOYMENT.md`, `QUICKSTART.md`, `INDEX.md`, `FEATURES.md`, `AI_BUILD_DEPLOY_GUIDE.md`.
  - **New:** `docs/archive/README.md` (≤15 lines) — explains what this folder is and that files were moved 2026-04-15.
  - **New:** `CONTRIBUTING.md` (root, ≤60 lines).
- **Approach:**
  1. `git mv` each file into `docs/archive/` (preserves history; do not `rm && cp`).
  2. Write `docs/archive/README.md` with a one-line description and the move date.
  3. Write root `CONTRIBUTING.md` — sections:
     - *Running locally* — `python3 -m http.server 8000` then open `localhost:8000`.
     - *Editing a page* — HTML files are self-contained; edit in place; preview via the local server.
     - *Where docs live* — root is for user-facing docs; `docs/brainstorms/` for requirements; `docs/plans/` for implementation plans; `docs/archive/` for historical dev notes.
     - *Adding to the showcase* — link to the existing showcase PR flow.
     - *Running the tiny build* — `npm run build` to rebuild `codemirror-bundle.js` when editor bundle input changes.
  4. `grep -rEn "\\b(FIX_|TEST_REPORT|DEPLOY_v|USABILITY_|IMPLEMENTATION_COMPLETE|IMPLEMENTATION_PLAN|COMPLETION_REPORT|…)" --include=\*.html --include=\*.js --include=\*.xml --include=\*.json` — planning already ran this: **zero live references.** Re-run post-move as a check.
- **Patterns to follow:** None. This is pure file reorg.
- **Verification:**
  - `ls *.md | wc -l` returns `9`.
  - `ls docs/archive/*.md | wc -l` returns `41` (or matches post-move count ±1 for `docs/archive/README.md`).
  - `git log --follow docs/archive/FIX_MOBILE_CLICKABILITY_FIX_v2.1.2.md` (or any moved file) shows continuous history through the move.
  - Re-running the live-link grep returns zero live matches.
- **Execution note:** Mechanical; no test-first.

---

#### Unit 3 — Per-core-challenge completion tracking (foundational for R5)

- **Goal:** When the user completes challenge1…challenge5 via the editor's validator, persist that outcome to a single localStorage key readable by `/challenges/` pages.
- **Files:** `editor.html` only (one small addition near line 13813 where `challenge.check()` already fires).
- **Approach:**
  1. Add a tiny helper in the editor's main script block:
     ```js
     // editor.html (near the existing `challenges` object)
     function markCoreChallengeComplete(id) {
       if (!/^challenge[1-5]$/.test(id)) return; // capstones excluded
       const raw = safeLocalStorageGet('completedCoreChallenges', '[]');
       let set;
       try { set = new Set(JSON.parse(raw)); } catch (e) { set = new Set(); }
       if (set.has(id)) return;
       set.add(id);
       safeLocalStorageSet('completedCoreChallenges', JSON.stringify([...set]));
     }
     ```
  2. At the existing `if(challenge.check()){ … }` block (line 13813), when the check passes, call `markCoreChallengeComplete(challengeSelect.value)`. Do this *before* any existing achievement-popup triggers so the popup copy can later read the new state if it wants.
  3. Keep the existing `challenge-complete` achievement intact — this unit is additive, not a replacement.
  4. Document the new key in `CONTRIBUTING.md` under "localStorage keys the editor writes" (optional, ≤5 lines).
- **Patterns to follow:** `safeLocalStorageGet` / `safeLocalStorageSet` at `editor.html:6111` and `6137` — existing quota-safe wrappers; use these, not raw `localStorage`.
- **Verification:**
  - Manually: open editor, pick Challenge 1, change a color, confirm `localStorage.getItem('completedCoreChallenges')` → `'["challenge1"]'`. Repeat for Challenge 3 → `'["challenge1","challenge3"]'`. Order doesn't matter (Set semantics); de-dup works.
  - Edge: pick a capstone challenge and complete it; `completedCoreChallenges` should NOT change.
  - Edge: corrupt the JSON manually (`localStorage.setItem('completedCoreChallenges', 'not-json')`) then complete a challenge — should not throw; should reset to a valid array.
- **Execution note:** Small enough to skip test-first; verify in DevTools after the edit.

---

#### Unit 4 — `/challenges/` hub, 5 per-challenge pages, progress indicator, nav integration (R4, R5 readers)

- **Goal:** Six new crawlable HTML pages, progress indicator visible on all six + inside editor, nav link promoted to top-level.
- **Files:**
  - **New directory:** `challenges/` (at repo root, sibling of `editor.html`).
  - **New pages (6):** `challenges/index.html`, `challenges/colors.html`, `challenges/button.html`, `challenges/card.html`, `challenges/hover.html`, `challenges/responsive.html`.
  - **Edits:**
    - `index.html` (nav only — hero update is Unit 5).
    - `editor.html`, `learn.html`, `showcase.html`, `glossary.html`, any other page with the `.site-nav` block — add "Challenges" as a top-level nav link.
    - `editor.html` — add a small progress badge near the existing challenge hint strip (`challengeHint` referenced at line 13803).
    - `sw.js` — add the 6 new pages to `CORE_ASSETS`; bump `CACHE_NAME` → `bws-v2.11.0`; bump `VERSION` → `2.11.0`.
    - `sitemap.xml` — add the 6 URLs with today's `<lastmod>`.
- **Approach:**

  1. **Hub page (`challenges/index.html`):**
     - Reuse the exact nav, font link (`/assets/fonts/fonts.css`), JSON-LD frame, and CSS tokens from `learn.html` / `index.html`. Do NOT introduce new design language.
     - Page structure:
       ```
       <nav/> (shared)
       <header class="hero"> title, one-sentence dek, progress pill </header>
       <main> 5 challenge cards (one per core challenge) </main>
       <section class="bonus"> 3 capstone links → editor deep-link </section>
       <footer/> (shared)
       ```
     - Each card renders:
       - Challenge number + title (from `editor.html`'s `challenges` object — mirror manually, not loaded at runtime).
       - 1-sentence objective (plain-English rewrite of the existing `hint` fields — those use `<b>` and `<code>` HTML; sanitize for the card and save the rich version for the per-challenge page).
       - "Complete" checkmark if done (read `completedCoreChallenges` on page load).
       - "Start" button linking to `/challenges/<slug>.html`.
     - Progress pill: small inline JS reads `completedCoreChallenges`, computes `N of 5`, renders in `.hero-progress`. No analytics, no phone-home. Fallback text before JS runs: "Start the first challenge ↓".

  2. **Per-challenge pages (`challenges/<slug>.html`):** Slug map:
     - `challenge1` → `colors.html`
     - `challenge2` → `button.html`
     - `challenge3` → `card.html`
     - `challenge4` → `hover.html`
     - `challenge5` → `responsive.html`
     - Page sections (each page):
       - Shared nav (with "Challenges" top-level).
       - Progress pill (same JS as hub).
       - H1: "Challenge N: <title>".
       - Objective: 2–3 sentence plain-English goal (the brainstorm allows ≤120 words). Derived manually from the hint.
       - "What 'done' looks like" — 1–2 sentences on what the check looks for (translated from each challenge's `check()` fn — e.g., "Colors: you change at least one of background, text, or accent from the defaults").
       - "Starter snippet" — 3–8 lines of HTML/CSS lifted from the existing challenge hint or a minimal example. Wrap in `<pre><code>` with no syntax highlighting (avoids introducing any JS library).
       - Primary CTA: big `Open in editor →` button linking to `/editor.html?challenge=<id>`.
       - Secondary CTA: "Back to all challenges →" → `/challenges/index.html`.
       - Footer (shared).
     - Per-challenge page content mirrors the rich `hint` field's guidance but is rewritten for a standalone reader. It does NOT simply copy `hint` HTML (the hint is written for the in-editor tooltip; the landing page needs a different voice).

  3. **Progress indicator in the editor:**
     - In `editor.html`, near the challenge hint strip (`challengeHint`, ~line 13803 area), add a small badge element like:
       ```html
       <span id="challengeProgressBadge" aria-live="polite"></span>
       ```
     - Add JS that runs on challenge select AND on `markCoreChallengeComplete` — reads `completedCoreChallenges`, renders "N of 5 complete" or similar. Hide the badge when no core challenge is selected.
     - Style matches existing `.badge` or hint UI — reuse tokens; no new color variables.

  4. **Nav promotion:** Add `<a href="/challenges/">Challenges</a>` between the existing "Learn" and the "Showcase" link. Consistency across ALL pages with the site nav (currently 8+ pages). Planning proposes a single `sed`-compatible edit across files since the nav markup is duplicated page-by-page — but the Implementer verifies each file's nav is textually identical before blind-replacing.

  5. **Service worker + sitemap:**
     - `sw.js` — append `'/challenges/'`, `'/challenges/index.html'`, `'/challenges/colors.html'`, `'/challenges/button.html'`, `'/challenges/card.html'`, `'/challenges/hover.html'`, `'/challenges/responsive.html'` to `CORE_ASSETS`. Bump `CACHE_NAME` to `'bws-v2.11.0'`.
     - `VERSION` → `2.11.0`.
     - `sitemap.xml` — six new `<url>` blocks with `<lastmod>2026-04-15</lastmod>`, `<changefreq>monthly</changefreq>`, `<priority>0.8</priority>` (matching the existing pattern the sitemap uses — verify by reading `sitemap.xml` in-flight).
     - `CHANGELOG.md` — add a `## Version 2.11.0 — Launch-Ready Sprint (April 2026)` entry summarizing hero rewrite + /challenges/ + LICENSE + archive.

- **Patterns to follow:**
  - Nav markup, CSS tokens, typography, JSON-LD: clone from `learn.html` (the existing "landing-for-content" template in the repo).
  - Card styles: match `index.html`'s `.path-card` on the landing page (or `.feature` block). Do not invent a new component.
  - JSON-LD: `{"@context":"https://schema.org","@type":"Course","name":"…","description":"…"}` for the hub; `{"@type":"LearningResource"}` or `{"@type":"HowTo"}` per challenge page — decide at implementation time based on what renders best for each.
  - `<meta name="description">` and OG/Twitter cards: match the `learn.html` shape.

- **Verification:**
  - Every URL in the set returns 200 from a local `python3 -m http.server`: `/`, `/challenges/`, `/challenges/index.html`, `/challenges/colors.html`, `/challenges/button.html`, `/challenges/card.html`, `/challenges/hover.html`, `/challenges/responsive.html`.
  - Clicking "Open in editor" on `/challenges/colors.html` loads `editor.html?challenge=challenge1` and the editor shows the Challenge 1 hint within a second.
  - Completing Challenge 1 updates the `completedCoreChallenges` localStorage key AND bumps the editor badge to "1 of 5" immediately. Refreshing `/challenges/` shows "1 of 5" and the Challenge 1 card has a completion marker.
  - Completing Challenge 2 through Challenge 5 (or manually seeding `completedCoreChallenges`) bumps the counter appropriately.
  - Nav has "Challenges" top-level on every site page that currently carries `.site-nav`. "Challenges" link is active (`aria-current="page"` style or equivalent) when on any `/challenges/*` URL.
  - `sw.js` cache key is `bws-v2.11.0`; `VERSION` says `2.11.0`.
  - `sitemap.xml` includes 6 new URLs.
  - `grep -c 'fonts\.(googleapis|gstatic)\.com'` across the 6 new pages → 0 (Trust & Safety sprint invariant preserved).
  - The 6 new pages set `sandbox=` on any iframe they embed (only `/editor.html` embeds one; the challenge pages don't) — N/A here.

- **Execution note:** Largest unit. Characterization-first for the editor badge: before modifying `editor.html`, manually verify the existing challenge-select flow still works after the change by picking each of the 5 challenges and seeing hints render. Test-first is not warranted for the landing pages themselves (they're static HTML); a post-implementation smoke test via `curl` suffices (modeled after the Trust & Safety sprint's smoke test).

---

#### Unit 5 — Hero rewrite on `index.html` (R3)

- **Goal:** The landing hero, subhead, stats strip, and primary CTA speak to the adult self-learner ICP and point the primary funnel at `/challenges/colors.html`.
- **Files:** `index.html` only.
- **Approach:** Ship ONE of the three candidates below. Planning recommends **Candidate A** as the safe default but requires user sign-off before commit.

  **Hero copy candidates:**

  ### Candidate A — "See it render" (Recommended)

  ```html
  <div class="hero-badge">Free forever. No sign-up. No install.</div>
  <h1>Type HTML. Watch it <span>render</span>.</h1>
  <p>A browser-only HTML, CSS, and JavaScript editor for people who want to learn by doing — not by installing a toolchain first. Five short challenges take you from your first tag to your first responsive page.</p>
  <div class="hero-cta">
    <a href="/challenges/colors.html" class="btn btn-primary">Start the first challenge →</a>
    <a href="/editor.html" class="btn btn-ghost">Or open a blank editor</a>
  </div>
  ```
  Stats strip: `Free forever · No sign-up · 5 starter challenges` (drop "8+ export platforms").

  **Why A:** Closest to the current tone, minimal risk of voice whiplash. Keeps the two-word verb pattern from "Ship it" but swaps the masculine-coded "Ship" for the concrete "Render." Subhead names the toolchain objection head-on, lands the "learn by doing" value, then sells the challenge path.

  ### Candidate B — "Toolchain is the barrier" (Thesis-forward)

  ```html
  <div class="hero-badge">No VS Code. No terminal. No install.</div>
  <h1>The reason HTML feels hard is the <span>toolchain</span>. Skip it.</h1>
  <p>This is the HTML editor I wish I'd had when I was stuck installing VS Code. Type code in one pane, watch it render in the next. Five guided challenges take you from blank page to your first responsive layout.</p>
  <div class="hero-cta">
    <a href="/challenges/colors.html" class="btn btn-primary">Start the first challenge →</a>
    <a href="/editor.html" class="btn btn-ghost">Open a blank editor</a>
  </div>
  ```
  Stats strip: `No install · No sign-up · Works offline`.

  **Why B:** Strongest alignment with the launch essay's thesis (doc 05 §4). Riskier — "I" voice assumes the maintainer wants a personal-authored hero. If the essay ships with Candidate B as the hero, the landing reads continuous with the essay.

  ### Candidate C — "Just try it" (Punchy)

  ```html
  <div class="hero-badge">Free · No sign-up · No install</div>
  <h1>HTML, rendered live in your browser.</h1>
  <p>Type a tag, see it appear. Change a color, watch it update. Five short challenges take you from <code>&lt;h1&gt;</code> to your first responsive page.</p>
  <div class="hero-cta">
    <a href="/challenges/colors.html" class="btn btn-primary">Start with colors →</a>
    <a href="/editor.html" class="btn btn-ghost">Open the editor</a>
  </div>
  ```
  Stats strip: `Free · No sign-up · Works offline` (three items, tightest version).

  **Why C:** Shortest, most concrete. Good for visitors who already know what they want. Uses an inline `<code>` tag in the subhead — signals "we show you real code here" without being intimidating. Weakest at the toolchain-skeptic reader.

- **Patterns to follow:** Existing `.hero`, `.hero-badge`, `.hero-cta`, `.btn`, `.stats`, `.stat` classes in `index.html`'s `<style>` block. No new CSS.
- **Verification:**
  - `grep -E 'Ship it|webpack|No frameworks\. No accounts' index.html` returns zero matches.
  - Primary CTA anchor equals `/challenges/colors.html` and renders above the fold on common viewports (desktop and mobile screenshot).
  - Stats strip has either 3 tiles (Candidate B/C) or 3 tiles total (Candidate A drops the 8+ platforms tile — so always 3, not 4).
  - Local smoke test: `curl -s http://localhost:8765/ | grep -c 'Ship it'` → 0.
- **Execution note:** Ship ONLY after user picks a candidate (blocking checkpoint). Do not let `ce:work` blind-commit a candidate.

---

### Implementation Order & Commit Plan

| # | Commit | Unit | Depends on |
|---|--------|------|------------|
| 1 | `chore(docs): add MIT LICENSE and drop "MIT-ish" prose` | Unit 1 | — |
| 2 | `chore(repo): archive 41 dev-artifact notes to docs/archive; add CONTRIBUTING.md` | Unit 2 | — |
| 3 | `feat(editor): track per-core-challenge completion in localStorage` | Unit 3 | — |
| 4 | `feat(site): ship /challenges/ hub, 5 per-challenge pages, progress indicator, nav link (v2.11.0)` | Unit 4 | Unit 3 |
| 5 | `style(landing): rewrite index.html hero for the adult self-learner ICP` | Unit 5 | Unit 4 (CTA dest) + user sign-off on candidate |

Unit 1–3 can land without prior sign-off (non-breaking, scope-settled). Unit 4 is the big commit and should be verified with the Trust & Safety-style local smoke test before push. Unit 5 is paused for user input. After all five: push to `main`, deploy fires via GitHub Actions.

## System-Wide Impact

- **Interaction graph:** Unit 3's `markCoreChallengeComplete` fires inside the existing challenge validator callback at `editor.html:13813`. The validator fires on `codeToPreview()` ticks and on manual "Run Code" — both debounced. The new helper is idempotent (Set semantics) so re-firing on the same challenge does not duplicate state. It writes through `safeLocalStorageSet` which already handles QuotaExceededError. No new event propagation.
- **Error propagation:** `safeLocalStorageGet`/`Set` already swallow storage errors and show toasts. The new JSON parse in `markCoreChallengeComplete` handles corrupted state with a reset (see verification above). The `/challenges/` pages' progress-reader JS must also tolerate bad state (fallback to "0 of 5") — called out in Unit 4 approach.
- **State lifecycle risks:** Only risk: if the user clears localStorage, completion resets. This is the user's expected behavior for a no-account privacy-first tool. No orphaned state possible — single key, atomic writes.
- **API surface parity:** The editor's existing `loadChallenge` localStorage key (used by external pages to deep-link challenges — `editor.html:14899`) is unchanged. The new `completedCoreChallenges` key is read-only from `/challenges/` pages and write-only from `editor.html`; no conflict.
- **Integration test scenarios:** (a) complete challenge1 in editor → refresh `/challenges/` → hub shows 1 of 5 + Challenge 1 marked done. (b) open `/challenges/button.html` → click "Open in editor" → editor loads Challenge 2 with hint visible. (c) navigate to `/challenges/` with empty localStorage → counter reads 0 of 5, no errors. (d) manually corrupt `completedCoreChallenges` → complete a challenge → state resets cleanly.

## Acceptance Criteria

Mirrors the brainstorm's Success Criteria (see origin: `docs/brainstorms/2026-04-15-launch-ready-sprint-requirements.md`) plus planning-derived additions:

### Functional
- [ ] `LICENSE` file exists at repo root (MIT Expat form).
- [ ] `grep -rn "MIT-ish"` across live (non-archive, non-session) paths returns 0 matches.
- [ ] `ls *.md | wc -l` at repo root equals 9 (the whitelist).
- [ ] `docs/archive/` contains the 41 moved files, `docs/archive/README.md` explains the folder.
- [ ] `CONTRIBUTING.md` at repo root, ≤60 lines, covers run-local / edit-page / docs-layout / showcase-submit / build-bundle.
- [ ] `/challenges/` (hub) and each of the 5 per-challenge URLs return 200 and render correct title + CTA.
- [ ] Clicking any per-challenge "Open in editor" loads the editor with the right challenge active (hint visible).
- [ ] Completing challenge1 updates `localStorage['completedCoreChallenges']` to include `"challenge1"` and the editor badge updates to "1 of 5" immediately.
- [ ] Reloading `/challenges/` after completing challenges shows the updated "N of 5" and per-card completion markers.
- [ ] `index.html` hero contains neither "Ship it" nor "webpack"; primary CTA points to `/challenges/colors.html`.
- [ ] `sw.js` cache key is `bws-v2.11.0`; `VERSION` file says `2.11.0`; `CHANGELOG.md` has a new 2.11.0 entry.
- [ ] `sitemap.xml` contains the 6 new URLs.
- [ ] `/challenges/` pages have no Google Fonts / external-tracker references (Trust & Safety invariant holds).

### Non-Functional
- [ ] No new runtime dependencies. `package.json` `devDependencies` unchanged.
- [ ] No new CSS files or design tokens introduced on the new pages — they use `assets/fonts/fonts.css` + inlined CSS matching existing pages.
- [ ] PWA offline works for the 6 new pages (they're in `CORE_ASSETS`).
- [ ] Mobile layout: 6 new pages render without horizontal scroll at 360px wide (verified with `agent-browser` or equivalent).

### Quality Gates
- [ ] Trust & Safety-style smoke test passes (local server + curl each URL + grep for invariants). Script modeled on the one used in `1491a24` sprint.
- [ ] Each of the 5 commits builds cleanly on its own (`git checkout <sha>` → `python3 -m http.server` → key URLs return 200).

## Success Metrics

- Every gate the launch-essay checklist (`sessions/mega-eval-2026-04-14/05-content-strategy-outline.md` §4 Writer's Note) names is cleared: self-hosted fonts (Trust & Safety), `/challenges/` index exists, age-12 page has COPPA notice (Trust & Safety).
- Post-deploy: each of the 6 new URLs is indexable by Google (404 check in GSC / sitemap resubmission).
- Leading indicator (local only): `completedCoreChallenges` localStorage key appears on the maintainer's own browser after a dogfood pass through the 5 challenges.

## Dependencies & Risks

| Risk | Mitigation |
|------|------------|
| Hero copy rejected → Unit 5 re-work | Unit 5 is the LAST commit; cheap to iterate. Pause for sign-off before committing. |
| Challenge-check validator doesn't always fire on debounced `codeToPreview` | Verify manually before shipping Unit 3 by completing a challenge and confirming the achievement popup fires (existing behavior); `markCoreChallengeComplete` sits in the same branch. |
| Moving `PROJECT_SUMMARY.md` breaks an external link | `docs/archive/PROJECT_SUMMARY.md` still resolves via git history; any external link would already be dead for other reasons. Acceptable risk. |
| User clears localStorage → progress resets | Expected behavior for a zero-account tool. Documented in `CONTRIBUTING.md` under "localStorage keys." |
| `capstone-*` challenges still fire `challenge-complete` achievement but NOT `completedCoreChallenges` | By design (brainstorm §R4 "capstones as bonus"). Documented in Unit 3 approach. |
| Cross-page nav change introduces drift | Verify each page's `.site-nav` is textually identical before blind-replacing; fallback to per-file edits if not. |

## Alternative Approaches Considered

- **Inline the new challenges pages into the existing `learn.html`** instead of a new `/challenges/` directory. Rejected: SEO surface is one URL instead of 6; can't link the launch essay's CTA at a challenge-specific page; hub/card UX doesn't naturally live inside a linear "Learn" page.
- **Move the per-challenge page copy to JSON data loaded at runtime** rather than hand-written HTML. Rejected: zero-dep, zero-build site; introducing a client-side data-fetch + render pattern is scope creep and cache-unfriendly for the PWA.
- **Use the existing `achievements.challenge-complete` flag as the progress source** (skip Unit 3 entirely). Rejected: it's a boolean "did ANY challenge, ever"; can't drive a per-challenge UI. The 5-line Unit 3 addition is far cheaper than refactoring the existing achievement system.
- **Write a tiny Node script (`scripts/sync-version.js`) that bumps `VERSION` + `sw.js` + `CHANGELOG.md` together.** Deferred to a later sprint — manual sync worked fine in Trust & Safety; the 30-line script is nice-to-have, not load-bearing yet.

## Sources & References

### Origin
- **Origin document:** [docs/brainstorms/2026-04-15-launch-ready-sprint-requirements.md](../brainstorms/2026-04-15-launch-ready-sprint-requirements.md) — carries these decisions forward:
  - License is plain MIT (Expat form).
  - Archive (not delete) dev-artifact `.md` files; they move to `docs/archive/`.
  - `/challenges/` ships 1 hub + 5 per-challenge pages in v1; capstones defer.
  - Progress state reads the editor's existing localStorage, not a new store — **amended during planning** to add `completedCoreChallenges` since no per-challenge completion key exists today.
  - Hero copy direction settled in origin (adult self-learner ICP, drop "Ship it"/"webpack"); exact wording is a planning-drafted candidate with user sign-off before commit.

### Internal References
- Mega-eval executive summary: `sessions/mega-eval-2026-04-14/00-executive-summary.md`
- Mega-eval critical-fixes doc: `sessions/mega-eval-2026-04-14/04-critical-fixes-and-design.md` — see §Design and §Medium-Term.
- Strengths / ICP ranking: `sessions/mega-eval-2026-04-14/03-strengths-opportunities.md` §Ideal Use Cases.
- Launch-essay outline: `sessions/mega-eval-2026-04-14/05-content-strategy-outline.md` — §4 Writer's Note names the pre-publication gates this sprint closes.
- Trust & Safety sprint requirements: `docs/brainstorms/2026-04-14-trust-and-safety-sprint-requirements.md`.
- Code references:
  - `editor.html:13727` — `challenges` object (source of truth for the 5 core + 3 capstone definitions).
  - `editor.html:13813` — validator fires `challenge.check()`; insertion point for Unit 3.
  - `editor.html:14898-14910` — `?challenge=` URL-param handler (no new editor code needed for deep-linking).
  - `editor.html:6111`, `editor.html:6137` — `safeLocalStorageSet/Get` wrappers to use in Unit 3.
  - `editor.html:12863` — existing `achievements` object (unchanged this sprint).
  - `index.html:245-268` — `.site-nav` markup (insertion point for "Challenges" nav link; verify parity across other pages).
  - `sw.js` — `CACHE_NAME` + `CORE_ASSETS`; bump + append for Unit 4.
  - `sitemap.xml` — pattern for new URL entries.
  - `.github/workflows/deploy.yml` — GitHub Pages deploy on push to `main` (confirms no Vercel-specific moves needed).

### External References
- [MIT License text](https://opensource.org/licenses/MIT) — Expat form.
- [Schema.org Course](https://schema.org/Course) / [LearningResource](https://schema.org/LearningResource) — options for per-challenge page JSON-LD.
- [web.dev — font-display: swap](https://web.dev/font-display/) — already applied by Trust & Safety sprint; no new work here.

## Sprint-Opening Actions (for `/ce:work`)

1. **Blocking user input:** which hero candidate (A / B / C)? If the user is mid-essay-drafting, recommend **Candidate B** (reads continuous with the essay); otherwise **Candidate A**.
2. Start on `main`. No feature branch — per user's global preferences + Trust & Safety sprint precedent.
3. Run the Trust & Safety smoke-test script pattern after Unit 4 and again after Unit 5 before pushing.
4. Do NOT push between commits; push once the full 5-commit stack has been smoke-tested locally.
