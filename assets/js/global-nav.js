/**
 * ToolNexus Bilingual Global Navigation & Command+K Quick Search
 */
const TOOLS_DB = [
  // New PDF Trio
  {
    id: 'pdf-rotate',
    en: { title: 'Rotate PDF Pages', desc: 'Rotate PDF pages clockwise or counter-clockwise (90°, 180°)', category: 'pdf', hot: true, icon: '🔄' },
    zh: { title: 'PDF 自由旋转', desc: '顺时针/逆时针纠正倒立页面，支持单个或全部批量旋转', category: 'pdf', hot: true, icon: '🔄' }
  },
  {
    id: 'pdf-sign',
    en: { title: 'Sign PDF Document', desc: 'Draw signature or type cursive name, position on contract and download', category: 'pdf', hot: true, icon: '✍️' },
    zh: { title: 'PDF 手写电子签名', desc: '在线手写板或艺术字签名，自由拖拽缩放放置到合同盖章', category: 'pdf', hot: true, icon: '✍️' }
  },
  {
    id: 'pdf-page-numbers',
    en: { title: 'Add Page Numbers to PDF', desc: 'Insert Page 1 of N or page numbers with custom positions and fonts', category: 'pdf', icon: '🔢' },
    zh: { title: 'PDF 批量添加页码', desc: '自定义页眉/页脚页码排版，支持 Page 1 of N 与跳过封面', category: 'pdf', icon: '🔢' }
  },
  // 6 High-RPM Overseas & General Blockbusters
  {
    id: 'age-calculator',
    en: { title: 'Age Calculator', desc: 'Calculate exact chronological age, next birthday countdown, and life milestones', category: 'calculator', hot: true, icon: '🎂' },
    zh: { title: '年龄与生日计算器', desc: '精确计算实际周岁、已生活天数、下次生日倒计时及星座特征', category: 'calculator', hot: true, icon: '🎂' }
  },
  {
    id: 'percentage-calculator',
    en: { title: 'Percentage Calculator', desc: 'Calculate percentage of numbers, percentage change, increase, and shopping discounts', category: 'calculator', hot: true, icon: '📐' },
    zh: { title: '百分比与折扣计算器', desc: '四合一百分比精算：两数占比、增减变动率、商品折扣与税费立省金额', category: 'calculator', hot: true, icon: '📐' }
  },
  {
    id: 'tip-calculator',
    en: { title: 'Tip & Bill Splitter', desc: 'Calculate restaurant tips, split bills equally among friends, and round up totals', category: 'calculator', hot: true, icon: '🧾' },
    zh: { title: '小费与聚餐分账计算器', desc: '餐厅小费比例自定义，聚餐人数快速 AA 均摊，支持向上取整抹零', category: 'calculator', hot: true, icon: '🧾' }
  },
  {
    id: 'salary-calculator',
    en: { title: 'Salary & Wage Calculator', desc: 'Convert hourly wage to annual, monthly, and bi-weekly salary with 1.5x overtime', category: 'calculator', hot: true, icon: '💼' },
    zh: { title: '时薪与年薪收入转换', desc: '按小时工资精确测算年薪、月薪、双周薪与日薪，支持 1.5x 加班倍率', category: 'calculator', hot: true, icon: '💼' }
  },
  {
    id: 'uuid-generator',
    en: { title: 'UUID / GUID Generator', desc: 'Bulk generate RFC 4122 Version 4 UUIDs using native crypto.randomUUID()', category: 'developer', hot: true, icon: '🆔' },
    zh: { title: 'UUID / GUID 在线生成器', desc: 'Web Crypto 硬件级随机数，批量生成符合 RFC 4122 标准的 Version 4 UUID', category: 'developer', hot: true, icon: '🆔' }
  },
  {
    id: 'case-converter',
    en: { title: 'Text Case Converter', desc: 'Convert text to Title Case (AP/Chicago), Sentence case, UPPERCASE, camelCase, snake_case', category: 'text', hot: true, icon: '🔤' },
    zh: { title: '英文大小写与 Title Case', desc: '美联社/芝加哥格式智能标题首字母大写，小驼峰、大驼峰、下划线快速转换', category: 'text', hot: true, icon: '🔤' }
  },

  // Developer & Core Utilities
  {
    id: 'password-generator',
    en: { title: 'Strong Password Generator', desc: 'Hardware-entropy random password generator with customizable length and entropy score', category: 'developer', hot: true, icon: '🔑' },
    zh: { title: '强密码生成器', desc: '纯前端安全随机数，长度/符号定制，防混淆字符与密码强度实时评分', category: 'developer', hot: true, icon: '🔑' }
  },
  {
    id: 'mortgage-calculator',
    en: { title: 'Mortgage & Loan Calculator', desc: 'Calculate monthly principal and interest payments, total loan cost, and amortization', category: 'calculator', hot: true, icon: '🏠' },
    zh: { title: '房贷与利息计算器', desc: '商业贷款、公积金贷款及组合贷款月供精算，本息/本金还款计划明细', category: 'calculator', hot: true, icon: '🏠' }
  },
  {
    id: 'bmi-calculator',
    en: { title: 'BMI Health Calculator', desc: 'Body Mass Index calculator with Metric and Imperial units and WHO health ranges', category: 'calculator', icon: '🏃' },
    zh: { title: 'BMI 健康体脂计算器', desc: '身体质量指数与理想健康体重区间测算，WHO与卫健委健康标准', category: 'calculator', icon: '🏃' }
  },
  {
    id: 'unit-converter',
    en: { title: 'Universal Unit Converter', desc: 'Convert length, weight, temperature, data storage, area, and speed instantly', category: 'calculator', icon: '📐' },
    zh: { title: '全能单位换算', desc: '长度、重量、温度、数据存储、面积与速度多合一换算，毫秒级响应', category: 'calculator', icon: '📐' }
  },
  {
    id: 'qrcode-generator',
    en: { title: 'QR Code Generator', desc: 'Generate custom QR codes for websites, plain text, and Wi-Fi networks with colors', category: 'developer', icon: '📱' },
    zh: { title: '二维码生成与美化', desc: '文本/URL/WiFi转二维码，配色与样式自定义，高清 PNG 导出', category: 'developer', icon: '📱' }
  },
  {
    id: 'json-formatter',
    en: { title: 'JSON Formatter & Validator', desc: 'Prettify, minify, and validate JSON data with syntax error pinpointing', category: 'developer', icon: '🌲' },
    zh: { title: 'JSON 校验与美化', desc: 'JSON 语法纠错、高亮展开折叠、一键压缩、错误行号精准提示', category: 'developer', icon: '🌲' }
  },
  {
    id: 'timestamp',
    en: { title: 'Unix Timestamp Converter', desc: 'Convert epoch timestamps to readable UTC and local dates with a live system clock', category: 'developer', icon: '⏱️' },
    zh: { title: '开发者时间戳转换', desc: 'Unix 秒/毫秒与可读时间互转，系统时钟动态流逝与相对时间指示', category: 'developer', icon: '⏱️' }
  },
  {
    id: 'base64-converter',
    en: { title: 'Base64 Encoder & Decoder', desc: 'Encode and decode UTF-8 text and binary images into Base64 and DataURLs', category: 'developer', icon: '⚡' },
    zh: { title: 'Base64 编解码器', desc: '文本 UTF-8 与图片 DataURL 纯前端秒级互转，杜绝乱码', category: 'developer', icon: '⚡' }
  },
  {
    id: 'url-encoder',
    en: { title: 'URL Encoder & Decoder', desc: 'Encode and decode URI components and inspect URL query parameters in an editable table', category: 'developer', icon: '🔗' },
    zh: { title: 'URL 编码与解码', desc: 'URIComponent 实时转义与 Query 参数结构化表格解析与重构', category: 'developer', icon: '🔗' }
  },
  {
    id: 'hash-calc',
    en: { title: 'Hash Calculator (MD5, SHA-256)', desc: 'Compute cryptographic MD5, SHA-256, SHA-512, and SHA-1 checksums with hardware acceleration', category: 'developer', icon: '🔒' },
    zh: { title: 'MD5 / SHA 哈希计算', desc: '纯本地计算 MD5、SHA-1、SHA-256 与 SHA-512 哈希散列校验码', category: 'developer', icon: '🔒' }
  },
  {
    id: 'jwt-decoder',
    en: { title: 'JWT Token Decoder', desc: 'Inspect JSON Web Token headers, claims, and token expiration status safely in browser', category: 'developer', icon: '🎫' },
    zh: { title: 'JWT 令牌解码器', desc: '纯前端解析 Header 与 Payload，带过期时间指示，绝不外泄 Token', category: 'developer', icon: '🎫' }
  },
  {
    id: 'regex-tester',
    en: { title: 'Regex Tester', desc: 'Test regular expressions with real-time match highlighting and preset syntax templates', category: 'developer', icon: '🎯' },
    zh: { title: 'Regex 正则测试器', desc: '常用正则模板库（邮箱、电话、IP），实时匹配高亮与捕获组', category: 'developer', icon: '🎯' }
  },

  // Image & PDF Tools
  {
    id: 'image-compress',
    en: { title: 'Image Compressor', desc: 'Compress JPG, PNG, and WebP images client-side with quality sliders and instant preview', category: 'image', hot: true, icon: '🗜️' },
    zh: { title: '极速图片压缩', desc: '纯前端画质与尺寸自适应压缩，实时双图对比，秒级瘦身省流量', category: 'image', hot: true, icon: '🗜️' }
  },
  {
    id: 'image-converter',
    en: { title: 'Image Format Converter', desc: 'Convert images between JPG, PNG, WebP, and BMP in batch with ZIP archive download', category: 'image', icon: '🔄' },
    zh: { title: '图片格式快速互转', desc: 'JPG/PNG/WebP/BMP 纯本地 Canvas 互转，支持批量转码与 Zip 打包', category: 'image', icon: '🔄' }
  },
  {
    id: 'id-watermark',
    en: { title: 'Document Watermark', desc: 'Add semi-transparent diagonal anti-theft watermarks to sensitive ID cards and documents', category: 'image', icon: '🛡️' },
    zh: { title: '身份证防盗水印', desc: '给证件照片加上“仅供XX办理使用”半透明斜向防盗水印，绝不泄密', category: 'image', icon: '🛡️' }
  },
  {
    id: 'image-to-pdf',
    en: { title: 'Image to PDF', desc: 'Combine multiple photos and scanned pages into a standard A4 PDF document', category: 'pdf', icon: '📑' },
    zh: { title: '图片转 PDF 工具', desc: '多张 JPG/PNG 图片一键合并排版为标准 A4 PDF，报销报税高频必备', category: 'pdf', icon: '📑' }
  },
  {
    id: 'pdf-merge',
    en: { title: 'PDF Merger', desc: 'Merge multiple PDF documents into a single file with drag-and-drop page ordering', category: 'pdf', hot: true, icon: '📑' },
    zh: { title: 'PDF 极速合并', desc: '多份 PDF 拖拽自由排序，纯本地一键极速合并，合同发票零上传', category: 'pdf', hot: true, icon: '📑' }
  },
  {
    id: 'pdf-split',
    en: { title: 'PDF Splitter', desc: 'Extract page ranges or split every page into separate PDF files in seconds', category: 'pdf', icon: '✂️' },
    zh: { title: 'PDF 自由拆分', desc: '指定页码范围提取或单页另存，秒级拆分零等待', category: 'pdf', icon: '✂️' }
  },
  {
    id: 'pdf-to-image',
    en: { title: 'PDF to Image', desc: 'Render and extract all PDF pages into high-resolution JPG or PNG images', category: 'pdf', icon: '🖼️' },
    zh: { title: 'PDF 转高清图片', desc: 'PDF 文档逐页渲染提取为高清 JPG/PNG 图片，支持 Zip 打包', category: 'pdf', icon: '🖼️' }
  },
  {
    id: 'pdf-compress',
    en: { title: 'PDF Compressor', desc: 'Optimize and compress PDF document streams right in your browser memory', category: 'pdf', icon: '📦' },
    zh: { title: 'PDF 极速压缩', desc: '重压缩 PDF 内嵌数据与对象流，极致减小文件体积', category: 'pdf', icon: '📦' }
  },

  // Text Tools
  {
    id: 'word-counter',
    en: { title: 'Word & Character Counter', desc: 'Real-time word, character, sentence, paragraph, and reading duration counter', category: 'text', icon: '📊' },
    zh: { title: '字数统计与排版分析', desc: '中英文字数、无空格纯字符、段落统计及朗读与阅读耗时预估', category: 'text', icon: '📊' }
  },
  {
    id: 'color-converter',
    en: { title: 'Color Converter & Palette', desc: 'Convert colors between HEX, RGB, and HSL with visual palette picker and CSS code', category: 'design', icon: '🎨' },
    zh: { title: '颜色转换与调色板', desc: 'HEX/RGB/HSL 互转，色阶取色板与 CSS 渐变代码在线生成', category: 'design', icon: '🎨' }
  },
  {
    id: 'lorem-generator',
    en: { title: 'Lorem Ipsum Generator', desc: 'Generate customized Latin dummy text by paragraphs, sentences, or word counts', category: 'text', icon: '📄' },
    zh: { title: 'Lorem Ipsum 假文生成', desc: '排版占位符生成器，段落数、句子数、单词数随心定制', category: 'text', icon: '📄' }
  },
  {
    id: 'text-diff',
    en: { title: 'Text Diff Checker', desc: 'Compare two text snippets or code files with side-by-side addition and deletion highlights', category: 'text', icon: '📝' },
    zh: { title: '文本精确差异对比', desc: '逐行对比两份文本或合同修改，增删修改清晰高亮对比', category: 'text', icon: '📝' }
  },
  {
    id: 'ad-checker',
    en: { title: 'Ad Copy & Jargon Checker', desc: 'Scan marketing headlines and ad copy for high-risk claims and overused buzzwords', category: 'text', icon: '⚠️' },
    zh: { title: '新广告法违禁词检测', desc: '内置 200+ 极限词库，电商详情页与自媒体文案一键高亮排查', category: 'text', icon: '⚠️' }
  }
];

function isChineseLocale() {
  return window.location.pathname.startsWith('/zh/') || window.location.pathname === '/zh';
}

function initSearchModal() {
  if (document.getElementById('global-search-modal')) return;

  const isZh = isChineseLocale();
  const placeholder = isZh
    ? '输入工具名称或功能描述... (例如: 密码, 压缩, pdf, 房贷, 年龄)'
    : 'Type a tool name or feature... (e.g. age, percentage, tip, password, pdf, json)';
  const footerHint = isZh
    ? '<span>↑ ↓ 切换 · Enter 跳转 · ESC 关闭</span><span>100% 浏览器本地计算</span>'
    : '<span>↑ ↓ Navigate · Enter Open · ESC Close</span><span>100% In-Browser Privacy</span>';

  const modalHtml = `
  <div class="search-modal-backdrop" id="global-search-modal">
    <div class="search-modal">
      <div class="search-modal-input-wrap">
        <span style="font-size: 1.2rem; color: var(--text-muted)">🔍</span>
        <input type="text" class="search-modal-input" id="search-modal-input" placeholder="${placeholder}" autocomplete="off">
        <span class="search-kbd">ESC</span>
      </div>
      <div class="search-results-list" id="search-results-list"></div>
      <div class="search-modal-footer">
        ${footerHint}
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const backdrop = document.getElementById('global-search-modal');
  const input = document.getElementById('search-modal-input');

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeSearchModal();
  });

  input.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    const list = document.getElementById('search-results-list');
    const items = list.querySelectorAll('.search-item');
    let activeIdx = -1;
    items.forEach((item, idx) => {
      if (item.classList.contains('active')) activeIdx = idx;
    });

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length === 0) return;
      if (activeIdx >= 0) items[activeIdx].classList.remove('active');
      activeIdx = (activeIdx + 1) % items.length;
      items[activeIdx].classList.add('active');
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length === 0) return;
      if (activeIdx >= 0) items[activeIdx].classList.remove('active');
      activeIdx = (activeIdx - 1 + items.length) % items.length;
      items[activeIdx].classList.add('active');
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) {
        items[activeIdx].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });
}

function openSearchModal() {
  initSearchModal();
  const backdrop = document.getElementById('global-search-modal');
  const input = document.getElementById('search-modal-input');
  backdrop.classList.add('open');
  input.value = '';
  renderSearchResults('');
  setTimeout(() => input.focus(), 50);
}

function closeSearchModal() {
  const backdrop = document.getElementById('global-search-modal');
  if (backdrop) backdrop.classList.remove('open');
}

function renderSearchResults(query) {
  const list = document.getElementById('search-results-list');
  const q = (query || '').toLowerCase().trim();
  const isZh = isChineseLocale();
  const pathPrefix = isZh ? '/zh/tools/' : '/tools/';

  const filtered = TOOLS_DB.filter(t => {
    const data = isZh ? t.zh : t.en;
    if (!q) return true;
    return data.title.toLowerCase().includes(q) ||
           data.desc.toLowerCase().includes(q) ||
           t.id.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;">${isZh ? '未找到相关工具，请尝试其它关键词' : 'No tools matching your search query'}</div>`;
    return;
  }

  list.innerHTML = filtered.map((t, idx) => {
    const data = isZh ? t.zh : t.en;
    const activeClass = idx === 0 ? 'active' : '';
    const hotBadge = data.hot ? '<span class="badge badge-primary" style="font-size:0.7rem; padding:1px 5px; margin-left:6px;">HOT</span>' : '';

    return `
    <a href="${pathPrefix}${t.id}/" class="search-item ${activeClass}">
      <span class="search-item-icon">${data.icon}</span>
      <div class="search-item-info">
        <div class="search-item-title">${data.title} ${hotBadge}</div>
        <div class="search-item-desc">${data.desc}</div>
      </div>
      <span style="font-size: 0.8rem; color: var(--text-subtle);">↵</span>
    </a>
    `;
  }).join('');
}

// Global hotkey binding
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearchModal();
  } else if (e.key === 'Escape') {
    closeSearchModal();
  }
});
