---
date: 2026-06-01
topic: viewer-download-hosted-share
---

# HTML Viewer — download file & optional hosted share links

## Problem Frame

People with HTML/CSS/JS (often from a chat or tutorial) need to **show the rendered result** to someone who is not technical. Today the viewer supports **live preview** and **copying a self-contained `#code=` link**, but long snippets produce **very long URLs** (fragile in chat apps, SMS, email clients) and there is no **one-click “save as .html”** for offline handoff. A **short, stable URL** that resolves to the same sandboxed render for ~24 hours would reduce friction; longer retention could be a paid tier if storage and abuse handling become real costs.

## Current product (baseline)

- `viewer.html` already loads shared content from `.../viewer.html#code=<encoded payload>` and copies that URL on **Share** (see `hibot-code/viewer.html`, `fromShareLink` / share button handler).
- **Save as PDF** exists (print bridge to sandboxed iframe).
- Sharing is **client-only** (no server persistence); meta copy still says “no download” in places — PDF/download UX copy may need alignment when HTML download ships.

## Requirements

- R1. **Download HTML**: User can download a single `.html` file that reproduces the current preview (HTML + CSS + JS inlined or embedded so opening the file in a browser shows the same result as the sandbox preview), with a clear label (e.g. “Download HTML”).
- R2. **Preserve non-goals for download**: Downloaded file is a convenience artifact; document that it is **not** a security boundary (recipient runs it like any HTML file). Sandbox guarantees apply to the **on-site** preview, not the downloaded file.
- R3. **Hosted short link (optional phase)**: User can create a **short URL** (e.g. `/v/<id>` or query param) that loads the same rendered experience **without** putting the full payload in the fragment. Content is **retrievable only for a bounded TTL** (default **24 hours** unless product decides otherwise).
- R4. **Expiry UX**: Recipient sees a clear message when a link has expired (what happened + CTA back to viewer or “create your own”).
- R5. **Abuse and cost awareness**: Hosted shares require **rate limits**, **size caps**, and **logging** (request counts, storage footprint, error rates) sufficient to decide if $5/mo “longer-lived links” is justified later — no need to launch billing until metrics show cost or demand.
- R6. **Privacy stance**: Make explicit in UI whether hosted snippets are **readable by anyone with the URL** (assume yes for MVP) vs future “private” mode.

## Success Criteria

- Non-technical sender can **email or message** either a short link or a **single attachment** and the recipient sees the intended render without pasting code.
- Share path does not materially degrade **viewer load time** for users who never use hosted links.
- Ops can answer: **how many** hosted blobs/day, **average size**, **bandwidth** — to gate a “Pro / longer TTL” offer.

## Scope Boundaries

- **Not** in MVP: arbitrary multi-day hosting for free; account system **unless** required for Pro; server-side execution beyond what the iframe already does for preview.
- **Not** promising unfurl/preview cards in Slack/iMessage for arbitrary JS apps (OG tags won’t run user JS); success is **browser opens → render**.

## Key Decisions

- **Primary pain (2026-06-01)**: Senders need a **file attachment** path (email and similar) more than shorter URLs — prioritize **Download HTML** and clear “send this file” guidance.
- **Tier 0 (ship first, low cost)**: “Download HTML” + improved **in-product explanation** of existing `#code=` share (when to use vs when URL is too long).
- **Tier 1 (follow-up if still needed)**: Hosted paste with **24h TTL**, caps, and metrics — **short id in path**, not giant hash.
- **Tier 2 (revenue, only if metrics justify)**: Paid longer TTL (e.g. 7–30 days) at ~**$5/mo**; definition of “longer” and whether it requires login is **deferred to planning** after Tier 1 usage data.

## Dependencies / Assumptions

- Hosted shares need **some durable store** (KV, object storage, or serverless DB) and **HTTPS deployment** for the fetch route — not static-only.
- Existing static `viewer.html` can remain; hosted mode may be a thin loader page or API + same render pipeline.

## Outstanding Questions

### Resolve Before Planning

_(empty — primary pain confirmed: attachment / Download HTML first.)_

### Deferred to Planning

- [Affects R3][Technical] Exact **max payload** and **encoding** for hosted blobs; **CSP** and **sanitization** policy for stored HTML (same as live preview or stricter).
- [Affects R5][Needs research] Cheapest acceptable stack on current host (e.g. Vercel KV + edge function vs external).

## Next Steps

- If “Resolve Before Planning” is empty: `→ /ce:plan` (or repo-specific planning) using this doc.
- Else: resume brainstorm with one blocking answer, then plan.
