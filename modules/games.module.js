/**
 * 認知訓練遊戲登錄中心（Game Registry）
 * 支援內建 ES Module 外掛（games/*.game.js）與外部互動網頁連結
 */
import { getSupabase } from "./supabase.module.js";

const BUILTIN_REGISTRY = [
  {
    id: "builtin-memory-match",
    slug: "memory-match",
    title: "典藏記憶配對翻牌",
    cognitive_domain: "M-MEM",
    difficulty: "初階 / 進階",
    engine_type: "builtin",
    module_path_or_url: "../games/memory-match.game.js",
    config_json: {
      description: "大字體高對比中文詞彙與符號配對，無焦慮倒數計時，專注訓練短期視覺工作記憶。",
      instructions: "每次點選兩張卡片翻開。若圖案與文字相同即配對成功；記住卡片位置，以最少步數完成所有配對。"
    },
    is_active: true
  },
  {
    id: "builtin-daily-sequence",
    slug: "daily-sequence",
    title: "日常順序排列",
    cognitive_domain: "M-EXE",
    difficulty: "初階 / 進階",
    engine_type: "builtin",
    module_path_or_url: "../games/daily-sequence.game.js",
    config_json: {
      description: "將熟悉的生活情境（如泡茶、出門散步、準備早餐）依合理步驟依序排列，強化執行功能與邏輯規劃。",
      instructions: "依序點選下方步驟卡片，組成正確的生活流程。隨時可重來，沒有時間壓力。"
    },
    is_active: true
  }
];

export async function fetchGames({ domain = "ALL" } = {}) {
  const sb = getSupabase();
  let list = [...BUILTIN_REGISTRY];
  let isDemo = true;

  if (sb) {
    const { data, error } = await sb.from("games").select("*").eq("is_active", true).order("created_at", { ascending: true });
    if (!error && data && data.length > 0) {
      list = data;
      isDemo = false;
    }
  }
  if (domain !== "ALL") {
    list = list.filter((g) => g.cognitive_domain === domain);
  }
  return { data: list, isDemo };
}

export async function mountGamePlugin(game, containerEl, difficulty = "easy") {
  if (game.engine_type === "external") {
    containerEl.innerHTML = `
      <div class="p-8 text-center hairline-box bg-[#FDFBF7]">
        <p class="font-mono-index text-xs text-[#6B5E54] mb-2">[EXTERNAL MODULE]</p>
        <h3 class="font-serif-editorial text-2xl mb-3">${game.title}</h3>
        <p class="text-sm text-[#6B5E54] mb-6">${game.config_json?.description || "外部認知互動練習模組"}</p>
        <a href="${game.module_path_or_url}" target="_blank" rel="noopener noreferrer" class="btn-hermes px-6 py-2.5 inline-block text-sm">開啟外部遊戲視窗</a>
      </div>
    `;
    return;
  }

  const mod = await import(game.module_path_or_url);
  if (typeof mod.mountGame !== "function") {
    throw new Error(`遊戲模組 ${game.slug} 缺少 mountGame(container, options) 匯出函式。`);
  }
  return mod.mountGame(containerEl, {
    slug: game.slug,
    difficulty,
    config: game.config_json || {}
  });
}

export function getBestRecord(slug, difficulty) {
  const key = `dementia_game_best_${slug}_${difficulty}`;
  return localStorage.getItem(key);
}

export function saveBestRecord(slug, difficulty, scoreText) {
  const key = `dementia_game_best_${slug}_${difficulty}`;
  localStorage.setItem(key, scoreText);
}
