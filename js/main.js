(function () {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { const el = e.target; el.classList.add("in"); io.unobserve(el); setTimeout(() => el.style.setProperty("--d", "0s"), 1400); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;
  function observe(el) { io ? io.observe(el) : el.classList.add("in"); }

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
    const vids = (p.videos || []).length;
    const cover = imgs.length
      ? `<div class="cover"><img src="${esc(imgs[0])}" alt="${esc(p.title)} screenshot" loading="lazy" />${imgs.length > 1 ? `<span class="count">${imgs.length} images</span>` : ""}${vids ? `<span class="play" aria-hidden="true">▶</span>` : ""}</div>`
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
    grid.querySelectorAll(".project").forEach((el, n) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(n % 3) * 0.08 + Math.floor(n / 3) * 0.04}s`);
      observe(el);
    });
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

  const mVid = document.getElementById("mVid");
  // Videos come first, then screenshots
  const mediaOf = (p) => [...(p.videos || []), ...(p.images || [])];
  const isVideo = (src) => /\.(mp4|webm|mov)(\?|$)/i.test(src) || embedUrl(src);
  function embedUrl(src) {
    let m = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
    m = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
    m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1`;
    return null;
  }
  function show() {
    const imgs = mediaOf(cur);
    mMedia.hidden = !imgs.length;
    mThumbs.hidden = imgs.length < 2;
    mVid.innerHTML = "";
    if (!imgs.length) return;
    const src = imgs[idx], emb = embedUrl(src);
    mImg.hidden = isVideo(src);
    mVid.hidden = !mImg.hidden;
    if (emb) mVid.innerHTML = `<iframe src="${esc(emb)}" title="${esc(cur.title)} video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    else if (mImg.hidden) mVid.innerHTML = `<video src="${esc(src)}" controls autoplay muted playsinline></video>`;
    else mImg.src = src;
    const el = mImg.hidden ? mVid : mImg;
    if (!reduce) el.animate([{ opacity: 0, transform: "scale(.985)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" });
    mImg.alt = `${cur.title} screenshot ${idx + 1}`;
    mCount.textContent = imgs.length > 1 ? `${idx + 1} / ${imgs.length}` : "";
    mMedia.classList.toggle("single", imgs.length < 2);
    mThumbs.querySelectorAll("button").forEach((t, j) => t.classList.toggle("on", j === idx));
  }
  function step(d) {
    const n = mediaOf(cur).length;
    if (n > 1) { idx = (idx + d + n) % n; show(); }
  }
  function open(i) {
    cur = projects[i]; idx = 0; lastFocus = document.activeElement;
    mThumbs.innerHTML = mediaOf(cur).map((src, j) => isVideo(src)
      ? `<button data-j="${j}" class="vid" aria-label="Video ${j + 1}"><span>▶</span></button>`
      : `<button data-j="${j}" aria-label="Image ${j + 1}"><img src="${esc(src)}" alt="" /></button>`).join("");
    document.getElementById("mBody").innerHTML = details(cur);
    show();
    modal.hidden = false; document.body.style.overflow = "hidden";
    document.getElementById("mClose").focus();
  }
  function close() {
    if (modal.hidden || modal.classList.contains("closing")) return;
    const done = () => {
      modal.classList.remove("closing");
      mVid.innerHTML = "";
      modal.hidden = true; document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };
    if (reduce) return done();
    modal.classList.add("closing");
    setTimeout(done, 240);
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

  // Static reveals
  document.querySelectorAll(".section-title, .portrait, .prose p, .skill-card, .edu > div, .contact .lead, .contact-links").forEach((el, n) => {
    el.classList.add("reveal"); observe(el);
  });
  document.querySelectorAll(".skills-grid .skill-card").forEach((el, n) => el.style.setProperty("--d", `${(n % 3) * 0.08}s`));
  document.querySelectorAll(".timeline > li").forEach((el) => { el.classList.add("reveal", "from-left"); observe(el); });

  // Count-up stats
  function countUp(el) {
    const m = el.textContent.match(/^([\d,]+)(.*)$/);
    if (!m || reduce) return;
    const target = +m[1].replace(/,/g, ""), suffix = m[2], t0 = performance.now(), dur = 1600;
    const fmt = (v) => (m[1].includes(",") ? v.toLocaleString("en-US") : String(v)) + suffix;
    (function tick(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(Math.round(target * e));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  setTimeout(() => document.querySelectorAll(".stats strong").forEach(countUp), 700);

  // Scroll progress + active nav link
  const bar = document.getElementById("progress");
  const navA = [...document.querySelectorAll(".nav-links a")];
  const secs = navA.map((a) => document.querySelector(a.getAttribute("href")));
  let ticking = false;
  function onScroll() {
    ticking = false;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    let cur = -1;
    secs.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    navA.forEach((a, i) => a.classList.toggle("active", i === cur));
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Card spotlight follows the cursor
  grid.addEventListener("pointermove", (e) => {
    const c = e.target.closest(".project");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  // Hero globe: orthographic projection with graticule, cities and great-circle routes
  const cv = document.getElementById("globe");
  if (cv && cv.getContext) {
    const ctx = cv.getContext("2d");
    const D = Math.PI / 180;
    const cities = [
      ["Riyadh", 24.71, 46.68, true], ["Cairo", 30.04, 31.24], ["Dubai", 25.2, 55.27], ["Muscat", 23.59, 58.41],
      ["Dammam", 26.43, 50.1], ["Madinah", 24.47, 39.61], ["Kuwait", 29.38, 47.99], ["Alexandria", 31.2, 29.92],
      ["Munich", 48.14, 11.58], ["London", 51.51, -0.13], ["Mumbai", 19.08, 72.88], ["Istanbul", 41.01, 28.98],
      ["Singapore", 1.35, 103.82], ["Nairobi", -1.29, 36.82], ["Beijing", 39.9, 116.4], ["New York", 40.71, -74.0], ["Cape Town", -33.92, 18.42],
    ];
    const routes = [[0, 1], [0, 2], [0, 3], [0, 5], [0, 6], [1, 7], [0, 8], [2, 10], [1, 11], [0, 9], [2, 12], [0, 13], [10, 14], [9, 15], [1, 16], [3, 12]];
    let W = 0, R = 0, lon0 = -40, lat0 = 22, last = performance.now();
    const css = () => getComputedStyle(root);
    function size() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
      W = r.width; R = W * 0.42;
      cv.width = W * dpr; cv.height = W * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function proj(lat, lon) {
      const φ = lat * D, λ = (lon + lon0) * D, φ0 = lat0 * D;
      const cosc = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ);
      return [W / 2 + R * Math.cos(φ) * Math.sin(λ), W / 2 - R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ)), cosc];
    }
    function line(pts, col, w) {
      ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
      let pen = false;
      for (const [x, y, v] of pts) { if (v > 0) { pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true; } else pen = false; }
      ctx.stroke();
    }
    function gc(a, b, n) {
      const [la1, lo1, la2, lo2] = [a[1] * D, a[2] * D, b[1] * D, b[2] * D];
      const d = 2 * Math.asin(Math.sqrt(Math.sin((la2 - la1) / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin((lo2 - lo1) / 2) ** 2));
      const out = [];
      for (let i = 0; i <= n; i++) {
        const f = i / n, A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
        const x = A * Math.cos(la1) * Math.cos(lo1) + B * Math.cos(la2) * Math.cos(lo2);
        const y = A * Math.cos(la1) * Math.sin(lo1) + B * Math.cos(la2) * Math.sin(lo2);
        const z = A * Math.sin(la1) + B * Math.sin(la2);
        out.push([Math.atan2(z, Math.hypot(x, y)) / D, Math.atan2(y, x) / D, Math.sin(f * Math.PI)]);
      }
      return out;
    }
    const arcs = routes.map(([a, b]) => gc(cities[a], cities[b], 96));
    function draw(t) {
      const dt = Math.min(64, t - last); last = t;
      if (!reduce) lon0 -= dt * 0.004;
      const accent = css().getPropertyValue("--accent").trim() || "#0f9488";
      const ink = css().getPropertyValue("--muted").trim() || "#5b6b66";
      ctx.clearRect(0, 0, W, W);
      // sphere + glow
      const g = ctx.createRadialGradient(W / 2 - R * 0.35, W / 2 - R * 0.35, R * 0.1, W / 2, W / 2, R * 1.15);
      g.addColorStop(0, accent + "22"); g.addColorStop(1, accent + "05");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(W / 2, W / 2, R, 0, 7); ctx.fill();
      ctx.strokeStyle = accent + "55"; ctx.lineWidth = 1.2; ctx.stroke();
      // graticule
      for (let lat = -75; lat <= 75; lat += 15) { const p = []; for (let lon = -180; lon <= 180; lon += 4) p.push(proj(lat, lon)); line(p, accent + (lat === 0 ? "55" : "2e"), lat === 0 ? 1 : 0.7); }
      for (let lon = -180; lon < 180; lon += 15) { const p = []; for (let lat = -90; lat <= 90; lat += 4) p.push(proj(lat, lon)); line(p, accent + "2e", 0.7); }
      // routes with travelling pulse
      arcs.forEach((arc, i) => {
        const lift = (p) => { const [x, y, v] = proj(p[0], p[1]); const k = 1 + 0.12 * p[2]; return [W / 2 + (x - W / 2) * k, W / 2 + (y - W / 2) * k, v]; };
        const pts = arc.map(lift);
        line(pts, accent + "66", 1.1);
        const f = ((t / 2600 + i * 0.37) % 1), q = pts[Math.floor(f * (pts.length - 1))];
        if (q[2] > 0) { ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(q[0], q[1], 2.2, 0, 7); ctx.fill(); }
      });
      // cities
      cities.forEach(([name, la, lo, home]) => {
        const [x, y, v] = proj(la, lo);
        if (v <= 0) return;
        ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(x, y, home ? 4 : 2.6, 0, 7); ctx.fill();
        if (home) {
          const k = (t % 2400) / 2400;
          ctx.strokeStyle = accent; ctx.globalAlpha = 1 - k; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(x, y, 4 + k * 26, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
          ctx.font = "500 11px 'JetBrains Mono', monospace"; ctx.fillStyle = ink; ctx.fillText(name, x + 9, y - 7);
        }
      });
      if (!reduce) requestAnimationFrame(draw);
    }
    size(); addEventListener("resize", size);
    requestAnimationFrame(draw);
  }
})();
