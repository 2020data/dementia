/**
 * Markdown + LaTeX（$...$ 與 $$...$$）內容渲染引擎
 * 依賴 CDN: marked, KaTeX, DOMPurify
 */
import { sanitizeHTML } from "./sanitizer.module.js";

function renderMathPlaceholders(raw = "") {
  const tokens = [];
  let text = String(raw || "");

  // 1. 區塊公式 $$...$$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
    const idx = tokens.length;
    tokens.push({ expr: expr.trim(), displayMode: true });
    return `@@KATEX_TOKEN_${idx}@@`;
  });

  // 2. 行內公式 $...$
  text = text.replace(/(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g, (_, expr) => {
    const idx = tokens.length;
    tokens.push({ expr: expr.trim(), displayMode: false });
    return `@@KATEX_TOKEN_${idx}@@`;
  });

  return { text, tokens };
}

export function renderMarkdown(md = "") {
  if (!md) return "";
  const { text, tokens } = renderMathPlaceholders(md);

  let html = "";
  if (typeof window !== "undefined" && window.marked) {
    window.marked.setOptions({ breaks: true, gfm: true });
    html = window.marked.parse(text);
  } else {
    html = `<p>${text.replace(/\n/g, "<br>")}</p>`;
  }

  // 還原 KaTeX 公式
  html = html.replace(/@@KATEX_TOKEN_(\d+)@@/g, (_, index) => {
    const item = tokens[Number(index)];
    if (!item) return "";
    if (typeof window !== "undefined" && window.katex) {
      try {
        return window.katex.renderToString(item.expr, {
          displayMode: item.displayMode,
          throwOnError: false,
          strict: false
        });
      } catch {
        return `<code>${item.expr}</code>`;
      }
    }
    return `<code>${item.expr}</code>`;
  });

  // 為外部圖片自動加上 lazy loading
  html = html.replace(/<img\s+/gi, '<img loading="lazy" class="my-4 border border-[#E5DDD5] max-w-full h-auto" ');
  return sanitizeHTML(html);
}
