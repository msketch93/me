/**
 * GitHub Pages serves nested routes via a redirect query parameter.
 * Move that logic into code so CSPs can block inline scripts safely.
 */
export function applyGithubRedirectParam() {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const redirectParam = params.get("redirect");

  if (!redirectParam) {
    return;
  }

  let decoded: string;

  try {
    decoded = decodeURIComponent(redirectParam);
  } catch {
    return;
  }

  const [pathPart = "", searchPart = ""] = decoded.split("?");
  if (!pathPart) {
    return;
  }

  const normalizedPath = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const basePath = window.location.pathname.replace(/\/$/, "");
  const nextPath = `${basePath}${normalizedPath}`;
  const nextSearch = searchPart ? `?${searchPart}` : "";
  const nextUrl = `${nextPath}${nextSearch}${window.location.hash}`;

  params.delete("redirect");
  window.history.replaceState(null, "", nextUrl);
}
