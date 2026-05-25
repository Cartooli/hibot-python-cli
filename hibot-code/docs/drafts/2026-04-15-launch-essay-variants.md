---
title: Launch essay — platform-specific variants
date: 2026-04-15
status: draft
canonical_url: https://code.hibot.space/why-i-built-this.html
notes_to_self:
  - All variants point at the canonical essay URL. Don't paraphrase the whole piece in each variant — the body is the canonical, variants are the entry surfaces.
  - Every title and opening has been matched to the platform's culture. Do not cross-use (e.g. don't post the HN body on Reddit — Reddit audiences dislike the HN register, and vice versa).
  - Sequence recommendation: HN Show → r/learnprogramming show-your-project thread → Dev.to cross-post (day 1–2). Mastodon/Bluesky thread at HN post time. IndieHackers + LinkedIn on day 3–5 once the piece has some signal.
  - Don't post to HN before ~10 a.m. PT on a weekday — that's the empirical sweet spot for Show HN discovery. Avoid Fridays.
  - Expected friction on each platform is noted under "Be ready to answer."
---

# Launch essay — platform variants

Canonical article: `https://code.hibot.space/why-i-built-this.html`

Six variants below. Each is ready to paste.

---

## 1. Hacker News — Show HN

**Posting URL:** https://news.ycombinator.com/submit

**Title (73 chars):**

> Show HN: A zero-install HTML editor for people who bounced off VS Code

**URL field:** `https://code.hibot.space/why-i-built-this.html`

**Text field (optional on Show HN, recommended):**

> I built this after watching three friends in a row try to learn HTML in 2026 and give up during the VS Code install. It's a static single-page bundle: editor in one pane, live preview in the other, five short challenges, zero sign-up. The iframe that runs user code is sandboxed to an opaque origin, there are no external network requests, fonts are self-hosted.
>
> The thesis, and the reason I wrote it up rather than just shipping the tool quietly: the barrier to learning HTML in 2026 isn't HTML. It's the toolchain, the account wall, and the surrounding noise. v0 and Lovable are fine output tools and useless literacy tools — you can't read what you didn't write. A browser sandbox with a real challenge path is still, in 2026, the fastest route from "I've never coded" to "I shipped a page."
>
> Architecture notes for the HN crowd: no backend, no database, no analytics. MIT license, full source at https://github.com/Cartooli/Hi Bot Code. Hosted on GitHub Pages. Hosting cost rounds to $0, which is the load-bearing answer to "will this be here next year."
>
> I'd love critique — especially from anyone who's watched a beginner hit a wall with a different tool.

**Be ready to answer (top 5 comment patterns to expect):**

1. **"Just another CodePen."** — Preempted in §3. Reply: *CodePen is a better tool for people who already write code; this one is narrower, aimed at the ninety minutes before a first-time learner knows what a pen is. I use CodePen daily.*
2. **"Why not just learn VS Code?"** — Reply: *Eventually, yes. This is the on-ramp, not the highway. Four out of five friends I've walked through VS Code quit during setup. The ones who did these challenges first came back to VS Code later.*
3. **"Privacy claim smells."** — Reply: *Open DevTools → Network tab → type in the editor → you'll see zero external requests. Fonts are self-hosted. The iframe sandbox (`allow-forms allow-popups allow-scripts`, no `allow-same-origin`) means user code can't reach the parent's localStorage either. PRs welcome if you find a leak.*
4. **"Why learn HTML when v0/Lovable generate it?"** — §2 and §5 of the essay directly. Reply: *You can use v0 daily and also know what HTML is. The frame is craft and agency vs. vibe coding, not versus.*
5. **"No monetization — dead in a year."** — Reply: *Static bundle, no backend, no database, no ops clock. MIT-licensed on GitHub. If I stop, anyone can fork it. The tool is engineered to not need a business model.*

**Tags:** none (HN has no tags).

**Flair:** `Show HN` is automatically applied via the title prefix.

---

## 2. r/learnprogramming

**Posting URL:** https://www.reddit.com/r/learnprogramming/submit (text post)

**Rule check first:** r/learnprogramming has strict self-promotion rules. Submit to the **weekly "What are you working on?"** thread first. If it gets ≥20 upvotes there, then the top-level post is fair.

**Title (78 chars):**

> I was tired of sending beginners to tools that made them quit, so I built this

**Body (text post, Markdown — 380 words):**

> A friend asked me to teach her HTML last month. She's 34, works in marketing, smart, motivated, has dabbled in `<h1>` tags when editing Mailchimp templates. She'd already tried three tutorials and given up:
>
> - freeCodeCamp asked for an account before she could render a page.
> - The VS Code install wanted her to run a terminal command, which she didn't recognize.
> - Replit asked for her phone number.
>
> She closed all three and decided she was "just bad at computers."
>
> She's not. She's hitting the 2026 onboarding gauntlet, and so is everyone in this subreddit's weekly "I'm overwhelmed, where do I start" thread. HTML is still exactly as simple as it was in 2005 — angle brackets, a tag, some text. What's changed is that every tool built to teach it now assumes you already know what a terminal is.
>
> So I built the opposite: **[code.hibot.space](https://code.hibot.space)**. Static site, single URL, no sign-up, no install, no email capture. Editor in one pane, live preview in the other. Type `<h1>Hello</h1>`, watch it render in the next pane. Five short challenges take you from colours to a responsive layout.
>
> The full write-up (why I built it, what I deliberately cut, what happened with my friend) is here: https://code.hibot.space/why-i-built-this.html
>
> **What it isn't:**
>
> - Not a replacement for VS Code. VS Code is where you go next; this is the on-ramp.
> - Not a substitute for freeCodeCamp's deep curriculum. They're much broader.
> - Not competing with CodePen. CodePen is a better sandbox for people who already code.
> - Not AI-in-the-editor. On purpose. The first twenty minutes should be your characters, not the AI's.
>
> **If you're stuck on step zero**, try the first challenge (Colors). It takes three minutes. If it clicks, you'll know. If it doesn't, you've lost nothing — no account to delete, no email to unsubscribe from.
>
> Happy to answer questions, take criticism, or explain any design choice.

**Be ready to answer:**

- **"How is this different from w3schools Tryit?"** — *w3schools is a snippet runner without a path. This is a five-challenge progression with progress tracking, and you can save multiple projects locally. It's also ad-free.*
- **"I'm a beginner, where should I actually start?"** — Link them directly at `https://code.hibot.space/challenges/colors.html`. Not the homepage, not the editor. The challenge page. Friction budget.
- **"Does this replace [other tutorial]?"** — *No. After the five challenges, go do freeCodeCamp's Responsive Web Design cert. This gets you past the opening flinch.*

---

## 3. Dev.to — full cross-post

**Posting URL:** https://dev.to/new

**Title (82 chars — Dev.to allows up to 128):**

> You don't need a toolchain to learn HTML. You need to see it render.

**Canonical URL field:** `https://code.hibot.space/why-i-built-this.html` (important — set this so Google doesn't punish duplicate content).

**Tags:** `#beginners` `#html` `#webdev` `#learning`

**Cover image:** upload `get-started-coding-og.png` or create one.

**Body — prepend this Dev.to-specific intro paragraph to the full essay:**

> *A note for Dev.to readers, who are mostly several years past their first `<h1>`: this piece is written for a beginner I've been coaching, not for you. But the reason I'm cross-posting it here is that the Dev.to crowd is the set of people most likely to hand the link to their own career-curious friend, parent, or younger sibling. If one of your 11 p.m. text-message conversations goes better because of this, I'll be happy. There's a craft question underneath the story — craft and agency vs. vibe coding, section 5 — that I think applies to us too. But it's a 2,400-word essay and you probably skim. Skip to §5 if you're curious and §6 if you care about the sustainability angle.*

Then paste the full essay body from `docs/drafts/2026-04-15-launch-essay-draft.md` (everything from the H1 through the CTA). Dev.to renders Markdown natively — all code spans, links, headers port cleanly.

**Don't** wrap it in a Dev.to "series" — this is a one-off.

**Expected Dev.to reception:**

- Middle-tier engagement. Dev.to readers share liberally and this piece is share-friendly ("I know someone who needs this").
- Some "why not use VS Code" comments — same reply as the HN list.
- Occasionally someone wants to contribute a translation or a new challenge. Welcome that; MIT license makes PRs easy.

---

## 4. IndieHackers — ethics/economics angle

**Posting URL:** https://www.indiehackers.com/post

**Category:** Launches or General.

**Title (66 chars):**

> I built a free-forever tool by refusing to have a backend

**Body (600 words — lead with Hook C, expand §6 as the lede):**

> There is a URL I've been sending to friends for months. It loads in under a second, doesn't ask for an email, and shows them their HTML rendering live in the next pane within five seconds of opening. About one in three of them actually finishes the first challenge. Every other tool I've sent people to — VS Code, freeCodeCamp, CodePen, Replit — converts far worse than that, and I want to tell you why, because the "why" is a business-model answer, not a UX one.
>
> The tool is a static single-page site: editor in one pane, live preview in the other, five short challenges, zero sign-up. It's called Hi Bot Code and it lives at [code.hibot.space](https://code.hibot.space).
>
> **Here's the business model.** There isn't one. No ads, no paid tier, no freemium, no "pro," no email list, no investor behind me. The site runs on GitHub Pages for free. The marginal cost of another user is zero. The tool can sit at fifty users or fifty thousand users on the same bill, which is $0.
>
> For most indie products this would be a red flag. Here's why I think it's the whole advantage:
>
> **No clock.** Every VC-backed learning tool has to monetize or die. That pressure inevitably becomes tracking, paywalls, and pushy upgrade prompts — the failure mode that turns a beloved free tool into the thing everyone recommends with an asterisk. I don't have that pressure. I can stay small on purpose.
>
> **No enshittification vector.** The reason most free tools drift toward ads isn't malice. It's survival. I've eliminated the survival problem by eliminating the operating costs, and I eliminated the operating costs by refusing to have a backend. No database = no database cost. No accounts = no auth provider cost. No telemetry = no observability cost. The tool does one thing — host static files — which is the single cheapest thing on the internet.
>
> **Structural privacy.** Because there's no backend, there's nothing to track with. I can tell the 2026 parent handing a laptop to a kid that the tool collects nothing, and mean it. The iframe that runs user code is sandboxed to an opaque origin, fonts are self-hosted, and you can verify with DevTools. (I published a full post on why I can make this promise: [code.hibot.space/why-i-built-this.html](https://code.hibot.space/why-i-built-this.html).)
>
> **Bus factor mitigated by architecture.** MIT-licensed, full source on GitHub. If I lose interest or get hit by a bus, anyone — including you — can fork it and keep it running. The "will this be here next year" question has a mechanism, not a promise.
>
> The thing I care about for IH: this isn't a business. It's a product I wanted to exist. The fact that hosting it costs $0/month is the *reason* it can keep existing without a business. If you're building a side project and agonizing over how to turn it into an LLC with a Stripe integration, consider whether you actually need to. Some of the best tools are the ones someone felt like building and the internet happens to use.
>
> Full essay with the "friend-who-quit" story that kicked this off: https://code.hibot.space/why-i-built-this.html

**Expected IH reception:**

- Higher-engagement than Dev.to because the economic angle is core IH content.
- Some pushback: "if you monetized even a tiny bit, you could fund more features." The honest answer is that the whole design depends on NOT monetizing. A single ad script is a privacy violation. A $5 Stripe tier is five more things to support.
- Some "how did you validate demand?" — answer: *I didn't validate demand. I built a thing three of my friends needed, one at a time. If you've got a friend who can't learn HTML, this is validation.*

---

## 5. Mastodon / Bluesky — short thread

**Format:** 4 posts. Mastodon default char limit 500; Bluesky 300. Written to fit Bluesky (tighter constraint); trivially wider on Mastodon.

**Post 1/4 (267 chars):**

> Watched three friends in a row try to learn HTML in 2026 and give up during the VS Code install.
>
> So I built the opposite: a browser-only HTML editor. No install, no sign-up, no tracking. Type a tag, watch it render. Five short challenges.
>
> 🧵

**Post 2/4 (287 chars):**

> The barrier to learning HTML in 2026 isn't HTML. It's the toolchain, the account wall, the surrounding noise.
>
> v0 and Lovable are fine output tools and useless literacy tools — you can't read what you didn't write. You can use both. One doesn't replace the other.

**Post 3/4 (294 chars):**

> Architecture: static single-page site, no backend, no database, no analytics. MIT-licensed.
>
> Fonts self-hosted, iframe sandbox, zero external requests. Open DevTools and verify.
>
> Runs on GitHub Pages for $0. Can sit at 50 users or 50k users on the same bill (which is nothing).

**Post 4/4 (249 chars):**

> The first challenge — pick three colours and watch the page update — takes three minutes. If it clicks, you'll know.
>
> Full write-up (and the friend-who-quit story that started this):
>
> https://code.hibot.space/why-i-built-this.html

**Image:** attach a small screenshot of the editor mid-challenge on post 1 or post 4.

**Hashtags (Mastodon only — Bluesky is lukewarm on hashtags):** `#WebDev #LearnToCode #HTML #IndieWeb`

---

## 6. LinkedIn — career-switcher frame

**Posting URL:** https://www.linkedin.com/feed/ (create a post → Article if you want a first-class blog, or regular post for feed reach)

**If regular post (recommended — Articles get less reach in 2026):**

**Body (~480 words):**

> I stopped sending career-curious friends to VS Code.
>
> Every few months someone in my network — marketing ops, project manager, HR partner, parent of a middle-schooler — tells me they want to "finally learn to code." I used to send them to VS Code, YouTube tutorials, freeCodeCamp, Codecademy. Then I watched the conversion rate.
>
> Out of the last dozen people I've coached through that path, two made it past the first week. The rest hit some version of the same wall: VS Code doesn't install cleanly, or Live Server isn't obvious, or freeCodeCamp's account wall sends them away before rendering a single page. They decide they're "bad at computers" and close the laptop.
>
> The thing is, they're not bad at computers. They're hitting a 2026 onboarding problem: every tool that teaches HTML today was built around the ergonomics of professional developers, and absolute beginners don't have that vocabulary yet.
>
> So I built a browser-only alternative — no install, no sign-up, runs entirely in the browser tab. It's free, MIT-licensed, and lives at code.hibot.space. Editor in one pane, live preview in the other, five short challenges to go from "change three colours" to "make it responsive."
>
> For the career-curious people in my network, the thing I want you to know is that the twenty-minute version of "is coding for me" now exists. Not a bootcamp. Not a tutorial series. Not a sign-up. Twenty minutes in a browser tab. If it clicks, you'll know — and you'll have typed real HTML, not clicked through a gamified course.
>
> For the technical people in my network: if you have a friend, a sibling, a partner, or an intern who's wanted to learn HTML and bounced off the tooling, this is the link. It won't take them further than VS Code would, but it'll get them past the first rendered tag, which is where 80% of the drop-off happens.
>
> Full write-up on why I built it, what it deliberately doesn't do, and what happened with the first friend I gave it to:
>
> 👉 https://code.hibot.space/why-i-built-this.html
>
> I'd genuinely love to hear from anyone in my network who's coached a career-switcher through their first HTML. What worked, what didn't, where they got stuck. Reply in the comments or DM me.

**Hashtags (4 is the LinkedIn 2026 sweet spot):**

> #LearnToCode #CareerChange #WebDevelopment #Coding

**Image:** square-crop of the editor running challenge 1. Aim for legibility at LinkedIn's small feed size (stick to the hero + one challenge card in view).

**Don't:**

- Don't tag colleagues unless they've explicitly agreed.
- Don't use the vibe-coding discourse (v0/Lovable framing). LinkedIn audiences skew outside that conversation; it reads as niche Twitter drama.
- Don't mention monetization ("no VC, no clock" reads as preachy here). IH is the right venue for that framing.

---

## Posting Sequence (suggested)

| Day | Action | Expected outcome |
|-----|--------|------------------|
| Day 1, Tue–Thu 10 a.m. PT | HN Show HN | Surge of traffic for ~6 hours. Main feedback window. |
| Day 1, same day | Mastodon / Bluesky thread | Ambient visibility; some HN cross-pollination. |
| Day 2 | r/learnprogramming **weekly-thread** submission | Soft test with the actual ICP. |
| Day 2–3 | Dev.to cross-post | Slow-burn share volume; good for SEO via canonical. |
| Day 3 (if r/lp thread got traction) | r/learnprogramming top-level post | Potential second traffic surge. |
| Day 3–4 | IndieHackers post | Economics-angle readers; different audience than HN. |
| Day 5 | LinkedIn post | Professional-network reach; career-switcher audience. |

**Do not** post to every platform simultaneously on day 1. Let HN breathe. If HN goes sideways (sub-top-30 and dropping), do r/lp day 2 anyway — that audience is the actual ICP and HN is incidental.

**Privacy check before any post:** the essay's §8 claim ("no third-party fonts loading from a CDN") depends on the Trust & Safety sprint being live in prod. It is, as of 2026-04-14. Verify once more from an incognito DevTools session before the first post.
