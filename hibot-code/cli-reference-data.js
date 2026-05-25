/**
 * CLI Directory — bundled reference data (offline, no network).
 *
 * Schema: categories[] → sections[] → commands[].
 * Section status: "stub" | "draft" | "complete".
 * Command fields: id, invocation, description, useCase, example, verifyHint (R5 freshness).
 *
 * Editorial (brief):
 * - Examples target macOS/Linux/Git Bash unless noted; Windows CMD often differs.
 * - Prefer local/npx-style hints for Node tooling where it helps beginners.
 * - "complete" sections should pass spot-check: description + use case + example + verifyHint.
 */
(function () {
  window.CLI_REFERENCE_DATA = {
    schemaVersion: 1,
    title: "CLI Directory",
    intro:
      "A structured map of common command-line tools used in modern development. Content is expanded over time; sections marked Coming soon are placeholders.",
    categories: [
      {
        id: "cat-os",
        title: "OS / shell fundamentals",
        status: "stub",
        summary:
          "Core POSIX/shell tools: paths, listing, streams, grep/awk/sed, processes, curl, jq, and modern alternatives.",
        sections: [
          {
            id: "cat-os-nav",
            title: "Navigation & files",
            status: "complete",
            commands: [
              {
                id: "pwd",
                invocation: "pwd",
                description: "Prints the current working directory (absolute path).",
                useCase: "Confirm where your shell is before running scripts or relative paths.",
                example: "pwd",
                verifyHint: "On most systems there is no subcommand; behavior is standard.",
              },
              {
                id: "ls",
                invocation: "ls",
                description: "Lists files and directories in the current (or given) directory.",
                useCase: "See what exists before cd, cat, or rm.",
                example: "ls -la",
                verifyHint: "Run ls --help (GNU) or man ls (BSD) for flags.",
              },
            ],
          },
          {
            id: "cat-os-streams",
            title: "Streams, search & JSON",
            status: "complete",
            commands: [
              {
                id: "grep",
                invocation: "grep",
                description:
                  "Prints lines from files (or stdin) that match a pattern — essential for searching logs and code.",
                useCase: "Find errors in a log file or search for a symbol across text files.",
                example: 'grep -i "error" app.log\ngrep -r "TODO" src/',
                verifyHint: "grep --help (GNU) — flags differ on BSD; use rg (ripgrep) for faster recursive search if installed.",
              },
              {
                id: "tail",
                invocation: "tail",
                description: "Shows the end of a file; with -f, keeps reading as new lines are appended (follow).",
                useCase: "Watch a live log while a server or build process writes to it.",
                example: "tail -n 50 app.log\ntail -f app.log",
                verifyHint: "tail --help — on macOS, tail -f is common for follow mode.",
              },
              {
                id: "curl",
                invocation: "curl",
                description: "Transfers data from or to a URL — the usual way to hit HTTP APIs from a terminal.",
                useCase: "Quick health checks, download files, or POST JSON to an endpoint.",
                example:
                  'curl -s https://api.example.com/health\ncurl -X POST -H "Content-Type: application/json" -d \'{"ok":true}\' https://api.example.com/v1/items',
                verifyHint: "curl --help | head — many flags; check your curl version for HTTP/2, etc.",
              },
              {
                id: "jq",
                invocation: "jq",
                description: "Filters and transforms JSON — slice arrays, pick fields, pretty-print.",
                useCase: "Turn a noisy API response into just the fields you care about, in scripts or one-liners.",
                example:
                  'echo \'{"items":[{"id":1}]}\' | jq .\ncurl -s https://api.example.com/data | jq ".items[0].id"',
                verifyHint: "jq --help — install via package manager if missing (e.g. brew install jq).",
              },
            ],
          },
        ],
      },
      {
        id: "cat-git",
        title: "Version control (Git)",
        status: "stub",
        summary: "Clone, branch, commit, merge/rebase, stash, recover with reflog, bisect.",
        sections: [
          {
            id: "cat-git-basics",
            title: "Daily workflow",
            status: "complete",
            commands: [
              {
                id: "git-status",
                invocation: "git status",
                description: "Shows which files changed, staged, or are untracked in the working tree.",
                useCase: "Always run before commit to see what will go into the next snapshot.",
                example: "git status",
                verifyHint: "git status -h — add -sb for short branch tracking view.",
              },
              {
                id: "git-add",
                invocation: "git add",
                description: "Stages file changes so they will be included in the next commit.",
                useCase: "Select what belongs in a commit — often specific paths or -p for patch hunks.",
                example: "git add .\ngit add src/app.js",
                verifyHint: "git add -h — avoid git add . if you do not mean to stage everything.",
              },
              {
                id: "git-commit",
                invocation: "git commit",
                description: "Creates a commit from staged changes with a message.",
                useCase: "Record a coherent unit of work with a message teammates can understand later.",
                example: 'git commit -m "Fix heading contrast on mobile"',
                verifyHint: "git commit -h — use -a to skip add for tracked files only (still be careful).",
              },
              {
                id: "git-push",
                invocation: "git push",
                description: "Uploads local commits to the remote repository (e.g. origin).",
                useCase: "Share your branch and trigger CI after you have committed locally.",
                example: "git push origin main\ngit push -u origin my-feature",
                verifyHint: "git push -h — set upstream (-u) on first push of a new branch.",
              },
              {
                id: "git-pull",
                invocation: "git pull",
                description: "Fetches from remote and integrates into your current branch (fetch + merge or rebase per config).",
                useCase: "Update your branch with teammates’ work before you push or continue coding.",
                example: "git pull",
                verifyHint: "git pull -h — if you use rebase workflows, consider git pull --rebase.",
              },
              {
                id: "git-branch",
                invocation: "git branch",
                description: "Lists, creates, or deletes branches — lightweight pointers to commits.",
                useCase: "See local branches or create an isolated line of work for a feature.",
                example: "git branch\ngit branch feature/login",
                verifyHint: "git branch -h — -d deletes merged branches; -D forces.",
              },
              {
                id: "git-switch",
                invocation: "git switch",
                description: "Moves HEAD to another branch or commit (modern replacement for checkout in many flows).",
                useCase: "Jump to a branch to work on it without remembering older checkout syntax.",
                example: "git switch main\ngit switch -c feature/forms",
                verifyHint: "git switch -h — older tutorials use git checkout; both exist in current Git.",
              },
            ],
          },
          { id: "cat-git-history", title: "History & recovery", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-pkg",
        title: "Package managers & language toolchains",
        status: "stub",
        summary: "npm, yarn, pnpm, bun; Go modules; Cargo; pip, Poetry, uv; supply-chain checks.",
        sections: [
          {
            id: "cat-pkg-node",
            title: "Node (npm / yarn / pnpm / bun)",
            status: "complete",
            commands: [
              {
                id: "npm-install",
                invocation: "npm install",
                description: "Installs dependencies listed in package.json into node_modules and updates the lockfile.",
                useCase: "Set up a project after cloning or after package.json changes.",
                example: "npm install\nnpm install lodash\nnpm install -D eslint",
                verifyHint: "npm install -h — use npm ci in CI for strict lockfile installs.",
              },
              {
                id: "npm-run",
                invocation: "npm run",
                description: "Runs a script from the scripts section of package.json (e.g. build, test, dev).",
                useCase: "Invoke project-defined commands without remembering each tool’s CLI.",
                example: "npm run build\nnpm run dev",
                verifyHint: "npm run -h — npm run alone lists script names.",
              },
              {
                id: "npx",
                invocation: "npx",
                description: "Runs a package binary — uses local node_modules/.bin when available, otherwise a temporary download.",
                useCase: "Try CLIs (create-vite, eslint) without a global install.",
                example: "npx eslint .\nnpx create-vite@latest my-app",
                verifyHint: "npx -h — useful for one-off tooling; verify package names on npm before running.",
              },
              {
                id: "pnpm-yarn-note",
                invocation: "pnpm / yarn",
                description: "Alternative clients: pnpm (disk-efficient) and Yarn (classic or Berry) — concepts mirror npm for install/add/run.",
                useCase: "Teams standardize on one client; lockfiles differ (pnpm-lock.yaml, yarn.lock).",
                example: "pnpm install\npnpm add -D typescript\nyarn install",
                verifyHint: "pnpm -h / yarn -h — match commands to what the project’s docs specify.",
              },
            ],
          },
          { id: "cat-pkg-py", title: "Python (pip / Poetry / uv)", status: "stub", commands: [] },
          { id: "cat-pkg-rust-go", title: "Rust & Go", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-fe",
        title: "Frontend tooling & meta-frameworks",
        status: "stub",
        summary: "Vite, Next.js, Angular CLI, Astro, Nuxt, SvelteKit, Solid tooling.",
        sections: [
          {
            id: "cat-fe-vite",
            title: "Vite",
            status: "complete",
            commands: [
              {
                id: "vite-dev",
                invocation: "vite",
                description: "Starts the Vite dev server with fast HMR for local development (often via npm script).",
                useCase: "Iterate on a Vite-powered app with instant reload during development.",
                example: "npm run dev\nnpx vite --host",
                verifyHint: "npx vite --help — framework templates wire dev script to vite in package.json.",
              },
              {
                id: "vite-build",
                invocation: "vite build",
                description: "Produces an optimized production build (output directory is usually dist/).",
                useCase: "Generate assets to deploy before upload or CI packaging.",
                example: "npm run build\nnpx vite build",
                verifyHint: "vite build --help — check outDir and base for hosting paths.",
              },
              {
                id: "vite-preview",
                invocation: "vite preview",
                description: "Serves the production build locally so you can sanity-check before deploy.",
                useCase: "Verify production output and routing after vite build.",
                example: "npm run preview\nnpx vite preview --port 4173",
                verifyHint: "vite preview --help — not a substitute for full staging security review.",
              },
            ],
          },
          { id: "cat-fe-next", title: "Next.js", status: "stub", commands: [] },
          { id: "cat-fe-other", title: "Angular, Astro, Nuxt, SvelteKit", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-be",
        title: "Backend frameworks & runtimes",
        status: "stub",
        summary: "Django, FastAPI, Flask; Artisan/Symfony; Rails; Spring; dotnet; Nest/Express.",
        sections: [
          { id: "cat-be-py", title: "Python", status: "stub", commands: [] },
          { id: "cat-be-php", title: "PHP", status: "stub", commands: [] },
          { id: "cat-be-rails-java-dotnet-node", title: "Rails, Java/Spring, .NET, Node", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-db",
        title: "Databases & ORMs",
        status: "stub",
        summary: "Schema workflows (e.g. Prisma migrate, introspect, studio patterns).",
        sections: [{ id: "cat-db-prisma", title: "Prisma-style workflows", status: "stub", commands: [] }],
      },
      {
        id: "cat-mobile",
        title: "Mobile",
        status: "stub",
        summary: "Flutter CLI; React Native CLI and native build chains.",
        sections: [
          { id: "cat-mobile-flutter", title: "Flutter", status: "stub", commands: [] },
          { id: "cat-mobile-rn", title: "React Native", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-qa",
        title: "QA, tests, formatting, hooks",
        status: "stub",
        summary: "Playwright, Cypress, Vitest, Jest, ESLint, Prettier, Husky-style hooks.",
        sections: [
          { id: "cat-qa-e2e", title: "E2E (Playwright / Cypress)", status: "stub", commands: [] },
          { id: "cat-qa-unit", title: "Unit (Vitest / Jest)", status: "stub", commands: [] },
          { id: "cat-qa-lint", title: "Lint & format", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-k8s",
        title: "Containers & orchestration",
        status: "stub",
        summary: "Docker lifecycle; kubectl for Kubernetes.",
        sections: [
          { id: "cat-k8s-docker", title: "Docker", status: "stub", commands: [] },
          { id: "cat-k8s-kubectl", title: "kubectl", status: "stub", commands: [] },
        ],
      },
      {
        id: "cat-cloud",
        title: "Cloud, BaaS, serverless, IaC",
        status: "stub",
        summary: "AWS, gcloud, az; Supabase/Firebase CLIs; Serverless/SST; Terraform.",
        sections: [
          { id: "cat-cloud-hyperscalers", title: "AWS / GCP / Azure CLIs", status: "stub", commands: [] },
          { id: "cat-cloud-baas", title: "BaaS (Supabase / Firebase)", status: "stub", commands: [] },
          { id: "cat-cloud-iac", title: "Terraform & serverless frameworks", status: "stub", commands: [] },
        ],
      },
    ],
  };
})();
