/**
 * 一般化關鍵字與下拉篩選列元件
 */
import { ICONS } from "../modules/icons.module.js";

export function mountFilterBar(containerEl, { placeholder = "輸入關鍵字篩選...", extraSelects = [], onChange }) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="hairline-box p-4 bg-white flex flex-wrap items-center gap-3">
      <div class="flex-1 min-w-[220px] flex items-center gap-2 border border-[#E5DDD5] bg-[#FAF7F2] px-3 py-2">
        <span class="text-[#6B5E54]">${ICONS.search}</span>
        <input type="search" data-filter-search placeholder="${placeholder}" class="w-full bg-transparent text-sm focus:outline-none" />
      </div>
      ${extraSelects
        .map(
          (sel) => `
        <select data-filter-select="${sel.name}" class="border border-[#E5DDD5] bg-white px-3 py-2 text-xs text-[#4A3728] focus:outline-none">
          ${sel.options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("")}
        </select>
      `
        )
        .join("")}
    </div>
  `;

  const state = { search: "" };
  extraSelects.forEach((s) => (state[s.name] = s.options[0]?.value ?? "ALL"));

  let timer = null;
  const searchInput = containerEl.querySelector("[data-filter-search]");
  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => onChange?.({ ...state }), 220);
  });

  containerEl.querySelectorAll("[data-filter-select]").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      state[sel.dataset.filterSelect] = e.target.value;
      onChange?.({ ...state });
    });
  });
}
