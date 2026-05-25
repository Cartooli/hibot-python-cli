---
date: 2026-04-07
topic: in-app-cli-reference
---

# In-app CLI reference (full survey, stub-first)

## Problem Frame

**Who:** Hi Bot Code learners and contributors who are new (or rusty) on the terminal, package managers, frameworks, databases, containers, and cloud CLIs.

**What:** The product today strongly emphasizes client-side HTML/CSS/JS and guided learning in the sidebar, but “what command do I run?” is still a major real-world gap when learners graduate to tooling, Git, installs, and deployment.

**Why it matters:** A single, trustworthy, **in-product** reference reduces tab-hopping, pairs with the app’s educational positioning, and can grow into a durable differentiator—without requiring users to leave the privacy-first environment for basic lookup.

## Requirements

- **R1.** Provide an **in-app** “CLI directory” experience (not repo-only docs) reachable from the existing learning/education surfaces (exact placement is a planning decision; must be discoverable without reading README).

- **R2.** Model the reference as a **hierarchical directory**: top-level **categories** aligned to the full survey scope (from foundational OS/shell utilities through version control, package managers, frontend/back-end framework CLIs, ORMs, mobile, QA, containers/Kubernetes, cloud CLIs, BaaS/serverless, IaC, etc.). The taxonomy should be **stable** (IDs for categories/sections) so content can land incrementally without breaking navigation.

- **R3.** Each **command entry** (leaf or grouped sub-entry, as appropriate) includes, at minimum:
  - **Name / invocation** (what you type)
  - **Short description** (what it does)
  - **Summary use case** (when you reach for it in real work)
  - **Example** (at least one realistic invocation or pipeline where it helps; optional for highly contextual commands if called out explicitly)

- **R4.** **Stub-first delivery:** Ship with the **full table of contents visible**—every category/section appears in navigation—but **unfinished** areas are explicitly marked (e.g., “Coming soon” / “Draft outline only”) so learners are not misled into thinking incomplete content is authoritative.

- **R5.** **Honest scope / freshness:** For fast-moving tools (framework CLIs, cloud CLIs), completed entries include a short **“verify on your machine”** hint (typically `command --help` / `-h`, or the vendor’s help subcommand). This is part of the entry content, not an implementation detail.

- **R6.** **Privacy alignment:** The reference body text ships **with the app** (bundled static content). Reading/browse/search of the directory **must not depend on network access**. Optional **outbound links** (e.g., official docs) may exist later; if present, they must be clearly labeled as external and must not be required to understand the entry.

- **R7.** **Navigability at scale:** Because the corpus is intentionally large, the UI must support **browsing a deep hierarchy without a single unusable “wall of text”** (exact mechanism: TOC, collapsible sections, search, tabs, or equivalent—decided in planning).

## Success Criteria

- A new user can open the CLI directory, see the **entire** intended survey structure, and navigate categories without dead ends (placeholders still “work” as navigation targets).
- For any section marked as **complete** for a given release, a reviewer can spot-check **10 random entries** and find description + use case + example present per **R3**.
- Placeholder sections are **visually and textually obvious** (pass a simple “confusion test”: users report they understand content is incomplete).
- Category/section **stable IDs** exist so future content additions do not require renaming user bookmarks or breaking analytics (if added later).
- The directory interaction meets the **same accessibility bar as other learning surfaces** in Hi Bot Code (keyboard operable, semantic structure for headings/sections—exact audit checklist deferred to planning/QA).

## Scope Boundaries

- **Not in scope (unless explicitly added later):** executing shell commands in the browser, persistent cloud credentials, teaching shell scripting as a full course, or guaranteeing correctness for every vendor CLI variant across all OS distributions.
- **Not in scope for v1 UX:** presenting the entire reference as one uninterrupted scroll with no navigation aids (conflicts with **R7**).
- **Explicitly allowed:** incremental richness (flags deep-dives, “common combos”, troubleshooting notes) **after** the stub TOC ships.

## Key Decisions

- **Surface:** In-app reference for end users (not maintainer-only documentation).
- **Breadth:** Aim to **mirror the full survey** (OS → cloud / IaC) over time; accept that this is a **long-horizon** content product.
- **Release strategy:** **Full TOC early**, **stub** incomplete sections clearly, **fill** content over subsequent iterations.

## Dependencies / Assumptions

- **Assumption:** Hi Bot Code remains static-first / privacy-first; offline-readable reference content fits the brand.
- **Dependency:** A maintainable content format (likely data + renderer) will be chosen during planning so the directory does not become an unmaintainable single giant HTML file.

## Outstanding Questions

### Resolve Before Planning

- None identified from the brainstorm—**stub strategy** and **in-app** placement are decided at the product level. (Exact sidebar/modal pattern is **Deferred to Planning**.)

### Deferred to Planning

- **[Affects R1][UX]** Primary entry point: new sidebar group vs. button alongside “Learning Path” / “Learning Tools” vs. other—match existing patterns (`learningPath.show()`-style modals, etc.).
- **[Affects R2–R3][Information architecture]** Translate **Appendix A** into stable IDs, nesting depth limits, and naming conventions; decide which subtopics are separate sections vs. grouped command lists.
- **[Affects R3][Content]** Editorial standard for examples (POSIX vs macOS vs Windows notes; whether to show `npx` vs global installs; minimal version disclaimers).
- **[Affects R6–R7][Technical]** Bundling approach: JSON module, embedded constants, or build-time generation from markdown—tradeoffs for bundle size with a very large eventual corpus; lazy-loading strategies that preserve offline readability for shipped sections.
- **[Needs research]** Bundle-size ceiling acceptable for mobile users if the corpus grows large; may inform splitting by lazy-loaded sections in later iterations.

## Appendix A — Canonical top-level categories (v1 TOC inventory)

This inventory mirrors the “full survey” intent and is the **starting tree** for stub navigation. Sub-sections under each category are intentionally left to planning/content work.

1. **OS / shell fundamentals** — navigation, files, streams, `grep`/`awk`/`sed`, process tools, modern replacements, networking helpers (`curl`, `jq`, etc.).
2. **Version control (Git)** — daily workflow, history rewriting, recovery (`reflog`), bisect, collaboration primitives.
3. **Package managers & language toolchains** — Node (`npm`/`yarn`/`pnpm`/`bun`), Go modules, Rust/Cargo, Python (`pip`/Poetry/`uv`), supply-chain scanning (e.g., vulnerability scan patterns).
4. **Frontend tooling & meta-frameworks** — Vite, Next.js, Angular CLI, Astro, Nuxt, SvelteKit/SV, Solid-related tooling (as applicable).
5. **Backend frameworks & runtimes** — Python (Django/FastAPI/Flask), PHP (Artisan/Symfony console), Rails, Spring/Java ecosystem, .NET CLI, Node (Nest/Express patterns as applicable).
6. **Databases & ORMs** — Prisma CLI flows and analogous “schema/migrate/introspect” patterns.
7. **Mobile** — Flutter CLI, React Native CLI workflows.
8. **QA, tests, formatting, hooks** — Playwright/Cypress, Vitest/Jest, ESLint/Prettier, Git hooks (e.g., Husky-style workflows).
9. **Containers & orchestration** — Docker lifecycle, Kubernetes (`kubectl`) operations.
10. **Cloud, BaaS, serverless, IaC** — AWS/GCP/Azure CLIs, Supabase/Firebase local tooling, Serverless/SST-style workflows, Terraform basics.

## Next Steps

→ `/ce:plan` for structured implementation planning (UI placement, content schema, stub generation workflow, and phased content fill).
