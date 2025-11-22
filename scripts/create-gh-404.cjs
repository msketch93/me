#!/usr/bin/env node

const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_INDEX = path.join(DIST_DIR, "index.html");
const DIST_404 = path.join(DIST_DIR, "404.html");
const PUBLIC_404 = path.join(ROOT_DIR, "public", "404.html");

const FALLBACK_TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <script>
      (function () {
        const { pathname, search, hash } = window.location;
        const segments = pathname.split("/").filter(Boolean);
        const repo = segments.length ? \`/\${segments[0]}\` : "";
        const base = repo || "";
        const pathAfterBase = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
        const normalizedPath = pathAfterBase.startsWith("/") ? pathAfterBase : \`/\${pathAfterBase}\`;
        const redirectTarget = encodeURIComponent(\`\${normalizedPath}\${search}\`);
        const destinationBase = base ? \`\${base}/\` : "/";
        const destination = \`\${destinationBase}?redirect=\${redirectTarget}\${hash}\`;
        window.location.replace(destination);
      })();
    </script>
  </head>
  <body></body>
</html>
`;

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Missing dist output at: ${DIST_DIR}. Did you run "npm run build"?`);
    process.exit(1);
  }

  if (!fs.existsSync(DIST_INDEX)) {
    console.error(`dist/index.html is missing. Unable to generate GitHub Pages 404 file.`);
    process.exit(1);
  }

  let template = FALLBACK_TEMPLATE;

  if (fs.existsSync(PUBLIC_404)) {
    try {
      template = await fsp.readFile(PUBLIC_404, "utf8");
    } catch (error) {
      console.warn(`Failed to read ${PUBLIC_404}. Falling back to default template.`, error);
    }
  }

  try {
    await fsp.writeFile(DIST_404, template, "utf8");
    console.log(`Created GitHub Pages friendly 404 at ${path.relative(ROOT_DIR, DIST_404)}`);
  } catch (error) {
    console.error("Failed to create dist/404.html", error);
    process.exit(1);
  }
}

main();
