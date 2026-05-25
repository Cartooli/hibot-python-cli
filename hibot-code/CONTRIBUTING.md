# Contributing to Hi Bot Code

Thanks for poking at this. The project is a static HTML/CSS/JS site with
no build step for the pages themselves — every HTML file is self-contained
and runs in any modern browser.

## Running locally

```bash
python3 -m http.server 8000
# or
npx serve
```

Open <http://localhost:8000>. No install, no sign-up, no env vars.

## Editing a page

Every file under the repo root ending in `.html` is a standalone page.
Edit in place, refresh the browser, done. The landing `index.html`, the
editor `editor.html`, the `learn.html` tier pages, the glossary, and the
per-challenge pages under `challenges/` all follow the same pattern —
shared typography comes from `/assets/fonts/fonts.css`, and per-page CSS
lives in an inline `<style>` block.

## The one build step

`codemirror-bundle.js` (used by the editor) is rebuilt with:

```bash
npm install      # once
npm run build    # rebuilds codemirror-bundle.js from editor-bundle.mjs
```

You only need this if you change the CodeMirror bundle's input
(`editor-bundle.mjs`).

## Where docs live

- **`README.md`, `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md`** — at the root.
- **`QUICKSTART.md`, `DEPLOYMENT.md`, `FEATURES.md`, `INDEX.md`, `AI_BUILD_DEPLOY_GUIDE.md`** — user-facing reference docs, at the root.
- **`docs/brainstorms/`** — sprint-level requirements docs (what to build and why).
- **`docs/plans/`** — sprint-level implementation plans (how to build it).
- **`docs/archive/`** — historical fix/test/deployment notes preserved for context but not load-bearing.

## Submitting to the Showcase

Showcase entries are added via GitHub pull request — see the
[Showcase page](showcase.html) for the current submission flow. This keeps
the site zero-backend: no accounts, no storage, no moderation queue.

## Version & release

Canonical version lives in [`VERSION`](VERSION). The service worker
(`sw.js`) cache key (`bws-v<version>`) must match `VERSION` on every
release so clients evict the old cache on activate. CI enforces this on
every push to `main` (see `.github/workflows/deploy.yml`).

Historical QA snapshots (not release-blocking) live under
[`.gstack/qa-reports/`](.gstack/qa-reports/).

## localStorage keys the site writes

All browser-local, never leaves the device:

- `project_*`, `projectMetadata`, `loadChallenge` — editor save/load state.
- `completedCoreChallenges` — JSON array of core-challenge IDs the user has finished (read by `/challenges/`).
- `achievementsEnabled`, `jsSandboxEnabled`, `previewZoom` — editor settings.
- `hasSeenEditorWelcome`, `mobileActiveTab` — one-shot UI hints.

Clearing browser storage resets progress — expected behavior for a
zero-account tool.
