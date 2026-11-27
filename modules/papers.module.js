import { getSupabase } from "./supabase.module.js";

const DEMO_PAPERS = [
  {
    id: "demo-p1",
    year: 2026,
    category_id: "P2",
    title: "Plasma p-tau217 血液生物標記於基層醫療早期篩檢阿茲海默症之診斷準確度研究",
    authors: "Chen Y-H, Lin M-C, Takahashi K, et al.",
    journal: "Journal of Alzheimer's Clinical Research, Vol. 18(2)",
    doi_url: "https://doi.org/10.1000/demo-ptau217-2026",
    abstract_md: "本研究納入 1,240 名社區長者，評估血漿 $p\\text{-tau217}$ 對於類澱粉 PET 陽性之預測能力。結果顯示其曲線下面積達 $AUC = 0.94$（$95\\%\\text{ CI}: 0.91\\text{–}0.96$），可作為低侵入性初篩工具，顯著降低不必要之高成本影像檢查。",
    tags: ["p-tau217", "血液生物標記", "早期篩檢"]
  },
  {
    id: "demo-p2",
    year: 2025,
    category_id: "P4",
    title: "失智友善社區據點介入對家庭照顧者憂鬱與照護負荷之縱貫追蹤",
    authors: "Wang S-L, Wu P-T, Huang C-Y",
    journal: "Taiwan Journal of Gerontological Care, Vol. 12(4)",
    doi_url: "https://doi.org/10.1000/demo-caregiver-2025",
    abstract_md: "為期 12 個月的追蹤研究指出，每週參與社區喘息與家屬支持團體的照顧者，其 Zarit 照護負荷量表分數平均下降 $18.4\\%$（$p < 0.001$），顯示社區支持網絡對延緩機構化具有關鍵作用。",
    tags: ["照顧者支持", "友善社區", "ZBI"]
  },
  {
    id: "demo-p3",
    year: 2024,
    category_id: "P6",
    title: "結合華語自然語音韻律特徵與輕量級模型之輕度認知障礙輔助篩檢",
    authors: "Liu H-W, Chang R-J",
    journal: "Digital Health & Aging, Vol. 9(1)",
    doi_url: "https://doi.org/10.1000/demo-speech-ai-2024",
    abstract_md: "透過 3 分鐘看圖說故事之語音停頓比例與詞彙多樣性特徵，在獨立測試集上達到靈敏度 $86.2\\%$ 與特異度 $84.7\\%$，適合部署於偏鄉巡迴篩檢。",
    tags: ["語音分析", "MCI", "AI篩檢"]
  }
];

export async function fetchPaperYears() {
  const sb = getSupabase();
  if (!sb) {
    return [...new Set(DEMO_PAPERS.map((p) => p.year))].sort((a, b) => b - a);
  }
  const { data, error } = await sb.from("research_papers").select("year").order("year", { ascending: false });
  if (error) throw error;
  return [...new Set((data || []).map((r) => r.year))];
}

export async function fetchPapers({ year = "ALL", categoryId = "ALL", search = "" } = {}) {
  const sb = getSupabase();
  if (!sb) {
    let rows = [...DEMO_PAPERS];
    if (year !== "ALL") rows = rows.filter((r) => String(r.year) === String(year));
    if (categoryId !== "ALL") rows = rows.filter((r) => r.category_id === categoryId);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.authors.toLowerCase().includes(q) ||
          (r.abstract_md || "").toLowerCase().includes(q)
      );
    }
    return { data: rows, isDemo: true };
  }

  let query = sb.from("research_papers").select("*");
  if (year !== "ALL") query = query.eq("year", Number(year));
  if (categoryId !== "ALL") query = query.eq("category_id", categoryId);
  if (search.trim()) {
    const q = search.trim();
    query = query.or(`title.ilike.%${q}%,authors.ilike.%${q}%,journal.ilike.%${q}%,abstract_md.ilike.%${q}%`);
  }
  const { data, error } = await query.order("year", { ascending: false }).order("created_at", { ascending: false });
  if (error) throw error;
  return { data: data || [], isDemo: false };
}

export async function batchInsertPapers(records) {
  const sb = getSupabase();
  if (!sb) throw new Error("請先設定 Supabase 連線才能執行批次匯入。");
  const { data, error } = await sb.from("research_papers").insert(records).select();
  if (error) throw error;
  return data;
}
