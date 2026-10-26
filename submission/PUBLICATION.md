# Public release — 2026-10-27 MYT

The owner explicitly approved the KaiVenn52 account, public repository, MIT license and GitHub Pages deployment. The repository has been created and Pages configured to deploy with GitHub Actions.

- Source: https://github.com/KaiVenn52/accord-escrow-evidence
- Demo address: https://kaivenn52.github.io/accord-escrow-evidence/
- Workflow: https://github.com/KaiVenn52/accord-escrow-evidence/actions/workflows/pages.yml
- License: root `LICENSE`, MIT, copyright 2026 Accord contributors.

The workflow installs locked dependencies on Node 22, runs the source test suite, builds Vite with `/accord-escrow-evidence/` as its base, and deploys only `dist`. All actions are pinned to verified commit SHAs. Runtime tools, login sessions, local dependencies and ignored temporary files are not part of the public source release. The initial source selection uses the reviewed archive allowlist.

Deployment and public-browser verification are in progress. This document will be updated with actual results rather than treating a configured address as a working site.

This publishes the static operations desk, source and curated execution evidence. The two CRE runs use private EVM and controlled HTTP providers. Hosting does not create a public escrow contract, public provider integration or live CRE DON deployment. No event registration, terms acceptance, final submission or external organizer message has occurred. The demo video remains unrecorded.
