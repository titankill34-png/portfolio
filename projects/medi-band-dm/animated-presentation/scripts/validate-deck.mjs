import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('index.html');
const css = read('styles.css');
const js = read('app.js');
const notes = read('PRESENTER_NOTES_TH.md');
const sources = read('SOURCES.md');
const failures = [];
const checks = [];

function check(label, condition, detail = '') {
  if (condition) checks.push(label);
  else failures.push(`${label}${detail ? ` — ${detail}` : ''}`);
}

const slideCount = (html.match(/<section class="slide\b/g) || []).length;
const masterUses = (html.match(/assets\/smart-pill-band-master-reference-v3\.webp/g) || []).length;
const runtime = `${html}\n${css}\n${js}`;

check('exactly 15 slides', slideCount === 15, `found ${slideCount}`);
check('approved master used across multiple slides', masterUses >= 7, `found ${masterUses} direct uses`);
check('old product assets not referenced', !/smart-pill-band-(fallback|reference)\.(png|webp)/i.test(runtime));
check('no audio API, element, autoplay, or sound control', !/<audio\b|<video\b|AudioContext|webkitAudioContext|new\s+Audio\s*\(|\bautoplay\s*=|\bmuted\s*=|sound[-_ ]?control/i.test(runtime));
check('no external runtime URL', !/(?:src|href)=["']https?:\/\//i.test(html) && !/@import\s+url\(|url\(["']?https?:\/\//i.test(css));
check('only local stylesheet and script', /href="styles\.css"/.test(html) && /src="app\.js"/.test(html));
check('verified global IDF wording', /589/.test(html) && /1 ใน 9/.test(html) && /20–79/.test(html));
check('verified Thailand IDF wording', /6\.36/.test(html) && /33\.3/.test(html) && /ค่าประมาณปี 2024/.test(html) && /พ\.ศ\. 2568/.test(html));
check('target user is inclusive', /ไม่จำกัดเฉพาะผู้สูงอายุ/.test(html) && /ผู้เป็นเบาหวานที่รับประทานยา/.test(html));
check('three user responses present', ['รับประทานแล้ว','เลื่อนเวลา','ยังไม่ได้รับประทาน'].every(text => html.includes(text)));
check('confirmation limitation present', /ไม่ใช่หลักฐานว่าได้กลืนยาแล้ว/.test(html));
check('safety boundaries present', ['ไม่วินิจฉัยโรค','ไม่คำนวณขนาดอินซูลิน','ไม่ปรับยาอัตโนมัติ','แพทย์หรือเภสัชกร'].every(text => html.includes(text)));
check('unsupported outcome claims are negated', /ยังไม่กล่าวอ้างว่า HbA1c ดีขึ้น/.test(html) && /(?:>|&gt;)90%/.test(html));
check('team placeholders and limitation documented', /\[ชื่อ–นามสกุล\]/.test(html) && /ไม่ระบุชื่อหรือบทบาทสมาชิก/.test(html) && /No verified member names/.test(sources));
check('keyboard navigation implemented', ['ArrowRight','PageDown','PageUp','Home','End'].every(key => js.includes(key)));
check('fullscreen and hidden controls implemented', /requestFullscreen/.test(js) && /togglePresenterUI/.test(js));
check('touch swipe implemented', /touchstart/.test(js) && /touchend/.test(js));
check('interactive controls protected from slide navigation', /data-no-nav/.test(html) && /isInteractiveTarget/.test(js));
check('reduced motion implemented', /prefers-reduced-motion/.test(css) && /prefers-reduced-motion/.test(js));
check('15 presenter-note sections', (notes.match(/^## สไลด์ \d+/gm) || []).length === 15);
check('1366×768 base canvas', /width: 1366px; height: 768px/.test(css));

const linearChannel = value => {
  const channel = value / 255;
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
};
const luminance = hex => {
  const channels = [1, 3, 5].map(offset => linearChannel(Number.parseInt(hex.slice(offset, offset + 2), 16)));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
[
  ['dark primary text', '#f7fbff', '#07101c', 4.5],
  ['dark secondary text', '#8fa2b8', '#0f1c2b', 4.5],
  ['light primary text', '#06101e', '#eef5fb', 4.5],
  ['light secondary text', '#60758a', '#f7fbff', 4.5],
  ['cyan accent on graphite', '#55d8ff', '#0a111d', 4.5],
  ['large blue accent on white', '#087cff', '#f7fbff', 3]
].forEach(([label, foreground, background, minimum]) => {
  const ratio = contrast(foreground, background);
  check(`contrast: ${label} ${ratio.toFixed(2)}:1`, ratio >= minimum);
});

const requiredFiles = [
  'index.html','styles.css','app.js','README.md','PRESENTER_NOTES_TH.md','SOURCES.md','serve.sh',
  'assets/smart-pill-band-master-reference-v3.webp','preview/contact-sheet.webp',
  ...Array.from({ length: 15 }, (_, index) => `preview/slide-${String(index + 1).padStart(2, '0')}.webp`),
  'dist/SMART_PILL_BAND_PRESENTATION_V3.zip'
];
requiredFiles.forEach(file => check(`required file: ${file}`, fs.existsSync(path.join(root, file))));

const forbiddenAudioExtensions = /\.(?:mp3|wav|m4a|aac|ogg|oga|opus|flac|mid|midi)$/i;
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(target) : [target];
});
const projectFiles = walk(root);
check('no audio files in project', !projectFiles.some(file => forbiddenAudioExtensions.test(file)));
check('old fallback product files removed', !['assets/smart-pill-band-fallback.png','assets/smart-pill-band-reference.webp']
  .some(file => fs.existsSync(path.join(root, file))));

console.log(`PASS ${checks.length} checks`);
checks.forEach(label => console.log(`  ✓ ${label}`));
if (failures.length) {
  console.error(`FAIL ${failures.length} checks`);
  failures.forEach(label => console.error(`  ✗ ${label}`));
  process.exit(1);
}
