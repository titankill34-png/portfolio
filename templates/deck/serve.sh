#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PORT=${PORT:-8080}

cd "$SCRIPT_DIR"
printf 'SMART PILL BAND v3 · 15-slide silent deck: http://127.0.0.1:%s\n' "$PORT"

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT" --bind 127.0.0.1
fi

if command -v busybox >/dev/null 2>&1; then
  exec busybox httpd -f -p "127.0.0.1:$PORT"
fi

printf 'Error: python3 or busybox is required to run the local server.\n' >&2
exit 1
