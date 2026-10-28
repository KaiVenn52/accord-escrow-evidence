# Accord — Escrow Evidence Desk

A narrow LegalTech workflow for reviewing software-delivery escrow. Accord reconciles an agreed artifact digest, an offchain delivery response and onchain escrow conditions, then issues a reproducible review receipt. A valid hash proves byte integrity; legal sufficiency remains a human determination.

**Status:** owner-approved public source release (2026-10-27 MYT), licensed under [MIT](LICENSE). The UI includes clearly labeled synthetic fixtures and offline replay of locally produced evidence bundles. Private EVM integration and CRE CLI simulation are separate evidence categories; see [submission/READINESS.md](submission/READINESS.md) for verified results and remaining gates.

[Source repository](https://github.com/KaiVenn52/accord-escrow-evidence) · [Demo address](https://kaivenn52.github.io/accord-escrow-evidence/) · [Deployment workflow](https://github.com/KaiVenn52/accord-escrow-evidence/actions/workflows/pages.yml)

[Watch the English walkthrough](https://kaivenn52.github.io/accord-escrow-evidence/walkthrough.html) — 2 minutes 44 seconds, 1080p, with locally synthesized narration. It shows real product states and saved official CLI outputs. [Video source and independent review](video/README.md).

## Review the working evidence in one minute

Open the [desk](https://kaivenn52.github.io/accord-escrow-evidence/) and select **Matching delivery** under **Reproduce the recorded CRE runs**. The browser loads the saved local-provider CLI evidence and reproduces its REVIEW_READY fingerprint. Select **Altered delivery** to reproduce HOLD and its delivery-commitment mismatch. Expand **Execution records & scope** to inspect both original logs and the actual CRE workflow. No download, account or wallet is needed.

The practical decision is narrow: before finance considers releasing a software milestone, legal reviews whether the exact delivered bytes, agreed beneficiary and amount, recorded payer acceptance, challenge period and dispute state agree. A document hash alone cannot answer those questions. CRE joins the external delivery response with a pinned EVM observation; the receipt preserves the evidence behind the recommendation. It does not decide legal entitlement or execute payment.

The replay files are unsigned historical records; browser verification proves internal fingerprint consistency, not source identity or CRE execution. The saved official CLI logs are separate execution evidence. For integration details and exact scope, see the sections below.

**DoraHacks — submitted Oct 28:** [Build 50435](https://dorahacks.io/build/50435) is submitted to BLI Legal Tech Hackathon 2 and **Under Review**. Manage Build submission confirms Track **All BUIDLs** and bounty **Best workflow with CRE - 2x $1,000**. The owner explicitly confirmed the activity agreements and final submission. This is submission evidence, not organizer acceptance or an award. See [submission receipt](submission/SUBMISSION.json).

The static demo is deployed through GitHub Actions. Its workflow runs the test suite and builds with the repository subpath before deployment. Hosting this UI does not deploy an escrow contract or CRE workflow. Registration and final hackathon submission remain separate owner actions.

**Official CRE simulation verified (2026-10-24 MYT):** CLI v1.38.0 executed the real WASM workflow with local HTTP and private EVM providers. Matching delivery returned REVIEW_READY; altered delivery returned HOLD with Delivery commitment mismatch. Both runs exited 0. Raw logs, extracted results and reproducible bundles are in `evidence/cre-*`. No live DON deployment or public-chain transaction is claimed.

## Run locally

Requires Node.js 22+ and npm. Dependencies are pinned by `package-lock.json` after installation.

```powershell
npm ci
npm test
npm run build
npm run dev
```

Open `http://127.0.0.1:5187`. Select one of six evidence scenarios, verify the bundle, and download its JSON receipt. The UI does not connect to a wallet and cannot execute a payment. All six scenarios are fixtures, including the displayed block and beneficiary.

```powershell
npm run demo
```

This compiles and deploys the actual Solidity contract to an in-process Ganache chain, records acceptance, advances the private clock, reads contract state, runs the shared policy and tests a payer-authorized release. Evidence is saved to `evidence/local-evm.json`. Ganache's chain ID is 11155111 for SDK compatibility; these are **private local transactions, not public Sepolia transactions**. It uses Ganache test accounts and imaginary ETH only.

## Import a reproducible evidence bundle

`npm run demo` also writes `evidence/local-evm-bundle.json`. Select **Import evidence JSON** in the desk and choose that file. The browser strictly validates its schema and size, recomputes the policy at the recorded evaluation time, and compares the receipt fingerprint. The imported view shows the actual local recipient, contract, block and original decision rather than fixture addresses. A fingerprint mismatch or malformed file disables export and displays a rejection.

This is historical replay. The demo bundle captures the observation before its test release; it is not the state after release. An imported file does not authenticate its author, RPC source, client identity or timestamp. Anyone can construct a new internally consistent file. Fingerprint consistency is not a signature or a proof of CRE execution. No network request or payment occurs during import. Only fixture and local-EVM source labels are currently accepted; public-provider and CRE proof import require a future authenticated report verifier.

Evidence files include delivery text. Keep private legal material local; the import path does not upload it to a server. The size limit is 128 KiB per file and 32 KiB of UTF-8 delivery text. Receipt-only JSON exports cannot be imported as complete evidence bundles because they do not contain the raw delivery.

## CRE workflow

The workflow in `workflow/main.ts` uses official CRE `CronCapability`, `HTTPClient`, exact-text consensus, `EVMClient.headerByNumber` and `callContract`. It pins the escrow read to a finalized header's explicit block number, obtains acceptance from the contract, checks the committed milestone/deadline/challenge terms, and passes the evidence into the same pure policy used by the UI. It returns a receipt; there is no CRE write capability or payment key.

```powershell
npx tsx scripts/seed-simulation.ts
# In another terminal, from the project root:
cre workflow simulate workflow --target local-settings
```

On the prepared Windows workspace, `./scripts/cre.ps1` resolves this project's verified CLI and Bun without changing global PATH. Use `./scripts/cre.ps1 version`, then manually `./scripts/cre.ps1 login` for your account, and `./scripts/cre.ps1 workflow simulate workflow --target local-settings` after starting the seed services. On another machine, install the official CLI and Bun first.

For a bounded local run after login, `./scripts/verify-and-simulate.ps1` checks the local endpoints and authentication, then uses the prebuilt WASM with broadcasting disabled. It saves the real CLI output and exit code. Both the unauthenticated gate and successful authenticated execution were tested. The helper handles CLI v1.38.0's ASCII/path-length constraint through this project's runtime tools junction. See `submission/AUTHENTICATION.md` for authentication details.

The seed command starts a private Ganache RPC at `127.0.0.1:8754` and a controlled delivery HTTP API at `127.0.0.1:8755`. It generates `workflow/config.local.json` with actual deployed local contract terms. Wait 60 seconds for the challenge period if testing the ready state. A CLI success against these endpoints demonstrates CRE orchestration of local test providers; it does not demonstrate a public provider integration or a deployed DON.

Run `npx tsx scripts/check-providers.ts` while the seed services are running to independently verify HTTP delivery, deployed bytecode, the finalized pinned read and shared-policy output. This writes `evidence/local-providers.json` and is not an official CRE simulation.

CRE TypeScript additionally needs Bun 1.2.21+, CRE setup tools and an authenticated CRE CLI session under the current official documentation. Account creation, terms acceptance and authentication remain user actions. The `staging-settings` config is deliberately nonfunctional until approved public testnet deployment and an immutable, accessible delivery endpoint are available. Do not represent it as integrated.

## Review rules

- Altered bytes, wrong chain/contract/milestone, changed beneficiary or amount, missing acceptance, an unelapsed challenge period, open dispute, duplicate release, unfinalized data or a stale snapshot cause `HOLD`.
- Passing evidence yields `REVIEW_READY` with `HUMAN_REQUIRED`. It never yields authorization to transfer funds.
- The receipt binds policy version, complete terms, document digest, exact observations, source level, evaluation time and result through canonical JSON and ABI encoding followed by Keccak-256.
- Payloads are bounded to 32 KiB in CRE. No LLM interprets the contract or decides payment entitlement.

## Repository map

| Path | Purpose |
|---|---|
| `src/policy.ts` | Deterministic evidence policy and receipt commitment |
| `src/main.ts`, `src/style.css` | Responsive English review desk |
| `src/fixtures.ts` | Labeled synthetic demo data |
| `contracts/EvidenceEscrow.sol` | Minimal funded demonstration escrow |
| `workflow/` | Official CRE SDK orchestration and target configuration |
| `scripts/local-chain.ts` | Actual private EVM integration checks |
| `scripts/seed-simulation.ts` | Local providers for CRE simulation |
| `tests/` | Policy boundary and contract lifecycle tests |
| `evidence/` | Source captures and execution results |
| `submission/` | Rules, architecture, demo and draft entry |

## Limitations

This prototype does not establish legal delivery, authenticate an external client's identity, resolve disputes or implement refunds. A dispute freezes this demo escrow indefinitely; a production escrow needs reviewed dispute resolution, expiry/refund paths, independent security review and agreed legal terms. A digest is a commitment, not proof that a deliverable meets the contract. The UI imports portable local evidence, not authenticated CRE reports. CRE's local simulation does not establish DON fault tolerance. Avoid putting private legal documents into public URLs, logs or the public repository.

AI-assisted implementation is disclosed in `submission/PROVENANCE.md`. Public source, MIT licensing and hosting were approved by the owner and completed Oct 27 MYT. Registration and final submission still require user confirmation. See [publication evidence](submission/PUBLICATION.md).
