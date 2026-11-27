/**
 * 全站單檔核心設定（嚴禁放入 Supabase service_role key）
 */
export const APP_CONFIG = {
  SITE_NAME: "失智症知識典藏與推廣平台",
  SITE_SUBTITLE: "DEMENTIA ARCHIVE & PUBLIC EDUCATION",
  SITE_DESCRIPTION: "結合臨床醫學、神經科學研究、照護實務與認知訓練的長期開放知識典藏平台。",
  BRAND_MONOGRAM: "DA",
  COPYRIGHT_OWNER: "Dementia Knowledge Archive Initiative",

  // Supabase 公開連線設定（僅允許放 Anon Public Key）
  SUPABASE_URL: "https://YOUR_PROJECT_ID.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_SUPABASE_ANON_PUBLIC_KEY",

  // 外部圖床 ImgBB API Key（供後台直接上傳圖片，亦可直接貼外部圖片網址）
  IMGBB_API_KEY: "",

  // Google 站內搜尋設定
  SITE_DOMAIN: "your-username.github.io/dementia-archive-platform",
  GOOGLE_CSE_CX: "",

  // NotebookLM 單一正式連結（禁止以 iframe 內嵌，由大框啟動面板開啟）
  NOTEBOOKLM_URL: "https://notebooklm.google.com/notebook/YOUR_NOTEBOOK_ID",

  // 預設語系與全頁即時翻譯設定
  DEFAULT_LOCALE: "zh-TW",
  ENABLE_LIVE_TRANSLATION: true,
  SUPPORTED_LOCALES: [
    { code: "zh-TW", label: "繁體中文" },
    { code: "en", label: "English" },
    { code: "ms", label: "Bahasa Melayu" },
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" },
    { code: "zh-CN", label: "简体中文" }
  ],

  // 歷年成果一般化場域分類（可隨時擴充）
  ACHIEVEMENT_SCOPES: [
    { id: "CAMPUS", code: "SC-01", label: "校內／機構內", description: "院內講座、跨科培訓與機構計畫" },
    { id: "COMMUNITY", code: "SC-02", label: "社區與校外", description: "失智友善社區據點、家屬工作坊與公益倡議" },
    { id: "NATIONAL", code: "SC-03", label: "全國／國際交流", description: "全國研討會、國際學術合作與政策建言" }
  ],

  // 分頁預設筆數
  PAGINATION: {
    GLOSSARY_PAGE_SIZE: 24,
    PAPERS_PAGE_SIZE: 12,
    KNOWLEDGE_PAGE_SIZE: 9
  }
};
