# Commander Handoff — SMART PILL BAND v4 Redesign

## สถานะก่อนเริ่มแก้รอบใหม่
- Issue #59 เสร็จแล้ว
- PR #60 ถูกรีวิวและ merge เข้า `main`
- Reviewed source SHA: `55b0419ab106ef36351c4757948744548dbe27ff`
- Main merge commit: `7a5faa8fd7f0e3fb9aa35d9c3f8f572e2790770c`
- เวอร์ชัน 15 สไลด์ถูก deploy ไป `gh-pages`
- Deployment commit: `c08829486d31cb8c2502889c9c2de33275d33644`
- Boss เปิดเว็บจริงบน iPhone แล้ว ยืนยันว่าเว็บ live และเลื่อนไปหลายสไลด์ได้

## Feedback จาก Boss หลังดูเว็บจริง
Boss ไม่อนุมัติคุณภาพภาพและ motion ปัจจุบัน และสั่งแก้รอบใหม่ทันที:

1. สไลด์เปิดเรื่องใช้ภาพ product master แบบแปะตรง ๆ ดูมักง่าย ทื่อ และไม่เป็น product launch
2. ต้องสร้างภาพนาฬิกาหลายมุม โดยใช้ผลิตภัณฑ์เดิมเป็นแรงบันดาลใจ/ต้นแบบ แต่ไม่ crop รูปเดียวซ้ำ ๆ
3. ตัดแนวคิดช่องเก็บยาด้านหลังนาฬิกาออกทั้งหมด
4. ตัดสไลด์ “ทีมและบทบาท” ออก แล้วแทนด้วยเนื้อหาที่มีประโยชน์กว่า
5. สไลด์ปัญหาปัจจุบัน (วงโคจร/เครื่องหมายคำถาม) สื่อสารไม่ชัดและไม่จำเป็น ต้องออกแบบใหม่ให้ตรงและเข้าใจง่าย
6. สไลด์ product detail ห้ามใช้ภาพเดิมครอปซ้ำ ต้องมี front, angled, side/profile, wrist-worn หรือ macro view ที่ต่างกันจริง
7. หน้าตา companion app ปัจจุบันยังเล็กและไม่ชัด ต้องทำให้เห็น workflow และแต่ละหน้าจอชัดขึ้น
8. ตัดองค์ประกอบที่ไม่จำเป็นออก
9. ปรับ animation ทั้ง deck เพราะหลายหน้าดูแข็ง ทื่อ และธรรมดา ต้องเพิ่มคุณภาพ motion อย่างมีจังหวะและมี purpose

## Approved visual directions from the uploaded concept package
The original concept PNG files were supplied to Commander in ChatGPT. Worker access to that chat attachment is not guaranteed, so these descriptions are the durable source of truth unless the ZIP is also found on-device:

- `01-cover-concept.png` — cover ใหม่แบบ cinematic product launch
- `02-design-principles-concept.png` — ใช้แทน team slide ด้วย 4 หลักการออกแบบ
- `03-multi-angle-watch-concept.png` — product detail แบบหลายมุม ไม่มี pill compartment
- `04-app-showcase-concept.png` — companion app 4 หน้าจอใหญ่และชัด

If the ZIP exists on-device (for example under `~/storage/downloads/SMART_PILL_BAND_V4_COMMANDER_HANDOFF(2).zip`), copy the four PNGs into this folder and record their hashes. If it is not available, do not falsely claim direct use; proceed from the exact approved descriptions above.

## ขอบเขตงานรอบใหม่ที่ต้องทำ
- ทำบน branch `feat/smart-pill-band-v4-collab` จาก `main`
- ห้ามแก้ `gh-pages` ตรง ๆ ก่อน review
- เปิด/ใช้ Draft PR เดียวสำหรับ v4 redesign
- ห้ามใช้ภาพทั้งสไลด์เป็น background แบบแบน ๆ อย่างเดียว; ควรแยก layer/asset ที่จำเป็นเพื่อทำ motion ให้มีมิติ
- คง 15 สไลด์ เว้นแต่เสนอจำนวนที่กระชับกว่าและได้รับอนุมัติก่อน
- แทนสไลด์ 2 ด้วย “4 หลักการออกแบบ”: จำง่าย / ตอบง่าย / ปลอดภัย / เคารพความเป็นส่วนตัว
- ออกแบบ problem slide ใหม่เป็นสถานการณ์ชัดเจน ไม่ใช้ orbit/question-mark เดิม
- ทำ watch visual หลายมุมโดยคง identity: black slim vertical body, tall rounded glossy screen, perforated black strap, blue reminder UI
- ห้ามมีช่องเก็บยาด้านหลัง
- ทำ app showcase ให้ 4 states อ่านได้ชัด: ตั้งตารางยา / แผนวันนี้ / ยืนยันหรือเลื่อนเวลา / ประวัติและรายงาน
- ตรวจข้อความจากภาพเจนก่อนใช้จริง เพราะข้อความในภาพ AI อาจผิด; ข้อความจริงควรเป็น HTML ที่แก้ไขและอ่านได้

## Motion direction
- cinematic entrance ที่แตกต่างตามประเภทสไลด์ ไม่ใช้ fade-up เหมือนกันทุกหน้า
- cover: watch hero rotate/settle, light sweep, depth parallax, phone UI drift
- principles: card cascade ตามเส้นพลังงาน, icon pulse, connector travel
- problem: scenario cards enter ตาม timeline พร้อม focus shift
- product: multi-angle views orbit/rotate อย่าง restrained, detail spotlight/mask reveal
- app: phones stagger in, active screen focus/zoom, data line เชื่อม watch→app
- workflow/scenario: state morph และ progress travel แทนการสลับ class แข็ง ๆ
- ใช้ spring/easing ที่นุ่ม, transform + opacity, หลีกเลี่ยง layout-jank
- รองรับ `prefers-reduced-motion`
- มือถือ landscape ต้องอ่านได้และไม่เกิด crop/overflow

## Acceptance gates
- Boss review จาก live preview ก่อน merge/deploy
- ไม่มีภาพ product master เดิมถูกแปะเต็มกรอบหรือ crop ซ้ำแบบเดิม
- ไม่มี pill compartment claim/visual
- ไม่มี team placeholder slide
- app screens อ่านได้จริง
- animation แต่ละ chapter มี character ต่างกันและไม่แข็ง
- desktop + iPhone landscape + reduced motion ผ่าน
- offline, zero audio, no external runtime dependencies
- deploy `gh-pages` หลัง Boss อนุมัติ Draft PR เท่านั้น

## Collaboration policy authorized by Boss
Use automatic GitHub Issue dispatch by default. For this task and similar future work:
1. Claude Code performs a small, bounded design/blueprint phase.
2. Claude Code commits the design handoff and automatically releases the prepared Codex issue by adding `codex-task` only after design completion.
3. Codex continues implementation on the same branch and Draft PR.
4. One writer at a time; no overlapping edits.
5. Boss alone authorizes merge and deployment.
