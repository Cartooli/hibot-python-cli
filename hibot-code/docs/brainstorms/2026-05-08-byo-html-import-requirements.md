---
date: 2026-05-08
topic: byo-html-import
---

# Bring-your-own HTML (paste + file) in the editor

## Problem Frame

The ICP uses W3Schools’ HTML Tryit to paste or inspect whole HTML documents. We want an **on-platform** way to bring that HTML into Hi Bot Code **without** requiring Share links first. Outbound sharing (`#v1:` hash links) already exists; this work is **inbound** “I have a file / a paste.”

## Requirements

- **R1.** User can **load a local `.html` (or `.htm`) file** into the editor from a clear, discoverable control (e.g. “Import HTML” / “Open file”).
- **R2.** User can **paste a full HTML document** and load it in one deliberate action (not only by typing in the code area).
- **R3.** On import, loaded content **replaces** the current project, **but** if there is meaningful existing work, the product **asks for confirmation** before discarding it.
- **R4.** After import, the user gets the **same live preview and run behavior** as manually edited code.

## Success Criteria

- A user can **copy full page HTML from elsewhere → import → see the result in our preview** without using Share.
- Import is **discoverable** from the editor (and optionally mentioned from the landing path).
- Users rarely lose work by accident: confirmation when replacing non-trivial existing content.

## Scope Boundaries

- Not in scope: a W3Schools-scale library of named examples (`filename=`) unless separately prioritized.
- Not in scope: server-side upload or cloud persistence for imported files.
- Not in scope: byte-identical rendering vs third-party pages that depend on their origin or blocked sandbox capabilities.

## Key Decisions

- **Inbound focus:** Compete with Tryit for “I have HTML” workflows.
- **Replace with confirmation:** Full replace; confirm when overwriting meaningful existing content (see implementation plan for the exact heuristic).

## Next Steps

→ `docs/plans/2026-05-08-001-feat-byo-html-import-plan.md`
