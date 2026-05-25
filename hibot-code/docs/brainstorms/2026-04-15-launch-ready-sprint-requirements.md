---
date: 2026-04-15
topic: launch-ready-sprint
---

# Launch-Ready Sprint

## Problem Frame

The Trust & Safety sprint (`2026-04-14-trust-and-safety-sprint-requirements.md`, shipped yesterday) closed the flagship privacy contradiction, the iframe security hole, the COPPA deadline, and the version drift. The mega-eval's Phase 3 content outline (`sessions/mega-eval-2026-04-14/05-content-strategy-outline.md`) names the launch essay the maintainer should write for the adult self-learner ICP — but explicitly gates publishing it on three further changes:

1. Repo hygiene (Fix 5) — ~41 of 49 root-level markdown files (`FIX_*`, `TEST_*`, `DEPLOY_v*`, `USABILITY_*`, `IMPLEMENTATION_*`, `COMPLETION_*`, `SYNC_*`, `MOBILE_*`, `BUTTON_*`, `SAFETY_*`, `CACHE_*`, `TEMPLATE_*`, `INTEGRATION_*`, `FINAL_*`, `COMPREHENSIVE_*`, `QUICK_*`, `NEW_FEATURES*`, `FEATURE_*`, `README_NEW*`, `TESTING_*`, `VIBESHARE_*`, `VISUAL_*`, `WORLD_*`, `FIXES_*`, `MANUAL_*`, `PROJECT_*`) are development artifacts that read "abandoned hobby project" to any educator or parent skimming the repo.
2. Proper `LICENSE` file (Fix 6) — README currently says "MIT-ish." Ambiguous licensing blocks school-district procurement and FOSS-org partnerships.
3. Hero rewrite and `/challenges/` index page — the landing page currently funnels adult-ICP visitors into the editor with developer-facing jargon ("Ship it," "no webpack"), and the 5 core challenges live hidden behind a dropdown inside `editor.html` rather than at crawlable, shareable URLs. The launch essay's CTA is "open the first challenge" — that has no working destination today.

All four items are small, non-breaking, and share a theme: make the public-facing surface ready for the post-trust-sprint push.

## Requirements

- **R1. Archive development-artifact markdown files.** Move the development-artifact `*.md` files currently at the repo root (the 41 matching the prefixes listed in Problem Frame) into `docs/archive/`. Keep these at the root: `README.md`, `CHANGELOG.md`, `LICENSE` (added by R2), `CONTRIBUTING.md` (new, see R1a), `DEPLOYMENT.md`, `QUICKSTART.md`, `INDEX.md`, `FEATURES.md`, `AI_BUILD_DEPLOY_GUIDE.md` (the last two are user-facing content, not dev artifacts). No files deleted — this sprint is additive-by-move.
- **R1a. Add `CONTRIBUTING.md`** (root). ≤60 lines. Covers: how to run locally (`python3 -m http.server`), how to edit/add a page, where docs live now (`docs/archive/` for history, `docs/brainstorms/` for plans), how to submit a showcase entry (link to existing showcase PR flow).
- **R2. Ship a proper `LICENSE` file** (root). MIT text (Expat form). Replace "MIT-ish" prose in README and anywhere else it appears with a plain link to `LICENSE`. Everything that currently ships stays redistributable under the same spirit — this formalizes, not changes, the license.
- **R3. Hero rewrite on `index.html`.** Replace the current "Type code. See it live. Ship it." hero + subhead + hero-badge + stats strip with copy aimed at the adult self-learner who bounced off VS Code. Specifically:
  - Hero headline stays concrete and benefit-framed, not a verb chain. "Ship it" out.
  - Subhead must drop "No frameworks. No accounts. No webpack." and substitute beginner-accessible phrasing. "No sign-up, no downloads, no setup — type HTML in your browser and watch it render." is the approved direction; exact final copy is a planning-time draft.
  - Stats strip (`0 min setup / 100% free / 0 sign-ups / 8+ export platforms`) either drops the "8+ export platforms" tile (developer-speak) or replaces it with something the ICP cares about (e.g., "5 starter challenges").
  - Primary CTA redirects from "Open Editor" to "Start the first challenge" (linking to `/challenges/colors.html` — see R4). Editor remains the secondary CTA.
- **R4. Ship `/challenges/` index and per-challenge landing pages.** Six new crawlable pages covering the 5 core challenges (`challenge1` through `challenge5` in `editor.html`'s `challenges` object):
  - **`/challenges/index.html`** — hub. Lists the 5 core challenges as cards, shows progress ("2 of 5 complete" read from the editor's existing achievement localStorage keys), and links to each per-challenge page. Also mentions the 3 existing capstones (`capstone-portfolio`, `capstone-contact-form`, `capstone-card-grid`) as "bonus challenges" that link directly into `editor.html?challenge=capstone-*` without dedicated pages.
  - **`/challenges/colors.html`, `/challenges/button.html`, `/challenges/card.html`, `/challenges/hover.html`, `/challenges/responsive.html`** — one per core challenge. Each has: title, ≤120-word objective (derived from the existing `hint` field), what "complete" looks like, a small starter-code snippet (derived from the challenge's `check` logic), and a primary "Open in editor" button deep-linking to `editor.html?challenge=challengeN`.
  - Copy on all six pages addresses the adult self-learner directly — no "ship," no "webpack," no jargon the ICP hasn't opted into.
  - Each page joins the existing site nav (Resources flyout or a new "Challenges" top-level link — planning-time call), is added to `sitemap.xml`, and is included in `sw.js` CORE_ASSETS for offline use.
- **R5. Visible progress indicator.** A "1 of 5" / "2 of 5" / … badge visible in three places:
  - On `/challenges/index.html` as the hub's header.
  - At the top of each `/challenges/<slug>.html` landing page.
  - Inside `editor.html` when the user has opened any of the 5 core challenges via the URL param or dropdown — a small persistent badge near the challenge hint strip.
  - Progress is derived from existing localStorage data (the editor's achievement/completion tracking); no new storage keys unless planning finds the existing shape insufficient.

## Success Criteria

- `ls *.md` at the repo root returns no more than 9 files (README, CHANGELOG, LICENSE, CONTRIBUTING, DEPLOYMENT, QUICKSTART, INDEX, FEATURES, AI_BUILD_DEPLOY_GUIDE) — every archivable file relocated to `docs/archive/` (or an equivalent path picked during planning).
- `LICENSE` exists at repo root. README no longer contains the string "MIT-ish."
- `index.html`'s hero does not contain "Ship it" or "webpack." A plain HTML reader (the target ICP) can read the hero and subhead and understand what the tool is without prior web-dev vocabulary. A human skim by the maintainer confirms this before deploy.
- Visiting `/challenges/` returns 200 and shows a grid of 5 cards plus a bonus-challenges section.
- Each of the 5 per-challenge URLs returns 200 and has an "Open in editor" link that deep-links the editor into that challenge (tested by clicking each one; the editor opens with the challenge pre-selected and its hint displayed).
- Completing Challenge 1 via the editor updates the "1 of 5" indicator to "2 of 5" the next time `/challenges/` loads, without any account or sync — reading from localStorage.
- `sitemap.xml` includes the 6 new URLs. `sw.js`'s `CORE_ASSETS` includes them. Version bumps to 2.11.0 so the updated SW takes over.
- A smoke test like the Trust & Safety sprint's (local `python3 -m http.server`, curl each new page, grep for giveaway strings) passes.
- The launch essay draft in `sessions/mega-eval-2026-04-14/05-content-strategy-outline.md` can cite `/challenges/colors.html` as its CTA destination without hand-waving.

## Scope Boundaries

- **Not included:** new challenges, capstone landing pages, or any change to challenge validation logic. Doc 04's Medium-Term #13 (on-failure hint scaffolding) is explicitly a later sprint.
- **Not included:** light theme, accessibility contrast pass, in-preview console/error surface, axe-a11y hints. All tracked in doc 04 for a separate sprint.
- **Not included:** localization of the new `/challenges/` pages beyond English. Georgian/other-language stubs remain hidden from nav per the Trust & Safety decision.
- **Not included:** any rewrite of the Editor / Showcase landing pages. Only `index.html`'s hero block is in scope for R3.
- **Not included:** any new analytics — the site stays zero-tracking. Progress indicator reads localStorage; it doesn't phone home.
- **Not included:** a CONTRIBUTING.md or GitHub issue-template revamp for showcase submissions. The existing PR-to-submit flow stays; `CONTRIBUTING.md` from R1a just documents it.
- **Not included:** monetization or sponsorship links (eval doc 04 §Unresolved Tension #3 — a later decision).

## Key Decisions

- **License is plain MIT.** Rationale: matches the existing intent ("free to use, modify, distribute"), is the expected default for single-maintainer static sites, and is the license school districts and FOSS orgs will accept with zero friction.
- **Archive (not delete) development artifacts.** Rationale: the git history preserves everything regardless, but an `docs/archive/` folder is cheaper to reverse if anything turns out to still be referenced internally, and it keeps SEO-friendly file paths intact if any were inadvertently linked from live content.
- **`/challenges/` gets 1 index + 5 per-challenge pages in v1. Capstones defer.** Rationale: 6 pages is the MVP for the SEO + launch-essay-CTA job. Capstones can become v2 when the maintainer writes posts that link to them individually.
- **Progress state reads the editor's existing localStorage, not a new store.** Rationale: adding a second source of truth for "which challenges has the user done" invites drift. Whatever the editor already writes on completion is authoritative.
- **Hero copy exact wording is a planning-time draft with user sign-off.** Rationale: the direction is settled (doc 04 §Design + doc 03 ICP-1); the exact sentence is a taste call the maintainer should approve before deploy.
- **Sprint is non-breaking.** Per user's global preferences, commits land directly on `main` in atomic slices.

## Dependencies / Assumptions

- **Assumption:** `editor.html` already supports a `?challenge=<id>` URL parameter to pre-select a challenge. Planning must verify and, if absent, add it as part of R4 (small change — parse `URLSearchParams` on load and set the `#challengeSelect` value + trigger its existing change handler).
- **Assumption:** there's existing localStorage for challenge completion (the `FEATURE_ADDITIONS.js` / editor has an achievement system per `CHANGELOG.md`'s v2.0.0 notes). Planning reads the actual keys and designs the progress indicator against them.
- **Assumption:** no file outside the archivable set is cross-referenced from live HTML or JS. Planning does a grep pass before the move; if a live file links to `DEPLOY_v2.2.0.md` or similar, the link gets updated or the file stays at root.
- **Assumption:** the site's current Outfit + DM Sans typography + dark-mode tokens from the Trust & Safety sprint are the design system for the new pages — no new CSS language introduced.

## Outstanding Questions

### Resolve Before Planning

*(none — all product decisions settled.)*

### Deferred to Planning

- **[Affects R4][Technical]** Does `editor.html` already accept a `?challenge=<id>` query param? If not, add a ~10-line URL-parse → set-and-dispatch handler to the load sequence.
- **[Affects R5][Technical]** What localStorage keys does the editor currently write for challenge completion? Planning reads them and decides whether the progress indicator can derive "N of 5 complete" directly or needs a small helper shim.
- **[Affects R4][Technical]** Nav placement: add a top-level "Challenges" link to the site nav, or stuff it inside the existing "Resources" flyout? Planning proposes based on current nav density.
- **[Affects R3][Copy]** Exact hero + stats-strip rewrites. Planning drafts 2–3 candidates; user signs off before the commit.
- **[Affects R1][Technical]** Does any live HTML page link to one of the archivable `*.md` files (e.g., from a "see the CHANGELOG" footer)? Quick grep during planning; update links if found.

## Next Steps

→ `/ce:plan` for structured implementation planning
