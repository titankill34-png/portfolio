# Automatic Release Contract

The Claude design issue must perform this release only after its acceptance checks pass:

1. Push the design blueprint to `feat/smart-pill-band-v4-collab`.
2. Open or update the single Draft PR against `main`.
3. Comment on the prepared Codex issue with exact design SHA, PR URL, changed files, and limitations.
4. Add the `codex-task` label to that Codex issue.
5. Stop writing to the branch and close the Claude issue.

If any prerequisite is missing, Claude must not release Codex. It must report a blocker and leave the Codex issue without a routing label.
