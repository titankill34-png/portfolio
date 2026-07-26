# V4 Design Blueprint — SMART PILL BAND

**Prepared by:** Claude Code
**Date:** 2026-07-20
**Branch:** `feat/smart-pill-band-v4-collab`
**Baseline SHA:** `4bae4ccc088c8507f6c50d6d5bc824c2833f36ed`
**Handoff source:** `design/v4-handoff/COMMANDER_HANDOFF_TH.md`
**PNG asset status:** ZIP not found on-device. All visual descriptions are the durable source. Do not claim direct PNG use. CSS/HTML-constructed visuals replace pasted AI images.

---

## Section 1 — 15-Slide V4 Story Map

The deck keeps exactly 15 slides. Slide 2 replaces the team placeholder. No slides added or removed.
Slides not marked CHANGED preserve existing HTML; Codex applies motion upgrades and removes pill compartment references only.

| # | CSS class | Thai title | V4 change |
|---|-----------|-----------|-----------|
| 01 | `slide-cover` | SMART PILL BAND | **CHANGED** — CSS watch hero replaces flat image. Light sweep, depth parallax. See §3. |
| 02 | `slide-principles-hero` (was `slide-team`) | 4 หลักการออกแบบ | **CHANGED** — replaces team placeholder with 4 principle cards + energy-line cascade. See §5. |
| 03 | `slide-background` | การดูแลไม่ได้เกิดขึ้นแค่ในคลินิก | Preserve content; upgrade motion to sequential card enter. |
| 04 | `slide-stats` | ตัวเลขปี 2024 | Preserve; upgrade counter with stagger. |
| 05 | `slide-problem` | สถานการณ์ปัญหา | **CHANGED** — replace orbit/? with scenario cards + timeline. See §2. |
| 06 | `slide-users` | ผู้ใช้เป้าหมาย | Preserve; upgrade stakeholder ring with radiate entrance. |
| 07 | `slide-objectives` (was `slide-principles`) | เป้าหมายและขอบเขต | **CHANGED** — repurpose to does/does-not two-column layout (principles moved to slide 2). Content spec below. |
| 08 | `slide-system` | ภาพรวมระบบ | Remove master-image crop in watch node; replace with CSS silhouette. Remove pill-compartment alt text. |
| 09 | `slide-components` | ผลิตภัณฑ์หลายมุม | **CHANGED** — 4 genuine CSS watch views (front/angled/side/wrist). No pill-compartment card. See §3. |
| 10 | `slide-apps` | แอปคู่ companion | **CHANGED** — larger phones, readable HTML text, watch-to-app data arc. See §4. |
| 11 | `slide-how` | วิธีการทำงาน 5 ขั้นตอน | Preserve; upgrade with sequential step reveal + connector travel. |
| 12 | `slide-scenario` | สถานการณ์ตัวอย่าง | Preserve; upgrade state morph animation. |
| 13 | `slide-process` | กระบวนการพัฒนา | Preserve; upgrade with staggered entrance. |
| 14 | `slide-evaluation` | การประเมินและข้อจำกัด | Preserve; upgrade panel entrance. |
| 15 | `slide-close` | ประโยชน์ สรุป และถามตอบ | **CHANGED** — CSS watch silhouette + closing ring replaces flat master image. |

### Slide 07 — Objectives/Safety Boundary (repurposed)

**eyebrow:** WHAT THIS SYSTEM DOES — AND DOES NOT
**layout:** `.objectives-grid` two-column

Left column `.does-col` header: ระบบนี้ทำ
items: เตือนในเวลา · รับคำตอบของผู้ใช้ · บันทึกประวัติ · แชร์เมื่อได้รับความยินยอม

Right column `.does-not-col` header: ระบบนี้ไม่ทำ
items: วินิจฉัยโรค · คำนวณขนาดยา · ปรับแผนการรักษาอัตโนมัติ · ส่งข้อมูลโดยไม่ยินยอม

Bottom `.objectives-tagline`: "ระบบนี้ช่วยให้ผู้ใช้จำว่าตอบอะไร ไม่ใช่ตัดสินว่าควรทำอะไร"

---

## Section 2 — Problem Slide Redesign (Slide 05)

### Remove
- `.problem-orbit`, `.problem-core`, `.problem-item p1–p5`

### Replacement: Scenario Cards + Vertical Timeline

HTML target structure:
```html
<div class="problem-timeline" data-reveal>
  <div class="timeline-spine" aria-hidden="true"></div>

  <article class="scenario-card sc-1" data-reveal>
    <time>08:00</time>
    <h3>นาฬิกาเตือน · กำลังรีบออกไป</h3>
    <p>ผู้ใช้กด "เลื่อนเวลา" แต่ภายหลังจำไม่ได้ว่าตอบอะไร</p>
    <span class="pain-tag">ไม่แน่ใจว่าตอบแล้วหรือยัง</span>
  </article>

  <article class="scenario-card sc-2" data-reveal>
    <time>12:30</time>
    <h3>ผู้ดูแลโทรถาม · ผู้ใช้ตอบไม่ได้</h3>
    <p>ประวัติกระจายอยู่ในหลายที่ ไม่มีจุดเดียวที่ดูได้</p>
    <span class="pain-tag">ผู้ดูแลไม่แน่ใจ</span>
  </article>

  <article class="scenario-card sc-3" data-reveal>
    <time>พบแพทย์</time>
    <h3>แพทย์ถามถึงการรับประทานยา 7 วัน</h3>
    <p>ผู้ป่วยจำได้บางส่วน · ไม่มีบันทึกที่นำเสนอได้</p>
    <span class="pain-tag">การสนทนาขาดข้อมูล</span>
  </article>

  <div class="problem-resolution" data-reveal>
    <span>SMART PILL BAND แก้ปัญหานี้ด้วย →</span>
    <strong>เตือน · บันทึกคำตอบ · ย้อนดูประวัติ</strong>
  </div>
</div>
<p class="no-claim">ไม่ใช้ตัวเลข "อัตราลืมยา" ที่ไม่มีหลักฐานรองรับ</p>
```

CSS:
```css
.problem-timeline { position: relative; display: flex; flex-direction: column; gap: 20px; }
.timeline-spine {
  position: absolute; left: 20px; top: 0; bottom: 80px;
  width: 2px; background: rgba(8,124,255,.35);
  transform-origin: top; /* for scaleY animation */
}
.scenario-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-left: 3px solid var(--blue);
  border-radius: 12px;
  padding: 20px 24px;
  margin-left: 52px;
  position: relative;
}
.scenario-card::before {
  content: "";
  position: absolute; left: -38px; top: 22px;
  width: 10px; height: 10px;
  border-radius: 50%; background: var(--blue);
}
.scenario-card time {
  font-size: 13px; font-weight: 800;
  letter-spacing: .1em; color: var(--cyan);
  display: block; margin-bottom: 4px;
}
.pain-tag {
  display: inline-block; margin-top: 8px;
  padding: 3px 10px; border-radius: 100px;
  background: rgba(255,110,126,.18); color: var(--danger);
  font-size: 13px; font-weight: 700;
}
.problem-resolution {
  width: 100%; padding: 16px 24px;
  background: rgba(8,124,255,.1);
  border: 1px solid rgba(8,124,255,.3);
  border-radius: 10px;
  display: flex; align-items: center; gap: 16px;
}
```

---

## Section 3 — Watch Visual Construction

### Identity constraints (non-negotiable)
- Black slim vertical body (portrait, narrow)
- Tall rounded-rect glossy screen (~1:2.2 aspect)
- Perforated black strap (evenly spaced holes)
- Blue reminder UI on screen (var(--blue) / var(--cyan))
- NO pill compartment on any surface — no slot, cavity, or storage reference

### CSS-constructed watch HTML template (all views share this base)

```html
<figure class="watch-view wv-VIEWNAME" aria-label="SMART PILL BAND — LABEL">
  <div class="watch-strap strap-top">
    <div class="strap-holes" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
  <div class="watch-body">
    <div class="watch-screen">
      <div class="screen-ui" aria-label="หน้าจอเตือน">
        <span class="ui-time">08:00</span>
        <span class="ui-label">ถึงเวลาตามแผน</span>
        <button class="ui-btn" type="button" tabindex="-1" aria-hidden="true">รับประทานแล้ว</button>
      </div>
      <div class="screen-gloss" aria-hidden="true"></div>
    </div>
  </div>
  <div class="watch-strap strap-bottom">
    <div class="strap-holes" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
  <figcaption>VIEW LABEL</figcaption>
</figure>
```

Base CSS:
```css
.watch-view { display: flex; flex-direction: column; align-items: center; gap: 0; }
.watch-body {
  width: 72px; height: 140px;
  background: #0c0f14; border-radius: 20px;
  position: relative;
  box-shadow: 0 0 0 1.5px #1e2530, 0 8px 32px rgba(0,0,0,.8);
}
.watch-screen {
  position: absolute; inset: 6px;
  background: #050e1a; border-radius: 14px;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.screen-gloss {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(135deg, rgba(255,255,255,.12) 0%, transparent 55%);
}
.screen-ui {
  display: flex; flex-direction: column;
  align-items: center; gap: 6px; padding: 8px; text-align: center;
}
.ui-time { font-size: 18px; font-weight: 800; color: var(--white); letter-spacing: .05em; }
.ui-label { font-size: 9px; color: var(--cyan); font-weight: 600; }
.ui-btn {
  margin-top: 6px; padding: 4px 8px;
  background: var(--blue); color: var(--white);
  border: none; border-radius: 6px;
  font-size: 8px; font-weight: 700; cursor: default;
}
.watch-strap {
  width: 60px; height: 38px; background: #0a0a0b;
  border-radius: 6px; display: flex; align-items: center; justify-content: center;
}
.strap-holes { display: flex; gap: 6px; }
.strap-holes span {
  display: block; width: 4px; height: 4px;
  border-radius: 50%; background: #1a1b1f;
}
```

### View-specific overrides

View A — Front (cover hero, slide-09 card 1):
No additional transform. Straightforward front-facing.

View B — Angled 3/4 (slide-09 card 2):
```css
.wv-angled .watch-body {
  transform: perspective(600px) rotateY(-22deg) rotateX(6deg);
  box-shadow: 6px 10px 40px rgba(0,0,0,.9), 0 0 0 1.5px #1e2530;
}
```

View C — Side profile (slide-09 card 3):
```css
.wv-side .watch-body {
  width: 18px; height: 120px;
  transform: perspective(400px) rotateY(-72deg);
  background: linear-gradient(to right, #0c0f14 0%, #1e2530 60%, #0c0f14 100%);
  border-radius: 6px;
  box-shadow: 4px 0 20px rgba(0,0,0,.8);
}
.wv-side .watch-screen {
  width: 2px; left: auto; right: 2px;
  background: var(--cyan); border-radius: 1px;
}
.wv-side .screen-ui { display: none; }
.wv-side figcaption::after { content: " · ตัวเรือนบาง"; }
```

View D — Wrist-worn (slide-09 card 4):
```css
.wv-wrist .watch-body { transform: rotate(-8deg); }
.wv-wrist .wrist-arc {
  width: 120px; height: 32px;
  border: 2px solid rgba(200,180,160,.15);
  border-radius: 50%;
  margin: 0 auto;
  transform: translateY(10px);
}
```
Add `<div class="wrist-arc" aria-hidden="true"></div>` before `.watch-body` in the wrist template.

### Cover slide hero

Replace `<figure class="master-hero parallax">` with:
```html
<div class="cover-stage" aria-label="SMART PILL BAND นาฬิกาอัจฉริยะ">
  <div class="cover-ring" aria-hidden="true"></div>
  <figure class="watch-view wv-front cover-watch" aria-label="SMART PILL BAND">
    <!-- watch template contents -->
  </figure>
  <div class="cover-macro" aria-hidden="true">
    <div class="screen-ui screen-ui--large">
      <span class="ui-time">08:00</span>
      <span class="ui-label">ถึงเวลาตามแผน</span>
    </div>
    <div class="screen-gloss"></div>
  </div>
</div>
```

```css
.cover-stage {
  position: absolute; right: 62px; top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: column; align-items: center;
}
.cover-ring {
  position: absolute; width: 280px; height: 280px;
  border-radius: 50%;
  border: 1px solid rgba(8,124,255,.15);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}
.cover-watch { transform: scale(2.2); }
.cover-macro {
  position: absolute; top: 20px; right: -80px;
  width: 100px; height: 60px;
  background: #050e1a; border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,.7);
}
.screen-ui--large .ui-time { font-size: 22px; }
.screen-ui--large .ui-label { font-size: 11px; }
```

Light sweep on cover activate: `.screen-gloss` on `.cover-macro` gets `animation: lightSweep var(--dur-sweep) ease forwards`.
```css
@keyframes lightSweep {
  from { transform: translateX(-100%); }
  to   { transform: translateX(200%); }
}
```

### Close slide visual

Replace `<img src="assets/smart-pill-band-master-reference-v3.webp">` inside `.close-visual` with:
```html
<div class="close-ring" aria-hidden="true"></div>
<figure class="watch-view wv-front close-watch" aria-label="SMART PILL BAND">
  <!-- watch template -->
</figure>
```
```css
.close-watch { transform: scale(1.8); }
.close-ring {
  position: absolute; width: 240px; height: 240px;
  border-radius: 50%;
  border: 1px solid rgba(8,124,255,.15);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%) scale(.75);
  opacity: 0;
  transition: transform 1.2s ease-out, opacity 1.2s ease-out;
}
.slide-close.is-active .close-ring {
  transform: translate(-50%,-50%) scale(1);
  opacity: 1;
}
```

---

## Section 4 — Companion App IA (Slide 10)

### Phone dimensions
Desktop: `width: 200px; height: 360px`. Mobile landscape: `width: 140px; height: 240px`.
All inner text minimum `font-size: 13px`. All text is HTML — never embedded in image.

### State 01 — ตั้งตารางยา
```html
<article class="phone phone-1" data-reveal>
  <header class="phone-header">
    <span class="ph-time">9:41</span>
    <b>ตั้งตาราง</b>
    <i aria-hidden="true">+</i>
  </header>
  <div class="phone-body schedule-ui">
    <p class="field-label">เวลาแจ้งเตือน</p>
    <strong class="time-value">08:00</strong>
    <div class="med-field">
      <span>รายการตามแผน</span>
      <b>ยาตามคำสั่งแพทย์</b>
    </div>
    <div class="day-pills" aria-label="วันของสัปดาห์">
      <i>จ</i><i>อ</i><i>พ</i><i>พฤ</i><i>ศ</i>
    </div>
    <button type="button" data-no-nav>บันทึกตาราง</button>
  </div>
  <footer class="phone-footer"><b>01</b> SCHEDULE SETUP</footer>
</article>
```
Key CSS: `.time-value { font-size: 32px; font-weight: 800; color: var(--blue); }`.

### State 02 — แผนวันนี้
3-item timeline list. Each item: `min-height: 44px; display: flex; align-items: center; gap: 10px`.
Status icons: ✓ green, ● blue pulsing, ○ muted.

### State 03 — ยืนยัน/เลื่อนเวลา
Three stacked buttons: (1) filled blue, (2) outlined blue, (3) ghost text-only.
Alert label `font-size: 16px; font-weight: 700; text-align: center`.

### State 04 — ประวัติ/รายงาน/ความยินยอม
7-bar chart using `<i style="--h:Npx">` elements. `background: var(--blue); border-radius: 3px 3px 0 0`.
Two consent rows: flex `justify-content: space-between`. CSS toggle pill.

### Watch-to-app arc
Add above `.phones`:
```html
<div class="app-stage">
  <figure class="watch-mini wv-front" style="transform:scale(.5)" aria-label="นาฬิกา"><!-- watch template --></figure>
  <svg class="data-arc" viewBox="0 0 300 60" aria-hidden="true">
    <path class="arc-path" d="M 150 10 Q 210 50 260 30"
      fill="none" stroke="var(--blue)" stroke-width="1.5"
      stroke-dasharray="200" stroke-dashoffset="200" opacity="0.5"/>
    <text class="arc-label" x="175" y="28" font-size="9"
      fill="var(--cyan)" opacity="0.7">LOCAL SYNC</text>
  </svg>
</div>
```
`app.js` animates `.arc-path` stroke-dashoffset 200→0 on slide 10 activate, 700ms ease, 200ms delay.

---

## Section 5 — Design Principles Slide (Slide 02) — Full Spec

Rename `slide-team` class → `slide-principles-hero`. Replace all inner content.

```html
<section class="slide slide-principles-hero" data-title="4 หลักการออกแบบ" aria-hidden="true">
  <header class="slide-header light">
    <div>
      <p class="eyebrow" data-reveal>FOUR DESIGN PROMISES</p>
      <h2 data-reveal>4 หลักการที่ตัดสินใจทุกอย่างในระบบ</h2>
    </div>
    <span class="section-number">02</span>
  </header>

  <div class="principles-hero-grid">
    <article class="ph-card ph-1" data-reveal data-reveal-delay="120ms">
      <div class="ph-icon" aria-hidden="true">○</div>
      <span class="ph-num">01</span>
      <h3>จำง่าย</h3>
      <p>วางการเตือนไว้ในจังหวะชีวิตประจำวัน ไม่ใช่แทรกแซง</p>
    </article>
    <article class="ph-card ph-2" data-reveal data-reveal-delay="240ms">
      <div class="ph-icon" aria-hidden="true">✓</div>
      <span class="ph-num">02</span>
      <h3>ตอบง่าย</h3>
      <p>ตัวเลือกชัด อ่านได้ และสะท้อนสถานการณ์จริง</p>
    </article>
    <article class="ph-card ph-3" data-reveal data-reveal-delay="360ms">
      <div class="ph-icon" aria-hidden="true">＋</div>
      <span class="ph-num">03</span>
      <h3>ปลอดภัย</h3>
      <p>ไม่วินิจฉัย ไม่คำนวณยา และไม่ปรับแผนเอง</p>
    </article>
    <article class="ph-card ph-4" data-reveal data-reveal-delay="480ms">
      <div class="ph-icon" aria-hidden="true">◇</div>
      <span class="ph-num">04</span>
      <h3>เคารพความเป็นส่วนตัว</h3>
      <p>เจ้าของข้อมูลควบคุมการเชื่อมต่อและการยินยอม</p>
    </article>
  </div>

  <svg class="principle-connectors" aria-hidden="true" viewBox="0 0 600 320" preserveAspectRatio="none">
    <line class="pc-line" x1="300" y1="40" x2="300" y2="280"/>
    <line class="pc-line" x1="40"  y1="160" x2="560" y2="160"/>
  </svg>
</section>
```

CSS:
```css
.principles-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px; margin-top: 36px; flex: 1;
}
.ph-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px; padding: 32px 28px;
  display: flex; flex-direction: column; gap: 10px;
}
.ph-icon { font-size: 32px; color: var(--cyan); line-height: 1; }
.ph-num { font-size: 12px; font-weight: 800; letter-spacing: .15em; color: var(--muted); }
.ph-card h3 { font-size: 28px; margin: 0; }
.ph-card p  { font-size: 16px; color: var(--silver); line-height: 1.5; margin: 0; }
.principle-connectors {
  position: absolute; inset: 140px 62px 60px;
  pointer-events: none;
}
.pc-line { stroke: rgba(8,124,255,.2); stroke-width: 1; stroke-dasharray: 6 4; }
```

Diagonal card entrance (add to per-card initial state via CSS or JS):
- `.ph-1`: `translate(-20px,-16px)` + `opacity:0`
- `.ph-2`: `translate(20px,-16px)` + `opacity:0`
- `.ph-3`: `translate(-20px,16px)` + `opacity:0`
- `.ph-4`: `translate(20px,16px)` + `opacity:0`

After all cards revealed, animate `.pc-line` stroke-dashoffset via JS (measure `getTotalLength()` first).
After lines complete, pulse each `.ph-icon`: `scale(1)→scale(1.15)→scale(1)`, 400ms, once.

---

## Section 6 — Chapter-Specific Motion Storyboard

Default easing: `cubic-bezier(.2,.8,.2,1)` unless noted. All durations assume reduced-motion: none.

### Cover (Slide 01)

| Element | Start | End | Duration | Delay |
|---------|-------|-----|----------|-------|
| `.eyebrow` | `opacity:0; translateY(14px)` | natural | 600ms | 0 |
| `h1` | `opacity:0; translateY(18px)` | natural | 700ms | 80ms |
| `.cover-subtitle` | `opacity:0; translateY(14px)` | natural | 600ms | 180ms |
| `.tagline` | `opacity:0; translateY(10px)` | natural | 500ms | 280ms |
| `.cover-watch` | `opacity:0; translateY(28px) scale(.92)` | natural | 700ms `cubic-bezier(.2,.6,.2,1)` | 100ms |
| `.cover-macro` | `opacity:0; translateX(20px)` | natural | 600ms | 900ms |
| `.screen-gloss` light sweep | `translateX(-100%)→translateX(200%)` | — | 1200ms ease | 800ms once |
| `.cover-ring` | `opacity:0; scale(.7)→opacity:1; scale(1)` | — | 1400ms ease-out | 0 |
| `.cover-proof` | `opacity:0; translateY(10px)` | natural | 500ms | 500ms |

### Design Principles (Slide 02)

| Element | Start | End | Duration | Delay |
|---------|-------|-----|----------|-------|
| `eyebrow` | `opacity:0; translateY(12px)` | natural | 500ms | 0 |
| `h2` | `opacity:0; translateY(14px)` | natural | 600ms | 60ms |
| `.ph-1` | `opacity:0; translate(-20px,-16px)` | natural | 550ms | 120ms |
| `.ph-2` | `opacity:0; translate(20px,-16px)` | natural | 550ms | 240ms |
| `.ph-3` | `opacity:0; translate(-20px,16px)` | natural | 550ms | 360ms |
| `.ph-4` | `opacity:0; translate(20px,16px)` | natural | 550ms | 480ms |
| `.pc-line` each | `stroke-dashoffset:full→0` | — | 600ms ease | 520ms + 60ms per line |
| `.ph-icon` pulse | `scale(1)→scale(1.15)→scale(1)` | — | 400ms ease-in-out | card visible + 50ms |

### Problem (Slide 05)

| Element | Start | End | Duration | Delay |
|---------|-------|-----|----------|-------|
| `eyebrow + h2` | fade-up | natural | 500–600ms | 0 |
| `.timeline-spine` | `scaleY(0)` origin top | `scaleY(1)` | 600ms ease | 100ms |
| `.sc-1` | `opacity:0; translateX(-24px)` | natural | 500ms | 250ms |
| `.sc-2` | same | natural | 500ms | 400ms |
| `.sc-3` | same | natural | 500ms | 550ms |
| `.pain-tag` each | `opacity:0; scale(.85)` | natural | 350ms | card delay + 250ms |
| `.problem-resolution` | `opacity:0; translateY(12px)` | natural | 500ms | 750ms |

### Product (Slide 09)

| Element | Start | End | Duration | Delay |
|---------|-------|-----|----------|-------|
| `eyebrow + h2` | fade-up | natural | 500–600ms | 0 |
| `.component-card` ×4 | `opacity:0; translateY(22px) scale(.97)` | natural | 550ms | 0/100/200/300ms |
| `.component-card .watch-view` | `clip-path:circle(0%)` | `clip-path:circle(75%)` | 700ms | card delay + 150ms |
| Card labels | `opacity:0` | `opacity:1` | 400ms | card delay + 350ms |

CSS for clip-path reveal:
```css
.component-card .watch-view {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path .7s cubic-bezier(.2,.8,.2,1);
}
.component-card.is-revealed .watch-view {
  clip-path: circle(75% at 50% 50%);
}
```

### App (Slide 10)

| Element | Start | End | Duration | Delay |
|---------|-------|-----|----------|-------|
| `.watch-mini` | `opacity:0; translateY(-12px)` | natural | 500ms | 0 |
| `.arc-path` | dashoffset 200→0 | — | 700ms ease | 200ms |
| `.phone-1` | `opacity:0; translateY(24px) scale(.96)` | natural | 550ms | 100ms |
| `.phone-2` | same | natural | 550ms | 220ms |
| `.phone-3` | same | natural | 550ms | 340ms |
| `.phone-4` | same | natural | 550ms | 460ms |
| `.phone-2` focus pulse | `scale(1)→scale(1.04)→scale(1)` | — | 300ms | 750ms |

### Workflow / Scenario (Slides 11–12)

Slide 11: `.five-flow li` enter `translateX(-16px) opacity:0`→natural, 100ms stagger.
Connector between steps: `scaleX(0)→scaleX(1)`, 300ms, after previous step.

Slide 12: `.scenario-track article` enter `translateX(-20px) opacity:0`→natural, 150ms stagger.
`.scenario-line` between pairs: `scaleY(0)→scaleY(1)`, 400ms, after previous card.

### Closing (Slide 15)

| Element | Start | End | Duration | Delay |
|---------|-------|-----|----------|-------|
| `.close-ring` | `opacity:0; scale(.75)→opacity:1; scale(1)` | — | 1200ms ease-out | 0 |
| `.close-watch` | `opacity:0; translateY(20px)` | natural | 700ms | 200ms |
| `eyebrow` | fade-up | natural | 500ms | 400ms |
| `h2` | fade-up | natural | 600ms | 500ms |
| `.benefits article` ×3 | `opacity:0; translateX(16px)` | natural | 500ms | 600/720/840ms |
| `.final-line` | `opacity:0` | `opacity:1` | 500ms | 980ms |

---

## Section 7 — CSS Tokens, Reduced-Motion, Mobile Landscape

### New `:root` tokens (add after existing `--ease`)
```css
--ease-spring: cubic-bezier(.2,.6,.2,1);
--ease-out: cubic-bezier(0,0,.3,1);
--dur-fast: 350ms;
--dur-standard: 550ms;
--dur-slow: 700ms;
--dur-sweep: 1200ms;
--stagger-sm: 100ms;
--stagger-md: 150ms;
--stagger-lg: 240ms;
```

### Directional reveal utilities
```css
.reveal-fade-left  { opacity:0; transform:translateX(-24px); transition: opacity var(--dur-standard) var(--ease), transform var(--dur-standard) var(--ease); }
.reveal-fade-right { opacity:0; transform:translateX(24px);  transition: opacity var(--dur-standard) var(--ease), transform var(--dur-standard) var(--ease); }
.is-revealed.reveal-fade-left, .is-revealed.reveal-fade-right { opacity:1; transform:none; }
```

### Reduced-motion block
```css
@media (prefers-reduced-motion: reduce) {
  .slide { transform: none !important; transition: opacity .3s ease !important; }
  [data-reveal] { transform: none !important; transition: opacity .25s ease !important; }
  .reveal-fade-left, .reveal-fade-right { transform: none !important; }
  .wv-front,.wv-angled,.wv-side,.wv-wrist,.cover-watch,.close-watch,.watch-mini {
    transform: none !important; transition: opacity .2s ease !important;
  }
  .screen-gloss { display: none; }
  .cover-ring,.close-ring { animation: none !important; transition: none !important; }
  .pc-line { animation: none !important; stroke-dashoffset: 0 !important; }
  .arc-path { stroke-dashoffset: 0 !important; transition: none !important; }
  .timeline-spine { transform: none !important; }
  .ph-card,.scenario-card,.component-card,.five-flow li,.scenario-track article {
    transform: none !important; transition: opacity .2s ease !important;
  }
}
```

### Mobile landscape block
```css
@media (max-height: 500px) and (orientation: landscape) {
  .deck { width: 100vw; height: 100vh; transform: none; left: 0; top: 0; }
  .slide { padding: 20px 28px 18px; }
  .slide-header h2 { font-size: 28px; line-height: 1.1; }
  .eyebrow { font-size: 13px; }
  .principles-hero-grid { grid-template-columns: repeat(4,1fr); grid-template-rows: 1fr; gap: 14px; }
  .ph-card { padding: 16px; }
  .ph-card h3 { font-size: 18px; }
  .ph-card p { font-size: 13px; }
  .phones { gap: 12px; }
  .phone { width: 130px; height: 220px; }
  .phone .phone-body { font-size: 11px; }
  .problem-timeline { flex-direction: row; gap: 12px; }
  .timeline-spine { display: none; }
  .scenario-card { margin-left: 0; }
  .five-flow { gap: 12px; }
  .cover-watch { transform: scale(1.4); }
  .cover-stage { right: 28px; }
  .scenario-track { flex-direction: row; gap: 12px; }
  .scenario-track .scenario-line { display: none; }
  .component-grid { grid-template-columns: repeat(4,1fr); }
  .close-visual { max-width: 160px; }
}
```

---

## Section 8 — File-by-File Implementation Map for Codex

### `index.html`

| Location | Action | Detail |
|----------|--------|--------|
| `<section class="slide slide-team">` | Replace section | New `slide-principles-hero` per §5. `data-title="4 หลักการออกแบบ"`. |
| `<section class="slide slide-principles">` (slide 07) | Replace content | Rename → `slide-objectives`. `.objectives-grid` two-column per §1 slide 07 spec. Update `data-title`. |
| `<figure class="master-hero parallax">` | Replace | Remove `<img>` master ref. Insert `.cover-stage` per §3. |
| `.problem-orbit` | Replace | Remove orbit. Insert `.problem-timeline` per §2. |
| `<section class="slide slide-components">` | Replace inner | Remove 4× cropped image cards. Insert 4 `.component-card` with `.wv-front/.wv-angled/.wv-side/.wv-wrist`. Remove compartment card. Update h3: หน้าจอเตือน · มุม 3/4 · ด้านข้าง · ใส่ข้อมือ. |
| `.system-product-crop img` (slide 08) | Replace | Remove `<img>`. Insert `.wv-front` at `style="transform:scale(.55)"`. |
| `<section class="slide slide-apps">` | Upgrade | Add `.app-stage` wrapper with `.watch-mini` + `.data-arc`. Increase phone dimensions. Update body per §4. |
| `.close-visual` (slide 15) | Replace | Remove `<img>` master ref. Insert `.close-ring` + `.close-watch` per §3. |
| All `alt=` attributes | Audit | Remove "ช่องเก็บยา" / "pill compartment" / "ช่องเก็บยาด้านหลัง" from every alt. |
| `<nav class="presenter-ui">` | No change | Do not touch. |
| `<noscript>`, `<script src="app.js">` | No change | Do not touch. |

### `styles.css`

| Target | Action |
|--------|--------|
| `:root` | Add v4 tokens (§7). |
| `.reveal-fade-left/right` | Add (§7). |
| `.slide-team` selectors | Rename → `.slide-principles-hero`. |
| `.slide-principles` selectors | Rename → `.slide-objectives`. |
| `.team-layout,.roster,.member-card,.team-mark,.team-intro` | Remove — unused. |
| `.principle-grid` | Rename → `.objectives-grid`. Add new `.principles-hero-grid` (2×2). |
| `.problem-orbit,.problem-core,.problem-item` | Remove. |
| `.problem-timeline,.timeline-spine,.scenario-card,.pain-tag,.problem-resolution` | Add per §2. |
| `.watch-view,.watch-body,.watch-screen,.screen-ui,.screen-gloss,.ui-time,.ui-label,.ui-btn,.watch-strap,.strap-holes` | Add per §3. |
| `.wv-front,.wv-angled,.wv-side,.wv-wrist,.wv-macro` | Add view transforms per §3. |
| `.cover-stage,.cover-ring,.cover-watch,.cover-macro,.screen-ui--large` | Add per §3 cover. |
| `.close-ring,.close-watch` | Add per §3 close. |
| `.watch-mini,.app-stage` | Add per §4. |
| `.data-arc,.arc-path,.arc-label` | Add per §4. |
| `.ph-card,.ph-icon,.ph-num,.principles-hero-grid` | Add per §5. |
| `.principle-connectors,.pc-line` | Add per §5. |
| `.objectives-grid,.does-col,.does-not-col,.objectives-tagline` | Add per slide 07 spec. |
| `.component-card .watch-view` clip-path | Add per §6 product chapter. |
| `@media (prefers-reduced-motion:reduce)` | Add/expand per §7. |
| `@media (max-height:500px) and (orientation:landscape)` | Add/expand per §7. |
| `.phone` | Update to `width:200px; height:360px`. Ensure inner text ≥13px. |

### `app.js`

| Target | Action |
|--------|--------|
| `[data-reveal]` / `.is-revealed` loop | No change. |
| `data-reveal-delay` support | Add: after reveal logic, read `el.dataset.revealDelay` → set `el.style.transitionDelay`. |
| Slide 02 activate | Add: animate `.pc-line` stroke-dashoffset via JS after cards are revealed. |
| Slide 10 activate | Add: animate `.arc-path` stroke-dashoffset 200→0, 700ms ease, 200ms delay. |
| `.ph-icon` pulse | Add: add/remove `.pulse` CSS class on slide 02 icon elements. |
| Reduced-motion guard | Add: `const rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;` — gate all stagger timeouts in `if (!rm)`. If rm active, reveal all elements immediately. |
| `data-flow-next` / `data-scenario-replay` / `.count-up` | No change. |

---

## Section 9 — Acceptance Checklist and Anti-Patterns

### Acceptance checklist

- [ ] **AC-01** Slide 2 shows 4 principles (จำง่าย · ตอบง่าย · ปลอดภัย · เคารพความเป็นส่วนตัว). No team placeholder slots.
- [ ] **AC-02** Slide 5 shows scenario cards + timeline. No `.problem-orbit`, no central `?`, no `.problem-item`.
- [ ] **AC-03** Slide 9 shows 4 CSS-constructed watch views. Zero same-source raster crops pretending to be different angles.
- [ ] **AC-04** No pill-compartment card in slide 9. No alt text mentions "ช่องเก็บยา" or "pill compartment".
- [ ] **AC-05** Cover hero is CSS-constructed. `master-reference-v3.webp` not used as a full-frame background.
- [ ] **AC-06** Slide 15 close visual uses CSS watch + `.close-ring`. No `<img>` master in `.close-visual`.
- [ ] **AC-07** App phones readable at 375px viewport landscape.
- [ ] **AC-08** All watch face text, app screen text, timeline text, and principle card text are editable HTML — not in any image.
- [ ] **AC-09** Each chapter has a distinct animation character (see §6).
- [ ] **AC-10** `prefers-reduced-motion` removes all transforms; only opacity transitions remain.
- [ ] **AC-11** Mobile landscape shows all content without overflow or crop.
- [ ] **AC-12** No external JS, CDN, or audio. Fully offline.
- [ ] **AC-13** Slide count is exactly 15.
- [ ] **AC-14** `<nav class="presenter-ui">` unchanged and functional.
- [ ] **AC-15** Slide 7 shows does/does-not two-column. Old principle-grid not present in slot 7.

### Anti-patterns

| Anti-pattern | Why prohibited |
|--------------|---------------|
| Crop `master-reference-v3.webp` 4× and call them "multiple angles" | Boss rejected explicitly (feedback point 6). |
| Full-slide `background-image` of an AI PNG | Boss rejected (feedback point 1). |
| Leave `.member-card`/`.roster`/team slot HTML | Team slide removed by Commander command. |
| Add or remove slides from the 15-count | Requires Boss approval. |
| Deploy to `gh-pages` | Not authorized until Boss approves PR. |
| Merge Draft PR | Not authorized. |
| Open a second or replacement Draft PR | One shared PR only. |
| Add raster watch images to `assets/` | All watch visuals are CSS-only. |
| Embed text in `background-image` on phones/watches | Text must be editable HTML (§10). |
| Apply same `fade-up` to every element on every slide | Each chapter must have distinct motion character. |
| Modify `<nav class="presenter-ui">` | Out of scope. |

---

## Section 10 — Editable HTML Text (must not be in any image)

### Watch screen (all views)
- `<span class="ui-time">08:00</span>`
- `<span class="ui-label">ถึงเวลาตามแผน</span>`
- `<button class="ui-btn" ...>รับประทานแล้ว</button>`

### App phone screens (all 4 states)
State headers, time values, action buttons, timeline item text, consent labels, report labels, chart label "เหตุการณ์ 7 วัน" — all HTML text.
Bar chart bars: `<i style="--h:55%"></i>` — not images.

### Principle cards (slide 02)
Numbers 01–04, titles (จำง่าย / ตอบง่าย / ปลอดภัย / เคารพความเป็นส่วนตัว), descriptions — `<span>`, `<h3>`, `<p>`.

### Problem scenario cards (slide 05)
Time labels (`<time>`), scenario titles (`<h3>`), descriptions (`<p>`), pain tags (`<span class="pain-tag">`), resolution strip text.

### Watch component labels (slide 09)
View angle labels: `<figcaption>` or `<p class="view-label">`.
Feature labels: `<h3>` and `<p>` inside `.component-card`.

### Data arc label (slide 10)
"LOCAL SYNC" — SVG `<text>` element, not image text.

### Objectives slide (slide 07)
Does/does-not list items: `<li>` or `<p>`. Bottom tagline: `<p class="objectives-tagline">`.

---

## Known Limitations

1. **PNG assets not on-device.** `SMART_PILL_BAND_V4_COMMANDER_HANDOFF(2).zip` not found under `~/storage/downloads/` or related paths on 2026-07-20. The four concept PNGs are not committed. This blueprint uses durable descriptions from `COMMANDER_HANDOFF_TH.md` as the sole source. Codex must not claim PNG-based implementation.

2. **CSS watch silhouettes are schematic.** The watch construction in §3 produces a recognizable, on-brand silhouette suitable for a classroom presentation — not a rendered 3D product image. Boss should assess whether schematic quality is acceptable in live preview.

3. **Slide 07 repurpose is a design judgment.** Principles moved to slide 2; slot 7 becomes objectives/safety boundary. If Commander wants a different treatment (e.g., 14 slides or a deeper principle expansion in slot 7), Codex should flag before implementing.

4. **`app.js` stagger is additive.** The `data-reveal-delay` approach is backward-compatible with the existing reveal loop. If the existing loop conflicts, Codex adapts without removing existing reveal behavior.

5. **No live preview in this design phase.** Motion and visual quality must be confirmed from the Boss review of the live `gh-pages` preview after Codex implements and Boss approves the Draft PR.

---

## Blueprint Sign-off

| Item | Status |
|------|--------|
| Design phase | COMPLETE |
| Implementation phase | NOT STARTED — released to Codex |
| PNG assets on-device | NOT FOUND — descriptions used as durable source |
| Pill compartment removed from spec | YES — all locations in §8 |
| Master image as full-slide background | REMOVED — cover, system, components, close |
| Team placeholder slide | REMOVED — slide 2 = 4 design principles |
| Problem orbit/question-mark | REMOVED — scenario cards + timeline |
| Slide 07 principles duplication | RESOLVED — objectives/boundary in slot 7 |
| Runtime preview | NOT PERFORMED |
| Merge / deploy | NOT AUTHORIZED |
| Slide count | CONFIRMED 15 |
