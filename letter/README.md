# letter · 文献阅读室

`https://www.lymochi.top/letter/` 的源码。

纯静态：没有构建步骤，改完 HTML 直接上传就生效。

## 结构

```
letter/
├── index.html            # 目录页（搜索 + 标签筛选）
├── assets/
│   ├── style.css         # 全站样式（配色跟主页一致）
│   ├── papers.js         # ★ 目录数据：加论文就改这里
│   ├── index.js          # 目录页的搜索/筛选
│   └── paper.js          # 阅读页：中英切换、进度条、目录高亮
└── papers/
    ├── machines-serve-human.html
    ├── scalable-face-stylegan.html
    ├── scalable-underwater.html
    └── template.html     # 新论文模板（不收录、noindex）
```

## 新增一篇

1. 复制 `papers/template.html` → `papers/your-paper-slug.html`（**英文小写 + 短横线**，别用中文名，否则网址会变成一长串 `%E4%B8%AD`）。
2. 改页面顶部：`<title>`、`.doc-title`（中文标题）、`.doc-en`（英文标题）、`.doc-meta` 里的作者/来源/状态。
3. 正文：每个 `.bi` 块里，`.en` 放英文原段，`.zh` 放中文译文。一页想放几段就放几段。
4. 打开 `assets/papers.js`，往数组里加一条：

```js
{
  no: "04",
  titleZh: "中文标题",
  titleEn: "English Title",
  url: "papers/your-paper-slug.html",
  tags: ["标签A", "标签B"],
  status: "todo",          // todo | reading | done | review
  updated: "2026-11"
}
```

5. 上传，等 1～2 分钟。

## 约定

- **文件名不要以 `_` 开头**：GitHub Pages 用 Jekyll 构建，`_` 开头的东西不会被发布。
- 路径用相对路径（`../assets/...`），这样本地双击打开也能看。
- 阅读页的三种模式（双语 / 中文 / EN）是纯 CSS 切换，记忆在浏览器 localStorage 里。
- 状态颜色：`todo` 灰、`reading` 蓝、`done` 绿、`review` 橙；要加新状态就改 `papers.js` 里的 `LETTER_STATUS`，同时在 `style.css` 里补一条 `.status[data-status="新状态"]`。