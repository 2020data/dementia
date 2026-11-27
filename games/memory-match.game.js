/**
 * 認知訓練遊戲外掛 01：典藏記憶配對翻牌（高齡友善：大字體、高對比、無焦慮倒數）
 */
import { getBestRecord, saveBestRecord } from "../modules/games.module.js";

const CARD_PAIRS = [
  { id: "tea", text: "品茗", sub: "TEA" },
  { id: "walk", text: "散步", sub: "WALK" },
  { id: "music", text: "音樂", sub: "MUSIC" },
  { id: "book", text: "閱讀", sub: "READ" },
  { id: "flower", text: "賞花", sub: "FLORA" },
  { id: "sun", text: "日照", sub: "SUN" },
  { id: "fruit", text: "莓果", sub: "BERRY" },
  { id: "friend", text: "敘舊", sub: "CHAT" }
];

export function mountGame(container, { slug = "memory-match", difficulty = "easy" } = {}) {
  const pairCount = difficulty === "hard" ? 8 : 4;
  let deck = [];
  let flipped = [];
  let matched = new Set();
  let moves = 0;
  let locked = false;

  function initDeck() {
    const selected = CARD_PAIRS.slice(0, pairCount);
    deck = [...selected, ...selected]
      .map((item, idx) => ({ ...item, uid: `${item.id}-${idx}` }))
      .sort(() => Math.random() - 0.5);
    flipped = [];
    matched = new Set();
    moves = 0;
    locked = false;
    render();
  }

  function render() {
    const best = getBestRecord(slug, difficulty) || "尚無紀錄";
    const cols = difficulty === "hard" ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4";
    const completed = matched.size === pairCount;

    container.innerHTML = `
      <div class="hairline-box p-6 bg-white">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 hairline-b">
          <div class="flex items-center gap-4 text-sm">
            <span>翻牌次數：<strong class="font-mono-index text-[#F37021] text-lg">${moves}</strong></span>
            <span>已完成：<strong class="font-mono-index text-[#4A3728]">${matched.size} / ${pairCount}</strong></span>
            <span class="text-xs text-[#6B5E54]">本機最佳：${best}</span>
          </div>
          <button type="button" id="mm-restart" class="btn-editorial px-4 py-1.5 text-sm">重新洗牌</button>
        </div>

        ${
          completed
            ? `<div class="saddle-stitch p-5 mb-6 bg-[#FDFBF7] text-center">
                 <p class="font-serif-editorial text-2xl text-[#1C1917] mb-1">完成配對，表現優異</p>
                 <p class="text-sm text-[#6B5E54]">本次共使用 ${moves} 次翻牌完成所有主題記憶配對。</p>
               </div>`
            : ""
        }

        <div class="grid ${cols} gap-4">
          ${deck
            .map((card, i) => {
              const isOpen = flipped.includes(i) || matched.has(card.id);
              return `
              <button type="button" data-card-idx="${i}" class="h-28 sm:h-32 transition-all border ${
                matched.has(card.id)
                  ? "bg-[#EFEAE2] border-[#4A3728] text-[#4A3728]"
                  : isOpen
                  ? "bg-white border-[#F37021] text-[#1C1917]"
                  : "bg-[#4A3728] border-[#4A3728] text-[#FAF7F2] hover:bg-[#3A2B1F]"
              } flex flex-col items-center justify-center rounded-[2px]">
                ${
                  isOpen
                    ? `<span class="font-serif-editorial text-2xl font-semibold">${card.text}</span>
                       <span class="font-mono-index text-[11px] text-[#6B5E54] mt-1">${card.sub}</span>`
                    : `<span class="font-mono-index text-xs tracking-widest opacity-80">0${i + 1}</span>`
                }
              </button>
            `;
            })
            .join("")}
        </div>
      </div>
    `;

    container.querySelector("#mm-restart").addEventListener("click", initDeck);
    container.querySelectorAll("[data-card-idx]").forEach((btn) => {
      btn.addEventListener("click", () => handleFlip(Number(btn.dataset.cardIdx)));
    });
  }

  function handleFlip(index) {
    if (locked || flipped.includes(index) || matched.has(deck[index].id)) return;
    flipped.push(index);
    render();

    if (flipped.length === 2) {
      moves += 1;
      locked = true;
      const [a, b] = flipped;
      if (deck[a].id === deck[b].id) {
        matched.add(deck[a].id);
        flipped = [];
        locked = false;
        if (matched.size === pairCount) {
          const prev = Number((getBestRecord(slug, difficulty) || "").replace(/\D/g, "")) || Infinity;
          if (moves < prev) saveBestRecord(slug, difficulty, `${moves} 步`);
        }
        render();
      } else {
        setTimeout(() => {
          flipped = [];
          locked = false;
          render();
        }, 900);
      }
    }
  }

  initDeck();
}
