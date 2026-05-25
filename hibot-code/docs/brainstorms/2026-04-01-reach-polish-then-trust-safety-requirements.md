---
date: 2026-04-01
topic: reach-polish-then-trust-safety
---

# Reach & Polish, Then Trust & Safety

## Problem Frame

Hi Bot Code is **already live** with a strong feature set and a written [`WORLD_CLASS_ROADMAP.md`](../../WORLD_CLASS_ROADMAP.md). The product goal for the next planning cycle is to **improve discovery, first-run clarity, and “feels complete” polish first** (reach), then **invest in validation, calm error handling, and accessibility preferences** (trust). This ordering is a deliberate product choice: **surface value and orientation before deepening the safety net**—not because safety is unimportant, but because the next increment of user trust includes *finding* and *understanding* the tool before *depending* on its guardrails.

**Who is affected:** New visitors (SEO/social), first-time editors, and returning users on slow or flaky networks (PWA/offline perception).

## Requirements

### Phase A — Reach & polish (ship first)

- **R1. Landing & share cards** — Audit and refine the primary marketing entry (`index.html` and any linked “home” entry) so title, meta description, Open Graph, and Twitter tags consistently communicate: **free, no sign-up, no tracking**, and the **single clearest outcome** (“build your first site in the browser with live preview”). Fix any stale wording or mismatched claims discovered during audit.
- **R2. Showcase credibility** — Improve `showcase.html` so it shows **at least two concrete “what you can build” examples** (static previews, embedded demos, or reputable outbound links such as CodePen) plus a **direct CTA** into the editor or learning path. Copy must not promise community submissions you do not collect unless you add a no-backend submission path (e.g. link-out) per roadmap.
- **R3. First-run / empty-state CTA** — On the main editor experience, when the user is on a **default or empty starting state**, show a **single obvious next step** (e.g. choose a template, start guided tour, or open learning path)—no blank confusion. Exact control placement is planning detail; the requirement is **visible orientation within the first session**.
- **R4. Installable & offline-first impression** — Align PWA behavior with the roadmap: **manifest** remains accurate; **service worker** registration and cache scope should make the **primary user journeys** (land → open editor → core assets) work sensibly offline or on repeat visits, without breaking the privacy-first story. Close obvious gaps (e.g. landing not registering SW if editor already does).

### Phase B — Trust & safety (after Phase A acceptance)

- **R5. Template safety validation** — Implement **Phase 2 (pending)** from [`SAFETY_IMPLEMENTATION_PLAN.md`](../../SAFETY_IMPLEMENTATION_PLAN.md): validate templates on apply/load (required fields, color validity, dangerous patterns) and **block or safely degrade** unsafe content with a clear outcome for the user.
- **R6. Beginner-friendly errors** — For high-frequency failure paths (invalid color, oversized input, template load/save failures), show **short, reassuring copy** plus **what to try next**, consistent with the tone and structure outlined in the safety plan—not raw console-style errors.
- **R7. `prefers-reduced-motion`** — Respect user OS preference for reduced motion on **non-essential animations** (e.g. decorative transitions) across the main editor and key marketing pages touched in Phase A.
- **R8. `prefers-contrast`** — Improve **perceived contrast** for users who request higher contrast (e.g. borders, focus rings, text on accents) without abandoning the existing dark brand—implementation may be incremental (critical surfaces first).

## Success Criteria

- **Phase A:** A new visitor can answer **what this is** and **what to click** within one screen; showcase demonstrates **realistic outcomes**; editor default state has a **clear CTA**; PWA path is **coherent** from main entry (install/offline behavior acceptable per acceptance in planning).
- **Phase B:** Unsafe or invalid templates **cannot silently apply**; error states are **understandable to beginners**; spot-check with **reduced-motion** and **high-contrast** system settings shows **meaningful improvement** on primary flows.

## Scope Boundaries

- **No backend**, **no accounts**, **no third-party analytics** — consistent with product positioning.
- **No real-time collaboration**, **no cloud project sync** — out of scope.
- **Phase B** starts after Phase A meets its success criteria (unless team explicitly agrees to parallelize—default is **sequential** per product decision).

## Key Decisions

- **Order:** Reach & polish **before** trust & safety hardening (user-selected: 3 then 4), which differs from the roadmap’s *default* week-1 ordering but is intentional: prioritize **findability and first success**, then **deeper safety net**.
- **Roadmap alignment:** Phase A maps to roadmap Tier 1 items **4–5**, **10**, and Tier 2 **PWA (#6)**; Phase B maps to Tier 1 **1–3** (safety + motion/contrast + “what’s next” links can be split: safety items here; “what’s next” can follow or ship in parallel as a small add-on—**defer “what’s next”** unless pulled into Phase A as polish).

## Dependencies / Assumptions

- [`SAFETY_IMPLEMENTATION_PLAN.md`](../../SAFETY_IMPLEMENTATION_PLAN.md) remains the source of truth for **what “Phase 2 safety”** includes; this doc translates it into **product requirements**, not pseudocode.
- `editor.html` is assumed to be the **primary building surface** unless planning discovers a different primary route.

## Outstanding Questions

### Resolve Before Planning

- *(none — sequencing and scope are explicit; remaining items are implementation choices.)*

### Deferred to Planning

- **[Affects R3][Technical]** Exact definition of “empty/default” state in the editor (which stored keys, which template id).
- **[Affects R4][Technical]** `sw.js` cache list, versioning, and whether `index.html` should register the same worker as `editor.html`.
- **[Affects R2][Needs research]** Best format for showcase examples (static HTML snapshot vs outbound link) given maintenance cost.
- **[Affects R7–R8][Technical]** Inventory of animated elements and lowest-risk contrast tokens to adjust first.

## Next Steps

→ `/ce:plan` for structured implementation planning against this document (repo path: `docs/brainstorms/2026-04-01-reach-polish-then-trust-safety-requirements.md`).
