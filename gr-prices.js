/* Green Room: плашки прайса. Без скрипта все четыре раздела видны списком. */
(() => {
  const tabs = [...document.querySelectorAll(".gr-tile")];
  if (!tabs.length) return;
  document.documentElement.classList.add("gr-js");
  const panel = (t) => document.getElementById(t.getAttribute("aria-controls"));
  const set = (t, open) => {
    t.setAttribute("aria-expanded", String(open));
    const p = panel(t);
    p.classList.toggle("is-open", open);
    p.toggleAttribute("inert", !open);
  };
  tabs.forEach((t, i) => {
    set(t, i === 0);
    t.addEventListener("click", () => {
      const open = t.getAttribute("aria-expanded") !== "true";
      tabs.forEach((o) => set(o, o === t && open));
      if (open) {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        setTimeout(() => panel(t).scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }), 120);
      }
    });
  });
})();
