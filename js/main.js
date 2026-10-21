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
      ? `<div class="cover"><img src="${esc(imgs[0])}" alt="${esc(p.title)} screenshot" loading="lazy" />${imgs.length > 1 ? `<span class="count">${imgs.length} images</span>` : ""}</div>`
      : `<div class="cover placeholder" aria-hidden="true"><span>${esc(p.title.split(" ").map((w) => w[0]).join("").slice(0, 3))}</span></div>`;
    const hl = (p.highlights || []).length ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : "";
    const tech = (p.tech || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("");
    const l = p.links || {};
    const linkHtml = [
      l.live && `<a href="${esc(l.live)}" target="_blank" rel="noopener">Live ↗</a>`,
      l.code && `<a href="${esc(l.code)}" target="_blank" rel="noopener">Code ↗</a>`,
    ].filter(Boolean).join("");
    return `<article class="project${p.featured ? " featured" : ""}" data-i="${i}" tabindex="0" role="button" aria-label="Open ${esc(p.title)}">
      ${cover}
      <div class="body">
        ${p.featured ? `<span class="badge">Featured</span>` : ""}
        <h3>${esc(p.title)}</h3>
        ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ""}
        <p>${esc(p.description || "")}</p>
        ${hl}
        <div class="chips">${tech}</div>
        ${linkHtml ? `<div class="links">${linkHtml}</div>` : ""}
        <span class="more">View project →</span>
      </div>
    </article>`;
  }

  function details(p) {
    const l = p.links || {};
    return `${p.featured ? `<span class="badge">Featured</span>` : ""}
      <h3 id="mTitle">${esc(p.title)}</h3>
      ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ""}
      <p>${esc(p.description || "")}</p>
      ${(p.highlights || []).length ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
      <div class="chips">${(p.tech || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      <div class="links">
        ${l.live ? `<a class="btn primary" href="${esc(l.live)}" target="_blank" rel="noopener">Open live ↗</a>` : ""}
        ${l.code ? `<a class="btn" href="${esc(l.code)}" target="_blank" rel="noopener">View code ↗</a>` : ""}
      </div>`;
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

  // Project viewer
  const modal = document.getElementById("modal");
  const mMedia = document.getElementById("mMedia");
  const mImg = document.getElementById("mImg");
  const mCount = document.getElementById("mCount");
  const mThumbs = document.getElementById("mThumbs");
  let cur = null, idx = 0, lastFocus = null;

  function show() {
    const imgs = cur.images || [];
    mMedia.hidden = !imgs.length;
    mThumbs.hidden = imgs.length < 2;
    if (!imgs.length) return;
    mImg.src = imgs[idx];
    mImg.alt = `${cur.title} screenshot ${idx + 1}`;
    mCount.textContent = imgs.length > 1 ? `${idx + 1} / ${imgs.length}` : "";
    mMedia.classList.toggle("single", imgs.length < 2);
    mThumbs.querySelectorAll("button").forEach((t, j) => t.classList.toggle("on", j === idx));
  }
  function step(d) {
    const n = (cur.images || []).length;
    if (n > 1) { idx = (idx + d + n) % n; show(); }
  }
  function open(i) {
    cur = projects[i]; idx = 0; lastFocus = document.activeElement;
    mThumbs.innerHTML = (cur.images || []).map((src, j) => `<button data-j="${j}" aria-label="Image ${j + 1}"><img src="${esc(src)}" alt="" /></button>`).join("");
    document.getElementById("mBody").innerHTML = details(cur);
    show();
    modal.hidden = false; document.body.style.overflow = "hidden";
    document.getElementById("mClose").focus();
  }
  function close() {
    modal.hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  grid.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const c = e.target.closest(".project");
    if (c) open(+c.dataset.i);
  });
  grid.addEventListener("keydown", (e) => {
    const c = e.target.closest(".project");
    if (c && (e.key === "Enter" || e.key === " ") && e.target === c) { e.preventDefault(); open(+c.dataset.i); }
  });
  mThumbs.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (t) { idx = +t.dataset.j; show(); }
  });
  mImg.addEventListener("click", () => step(1));
  document.getElementById("mClose").onclick = close;
  document.getElementById("mPrev").onclick = () => step(-1);
  document.getElementById("mNext").onclick = () => step(1);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
