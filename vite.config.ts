import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    },
    base: isDev ? "/" : resolveBasePath(),
    plugins: [
      react({
        fastRefresh: false,
      }),
      isDev && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
