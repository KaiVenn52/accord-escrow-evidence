Accord — Escrow Evidence Desk

A matching document hash is not a release decision. Legal and finance teams need to reconcile exact delivery, agreed recipient and amount, client acceptance, disputes, challenge periods and the observed escrow state.

Accord uses Chainlink CRE to turn scattered evidence into one reproducible review receipt. A failed condition produces HOLD with a concrete reason. Passing evidence produces REVIEW_READY with HUMAN_REQUIRED. The workflow has no payment or chain-write capability.

CRE integration

The official TypeScript SDK orchestrates a delivery HTTP API and an EVM escrow read. Identical text consensus establishes delivery content. A finalized header pins the contract read to an explicit block. Acceptance comes from the payer-controlled contract, rather than trusted delivery-API claims. The shared deterministic policy binds terms, observations, evaluation time and decision into a receipt fingerprint.

Actual execution evidence

Official CRE CLI v1.38.0 executed the WASM workflow twice: matching delivery returned REVIEW_READY; altered delivery returned HOLD with Delivery commitment mismatch. Both exited 0 with HUMAN_REQUIRED and broadcasting disabled. Raw logs, extracted results and independently reproduced fingerprints are in the public repository. These runs used a private EVM and controlled local HTTP providers, not a public chain or live DON deployment.

Demo

Six synthetic scenarios, explicit mismatch and dispute reasons, receipt download, and offline import of actual CLI result bundles. Imported files are unsigned historical replay: consistency is checked, source identity is not authenticated, and no live chain query occurs.

Implementation

TypeScript, Vite, viem, Zod, Solidity and the official CRE SDK. All 31 source tests pass, including a funded private-EVM escrow lifecycle. GitHub Actions tests and builds before deploying the static demo. Code is MIT licensed. AI-assisted implementation and dependency provenance are disclosed in submission/PROVENANCE.md.

This evidence-review prototype is not legal advice, production custody infrastructure or an autonomous payment agent. Humans retain legal judgment and payment authorization.

Links
Website: https://kaivenn52.github.io/accord-escrow-evidence/
GitHub Repo: https://github.com/KaiVenn52/accord-escrow-evidence
Video: https://kaivenn52.github.io/accord-escrow-evidence/walkthrough.html
