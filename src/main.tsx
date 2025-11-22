import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyGithubRedirectParam } from "./lib/applyRedirect";

applyGithubRedirectParam();

createRoot(document.getElementById("root")!).render(<App />);
