#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
NAME=${1:-}

if [ -z "$NAME" ]; then
  printf 'Usage: %s <deck-name>\n' "$0" >&2
  exit 1
fi

SRC="$SCRIPT_DIR/templates/deck"
DEST="$SCRIPT_DIR/projects/$NAME"

if [ ! -d "$SRC" ]; then
  printf 'Error: template not found at %s\n' "$SRC" >&2
  exit 1
fi

if [ -e "$DEST" ]; then
  printf 'Error: %s already exists. Refusing to overwrite.\n' "$DEST" >&2
  exit 1
fi

cp -R "$SRC" "$DEST"
chmod +x "$DEST/serve.sh"

printf 'Created projects/%s/ from templates/deck/\n\n' "$NAME"
printf 'Next steps:\n'
printf '  1. Edit projects/%s/index.html   — replace every "...ที่นี่" placeholder\n' "$NAME"
printf '  2. Add images to projects/%s/assets/ and update src= paths (keep them relative)\n' "$NAME"
printf '  3. Only touch projects/%s/styles.css if you add a new slide layout\n' "$NAME"
printf '  4. Run: bash projects/%s/serve.sh\n' "$NAME"
printf '  5. See projects/%s/README.md for details\n' "$NAME"
