/**
 * XSS 防護模組：封裝 DOMPurify，並提供純文字跳脫工具
 */
export function sanitizeHTML(dirtyHtml = "") {
  if (typeof window !== "undefined" && window.DOMPurify) {
    return window.DOMPurify.sanitize(dirtyHtml, {
      ADD_TAGS: ["math", "semantics", "mrow", "mi", "mo", "mn", "msup", "msub", "mfrac", "annotation"],
      ADD_ATTR: ["target", "rel", "loading", "aria-hidden", "style", "class"]
    });
  }
  return escapeHTML(dirtyHtml);
}

export function escapeHTML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isSafeHttpUrl(url = "") {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
