/**
 * 全站可擴充一般化分類體系
 * 所有分類均包含 id, code, label, accentColor, subcategories, keywords
 */
export const TAXONOMY = {
  glossary: [
    {
      id: "G1",
      code: "G1",
      label: "疾病類型與病理機制",
      accentColor: "#8C4A27",
      subcategories: ["阿茲海默症", "血管性失智", "路易氏體失智", "額顳葉退化", "分子病理"],
      keywords: ["amyloid", "tau", "alzheimer", "lewy", "類澱粉蛋白", "濤蛋白"]
    },
    {
      id: "G2",
      code: "G2",
      label: "臨床症狀與行為表徵",
      accentColor: "#6D5447",
      subcategories: ["記憶障礙", "精神行為症狀(BPSD)", "語言與視空間", "睡眠與日落"],
      keywords: ["sundowning", "日落症候群", "妄想", "失語症", "遊走"]
    },
    {
      id: "G3",
      code: "G3",
      label: "診斷評估與檢查工具",
      accentColor: "#3D5A58",
      subcategories: ["認知量表", "神經影像", "生物標記", "鑑別診斷"],
      keywords: ["MMSE", "MoCA", "CDR", "PET", "MRI", "CSF"]
    },
    {
      id: "G4",
      code: "G4",
      label: "藥物治療與非藥物介入",
      accentColor: "#5E6B4C",
      subcategories: ["抗類澱粉單株抗體", "乙醯膽鹼酯酶抑制劑", "認知刺激", "懷舊與藝術治療"],
      keywords: ["lecanemab", "donepezil", "CST", "懷舊治療", "音樂治療"]
    },
    {
      id: "G5",
      code: "G5",
      label: "長照資源、法律與照護實務",
      accentColor: "#7A4E48",
      subcategories: ["長照2.0", "法律保障", "居家安全", "照顧者支持"],
      keywords: ["輔助宣告", "監護宣告", "喘息服務", "預立醫療決定", "AD"]
    }
  ],

  papers: [
    {
      id: "P1",
      code: "P-NEURO",
      label: "基礎神經科學",
      accentColor: "#4A3728",
      subcategories: ["蛋白質折疊", "神經發炎", "突觸退化"],
      keywords: ["neuroscience", "microglia", "synapse"]
    },
    {
      id: "P2",
      code: "P-CLIN",
      label: "臨床診斷與生物標記",
      accentColor: "#3D5A58",
      subcategories: ["血液生物標記", "影像分析", "早期篩檢"],
      keywords: ["p-tau217", "biomarker", "diagnosis"]
    },
    {
      id: "P3",
      code: "P-THER",
      label: "藥物與非藥物療法",
      accentColor: "#8C4A27",
      subcategories: ["臨床試驗", "生活型態介入", "復健"],
      keywords: ["RCT", "therapy", "intervention"]
    },
    {
      id: "P4",
      code: "P-CARE",
      label: "照顧者支持與實務",
      accentColor: "#6D5447",
      subcategories: ["照護負荷", "溝通訓練", "社區據點"],
      keywords: ["caregiver", "burden", "support"]
    },
    {
      id: "P5",
      code: "P-PUB",
      label: "公共衛生與政策",
      accentColor: "#5E6B4C",
      subcategories: ["流行病學", "友善城市", "經濟評估"],
      keywords: ["epidemiology", "policy", "public health"]
    },
    {
      id: "P6",
      code: "P-AI",
      label: "AI 輔助篩檢與數位健康",
      accentColor: "#7A4E48",
      subcategories: ["語音分析", "眼動追蹤", "數位療法"],
      keywords: ["AI", "machine learning", "speech", "digital"]
    }
  ],

  knowledge: [
    {
      id: "K1",
      code: "K-PREV",
      label: "預防與大腦保健",
      accentColor: "#5E6B4C",
      subcategories: ["麥得飲食", "規律運動", "社交互動"],
      keywords: ["預防", "飲食", "運動", "聽力"]
    },
    {
      id: "K2",
      code: "K-SIGN",
      label: "早期徵兆與就醫指南",
      accentColor: "#8C4A27",
      subcategories: ["十大警訊", "門診準備", "病程分期"],
      keywords: ["警訊", "記憶力門診", "神經內科"]
    },
    {
      id: "K3",
      code: "K-COMM",
      label: "溝通技巧與行為應對",
      accentColor: "#4A3728",
      subcategories: ["同理溝通", "重複提問", "防走失"],
      keywords: ["溝通", "妄想", "重複提問"]
    },
    {
      id: "K4",
      code: "K-POLICY",
      label: "政策新知與補助資源",
      accentColor: "#3D5A58",
      subcategories: ["長照專線", "財務信託", "友善天使"],
      keywords: ["1966", "信託", "政策"]
    }
  ],

  videos: [
    {
      id: "V1",
      code: "V-EDU",
      label: "衛教專題講座",
      accentColor: "#4A3728",
      subcategories: ["醫師開講", "研討會實錄"],
      keywords: ["講座", "醫學"]
    },
    {
      id: "V2",
      code: "V-CARE",
      label: "照護情境示範",
      accentColor: "#8C4A27",
      subcategories: ["居家溝通", "日常協助"],
      keywords: ["示範", "照護"]
    },
    {
      id: "V3",
      code: "V-STORY",
      label: "人物訪談與紀實",
      accentColor: "#6D5447",
      subcategories: ["家屬心聲", "友善社區"],
      keywords: ["訪談", "紀錄"]
    }
  ],

  games: [
    {
      id: "M-MEM",
      code: "COG-01",
      label: "記憶力訓練",
      accentColor: "#8C4A27",
      subcategories: ["短期記憶", "視覺配對"],
      keywords: ["記憶", "配對"]
    },
    {
      id: "M-ATT",
      code: "COG-02",
      label: "專注力與觀察",
      accentColor: "#3D5A58",
      subcategories: ["選擇性注意", "視覺搜尋"],
      keywords: ["專注", "分類"]
    },
    {
      id: "M-EXE",
      code: "COG-03",
      label: "執行功能與邏輯",
      accentColor: "#5E6B4C",
      subcategories: ["順序規劃", "日常生活推演"],
      keywords: ["順序", "規劃", "執行功能"]
    }
  ],

  team: [
    {
      id: "T1",
      code: "GRP-01",
      label: "核心指導與顧問",
      accentColor: "#4A3728",
      subcategories: ["總計畫主持", "榮譽顧問"],
      keywords: ["顧問", "主持"]
    },
    {
      id: "T2",
      code: "GRP-02",
      label: "臨床醫療專家",
      accentColor: "#3D5A58",
      subcategories: ["神經內科", "精神科", "職能治療"],
      keywords: ["醫師", "治療師"]
    },
    {
      id: "T3",
      code: "GRP-03",
      label: "學術研究團隊",
      accentColor: "#8C4A27",
      subcategories: ["文獻編審", "資料科學"],
      keywords: ["研究", "編審"]
    },
    {
      id: "T4",
      code: "GRP-04",
      label: "設計與技術開發",
      accentColor: "#6D5447",
      subcategories: ["系統架構", "高齡介面設計"],
      keywords: ["設計", "工程"]
    },
    {
      id: "T5",
      code: "GRP-05",
      label: "推廣志工與合作夥伴",
      accentColor: "#5E6B4C",
      subcategories: ["社區講師", "合作機構"],
      keywords: ["志工", "社區"]
    }
  ]
};

export function getCategoryById(domain, id) {
  const list = TAXONOMY[domain] || [];
  return list.find((item) => item.id === id) || null;
}
