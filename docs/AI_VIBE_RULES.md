# AI Vibe Coding Rules - Angular Portfolio

## 1) Product Direction (Non-Negotiable)
- Build a clean, modern, editorial portfolio style.
- Visual personality: warm neutral background, black typography, orange accent.
- Home page sections (single-page flow): Hero, About, Services, Resume, Portfolio, Testimonials, Contact.
- Default language tone: concise, confident, human.

## 2) Visual Rules (Based on Your References)
- Color tokens only (no random hex in components):
  - `--color-bg`: soft warm off-white
  - `--color-surface`: white / light card
  - `--color-text`: near-black
  - `--color-muted`: medium gray
  - `--color-accent`: orange CTA/highlight
- Typography:
  - Strong bold display heading for hero/section titles.
  - Clean sans-serif body font with high readability.
  - Heading scale should be consistent (`h1 > h2 > h3`), no arbitrary sizes.
- Spacing system:
  - Use 8px spacing scale only (`8, 16, 24, 32, 40, 48, 64, 80`).
  - Section vertical spacing must be consistent.
- Layout:
  - Max content width container (`1140-1280px`) centered.
  - Use grid for cards, flex for nav and micro layouts.
  - Desktop first visual parity, then responsive behavior.
- UI behavior:
  - Buttons: one primary accent style, one secondary ghost style.
  - Cards: subtle border, mild radius, clean hover.
  - Animations: short and intentional (`150-250ms`), no heavy effects.

## 3) Engineering Rules for AI-Assisted Development
- One task = one prompt = one commit.
- Every AI-generated change must pass:
  - `npm run lint`
  - `npm run test` (or targeted tests)
  - local manual responsive check (mobile/tablet/desktop)
- Never accept AI code blindly:
  - Review for duplicated logic.
  - Remove dead code and unused imports.
  - Verify accessibility labels and semantic tags.
- Keep prompts explicit:
  - include goal
  - include constraints
  - include file targets
  - include done criteria
- Add short PR notes for each change:
  - what changed
  - why
  - risk
  - how verified

## 4) Angular Architecture Rules
- Use standalone components.
- Use `OnPush` change detection by default.
- Feature-first organization (not type-first global dumping).
- Keep components dumb/presentational when possible.
- Move business/data logic to services/facades.
- Use typed models/interfaces for all section data.
- Use route-level lazy loading for large sections/pages.
- No direct API calls inside templates/components if avoidable.

## 5) Recommended Folder Structure (PEZA-style Enterprise Pattern)
```txt
src/
  app/
    core/
      config/
      constants/
      guards/
      interceptors/
      layout/
        navbar/
        footer/
      services/
      utils/
    shared/
      components/
        ui/
          button/
          section-header/
          card/
      directives/
      pipes/
      models/
      helpers/
    features/
      home/
        pages/
          home-page/
        sections/
          hero/
          about/
          services/
          resume/
          portfolio/
          testimonials/
          contact/
        data/
          home-content.ts
        home.routes.ts
      admin/              # optional future CMS-like panel
    app.routes.ts
    app.config.ts
    app.component.ts
  assets/
    fonts/
    icons/
    images/
    portfolio/
  styles/
    abstracts/
      _tokens.scss
      _mixins.scss
      _functions.scss
    base/
      _reset.scss
      _typography.scss
      _utilities.scss
    themes/
      _default.scss
    main.scss
  environments/
    environment.ts
    environment.prod.ts
```

## 6) Naming Conventions
- Files: kebab-case (`hero-section.component.ts`).
- Classes/Interfaces: PascalCase.
- Variables/functions: camelCase.
- Selector prefix: `app-`.
- Avoid generic names like `data.service.ts`; use domain names (`portfolio-projects.service.ts`).

## 7) Content/Data Rules
- Keep editable portfolio data in typed local config first (`features/home/data`).
- Structure data by section:
  - personal intro
  - services
  - experience
  - projects
  - testimonials
  - contacts/social links
- If backend is added later, keep same interface contract.

## 8) Responsiveness & Accessibility Rules
- Required breakpoints (minimum):
  - mobile `<= 767px`
  - tablet `768-1023px`
  - desktop `>= 1024px`
- All interactive controls must have visible focus states.
- Contrast must meet WCAG AA.
- Images require meaningful `alt` text.
- Nav and section hierarchy must use semantic landmarks (`header`, `main`, `section`, `footer`).

## 9) Performance Rules
- Optimize and compress portfolio images.
- Use lazy loading for below-the-fold media.
- Avoid oversized UI libraries for simple components.
- Track bundle growth; reject large unnecessary deps.

## 10) Git Workflow Rules
- Branch naming:
  - `feat/<area>-<short-desc>`
  - `fix/<area>-<short-desc>`
- Commit style (Conventional Commits):
  - `feat(hero): add intro CTA block`
  - `fix(navbar): correct mobile menu focus trap`
- PR checklist:
  - lint/test pass
  - responsive screenshots
  - accessibility quick check
  - no console errors

## 11) "Do Not" List
- Do not mix theme values directly into component CSS.
- Do not create huge components (>250 lines) without splitting.
- Do not store secrets in frontend code.
- Do not merge AI output without review + verification.

## 12) Definition of Done (Per Task)
- Feature implemented and visually aligned with reference vibe.
- Code follows folder and naming standards.
- Lint/tests pass.
- Mobile/tablet/desktop validated.
- Accessibility and performance basics checked.
