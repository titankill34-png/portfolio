#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DECK_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
PREVIEW_DIR="$DECK_DIR/preview"
TEMP_DIR=$(mktemp -d)

cleanup() {
  rm -rf -- "$TEMP_DIR"
}
trap cleanup EXIT HUP INT TERM

if command -v chromium >/dev/null 2>&1; then
  BROWSER=chromium
elif command -v chromium-browser >/dev/null 2>&1; then
  BROWSER=chromium-browser
elif command -v google-chrome >/dev/null 2>&1; then
  BROWSER=google-chrome
else
  printf 'Error: Chromium-compatible browser is required.\n' >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  printf 'Error: cwebp is required.\n' >&2
  exit 1
fi

mkdir -p "$PREVIEW_DIR"

slide=1
while [ "$slide" -le 15 ]; do
  number=$(printf '%02d' "$slide")
  "$BROWSER" \
    --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --run-all-compositor-stages-before-draw --virtual-time-budget=4200 \
    --window-size=1366,768 \
    --screenshot="$TEMP_DIR/slide-$number.png" \
    "file://$DECK_DIR/index.html?preview=1#slide-$slide" >/dev/null 2>&1
  cwebp -quiet -q 88 "$TEMP_DIR/slide-$number.png" -o "$PREVIEW_DIR/slide-$number.webp"
  printf 'Rendered slide %s/15\n' "$number"
  slide=$((slide + 1))
done

"$BROWSER" \
  --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --run-all-compositor-stages-before-draw --virtual-time-budget=2500 \
  --window-size=1920,1080 \
  --screenshot="$TEMP_DIR/contact-sheet.png" \
  "file://$SCRIPT_DIR/contact-sheet.html" >/dev/null 2>&1
cwebp -quiet -q 88 "$TEMP_DIR/contact-sheet.png" -o "$PREVIEW_DIR/contact-sheet.webp"
printf 'Rendered contact sheet\n'
