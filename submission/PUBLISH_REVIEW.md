# Publication review — Accord

The source and execution evidence are prepared locally for review. Nothing has been published, registered or submitted.

## Concrete proposed release

- Repository name: `accord-escrow-evidence` (proposal, not created).
- Contents: TypeScript UI and policy, Solidity demonstration escrow, official CRE workflow, runtime targets, tests, reproducible local scripts, execution evidence, architecture, demo script and entry draft.
- Proposed code license: MIT, draft in `LICENSE_PROPOSED.txt`; requires owner approval before public release.
- Hosted demo: static Vite build from `dist/`, showing fixture scenarios and local evidence import. It cannot send a payment. No host or account has been chosen or provisioned.
- CRE proof: two actual CLI v1.38.0 simulations with private EVM and controlled HTTP providers, both exit 0; one REVIEW_READY and one HOLD. Preserve their raw logs alongside the unsigned portable JSON.

The review archive excludes node_modules, CLI/Bun executables, runtime caches, .env files, account sessions and login authorization URLs. It includes a SHA-256 file manifest. A checksum verifies archive integrity, not correctness, organizer eligibility or legal sufficiency.

## Pending decisions and evidence

Publication/hosting, registration and final submission remain user-confirmed actions. The actual form still needs inspection for eligibility, AI/prior-code policy and payout terms. The official bounty text does not explicitly require a public testnet, but acceptance of this private-chain demonstration is not confirmed by the organizer. No wallet signing or public testnet/mainnet deployment has occurred.

Before publishing, approve repository visibility, account/organization, license and demo host. Before submitting, approve the exact entry and supplied links. Do not silently turn local simulation evidence into a live DON claim.

Oct 24 continuation: the current GitHub CLI account is `KaiVenn52`. The concrete proposal is a public `KaiVenn52/accord-escrow-evidence` repository, the proposed MIT license, and a GitHub Pages static demo. None has been created. See `FORM_REVIEW.md` for the actual human-verification blocker, prepared field mapping and remaining policy questions. A final demo video has not been recorded or uploaded.

Rebuild a local review archive with `./scripts/package-review.ps1`. It uses an evidence allowlist, includes source and submission documents, refuses archive overwrite, and verifies every compressed file against its SHA-256 manifest. This packages locally and performs no publication.
