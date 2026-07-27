#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
TEMPLATE_DIR="$SCRIPT_DIR/templates/deck"

if [ $# -ne 1 ] || [ -z "$1" ]; then
  printf 'Usage: %s <deck-name>\n' "$0" >&2
  exit 1
fi

DECK_NAME=$1
DEST_DIR="$SCRIPT_DIR/projects/$DECK_NAME"

if [ -e "$DEST_DIR" ]; then
  printf 'Error: %s already exists. Refusing to overwrite.\n' "$DEST_DIR" >&2
  exit 1
fi

cp -R "$TEMPLATE_DIR" "$DEST_DIR"
chmod +x "$DEST_DIR/serve.sh"

cat <<EOF
Created $DEST_DIR

Next steps — files to edit:
  1. $DEST_DIR/index.html   — replace placeholder text in the 3 example slides, add more slides as needed
  2. $DEST_DIR/styles.css   — only if you add a new slide layout beyond cover/stats/grid
  3. $DEST_DIR/assets/      — drop image files here, then reference them with a relative <img src="assets/...">
  4. $DEST_DIR/README.md    — deck-specific usage notes (safe to rewrite)

Run it:
  cd $DEST_DIR && bash serve.sh
EOF
