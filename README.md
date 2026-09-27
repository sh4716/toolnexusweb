# 🛠️ ToolNexus - 100% Client-Side Privacy-First Web Utilities

> **ToolNexus** is a modern, fast, and privacy-focused suite of daily developer and office tools. Every calculation, conversion, and document processing task executes **100% locally in your browser** — zero files or data are ever uploaded to any server.

---

## 🌟 Key Features

- **🔒 100% Privacy & Security:** All PDF manipulation, image processing, cryptography, and calculations run client-side via WebAssembly & JavaScript.
- **⚡ Zero Latency:** No server roundtrips; lightning-fast real-time processing.
- **🌐 Bilingual Support:** Native English and Simplified Chinese (`/zh/`) internationalization.
- **🌓 Dark Mode:** Seamless theme switching with smooth transitions and zero flickering.
- **🚀 Zero Build Step:** Built with modern vanilla HTML5, CSS3, and JavaScript — ready to deploy anywhere without complex build pipelines.

---

## 🧰 Included Tools

### 📄 PDF Utilities
- **PDF Merge & Split:** Combine multiple PDFs or extract specific pages.
- **PDF Compress:** Optimize file size directly in the browser.
- **PDF Page Numbers & Rotate:** Add custom pagination and orient pages.
- **PDF Sign & Watermark:** Sign contracts and add security watermarks.
- **PDF to Image & Image to PDF:** Convert seamlessly between formats.

### 🖼️ Image Tools
- **Image Compress:** High-efficiency browser-side compression (JPG, PNG, WebP).
- **Format Converter:** Convert between PNG, JPG, WebP, SVG, and more.
- **ID Watermark:** Securely add anti-theft watermarks to identity cards.

### 💻 Developer & Text Tools
- **JSON Formatter & CSV-JSON:** Validate, beautify, and convert structured data.
- **JWT Decoder & Base64 Converter:** Inspect and decode tokens and payloads.
- **Regex Tester & Unicode Inspector:** Test regular expressions and examine characters.
- **Timestamp Converter & Cron Parser:** Work with epoch timestamps and schedule syntax.
- **Hash & Password Generator:** SHA, MD5 checksums and secure password generation.
- **Text Diff & Word Counter:** Compare texts line-by-line and count words/chars.

### 🔢 Calculators
- **BMI, Age, Salary, Tip, Percentage, Mortgage Calculators.**

---

## 🚀 Quick Start & Local Development

Because ToolNexus is pure static front-end code, you can run it locally using any static file server:

### Option 1: Using Python
```bash
# Python 3
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Using Node.js / npx
```bash
npx serve .
```

### Option 3: Using Cloudflare Wrangler
```bash
npx wrangler dev
```

---

## 🌐 Deployment

ToolNexus can be deployed instantly to any static hosting provider without a build step:

- **Cloudflare Pages / Cloudflare Workers** (Configured via `wrangler.json`)
- **GitHub Pages**
- **Vercel**
- **Netlify**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
