# Portfolio Project Rules for Amazon Q

## Environment (never shell out to discover these)

- **Node version**: `v22.12.0`
- **Node binary**: `/Users/jatsengesta/.nvm/versions/node/v22.12.0/bin/node`
- **Package manager**: `npm` (use `npm` scripts, not `npx` or bare `ng`)
- **Angular CLI**: `^19.1.0` (local, run via `node node_modules/.bin/ng`)
- **Build command**: `node node_modules/.bin/ng build --configuration development`
- **Dev server**: `node node_modules/.bin/ng serve`
- **Workspace root**: `/Users/jatsengesta/Documents/jatsen file/Code/portfolio`
- **OS**: macOS

## Key Dependencies (from package.json — do not re-read the file)

| Package | Version |
|---|---|
| @angular/core | ^19.1.0 |
| @angular/router | ^19.1.0 |
| @angular/common | ^19.1.0 |
| @angular/forms | ^19.1.0 |
| @angular/platform-browser | ^19.1.0 |
| @angular/animations | ^19.1.0 |
| three | ^0.184.0 |
| @types/three | ^0.184.1 |
| @emailjs/browser | ^4.4.1 |
| @fortawesome/fontawesome-free | ^7.2.0 |
| rxjs | ~7.8.0 |
| zone.js | ~0.15.0 |
| typescript | ~5.7.2 |

## Project Structure (do not re-scan unless adding new files)

```
src/app/
  core/layout/
    navbar/   footer/
  features/
    home/
      data/home-content.ts        ← all portfolio data lives here
      pages/home-page/            ← main single-page component
    project-detail/
      pages/project-detail-page/  ← /project/:id detail page
    book-call/pages/book-call-page/
    send-message/pages/send-message-page/
  shared/models/portfolio.model.ts
  app.routes.ts
  app.config.ts
src/styles/
  abstracts/  base/  themes/  main.scss
```

## Routing

| Path | Component |
|---|---|
| `/` | HomePageComponent |
| `/project/:id` | ProjectDetailPageComponent |
| `/book-call` | BookCallPageComponent |
| `/send-message` | SendMessagePageComponent |

## Data Source

All content is in `src/app/features/home/data/home-content.ts` as `HOME_CONTENT: PortfolioContent`.
Models are in `src/app/shared/models/portfolio.model.ts`.
Projects have: `id`, `name`, `category`, `stack`, `summary`, `liveUrl?`, `githubUrl?`, `previewImage?`, `tags?`, `date?`, `role?`, `timeline?`, `sections?`, `images?`.

## Angular Conventions

- All components are **standalone** (`standalone: true`)
- Default change detection: **OnPush** (`ChangeDetectionStrategy.OnPush`)
- Always import `CommonModule` and `RouterLink` in standalone components that need them
- Selector prefix: `app-`
- File naming: kebab-case
- No lazy loading currently — all routes are eagerly loaded in `app.routes.ts`

## CSS / Styling

- Global CSS variables (defined in `src/styles/`):
  - `--color-page`, `--color-bg`, `--color-surface`, `--color-surface-alt`
  - `--color-text`, `--color-muted`, `--color-border`, `--color-accent`, `--color-on-accent`
  - `--card-bg`, `--card-border`, `--card-blur`
  - `--glow-violet`, `--glow-coral`
  - `--grad-spark`, `--grad-heading`
- Fonts in use: `'Sora'` (display/headings), `'DM Mono'` (mono/labels)
- Font Awesome classes used directly in templates (free v7)
- Component styles use SCSS with nesting
- Never hardcode hex colors in component SCSS — use the CSS variables above

## Tech Stack Logos

- Whenever a tech stack, skill, or technology is displayed in the UI, **always pair it with its logo/icon**
- Use Font Awesome brands (`fa-brands`) for available icons first:
  - Angular → `fa-brands fa-angular` `#dd0031`
  - React → `fa-brands fa-react` `#61dafb`
  - Next.js → text badge `N` (no FA icon available)
  - TypeScript → text badge `TS` `#3178c6`
  - JavaScript → `fa-brands fa-js` `#f7df1e`
  - Python → `fa-brands fa-python` `#3776ab`
  - Java → `fa-brands fa-java` `#e76f00`
  - Node.js → `fa-brands fa-node-js` `#339933`
  - Git → `fa-brands fa-git-alt` `#f05032`
  - GitHub → `fa-brands fa-github`
  - AWS → `fa-brands fa-aws` `#ff9900`
  - Flutter → `fa-brands fa-flutter` `#02569b`
  - HTML → `fa-brands fa-html5` `#e34f26`
  - CSS → `fa-brands fa-css3-alt` `#1572b6`
  - Figma → `fa-brands fa-figma` `#f24e1e`
  - Docker → `fa-brands fa-docker` `#2496ed`
  - SQL / Database → `fa-solid fa-database` `#f59e0b`
  - REST API → `fa-solid fa-plug` `#a78bfa`
  - Tailwind CSS → text badge `~` `#06b6d4`
  - Vercel → text badge `▲`
  - Agile → `fa-solid fa-arrows-spin` `#60a5fa`
- For badges (no FA icon): render a small inline `<span class="tech-badge">` with the short text and brand color
- Never show a tech name as plain text alone — always include the icon/badge alongside it
- Icon color should use the brand's official hex (listed above) applied via `[style.color]` or a scoped CSS rule

## Coding Rules

- Write the **minimal** amount of code needed — no verbose boilerplate
- Do **not** add tests unless explicitly asked
- Do **not** remove existing code unless explicitly asked
- Batch all changes to the same file in a single edit — no incremental small edits
- Always include required imports in the same edit as the code that needs them
- When modifying a component, read the relevant section before editing
