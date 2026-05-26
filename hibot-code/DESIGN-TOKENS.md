# Hi Bot Code — design tokens (aligned with [hibot.space](https://hibot.space/))

This fork matches the **Hi, Bot** marketing site family: near-black canvas, warm off-white type, **amber** accent, editorial section kickers, and **Outfit** + DM Sans typography (display and UI fonts are self-hosted under `/assets/fonts/`).

## Brand

| Token | Value |
|--------|--------|
| Product name | **Hi Bot Code** |
| Parent brand | Hi, Bot |
| Canonical URL | `https://code.hibot.space` |

## Color

| Role | Hex | Notes |
|------|-----|--------|
| Page background | `#0A0A0A` | Matches `theme-color` on hibot.space |
| Primary text (“offwhite”) | `#E8E8E3` | Body copy |
| Muted / secondary | `#8B95A1` | Meta labels, de-emphasized |
| Accent (amber) | `#F5A524` | CTAs, links on hover, punctuation highlights |
| Accent soft | `rgba(245, 165, 36, 0.9)` | Hover fills |
| Accent dim wash | `rgba(245, 165, 36, 0.14)` | Subtle panels / focus rings |
| Panel surface | `#111418` | Cards / nav scrim base |
| Panel elevated | `#1B1F26` | Nested panels |
| Border | `rgba(139, 149, 161, 0.22)` | Default hairlines |
| Border hover | `rgba(139, 149, 161, 0.45)` | Interactive |

**Divergence for a11y:** Legacy mint hover (`#2fc97e`) on amber CTAs was replaced with a darker amber (`#e19412`) so hovers stay on-brand. Focus rings use amber at ~40% opacity like hibot’s `ring-amber/40`.

## Typography

| Role | Stack |
|------|--------|
| Display (H1–H3, logo) | **Outfit** — weights 500–800 (self-hosted in `assets/fonts/fonts.css`) |
| UI / body | **DM Sans** — 400–700 (self-hosted under `/assets/fonts/`) |

`assets/hibot-theme.css` carries theme alignment notes only (no remote `@import`), so first-party pages avoid third-party font requests when paired with local `@font-face` rules.

## Layout & rhythm

| Token | Value |
|--------|--------|
| Content max width | ~1280px container (hibot `container`) |
| Section kicker | `›` in accent color, `text-xs`, `uppercase`, `letter-spacing: 0.18em` |
| Radius | `12px` / `8px` (matches prior studio; hibot uses `rounded-md`/`rounded-lg`) |
| Nav | Sticky, blurred dark bar, bottom border |

## Voice (grades 6–12)

- Short sentences, “you” voice, celebrate curiosity.
- Avoid startup jargon (“ROI,” “ship,” “enterprise”) unless defined in one line for class.
- School-safe: no edgy humor, no personal-data prompts beyond what’s needed.

## Forms (trust & safety)

- Honeypot field `website_url` (hidden, `tabindex=-1`, `autocomplete=off`) — reject non-empty server-side when a backend exists.
- Client: `maxlength`, `type="email"`, `required` only where needed; never stash emails in `localStorage`.
- This static build uses `mailto:` / `#` patterns only where the upstream did; do not add tracking pixels.

## Files

- Global overrides: `assets/hibot-theme.css` (import after `/assets/fonts/fonts.css`).
- CSS variables live in each page’s `<style>:root` block; values were batch-updated to the table above.
