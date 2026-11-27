/**
 * 極細線條 SVG 圖示庫（stroke-width: 1.25，零 AI 機器人或星星圖示）
 */
const SVG_ATTR = 'fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="square" stroke-linejoin="miter"';

export const ICONS = {
  brand: `<svg class="w-6 h-6" viewBox="0 0 24 24" ${SVG_ATTR}><rect x="3" y="3" width="18" height="18"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="9" y1="12" x2="21" y2="12"/></svg>`,
  search: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.2" y2="16.2"/></svg>`,
  globe: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>`,
  book: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3V4z"/><line x1="4" y1="19" x2="18" y2="19"/></svg>`,
  external: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" ${SVG_ATTR}><path d="M14 4h6v6"/><line x1="10" y1="14" x2="20" y2="4"/><path d="M18 14v6H4V6h6"/></svg>`,
  close: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>`,
  copy: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" ${SVG_ATTR}><rect x="8" y="8" width="12" height="12"/><path d="M4 16V4h12"/></svg>`,
  user: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
  upload: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 20h16"/></svg>`,
  share: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" ${SVG_ATTR}><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><line x1="8.2" y1="10.8" x2="15.8" y2="6.2"/><line x1="8.2" y1="13.2" x2="15.8" y2="17.8"/></svg>`,
  play: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><polygon points="7,5 19,12 7,19"/></svg>`,
  windowPop: `<svg class="w-4 h-4" viewBox="0 0 24 24" ${SVG_ATTR}><rect x="3" y="4" width="18" height="16"/><line x1="3" y1="9" x2="21" y2="9"/></svg>`
};
