/**
 * 介面基礎語系辭典（搭配 translator.module.js 實現全頁即時翻譯）
 */
import { APP_CONFIG } from "../config/app.config.js";

const STORAGE_KEY = "dementia_archive_locale";

export function getActiveLocale() {
  return localStorage.getItem(STORAGE_KEY) || APP_CONFIG.DEFAULT_LOCALE;
}

export function setActiveLocale(locale) {
  localStorage.setItem(STORAGE_KEY, locale);
}

export const UI_STRINGS = {
  searchPlaceholder: "站內搜尋失智症知識...",
  login: "管理登入",
  logout: "登出",
  uploadSingle: "單篇編輯",
  uploadBatch: "批次匯入",
  notebooklmBtn: "NotebookLM 互動"
};
