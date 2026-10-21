(function () {
  const root = document.documentElement;

  // Theme
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (saved) root.dataset.theme = saved;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });

  // Mobile menu
  const links = document.getElementById("navLinks");
  document.getElementById("menuBtn").addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Projects
  const projects = window.PROJECTS || [];
  const grid = document.getElementById("projectsGrid");
  const filters = document.getElementById("filters");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function card(p, i) {
    const imgs = p.images || [];
    const cover = imgs.length
      ? `<button class="cover" data-i="${i}" aria-label="Open screenshots"><img src="${esc(imgs[0])}" alt="${esc(p.title)} screenshot" loading="lazy" />${imgs.length > 1 ? `<span class="count">${imgs.length} images</span>` : ""}</button>`
      : `<div class="cover placeholder" aria-hidden="true"><span>${esc(p.title.split(" ").map((w) => w[0]).join("").slice(0, 3))}</span></div>`;
    const hl = (p.highlights || []).length ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : "";
    const tech = (p.tech || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("");
    const l = p.links || {};
    const linkHtml = [
      l.live && `<a href="${esc(l.live)}" target="_blank" rel="noopener">Live ↗</a>`,
      l.code && `<a href="${esc(l.code)}" target="_blank" rel="noopener">Code ↗</a>`,
    ].filter(Boolean).join("");
    return `<article class="project${p.featured ? " featured" : ""}">
      ${cover}
      <div class="body">
        ${p.featured ? `<span class="badge">Featured</span>` : ""}
        <h3>${esc(p.title)}</h3>
        ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ""}
        <p>${esc(p.description || "")}</p>
        ${hl}
        <div class="chips">${tech}</div>
        ${linkHtml ? `<div class="links">${linkHtml}</div>` : ""}
      </div>
    </article>`;
  }

  let active = "All";
  function render() {
    grid.innerHTML = projects
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => active === "All" || (p.tech || []).includes(active))
      .map(({ p, i }) => card(p, i))
      .join("");
  }

  // Filter chips: tags used by 2+ projects
  const counts = {};
  projects.forEach((p) => (p.tech || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  const tags = ["All", ...Object.keys(counts).filter((t) => counts[t] > 1)];
  if (tags.length > 2) {
    filters.innerHTML = tags.map((t) => `<button class="filter${t === active ? " on" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      active = b.dataset.tag;
      filters.querySelectorAll(".filter").forEach((x) => x.classList.toggle("on", x === b));
      render();
    });
  }
  render();

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCaption");
  let cur = null, idx = 0;
  function show() {
    lbImg.src = cur.images[idx];
    lbImg.alt = `${cur.title} screenshot ${idx + 1}`;
    lbCap.textContent = `${cur.title} · ${idx + 1} / ${cur.images.length}`;
  }
  function step(d) { idx = (idx + d + cur.images.length) % cur.images.length; show(); }
  function close() { lb.hidden = true; document.body.style.overflow = ""; }
  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".cover[data-i]");
    if (!b) return;
    cur = projects[+b.dataset.i]; idx = 0; show();
    lb.hidden = false; document.body.style.overflow = "hidden";
  });
  document.getElementById("lbClose").onclick = close;
  document.getElementById("lbPrev").onclick = () => step(-1);
  document.getElementById("lbNext").onclick = () => step(1);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
