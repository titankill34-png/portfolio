# Deck starter

Template สำหรับสร้าง deck ใหม่จาก `projects/medi-band-dm/animated-presentation/` — มี 3 สไลด์ตัวอย่าง (ปก, สถิติ, เนื้อหาแบบ grid) ให้แก้ต่อ

## 1. รันยังไง

เปิด `index.html` ตรง ๆ ในเบราว์เซอร์ได้เลย (ไม่ต้อง build) หรือรันเซิร์ฟเวอร์ local:

```
bash serve.sh
```

แล้วเปิด `http://127.0.0.1:8080`

## 2. แก้ข้อความสไลด์ที่ไหน

แก้ใน `index.html` ทุกจุดที่เขียนว่า "...ที่นี่":

- สไลด์ 1 (ปก) — บรรทัด 14–29
- สไลด์ 2 (สถิติ) — บรรทัด 31–48
- สไลด์ 3 (กริด) — บรรทัด 50–61

## 3. เพิ่มสไลด์ใหม่ยังไง

1. ก๊อป `<section class="slide ...">...</section>` อันที่ใกล้เคียงที่สุดใน `index.html` มาวางต่อท้าย ก่อน `<nav class="presenter-ui">`
2. ใส่ `data-title="..."` ใหม่ให้ตรงกับเนื้อหา
3. ถ้าใช้ layout เดิม (cover/stats/process-grid) ไม่ต้องแตะ `styles.css` — ถ้าต้องการ layout ใหม่ ให้เพิ่ม CSS class ใหม่ใน `styles.css`
4. แก้ตัวเลข "03" ในบรรทัด `<div class="slide-status"><span id="current-slide">01</span><i></i><span>03</span></div>` ให้ตรงกับจำนวนสไลด์ทั้งหมด
5. ไม่ต้องแตะ `app.js` — นับจำนวนสไลด์และเลขหน้าปัจจุบันจากจำนวน `.slide` จริงอัตโนมัติ

## 4. ใส่รูปยังไง

1. วางไฟล์รูปไว้ใน `assets/` เช่น `assets/my-photo.webp`
2. แทนที่ `<div class="image-placeholder">...</div>` ในสไลด์ปก ด้วย:
   ```html
   <img src="assets/my-photo.webp" alt="คำอธิบายรูปสำหรับ screen reader">
   ```
3. ใช้ path แบบ relative เสมอ (เช่น `assets/x.webp`) ห้ามขึ้นต้นด้วย `/`
