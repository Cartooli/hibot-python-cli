---
title: "Showcase page: The Perfect AI-Powered Build Stack"
type: feat
status: completed
date: 2026-05-20
deepened: 2026-05-20
shipped: 2026-05-20
pr: https://github.com/Cartooli/Hi Bot Code/pull/15
---

# Showcase page: The Perfect AI-Powered Build Stack

## Enhancement Summary

**Deepened on:** 2026-05-20
**Inputs:** repo-wide referral grep · 2026 dev-tool landing-page conversion research (Evil Martians 100-page study, Digital Applied 2026 conversion study, SaaS Hero) · 2026 stack fact-check (Anthropic, Vercel AI Gateway, Fluid Compute, Neon marketplace, Railway, Cursor) · simplicity review

### Key Refinements
1. **Cut jump-nav** — anchor strips hurt conversion on single-thesis pages by signaling "this is long and meandering," contradicting the 60-second-comprehension goal.
2. **Cut the secondary hero CTA** — dual CTAs in heroes dilute clicks on dev-tool pages; single primary CTA wins.
3. **Scope reduction** — files-modified count dropped from 11 to 5. Cross-link sweep across the AI-cluster (`ai-coding-landscape-2026.html`, `cursor-slack-github.html`, etc.) is deferred to a follow-up PR.
4. **Added FTC affiliate disclosure block** — `editor.html:5054` already publishes a disclosure for the Railway referral; the new page must follow the same precedent for Cursor + Railway links.
5. **Pinned 2026 facts** — Claude Sonnet 4.6 named as the default-for-app-dev pick; Neon via Vercel Marketplace named as the Postgres path; AI Gateway env contract documented.
6. **Cut subjective acceptance criteria** — "60-second comprehension" is a design goal, not a test; removed it from the gates.
7. **Deferred JSON-LD** — canonical + OG carry 95% of SEO; add later only if it proves it moves the needle.
8. **Added "slop signals" copy guardrails** — explicit banned words and patterns to keep the page from reading like marketing-team output.

### New Considerations Discovered
- A site-wide affiliate-disclosure pattern already exists in `editor.html`; reuse the copy.
- The repo contains exactly two authoritative affiliate codes: Cursor (`6FIM46PRQZQB`) and Railway (`u38bdj`). The `?ref=vibeshare` patterns in `VIBESHARE_*.md` are *inbound* traffic-tracking docs, not outbound links the page should use.
- Vercel Postgres / Vercel KV are deprecated — the only correct 2026 framing is "Neon via Vercel Marketplace."

---

## Overview

Add a single static landing page — `ai-build-stack.html` — that ushers curious developers and founders into the AI-native building stack the site already endorses (Cursor + Vercel + Neon + Anthropic Claude via Vercel AI Gateway). It reads like an opinionated recommendation from a senior builder, not a listicle, and converts to a Cursor sign-up via the user's referral link.

The page slots into the existing static-site convention (no framework, no build step, inline CSS, shared design tokens).

## Problem Statement

The site already publishes adjacent content — an AI coding landscape comparison, a Cursor+Slack workflow guide, a Vercel vs Railway backend explainer, an ROI calculator. What it lacks is a **single page that synthesizes "here is the whole stack, and here's why this one wins in 2026"** so a builder who lands cold has one canonical recommendation to act on.

## Proposed Solution

A single new HTML page that:

1. Names the thesis up front — AI-native building is a new craft, here's the 2026 stack.
2. Walks the stack layer-by-layer, each with: what it does, why it wins, the CTA link.
3. Shows the loop — "From zero to deployed in an afternoon": prompt → Cursor → commit → Vercel preview → iterate.
4. Calls out anti-patterns — what *not* to use.
5. Closes with a single primary CTA — the Cursor referral link.
6. Carries an affiliate-disclosure block matching the existing site pattern.

Lives at root: `ai-build-stack.html`.

## Technical Approach

### Architecture

Pure static HTML. No new dependencies. Single file, inline `<style>` in `<head>`, no JS beyond the same service-worker registration snippet every other content page uses.

Reuse the exact design tokens from `index.html` / `cursor-slack-github.html`:

```css
--bg: #0a0f1a; --ink: #f1f5f9; --muted: #a8b5c9;
--accent: #3dd68c; --accent-soft: rgba(61,214,140,.85);
--accent-dim: rgba(61,214,140,.12);
--panel: #0d1219; --panel-2: #111827;
--border: rgba(168,181,201,.18);
--font-display: 'Outfit'; --font-ui: 'DM Sans';
```

Fonts load from the site-origin bundle: `<link rel="stylesheet" href="/assets/fonts/fonts.css">`.

Reuse component patterns (don't reinvent):
- **Nav** — `.site-nav` markup from `index.html:245-270`.
- **Hero** — `.hero` from `index.html:272-283`, **with a single primary CTA only**.
- **Stack section cards** — adapt `.path-card` / `.feature` grid pattern from `index.html:300-356`.
- **Affiliate disclosure** — copy the disclosure-block pattern from `editor.html:5054` near the primary CTA and reuse copy structure.
- **Footer** — link row from `index.html:359-375`.

### Page Structure (final, post-deepen)

```
ai-build-stack.html
├─ <head>: title, meta, OG/Twitter cards, canonical, fonts, inline <style>
├─ Skip-link
├─ <nav class="site-nav"> — shared, Resources flyout updated to include this page
├─ <main>
│  ├─ Hero: thesis + SINGLE primary CTA → Cursor referral
│  ├─ § The thesis (2-3 short paragraphs)
│  ├─ § The stack — one block per layer, 6 layers total
│  │     · Editor / Agent: Cursor   [referral CTA]
│  │     · Hosting & previews: Vercel (Fluid Compute, AI Gateway)
│  │     · AI model: Anthropic Claude — Sonnet 4.6 default, via Vercel AI Gateway
│  │     · Database: Neon via Vercel Marketplace
│  │     · Source control: GitHub (and the Cursor↔GitHub agent loop)
│  │     · When to swap to Railway (multi-service orchestration)   [Railway referral]
│  ├─ § The loop — "From zero to deployed in an afternoon" (5–7 numbered steps)
│  ├─ § What NOT to use — anti-patterns block
│  ├─ § CTA — single primary action (Cursor referral)
│  └─ § Affiliate disclosure — small print, matches editor.html pattern
├─ <footer> — shared link row, includes this page
└─ Service worker bootstrap snippet
```

**Removed in deepen:** jump-nav strip; secondary hero CTA; JSON-LD WebPage schema (deferred).

### Link Policy Map (authoritative)

Grep confirmed only two referral codes exist in the repo. Everything else is clean.

| Tool | URL to use | Source of truth |
|---|---|---|
| Cursor (all sign-up / "start" CTAs) | `https://cursor.com/referral?code=6FIM46PRQZQB` | user-provided |
| Cursor (existing integration deep links) | `https://cursor.com/dashboard/integrations` (keep as-is in `cursor-slack-github.html`) | already in repo |
| Vercel | `https://vercel.com` | clean |
| Vercel AI Gateway docs | `https://vercel.com/docs/ai-gateway` | clean |
| Vercel Marketplace | `https://vercel.com/marketplace` | clean |
| Neon (Postgres on Vercel) | `https://neon.tech` or `https://vercel.com/marketplace/neon` | clean |
| Railway | `https://railway.com?referralCode=u38bdj` | `how-backends-work-vercel-railway.html:738`, `editor.html:5040` |
| Anthropic | `https://www.anthropic.com` | clean |
| Anthropic API docs | `https://docs.anthropic.com` | clean |
| GitHub | `https://github.com` | clean |

Rules:
- Never invent affiliate codes. Only the two above are authoritative.
- All external `<a>` tags use `target="_blank" rel="noopener"`.
- The `?ref=vibeshare` patterns in `VIBESHARE_*.md` are *inbound* tracking docs and must not be applied to outbound links on this page.

### Pinned 2026 Facts (for copy accuracy)

The page copy will assert these without hedging — they're verified:

- **Claude lineup:** Opus 4.7 (most capable, $5/$25), **Sonnet 4.6 is the default for app development** ($3/$15, 1M context, best speed/intelligence balance), Haiku 4.5 for high-volume cheap tasks.
- **Vercel AI Gateway access pattern:** set `ANTHROPIC_BASE_URL=https://ai-gateway.vercel.sh` and `ANTHROPIC_AUTH_TOKEN=<gateway-key>`; use the standard `anthropic` provider string from the AI SDK — no per-provider package needed. (Source: Vercel AI Gateway docs.)
- **Fluid Compute:** default on all new Vercel projects; Node.js 24 LTS default; default timeout 300s (configurable to ~13 min on Pro); Active CPU pricing. Edge Functions are functionally superseded.
- **Postgres on Vercel:** Neon via the Vercel Marketplace. Vercel Postgres and Vercel KV are deprecated.
- **Railway niche:** still the right pick for multi-service orchestration (app + worker + cron in one platform) and plan-based pricing predictability; not for single-function workloads.
- **Cursor positioning:** still the default daily-driver because of Composer multi-file edits + lowest learning curve; offload heavy refactors to Claude Code or Codex.

### Copy Direction & Slop Guardrails

**Voice:** punchy, opinionated, second-person. Answer three questions per layer in this order — *What it does. Why it wins. What you do next.*

**Banned words/patterns** (these mark a page as marketing-team output, which dev readers reject):
- "leverage", "unlock", "empower", "seamless", "robust", "best-in-class", "industry-leading"
- "Trusted by 10,000+ developers" or any unproven trust claim
- Stock-photo-style logos of fake customers; testimonial walls
- "Experts say…", "Best practices indicate…"
- Auto-flipping value-prop cards on scroll
- Long preamble before the thesis

**Use instead:** concrete metrics (cost-per-token, P50 latency, deploy-to-preview seconds), short comparative statements ("our stack avoids X's overhead by choosing Y"), and one-sentence verdicts per layer.

### Accessibility Baseline (non-negotiable)

- Skip link to `<main>`.
- Interactive targets ≥44px.
- Body/link contrast ≥4.5:1 on `--bg` (token defaults already pass).
- `prefers-reduced-motion: reduce` disables hero entrance animations.
- `prefers-contrast: more` inherits the override block from `index.html:237-240`.
- One `<main>`, headings in order.
- `aria-current="page"` on the new nav link.

### Affiliate Disclosure Block (required)

Mirror the existing pattern from `editor.html:5054`. Verbatim text shape:

> **Disclosure:** These links may include promotional or affiliate partnerships. We may earn a commission if you make a purchase through these links at no additional cost to you. This helps support the development of free tools like this one.

Place near the final CTA (under the button) and link it from the hero CTA via a small "ⓘ disclosure" inline note or `aria-describedby` link to the disclosure block. Style as `.muted` body text. This satisfies FTC guidance and matches site precedent.

### Service Worker & PWA Integration

The site's `sw.js` is offline-first with `CACHE_NAME` pinned to `VERSION`. Adding a new page requires three coupled edits:

1. Append `/ai-build-stack.html` to `CORE_ASSETS` in `sw.js`.
2. Bump `VERSION` from `2.13.2` → `2.13.3`.
3. Bump `CACHE_NAME` in `sw.js` to `bws-v2.13.3` to match.
4. Add a CHANGELOG entry under `## Unreleased`.

Skipping these strands the new page for returning PWA users on the old shell.

### SEO

- `<link rel="canonical" href="https://code.hibot.space/ai-build-stack.html" />`
- OG + Twitter cards: reuse `get-started-coding-og.png` as `og:image` (dedicated image is a follow-up).
- Add to `sitemap.xml`: `priority=0.85`, `changefreq=monthly`, `lastmod=2026-05-20`.
- **JSON-LD `WebPage` schema: deferred.** Canonical + OG cover the vast majority of SEO; revisit only if measurement shows it matters.

### Performance Budget

- Page weight ≤40KB on the wire (gzipped).
- No new font requests beyond the existing self-hosted bundle.
- No external JS, no third-party SDKs.
- Inline SVG icons only.

## System-Wide Impact

### Interaction Graph

New page is leaf content. Reach-ins this PR:
- `sw.js` caches the new file (cache-first).
- `index.html` Resources flyout links into the page.
- `sitemap.xml` exposes the new URL.

Sibling-page cross-links are **deferred to a follow-up PR** to keep this change isolated and reversible.

### Error & Failure Propagation

- **Broken referral link** — if Cursor invalidates the code, the link 404s. Single-source-of-truth grep makes rotation trivial.
- **Stale service worker** — mitigated by the VERSION + CACHE_NAME bump being part of acceptance criteria.

### State Lifecycle Risks

None — no client state, no localStorage writes.

### API Surface Parity

Not applicable. Cross-page parity (nav/footer link rows on sibling AI-cluster pages) is a follow-up.

### Integration Test Scenarios (manual)

1. Open `ai-build-stack.html` cold in a clean browser profile — page renders; no third-party network requests in devtools.
2. Click the primary Cursor CTA — opens `https://cursor.com/referral?code=6FIM46PRQZQB` in a new tab with `rel=noopener`.
3. Click every external link — match the Link Policy Map; no improvised `?ref=`, `utm_`, or `aff_` strings.
4. Resize to 360px — nav collapses to hamburger; cards stack; no horizontal scroll.
5. Disable JS — page still readable; nav `<details>` still toggles natively; all CTAs clickable.
6. Lighthouse: a11y ≥95, performance ≥95 on a fresh build.

**Removed in deepen:** the standalone "PWA hard-refresh" manual test — the VERSION/CACHE_NAME bump in acceptance criteria covers it.

## Acceptance Criteria

### Functional

- [ ] `ai-build-stack.html` exists at repo root with the post-deepen structure above
- [ ] Every external link matches the Link Policy Map exactly — no improvised affiliate codes
- [ ] Primary Cursor CTA uses `https://cursor.com/referral?code=6FIM46PRQZQB`
- [ ] Railway link uses `https://railway.com?referralCode=u38bdj`
- [ ] All other external links are clean canonical URLs
- [ ] All external `<a>` tags have `target="_blank" rel="noopener"`
- [ ] Hero has a single primary CTA (no secondary button)
- [ ] No jump-nav anchor strip on the page
- [ ] Affiliate-disclosure block is present near the final CTA, matching the `editor.html:5054` pattern
- [ ] Page is added to the Resources flyout in `index.html` nav and the `index.html` footer link row

### Non-Functional

- [ ] Page weighs ≤40KB on the wire (gzipped)
- [ ] No new dependencies in `package.json`; no new build step
- [ ] No external network requests beyond same-origin font CSS
- [ ] Lighthouse: a11y ≥95, performance ≥95
- [ ] Mobile breakpoints at 768px and 640px render correctly
- [ ] `prefers-reduced-motion: reduce` disables hero animations
- [ ] Body text passes WCAG AA contrast on `--bg`
- [ ] Interactive targets ≥44px

### Quality Gates

- [ ] `sw.js` `CORE_ASSETS` includes `/ai-build-stack.html`
- [ ] `VERSION` bumped to `2.13.3`
- [ ] `sw.js` `CACHE_NAME` bumped to `bws-v2.13.3`
- [ ] `sitemap.xml` includes the new `<url>` entry, `lastmod=2026-05-20`
- [ ] `CHANGELOG.md` Unreleased section notes the new page and the cache bump
- [ ] Manual integration tests 1–6 above pass

**Removed in deepen:** subjective "60-second comprehension" gate; Lighthouse SEO ≥95 as a hard gate; standalone PWA refresh test.

## Success Metrics

- **Conversion:** clicks on the primary Cursor CTA — measurable via Cursor's referral dashboard tied to `6FIM46PRQZQB`.
- **Hub utility:** page becomes the canonical front door for the AI-stack opinion; cross-links from sibling pages land in PR #2.

## Dependencies & Risks

### Dependencies

- Self-hosted fonts at `/assets/fonts/fonts.css` (already shipped).
- CSS token system from `index.html` (stable).
- Service worker cache contract (VERSION + CACHE_NAME bump together — site invariant).

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Cursor referral code invalidated | Med | Single source of truth (this plan + the page); grep-to-update is trivial |
| PWA users see 404 because of stale cache | Med | VERSION + CACHE_NAME bump in same commit (acceptance criteria) |
| Page drifts into listicle territory in copy | High | Strict structure + banned-words list above; resist new sections in review |
| Cross-page nav/footer drift (sibling pages were authored at different times) | Low | Cross-link sweep is a separate follow-up PR; this PR only touches `index.html` |

## Alternative Approaches Considered

1. **Section inside `ai-coding-landscape-2026.html`.** Rejected: different job-to-be-done (comparison vs. recommendation).
2. **Markdown post under `docs/` rendered by a static generator.** Rejected: no rendering pipeline exists; violates "no new dependencies."
3. **Multi-page mini-site (one page per stack layer).** Rejected: defeats the single-front-door goal.

## Files to Create / Modify

**Create:**
- `ai-build-stack.html` — the new page

**Modify (5 files total):**
- `sw.js` — add `/ai-build-stack.html` to `CORE_ASSETS`; bump `CACHE_NAME` to `bws-v2.13.3`
- `VERSION` — `2.13.2` → `2.13.3`
- `sitemap.xml` — add `<url>` entry
- `CHANGELOG.md` — entry under `## Unreleased`
- `index.html` — add link to Resources flyout (`index.html:256-266`) and footer link row (`index.html:363-374`)

**Deferred to follow-up PR (do NOT touch in this change):**
- Cross-links from `ai-coding-landscape-2026.html`, `cursor-slack-github.html`, `get-started-coding.html`, `how-backends-work-vercel-railway.html`, `ai-roi-calculator.html`, `pull-requests-github.html`.

**Do not modify:**
- `package.json`
- Anything under `challenges/`, `glossary/`, `learn-tier-*.html`
- `editor.html`

## Pseudo Code Sketch

### `ai-build-stack.html` (top-level structure, post-deepen)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>The Perfect AI-Powered Build Stack — code.hibot.space</title>
  <meta name="description" content="Cursor, Vercel, Claude Sonnet 4.6, Neon. The opinionated 2026 stack for shipping world-class web apps with AI." />
  <link rel="canonical" href="https://code.hibot.space/ai-build-stack.html" />
  <meta property="og:title" content="The Perfect AI-Powered Build Stack" />
  <meta property="og:description" content="Cursor + Vercel + Claude. The 2026 stack for AI-native builders." />
  <meta property="og:image" content="https://code.hibot.space/get-started-coding-og.png" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://code.hibot.space/ai-build-stack.html" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/assets/fonts/fonts.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <style>/* tokens + nav + hero + cards + footer — copy from index.html */</style>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <nav class="site-nav" aria-label="Site navigation"> ... </nav>

  <main id="main">
    <section class="hero">
      <div class="hero-badge">The 2026 stack</div>
      <h1>Ship world-class web apps. <span>With AI in the loop.</span></h1>
      <p>One opinionated stack. Six tools. An afternoon to your first deploy.</p>
      <div class="hero-cta">
        <a href="https://cursor.com/referral?code=6FIM46PRQZQB"
           class="btn btn-primary" target="_blank" rel="noopener">
          Start with Cursor →
        </a>
        <a href="#disclosure" class="muted small">ⓘ disclosure</a>
      </div>
    </section>

    <section id="thesis"> ... 2-3 paragraphs ... </section>

    <section id="stack">
      <h2>The stack</h2>
      <article class="layer"> ... Cursor (referral CTA) ... </article>
      <article class="layer"> ... Vercel — Fluid Compute, AI Gateway ... </article>
      <article class="layer"> ... Anthropic Claude — Sonnet 4.6 default ... </article>
      <article class="layer"> ... Neon via Vercel Marketplace ... </article>
      <article class="layer"> ... GitHub + the Cursor↔GitHub loop ... </article>
      <article class="layer"> ... When to swap to Railway (referral) ... </article>
    </section>

    <section id="the-loop">
      <h2>From zero to deployed in an afternoon</h2>
      <ol> ... 5–7 steps ... </ol>
    </section>

    <section id="avoid">
      <h2>What not to use</h2>
      <ul>
        <li>Paid analytics SaaS for v1 — write a 30-line edge logger.</li>
        <li>AWS direct — go through Vercel's marketplace.</li>
        <li>Dashboard-only config — if it can't live in code, it's not in the stack.</li>
        <li>AI editors without an agent mode — the agent is the point.</li>
      </ul>
    </section>

    <section id="start">
      <h2>Start your first project</h2>
      <a href="https://cursor.com/referral?code=6FIM46PRQZQB"
         class="btn btn-primary" target="_blank" rel="noopener">
        Get Cursor →
      </a>
      <p id="disclosure" class="muted small">
        Disclosure: These links may include promotional or affiliate partnerships.
        We may earn a commission if you make a purchase through these links at no
        additional cost to you. This helps support the development of free tools
        like this one.
      </p>
    </section>
  </main>

  <footer> ... shared link row, this page included ... </footer>

  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function () {});
      });
    }
  </script>
</body>
</html>
```

### `sw.js` diff (conceptual)

```diff
- const CACHE_NAME = 'bws-v2.13.2';
+ const CACHE_NAME = 'bws-v2.13.3';
  const CORE_ASSETS = [
    ...
    '/how-backends-work-vercel-railway.html',
+   '/ai-build-stack.html',
    '/challenges/',
    ...
  ];
```

### `sitemap.xml` insertion

```xml
<url>
  <loc>https://code.hibot.space/ai-build-stack.html</loc>
  <lastmod>2026-05-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.85</priority>
</url>
```

## Sources & References

### Internal References

- `index.html:38-241` — canonical design token block + nav + hero + card patterns
- `index.html:245-270` — shared nav markup
- `index.html:359-375` — footer link row
- `cursor-slack-github.html` — existing Cursor-related page; same nav/footer convention
- `how-backends-work-vercel-railway.html:738` — authoritative Railway referral code (`u38bdj`)
- `editor.html:5040, 5054` — Railway referral usage + the affiliate-disclosure pattern to copy
- `sw.js:8-50` — `CORE_ASSETS` + `CACHE_NAME` contract
- `CHANGELOG.md` — `## Unreleased` pattern + cache-bump prose precedent
- `VERSION` — current `2.13.2`, bump to `2.13.3`

### External References (used in the page copy itself)

- Cursor referral: `https://cursor.com/referral?code=6FIM46PRQZQB` (user-provided)
- Vercel: `https://vercel.com`
- Vercel AI Gateway: `https://vercel.com/docs/ai-gateway`
- Vercel Marketplace: `https://vercel.com/marketplace`
- Neon: `https://neon.tech`
- Anthropic: `https://www.anthropic.com`
- Anthropic docs: `https://docs.anthropic.com`
- Railway referral: `https://railway.com?referralCode=u38bdj`
- GitHub: `https://github.com`

### Research Sources (deepen phase)

- Evil Martians — "We studied 100 dev tool landing pages — here's what really works in 2025"
- Digital Applied — "Landing Page Conversion Study: 2,000 pages tested in 2026"
- SaaS Hero — "B2B SaaS landing page conversions"
- Anthropic — Claude Models Overview (`platform.claude.com/docs/en/about-claude/models/overview`)
- Vercel — AI Gateway, Fluid Compute, Neon marketplace docs

### Project Conventions Encoded

- Pure static HTML, inline CSS, no build step (`README.md:127-132`)
- Privacy-first: no third-party SDKs, self-hosted fonts (`README.md:157-162`)
- WCAG AA contrast enforced at build via `scripts/contrast.mjs` (CHANGELOG 2.13.2)
- Service worker cache key must match `VERSION`
- 44px min hit targets across the site

## Open Questions (none blocking)

1. **Dedicated OG image?** Plan reuses `get-started-coding-og.png`. Follow-up.
2. **Cross-link sweep PR.** Plan defers it; confirm at implementation time you want it as the next PR.
