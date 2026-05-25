# Phase 1A: Hater Mode — 12 Persona Teardown

**Subject:** Hi Bot Code (code.hibot.space)

---

### 1. Product Hunt Critic

**Perspective:** Has reviewed hundreds of “learn to code in the browser” launches.

**Main criticism:** Differentiation from CodePen/JSFiddle is buried; the landing leads with “free” and “privacy” but not the unique combo of guided challenges + opaque sandbox + essay-led positioning.

**Specific concern:** Why should someone try this today vs opening CodePen?

**What would need to change:** Above-the-fold line that states the wedge: e.g. “Challenges + offline PWA + no account — built for people who bounced off installing VS Code.”

---

### 2. Hacker News Commenter

**Perspective:** Skeptical of marketing; reads source.

**Main criticism:** “No external dependencies” in README conflicts with reality if any page still implies zero fonts — fonts are self-hosted files, not absence of fonts.

**Specific concern:** Export flows mention third-party platforms; does that violate strictest privacy narrative?

**What would need to change:** Precise language: no third-party *tracking* CDNs; exports are explicit user actions.

---

### 3. Reddit User

**Perspective:** Practical; hates fluff.

**Main criticism:** Name mismatch (“boredgames” vs “Hi Bot Code”) feels like two products stapled together.

**Specific concern:** Is this a toy or a serious alternative to Glitch for beginners?

**What would need to change:** One sentence on every page footer or README: “Hi Bot Code by Bored Games” with stable naming.

---

### 4. X/Twitter User

**Perspective:** Punchy; jokes about devrel.

**Main criticism:** “Anti-slop color bundles” is meme-ready but risks sounding preachy next to “Barbie Pink” legacy presets still in codebase lore.

**Specific concern:** Are we judging beginners’ aesthetic choices?

**What would need to change:** Copy that bundles teach *principles* without shaming neon experimentation.

---

### 5. Facebook User

**Perspective:** Non-technical; safety-first.

**Main criticism:** Child-directed page + exports to many platforms = homework for parents to read notices.

**Specific concern:** Is my kid’s data leaving the browser without me knowing?

**What would need to change:** Keep COPPA notice visible; link from editor export modal once, not buried.

---

### 6. LinkedIn User

**Perspective:** ROI and compliance.

**Main criticism:** Hard to justify “enterprise” use; it’s clearly edu/consumer.

**Specific concern:** WCAG claims need audit evidence in docs, not just assertions.

**What would need to change:** Link to last QA/design audit report paths in CONTRIBUTING or docs.

---

### 7. Indie Hackers Member

**Perspective:** Sustainability obsessed.

**Main criticism:** No visible monetization — fine for OSS, but unclear long-term maintenance story.

**Specific concern:** What happens if domain lapses or SW breaks?

**What would need to change:** Transparent maintenance note (changelog discipline already helps).

---

### 8. Software Tester

**Perspective:** Breaks edge cases.

**Main criticism:** Service worker cache/version drift historically burned users; discipline is good — any missed bump breaks offline trust.

**Specific concern:** `CACHE_NAME` vs `VERSION` mismatch regression.

**What would need to change:** Release checklist already in CHANGELOG — automate-check in CI if possible.

---

### 9. Layperson

**Perspective:** Just wants a webpage.

**Main criticism:** Too many paths — learn tiers, glossary, challenges, editor — overwhelmed before first save.

**Specific concern:** “Where do I click first?”

**What would need to change:** Single primary CTA from home to editor with optional “tour.”

---

### 10. Designer

**Perspective:** Visual consistency.

**Main criticism:** Marketing site and editor may drift over time; mega-eval flagged voice/palette discipline.

**Specific concern:** Do all 74 glossary pages share nav/component parity?

**What would need to change:** Regeneration pipeline documented (already partially in CONTRIBUTING).

---

### 11. Late Adopter

**Perspective:** Why not W3Schools?

**Main criticism:** Established brands dominate search; this needs word-of-mouth or niche positioning.

**Specific concern:** Will it work on my old iPad?

**What would need to change:** Clear browser support section that matches reality.

---

### 12. General Hater

**Perspective:** Contrarian.

**Main criticism:** Another static learn-to-code asset in a crowded market — either the essay + anti-slop stance lands emotionally or it’s noise.

**Specific concern:** What’s the one story only this product can tell?

**What would need to change:** Lead with `why-i-built-this.html` narrative in more surfaces (footer OK; consider homepage quote).
