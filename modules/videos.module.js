import { getSupabase } from "./supabase.module.js";

const DEMO_VIDEOS = [
  {
    id: "demo-v1",
    format: "long",
    category_id: "V1",
    title: "認識失智症早期警訊與腦部退化機制（專題講座）",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80",
    duration: "18:40",
    description_md: "**重點時間軸**\n- `00:00` 正常老化與輕度認知障礙差異\n- `06:20` 類澱粉蛋白沉積與影像診斷\n- `12:45` 家屬陪伴與早期介入資源",
    created_at: "2026-10-01T00:00:00Z"
  },
  {
    id: "demo-v2",
    format: "short",
    category_id: "V2",
    title: "當長輩重複問「吃飯了沒」？30 秒示範溫和回應法",
    video_url: "https://www.youtube.com/shorts/aqz-KE-bpKQ",
    thumbnail_url: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80",
    duration: "00:48",
    description_md: "避免直接糾正「剛剛才吃過」，改以**順應情緒 + 轉移焦點**降低長者焦慮。",
    created_at: "2026-10-18T00:00:00Z"
  }
];

export function toSafeEmbedUrl(rawUrl = "") {
  try {
    const u = new URL(rawUrl);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/shorts/")[1]?.split("/")[0];
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchVideos({ format = "long", categoryId = "ALL" } = {}) {
  const sb = getSupabase();
  if (!sb) {
    let rows = DEMO_VIDEOS.filter((v) => v.format === format);
    if (categoryId !== "ALL") rows = rows.filter((v) => v.category_id === categoryId);
    return { data: rows, isDemo: true };
  }
  let query = sb.from("videos").select("*").eq("format", format);
  if (categoryId !== "ALL") query = query.eq("category_id", categoryId);
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return { data: data || [], isDemo: false };
}
