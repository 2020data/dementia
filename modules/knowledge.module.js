import { getSupabase } from "./supabase.module.js";

const DEMO_KNOWLEDGE = [
  {
    id: "demo-k1",
    category_id: "K2",
    subcategory: "十大警訊",
    title: "健忘與失智的關鍵差異：家屬觀察的五個日常指標",
    cover_url: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&w=1200&q=80",
    content_md: "老化帶來的記憶衰退通常是「暫時想不起來，經提醒後能回憶」；而失智症則常表現為**整個事件完全遺忘**，且開始影響日常財務、用藥與定向能力。\n\n### 就醫前準備清單\n1. 記錄近三個月內重複發生的異常事件與日期。\n2. 整理長者目前所有慢性病處方箋。\n3. 預約神經內科或記憶門診進行完整神經心理評估。",
    gallery_json: [
      {
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
        caption: "圖 01｜早期記憶門診評估與家屬會談紀錄"
      }
    ],
    is_featured: true,
    created_at: "2026-10-15T08:00:00Z"
  },
  {
    id: "demo-k2",
    category_id: "K1",
    subcategory: "麥得飲食",
    title: "從餐桌守護認知儲備：麥得飲食（MIND Diet）實踐指南",
    cover_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    content_md: "結合地中海飲食與得舒飲食優點，強調深綠色蔬菜、莓果、堅果、全穀與橄欖油攝取，減少紅肉與精緻糖分。\n\n研究指出，高依從度者的大腦認知老化速度可顯著放緩。",
    gallery_json: [],
    is_featured: false,
    created_at: "2026-09-20T08:00:00Z"
  }
];

export async function fetchKnowledgePosts({ categoryId = "ALL", search = "" } = {}) {
  const sb = getSupabase();
  if (!sb) {
    let rows = [...DEMO_KNOWLEDGE];
    if (categoryId !== "ALL") rows = rows.filter((r) => r.category_id === categoryId);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((r) => r.title.toLowerCase().includes(q) || (r.content_md || "").toLowerCase().includes(q));
    }
    return { data: rows, isDemo: true };
  }

  let query = sb.from("knowledge_posts").select("*");
  if (categoryId !== "ALL") query = query.eq("category_id", categoryId);
  if (search.trim()) {
    const q = search.trim();
    query = query.or(`title.ilike.%${q}%,content_md.ilike.%${q}%`);
  }
  const { data, error } = await query.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
  if (error) throw error;
  return { data: data || [], isDemo: false };
}
