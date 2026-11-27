/**
 * 認知訓練遊戲外掛 02：日常順序排列（執行功能與生活流程規劃）
 */
import { getBestRecord, saveBestRecord } from "../modules/games.module.js";

const SCENARIOS = {
  easy: [
    {
      title: "泡一壺溫暖的好茶",
      steps: ["將開水煮沸", "溫壺並放入茶葉", "注入熱水靜置浸泡", "倒出茶湯細細品茗"]
    },
    {
      title: "出門到公園散步",
      steps: ["換上好走的平底鞋", "攜帶鑰匙與飲用水", "鎖好大門走出戶外", "在公園林蔭道散步"]
    }
  ],
  hard: [
    {
      title: "準備一頓營養早餐",
      steps: ["洗淨雙手與食材", "將雞蛋與蔬菜下鍋烹調", "盛盤並準備溫熱豆漿", "坐下細嚼慢嚥享用", "餐後整理並清洗餐具"]
    }
  ]
};

export function mountGame(container, { slug = "daily-sequence", difficulty = "easy" } = {}) {
  const pool = SCENARIOS[difficulty] || SCENARIOS.easy;
  let scenarioIdx = 0;
  let shuffled = [];
  let chosen = [];
  let feedback = "";

  function loadScenario() {
    const sc = pool[scenarioIdx % pool.length];
    shuffled = sc.steps.map((text, correctIndex) => ({ text, correctIndex })).sort(() => Math.random() - 0.5);
    chosen = [];
    feedback = "";
    render();
  }

  function render() {
    const sc = pool[scenarioIdx % pool.length];
    const best = getBestRecord(slug, difficulty) || "尚未通關";
    const remaining = shuffled.filter((item) => !chosen.includes(item));

    container.innerHTML = `
      <div class="hairline-box p-6 bg-white">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 hairline-b">
          <div>
            <p class="font-mono-index text-xs text-[#F37021]">[DAILY SEQUENCE]</p>
            <h4 class="font-serif-editorial text-2xl text-[#1C1917]">情境題：${sc.title}</h4>
          </div>
          <div class="flex items-center gap-3 text-xs text-[#6B5E54]">
            <span>本機紀錄：${best}</span>
            <button type="button" id="ds-reset" class="btn-editorial px-3 py-1.5">重設本題</button>
            <button type="button" id="ds-next" class="btn-editorial px-3 py-1.5">換一題</button>
          </div>
        </div>

        <div class="mb-6">
          <p class="font-mono-index text-xs text-[#6B5E54] mb-2">您的排列順序（點擊可取消最後一步）：</p>
          <div class="min-h-[72px] p-4 bg-[#FAF7F2] saddle-stitch flex flex-wrap gap-3 items-center">
            ${
              chosen.length === 0
                ? `<span class="text-sm text-[#6B5E54]">請依序點選下方的生活步驟...</span>`
                : chosen
                    .map(
                      (item, idx) => `
                  <button type="button" data-remove-idx="${idx}" class="px-4 py-2.5 bg-white border border-[#4A3728] text-[#1C1917] text-base font-medium">
                    <span class="font-mono-index text-xs text-[#F37021] mr-2">${idx + 1}.</span>${item.text}
                  </button>`
                    )
                    .join("")
            }
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-3 mb-6">
          ${remaining
            .map(
              (item) => `
            <button type="button" data-pick-index="${item.correctIndex}" class="p-4 text-left text-base border border-[#E5DDD5] bg-white hover:border-[#F37021] transition-colors">
              ${item.text}
            </button>
          `
            )
            .join("")}
        </div>

        ${feedback ? `<div class="p-4 mb-4 bg-[#EFEAE2] text-sm text-[#1C1917]">${feedback}</div>` : ""}

        <button type="button" id="ds-check" class="btn-hermes px-6 py-2.5 text-sm" ${chosen.length !== sc.steps.length ? "disabled style='opacity:0.5;cursor:not-allowed'" : ""}>
          核對順序
        </button>
      </div>
    `;

    container.querySelector("#ds-reset").addEventListener("click", () => {
      chosen = [];
      feedback = "";
      render();
    });
    container.querySelector("#ds-next").addEventListener("click", () => {
      scenarioIdx += 1;
      loadScenario();
    });
    container.querySelectorAll("[data-pick-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.pickIndex);
        const found = shuffled.find((s) => s.correctIndex === idx);
        if (found) chosen.push(found);
        render();
      });
    });
    container.querySelectorAll("[data-remove-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        chosen.splice(Number(btn.dataset.removeIdx), 1);
        render();
      });
    });
    container.querySelector("#ds-check").addEventListener("click", () => {
      const ok = chosen.every((item, idx) => item.correctIndex === idx);
      if (ok) {
        feedback = "順序完全正確！您的生活流程規劃非常清晰。";
        saveBestRecord(slug, difficulty, "已完成通關");
      } else {
        feedback = "步驟順序還有一點小差異，您可以點擊上方卡片調整後再試一次。";
      }
      render();
    });
  }

  loadScenario();
}
