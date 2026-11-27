/**
 * 典藏分享列（複製連結、LINE、Facebook、X）
 */
import { ICONS } from "./icons.module.js";

export function renderShareBar({ title = document.title, url = window.location.href } = {}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const id = `share-${Math.random().toString(36).slice(2, 8)}`;

  return `
    <div class="flex flex-wrap items-center gap-2 text-xs font-mono-index text-[#6B5E54]" data-share-bar="${id}">
      <span class="inline-flex items-center gap-1 uppercase tracking-wider mr-1">${ICONS.share} SHARE</span>
      <button type="button" class="btn-editorial px-2.5 py-1 copy-link-btn" data-url="${url}">複製連結</button>
      <a class="btn-editorial px-2.5 py-1" target="_blank" rel="noopener noreferrer" href="https://social-plugins.line.me/lineit/share?url=${encodedUrl}">LINE</a>
      <a class="btn-editorial px-2.5 py-1" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}">Facebook</a>
      <a class="btn-editorial px-2.5 py-1" target="_blank" rel="noopener noreferrer" href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}">X</a>
    </div>
  `;
}

export function bindShareBars(root = document) {
  root.querySelectorAll(".copy-link-btn").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", async () => {
      const targetUrl = btn.dataset.url || window.location.href;
      try {
        await navigator.clipboard.writeText(targetUrl);
        const orig = btn.textContent;
        btn.textContent = "已複製";
        setTimeout(() => (btn.textContent = orig), 1600);
      } catch {
        window.prompt("請手動複製連結：", targetUrl);
      }
    });
  });
}
