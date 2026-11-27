import { APP_CONFIG } from "../config/app.config.js";

export function mountFooter(containerId = "site-footer") {
  const root = document.getElementById(containerId);
  if (!root) return;
  const year = new Date().getFullYear();

  root.innerHTML = `
    <footer class="mt-20 bg-[#EFEAE2] hairline-t text-[#4A3728]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <p class="font-mono-index text-xs text-[#F37021] mb-2">[ARCHIVE EDITION]</p>
          <h3 class="font-serif-editorial text-xl text-[#1C1917] mb-2">${APP_CONFIG.SITE_NAME}</h3>
          <p class="text-xs text-[#6B5E54] leading-relaxed">${APP_CONFIG.SITE_DESCRIPTION}</p>
        </div>
        <div>
          <p class="font-mono-index text-xs text-[#6B5E54] mb-3 uppercase">Knowledge Index</p>
          <ul class="grid grid-cols-2 gap-2 text-xs">
            <li><a href="glossary.html" class="hover:text-[#F37021]">01. 專有名詞詞庫</a></li>
            <li><a href="papers.html" class="hover:text-[#F37021]">02. 研究論文典藏</a></li>
            <li><a href="knowledge.html" class="hover:text-[#F37021]">03. 最新知識推廣</a></li>
            <li><a href="videos.html" class="hover:text-[#F37021]">04. 影音與短片</a></li>
            <li><a href="games.html" class="hover:text-[#F37021]">05. 認知訓練遊戲</a></li>
            <li><a href="achievements.html" class="hover:text-[#F37021]">07. 歷年成果專區</a></li>
          </ul>
        </div>
        <div>
          <p class="font-mono-index text-xs text-[#6B5E54] mb-3 uppercase">Disclaimer</p>
          <p class="text-xs text-[#6B5E54] leading-relaxed">
            本平台所有衛教資訊、詞彙解釋與認知訓練遊戲僅供大眾教育與學術參考，無法取代專業醫師之臨床診斷與治療建議。
          </p>
        </div>
      </div>
      <div class="hairline-t py-4 text-center font-mono-index text-[11px] text-[#6B5E54]">
        © ${year} ${APP_CONFIG.COPYRIGHT_OWNER} · Open Static Knowledge Architecture
      </div>
    </footer>
  `;
}
