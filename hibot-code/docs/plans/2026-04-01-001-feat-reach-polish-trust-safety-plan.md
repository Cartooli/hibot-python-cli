---
title: Reach & polish, then trust & safety (Phase A → Phase B)
type: feat
status: completed
date: 2026-04-01
origin: docs/brainstorms/2026-04-01-reach-polish-then-trust-safety-requirements.md
deepened: 2026-04-01
---

# Reach & polish, then trust & safety (Phase A → Phase B)

## Enhancement summary

**Deepened on:** 2026-04-01  
**Sections enhanced:** Overview/problem, Phase A/B proposed solution, technical considerations, system-wide impact, acceptance/quality, dependencies, implementation table, sources  
**Research used:** Web (PWA checklist, SW lifecycle, OWASP XSS, WCAG SCR40), MDN via Context7 (`ServiceWorkerContainer.register`, `updateViaCache`, `skipWaiting`), repo (`vercel.json` cache headers)  
**Skills / agents:** `docs/solutions/` not present — no institutional learnings to merge. Subagent swarm from deepen-plan spec not run in this environment; findings are author-synthesized from the sources above.

### Key improvements

1. **PWA / service worker:** Documented first-visit vs repeat-visit behavior, cache versioning, `register()` scope, and optional `updateViaCache` awareness; tied to existing **global `Cache-Control: no-cache`** on all routes in `vercel.json` (helps browsers pick up `sw.js` changes).
2. **A11y:** WCAG **SCR40** pattern for `scrollIntoView({ behavior })` + CSS `scroll-behavior` gating; explicit inventory targets for Phase B.
3. **Security:** OWASP framing for **DOM XSS** and template strings — validate `htmlContent` / `customHTML` / `customCSS`; note **HTML Sanitizer API** / DOMPurify as options if regex-only checks prove brittle (product call: avoid new deps if possible).
4. **Onboarding:** Non-annoying first-run patterns — dismissible UI, deep-link bypass, single primary CTA (already in plan; added edge cases).

### New considerations discovered

- **Installability:** Chromium expects manifest **192×192 and 512×512 PNG** icons for install prompts; current `manifest.json` uses **SVG** for those slots — Lighthouse may flag; consider adding raster icons without breaking single-file ethos (optional Phase A polish).
- **Service worker file caching:** Repo-wide no-cache headers mitigate stale `sw.js`; if headers ever narrow, add **explicit** `Cache-Control` for `/sw.js` in deployment config.

## Overview

Implement the brainstormed sequence **reach & polish first**, then **trust & safety** for [Hi Bot Code](https://code.hibot.space): improve discovery, first-run clarity, showcase credibility, and PWA coherence **before** extending template validation and beginner-facing error UX. All scope stays **client-only** (no backend, no accounts, no analytics). (see origin: [docs/brainstorms/2026-04-01-reach-polish-then-trust-safety-requirements.md](../brainstorms/2026-04-01-reach-polish-then-trust-safety-requirements.md))

## Problem Statement / Motivation

New users need to **understand what the product is**, **see believable examples**, and **know the next click** before deeper safety investments feel meaningful. The origin document explicitly **reorders** work vs. [`WORLD_CLASS_ROADMAP.md`](../../WORLD_CLASS_ROADMAP.md) default (safety-first week 1): **findability and first success first**, then **guardrails**. (see origin)

**Local research notes (2026-04-01):**

- **`index.html`** — Already has solid title, description, OG/Twitter, canonical; **does not** register the service worker (unlike `editor.html`, `showcase.html`, `learn.html`, etc.).
- **`sw.js`** — `CACHE_NAME` `bws-v2.8.0`, `CORE_ASSETS` includes `/`, `/index.html`, `/editor.html`, and many routes; cache-first + offline navigate → `404.html` or `index.html`.
- **`showcase.html`** — Multiple cards reference `img/preview-*.png`; **no `preview-*.png` files found** under `Hi Bot Code/` at plan time → likely **broken hero imagery** and a direct miss on R2 credibility.
- **`editor.html`** — `validateTemplate()` at ~12005 checks `template.html` / `template.css` for dangerous patterns; **built-in templates often use `htmlContent`, `customCSS`, or `customHTML`** — those strings may **not** be scanned the same way → **validation gap** for R5.
- **`editor.html`** — `init()` auto-selects `blank` template and hydrates state; **no dedicated first-run / empty-state CTA** beyond normal UI (R3).
- **A11y prefs** — `editor.html` and `showcase.html` already include `@media (prefers-reduced-motion)` and `prefers-contrast` blocks; Phase B should **audit coverage** (e.g. `index.html`, inline JS-driven motion) and **align error/modal** presentation — not necessarily net-new files.

**Research decision:** Skip external framework research — patterns are established in-repo; PWA behavior is standard service-worker caching.

### Research insights (discovery & motivation)

**PWA / repeat visits:** The service worker **does not control the page on the first navigation** in the same way as after activation — repeat visits and refresh are where offline/cache-first wins. Set expectations in QA: test **second load** + offline, not only first paint. See [Service worker lifecycle](https://web.dev/articles/service-worker-lifecycle) and [Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

**Installability checklist:** `link rel="manifest"` on **every** entry page that should feel “app-like”; `start_url`, `display`, icons (see enhancement summary for PNG vs SVG caveat), HTTPS/localhost. [web.dev install criteria](https://web.dev/install-criteria), [Lighthouse PWA](https://developer.chrome.com/docs/lighthouse/pwa).

## SpecFlow / gap analysis (planning pass)

| Gap | Risk | Phase |
|-----|------|--------|
| First visit vs. returning user | R3 CTA could annoy power users | A — gate on `localStorage` flag + dismiss |
| `?template=` / hash / localStorage restore | “Empty state” definition varies | A — define triggers in implementation (see tasks) |
| Showcase claims vs. GitHub submit flow | Trust if copy over-claims | A — align hero/subcopy with actual submission path (origin: R2) |
| `validateTemplate` skips `htmlContent` / `customHTML` | Unsafe or invalid custom templates slip through | B — extend scans + required fields per safety plan |
| Invalid colors only warn | Silent bad UX | B — decide fail vs. toast per product call |
| Phase B before Phase A “done” | Violates sequencing decision | Process — explicit checkpoint |

## Proposed solution

### Phase A — Reach & polish

1. **R1 — Landing & share cards:** Checklist pass on `index.html` (and any other primary entry linked from social) for consistent **free / no sign-up / no tracking** + one-line value prop; fix stale/mismatched strings; optional JSON-LD `WebApplication` only if it does not imply backend features.
2. **R2 — Showcase:** Restore or replace **preview assets** (add real PNGs/WebPs under `img/` or switch to reliable placeholders); ensure **≥2** examples feel **concrete** (working images + deep links to `editor.html?template=` / `?challenge=`); tighten copy if “built by beginners” conflicts with curated examples (see origin).
3. **R3 — First-run CTA:** Add a **dismissible** onboarding strip, modal, or spotlight (product choice during work) when `editorMode` is beginner and user has not seen welcome — must point to **one** primary action: **pick template**, **start tour**, or **open Learn** (pick one primary in implementation). Persist `hasSeenEditorWelcome` (or equivalent) in `localStorage`. **Do not** show when URL already specifies `template`, `challenge`, hash share payload, or meaningful restored project (defer exact rules to task comments in code).
4. **R4 — PWA coherence:** Register **the same** `sw.js` from `index.html` (mirror `editor.html` pattern: register on load, catch failures silently). After substantive asset changes, **bump `CACHE_NAME`** in `sw.js` and verify on Vercel/subpath deploy that **scope** still matches (origin deferred question).

#### Research insights (Phase A)

**R1 — SEO / sharing:** Keep title + description + OG/Twitter **in lockstep** (same promise, no contradictory “analytics” language). Optional JSON-LD `WebApplication` — only include properties that are true (e.g. `offers` with price 0, `browserRequirements` if stated).

**R2 — Showcase images:** Prefer **WebP + PNG fallback** or optimized PNG; set explicit `width`/`height` to reduce CLS; lazy-load below-fold cards. If maintaining screenshots is costly, **two** high-quality captures beat six placeholders.

**R3 — Onboarding UX:** Patterns that reduce annoyance: **one** primary CTA; **dismiss** persists; respect **already started** signals (localStorage project, non-default code, URL params); avoid modal traps — focus trap + Esc if using dialog. Do not fire welcome UI while **hash/query import** is still resolving async (`loadFromURL`).

**R4 — Registration API:** Use root-relative `navigator.serviceWorker.register('/sw.js')` (or path consistent with deploy). Default **scope** is the script directory; broader scope may need `Service-Worker-Allowed` header on the worker response (not required if `sw.js` stays at site root). Optional: `register(url, { updateViaCache: 'none' })` if intermediaries cache the script aggressively (MDN: `ServiceWorkerRegistration.updateViaCache`). Existing **`vercel.json`** applies `Cache-Control: no-cache, no-store, must-revalidate` to `/(.*)` — favorable for SW update discovery; document this in case headers are narrowed later.

### Phase B — Trust & safety (after Phase A acceptance)

5. **R5 — Template safety:** Implement remaining items from [`SAFETY_IMPLEMENTATION_PLAN.md`](../../SAFETY_IMPLEMENTATION_PLAN.md) Phase 2: extend `validateTemplate` to required fields aligned with plan (**e.g. `metaDesc`, `h1`** where applicable), scan **`htmlContent` / `customCSS` / `customHTML`** (and any other string fields concatenated into HTML/CSS output) with same dangerous-pattern list, **block** load on failure with clear UI. Close the **builtin vs. import** parity gap (import path already calls `validateTemplate`).
6. **R6 — Beginner-friendly errors:** Introduce a small **error code → message + help + action** map (tone per safety plan) for: invalid color, input length, template load/import failure, save/storage errors; route high-traffic `showToast`/`showErrorToast` sites through it incrementally.
7. **R7 — Reduced motion:** Inventory `editor.html` (and pages touched in Phase A) for **JS-driven** animation (e.g. `scrollIntoView({behavior:'smooth'})`, CSS transitions); gate on `prefers-reduced-motion` (pattern already at ~18674).
8. **R8 — Contrast:** Extend `prefers-contrast` tokens where Phase A pages are weak; prioritize **focus rings**, **primary buttons**, and **modal** text on `index.html` if Phase A edits it.

#### Research insights (Phase B)

**R5 — Template / DOM XSS:** Treat builtin template strings as **trusted-but-scanned** and imports as **untrusted**. OWASP: understand HTML vs URL vs JS contexts ([DOM XSS Prevention](https://cheatsheetseries.owasp.org/cheat_sheets/DOM_based_XSS_Prevention_Cheat_Sheet.html), [XSS Prevention](https://cheatsheetseries.owasp.org/cheat_sheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)). Regex blocks for `<script`, `on*=`, `javascript:` are a **baseline**; for imported JSON, consider stricter allowlists or **HTML Sanitizer API** / DOMPurify if maintenance allows a dependency — otherwise document residual risk.

**R6 — Error copy:** Use a consistent **structure**: short headline (“We couldn’t save that”), **why it might have happened** (storage full, invalid format), **one next action** (try smaller text, pick another template, refresh). Map error codes in one object (per `SAFETY_IMPLEMENTATION_PLAN.md`) to avoid scattered strings.

**R7 — Reduced motion:** WCAG technique **SCR40**: use `matchMedia('(prefers-reduced-motion: reduce)')` and use `scrollIntoView({ behavior: 'auto' })` when true, `smooth` when false ([W3C SCR40](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40)). Mirror with CSS: `scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)`.

**R8 — Contrast:** Prefer token bumps for `--border`, `--muted`, focus `outline`, and button text-on-accent; test with **Windows High Contrast** and macOS **Increase contrast**, not only `prefers-contrast: more`.

## Technical considerations

- **Single-file architecture:** Most logic lives in `editor.html`; prefer **localized** edits to avoid merge pain; extract shared helpers only if duplication becomes unsafe.
- **Privacy:** No new third-party requests for R2 assets (self-host images).
- **Caching:** Any change to `index.html` / `editor.html` / static assets should include **`CACHE_NAME` bump** in `sw.js` to avoid stale shells.
- **Testing:** Manual pass: offline mode (DevTools), first visit incognito, showcase image load, template select + import JSON with malicious fields.

### Research insights (technical & performance)

- **Cache busting:** Version `CACHE_NAME` on every ship that changes precached assets; `activate` should delete foreign caches (already in `sw.js`). After deploy, validate **old caches dropped** (Application → Cache Storage).
- **SW update UX:** `skipWaiting()` + `clients.claim()` (already used) speeds takeover; optional: listen for `controllerchange` and soft-reload if you add long-lived editor sessions — only if users report stale shells.
- **Performance:** Precache list is large — monitor **install** time on slow 3G; lazy-add optional pages to runtime cache only if install becomes a problem.

## System-wide impact

- **Interaction graph:** Editor init → `loadFromLocalStorage` / URL params → template validation → state → preview iframe; Phase A adds **branch** on welcome flag; Phase B tightens **validateTemplate** on all entry paths (select, import, `?template=`).
- **Error propagation:** `validateTemplate` returns boolean; Phase B should standardize **user-visible** outcomes (toast vs. modal) without breaking `safeConfirm` flows.
- **State risks:** Welcome flag is non-critical; template rejection must **not** corrupt `state` (reset select to previous or blank).
- **Surface parity:** Import JSON and dropdown apply must share **one** validation implementation.
- **Integration scenarios:** (1) New user opens `editor.html` cold. (2) User opens `editor.html?template=portfolio`. (3) User imports JSON with `<script>`. (4) Offline open from home → editor after first visit.

### Research insights (edge cases)

- **R3 + async URL load:** If `loadFromURL` resolves after welcome UI mounts, **race** — defer welcome until URL/hash resolution completes or close welcome when state changes.
- **R5 + custom templates:** Scan **every** string field concatenated into `innerHTML` or written to iframe srcdoc; `customHTML` may use different delimiters than `htmlContent`.
- **PWA:** User clears site data → welcome and SW state reset together; acceptable.

## Acceptance criteria

### Phase A (blocking before Phase B)

- [ ] **A-R1:** `index.html` meta/OG/Twitter reviewed; inconsistencies fixed; value prop and privacy claims align with actual behavior.
- [ ] **A-R2:** Showcase shows **≥2** examples with **working** visual previews (no broken image icons in default deploy); each has CTA to editor or challenge; copy matches submission reality.
- [ ] **A-R3:** First-time (or defined) users see a **clear, dismissible** next-step CTA; returning users not nagged; deep links bypass inappropriate prompts.
- [ ] **A-R4:** `index.html` registers `sw.js`; smoke-test: second load works with network off for cached shell; cache version bumped when ship warrants.

### Phase B (after Phase A sign-off)

- [ ] **B-R5:** `validateTemplate` covers **all** template HTML/CSS string fields in use; unsafe content **cannot** apply via builtin select or JSON import; required-field rules match agreed subset of safety plan.
- [ ] **B-R6:** At least **four** failure classes use beginner-oriented copy (message + what to try next).
- [ ] **B-R7:** Reduced-motion respected for **non-essential** JS/CSS motion on editor + Phase A pages.
- [ ] **B-R8:** High-contrast mode improves **legibility** on primary CTAs and focus on touched pages without breaking layout.

### Quality

- [ ] Manual regression on mobile width for new UI.
- [ ] No new external tracking scripts.
- [ ] **Lighthouse (optional):** Run PWA + SEO smoke on `index.html` and `showcase.html` after Phase A; file issues for icon/install gaps if product wants install prompts.

## Success metrics (lightweight)

- Phase A: Showcase **0 broken images**; stakeholder sign-off “first screen is obvious.”
- Phase B: **0 silent** template apply on intentionally bad import; spot-check a11y prefs.

## Dependencies & risks

- **Risk:** Large `editor.html` — use targeted search/replace and run existing manual checklist if present.
- **Risk:** Subpath deploy — verify `sw.js` scope (origin deferred).
- **Dependency:** Phase B blocked on Phase A completion per origin (unless explicitly overridden).

## Documentation plan

- Update [`CHANGELOG.md`](../../CHANGELOG.md) for user-visible changes.
- Optionally one line in [`WORLD_CLASS_ROADMAP.md`](../../WORLD_CLASS_ROADMAP.md) noting **sequencing choice** (reach-first tranche shipped).

## Implementation phases (execution order)

| Step | Focus | Primary files |
|------|--------|----------------|
| A1 | R1 landing audit | `index.html` |
| A2 | R2 showcase assets + copy | `showcase.html`, `img/*` |
| A3 | R3 welcome CTA | `editor.html` |
| A4 | R4 SW on home | `index.html`, possibly `sw.js` |
| A5 | *(optional)* Manifest raster icons for install | `manifest.json`, `img/` or assets |
| Checkpoint | Confirm Phase A acceptance criteria | — |
| B1 | R5 validation | `editor.html` |
| B2 | R6 errors | `editor.html` |
| B3 | R7–R8 a11y pass | `editor.html`, `index.html`, `showcase.html` as needed |

## Sources & references

- **Origin document:** [docs/brainstorms/2026-04-01-reach-polish-then-trust-safety-requirements.md](../brainstorms/2026-04-01-reach-polish-then-trust-safety-requirements.md) — Key decisions: **Phase A before Phase B**; maps to R1–R8; scope excludes backend/accounts/collab.
- **Safety spec:** [`SAFETY_IMPLEMENTATION_PLAN.md`](../../SAFETY_IMPLEMENTATION_PLAN.md) Phase 2.
- **Roadmap context:** [`WORLD_CLASS_ROADMAP.md`](../../WORLD_CLASS_ROADMAP.md).
- **Code anchors:** `editor.html` — `validateTemplate` ~12005; `init` ~14733; SW register ~18865; `sw.js` — `CORE_ASSETS`, `CACHE_NAME`.
- **External (deepening):**
  - [web.dev — Service worker lifecycle](https://web.dev/articles/service-worker-lifecycle)
  - [MDN — Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
  - [MDN — `ServiceWorkerContainer.register`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
  - [W3C WCAG 2.2 — SCR40](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40)
  - [OWASP — DOM XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheat_sheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)

## Origin cross-check

- [x] Sequencing 3→4 (reach then trust) reflected.
- [x] R1–R8 mapped to tasks; deferred origin items (empty-state definition, cache list) resolved in plan text.
- [x] Constraints: no backend, no accounts, no analytics.
- [x] “What’s next after challenges” explicitly out of this plan per origin (optional follow-up).
