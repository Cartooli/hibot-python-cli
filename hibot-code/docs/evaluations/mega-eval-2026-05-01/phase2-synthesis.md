# Synthesis: Critical Fixes, Design Issues & Next Steps

## Critical Fixes Needed

### Fix 1: Broken README documentation links

- **What:** Quick Links and “New!” section point to `QUICK_START_GUIDE.md`, `README_NEW_FEATURES.md`, `VISUAL_SUMMARY.md`, `INTEGRATION_SUCCESS.md`, `NEW_FEATURES.md` at repo root; files live under `docs/archive/` since repo hygiene sprint (CHANGELOG 2.11.0).
- **Why it matters:** Broken links erode trust and waste maintainer time answering “where’s the guide?”
- **Flagged by:** Phase 1A (HN, Reddit), Phase 1B (trust/competitive)
- **Suggested approach:** Update README paths to `docs/archive/...` (non-breaking for GitHub rendering).

### Fix 2: README claims vs implementation drift

- **What:** “Latest Update: Version 2.0 (October 2025)” dominates hero while `VERSION` is 2.13.0. Privacy section says “no fonts” / “no network requests” but product uses self-hosted fonts and users obviously fetch the site.
- **Why it matters:** Skeptical readers (HN persona) dismiss the rest of the README.
- **Flagged by:** Phase 1A (HN), Phase 1C (trust as strength — contradictions undermine it)
- **Suggested approach:** Point “latest” to CHANGELOG + VERSION; replace absolute “no fonts” with “self-hosted fonts (no third-party font CDNs)”; soften “no network requests” to “no third-party analytics; core teaching flows stay client-side” or similar accurate wording.

### Fix 3: Brand hierarchy clarity

- **What:** Domain `code.hibot.space` vs product name “Hi Bot Code.”
- **Why it matters:** Reddit/Twitter personas confused.
- **Flagged by:** Phase 1A (Reddit, Designer)
- **Suggested approach:** Subtitle line in README: “Hi Bot Code (Bored Games)” — optional one-line footer alignment later on site.

## Design Inconsistencies to Resolve

- README emoji-heavy “Latest Update” block reads like marketing blast from Oct 2025; CHANGELOG is the source of truth — align tone.
- “Local Analytics” in README feature list can sound like tracking — ensure wording matches actual local-only telemetry if present.

## Proposed Next Steps (Non-Breaking Changes)

### Quick Wins (days)

- Merge README link + accuracy fixes (this PR).
- Add single line linking to `.gstack` or `docs`-hosted QA reports from CONTRIBUTING if paths exist.

### Medium-Term (weeks)

- Homepage pull-quote from launch essay for differentiation.
- CI check: grep `VERSION` vs `CACHE_NAME` in sw.js on PR.

### Strategic (months)

- Educator one-pager derived from challenges hub.

## Unresolved Tensions

- **Breadth vs focus:** Strengths track praises glossary/tiers; hater track warns of overwhelm — intentional SEO hub vs simplify funnel remains a product choice, not a doc fix.
