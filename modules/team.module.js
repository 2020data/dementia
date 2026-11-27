import { getSupabase } from "./supabase.module.js";

const DEMO_TEAM = [
  {
    id: "demo-t1",
    group_id: "T1",
    name: "林文德 教授",
    role: "計畫總主持人 / 神經退化研究顧問",
    bio_md: "深耕阿茲海默症流行病學與高齡照護政策逾二十年，致力於推動跨學科失智友善知識開放典藏。",
    avatar_url: "",
    specialties: ["神經流行病學", "友善政策", "學術指導"],
    profile_url: "https://orcid.org/",
    sort_order: 1
  },
  {
    id: "demo-t2",
    group_id: "T2",
    name: "陳雅惠 醫師",
    role: "臨床神經內科主治醫師",
    bio_md: "負責專有名詞臨床審定、早期診斷量表衛教與家屬溝通專欄編撰。",
    avatar_url: "",
    specialties: ["記憶門診", "生物標記", "臨床衛教"],
    profile_url: "",
    sort_order: 2
  },
  {
    id: "demo-t3",
    group_id: "T4",
    name: "張哲維",
    role: "平台架構師與高齡介面設計",
    bio_md: "主導模組化靜態典藏架構、高對比無障礙排版與認知訓練遊戲外掛引擎設計。",
    avatar_url: "",
    specialties: ["前端架構", "高齡 UX", "資料視覺化"],
    profile_url: "",
    sort_order: 3
  }
];

export async function fetchTeamMembers({ groupId = "ALL" } = {}) {
  const sb = getSupabase();
  if (!sb) {
    let rows = [...DEMO_TEAM];
    if (groupId !== "ALL") rows = rows.filter((m) => m.group_id === groupId);
    return { data: rows, isDemo: true };
  }
  let query = sb.from("team_members").select("*");
  if (groupId !== "ALL") query = query.eq("group_id", groupId);
  const { data, error } = await query.order("sort_order", { ascending: true });
  if (error) throw error;
  return { data: data || [], isDemo: false };
}
