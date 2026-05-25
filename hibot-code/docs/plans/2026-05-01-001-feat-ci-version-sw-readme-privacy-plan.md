---
title: "feat: CI guard for VERSION vs sw.js + README Privacy bullet alignment"
type: feat
status: completed
date: 2026-05-01
origin: docs/evaluations/mega-eval-2026-05-01/phase2-synthesis.md
---

# CI VERSION/sw guard + README Privacy alignment

## Overview

Ship two quick wins from the mega-eval synthesis (see origin): (1) automated verification that `VERSION` matches `sw.js` `CACHE_NAME` so cache/regression mistakes fail in CI instead of production; (2) align the Features-list **Privacy-First** bullet with the nuanced Privacy & Security section so the README does not contradict itself.

## Problem Statement / Motivation

- **Cache drift:** `CHANGELOG.md` already documents that `VERSION` and `sw.js` must stay paired; humans forget.
- **README tension:** Line-level “no cookies, no analytics” under Features conflicts with localStorage-driven UX documented elsewhere and with the detailed Privacy section updated in the prior mega-eval README pass.

## Proposed Solution

1. Add a **`verify`** job to the existing GitHub Pages workflow that runs `grep`/`test` against `VERSION` and `sw.js`. Gate **`deploy`** on `needs: verify`.
2. Replace the Features **Privacy-First** bullet with wording consistent with “no third-party analytics / optional local editor state.”
3. Optionally note QA report location under `.gstack/qa-reports/` in `CONTRIBUTING.md` next to version discipline (per synthesis “link to QA evidence”).

## Technical Considerations

- **Workflow:** Single workflow file; verify is fast (no Node install). `permissions` unchanged.
- **Security:** Read-only repo checkout; no secrets.
- **Failure mode:** Clear shell error if `VERSION` is `2.14.0` but `sw.js` still says `bws-v2.13.0`.

## System-Wide Impact

- **Interaction graph:** Push to `main` → Actions runs `verify` → on success `deploy` runs as today.
- **Error propagation:** Failed verify blocks deploy (desired).
- **State:** None.

## Acceptance Criteria

- [ ] Pushing a deliberate mismatch (not shipped) would fail `verify`; with matching `VERSION`/`CACHE_NAME`, workflow succeeds.
- [ ] README Features section no longer asserts blanket “no cookies” without qualification.
- [ ] CONTRIBUTING mentions where historical QA reports live (optional path under `.gstack/qa-reports/`).

## Dependencies & Risks

- **Risk:** None significant; YAML typo could break deploy — validate workflow syntax.
- **Dependency:** GitHub Actions enabled for repo (already used).

## Implementation Units

### Unit A — Workflow verify job

- **Goal:** `verify` job + `deploy.needs: verify`
- **Files:** `.github/workflows/deploy.yml`
- **Verification:** Workflow file valid; local shell check passes with current repo state.

### Unit B — README Privacy bullet

- **Goal:** One bullet rewritten for accuracy.
- **Files:** `README.md`
- **Verification:** Read Features + Privacy sections; no contradictory absolutes.

### Unit C — CONTRIBUTING QA pointer

- **Goal:** One short paragraph or bullets after Version & release.
- **Files:** `CONTRIBUTING.md`
- **Verification:** Links resolve within repo.

## Sources & References

- **Origin:** [docs/evaluations/mega-eval-2026-05-01/phase2-synthesis.md](docs/evaluations/mega-eval-2026-05-01/phase2-synthesis.md) — CI check + README accuracy.
- **Existing:** [CONTRIBUTING.md](CONTRIBUTING.md) version/release discipline; [sw.js](sw.js); [VERSION](VERSION).
