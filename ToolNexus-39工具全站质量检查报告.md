# ToolNexus 工具站全站质量检查报告

> 检查对象：本地 `http://localhost:3000`（ToolNexus Web，纯前端 / 中英双语）
> 检查范围：39 个工具 × 中英双语 = **78 个工具页**，另含首页与 4 个静态页
> 检查时间：2026-09-16
> 检查方式：**仅从网站本身（HTTP 层）分析**，未查看本地源码。使用真实 Chrome 浏览器（Playwright 驱动）逐页加载、交互、验证输出

---

## 一、检查方法说明

| 检查维度 | 具体做法 |
|---|---|
| 运行是否正常 | 用真实 Chrome 无头浏览器逐页加载 78 个页面，监听 `pageerror` / `console.error` / 请求失败；对全部 39 个工具输入真实数据并断言输出结果（含生成 PNG/PDF 测试文件做文件类工具上传下载验证） |
| 说明是否单薄 | 提取每页正文 `article` 区域的实际字数、段落数、H2/H3/H4 层级、内链数、FAQ 数量 |
| 是否会被判低价值页 | 检查跨页面重复文案比例、正文深度、结构化数据与可见内容一致性、canonical/hreflang 完整性、标题与描述规范 |
| 说明与工具是否相关 | 逐页对比「标题/描述承诺的功能」与「工具实际提供的能力」（用浏览器实测确认） |
| 中英文用词 | 逐页比对 78 份标题、描述、正文、FAQ 的中英文措辞与术语一致性 |

---

## 二、总体结论

**好消息（先说正面）**

1. **没有任何 JS 运行时报错**。78 个页面全部加载正常，`pageerror` = 0，控制台错误 = 0，静态资源（pdf-lib / pdf.js / jszip / qrcode 等）全部本地引用、无 CDN 依赖，离线可用。
2. **没有模板化重复内容**。对 78 个页面做段落级去重比对，**重复段落 0 条**（英文 286 段 / 中文 277 段全部唯一）。这一点很关键——它意味着不会因为"批量生成模板页"被判低价值页面。
3. **文件类工具质量整体很好**。PDF 合并/拆分/旋转/加水印/转图片/签名、图片压缩/转换/转 PDF 共 11 个工具全部实测通过，且产出文件有效（pdf-compress 对图片型 PDF 实测从 1,119,443 字节压到 410,770 字节，压缩率 63%）。

**必须处理的问题（按严重程度排序）**

| 级别 | 问题 | 数量 |
|---|---|---|
| 🔴 P0 | `csv-json` 双向转换结果错误（唯一确认的功能性 Bug） | 1 个工具 |
| 🔴 P0 | 标题/描述虚标了工具并不具备的功能（SHA-1 / BMP / SVG / Logo） | 4 处 |
| 🟠 P1 | FAQ 结构化数据与页面可见 FAQ **完全不同**，违反 Google 结构化数据规范 | 37 处 |
| 🟠 P1 | `hreflang` 缺失或缺少 `x-default` | 13 个页面 |
| 🟠 P1 | `regex-tester` 完全没有正文和 FAQ，是全站最薄的页面 | 1 个工具 |
| 🟠 P1 | 内容偏薄（英文正文 < 300 词） | 9 个工具 |
| 🟡 P2 | 中文标题用营销标签词替换品牌名（含「流量金矿」这类内部黑话） | 24 个标题 |
| 🟡 P2 | `pdf-page-numbers` 英文 meta description 被截断（仅 53 字符，句子残缺） | 1 处 |
| 🟡 P2 | 中英文是**两套独立实现**，控件与功能不一致 | 21/39 个工具 |

---

## 三、功能运行检查结果

### 3.1 全部 39 个工具的功能实测结论

✅ = 用真实数据实测并断言通过　⚠️ = 存在缺陷　— = 仅冒烟测试

| # | 工具 | 英文版 | 中文版 | 实测证据 |
|---|---|---|---|---|
| 1 | ad-checker | ⚠️ 词库偏弱 | ✅ | 中英为两套实现：中文「载入违规模拟文案」命中 **7 处**；英文输入同等级违规文案仅命中 **2 处**（miracle / risk-free），`best in the world`、`#1 rated`、`guaranteed to cure`、`Number one` 等均未识别 |
| 2 | age-calculator | ✅ | ✅ | 输入 1990-05-15 正确输出年龄 |
| 3 | base64-converter | ✅ | ✅ | `hello世界` → `aGVsbG8g5LiW55WM`，中文不乱码 |
| 4 | bmi-calculator | ✅ | ✅ | 175cm/70kg → BMI 22.9；中文版额外含性别/年龄输入 |
| 5 | case-converter | ✅ | ✅ | `hello world` → `HELLO WORLD` / `hello-world` |
| 6 | color-contrast | ✅ | ✅ | 黑白配色对比度 = 21:1，AA/AAA 判定正确 |
| 7 | color-converter | ✅ | ✅ | `#ff0000` → `rgb(255, 0, 0)` |
| 8 | cron-parser | ✅ | ✅ | `*/5 * * * *` 正确解析并预测未来运行时间 |
| 9 | **csv-json** | ⚠️ **有缺陷** | ⚠️ **有缺陷** | 见下方详述 |
| 10 | hash-calc | ✅（标题有误） | ✅ | SHA-256(abc) 正确；**英文版只输出 MD5/SHA-256/SHA-512，不输出 SHA-1**，但标题和描述都写着 SHA-1 |
| 11 | html-encoder | ✅ | ✅ | `<b>hi</b>` ↔ `&lt;b&gt;hi&lt;/b&gt;` 双向正确 |
| 12 | id-watermark | ✅ | ✅ | 上传 PNG 加水印，下载 6032 字节带水印图 |
| 13 | image-compress | ✅ | ✅ | 压缩并下载成功 |
| 14 | image-converter | ✅（文案有误） | ✅ | 两张图批量转 WebP 并打包 ZIP（2296 字节）；**实际只支持 PNG/JPG/WebP，但文案宣称支持 BMP/SVG** |
| 15 | image-to-pdf | ✅ | ✅ | 两图合成 PDF（3408 字节） |
| 16 | json-formatter | ✅ | ✅ | 美化/校验正确，非法 JSON 有提示 |
| 17 | jwt-decoder | ✅ | ✅ | 正确解出 Header(HS256) 与 Payload(John Doe) |
| 18 | lorem-generator | ✅ | ✅ | 生成 1545 字符，可重新生成；中文版支持中文占位文本 |
| 19 | mortgage-calculator | ✅ | ✅ | 30 万 / 6.5% 算出月供；中文版是**公积金/组合贷**模型，与英文版完全不同 |
| 20 | password-generator | ✅ | ✅ | 生成 16 位强密码，熵值 ~103 bits |
| 21 | pdf-compress | ✅ | ✅ | 图片型 PDF 1.12MB → 411KB（压缩 63%）。⚠️ 但对 1.1KB 纯文本 PDF 会**放大到 31KB** |
| 22 | pdf-merge | ✅ | ✅ | 合并 2 个 PDF 成功 |
| 23 | pdf-page-numbers | ✅ | ✅ | 加页码后 PDF 可下载 |
| 24 | pdf-rotate | ✅ | ✅ | 旋转后 PDF 可下载 |
| 25 | pdf-sign | ✅ | ✅ | 手写+文字签名，烧录后下载 6447 字节 |
| 26 | pdf-split | ✅ | ✅ | 拆分为 3 个单页并打包 ZIP |
| 27 | pdf-to-image | ✅ | ✅ | 3 页 PDF 渲染并打包 ZIP（102KB）；中文版有格式选择器（PNG/JPG/WebP），英文版没有 |
| 28 | percentage-calculator | ✅ | ✅ | 10% of 200 = 20 |
| 29 | qrcode-generator | ✅（文案有误） | ✅（文案有误） | 二维码正常渲染，下载 PNG；**中文描述宣称支持「中心 Logo 图标」和「SVG 导出」，实测两者都不存在**（无文件上传控件、只有 PNG 按钮） |
| 30 | regex-tester | ✅ | ✅ | `\d+` 匹配 `a1b22c333` → "3 matches found"，高亮正确 |
| 31 | salary-calculator | ✅ | ✅ | $25/小时 → $52,000/年 |
| 32 | text-diff | ✅ | ✅ | 正确标出新增/修改行（中文版无按钮，输入即自动比对） |
| 33 | timestamp | ✅ | ✅ | 1700000000 → 2023-11-14；中文版 → 北京 2023/11/15 06:13:20、UTC 正确 |
| 34 | tip-calculator | ✅ | ✅ | 账单 100 → 小费金额计算正确 |
| 35 | unicode-inspector | ✅ | ✅ | 输入含 U+200B / BOM 的文本，正确检出并可清除归零 |
| 36 | unit-converter | ✅ | ✅ | 1 米 = 100 cm = 0.001 km = 3.2808399 ft |
| 37 | url-encoder | ✅ | ✅ | `a b&c=d` → `a%20b%26c%3Dd` |
| 38 | uuid-generator | ✅ | ✅ | 生成合法 v4 UUID，格式与版本位正确 |
| 39 | word-counter | ✅ | ✅ | `hello world foo bar` → 4 词 |

**功能通过率：38 / 39 个工具功能可用**（唯一功能性缺陷为 `csv-json`）。

### 3.2 🔴 P0：csv-json 双向转换结果错误（中英文均存在）

这是本次检查发现的**唯一一个真正的功能性 Bug**，且两个方向都是错的。

**实测复现（英文版 `/tools/csv-json/`，中文版 `/zh/tools/csv-json/` 表现完全一致）**

输入 CSV：
```
name,age
Tom,20
Amy,30
```
点击「CSV ➔ JSON」后：

| 位置 | 实际内容 | 是否正确 |
|---|---|---|
| 输入框（标签仍显示 "CSV Input"） | `[{"name":"Tom","age":20},{"name":"Amy","age":30}]` | 内容正确，但**被写进了输入框** |
| **输出框（标签 "JSON Result"）** | `[{"[": "  {"}, {"[": "    name: Tom"}, {"[": "    age: 20"}, …]` | ❌ **完全错误的乱码结果** |
| 状态栏 | `10 rows parsed` / `9 JSON objects generated` | ❌ 错误 |

反向「JSON ➔ CSV」同样错误：
- 输入 `[{"name":"Tom","age":20}]` → 输出 `0,1` + `[{name:Tom,age:20}]`（表头变成列号、整条 JSON 当成一个单元格），状态栏显示「2 CSV rows produced」

**影响**：用户在页面上看到的输出结果是无意义的乱码，是最直接的信任杀手，也是唯一会让"工具能不能用"这个前提崩塌的问题。**建议最优先修复。**

### 3.3 🟠 P1：ad-checker 英文版词库明显偏弱

同一段违规广告文案，中文版命中 7 处，英文版只命中 2 处。英文描述承诺 "Detect high-risk advertising claims and buzzwords"，实际召回率不到 25%，与描述承诺不匹配。

### 3.4 🟡 提示：pdf-compress 对纯文本 PDF 会"越压越大"

| 测试文件 | 原始大小 | 压缩后 | 结果 |
|---|---|---|---|
| 图片型 PDF（900×700 图片 ×2） | 1,119,443 B | 410,770 B | ✅ 压缩 63% |
| 纯文本 PDF（3 页文字） | 1,146 B | 31,906 B | ❌ **放大 27.8 倍** |

页面 FAQ 里已自问自答「为什么纯文字 PDF 压缩后体积没有变小」，但实际情况是**变大**。建议对"压缩后反而更大的文件"直接提示并保留原文件。

---

## 四、内容单薄程度评估（是否会评为低价值页面）

### 4.1 内容深度全排名（英文正文词数 / 中文正文汉字数）

| 风险等级 | 工具 | EN 正文 | ZH 正文 | EN FAQ | 说明 |
|---|---|---|---|---|---|
| 🔴 **高风险** | **regex-tester** | **0 词** | **0 字** | **0** | **完全没有正文区块，没有 H2，没有任何 FAQ**，页面只有工具本体 + 3 条编号 H4 |
| 🟠 中高 | html-encoder | 173 词 | 348 字 | 2 | 正文仅 4 段，FAQ 仅 2 条 |
| 🟠 中高 | color-contrast | 191 词 | 303 字 | 2 | 正文 4 段，FAQ 仅 2 条 |
| 🟠 中高 | unicode-inspector | 233 词 | 492 字 | 2 | FAQ 仅 2 条 |
| 🟠 中 | text-diff | 254 词 | 540 字 | 3 | — |
| 🟠 中 | lorem-generator | 259 词 | 559 字 | 3 | — |
| 🟠 中 | cron-parser | 274 词 | 471 字 | 3 | — |
| 🟠 中 | timestamp | 293 词 | 506 字 | 3 | — |
| 🟠 中 | word-counter | 298 词 | 588 字 | 3 | — |
| 🟢 低 | salary-calculator | 310 词 | 635 字 | 3 | 其余 30 个工具正文均 ≥310 词，内容厚度充足 |
| 🟢 低 | …（其余 30 个） | 310–697 词 | 448–1486 字 | 3–4 | 最厚的 pdf-compress 达 697 词 / 1486 字 |

### 4.2 结论与建议

- **regex-tester 必须补齐内容**。它是唯一一个「零正文 + 零 FAQ + 零 H2」的页面，与其它 38 个页面的内容规格完全脱节，是全站最容易被判定为"薄内容页"的一页。建议至少补充：正则语法速查表、常用正则模板说明、捕获组/反向引用原理、3 条以上 FAQ。
- **9 个英文页正文 < 300 词**（regex-tester、html-encoder、color-contrast、unicode-inspector、text-diff、lorem-generator、cron-parser、timestamp、word-counter）。注意：**这些页面的中文版内容普遍比英文版厚**（例如 word-counter 中文 588 字 vs 英文 298 词），说明内容是可以写厚的，英文版属于"没写满"。建议把英文版补齐到 400 词以上、FAQ 补到 3–4 条。
- **正面结论**：全站 0 条重复段落，说明内容确实是逐页撰写的，不构成"内容农场"特征。低价值风险主要来自**个别页面的绝对深度不足**，而非批量重复。

---

## 五、说明与工具相关性核查

整体相关性良好——每个工具的正文标题都围绕该工具的专业领域展开（如 pdf-compress 讲 DCT 与 PDF 对象流、password-generator 讲香农熵与 CSPRNG），没有出现"内容与工具不相关"的硬伤。

但发现以下 **文案与实现不符**（描述承诺了工具没有的功能，属于相关性与真实性问题）：

| 工具 | 位置 | 文案承诺 | 实测结果 | 严重度 |
|---|---|---|---|---|
| **image-converter** | EN `<h1>` | "(JPG, PNG, WebP, **BMP**)" | 输出选项只有 PNG / JPG / WebP | 🔴 |
| **image-converter** | EN 描述 | "Convert images between JPG, PNG, WebP, and **BMP** formats" | 同上，无 BMP | 🔴 |
| **image-converter** | ZH 标题 | "JPG/PNG/WebP/**BMP/SVG** 互转" | 无 BMP、无 SVG | 🔴 |
| **image-converter** | ZH 描述 | "支持 JPG、PNG、WebP、**BMP、SVG** 批量极速无损互转" | 无 BMP、无 SVG | 🔴 |
| **hash-calc** | EN 标题 | "SHA-256, SHA-512, **SHA-1** Generator" | 英文版**不输出 SHA-1**（只有 MD5/SHA-256/SHA-512） | 🔴 |
| **hash-calc** | EN meta 描述 | "Compute SHA-256, SHA-512, and **SHA-1** checksums" | 同上 | 🔴 |
| **qrcode-generator** | ZH 描述 | "可自定义配色、容错率与**中心 Logo 图标**，高清 PNG/**SVG** 导出" | 无 Logo 上传控件，无 SVG 导出（仅 PNG 下载） | 🔴 |
| bmi-calculator | ZH 描述 | "根据**中国卫健委**成人体质标准" | 页面正文确实大量引用卫健委（9 处），但英文版同一工具宣称 **WHO** 标准（10 处） | 🟠 双语不一致 |
| pdf-compress | 页面 FAQ | 暗示纯文本 PDF 压缩后"体积没有变小" | 实测是**变大 27.8 倍** | 🟡 |

> **注意**：`hash-calc` 还存在**标题与 H1 自相矛盾**——标题写 "SHA-256, SHA-512, **SHA-1**"，H1 和 H2 却写 "SHA-256, SHA-512, **MD5**"。实际实现是 MD5 + SHA-256 + SHA-512，也就是**标题错了、H1 对了**。

---

## 六、中英文用词与文案问题

### 6.1 🔴 中文标题用营销标签词替换品牌名（24 个标题）

中文页标题的 `| 品牌名` 位置被写成了内部营销标签，而不是品牌。其中 **`mortgage-calculator` 的「流量金矿」属于内部运营黑话泄漏到用户可见标题**，性质最严重。

| 工具 | 中文标题尾部（应为品牌位） |
|---|---|
| **mortgage-calculator** | **\| 流量金矿** ← 内部黑话，必须删除 |
| ad-checker | \| 避坑神器 |
| base64-converter | \| 纯本地不乱码 |
| bmi-calculator | \| 科学健身 |
| color-converter | \| 设计师工具 |
| hash-calc | \| 安全可靠 |
| id-watermark | \| 纯本地绝不泄密 |
| image-compress | \| 纯本地不限大小 |
| image-converter | \| 纯本地无损互转 |
| image-to-pdf | \| 支持自由拖拽排序 |
| jwt-decoder | \| 纯本地防**秘**钥泄露 ← 另有错字，见 6.2 |
| lorem-generator | \| 设计师常用 |
| password-generator | \| 100%本地运算防泄露 |
| pdf-compress | \| 纯本地零泄密 |
| pdf-merge | \| 零上传秒级完成 |
| pdf-split | \| 纯本地无限制 |
| pdf-to-image | \| 纯本地免排队 |
| qrcode-generator | \| 纯本地无限制 |
| regex-tester | \| 纯本地极速 |
| text-diff | \| 清晰高亮 |
| timestamp | \| 实时时钟 |
| unit-converter | \| 极速响应 |
| url-encoder | \| 极速日常 |
| word-counter | \| 写作神器 |

同一站点出现三种品牌后缀（`| ToolNexus`、`| ToolNexus 实用工具箱`、`| 营销标签`），品牌识别度被稀释。**建议统一为 `| ToolNexus`。**

### 6.2 🟠 中文术语不规范：「秘钥」应为「密钥」（6 个页面）

`密钥` 是密码学规范术语，`秘钥` 为不规范写法。站内**两种写法混用**：

| 页面 | 「秘钥」次数 | 「密钥」次数 |
|---|---|---|
| zh/jwt-decoder | **5** | 4 ← 同页混用 |
| zh/password-generator | **1** | 0 |
| zh/base64-converter | **1** | 1 ← 同页混用 |
| zh/hash-calc / json-formatter / url-encoder | 0 | 1（正确） |

**建议**：全局替换为「密钥」。

### 6.3 🟠 英文品牌后缀不统一

6 个英文页标题用 `| ToolNexus Web`，其余 32 个用 `| ToolNexus`，另有 1 个（`image-to-pdf`）**完全没有品牌名**（尾部是 `| Drag & Drop Reorder`）。

### 6.4 🟡 英文描述被截断（内容残缺）

`pdf-page-numbers` 英文 meta description 仅 **53 字符且句子未写完**：

```
Free in-browser Add Page Numbers to PDF tool. Insert
```

结尾停在 `Insert`，明显是被截断的。这会在搜索结果中直接暴露为残缺文案。

### 6.5 🟡 中英文标准归属不一致（bmi-calculator）

英文版宣称 **WHO（世界卫生组织）** 标准，中文版宣称 **中国卫健委** 标准，且英文 FAQ 有"亚洲人群 BMI 分界线"的问题、中文版没有。两个页面被 `hreflang` 声明为互译版本，但内容依据不同。

### 6.6 🟡 中文页标题层级被 UI 文案污染

`zh/image-compress` 把界面预览区的标签「原图预览」「压缩后效果预览」写成了 `<h4>` 标题，英文版没有。此外中文页统一多出一个 `<h4>⚡ ToolNexus 工具枢纽</h4>`（内链区块），会打乱标题层级结构。

### 6.7 值得肯定的部分

- 中文文案整体质量高，专业术语使用准确（如「盘古之白」「量纲工程学」「等额本息 vs 等额本金」「矢量光栅化」「盲水印」等），明显是懂行的人写的，不是机翻。
- 中文版在多个工具上的内容深度**优于**英文版（如 ad-checker 1454 字 vs 568 词、pdf-compress 1486 字 vs 697 词）。
- 未发现语法错误、机翻腔或错别字批量问题（除 6.2 的「秘钥」外）。

---

## 七、技术性 SEO 问题

### 7.1 🟠 FAQ 结构化数据与页面可见内容不匹配 —— 37 处

这是**最需要尽快处理的技术性 SEO 问题**。Google 的 FAQPage 规范要求结构化数据与页面上用户可见的内容一致。实测发现两处不一致：

**（a）数量不一致（37 处）**

| 工具 | 语言 | JSON-LD 条数 | 页面可见条数 |
|---|---|---|---|
| base64-converter / hash-calc / jwt-decoder / qrcode-generator / url-encoder / bmi-calculator(ZH) / pdf-rotate(ZH) | EN+ZH | 4 | 3 |
| case-converter / color-converter / image-compress / password-generator / pdf-page-numbers / pdf-sign / unit-converter / image-converter(ZH) | EN+ZH | 3 | 4 |
| lorem-generator / text-diff / timestamp / word-counter(ZH) / mortgage-calculator(ZH) | EN+ZH | 3 | 2 |
| json-formatter(EN) / percentage-calculator(ZH) | 单语 | 2 | 3 |

**（b）问题内容完全不同（比数量不一致更严重）**

以 `case-converter` 英文版为例，两套问题**没有一个重合**：

- JSON-LD 里写的是：`How does Title Case determine which words to capitalize?` / `What are the differences between camelCase, PascalCase, and kebab-case?` / `Is my text data stored or sent to an external server?`
- 页面上实际显示的是：`How does Title Case handle hyphenated compound words like "State-of-the-Art"?` / `What is the difference between Sentence case and Capitalized Words?` / `Can this tool convert mixed strings with underscores and dashes into camelCase?` / `Is it safe to paste confidential manuscripts…?`

`json-formatter` 同样如此（结构化数据里的两个问题在页面上根本不存在）。**建议统一为"页面上写哪些问题，结构化数据就填哪些问题"。**

### 7.2 🟠 hreflang 配置不完整 —— 13 个页面

| 页面 | 现状 |
|---|---|
| ad-checker（EN+ZH）、id-watermark（EN+ZH）、image-to-pdf（EN+ZH）、pdf-merge（ZH） | **完全没有 hreflang 标签** |
| case-converter（EN+ZH）、image-compress（EN）、password-generator（EN）、unit-converter（EN） | 有 en/zh 但**缺少 `x-default`** |

首页的 hreflang 是完整的，说明这是一个**逐页生成时的遗漏**，不是配置思路问题。

### 7.3 🟡 Title 长度超标

| 工具 | 语言 | 长度 | 问题 |
|---|---|---|---|
| salary-calculator | EN | **92 字符** | 严重超长且**无品牌名** |
| unicode-inspector | EN | 90 字符 | 超长 |
| csv-json | EN | 84 字符 | 超长 |
| pdf-split | EN | 79 字符 | 超长 |
| color-contrast / percentage-calculator | EN | 78 字符 | 超长 |
| color-contrast | ZH | **53 字符** | 中文标题折合约 106 宽度，严重超长 |
| html-encoder / cron-parser / csv-json | ZH | 49–63 字符 | 中文超长（建议 ≤32 字） |

> 英文建议 ≤ 60 字符，中文建议 ≤ 32 字符。

### 7.4 🟡 Meta Description 长度异常

- **过短（11 处）**：`pdf-page-numbers` EN 仅 **53 字符（且截断）**；`id-watermark` 106、`image-converter` 108、`word-counter` 110、`text-diff` 111、`pdf-to-image` 113、`image-compress` 114、`pdf-merge` 117；`age-calculator` ZH 46、`tip-calculator` ZH 46、`salary-calculator` ZH 55、`percentage-calculator` ZH 58。
- **过长（6 处）**：`unicode-inspector` EN **183 字符**（会被截断）；其余 `salary-calculator` 170、`case-converter` 164、`csv-json` 162、`pdf-compress` 162、`pdf-split` 162、`password-generator` 161。
- **建议**：英文 120–158 字符，中文 60–110 字符。

### 7.5 ⚠️ 中英文是两套独立实现（21/39 个工具控件不一致）

`hreflang` 把中英页面标注为互译版本，但实测发现 **21 个工具的英文版与中文版是两套不同的前端实现**，控制元素 ID 完全不同。例如：

| 工具 | 英文版 | 中文版 |
|---|---|---|
| word-counter | `#word-input`，含阅读时长/WPM 统计 | `#text-input`，含「盘古之白」中英排版、去空行 |
| hash-calc | `#hash-input`（1 个输入） | `#hash-text-input` + `#res-md5` / `#res-sha1` / `#res-sha256` / `#res-sha512` |
| mortgage-calculator | 通用金额/首付/年限/利率 | 商业贷 + 公积金贷 + 组合贷 + 等额本息/本金 |
| unit-converter | from/to 双向选择器 | 8 个长度单位全矩阵输入 |
| qrcode-generator | 网址/文本/WiFi，下载 PNG（1 个按钮） | 文本/WiFi/vCard + 容错率 + 尺寸 + 复制二维码（5 个按钮） |
| ad-checker | 需要点「Scan Copywriting」 | 输入即自动检测，含「载入违规模拟文案」 |
| text-diff | 有「Compare Text」按钮 | 无按钮，输入即自动比对 |

**这不是 Bug，但带来两个真实风险**：① 同一"逻辑页面"两种语言功能不等价，用户体验不一致（英文用户拿不到公积金贷款模型，中文用户拿不到 WPM 朗读时长）；② 后续维护要改两遍，且已经出现了 `ad-checker` 中英文词库能力不对等（7 处 vs 2 处）这类漂移。

### 7.6 ✅ 检查通过的项目

- `canonical` 78 个页面**全部正确**（中文页指向 `/zh/`，英文页指向原路径）
- 首页 `hreflang` 完整、JSON-LD（WebSite / WebApplication / BreadcrumbList / FAQPage）结构合法
- 无重复内容、无 index 冲突、静态资源全部本地化无外链依赖

---

## 八、修复优先级建议

### 🔴 第一优先（影响可用性与信任）

1. **修复 `csv-json` 双向转换**（中英文两版都要改）。这是唯一一个"工具本身不能用"的问题。
   - 症状：输出框结果乱码、正确的 JSON 被写进输入框、表头变成列号。
2. **删除虚标功能**，三处文案二选一（要么改文案、要么补功能）：
   - `image-converter`：文案去掉 BMP / SVG，或补上 BMP 输出（SVG 不宜承诺，位图转 SVG 无意义）
   - `hash-calc` EN：标题/SHA-1 改为 MD5（英文版实际没有 SHA-1），或补上 SHA-1 输出
   - `qrcode-generator` ZH：描述去掉「中心 Logo 图标」和「SVG 导出」

### 🟠 第二优先（SEO 结构性风险）

3. **补齐 `regex-tester` 正文与 FAQ**（全站最薄的页面，零正文零 FAQ）
4. **修正 37 处 FAQ 结构化数据**，使其与页面可见 FAQ 完全一致（数量 + 问题文本 + 答案文本）
5. **补齐 13 个页面的 hreflang**（7 个补全标签、5 个补 `x-default`，另 1 个 pdf-merge ZH 补整块）
6. **补齐 9 个英文页的正文深度**到 400 词以上、FAQ 到 3–4 条
7. **修复 `pdf-page-numbers` 被截断的英文描述**

### 🟡 第三优先（文案与一致性）

8. **重写 24 个中文标题尾部**，尤其先删掉 `mortgage-calculator` 的「流量金矿」，统一为 `| ToolNexus`
9. **全局把「秘钥」改为「密钥」**（6 个页面）
10. **统一英文品牌后缀**为 `| ToolNexus`，给 `image-to-pdf` 补上品牌名
11. **收敛标题/描述长度**（EN ≤60 / 120–158 字符；ZH ≤32 / 60–110 字符）
12. **修正 `bmi-calculator` 中英标准归属不一致**（统一 WHO 或明确区分"中国标准/国际标准"两套口径）
13. **清理中文页 UI 标签被写成 H4 的问题**（`zh/image-compress`）与 `<h4>⚡ ToolNexus 工具枢纽</h4>`
14. **补强 `ad-checker` 英文词库**，使中英文召回能力对等
15. **让 `pdf-compress` 在压缩结果变大时保留原文件并提示**

---

## 九、附：检查数据速览

| 指标 | 结果 |
|---|---|
| 抓取页面数 | 78 个工具页 + 6 个非工具页 |
| JS 报错数 | **0** |
| 控制台错误数 | **0** |
| 功能实测通过 | **38 / 39 个工具** |
| 重复段落数 | **0**（EN 286 段 / ZH 277 段全唯一） |
| 正文最薄页 | regex-tester（EN 0 词 / ZH 0 字） |
| 正文最厚页 | pdf-compress（EN 697 词 / ZH 1486 字） |
| FAQ 结构化数据不一致 | **37 处** |
| hreflang 缺失/不完整 | **13 个页面** |
| 中英实现不一致的工具 | **21 / 39** |
| 中文标题品牌位被占 | **24 个** |
| 确认的文案虚标问题 | **6 处**（涉及 4 个工具） |
