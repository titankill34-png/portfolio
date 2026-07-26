# Automatic Claude → Codex Collaboration Policy

Boss-authorized default workflow for suitable tasks:

1. Commander creates the GitHub issues and routing automatically; Boss does not need to copy/paste prompts.
2. Claude Code receives a small, bounded design/blueprint task through the `task` route.
3. Codex implementation issue is prepared in HOLD state without a routing label.
4. After Claude pushes verified design evidence, Claude adds `codex-task` to the prepared Codex issue.
5. Codex continues on the same branch and Draft PR according to the Claude blueprint.
6. Only one writer may edit the branch at a time.
7. Claude must not continue implementation after handoff; Codex must not begin before release.
8. Boss alone authorizes merge and deployment.
9. GitHub issues, comments, commits, and PRs are the durable operational record.
10. Workers must report blockers honestly and must not mark work complete without required artifacts and evidence.
