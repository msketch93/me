import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const formatBasePath = (basePath: string) => {
  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }
  if (!basePath.endsWith("/")) {
    basePath = `${basePath}/`;
  }
  return basePath;
};

const DEFAULT_REPO_BASE = "me";

const resolveBasePath = () => {
  if (process.env.VITE_BASE_PATH) {
    return formatBasePath(process.env.VITE_BASE_PATH);
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (repoName) {
    return formatBasePath(repoName);
  }

  return formatBasePath(DEFAULT_REPO_BASE);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::",
      port: 8080,
      headers: {
        // Add a strict CSP header for dev server
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'; base-uri 'self'; connect-src 'self' ws://localhost:8080; img-src 'self' data:; font-src 'self';"
      },
    },
    base: isDev ? "/" : resolveBasePath(),
    plugins: [
      react(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: 'esbuild', // Explicitly use esbuild for minification
    },
  };
});
