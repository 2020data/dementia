/**
 * 全頁即時翻譯引擎（透過 Google Translate Element Cookie 觸發無縫多語切換）
 */
import { APP_CONFIG } from "../config/app.config.js";
import { getActiveLocale, setActiveLocale } from "./i18n.module.js";

let initialized = false;

export function initTranslator() {
  if (!APP_CONFIG.ENABLE_LIVE_TRANSLATION || initialized) return;
  initialized = true;

  let container = document.getElementById("google_translate_element");
  if (!container) {
    container = document.createElement("div");
    container.id = "google_translate_element";
    container.className = "hidden";
    document.body.appendChild(container);
  }

  window.googleTranslateElementInit = () => {
    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "zh-TW",
          includedLanguages: APP_CONFIG.SUPPORTED_LOCALES.map((l) => l.code).join(","),
          autoDisplay: false
        },
        "google_translate_element"
      );
    }
  };

  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
}

export function switchLanguage(targetLang) {
  setActiveLocale(targetLang);
  const host = window.location.hostname;

  if (targetLang === "zh-TW") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host}`;
    window.location.reload();
    return;
  }

  const val = `/zh-TW/${targetLang}`;
  document.cookie = `googtrans=${val}; path=/;`;
  document.cookie = `googtrans=${val}; path=/; domain=.${host}`;

  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    combo.value = targetLang;
    combo.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
}

export function currentLanguage() {
  return getActiveLocale();
}
