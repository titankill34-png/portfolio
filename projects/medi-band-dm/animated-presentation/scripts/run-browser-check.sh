#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

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

OUTPUT=$(
  "$BROWSER" --headless --no-sandbox --disable-gpu --allow-file-access-from-files \
    --force-prefers-reduced-motion --virtual-time-budget=2500 --dump-dom \
    "file://$SCRIPT_DIR/browser-check.html" 2>/dev/null
)

RESULT=$(printf '%s\n' "$OUTPUT" | sed -n 's#.*<body>\(.*\)</body>.*#\1#p' | sed 's/&quot;/"/g')
printf '%s\n' "$RESULT"

printf '%s\n' "$RESULT" | grep -q '"slideCount":15'
printf '%s\n' "$RESULT" | grep -q '"masterDecoded":true'
printf '%s\n' "$RESULT" | grep -q '"externalResources":\[\]'
printf '%s\n' "$RESULT" | grep -q '"primaryTextMinimumPx":28'
printf '%s\n' "$RESULT" | grep -q '"arrowRight":true'
printf '%s\n' "$RESULT" | grep -q '"pageDown":true'
printf '%s\n' "$RESULT" | grep -q '"pageUp":true'
printf '%s\n' "$RESULT" | grep -q '"space":true'
printf '%s\n' "$RESULT" | grep -q '"end":true'
printf '%s\n' "$RESULT" | grep -q '"home":true'
printf '%s\n' "$RESULT" | grep -q '"clickNext":true'
printf '%s\n' "$RESULT" | grep -q '"clickPrevious":true'
printf '%s\n' "$RESULT" | grep -q '"touchSwipeNext":true'
printf '%s\n' "$RESULT" | grep -q '"touchSwipePrevious":true'
printf '%s\n' "$RESULT" | grep -q '"hideControls":true'
printf '%s\n' "$RESULT" | grep -q '"fullscreenRequested":true'
printf '%s\n' "$RESULT" | grep -q '"appControlNoAdvance":true'
printf '%s\n' "$RESULT" | grep -q '"reducedMotion":true'
printf '%s\n' "$RESULT" | grep -q '"viewportLayouts":true'
