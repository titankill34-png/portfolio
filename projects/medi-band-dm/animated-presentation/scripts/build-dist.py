#!/usr/bin/env python3
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parent.parent
ARCHIVE = ROOT / "dist" / "SMART_PILL_BAND_PRESENTATION_V3.zip"
FILES = [
    "index.html",
    "styles.css",
    "app.js",
    "README.md",
    "PRESENTER_NOTES_TH.md",
    "SOURCES.md",
    "serve.sh",
    "assets/smart-pill-band-master-reference-v3.webp",
    "preview/contact-sheet.webp",
    *[f"preview/slide-{number:02d}.webp" for number in range(1, 16)],
    "scripts/build-dist.py",
    "scripts/render-previews.sh",
    "scripts/validate-deck.mjs",
    "scripts/run-browser-check.sh",
    "scripts/browser-check.html",
    "scripts/contact-sheet.html",
]

missing = [relative for relative in FILES if not (ROOT / relative).is_file()]
if missing:
    raise SystemExit(f"Missing distribution files: {', '.join(missing)}")

ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(ARCHIVE, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for relative in FILES:
        archive.write(ROOT / relative, arcname=relative)

print(ARCHIVE)
