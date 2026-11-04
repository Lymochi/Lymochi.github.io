/* =========================================================
   letter · 目录页渲染 + 搜索 + 标签筛选
   ========================================================= */

(function () {
  var papers = window.LETTER_PAPERS || [];
  var STATUS = window.LETTER_STATUS || {};

  var listEl = document.getElementById("papers");
  var emptyEl = document.getElementById("empty");
  var chipsEl = document.getElementById("chips");
  var searchEl = document.getElementById("search");
  var countEl = document.getElementById("count-all");
  var readEl = document.getElementById("count-done");
  var tagEl = document.getElementById("count-tags");

  var state = { q: "", tag: "全部" };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function allTags() {
    var seen = [];
    papers.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (seen.indexOf(t) === -1) seen.push(t);
      });
    });
    return seen;
  }

  function matches(p) {
    var q = state.q.trim().toLowerCase();
    var tagOk = state.tag === "全部" || (p.tags || []).indexOf(state.tag) !== -1;
    if (!tagOk) return false;
    if (!q) return true;
    var hay = [p.titleZh, p.titleEn, (p.tags || []).join(" "), p.note || ""].join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function rowHTML(p) {
    var st = STATUS[p.status] || p.status || "";
    var tags = (p.tags || [])
      .map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; })
      .join("");
    var meta = [tags, p.updated ? '<span class="dot"></span><span>' + esc(p.updated) + "</span>" : ""].join("");
    return (
      '<li class="paper">' +
        '<a class="paper-link" href="' + esc(p.url) + '">' +
          '<span class="paper-no">' + esc(p.no) + "</span>" +
          '<span class="paper-main">' +
            '<span class="paper-title">' + esc(p.titleZh) + "</span>" +
            '<span class="paper-en" lang="en">' + esc(p.titleEn) + "</span>" +
            '<span class="paper-meta">' + meta + "</span>" +
          "</span>" +
          '<span class="paper-status"><span class="status" data-status="' + esc(p.status) + '">' + esc(st) + "</span></span>" +
          '<span class="arrow" aria-hidden="true">↗</span>' +
        "</a>" +
      "</li>"
    );
  }

  function render() {
    var shown = papers.filter(matches);
    listEl.innerHTML = shown.map(rowHTML).join("");
    emptyEl.hidden = shown.length !== 0;
    if (!shown.length) {
      emptyEl.textContent = state.q
        ? "没有匹配「" + state.q + "」的条目。"
        : "这个标签下还没有条目。";
    }
  }

  function renderChips() {
    var tags = ["全部"].concat(allTags());
    chipsEl.innerHTML = tags
      .map(function (t) {
        return (
          '<button class="chip" type="button" data-tag="' + esc(t) + '" ' +
          'aria-pressed="' + (state.tag === t ? "true" : "false") + '">' + esc(t) + "</button>"
        );
      })
      .join("");
  }

  function renderCounts() {
    countEl.textContent = String(papers.length).padStart(2, "0");
    readEl.textContent = String(papers.filter(function (p) { return p.status === "done"; }).length).padStart(2, "0");
    tagEl.textContent = String(allTags().length).padStart(2, "0");
  }

  chipsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    state.tag = btn.dataset.tag;
    chipsEl.querySelectorAll(".chip").forEach(function (b) {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    render();
  });

  var timer;
  searchEl.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      state.q = searchEl.value;
      render();
    }, 90);
  });

  renderChips();
  render();
  renderCounts();
})();