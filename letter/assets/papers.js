/* =========================================================
   letter · 文献目录数据
   —— 新增一篇论文，只需要在下面数组里加一个对象，
      再把页面文件放进 papers/ 即可，index 会自动出现。
   ========================================================= */

window.LETTER_PAPERS = [
  {
    no: "01",
    titleZh: "机器服务于人：一种可变的人机协同压缩框架",
    titleEn: "Machines Serve Human: A Novel Variable Human-Machine Collaborative Compression Framework",
    url: "papers/machines-serve-human.html",
    tags: ["人机协同", "框架"],
    status: "reading",
    updated: "2026-11"
  },
  {
    no: "02",
    titleZh: "基于 StyleGAN 先验的可分级人脸图像编码",
    titleEn: "Scalable Face Image Coding via StyleGAN Prior: Toward Compression for Human-Machine Collaborative Vision",
    url: "papers/scalable-face-stylegan.html",
    tags: ["人脸", "生成模型", "可分级"],
    status: "todo",
    updated: "2026-11"
  },
  {
    no: "03",
    titleZh: "面向人与机器视觉的可分级水下图像压缩",
    titleEn: "Scalable Underwater Image Compression for Human and Machine Vision",
    url: "papers/scalable-underwater.html",
    tags: ["水下", "可分级"],
    status: "todo",
    updated: "2026-11"
  }
];

/* 状态字典：新增状态时在这里加一行即可 */
window.LETTER_STATUS = {
  todo: "未开始",
  reading: "在读",
  done: "已精读",
  review: "待复习"
};