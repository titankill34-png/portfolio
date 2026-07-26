# SMART PILL BAND — Premium 15-slide silent deck

งานนำเสนอ HTML ภาษาไทยแบบออฟไลน์ 15 สไลด์ อัตราส่วน 16:9 สำหรับการนำเสนอประมาณ 10–12 นาที ใช้ภาพผลิตภัณฑ์ที่ได้รับอนุมัติเป็นตัวตนหลักและไม่มีเสียงหรือ dependency จากภายนอก

## เปิดใช้งาน

```bash
cd projects/medi-band-dm/animated-presentation
bash serve.sh
```

เปิด `http://127.0.0.1:8080` หรือเปิด `index.html` โดยตรงผ่าน `file://` ได้ การนำเสนอไม่ส่ง network request ภายนอก

## การควบคุม

- ถัดไป: `→`, `↓`, `PageDown`, `Space` หรือคลิก/แตะด้านขวา
- ก่อนหน้า: `←`, `↑`, `PageUp` หรือคลิก/แตะด้านซ้าย
- สไลด์แรก/สุดท้าย: `Home` / `End`
- เต็มหน้าจอ: `F` หรือปุ่ม `⛶`
- ซ่อน/แสดงตัวควบคุม: `H`, `×` หรือ `•••`
- มือถือแนวนอน: ปัดซ้าย/ขวา
- ปุ่มใน app demo, workflow และ scenario หยุด event ไม่ให้เปลี่ยนสไลด์โดยไม่ตั้งใจ

ตัว deck ใช้ canvas 1366×768 แล้ว scale แบบ contain จึงคงสัดส่วน 16:9 ที่ 1366×768, 1920×1080 และจอมือถือแนวนอน

## เรื่องราว 15 สไลด์

1. Cover และการเผยผลิตภัณฑ์
2. ทีมและบทบาท
3. ที่มาและความสำคัญผ่าน timeline หนึ่งวัน
4. สถานการณ์เบาหวานจาก IDF Diabetes Atlas
5. ปัญหาผู้ใช้ในชีวิตจริง
6. ผู้ใช้เป้าหมายและผู้เกี่ยวข้อง
7. วัตถุประสงค์และหลักการออกแบบ 4 ข้อ
8. ภาพรวมระบบ watch–app–caregiver
9. ส่วนประกอบนาฬิกาจาก approved master
10. Companion app สี่สถานะ
11. วิธีทำงาน 5 ขั้นตอน
12. สถานการณ์ 08:00–08:16
13. กระบวนการพัฒนานวัตกรรม 6 ระยะ
14. การประเมิน ความปลอดภัย และข้อจำกัด
15. ประโยชน์ สรุป และ Q&A

## Visual lock และ provenance

`assets/smart-pill-band-master-reference-v3.webp` คือ approved product master และถูกใช้โดยตรงในสไลด์ 1, 8, 9 และ 15 ทั้งแบบ hero, system view และ purposeful crops ไม่มี fallback watch, smartwatch ทรงกลม หรืออุปกรณ์ทั่วไปปรากฏใน deck

App UI สร้างด้วย HTML/CSS ภายใน repository โดยยึดหน้าจอทรงสะอาด พื้นขาว ปุ่มสีน้ำเงิน ตารางยา และ visual language จาก master ไม่มีฟอนต์ภายนอก CDN หรือ runtime dependency

## ข้อจำกัดข้อมูลทีม

รายงานและไฟล์โครงการที่ตรวจสอบแล้วไม่ระบุชื่อสมาชิกหรือบทบาท Slide 2 จึงใช้ช่อง neutral ที่แก้ไขได้ และมีป้ายข้อจำกัดชัดเจน ต้องแทนที่ด้วยข้อมูลที่ตรวจสอบแล้วก่อนนำเสนอ ห้ามนำ placeholder ไปตีความเป็นข้อมูลจริง

## ไฟล์

```text
index.html                               เนื้อหา 15 สไลด์
styles.css                              visual system, layout และ motion
app.js                                  navigation, scale, demo และ accessibility
assets/smart-pill-band-master-reference-v3.webp
preview/contact-sheet.webp
preview/slide-01.webp … slide-15.webp
PRESENTER_NOTES_TH.md                    บทพูดเป้าหมาย 10–12 นาที
SOURCES.md                               claim/source audit และ visual provenance
scripts/render-previews.sh               renderer แบบ local Chromium
scripts/validate-deck.mjs                structural/offline/audio/content checks
scripts/run-browser-check.sh             Chromium navigation/reduced-motion smoke test
scripts/build-dist.py                    สร้าง ZIP โดยรักษาโครงสร้างโฟลเดอร์
dist/SMART_PILL_BAND_PRESENTATION_V3.zip
serve.sh
```

## ตรวจสอบและสร้าง artefacts

```bash
node scripts/validate-deck.mjs
bash scripts/run-browser-check.sh
bash scripts/render-previews.sh
python3 scripts/build-dist.py
python3 -m zipfile -l dist/SMART_PILL_BAND_PRESENTATION_V3.zip
```

Chromium ต้องพร้อมใช้งานเฉพาะตอนสร้าง preview; ตัว presentation ที่แจกจ่ายไม่มี runtime dependency เพิ่มเติม
