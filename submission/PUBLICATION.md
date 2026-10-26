# Public release — 2026-10-27 MYT

The owner explicitly approved the KaiVenn52 account, public repository, MIT license and GitHub Pages deployment. The repository has been created and Pages configured to deploy with GitHub Actions.

- Source: https://github.com/KaiVenn52/accord-escrow-evidence
- Demo address: https://kaivenn52.github.io/accord-escrow-evidence/
- Workflow: https://github.com/KaiVenn52/accord-escrow-evidence/actions/workflows/pages.yml
- License: root `LICENSE`, MIT, copyright 2026 Accord contributors.

The workflow installs locked dependencies on Node 22, runs the source test suite, builds Vite with `/accord-escrow-evidence/` as its base, and deploys only `dist`. All actions are pinned to verified commit SHAs. Runtime tools, login sessions, local dependencies and ignored temporary files are not part of the public source release. The initial source selection uses the reviewed archive allowlist.

## Verified release

Initial deployed source commit: `88500ef`. [GitHub Actions run 40358088020](https://github.com/KaiVenn52/accord-escrow-evidence/actions/runs/40358088020) completed successfully. Its locked Linux install, 31 source tests (0 failures), subpath production build and Pages deployment all passed. The GitHub API confirms public visibility and MIT license. HTTPS is enforced on Pages.

The live demo returned HTTP 200 and passed Microsoft Edge browser QA at 1440×1100 and 390×844. All six fixture scenarios returned their expected outcomes; both actual CLI-result bundles reproduced their recorded fingerprints; HOLD receipt download retained HUMAN_REQUIRED; mobile had no horizontal page overflow. The successful run recorded no console errors or failed responses. See `evidence/public-qa.json`, `public-desktop.png`, `public-mobile.png` and `publication-run.json`.

The first post-deployment browser pass did not apply the stylesheet and failed layout validation. A fresh session, now explicitly checking that the deployed stylesheet applies before interaction checks, passed. No UI source change was needed. These observations establish successful tested loads, not an uptime guarantee. `node scripts/public-qa.mjs` repeats the public checks.

This publishes the static operations desk, source and curated execution evidence. The two CRE runs use private EVM and controlled HTTP providers. Hosting does not create a public escrow contract, public provider integration or live CRE DON deployment. No event registration, terms acceptance, final submission or external organizer message has occurred. The demo video remains unrecorded.
