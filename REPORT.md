# รายงานสำรวจ — projects/medi-band-dm/animated-presentation

รายงานอย่างเดียว ไม่มีการแก้ไขไฟล์เดิมในโปรเจกต์ ตรวจสอบทุกไฟล์ในโฟลเดอร์ `projects/medi-band-dm/animated-presentation/` ณ commit `8ea4aab` บนสาขา `main`

โครงสร้างไฟล์ที่พบทั้งหมด:

```text
index.html, styles.css, app.js, serve.sh
README.md, PRESENTER_NOTES_TH.md, SOURCES.md
assets/smart-pill-band-master-reference-v3.webp
preview/contact-sheet.webp, preview/slide-01.webp … slide-15.webp
scripts/browser-check.html, scripts/build-dist.py, scripts/contact-sheet.html,
scripts/render-previews.sh, scripts/run-browser-check.sh, scripts/validate-deck.mjs
dist/SMART_PILL_BAND_PRESENTATION_V3.zip
design/v4-handoff/*.md (9 ไฟล์ เอกสารวางแผน v4 ที่ยังไม่ implement)
```

ไม่มี `package.json`, `node_modules/`, หรือ bundler config ใด ๆ ในโฟลเดอร์นี้

---

## 1. PLACEHOLDER

ไม่พบรูปแบบค่าปลอมทั่วไปเลย เช่น `example.com`, `yourdomain`, `your-name`, `TODO`, `FIXME`, `Lorem ipsum`, `XXX`, `href="#"` เปล่า ๆ, อีเมลสมมติ, หรือ `localhost` ที่หลงเหลือโดยไม่ตั้งใจ (ตรวจด้วย grep แบบ case-insensitive ทั้งโฟลเดอร์)

สิ่งที่พบเป็น placeholder ที่ตั้งใจใส่ไว้และมีป้ายกำกับชัดเจนในเอกสารประกอบ (README.md, SOURCES.md, PRESENTER_NOTES_TH.md ระบุตรงกันว่าต้องแทนที่ก่อนนำเสนอจริง):

| ไฟล์ | บรรทัด | ข้อความที่เจอ | เดาว่าควรเป็นอะไร |
|---|---|---|---|
| index.html | 43, 44, 45 | `<span>MEMBER SLOT</span>` (ซ้ำ 3 จุด) | ป้ายชั่วคราวของช่องสมาชิก ควรลบ/แทนเมื่อใส่ข้อมูลจริง |
| index.html | 43, 44, 45 | `<strong>[ชื่อ–นามสกุล]</strong>` (ซ้ำ 3 จุด) | ชื่อ–นามสกุลสมาชิกทีมจริง 3 คน |
| index.html | 43, 44, 45 | `<p>บทบาท: [กรอกตามจริง]</p>` (ซ้ำ 3 จุด) | บทบาท/หน้าที่จริงของสมาชิกแต่ละคน |
| index.html | 46 | `<span>EDITABLE</span><strong>+ เพิ่ม / ลดช่อง</strong>` | คำแนะนำการแก้ไข ไม่ใช่ข้อมูลปลอม — ให้คงหรือลบตามจำนวนสมาชิกจริง |
| design/v4-handoff/COMMANDER_HANDOFF_TH.md | 28–31 (อ้างซ้ำใน README.md บรรทัด 6–9) | ชื่อไฟล์ `01-cover-concept.png`, `02-design-principles-concept.png`, `03-multi-angle-watch-concept.png`, `04-app-showcase-concept.png` | ไฟล์ภาพ concept จริงที่ต้องคัดลอกเข้ามาจาก ZIP ภายนอก — ปัจจุบันไม่มีไฟล์เหล่านี้อยู่จริงเลย (ดูหัวข้อ 3) |

สรุป: placeholder ทั้งหมดในตัว deck (index.html สไลด์ 2) เป็น placeholder ที่ตั้งใจและมีเอกสารกำกับ ไม่ใช่ของหลงเหลือแบบไม่ตั้งใจ ส่วน placeholder ในโฟลเดอร์ `design/v4-handoff/` เป็นการอ้างอิงไฟล์ภาพที่ยังไม่ถูกนำเข้าโปรเจกต์

---

## 2. ลิงก์และ asset ภายใน

ไล่ทุก `href=`, `src=`, `url()`, `@import`, `import`, `fetch` ในไฟล์ `.html` `.css` `.js` ทั้งหมดในโฟลเดอร์:

**Relative (เช่น `assets/x.png`, `../preview/x.webp`) — พบทั้งหมด:**
- `index.html`: `href="styles.css"`, `src="app.js"`, และ `src="assets/smart-pill-band-master-reference-v3.webp"` ซ้ำ 6 จุด (บรรทัด 24, 148, 171–174, 257)
- `scripts/browser-check.html`: `src="../index.html?preview=1#slide-1"` (1 จุด)
- `scripts/contact-sheet.html`: `src="../preview/slide-01.webp"` ถึง `slide-15.webp` (15 จุด)
- ไม่มี `url()` หรือ `@import` ใน `styles.css` เลย (background ทั้งหมดใช้ `linear-gradient`/`radial-gradient` ไม่ใช้รูปพื้นหลัง)

**Absolute เริ่มด้วย `/` (เช่น `/assets/x.png`) — พบ 0 จุด**
ไม่มี asset หรือลิงก์ใดเริ่มด้วย `/` เลยในทั้งโฟลเดอร์ จึงไม่มีความเสี่ยง 404 บน GitHub Pages ที่เสิร์ฟใต้ `/portfolio/` สำหรับ deck นี้ (มีเพียง `<link rel="icon" href="data:,">` ซึ่งเป็น data URI ไม่ใช่ path จึงไม่นับเป็นกลุ่มนี้)

**External (http/https) — พบ 0 จุดใน runtime code (html/css/js ของตัว deck)**
`scripts/validate-deck.mjs` มีเช็คอัตโนมัติอยู่แล้วว่า `no external runtime URL` ต้องผ่าน (บรรทัด 29) ยืนยันว่า deck ไม่โหลดจากภายนอก
พบลิงก์ http(s) เฉพาะในเอกสารประกอบ (ไม่ใช่โค้ดที่รันจริง):
- `SOURCES.md` บรรทัด 6, 9, 12, 15 — ลิงก์อ้างอิงแหล่งข้อมูล IDF Diabetes Atlas (diabetesatlas.org, idf.org) เป็น citation ในเอกสาร ไม่ถูกโหลดโดย deck
- `README.md` บรรทัด 12 — `http://127.0.0.1:8080` เป็นตัวอย่าง URL เซิร์ฟเวอร์ local ในคำแนะนำการรันเท่านั้น

---

## 3. ไฟล์ที่ถูกอ้างถึงแต่ไม่มีอยู่จริง

**ตัว deck ที่ใช้งานจริง (index.html/styles.css/app.js/scripts/serve.sh):** ไม่มีไฟล์หาย ทุก asset ที่ถูกเรียก (`assets/smart-pill-band-master-reference-v3.webp`, `preview/slide-01.webp` … `slide-15.webp`, `preview/contact-sheet.webp`) มีอยู่จริงในโฟลเดอร์ครบทุกไฟล์ (ตรวจแล้วด้วยการเทียบรายชื่อไฟล์จริงกับ `scripts/validate-deck.mjs` ที่มี `requiredFiles` list และ `scripts/build-dist.py` ที่มี `FILES` list — ทั้งสอง list ตรงกับไฟล์ที่มีอยู่จริงทั้งหมด)

**โฟลเดอร์ `design/v4-handoff/` (เอกสารวางแผน v4 ที่ยังไม่ implement):** พบไฟล์ที่ถูกอ้างถึงแต่ไม่มีอยู่จริง 4 ไฟล์ — ระบุไว้ตรงในเอกสารเองว่ายังไม่มี:
- `01-cover-concept.png`
- `02-design-principles-concept.png`
- `03-multi-angle-watch-concept.png`
- `04-app-showcase-concept.png`

ทั้ง 4 ไฟล์นี้ถูกอธิบายไว้ใน `design/v4-handoff/README.md` และ `COMMANDER_HANDOFF_TH.md` ว่าเป็นภาพ concept ที่อัปโหลดไว้ในแชท ChatGPT ภายนอกเท่านั้น ยังไม่ถูกดึงเข้ามาคอมมิตในโฟลเดอร์นี้ — เอกสารเองระบุ fallback ว่าให้ใช้คำอธิบายข้อความแทนหากหาไฟล์ ZIP ต้นทางไม่เจอ

---

## 4. ต้อง build หรือไม่

**ไม่ต้อง build — เปิด `index.html` ตรง ๆ ใช้งานได้ทันที**
- ไม่มี `package.json`, ไม่มี bundler (webpack/vite/parcel ฯลฯ), ไม่มี framework dependency
- `index.html` โหลด `styles.css` และ `app.js` แบบ relative path ธรรมดา เปิดผ่าน `file://` ได้ตามที่ README.md ระบุ หรือรัน `bash serve.sh` เพื่อเปิดผ่าน `python3 -m http.server` (fallback เป็น `busybox httpd`) ก็ได้เช่นกัน
- โฟลเดอร์ `scripts/` เป็นเครื่องมือเสริมสำหรับ dev/QA เท่านั้น ไม่ใช่ build step ที่บังคับก่อนดู deck:
  - `validate-deck.mjs` — เช็คโครงสร้าง/เนื้อหา/contrast (ต้องมี Node.js)
  - `run-browser-check.sh` + `browser-check.html` — smoke test navigation ด้วย headless Chromium
  - `render-previews.sh` — สร้างภาพ preview ด้วย headless Chromium + `cwebp`
  - `build-dist.py` — สร้าง `dist/SMART_PILL_BAND_PRESENTATION_V3.zip` ด้วย Python (`zipfile`)

**เวอร์ชัน `dist/` เทียบกับ source:** ตรวจสอบโดยแตกไฟล์ zip แล้ว diff ไบต์ต่อไบต์กับ `index.html`, `styles.css`, `app.js`, `README.md` ปัจจุบัน — **ไม่มีความต่างเลยแม้แต่ตัวอักษรเดียว** ZIP เป็นเวอร์ชันล่าสุด ตรงกับ source ปัจจุบันทั้งหมด (ทั้งคู่ถูกคอมมิตมาพร้อมกันใน commit เดียว `8ea4aab add medi-band deck + .nojekyll` จึงไม่มีทางเก่ากว่ากันได้ในสถานะปัจจุบันของ repo)

---

## 5. โครงสร้าง deck

**เนื้อหาสไลด์กับ engine ปนกันอยู่ในระดับหนึ่ง แยกไม่สมบูรณ์:**
- **Engine (แยกจากเนื้อหาชัดเจน):** `app.js` (230 บรรทัด) จัดการ navigation, scale-to-fit ตาม viewport, reveal animation, ตัวนับตัวเลข, demo timer ของ flow/scenario, keyboard/touch/click handler — เป็นโค้ด generic ที่ไม่ผูกกับข้อความเนื้อหาสไลด์ใด ๆ โดยตรง (อ้างอิงผ่าน CSS class/data-attribute เท่านั้น)
- **Visual system (แยกไฟล์ แต่ผูกกับสไลด์เฉพาะ):** `styles.css` (276 บรรทัด) แยกไฟล์จาก markup แต่ภายในเขียนเป็น section เฉพาะเจาะจงต่อสไลด์ทีละหมายเลข (คอมเมนต์ `/* 01 */` ถึง `/* 15 */`) แต่ละสไลด์มี layout/class เฉพาะตัวของตัวเอง ไม่ใช่ reusable component
- **เนื้อหาสไลด์ (ปนกับ markup โดยตรง):** `index.html` (286 บรรทัด) มีทั้งโครงสร้าง section, ข้อความภาษาไทย/อังกฤษ, ตัวเลขสถิติ, alt text ของรูป และ inline `src=` ของ asset hardcode ปนกันอยู่ในไฟล์เดียว — ไม่มี content-data layer แยกต่างหาก (ไม่มี JSON/YAML/markdown ที่ engine อ่านมา render)

**ถ้าจะทำเป็น template สร้าง deck ใหม่ได้เร็ว ควรแยกสิ่งเหล่านี้ออกจากกัน:**
1. **เนื้อหาสไลด์ออกจาก markup** — ย้ายข้อความ/ตัวเลข/alt text ของแต่ละสไลด์ไปเป็นไฟล์ data (JSON/YAML) แยกจาก `index.html` โครงสร้าง แล้วให้ engine render จาก data แทนการ hardcode ใน HTML
2. **asset path ออกเป็น config** — ปัจจุบัน `assets/smart-pill-band-master-reference-v3.webp` ถูก hardcode ซ้ำ 6 จุดใน `index.html` ควรอ้างอิงจากตัวแปรเดียว
3. **layout เฉพาะสไลด์ → slide-type component ที่ใช้ซ้ำได้** — `styles.css` เขียน CSS เฉพาะเจาะจงทีละสไลด์ (เช่น `.problem-orbit`, `.stats-layout`, `.five-flow`) ถ้าจะ generalize ควรจัดกลุ่มเป็น "slide type" ที่ใช้ซ้ำได้ (เช่น stat-slide, grid-slide, flow-slide) แทนการเขียนสไตล์ใหม่ทุกสไลด์
4. **engine (`app.js`) ใช้ซ้ำได้อยู่แล้ว** ไม่ต้องแก้มาก เพราะไม่ผูกกับเนื้อหาโดยตรง แต่ยังผูกกับจำนวน/ตำแหน่ง slide คงที่บางจุด (เช่น `if (index === 10) startFlow()`, `if (index === 11) startScenario()` อ้างอิง index สไลด์ตรง ๆ) ควรเปลี่ยนเป็นอ่านจาก `data-*` attribute แทน index ตายตัวหากจะ generalize
5. **`scripts/validate-deck.mjs` ผูกกับเนื้อหาเฉพาะ deck นี้แบบ hardcode** (เช็ค string ตรง ๆ เช่น `"589"`, `"6.36"`, ข้อความภาษาไทยเฉพาะ) หากทำ template ต้อง generalize เป็น schema-based validation แทนการเช็คค่าคงที่

**หมายเหตุเพิ่มเติม:** โฟลเดอร์ `design/v4-handoff/` เป็นเอกสารวางแผนสำหรับการ redesign เวอร์ชัน 4 ที่ยังไม่ถูก implement ในโค้ดจริง (ระบุ branch `feat/smart-pill-band-v4-collab` และรอ Codex ทำต่อ) ไม่เกี่ยวข้องกับโครงสร้างของ deck v3 ที่ใช้งานอยู่ปัจจุบันใน `index.html`
