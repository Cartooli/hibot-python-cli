---
date: 2026-04-14
topic: trust-and-safety-sprint
---

# Trust & Safety Sprint

## Problem Frame

The Apr 2026 mega-eval (`sessions/mega-eval-2026-04-14/`) identified three live contradictions and one hygiene gap that together undermine Hi Bot Code's flagship trust posture:

1. The "no external requests / no tracking" claim is false in the markup — 9+ pages preconnect to `fonts.googleapis.com` and load Google Fonts stylesheets.
2. The editor's preview iframe sandbox is effectively disabled (`allow-scripts` + `allow-same-origin` voids isolation per MDN).
3. The site markets a "learn to code age 12" landing in a week when the COPPA Apr 22, 2026 compliance deadline takes effect (eight days from today).
4. Version state is split across README, service worker cache key, and CHANGELOG — a fix shipped today can linger on users' devices because the SW cache doesn't turn over.

All four are small and non-breaking. Together they form the ship-blocker cohort that must land before any of the downstream growth work (launch essay, teacher embed route, platform-named landings) can proceed honestly.

## Requirements

- **R1. Self-host the site's fonts.** Remove every `fonts.googleapis.com` / `fonts.gstatic.com` URL from the repo. Ship Outfit and DM Sans as locally-served WOFF2 subsets with `font-display: swap` and appropriate `preload` for the critical weights. The set of pages currently touching Google Fonts is: `index.html`, `editor.html`, `learn.html`, `showcase.html`, `glossary.html`, `how-backends-work-vercel-railway.html`, `ka/diy-website-beginners-guide.html`, and at least two glossary subpages (per Phase 1A grep).
- **R2. Re-tighten the preview iframe sandbox.** Remove `allow-same-origin` from the editor's preview iframe in `editor.html`. If any current feature (challenge validator, template preview, localStorage read-through) relied on same-origin access, replace it with `postMessage`-based communication between parent and iframe.
- **R3. Add a parent-facing COPPA notice to `learn-to-code-age-12.html`.** Place it above the fold. It must name the third-party destinations reachable via export buttons (CodePen, JSFiddle, Replit, CodeSandbox, Glitch, Carrd, Webflow, Softr, GitHub Gist) and clarify that the Studio itself collects no data. Ship by Apr 22, 2026.
- **R4. Unify the version source across README, service worker, and any other version mention.** A single canonical file (e.g., `VERSION`) is the source; the SW cache key and any user-visible version strings are derived from it. Bump it cleanly as part of this sprint so caches turn over on users' devices.

## Success Criteria

- `grep -r "fonts.googleapis.com\|fonts.gstatic.com" *.html ka/ glossary/ i18n/ 2>/dev/null` returns zero matches.
- DevTools Network panel on fresh load of every HTML page in the repo shows zero requests to any `google*.com` domain.
- `editor.html`'s preview iframe `sandbox` attribute no longer contains `allow-same-origin`. Challenges 1–5, all 12+ templates, and the 10-project localStorage save/load flow still work (manual smoke test).
- `learn-to-code-age-12.html` displays the parents' notice above the fold on desktop and mobile viewports. The notice names the concrete third-party export destinations.
- README version, `sw.js` cache key, and any other version string all agree. A second load after the deploy picks up the new SW and evicts the old cache.
- All four fixes are deployed to `code.hibot.space` **before Apr 22, 2026**.

## Scope Boundaries

- **Not included:** hero rewrite, `/challenges/` index page, repo-cruft cleanup, LICENSE file, any ICP/positioning change. Those belong to the next sprint ("Launch-Ready").
- **Not included:** an interstitial on export-button clicks. The above-the-fold parents' notice is the MVP; the interstitial is a follow-up if the R3 notice proves insufficient in practice.
- **Not included:** any new build pipeline. If a single Node script for font subsetting or version bumping is introduced, it stays minimal (≤30 lines) — this sprint doesn't introduce a toolchain.
- **Not included:** a11y / contrast fixes, light theme, console surface, or any of the `Medium-Term` items in doc 04. They ride in a later sprint.

## Key Decisions

- **Font stack stays Outfit + DM Sans** (no simplification). The design tokens referencing `--font-display: 'Outfit'` / `--font-ui: 'DM Sans'` are load-bearing across many pages; switching to a system stack as a side-effect would be a design change, not a trust fix.
- **R3 notice is static HTML copy, not a dynamic consent banner.** No cookie, no localStorage flag, no dismissal state — just a visible block on one page. A consent banner would itself be a tracking-adjacent pattern that contradicts the site's posture.
- **R4 uses a single `VERSION` file, not `package.json`.** The repo is a static site; importing npm semantics into the versioning story is scope creep.
- **Sprint is non-breaking.** Per user's global preferences, commits land directly without PR approval gates.

## Dependencies / Assumptions

- **Assumption:** the editor's challenge validator and template preview do not currently require `allow-same-origin`. If discovery in planning shows they do, R2's `postMessage` migration is in scope; if that adds more than half a day of work, escalate before committing.
- **Assumption:** there is no CI pipeline that must be updated to match the new version flow. If one exists in `.github/workflows/`, touching it is in scope.
- **Assumption:** the PWA's `sw.js` can safely purge the old cache in its `activate` handler without user-visible downtime. A one-line `caches.keys().filter(...).map(delete)` is the expected pattern.

## Outstanding Questions

### Resolve Before Planning

*(none — all product decisions are settled.)*

### Deferred to Planning

- **[Affects R2][Technical]** What exactly depends on `allow-same-origin` in the current preview iframe? Audit during planning and propose the minimal `postMessage` bridge if needed.
- **[Affects R1][Technical]** Which Outfit and DM Sans weights are actually rendered on each page? Subset aggressively rather than shipping the full Google-Fonts variable-font bundle.
- **[Affects R3][Copy]** Exact wording of the parents' notice — a first pass can be drafted during planning; the user signs off before deploy.
- **[Affects R4][Technical]** Does any existing tooling (Rollup config, `generate-glossary.js`, `.github/workflows/`) need to read the new `VERSION` file? Small grep during planning.

## Next Steps

→ `/ce:plan` for structured implementation planning
