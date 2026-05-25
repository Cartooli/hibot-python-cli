---
title: I built a browser-only HTML editor because VS Code made my friend quit
date: 2026-04-15
status: draft
origin_outline: sessions/mega-eval-2026-04-14/05-content-strategy-outline.md
target_audience: adult self-learner (25–45), career-curious, bounced off VS Code
target_length: ~2,200 words
primary_destination: blog post on code.hibot.space + HN Show variant + r/learnprogramming variant + Dev.to cross-post
notes_to_self:
  - The opening anecdote below is written as described in the outline (friend, 34, Mailchimp, three failed tutorials). If the real friend's details differ, change them — the narrative beats (three failed tools, "just bad at computers," pink h1, "is this what coding is?") are what land. Honest composites are fine; fabricated specifics are not.
  - CTA points at /challenges/colors.html (the exact page Unit 4 of the Launch-Ready sprint shipped). Don't revert this.
  - §5 references the new hero ("Type HTML. Watch it render.") — this is what went live 2026-04-15. If you ever rewrite the hero, update this line.
  - Never published before Trust & Safety + Launch-Ready sprints are both live in prod. Both are live as of 2026-04-15, so this is unblocked.
  - Section headers are writer-proof — swap them for punchier versions if the tone feels off, but don't rearrange the sequence (each section sets up the next).
---

# I built a browser-only HTML editor because VS Code made my friend quit

Last month a friend asked me to teach her HTML. She's 34, works in marketing, has dabbled in `<h1>` tags when editing Mailchimp templates, and wants — vaguely, seriously — to understand what she's been copy-pasting for a decade.

She'd already tried three tutorials before she asked. A freeCodeCamp account wall. A VS Code install that required a terminal command she didn't recognize. A Replit signup that asked for her phone number. She'd closed all three and decided she was "just bad at computers."

I watched her open her laptop and try again. She typed `<h1>Hello</h1>` into an editor and saw it render in the other pane. She laughed. Then she made it pink. Then she asked, genuinely, "wait, is this what coding is?"

Yes. That is what coding is. The problem was never the HTML. It was the forty-five minutes of setup between her and her first rendered tag.

So I want to talk about the tool I handed her, why it exists, what's uncomfortable about defending it in 2026, and what happened after she finished the first challenge.

## What actually happens when an adult tries to learn HTML in 2026

Here is the 2026 onboarding gauntlet for "I want to learn to code." You watch a YouTube video called "Learn HTML in an hour." The host tells you to install VS Code. You install VS Code. The host tells you to install the Live Server extension. You don't know what an extension is. You find the extensions tab. You install it. The host tells you to create a folder, open it in VS Code, create `index.html`, right-click, "Open with Live Server." You do this. A browser opens to `localhost:5500`. You type `<h1>Hello</h1>`. You save. You refresh. Nothing happens. You realize Live Server needs you to save first. You save again. You refresh. Now it works. Forty-five minutes have passed.

Compare to 2005. You right-clicked a page you liked, clicked View Source, scrolled until you saw something that looked like text you recognized, copied the whole page into Notepad, changed "Welcome" to "Hi Mom," saved as `mypage.html`, double-clicked the file, and the browser showed you your page. Total time: four minutes.

The web has gotten worse at teaching itself. It isn't that HTML is hard. HTML is still exactly as simple as it was in 2005 — angle brackets, a tag name, some text, a closing tag. What's changed is the *surroundings* of HTML, which are now built around the ergonomics of people who code full-time. Absolute beginners get handed the professional developer's toolkit on day one, and most of them don't come back.

You can watch this happen in real time in any r/learnprogramming weekly "I'm overwhelmed, where do I start" thread. People have the motivation. They have the curiosity. They don't have the vocabulary to distinguish a terminal from an editor from a framework, and nobody tells them they don't need any of those things to write their first web page.

## The two wrong answers: install-everything and generate-everything

The conventional answer for a career-curious adult in 2026 is one of two camps.

**Install-everything.** VS Code, terminal, Node, npm, a framework. "Any working developer uses these tools, so you should too." This is correct advice for someone aiming at a job as a web developer. It is catastrophic advice for someone who has never written a line of code and mostly wants to understand what the `<div>` tag does. Every installation is a chance to hit a `zsh: command not found` and decide "I'm just bad at computers." I have watched this happen to capable, intelligent adults four times in the last year.

**Generate-everything.** v0, Lovable, Bolt. "Just describe what you want, AI will build it." This is correct advice when your goal is to have a website by dinner. It is useless advice when your goal is to understand one. I asked v0 to build me a portfolio last week: ninety seconds later I had a deployed site with gradients I didn't ask for, a component library I'd never use, and no idea which line made the header blue. If the goal was a website, I won. If the goal was understanding, I lost before I started.

Neither camp produces the experience of typing a character and watching the screen change. That experience — the tiny dopamine hit of `<h1>` becoming a giant heading in real time — is the thing that hooks people on the web. It's what hooked me in 2001 and it's what hooked my friend at her kitchen table at 11 p.m. The tools she'd tried in the weeks before had, between them, not once rendered a single `<h1>` she wrote.

## What I actually built (and what it doesn't try to be)

Hi Bot Code is a static single-page site at [code.hibot.space](https://code.hibot.space). You open it in a browser. There's a code editor in one pane and a live preview in the other. You type HTML in the editor. The preview updates as you type. There are five short challenges, twelve starter templates, a glossary of the terms that show up in every beginner tutorial, and a seven-tier guided course from "how the internet works" through "building things with AI." No install. No sign-up. No email capture. No telemetry.

The design choice I'm proudest of is a two-way sync between a visual sidebar and the raw HTML. You can change a background colour in the sidebar and watch the `<style>` tag rewrite itself. You can edit the HTML directly and watch the sidebar controls update to match. A visual learner gets to watch the translation happen both directions, which is how a surprising number of people first realize that HTML isn't magic — it's just text that the browser reads.

Let me be clear about what this tool *isn't*. It is a single-file editor, not a multi-file project workspace. It doesn't do npm. It doesn't do collaboration. It does not try to replace VS Code, which is a professional's tool and rightly complicated. It tries to be the thing between "I've never coded" and "I'm ready for VS Code" — the on-ramp, not the highway.

CodePen is a better tool for people who already write code and want a sandbox. JSFiddle is better for pasting a repro into a Stack Overflow answer. CodeSandbox is better for real multi-file React work. I use all three. This tool is narrower on purpose: it is aimed at the ninety minutes between a first-time learner opening their laptop and typing their first working tag. The wedge isn't "better editor." The wedge is "no toolchain, real curriculum, one URL."

## The friction budget

Every feature a tool adds costs the first-time user a few seconds of "what is this, should I click it." That cost compounds. A first-time learner has a finite friction budget before they close the tab, and once they close the tab most of them don't come back. So for this tool I treated friction as a scarce resource and cut things that cost more than they returned.

No sign-up. The freeCodeCamp account wall is the single largest drop-off I've seen in every informal test I've run with friends. Removing it is removing a wall.

No install. The browser is already open. That's the entire interaction.

No network calls from the editor itself. Everything runs locally; the preview pane renders user code in a sandboxed iframe with no ability to reach this page's storage. If the site goes offline tomorrow, the PWA cache on the visitor's device keeps working.

No AI inside the editor. On purpose. The goal of the first twenty minutes is to put your own characters on a screen and watch something happen. AI pair-programming is a later skill that requires you to be able to read what it writes back.

No frameworks. You cannot import React here. When you want React, this tool wants you to leave — for CodeSandbox or StackBlitz or Vite. It tries to be honest about being a beginning, not a forever home.

## Craft and agency vs. vibe coding

Here is the positioning question that I keep getting asked, and I'll answer it directly: if v0 can build a whole website in ninety seconds, why should anyone learn HTML in 2026?

Because the person who can read the generated output, find the bug, and change the layout has leverage the person who can't does not have. A v0 output last month had a hardcoded margin that broke at iPhone 12 widths. A beginner who had spent twenty minutes on a `@media` query challenge could fix it in thirty seconds. A beginner who had never seen a media query either shrugged at the broken page or asked v0 to fix it, which v0 did imperfectly, which broke a different breakpoint, which — you see where this is going.

Vibe coding is real and it's valuable. I use these tools. They are excellent at output. They are not a replacement for literacy, any more than autocomplete is a replacement for being able to write a sentence. What learning HTML in 2026 buys you is not a career in hand-writing HTML. It buys you the ability to be the person in the room who can open the AI's output, understand it, steer it, and critique it. That's agency.

The frame I've landed on is **craft and agency vs. vibe coding**, and I don't think it's a contradiction. You can use v0 every day and also know what HTML is. In fact, I'd argue you should.

## Will this be here next year?

Someone asks me this every time. It's a fair question about any free tool in 2026. Here is the mechanism, not the promise.

The tool is a static bundle of HTML, CSS, and JavaScript. It has no backend, no database, no user accounts, no analytics. The marginal cost of another user is zero. Hosting costs round to free-forever on GitHub Pages — or Cloudflare Pages, Netlify, any static host — and the tool can sit at fifty users or fifty thousand users on the same bill. No CEO has ever been forced to add tracking because the monthly cloud invoice got scary, because there is no monthly cloud invoice.

The license is MIT. Every line of source is on GitHub. If I get hit by a bus or lose interest, the repo doesn't vanish — anyone, including the reader of this post, can fork it and keep it running. This is genuinely the "will this be here" answer: not "I promise," but "here is why the answer doesn't depend on me."

There is no venture capital behind this. That's load-bearing. The failure mode of most free tools is that the funding clock runs out and the survival instinct forces them to add paywalls, ads, or "upgrade to pro." This tool has no funding clock. It can stay small on purpose. The ceiling on what it grows into is set by how much of my spare time I want to give it, not by how much runway some investor has left.

The honest risk is bus factor. If I stop, someone would have to pick it up. Open source mitigates that but doesn't eliminate it. I'm not going to pretend otherwise.

## What happened with my friend

She did the colors challenge first. It took her maybe three minutes, most of which was her picking colours she actually liked. She did the button challenge. She paused on the card challenge because she wasn't sure what went inside a `<div>`, and I explained that anything could, and she was sceptical, and then she put a cat GIF inside one and laughed again.

Dinner happened. She closed the laptop.

Two nights later she sent me a message: "I did the hover one." She didn't finish the responsive one. What she sent me instead was a screenshot of a one-page site about her dog, which she had pasted into Carrd's custom-code block and deployed at a subdomain I won't share. The HTML had four tags. One of them was wrong. The site worked anyway.

The success here isn't that she became a web developer. The success is that she is no longer scared of angle brackets. That is the entire point.

## Why I can make the privacy promise

I said up top: no telemetry. Here is why I can actually say that and mean it.

The tool is a static bundle. It has no backend to call home to. There are no analytics scripts. There are no third-party fonts loading from a CDN (self-hosted since 2026-04-14). You can verify this yourself: open DevTools, click the Network tab, type in the editor, and watch nothing cross the wire.

The reason I care about this isn't a grand privacy stance. It's that a parent handing a laptop to a kid, a teacher projecting to a classroom, or an adult learning at 11 p.m. on a shared family iPad shouldn't have to read a terms-of-service to use a learning tool.

One honest caveat: if you click "Export to CodePen" or "Deploy to Netlify," you are leaving this tool and entering theirs. They have their own policies. The export dialog says so.

## If you want to try it

If you've got twenty minutes and a browser, the first challenge is at **[code.hibot.space/challenges/colors.html](https://code.hibot.space/challenges/colors.html)**. Start there. If you finish it, I'd love to hear about it — reply to this post or email me. That's it. No sign-up. No email list. Go type something.
