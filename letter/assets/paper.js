/* =========================================================
   letter · 阅读页：中英切换 / 进度条 / 目录高亮
   ========================================================= */

(function () {
  var root = document.documentElement;

  /* ---- 阅读模式：双语 / 中文 / English ---- */
  var modes = ["both", "zh", "en"];
  var saved = null;
  try { saved = localStorage.getItem("letter-mode"); } catch (e) {}
  if (modes.indexOf(saved) === -1) saved = "both";

  function setMode(m) {
    if (m === "both") root.removeAttribute("data-mode");
    else root.setAttribute("data-mode", m);
    document.querySelectorAll(".seg button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.mode === m ? "true" : "false");
    });
    try { localStorage.setItem("letter-mode", m); } catch (e) {}
  }

  document.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () { setMode(b.dataset.mode); });
  });
  setMode(saved);

  /* ---- 顶部阅读进度 ---- */
  var bar = document.querySelector(".progress");
  function tick() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
    if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  tick();

  /* ---- 目录高亮 ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (target) map[id] = a;
    });

    var current = null;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var a = map[en.target.id];
          if (!a || a === current) return;
          if (current) current.classList.remove("active");
          a.classList.add("active");
          current = a;
        });
      },
      { rootMargin: "-88px 0px -68% 0px", threshold: 0 }
    );

    Object.keys(map).forEach(function (id) {
      var t = document.getElementById(id);
      if (t) io.observe(t);
    });
  }
})();