import { getSupabase } from "./supabase.module.js";

const DEMO_ACHIEVEMENTS = [
  {
    id: "demo-a1",
    year: 2026,
    scope: "COMMUNITY",
    title: "2026 失智友善社區共學行動與巡迴衛教成果",
    subtitle: "串聯 14 處社區據點，建構高齡認知支持與家屬喘息網絡",
    event_date: "2026-03-01 至 2026-10-31",
    location: "新北市與桃園市合作社區據點",
    cover_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    editor_name: "典藏編輯委員會",
    metrics_json: [
      { label: "合作社區據點", value: "14 處" },
      { label: "累計參與長者與家屬", value: "1,860 人次" },
      { label: "認知篩檢轉介協助", value: "215 案" },
      { label: "友善天使培訓", value: "320 位" }
    ],
    gallery_json: [
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
        link: "",
        caption: "社區失智友善講座與家屬交流座談"
      },
      {
        url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
        link: "",
        caption: "跨世代認知遊戲體驗攤位現場"
      }
    ],
    overview_md: "本年度聚焦於**早期識別與去污名化推廣**，透過實體工作坊結合本平台線上詞庫與認知小遊戲，讓社區據點能持續自主運作。\n\n### 量化成效摘要\n課後問卷顯示，參與民眾對失智症早期警訊之正確認知率由前測 $54\\%$ 提升至後測 $91\\%$。",
    committee_md: "- **召集人**：林文德 教授\n- **臨床顧問**：陳雅惠 醫師、黃明志 職能治療師\n- **社區督導**：王淑芬 社工師",
    staff_md: "- **專案統籌**：李佳穎\n- **衛教內容與視覺**：張哲維、劉宇軒\n- **志工團隊**：共計 42 名失智友善推廣志工",
    extra_subpages: [
      {
        slug: "media-coverage",
        title: "媒體與合作紀錄",
        content_md: "### 合作夥伴名錄\n- 地方衛生所與失智共同照護中心\n- 社區發展協會與圖書館分館"
      }
    ]
  }
];

export async function fetchAchievements() {
  const sb = getSupabase();
  if (!sb) return { data: DEMO_ACHIEVEMENTS, isDemo: true };
  const { data, error } = await sb.from("achievements").select("*").order("year", { ascending: false });
  if (error) throw error;
  return { data: data && data.length ? data : DEMO_ACHIEVEMENTS, isDemo: !(data && data.length) };
}

export async function saveAchievement(record) {
  const sb = getSupabase();
  if (!sb) throw new Error("請先設定 Supabase 連線才能儲存成果紀錄。");
  const { data, error } = await sb.from("achievements").upsert(record).select().single();
  if (error) throw error;
  return data;
}

/**
 * 一鍵延續至下一年度：複製架構、委員會、工作團隊與自訂子頁設定
 */
export async function cloneToNextYear(sourceRecord) {
  const nextYear = Number(sourceRecord.year) + 1;
  const payload = {
    year: nextYear,
    scope: sourceRecord.scope,
    title: sourceRecord.title.replace(String(sourceRecord.year), String(nextYear)),
    subtitle: `${sourceRecord.subtitle || ""}（${nextYear} 年度延續計畫）`,
    event_date: `${nextYear}-01-01 至 ${nextYear}-12-31`,
    location: sourceRecord.location || "",
    cover_url: sourceRecord.cover_url || "",
    editor_name: sourceRecord.editor_name || "",
    metrics_json: (sourceRecord.metrics_json || []).map((m) => ({ label: m.label, value: "規劃中" })),
    gallery_json: [],
    overview_md: `本頁由 ${sourceRecord.year} 年度成果一鍵延續建立，請編輯年度摘要。`,
    committee_md: sourceRecord.committee_md || "",
    staff_md: sourceRecord.staff_md || "",
    extra_subpages: sourceRecord.extra_subpages || []
  };
  return saveAchievement(payload);
}
