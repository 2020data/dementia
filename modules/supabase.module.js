/**
 * Supabase 用戶端初始化與一般化資料存取封裝
 */
import { APP_CONFIG } from "../config/app.config.js";

let client = null;

export function isSupabaseConfigured() {
  return (
    Boolean(APP_CONFIG.SUPABASE_URL) &&
    Boolean(APP_CONFIG.SUPABASE_ANON_KEY) &&
    !APP_CONFIG.SUPABASE_URL.includes("YOUR_PROJECT_ID") &&
    !APP_CONFIG.SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON")
  );
}

export function getSupabase() {
  if (client) return client;
  if (!isSupabaseConfigured()) return null;
  if (typeof window !== "undefined" && window.supabase?.createClient) {
    client = window.supabase.createClient(
      APP_CONFIG.SUPABASE_URL,
      APP_CONFIG.SUPABASE_ANON_KEY
    );
    return client;
  }
  return null;
}

/**
 * 外部圖床 ImgBB 上傳工具（若未設定 API Key 則提示直接貼外部連結）
 */
export async function uploadImageToImgBB(file) {
  if (!APP_CONFIG.IMGBB_API_KEY) {
    throw new Error("尚未於 config/app.config.js 設定 IMGBB_API_KEY，請直接貼上外部圖片網址。");
  }
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(APP_CONFIG.IMGBB_API_KEY)}`, {
    method: "POST",
    body: formData
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json?.error?.message || "圖片上傳失敗");
  }
  return json.data.url;
}
