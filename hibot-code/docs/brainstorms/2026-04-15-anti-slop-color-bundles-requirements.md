---
date: 2026-04-15
topic: anti-slop-color-bundles
---

# Anti-Slop Color Bundles

## Problem Frame

The editor's existing color sidebar (bg / text / accent / border pickers, plus a handful of legacy presets) lets a beginner change any colour to any value. Challenge 1 fires on any change from the defaults, so a learner can "complete" it with neon-pink background + neon-cyan text + violet accent and walk away feeling like they succeeded — but the page they made looks AI-generated, not hand-crafted. That's slop.

The just-shipped launch essay (`/why-i-built-this.html`) argues for **craft and agency vs. vibe coding**: the whole positioning is "this tool helps you produce something that doesn't look like v0 generated it." The product currently doesn't back that claim with any mechanism. A beginner has agency (they typed the HTML) but no craft scaffolding for the visual part — and colour is where beginners slop first and worst.

This is a narrow, high-leverage gap: give users a curated set of palettes that *teach a principle* (not just "pretty colors"), positioned at the top of the colour panel, so the default path leads to a good outcome while the individual pickers stay available for anyone who wants to iterate off the baseline.

## Requirements

- **R1. Ship seven curated color bundles** in the editor's existing colour panel, as a new "Start with a palette" section at the top of that panel. Each bundle is a set of three hex values (background, text/ink, accent) designed to avoid the common AI-generated-landing-page palettes (purple-pink-cyan gradients, neon-on-black cyberpunk, Tailwind `slate/violet/emerald` defaults).

  | Bundle | Background | Ink | Accent |
  |---|---|---|---|
  | Editorial | `#fafaf7` | `#1a1a1a` | `#c0392b` |
  | Studio    | `#0f1117` | `#e8eaed` | `#5eead4` |
  | Library   | `#f5ecdb` | `#2d2419` | `#7a3b32` |
  | Chalkboard | `#2b2d36` | `#f3ebd8` | `#d4a84b` |
  | Newsprint | `#ffffff` | `#111111` | `#e63946` |
  | Meadow    | `#f4efe6` | `#2e3828` | `#b36a3f` |
  | Memo      | `#faf4dc` | `#0a0a0a` | `#253245` |

- **R2. Each bundle carries a one- or two-sentence inline rationale** visible at-glance next to (or beneath) the bundle chip. The rationale names the principle the bundle is teaching, not just the aesthetic. Example rationale copy (final wording is a planning-time draft):
  - *Editorial* — "Black on off-white with a single red. One accent forces you to prioritize — this is what The New Yorker has done for 100 years."
  - *Studio* — "Dark mode without neon. Restraint is the whole move — pick one bright hue, use it sparingly."
  - *Library* — "Warm cream and brown. Feels handmade on purpose; AI tools rarely land here."
  - *Chalkboard* — "Dark doesn't have to feel tech. Warmth distinguishes from dashboard slop."
  - *Newsprint* — "Pure black and white with a single pop of red. Radical by being normal."
  - *Meadow* — "Nature colours don't look AI-generated, because AI hasn't learned them well."
  - *Memo* — "Pre-digital references read distinctive. The web didn't invent design."

- **R3. One-click apply.** Clicking a bundle instantly updates `bg`/`ink`/`accent` in the editor's visible preview (and the generated HTML's inline CSS tokens) with no confirm step. Works the same as the existing individual colour pickers: write-through to `state`, stateToCode → codeToPreview chain.

- **R4. Every bundle passes WCAG-AA body-text contrast** (4.5:1 minimum for ink-on-background). This is a hard gate — no bundle ships if it fails. Accent-on-background is not required to hit 4.5:1 (often used for large text / decorative elements), but should hit 3.0:1 minimum.

- **R5. Bundles augment, never replace, the existing per-colour pickers.** The bg/text/accent/border sliders stay exactly where they are beneath the bundle grid. Users who pick a bundle and then fine-tune via the pickers should get their fine-tunes preserved.

- **R6. A one-line section header** above the bundle grid states the framing. Proposed copy: *"Start with a palette. Each one is shaped to avoid the AI-generated-landing-page patterns every modern site falls into."* Final wording drafted at planning time; the intent is "these aren't themes, they're lessons" stated plainly.

- **R7. Bundle choice is persisted in `localStorage`** as an identifier (e.g., `"editorial"` or none), so reload restores the same starting palette and the user can see which bundle they started from. If they've since tweaked individual pickers, the persisted bundle id is just an audit-trail; the live colour state wins.

## Success Criteria

- Opening the editor shows the seven bundles at the top of the colour panel on the first paint, before any existing picker.
- Clicking any bundle: the preview updates in < 300 ms (matches existing colour picker feel); state updates; code regenerates; localStorage persists.
- Each bundle's rationale is readable in the panel without hover — no information is hidden behind an interaction.
- All seven bundles pass WCAG-AA contrast audit; audit rerun is a trivial follow-up any time bundles are added or edited.
- A first-time user who picks a bundle, completes Challenge 1, and downloads the page should produce a page that doesn't read as AI-slop — verified by a side-by-side eyeball check against a v0-generated page during QA.
- Challenge 1 still fires correctly when a user either picks a bundle or twiddles individual pickers (behaviour unchanged from today).
- No new external dependencies, no new fonts, no new network requests. Trust & Safety invariants from `/why-i-built-this.html` §8 are preserved.

## Scope Boundaries

- **Not in this sprint:** typography bundles. Fonts stay as they are; this is a colour-only feature. A future "Type bundles" sprint can mirror the same pattern (curated pairings + inline rationale + one-click apply) but is out of scope now.
- **Not in this sprint:** automatic slop detection / nag prompts ("you've picked 4 high-saturation colours, try fewer"). Tempting; too easy to be wrong; pisses users off.
- **Not in this sprint:** user-submitted / community bundles. No backend, no moderation queue, no contribution flow. The seven curated bundles are the product.
- **Not in this sprint:** changes to Challenge 1's pass condition. It still fires on any colour change. Hardening it to require a bundle pick or a "coherent palette" would regress existing users and feels punitive.
- **Not in this sprint:** the `border` colour. Bundles set bg/ink/accent only; border stays at its current default or at whatever the user last set it to. Keeps the feature small and the three-colour principle visible.
- **Not in this sprint:** thumbnails/previews beyond the literal hex chips. A bundle card can show three coloured squares plus a name plus rationale — that's the whole UI. No hero mockup, no "see how it looks" inline preview.
- **Not in this sprint:** a `/craft/color.html` essay page. The earlier brainstorm question rejected this in favour of inline teaching. If demand emerges post-launch, it can be a later post.

## Key Decisions

- **Inline rationale, not a separate page.** User decision (brainstorm Q1). Rationale: teaching-per-click is highest when the principle is visible at the moment of choice.
- **Seven bundles, all seven including Memo.** User decision (brainstorm Q2). Rationale: seven gives enough taste range to cover editorial/tech/warm/cool/B&W/nature/pre-digital without paralysing the user.
- **Every bundle uses one accent.** Non-negotiable. The single-accent principle is the biggest anti-slop move in web design; the whole set reinforces it.
- **Bundles augment, don't replace, individual pickers.** Preserves user agency. Removes the "feature is a jail" risk.
- **Bundles map only bg/ink/accent.** Keeps the lesson tight ("three colours is often enough") and avoids touching `border` which has ambiguous defaults.
- **No typography in this feature.** Out of scope on purpose; keeps this shippable in one sprint and sets up a clean follow-up feature.
- **No slop-detector nag.** Positive framing only ("here's what world-class looks like"), not finger-wagging.
- **Named evocatively, not generically.** "Editorial" / "Chalkboard" / "Meadow" teach via reference; "Blue 1" / "Dark 2" would not.
- **WCAG-AA body text contrast is a hard gate.** The product can't claim "world-class" while shipping unreadable palettes.

## Dependencies / Assumptions

- **Assumption:** the editor's existing `state` object has keys for `bgColor`, `textColor`, `accentColor` (and `borderColor`), and `stateToCode` / `codeToPreview` write through to the rendered HTML. Confirmed in earlier sessions when Trust & Safety sprint R2 touched this area.
- **Assumption:** the colour panel in `editor.html` is a discrete, findable section (probably has a heading like "Colors" or "Theme") that a new bundle grid can land at the top of without disturbing surrounding layout. Planning verifies the exact insertion point.
- **Assumption:** `safeLocalStorageSet` / `safeLocalStorageGet` already wrap localStorage and tolerate quota/parse errors — reuse these for the bundle-id persistence (R7), don't roll a new helper.
- **Assumption:** CSS custom-property tokens (`--bg`, `--ink`, `--accent`) are what the generated HTML uses, so applying a bundle = updating three tokens. No framework, no theme provider.
- **No new dependencies:** pure HTML/CSS/JS. No colour library, no contrast-checker library (we ship verified-in-advance bundles, we don't validate dynamically).

## Outstanding Questions

### Resolve Before Planning

*(none — product decisions are settled.)*

### Deferred to Planning

- **[Affects R1, R2][Technical]** Exact visual layout of each bundle card in the colour panel — chip arrangement, typography scale for name vs rationale, spacing. Planning should reference the existing design-system tokens already in `editor.html`.
- **[Affects R3][Technical]** Does the existing colour-change path trigger the achievement/challenge validator in one go if `bg`, `ink`, `accent` all change simultaneously? Or do we need to fire three separate writes? Planning verifies.
- **[Affects R4][Needs research]** Contrast-check all 7 bundles before merge — confirm every ink-on-bg pair clears 4.5:1 and every accent-on-bg pair clears 3.0:1. If any fail, nudge the hex and re-check.
- **[Affects R6, R7][Copy]** Final wording of section header ("Start with a palette…") and each bundle's rationale. Planning drafts 2–3 candidates per bundle; user selects before commit.
- **[Affects R7][Technical]** `localStorage` key name for persisted bundle id — probably `currentBundle` or `startedFromBundle`, matching the editor's existing naming pattern.
- **[Affects R5][Technical]** When a user picks a bundle and then tweaks an individual picker, does the "started from X" indicator stay visible (to remind them of the baseline), or clear (to stop claiming they're using the bundle)? Product call at planning time.

## Next Steps

→ `/ce:plan` for structured implementation planning
