---
title: "feat: Bring-your-own HTML import (file + paste)"
type: feat
status: implemented
date: 2026-05-08
origin: docs/brainstorms/2026-05-08-byo-html-import-requirements.md
---

# Bring-your-own HTML import

Structured implementation plan for **R1–R4** in `docs/brainstorms/2026-05-08-byo-html-import-requirements.md`.

## Overview

Add **Import HTML** to `editor.html`: load a local `.html` / `.htm` file and/or paste a full document into the editor, replacing the current assembled HTML (`codeTA` / CodeMirror), then run the existing **`setCode` → `trySyncPanelFromCode` → split tabs → `codeToPreview` → `saveToHistory` → `saveToLocalStorage`** chain.

No new dependencies, no backend. Reuse **`showConfirmationModal`** (same pattern as **Start Over** / `btnReset`) and **`safeConfirm`** (same pattern as **Load project** / `loadProject` / **`importTemplateJSON`**) for destructive replace confirmation.

## Problem Statement / Motivation

- **Outbound parity exists:** Share links (`#v1:` / `#v0:`) already encode a snapshot; inbound “I copied this from W3Schools” has no first-class path except manual paste into the textarea.
- **Confirmation patterns exist:** `loadProject`, `importTemplateJSON`, and `btnReset` already establish how we warn before overwriting.

## Proposed Solution

1. **Toolbar / panel controls:** One primary **Import HTML** affordance that opens a small modal with (a) file picker, (b) large paste area, (c) primary **Load into editor** action.
2. **Hidden file input:** `<input type="file" accept=".html,.htm,text/html">` triggered by the modal or a secondary “Choose file” button.
3. **Core helper:** `applyImportedHtmlDocument(rawString, { source: 'file'|'paste' })` centralizes: optional BOM strip, length cap, security sanitization alignment with typing pipeline, confirm gate, `setCode`, downstream sync + preview + persistence.

## Architecture

| Layer | Choice |
|--------|--------|
| Source of truth | Unchanged: `codeTA` (+ CodeMirror mirror via existing `setCode`) |
| Preview | Unchanged: `codeToPreview()` / `preview.srcdoc` |
| Persistence | Unchanged: `saveToLocalStorage()`, undo stack `saveToHistory()` |
| Panel sync | Best-effort: existing `trySyncPanelFromCode()` (may not map arbitrary foreign HTML to visual panel — acceptable; document in UX copy) |

## Confirmation heuristic (R3)

Avoid confirming on **every** import when the editor still holds only the **fresh default** from init.

**Recommended approach:**

1. After initial editor bootstrap completes, capture **`editorImportBaseline`** = `getCode()` **once**, but only after async URL load has settled:
   - Today `editorUrlLoadPromise = loadFromURL()` can race `stateToCode()` in `init()` for hash links. For baseline correctness, either:
     - **(A)** `await editorUrlLoadPromise` at the end of `init()` before capturing baseline (small ordering fix), or
     - **(B)** capture baseline inside `loadFromURL()` after successful `setCode`, and expose `markImportBaseline()` called from `init()` after `stateToCode()` when no URL payload.

   Planning prefers **(A)** if it’s a one-line `await` in the async init path — verify no duplicate `stateToCode` regressions.

2. **`shouldConfirmBeforeHtmlImport()`** returns true when:
   - `getCode().trim().length` exceeds a small noise threshold (e.g. **> 0** is too aggressive if default template is huge; use **content changed vs `editorImportBaseline`** via string inequality), **or**
   - Undo stack indicates meaningful edits (optional enhancement: if `saveToHistory` exposes depth — only if cheap).

3. If `shouldConfirmBeforeHtmlImport()` is false → apply immediately. If true → **`showConfirmationModal`** (match **Start Over** tone) with title like **“Replace current page?”** and confirm **Replace**.

**Align with existing UX:** `importTemplateJSON` always confirms — HTML import can be slightly smarter with baseline to reduce friction for first-action imports.

## Security & limits

- **Length:** Enforce a max raw length before `setCode` (align with Share pipeline warnings ~150KB raw / browser URL limits — see comments near `compressCode`). On exceed: toast + abort.
- **Sanitization:** Run the same path as live typing where appropriate: **`sanitizeHTMLAdvanced`** when `securityMode` is not aggressively permissive (mirror `codeTA` `input` listener logic ~8226–8239). Document that **verbose** mode may warn via existing toast.
- **No `allow-same-origin` change** on `#preview` sandbox without a separate security review.

## UI placement

| Location | Element |
|----------|---------|
| Side panel button row | New **`btnImportHtml`** next to **Download** / **Share** (~4828–4831) — high discoverability for ICP |
| Editor bar (optional) | Secondary small **Import** near **Run** only if panel is collapsed often — **defer** unless usability testing says otherwise |

**Beginner mode:** Show **Import HTML** (this *is* the W3Schools replacement story). Hide only if it clutters — default **show**.

**Modal contents:**

- Short explanation: “Replaces your current page. Paste from any editor or choose a file.”
- `<textarea>` for paste (monospace, `spellcheck="false"`)
- **Choose file** → triggers hidden file input
- **Cancel** / **Load into editor** (primary)

## Implementation units

### Unit 1 — Core logic + modal (`editor.html`)

**Goal:** `applyImportedHtmlDocument`, confirmation gate, file read + paste handlers, baseline capture.

**Files:** `editor.html` only.

**Approach:**

1. Add **`editorImportBaseline`** (let) and **`captureImportBaseline()`** called once post-init (after URL/localStorage/template resolution and `codeToPreview`).
2. Fix or verify **init ordering** so baseline matches final `getCode()` when `#v1:` hash is present (await `editorUrlLoadPromise` in `init` if currently racy — verify behavior manually).
3. Implement **`shouldConfirmBeforeHtmlImport()`** using baseline string compare (normalize optional: CRLF → LF for compare only).
4. Implement **`applyImportedHtmlDocument(html, meta)`**:
   - Strip UTF-8 BOM if present (`\uFEFF`).
   - Guard max length.
   - Apply **`sanitizeHTMLAdvanced`** according to current security mode (read `safeLocalStorageGet('securityMode')` same as input handler).
   - If `shouldConfirmBeforeHtmlImport()` and user has not pre-approved this invocation → **`showConfirmationModal`**; on confirm, recurse or set flag to skip second confirm.
   - `setCode(sanitized)` → `trySyncPanelFromCode()` → `refreshSplitTabsIfActive()` → `codeToPreview()` → `saveToHistory()` → `saveToLocalStorage()`.
   - Toast: “HTML loaded” + optional source tag.
   - Optional: `trackEvent('html_import', { source })` if `trackEvent` exists.

5. Wire **hidden file input** + **`FileReader`** `readAsText` with **UTF-8**; document limitation for non–UTF-8 files in help text (“Save as UTF-8”).
6. Wire modal open from **`btnImportHtml`**.

**Patterns:** Mirror **`importTemplateJSON`** (confirm + FileReader) and **`btnReset`** (modal).

**Verification:**

- Import small file → preview updates.
- Import with panel open → preview + code tab update.
- Baseline unchanged → import without confirm (if baseline equals current).
- After editing → import shows confirm.
- Oversized paste → toast, no replace.
- Beginner + advanced modes both work.

---

### Unit 2 — Discoverability + docs (`index.html`, optional `CHANGELOG.md`)

**Goal:** One line on the landing path that Tryit users recognize.

**Files:** `index.html` (hero or “path” section), optionally `CHANGELOG.md` under Unreleased.

**Approach:**

1. Add a single sentence near **Try the Editor** CTA: e.g. “Already have an HTML file or a paste from another tutorial? Open the editor → **Import HTML**.”
2. **CHANGELOG** one bullet if the project ships user-facing notes per feature.

**Verification:** Grep “Import” on `index.html`; manual read for tone.

---

### Unit 3 — Help & accessibility (`editor.html`)

**Goal:** Keyboard/help parity.

**Approach:**

1. Extend **`showHelpModal`** shortcuts list (or settings help) with **Import HTML** if a shortcut is added; if no shortcut in v1, omit shortcut row.
2. Ensure **modal** traps focus and **Escape** closes (follow existing modal helpers).
3. **`aria-label`** on file input and **Import** button.

**Verification:** Tab through modal; screen reader label present.

---

## Deferred / out of scope (future)

- Drag-and-drop onto editor surface.
- **Extract `<body>` only** wizard (product brainstorm deferred).
- Dedicated **`/open.html`** landing (only if SEO experiments warrant).

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| `trySyncPanelFromCode` fails on arbitrary HTML | Short modal note: “Visual panel may not reflect custom pages; code is always saved.” |
| Hash URL race vs baseline | Await `editorUrlLoadPromise` / explicit baseline API |
| Huge paste locks main thread | Length cap + consider `requestIdleCallback` only if needed — cap usually enough |

## Verification checklist (pre-merge)

- [ ] Fresh load → import default-sized file → no confirm (if baseline matches).
- [ ] Type one character → import → confirm appears → Cancel leaves editor intact.
- [ ] Confirm → Replace → undo stack behaves reasonably (`saveToHistory` called).
- [ ] Split view: HTML/CSS/JS tabs refresh (`refreshSplitTabsIfActive`).
- [ ] Mobile: modal usable, file picker works on iOS Safari (best-effort).

## Effort estimate

- **Unit 1:** ~2–4 hours (includes init-order verification).
- **Unit 2:** ~15 minutes.
- **Unit 3:** ~30 minutes.

## Rollback

Single-file behavior change in `editor.html`; revert commit restores prior UX.

## Next step after merge

Optional follow-up: measure `trackEvent('html_import')` if analytics pattern exists; add drag-drop if users ask.
