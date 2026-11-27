/**
 * 頂部功能列 + 單一列主導覽列（嚴禁重複渲染導覽項目）
 */
import { APP_CONFIG } from "../config/app.config.js";
import { ICONS } from "../modules/icons.module.js";
import { initAuth, onAuthChange, signInWithPassword, signOut } from "../modules/auth.module.js";
import { initTranslator, switchLanguage, currentLanguage } from "../modules/translator.module.js";
import { openNotebookLMOverlay } from "./notebooklm-panel.js";

const PRIMARY_NAV = [
  { href: "index.html", label: "首頁總覽", code: "" },
  { href: "glossary.html", label: "專有名詞", code: "01." },
  { href: "papers.html", label: "研究論文", code: "02." },
  { href: "knowledge.html", label: "知識推廣", code: "03." },
  { href: "videos.html", label: "影音短片", code: "04." },
  { href: "games.html", label: "認知遊戲", code: "05." },
  { href: "team.html", label: "團隊介紹", code: "06." },
  { href: "achievements.html", label: "歷年成果", code: "07." }
];

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function renderLoginModal() {
  if (document.getElementById("auth-login-modal")) return;
  const modal = document.createElement("div");
  modal.id = "auth-login-modal";
  modal.className = "hidden fixed inset-0 z-50 bg-[#1C1917]/60 flex items-center justify-center p-4";
  modal.innerHTML = `
    <div class="w-full max-w-md hairline-box bg-white p-7">
      <div class="flex items-center justify-between pb-4 mb-5 hairline-b">
        <div>
          <p class="font-mono-index text-xs text-[#F37021]">[EDITOR AUTH]</p>
          <h3 class="font-serif-editorial text-xl">編審管理員登入</h3>
        </div>
        <button type="button" id="close-login-modal" class="btn-editorial p-1.5">${ICONS.close}</button>
      </div>
      <form id="login-form" class="space-y-4">
        <div>
          <label class="block text-xs font-mono-index text-[#6B5E54] mb-1">EMAIL</label>
          <input type="email" name="email" required class="w-full px-3 py-2 text-sm border border-[#E5DDD5] focus:outline-none focus:border-[#4A3728]" placeholder="editor@example.org" />
        </div>
        <div>
          <label class="block text-xs font-mono-index text-[#6B5E54] mb-1">PASSWORD</label>
          <input type="password" name="password" required class="w-full px-3 py-2 text-sm border border-[#E5DDD5] focus:outline-none focus:border-[#4A3728]" />
        </div>
        <p id="login-error" class="text-xs text-red-700 hidden"></p>
        <button type="submit" class="btn-hermes w-full py-2.5 text-sm">登入管理後台</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector("#close-login-modal").addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  modal.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = modal.querySelector("#login-error");
    errEl.classList.add("hidden");
    const fd = new FormData(e.target);
    try {
      await signInWithPassword(fd.get("email"), fd.get("password"));
      modal.classList.add("hidden");
      e.target.reset();
    } catch (err) {
      errEl.textContent = err.message || "登入失敗，請確認帳號密碼。";
      errEl.classList.remove("hidden");
    }
  });
}

export async function mountNavbar(containerId = "site-navbar") {
  const root = document.getElementById(containerId);
  if (!root || root.dataset.mounted === "1") return;
  root.dataset.mounted = "1";

  const activePage = getCurrentPage();
  const activeLocale = currentLanguage();

  root.innerHTML = `
    <header class="bg-white hairline-b sticky top-0 z-40">
      <!-- 頂部功能列 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 hairline-b">
        <a href="index.html" class="flex items-center gap-3 text-[#1C1917] group">
          <span class="text-[#F37021]">${ICONS.brand}</span>
          <div>
            <div class="font-serif-editorial text-lg leading-tight font-semibold tracking-wide">${APP_CONFIG.SITE_NAME}</div>
            <div class="font-mono-index text-[10px] text-[#6B5E54] tracking-widest">${APP_CONFIG.SITE_SUBTITLE}</div>
          </div>
        </a>

        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Google 站內搜尋 -->
          <form id="site-search-form" class="flex items-center border border-[#E5DDD5] bg-[#FAF7F2] px-2.5 py-1">
            <input type="search" id="site-search-input" placeholder="站內搜尋..." class="bg-transparent text-xs text-[#1C1917] w-32 sm:w-44 focus:outline-none" />
            <button type="submit" class="text-[#6B5E54] hover:text-[#F37021]" aria-label="搜尋">${ICONS.search}</button>
          </form>

          <!-- 多語系即時翻譯選單 -->
          <div class="inline-flex items-center gap-1.5 border border-[#E5DDD5] px-2 py-1 bg-white">
            <span class="text-[#6B5E54]">${ICONS.globe}</span>
            <select id="locale-selector" class="text-xs bg-transparent text-[#4A3728] focus:outline-none" aria-label="切換語系">
              ${APP_CONFIG.SUPPORTED_LOCALES.map(
                (l) => `<option value="${l.code}" ${l.code === activeLocale ? "selected" : ""}>${l.label}</option>`
              ).join("")}
            </select>
          </div>

          <!-- 登入後顯示之管理入口 -->
          <div id="auth-editor-links" class="hidden items-center gap-2">
            <a href="upload.html" class="btn-editorial px-2.5 py-1 text-xs inline-flex items-center gap-1">${ICONS.upload} 單篇編輯</a>
            <a href="batch-upload.html" class="btn-editorial px-2.5 py-1 text-xs">批次匯入</a>
          </div>

          <!-- 登入 / 登出 -->
          <button type="button" id="auth-toggle-btn" class="btn-editorial px-3 py-1 text-xs inline-flex items-center gap-1.5">
            ${ICONS.user} <span id="auth-btn-label">管理登入</span>
          </button>
        </div>
      </div>

      <!-- 單一列主導覽列 -->
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 bg-[#FDFBF7] overflow-x-auto">
        <div class="flex items-center gap-1 min-w-max py-2">
          ${PRIMARY_NAV.map((item) => {
            const isActive = activePage === item.href;
            return `
              <a href="${item.href}" class="px-3 py-1.5 text-xs sm:text-sm transition-colors border-b-2 ${
                isActive
                  ? "border-[#F37021] text-[#1C1917] font-semibold"
                  : "border-transparent text-[#6B5E54] hover:text-[#1C1917]"
              }">
                ${item.code ? `<span class="font-mono-index text-[11px] ${isActive ? "text-[#F37021]" : "text-[#8C7A6B]"} mr-1">${item.code}</span>` : ""}${item.label}
              </a>
            `;
          }).join("")}

          <button type="button" id="nav-notebooklm-btn" class="ml-auto btn-hermes px-3.5 py-1.5 text-xs font-mono-index tracking-wide inline-flex items-center gap-1.5">
            [NOTEBOOKLM] 互動
          </button>
        </div>
      </nav>
    </header>
  `;

  renderLoginModal();
  initTranslator();

  // 站內搜尋（支援 Google CSE 或 site: 查詢）
  root.querySelector("#site-search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = root.querySelector("#site-search-input").value.trim();
    if (!q) return;
    if (APP_CONFIG.GOOGLE_CSE_CX) {
      window.open(`https://cse.google.com/cse?cx=${encodeURIComponent(APP_CONFIG.GOOGLE_CSE_CX)}&q=${encodeURIComponent(q)}`, "_blank");
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(`site:${APP_CONFIG.SITE_DOMAIN} ${q}`)}`, "_blank");
    }
  });

  // 語系切換
  root.querySelector("#locale-selector").addEventListener("change", (e) => {
    switchLanguage(e.target.value);
  });

  // NotebookLM 覆蓋層按鈕
  root.querySelector("#nav-notebooklm-btn").addEventListener("click", () => {
    openNotebookLMOverlay();
  });

  // 驗證狀態綁定
  const authBtn = root.querySelector("#auth-toggle-btn");
  const authLabel = root.querySelector("#auth-btn-label");
  const editorLinks = root.querySelector("#auth-editor-links");

  onAuthChange((user) => {
    if (user) {
      authLabel.textContent = "登出";
      editorLinks.classList.remove("hidden");
      editorLinks.classList.add("inline-flex");
    } else {
      authLabel.textContent = "管理登入";
      editorLinks.classList.add("hidden");
      editorLinks.classList.remove("inline-flex");
    }
  });

  authBtn.addEventListener("click", async () => {
    if (authLabel.textContent === "登出") {
      await signOut();
    } else {
      document.getElementById("auth-login-modal")?.classList.remove("hidden");
    }
  });

  await initAuth();
}
