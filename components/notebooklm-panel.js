/**
 * NotebookLM 互動外掛元件（嚴禁使用 iframe，避免 Google 登入重新導向阻擋）
 * 支援：
 *  1) openNotebookLMOverlay() 頁內大框覆蓋層
 *  2) mountNotebookLMInline(containerEl) 內頁／獨立頁掛載
 */
import { APP_CONFIG } from "../config/app.config.js";
import { ICONS } from "../modules/icons.module.js";

const SAMPLE_PROMPTS = [
  "請用白話文說明「阿茲海默症」與「路易氏體失智症」在早期症狀上有何不同？",
  "家中長輩傍晚常出現日落症候群與焦躁不安，請提供 5 個具體的居家環境與溝通調整建議。",
  "請比較 MMSE、MoCA 與 CDR 三種失智症評估量表的適用情境與判讀重點。",
  "面對失智長者重複提問或懷疑東西被偷，照顧者應如何以同理心回應而不引起衝突？",
  "請整理台灣長照資源中「輔助宣告」、「監護宣告」與「喘息服務」的申請流程與差異。"
];

function buildPanelBody() {
  const url = APP_CONFIG.NOTEBOOKLM_URL;
  return `
    <div class="p-6 md:p-8 bg-[#FAF7F2]">
      <div class="hairline-box p-6 md:p-8 bg-white mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 hairline-b">
          <div>
            <p class="font-mono-index text-xs text-[#F37021] tracking-widest mb-1">[NOTEBOOKLM · INTERACTIVE ARCHIVE]</p>
            <h3 class="font-serif-editorial text-2xl text-[#1C1917]">失智症文獻與照護知識互動工作區</h3>
          </div>
          <span class="font-mono-index text-xs px-2.5 py-1 bg-[#EFEAE2] text-[#4A3728]">SECURE POPUP LAUNCHER</span>
        </div>

        <p class="text-sm text-[#6B5E54] leading-relaxed mb-6">
          本互動工作區已整合失智症臨床指引、專有名詞與照護手冊。因應 Google 帳號安全政策禁止第三方網域內嵌框架，請使用下方典藏啟動按鈕，於獨立視窗或新分頁開啟完整語音摘要與問答功能。
        </p>

        <div class="flex flex-wrap gap-3">
          <button type="button" data-nlm-popup class="btn-hermes px-5 py-2.5 text-sm inline-flex items-center gap-2">
            ${ICONS.windowPop} 啟動 NotebookLM 獨立互動視窗
          </button>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-editorial px-5 py-2.5 text-sm inline-flex items-center gap-2">
            ${ICONS.external} 於新分頁開啟
          </a>
        </div>
      </div>

      <div class="saddle-stitch p-6 bg-[#FDFBF7]">
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-serif-editorial text-lg text-[#1C1917]">失智症常見提問（一鍵複製並貼至 NotebookLM）</h4>
          <span class="font-mono-index text-xs text-[#6B5E54]">PROMPT ARCHIVE</span>
        </div>
        <div class="grid gap-3">
          ${SAMPLE_PROMPTS.map(
            (q, idx) => `
            <div class="hairline-box p-3.5 flex items-start justify-between gap-4 bg-white">
              <div class="text-sm text-[#1C1917]">
                <span class="font-mono-index text-xs text-[#F37021] mr-2">Q0${idx + 1}.</span>${q}
              </div>
              <button type="button" data-copy-prompt="${q.replace(/"/g, "&quot;")}" class="btn-editorial shrink-0 px-3 py-1.5 text-xs font-mono-index inline-flex items-center gap-1.5">
                ${ICONS.copy} 複製
              </button>
            </div>
          `
          ).join("")}
        </div>
      </div>
    </div>
  `;
}

function bindPanelEvents(root) {
  const url = APP_CONFIG.NOTEBOOKLM_URL;
  root.querySelectorAll("[data-nlm-popup]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const w = Math.min(1200, window.screen.availWidth - 80);
      const h = Math.min(840, window.screen.availHeight - 80);
      const left = Math.max(0, (window.screen.availWidth - w) / 2);
      const top = Math.max(0, (window.screen.availHeight - h) / 2);
      window.open(url, "NotebookLMWindow", `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`);
    });
  });

  root.querySelectorAll("[data-copy-prompt]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy-prompt");
      try {
        await navigator.clipboard.writeText(text);
        const orig = btn.innerHTML;
        btn.textContent = "已複製";
        setTimeout(() => (btn.innerHTML = orig), 1500);
      } catch {
        window.prompt("請手動複製提問：", text);
      }
    });
  });
}

export function mountNotebookLMInline(containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = buildPanelBody();
  bindPanelEvents(containerEl);
}

export function openNotebookLMOverlay() {
  let overlay = document.getElementById("nlm-overlay-modal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "nlm-overlay-modal";
    overlay.className = "fixed inset-0 z-50 bg-[#1C1917]/60 flex items-center justify-center p-3 md:p-6";
    overlay.innerHTML = `
      <div class="w-full max-w-4xl max-h-[90vh] overflow-y-auto hairline-box bg-[#FAF7F2]">
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white hairline-b">
          <div class="flex items-center gap-3">
            <span class="font-mono-index text-xs text-[#F37021]">[NOTEBOOKLM]</span>
            <span class="font-serif-editorial text-base text-[#1C1917]">互動知識檢索面板</span>
          </div>
          <div class="flex items-center gap-2">
            <a href="notebooklm.html" class="btn-editorial px-3 py-1.5 text-xs inline-flex items-center gap-1.5">
              ${ICONS.external} 開啟獨立頁
            </a>
            <button type="button" id="nlm-overlay-close" class="btn-editorial px-3 py-1.5 text-xs inline-flex items-center gap-1">
              ${ICONS.close} 關閉
            </button>
          </div>
        </div>
        <div id="nlm-overlay-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    mountNotebookLMInline(overlay.querySelector("#nlm-overlay-body"));

    overlay.querySelector("#nlm-overlay-close").addEventListener("click", () => overlay.classList.add("hidden"));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.add("hidden");
    });
  } else {
    overlay.classList.remove("hidden");
  }
}
