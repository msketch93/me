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
The build automatically targets GitHub Pages:
- `vite.config.ts` detects the `VITE_BASE_PATH` env var first, then falls back to the repository name from `GITHUB_REPOSITORY`, and finally `/`. This keeps static asset URLs correct for `<user>.github.io/<repo>/` (e.g., `https://msketch93.github.io/me/`).
- `BrowserRouter` reads `import.meta.env.BASE_URL`, so client-side navigation stays within `/me` (or whichever base path you use).
- The workflow already exports `VITE_BASE_PATH=/<repo>/`, so you typically don’t need to set anything manually. For custom domains or different paths, override `VITE_BASE_PATH` (e.g., `VITE_BASE_PATH=/portfolio/ npm run build`).
- Commit and push to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** so the included `Node CI` workflow can ship the bundle automatically.

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
