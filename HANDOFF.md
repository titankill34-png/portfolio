# HANDOFF.md — สำหรับแชท Claude ใหม่

> วางไฟล์นี้ในแชทใหม่แล้วทำงานต่อได้ทันที อัปเดตล่าสุด 2026-07-30 ~10:35 +07
> ภาษาไทยกับ boss เสมอ ตอบสั้น

## 1. ระบบคืออะไร

AI workforce รันจากมือถือ Android เครื่องเดียว ไม่มีคอมพิวเตอร์
- **Boss**: Sittichok kakandee — ตัดสินใจ, merge, ให้ค่าจริง
- **Worker**: Claude Code 2.1.112 ใน Termux ผ่าน `taskwatch-v7` — เขียนโค้ด เปิด PR
- **Advisor (บทบาทของแชทนี้)**: วางแผน เขียน issue ตรวจงาน — เช็คสถานะเองได้ผ่าน Vercel tool
- **Commander (GPT)**: เตรียมระบบไว้แล้ว ยังไม่ได้เริ่มใช้ — prompt อยู่ใน repo `GPT_PROMPT_TH.md`

Flow: boss/advisor เปิด issue ติด label `task` → watcher หยิบ (เลขสูงก่อน) → Claude Code ทำ → เปิด PR → boss merge (หรือ automerge)

## 2. วิธีเช็คสถานะเอง — สำคัญที่สุด

แชทนี้มี **Vercel connector** เรียก tool `Vercel:web_fetch_vercel_url` ด้วย URL:
```
https://aicc-console-cyan.vercel.app/api/state?repo=portfolio
```
คืน JSON: openIssues, openPRs, closedRecent, recentCommits, phase จาก STATUS.md
**ไม่ต้องให้ boss แคปหน้าจอหรือวาง URL** — เช็คเองก่อนตอบทุกครั้งที่คุยเรื่องสถานะ
repo อื่น: `?repo=smokeclock` `?repo=nicora`

Team Vercel: `TiTankill34` (team_Aw5WA18dZQ65BV7dSmoLTyRG), project `aicc-console`

## 3. บัญชีและกฎเหล็ก

- GitHub: `titankill34-png` **บัญชีเดียว ห้ามหมุน** (บัญชีเก่า kakandee โดนระงับเพราะหมุน)
- ห้ามอัป Claude Code เกิน 2.1.112 — เวอร์ชันใหม่ไม่มี binary `linux-arm64-android`
- Boss merge เอง (ยกเว้น automerge) / worker ห้าม merge ตัวเอง
- one writer per issue / ห้ามเดาค่าจริง (URL ชื่อ อีเมล) ให้ถาม
- credentials ห้ามเข้า GitHub, issue, แชท
- token GitHub เคยหลุดในแชทหลายครั้ง boss รับทราบแล้วเลือกไม่ rotate — เตือนได้แต่อย่าจี้ซ้ำ
- ภาษาไทยกับ boss / ประหยัด token เป็น constraint ถาวร

## 4. Repos

| repo | สถานะ |
|---|---|
| `portfolio` | ACTIVE — งานทั้งหมดอยู่นี่ |
| `aicc-console` | TOOLING — Next.js บน Vercel (console + /api/state + /api/gh) |
| `Smoke-clock` | PARKED — iOS app, PR #11 #12 #14 conflict ค้างไว้ตั้งใจ |
| `Nicora` | PARKED |
| `Ai` | DEAD |

เว็บ: https://titankill34-png.github.io/portfolio/ (GitHub Pages, static, ไม่มี build)

## 5. สถานะ portfolio ณ ตอน handoff

**คิวว่าง PR ว่าง ทุกอย่าง merge แล้ว** — งานที่จบ: T1 T2 T5 T7 T8 T9 T10 T11

- ดีไซน์ปัจจุบัน: **cyberpunk gaming** (T11, commit `c4499eb`) — พื้น #0A0A0B, เขียวมะนาว #C6F432, น้ำเงิน #2B5CFF, การ์ด 3 สี, terminal จำลองพิมพ์วนลูป, ตัวเลข 52 นับขึ้น, IntersectionObserver
- deck starter อยู่ `templates/deck/` + `new-deck.sh` (T5)
- deck ตัวสอง `projects/portfolio-intro/` 5 สไลด์ (T9) — การ์ดใบ 3 ในหน้าแรกลิงก์ไป
- deck หลัก `projects/medi-band-dm/animated-presentation/` — สไลด์ทีมใช้ชื่อ boss 3 ช่องแบ่งบทบาท (T8)
- QR: `assets/qr-instagram.png` (ครอปแล้ว T10), `assets/qr-line.jpg`
- ติดต่อ: IG `taxx.exe_`, LINE `https://line.me/ti/p/_257NKsXpE`, GitHub — ห้ามใส่อีเมล

**รอ boss ตรวจด้วยตา**: หน้าเว็บใหม่ 5 จุด (โทนสี, terminal พิมพ์, scroll reveal + นับเลข, ลิงก์การ์ด 3 ใบ, ไม่ล้นจอ 360px) — ยังไม่ได้คำตอบตอน handoff

## 6. งานที่เสนอไว้ ยังไม่ได้ทำ

1. **T12** — แต่ง `case-taskwatch.html` + deck `portfolio-intro` ให้เข้าธีม cyberpunk (ตอนนี้หน้าในยังธีมเก่า ไม่เข้าชุด)
2. **รูป hero** — boss จะ generate รูปไซบอร์ก/หุ่นถือมือถือเอง ส่งเข้า `assets/hero.png` แล้วออก issue สลับแทน terminal จำลอง
3. **Live view** — worker ส่ง log ไป Gist ทุก 15 วิ + แท็บ Live ใน console (boss อยากเห็นการทำงานสดแบบ terminal) — ออกแบบไว้แล้วยังไม่เขียน
4. **automerge guard `index.html`** — เสนอให้กันหน้าเว็บหลักไม่ให้ automerge เอง boss ยังไม่ตอบ
5. **watchdog แจ้งเตือน watcher ตาย** — คุยไว้ ยังไม่ทำ
6. **Codex worker** — v6 มี routing `worker:codex` แล้ว แต่ Codex ยังไม่ผ่าน smoke test (T0 ใน WORK_QUEUE.md) boss จะบอกเองเมื่อพร้อม

## 7. Termux — ไฟล์สำคัญ

```
~/bin/taskwatch-v7      watcher (retry cap 3, quota backoff 30→60→120m, gate detect)
~/bin/aicc              CLI: as/aq/ap/aw/al/an/am ผ่าน alias ใน .bashrc
~/bin/automerge         merge อัตโนมัติ ยกเว้นไฟล์ guard (md ระบบ, .github, credentials)
~/.config/aicc/repos.conf   name|path|slug|token_file|model|worker
~/.config/aicc/tok-titankill  PAT (สิทธิ์: portfolio, aicc-console, Smoke-clock, Nicora)
~/.config/aicc/retry/   ตัวนับ retry ต่อ issue
~/.termux/boot/start-watchers  autostart: portfolio + automerge
```
tmux sessions ที่ควรรันอยู่: `portfolio`, `automerge`

**บั๊กที่เพิ่งแก้** (สำคัญ ถ้า boss บอกว่างานวนซ้ำให้เช็คอันนี้ก่อน): `gh --jq --arg` ใช้ไม่ได้ (gh ไม่รองรับ --arg) ทำให้ `pr_for()` คืนค่าว่าง → ระบบมองไม่เห็น PR ตัวเอง → retry ไม่จบ แก้ด้วย string interpolation ตรงๆ แล้วใน v7 บนเครื่อง — **ถ้าแจกไฟล์ taskwatch ใหม่ ห้ามใช้ `--jq --arg` เด็ดขาด**

## 8. Label

`task` รอหยิบ · `task-running` กำลังทำ · `needs-review` PR รอ merge · `blocked` ต้องคนแก้ (ปลดโดยเปลี่ยนเป็น task + ลบไฟล์ retry) · `parked` พักตั้งใจ · `hard` opus · `deep` fable · `worker:claude|codex` (v6+)

โมเดล default: sonnet-5 (`ANTHROPIC_MODEL=claude-sonnet-5` ใน .bashrc)

## 9. กติกาเขียน issue (ประหยัด token)

- ระบุ path ไฟล์เป๊ะ ห้าม "ปรับ UI ให้สวย" — worker จะไล่อ่านทั้ง repo
- ขนาด 15-25 นาที/ใบ ใบใหญ่ดีกว่าใบจิ๋วหลายใบ (context โหลดใหม่ทุก session)
- ระบุไฟล์ที่ห้ามแตะเสมอ + เงื่อนไขว่าเสร็จ + "ยืนยันด้วย git diff --stat ใน PR body"
- `CLAUDE.md` ใน repo บอก worker ข้ามไฟล์ binary — มีอยู่แล้ว
- design issue: ให้ hex, ขนาดฟอนต์ clamp(), spacing เป็นตัวเลข — worker ทำตามได้ไม่ต้องเดา
- เว็บนี้: CSS/JS inline ในไฟล์เดียว ห้าม library ห้าม CDN ห้ามฟอนต์นอก ลิงก์ relative เท่านั้น

## 10. เอกสารใน repo portfolio (root)

`SYSTEM.md` คู่มือเต็ม · `STATE.md` + `WORK_QUEUE.md` (เขียนตอน T9 ยัง blocked — **ล้าสมัยแล้ว ควรอัปเดต**) · `COMMANDER.md` กติกา Commander · `GPT_PROMPT_TH.md` prompt ตั้ง GPT · `STATUS.md` watcher เขียนเอง ห้ามแก้ · `REPORT.md` ผลสำรวจ T2 · `CLAUDE.md` กติกา worker

## 11. ประวัติที่ควรรู้ (กันทำพลาดซ้ำ)

- deck ทีมสไลด์: ใช้ชื่อ boss 3 ช่องแบ่งบทบาท — **boss เคยขอชื่อปลอม แชทนี้ปฏิเสธ** และเสนอทางนี้แทน boss รับ
- case-taskwatch **ห้ามเขียนว่าระบบ AI สร้าง deck medi-band** — ไม่จริง มันสร้าง Smoke-clock ซึ่งพักอยู่ ผลลัพธ์คือตัวระบบเอง
- ตัวเลขจริงที่ใช้ได้: **52 วินาที** จาก issue ถึง PR — ห้ามแต่งตัวเลขอื่น
- Fable 5 ใช้ได้แต่แพง — default sonnet, `hard`→opus, `deep`→fable
- v5b เคยมีบั๊ก "exit 0 ไม่มี PR = retry ไม่จบ" เผา 14 รอบใน T9 — v7 แก้แล้ว (cap 3 + gate detection)
- boss ชอบ: ก้อนคำสั่งเดียวใหญ่ๆ วางแล้วจบ / รันงานยาวไม่ต้องเฝ้า / เห็นภาพก่อนตัดสินใจ
- boss มี API key $18 สำรอง ยังไม่ได้ใช้

## 12. เริ่มงานในแชทใหม่

1. เรียก `/api/state?repo=portfolio` ดูสถานะจริงก่อน
2. ถาม boss: ตรวจเว็บ cyberpunk 5 จุดหรือยัง ผลเป็นไง
3. งานถัดไปตามคิว: T12 (ธีมหน้าใน) → รูป hero → Live view
4. ทุกครั้งที่ส่งไฟล์ script: boss ดาวน์โหลดเข้า ~/storage/downloads แล้ว cp เข้า ~/bin

---

## 13. หน้าที่บังคับ: อัปเดตไฟล์นี้ตลอด

**ไฟล์นี้ล้าสมัยเมื่อไหร่ = แชทถัดไปทำงานพลาด** เหมือนที่ `STATE.md` กับ
`WORK_QUEUE.md` ล้าสมัยไปแล้วในข้อ 10

อัปเดตทันทีเมื่อเกิดข้อใดข้อหนึ่ง ไม่ต้องรอ boss สั่ง

| เกิดอะไร | แก้ข้อไหน |
|---|---|
| issue merge หรือ blocked | 5 สถานะ, 6 งานค้าง |
| boss ตัดสินใจอะไร | 5 หรือ 11 ประวัติ |
| boss ปฏิเสธข้อเสนอ | 11 กันคุยซ้ำ |
| เจอบั๊กหรือแก้บั๊ก | 7 บั๊กที่เพิ่งแก้ |
| เพิ่ม/ลบ script หรือ repo | 4 หรือ 7 |
| ค่าจริงใหม่ (URL ชื่อ path) | 5 |
| เปลี่ยนดีไซน์ | 5 |

**วิธีอัปเดต** — เมื่อ boss บอกว่าใกล้เต็มลิมิต หรือหลังงานใหญ่จบ:
สร้างไฟล์ `HANDOFF.md` ฉบับใหม่ทั้งไฟล์ ส่งให้ boss ดาวน์โหลด แล้วให้ push ด้วย
```bash
export GH_TOKEN="$(cat ~/.config/aicc/tok-titankill)"
F=~/storage/downloads/HANDOFF.md
SHA=$(gh api repos/titankill34-png/portfolio/contents/HANDOFF.md --jq .sha 2>/dev/null)
gh api --method PUT repos/titankill34-png/portfolio/contents/HANDOFF.md \
  -f message="handoff: update" -f content="$(base64 -w0 < $F)" \
  ${SHA:+-f sha="$SHA"} -f branch=main --jq .commit.sha
```

**ห้าม** ปล่อยให้ boss เป็นคนนึกได้เองว่าต้องอัปเดต — เป็นหน้าที่ของ advisor
**ห้าม** เขียนข้อมูลที่ยังไม่ยืนยัน ถ้าไม่แน่ใจให้เขียนว่า "ยังไม่ยืนยัน"
**ห้าม** ใส่ token หรือ credential ลงในไฟล์นี้
