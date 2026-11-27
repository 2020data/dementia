/**
 * 側邊分類索引元件（供詞庫、論文、知識推廣頁複用）
 */
export function renderCategorySidebar({ title = "分類索引", items = [], activeId = "ALL", onSelect }) {
  const wrapper = document.createElement("aside");
  wrapper.className = "hairline-box p-5 bg-white space-y-2";
  wrapper.innerHTML = `
    <p class="font-mono-index text-[11px] text-[#6B5E54] uppercase tracking-widest pb-2 hairline-b">${title}</p>
    <div class="flex flex-col gap-1.5 pt-1" data-sidebar-list>
      <button type="button" data-cat-id="ALL" class="cat-pill text-left px-3 py-2 text-xs ${activeId === "ALL" ? "active" : ""}">
        <span class="font-mono-index mr-1.5">ALL</span>全部項目
      </button>
      ${items
        .map(
          (c) => `
        <button type="button" data-cat-id="${c.id}" style="--btn-accent:${c.accentColor}" class="cat-pill text-left px-3 py-2 text-xs ${activeId === c.id ? "active" : ""}">
          <span class="font-mono-index mr-1.5">${c.code}</span>${c.label}
        </button>
      `
        )
        .join("")}
    </div>
  `;

  wrapper.querySelectorAll("[data-cat-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.catId;
      wrapper.querySelectorAll("[data-cat-id]").forEach((b) => b.classList.toggle("active", b === btn));
      if (typeof onSelect === "function") onSelect(id);
    });
  });

  return wrapper;
}
