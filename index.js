import { createServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function start() {
  try {
    const server = await createServer({
      configFile: path.resolve(__dirname, "vite.config.ts"),
    });

    await server.listen();
    server.printUrls();
    console.log("\nVite dev server running via `npm start`");
  } catch (error) {
    console.error("Failed to start Vite dev server:", error);
    process.exitCode = 1;
  }
}

start();
