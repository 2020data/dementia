import { getSupabase } from "./supabase.module.js";

const DEMO_GLOSSARY = [
  {
    id: "demo-g1",
    term_zh: "阿茲海默症",
    term_en: "Alzheimer's Disease",
    acronym: "AD",
    category_id: "G1",
    subcategory: "阿茲海默症",
    summary: "最常見的神經退化性失智症，約佔所有失智症病例的 60% 至 70%，核心病理為類澱粉斑塊與神經纖維糾結。",
    detail_md: "阿茲海默症（Alzheimer's Disease, AD）是一種漸進式神經退化疾病。\n\n### 核心病理指標\n臨床研究常以腦脊髓液比值評估類澱粉沉積風險：\n$$\\text{Ratio}_{A\\beta} = \\frac{A\\beta_{42}}{A\\beta_{40}}$$\n當比值顯著下降，代表大腦中 $A\\beta_{42}$ 傾向聚集形成斑塊。\n\n### 照護建議\n早期確立診斷有助於家庭提早規劃醫療決策、財務信託與認知刺激活動。",
    related_terms: ["類澱粉蛋白", "MMSE", "CDR"]
  },
  {
    id: "demo-g2",
    term_zh: "日落症候群",
    term_en: "Sundowning Syndrome",
    acronym: "BPSD-SD",
    category_id: "G2",
    subcategory: "睡眠與日落",
    summary: "失智症長者在傍晚或日落時分出現焦躁、混亂、遊走或情緒起伏加劇的晝夜節律現象。",
    detail_md: "日落症候群並非獨立疾病，而是常見的行為與心理症狀（BPSD）表現。\n\n- **環境調整**：傍晚前即打開柔和充足的室內照明，減少陰影引發的錯覺。\n- **作息穩定**：白天安排適度日照與溫和體能活動，避免午後過長午睡。",
    related_terms: ["精神行為症狀", "懷舊治療"]
  },
  {
    id: "demo-g3",
    term_zh: "簡易智能狀態測驗",
    term_en: "Mini-Mental State Examination",
    acronym: "MMSE",
    category_id: "G3",
    subcategory: "認知量表",
    summary: "臨床最廣泛使用的 30 分制認知篩檢量表，涵蓋定向感、注意力、記憶力、語言與視空間建構。",
    detail_md: "MMSE 總分 30 分，判讀時需考量受試者的教育程度。臨床上常與 $MoCA$（蒙特利爾認知評估）搭配使用，以提升輕度認知障礙（MCI）的偵測靈敏度。",
    related_terms: ["CDR", "阿茲海默症"]
  },
  {
    id: "demo-g4",
    term_zh: "認知刺激治療",
    term_en: "Cognitive Stimulation Therapy",
    acronym: "CST",
    category_id: "G4",
    subcategory: "認知刺激",
    summary: "具實證基礎的團體非藥物介入方案，透過主題式討論與感官活動維持輕中度失智長者的語言與思考功能。",
    detail_md: "標準 CST 療程通常為期 7 週、每週 2 次，每次 45 分鐘。重點在於**引導觀點而非測驗事實**，降低長者的挫折感。",
    related_terms: ["懷舊治療", "日落症候群"]
  },
  {
    id: "demo-g5",
    term_zh: "輔助宣告",
    term_en: "Declaration of Assistance",
    acronym: "LAW-DA",
    category_id: "G5",
    subcategory: "法律保障",
    summary: "民法保護機制，針對因精神障礙或心智缺陷致判斷力顯著減弱者，由法院選任輔助人協助重大財產與法律行為。",
    detail_md: "相較於監護宣告，**輔助宣告**保留當事人日常生活之自主能力，僅在不動產處分、借貸、保證等重大法律行為時需經輔助人同意。",
    related_terms: ["監護宣告", "預立醫療決定"]
  }
];

export async function fetchGlossaryTerms({ categoryId = "ALL", search = "", letter = "ALL", page = 1, pageSize = 24 } = {}) {
  const sb = getSupabase();
  if (!sb) {
    let rows = [...DEMO_GLOSSARY];
    if (categoryId !== "ALL") rows = rows.filter((r) => r.category_id === categoryId);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          (r.term_zh || "").toLowerCase().includes(q) ||
          (r.term_en || "").toLowerCase().includes(q) ||
          (r.acronym || "").toLowerCase().includes(q) ||
          (r.summary || "").toLowerCase().includes(q)
      );
    }
    if (letter !== "ALL") {
      rows = rows.filter((r) => (r.term_en || r.acronym || "").toUpperCase().startsWith(letter));
    }
    const total = rows.length;
    const from = (page - 1) * pageSize;
    return { data: rows.slice(from, from + pageSize), total, isDemo: true };
  }

  let query = sb.from("glossary_terms").select("*", { count: "exact" });
  if (categoryId !== "ALL") query = query.eq("category_id", categoryId);
  if (search.trim()) {
    const q = search.trim();
    query = query.or(`term_zh.ilike.%${q}%,term_en.ilike.%${q}%,acronym.ilike.%${q}%,summary.ilike.%${q}%`);
  }
  if (letter !== "ALL") {
    query = query.ilike("term_en", `${letter}%`);
  }
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count, error } = await query.order("term_en", { ascending: true }).range(from, to);
  if (error) throw error;
  return { data: data || [], total: count || 0, isDemo: false };
}

export async function upsertGlossaryTerm(payload) {
  const sb = getSupabase();
  if (!sb) throw new Error("請先設定 Supabase 連線才能寫入資料庫。");
  const { data, error } = await sb.from("glossary_terms").upsert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function batchInsertGlossary(records) {
  const sb = getSupabase();
  if (!sb) throw new Error("請先設定 Supabase 連線才能執行批次匯入。");
  const { data, error } = await sb.from("glossary_terms").insert(records).select();
  if (error) throw error;
  return data;
}
