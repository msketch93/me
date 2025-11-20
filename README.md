# MSketch Portfolio

A modern portfolio for Mona Rafaat Abd El Ghani (MSketch) showcasing curated paintings, sketches, and studies with immersive project details, social reach, and a touch-friendly viewing experience.

## Getting Started
1. **Install prerequisites** – Node.js 20+ and npm.
2. **Install dependencies**
   ```sh
   npm ci
   ```
3. **Start the local dev server**
   ```sh
   npm run dev
   ```
   The app runs on http://localhost:8080 by default.

Available scripts:
- `npm run dev` – start Vite in dev mode.
- `npm run build` – produce a production build (set `VITE_BASE_PATH` when targeting GitHub Pages).
- `npm run preview` – preview the production build locally.
- `npm run lint` – lint the project with ESLint.

## GitHub Pages Deployment
The project is configured for GitHub Pages hosting:
- `vite.config.ts` switches the build base path to `/msketch/` (or `VITE_BASE_PATH`) so static assets resolve when served from `https://<user>.github.io/msketch/`.
- Run `VITE_BASE_PATH=/msketch/ npm run build` before publishing, or override the variable to match a custom Pages path/domain.
- Commit and push to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** so the included `Node CI` workflow can produce the distributable bundle for Pages.

If you prefer manual deployment, copy the `dist` folder contents from `npm run build` into the `gh-pages` branch (or upload through the Pages settings UI).

## Automated Workflows
- `.github/workflows/node.yml` runs linting/build checks on pushes and pull requests, building with the GitHub Pages base path.
- `.github/workflows/security.yml` activates GitHub CodeQL analysis plus an `npm audit` gate on every push/PR and on a weekly schedule.

## Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui components
- Embla Carousel for project imagery
- ESLint for quality gates

## About MSketch
MSketch is a Cairo-based visual artist blending realism with expressive abstraction across traditional paint, charcoal, and digital mediums. Explore the full gallery or connect via Behance and Instagram links exposed inside each project dialog.
