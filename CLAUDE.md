# CLAUDE.md

Static site. GitHub Pages, no build, no workflows.

## Layout
- index.html, case-taskwatch.html — top level pages (may not exist yet)
- .nojekyll — required, keep
- projects/medi-band-dm/animated-presentation/ — the deck
  - index.html, app.js, styles.css — the only files that matter
  - assets/, dist/, preview/ — binaries. NEVER read. NEVER open .zip .webp .png
  - design/ — Thai design docs. Read only if the task names them
  - README.md, SOURCES.md, PRESENTER_NOTES_TH.md — content source

## Rules
- Read only the files the issue names. Do not survey the repo.
- Use `rg` with a path filter, never a bare repo-wide search.
- All links stay relative. Never write a link starting with `/`.
- Never add .github/ or any workflow.
- Never touch STATUS.md, it is generated.
- No build step exists. Do not add one.
