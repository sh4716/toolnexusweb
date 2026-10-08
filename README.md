# 🛠️ ToolNexus - 100% Client-Side Privacy-First Web Utilities

<p align="center">
  <strong>English</strong> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <a href="https://toolnexusweb.com" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-toolnexusweb.com-2563eb?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Demo" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  </a>
  <img src="https://img.shields.io/badge/Tools-39_Utilities-orange?style=for-the-badge" alt="39 Tools" />
  <img src="https://img.shields.io/badge/Privacy-100%25_Client--Side-blue?style=for-the-badge" alt="Privacy First" />
</p>

> **ToolNexus** is a modern, fast, and privacy-focused suite of 39+ daily developer, office, and productivity tools. Every calculation, conversion, and document processing task executes **100% locally in your browser** — zero files or data are ever uploaded to any server.

---

## 🌐 Instant Live Access (No Setup Required)

If you don't want to build or host it yourself, you can directly use the fully deployed online version for free:

👉 **[https://toolnexusweb.com](https://toolnexusweb.com)** (English)  
👉 **[https://toolnexusweb.com/zh/](https://toolnexusweb.com/zh/)** (简体中文)

---

## 📸 Screenshots & Preview

### Homepage & Category Navigation
![ToolNexusWeb Homepage](./docs/screenshots/hero-home.png)

![Tool Cards Overview](./docs/screenshots/tools-grid.png)

### 🌟 Featured Tools Showcase
| ✍️ Client-Side PDF Signature | ✂️ PDF Page Split & Extraction |
| :---: | :---: |
| ![PDF Sign](./docs/screenshots/pdf-sign.png) | ![PDF Split](./docs/screenshots/pdf-split.png) |

---

## 🌟 Key Features

- **🔒 100% Privacy & Security:** All PDF manipulations, image processing, hash calculations, and text transformations run client-side via WebAssembly & JavaScript.
- **⚡ Zero Latency:** No server roundtrips; instant execution with zero wait times.
- **🌐 Bilingual Support:** Native English and Simplified Chinese (`/zh/`) internationalization.
- **🌓 Dark Mode:** Seamless theme switching with smooth transitions and zero flickering.
- **🚀 Zero Build Pipeline:** Built with standard vanilla HTML5, CSS3, and JavaScript — deploy anywhere with zero build configuration.

---

## 🧰 Complete Directory of Tools (39 Tools)

### 📄 PDF Utilities (8)
| Tool | Description |
| :--- | :--- |
| **PDF Merge** | Combine multiple PDF documents into a single file |
| **PDF Split** | Extract pages or split PDF into separate files |
| **PDF Compress** | Compress PDF size locally in browser |
| **PDF Page Numbers** | Add customizable pagination headers/footers |
| **PDF Rotate** | Rotate individual or all pages with 90°/180°/270° |
| **PDF Sign** | Add signature or stamps directly on PDF pages |
| **PDF to Image** | Convert PDF pages to high-res JPG/PNG images |
| **Image to PDF** | Convert images (JPG, PNG, WebP) into PDF documents |

### 🖼️ Image Tools (3)
| Tool | Description |
| :--- | :--- |
| **Image Compress** | High-efficiency image compression (JPG, PNG, WebP) |
| **Image Converter** | Convert formats between PNG, JPG, WebP, SVG, and more |
| **ID Watermark** | Add secure anti-theft watermarks to identity card photos |

### 💻 Developer & Text Tools (19)
| Tool | Description |
| :--- | :--- |
| **JSON Formatter** | Validate, beautify, minify, and inspect JSON data |
| **CSV ↔ JSON** | Two-way conversion between CSV and JSON formats |
| **JWT Decoder** | Decode header, payload, and inspect expiration dates |
| **Base64 Converter** | Encode and decode Base64 strings and files |
| **URL Encoder** | URL encoding / decoding with UTF-8 support |
| **HTML Encoder** | Escape and unescape HTML special entities |
| **Regex Tester** | Real-time regular expression matching with cheat sheet |
| **Unix Timestamp** | Convert epoch timestamps to human-readable dates |
| **Cron Parser** | Parse Cron syntax into natural language & schedule rules |
| **Hash Calculator** | Compute MD5, SHA-1, SHA-256, SHA-512 checksums |
| **UUID Generator** | Generate random UUID v4 / GUID in batch |
| **Password Generator** | Create cryptographically secure random passwords |
| **QR Code Generator** | Generate customizable QR codes with logo & colors |
| **Text Diff Checker** | Line-by-line and word-level text difference comparison |
| **Word Counter** | Real-time words, characters, sentences, and reading time |
| **Case Converter** | Convert UPPERCASE, lowercase, camelCase, snake_case, etc. |
| **Unicode Inspector** | Analyze Unicode code points, UTF-8/UTF-16 encoding |
| **Color Converter** | Convert colors between HEX, RGB, HSL, and HSV |
| **Color Contrast** | WCAG 2.1 accessibility color contrast ratio validator |

### 🔢 Calculators & Daily Utilities (9)
| Tool | Description |
| :--- | :--- |
| **BMI Calculator** | Calculate Body Mass Index and healthy weight ranges |
| **Age Calculator** | Exact age calculation with zodiac and life milestones |
| **Salary Calculator** | Net salary and social insurance / tax calculation |
| **Mortgage Calculator** | Estimate monthly mortgage payments and total interest |
| **Tip Calculator** | Bill splitting and tip calculation per person |
| **Percentage Calculator** | Quick percentage increase, decrease, and discount rules |
| **Unit Converter** | Comprehensive conversion (Length, Weight, Temp, Area, Data) |
| **Ad Compliance Checker** | Detect prohibited / extreme marketing buzzwords |
| **Lorem Ipsum Generator** | Generate dummy placeholder paragraphs and sentences |

---

## 🚀 Quick Start & Local Development

Because ToolNexus is pure static front-end code, you can run it locally with any static HTTP server:

### Option 1: Python
```bash
python -m http.server 8080
```
Visit [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Node.js
```bash
npx serve .
```

### Option 3: Cloudflare Wrangler
```bash
npx wrangler dev
```

---

## 🌐 One-Click Deployment

ToolNexus can be deployed instantly to any static hosting provider without any build step:

- **Cloudflare Pages / Workers:** Configured out-of-the-box with `wrangler.json`.
- **GitHub Pages:** Enable Pages directly from repo settings pointing to root `/`.
- **Vercel / Netlify:** Import git repository and deploy with zero configuration.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
