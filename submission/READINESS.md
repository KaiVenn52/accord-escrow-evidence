# Readiness — publication update 2026-10-27, Asia/Kuala_Lumpur

**Decision: public GitHub source, approved MIT license and GitHub Pages demo published and verified Oct 27 MYT. Local implementation and official CRE CLI simulation evidence are available. Registration and final submission remain unperformed.**

**Final-materials update:** the 2m44s English video is complete and independently reviewed; its source and review live in video/. The owner completed DoraHacks login and the real Build editor has been populated. Both agreement panels were inspected without acceptance. FINAL_REVIEW.md supersedes the earlier form/video pending notes below. No public DoraHacks Build has been created and no event submission has occurred.

Accord is a runnable local LegalTech evidence-review prototype. On Oct 24 MYT, the official CRE CLI v1.38.0 successfully executed the compiled workflow against controlled loopback HTTP and a private EVM chain. The matching delivery returned REVIEW_READY; a second actual CLI run with altered delivery returned HOLD. Both runs exited 0 with HUMAN_REQUIRED and broadcasting disabled. These are local CLI simulations, not public Sepolia observations or live DON deployment.

## Verified evidence

| Layer | Result | Evidence and exact scope |
|---|---|---|
| Policy + escrow + bundle tests | PASS: 31 tests, 0 failures | `evidence/tests.txt`; original 22 checks plus 9 portable-evidence tests; altered artifacts, term/source binding, timing, authorization, funded Solidity lifecycle, import schema/size/date checks and fingerprint consistency |
| Production build | PASS | `evidence/build.txt`; TypeScript check plus Vite build, 466 modules; revision 2.2 frontend JS ~87.36 kB, gzip ~24.55 kB including bounded runtime schema validation |
| Browser QA | PASS | `evidence/ui-qa.json`; production preview in Edge via Playwright; 1440×1100, 1024×900 and 390×844; six scenarios, disclosures, row highlights, session history, real local-bundle import, both actual CRE CLI result replays, identical fingerprints, altered-file rejection and import reset; zero console errors and no page overflow |
| Visual review | PASS for tested layouts | `evidence/ui-idle.png`, `ui-desktop.png`, `ui-hold.png`, `ui-tablet.png`, `ui-mobile.png`, `ui-import.png`, `ui-import-mobile.png`; desktop, tablet and phone screenshots inspected; phone evidence uses labeled comparison rows |
| Private EVM | PASS: 12 lifecycle checks | `evidence/local-evm.json`; compiled Solidity, Ganache deployment, read, exact funded release, authorization/challenge/dispute/double-release checks |
| Controlled local providers | PASS: 8 checks | `evidence/local-providers.json`, `evidence/seed-startup.txt`; real loopback HTTP delivery and private RPC, deployed bytecode, finalized header and pinned read, committed terms, recorded acceptance; independent of CRE CLI |
| CLI installation | PASS | `evidence/cre-version.txt`: v1.38.0; archive SHA-256 in `evidence/cre-sha256.txt` matches official GitHub asset digest |
| CRE workflow build | PASS: TypeScript → JS → WASM | `evidence/cre-compile.txt`, `evidence/workflow.wasm`; official CRE SDK 1.23.0, Bun 1.4.3, Javy 8.1.0; checksum verified by official compiler |
| Official CRE CLI simulation | PASS: matching and altered delivery | `evidence/cre-simulation-success.txt` returns REVIEW_READY, and `cre-simulation-tampered.txt` returns HOLD with Delivery commitment mismatch; both exit 0 |
| CLI result reproduction | PASS: both fingerprints match | `evidence/cre-ready-capture.txt`, `cre-tampered-capture.txt`; actual CLI JSON extracted, reported block hashes checked and acceptance read at the exact recorded block, fingerprints reproduced from delivery and chain state |
| Public delivery provider | NOT VERIFIED | Local HTTP seed service exists; no authenticated enterprise provider, public immutable delivery endpoint or real client identity is connected |
| Public Sepolia contract | NOT DEPLOYED | Ganache uses chainId 11155111 for SDK compatibility. It is NOT the public Sepolia network |
| CRE DON deployment / mainnet | NOT PERFORMED | No deployed workflow, DON execution, mainnet transaction or mainnet expenditure |
| Hosted demo / public repository | PUBLISHED AND VERIFIED | Public KaiVenn52/accord-escrow-evidence, MIT; Pages deploy run 40358088020 passed; live HTTP 200, six scenarios, both CLI bundle replays, download and mobile layout verified; see PUBLICATION.md |
| Registration / final submission | NOT PERFORMED | No organizer message, terms acceptance, registered entry or accepted submission |

The UI supports six fixture scenarios and offline import of portable local evidence. `evidence/local-evm-bundle.json` comes from the actual private EVM run; it includes raw delivery, terms, snapshot, recorded evaluation time and receipt fingerprint. The browser recomputes the historical result and checks the fingerprint. Imported data remains unauthenticated: this is not a live chain query, signature verification, public-provider proof or CRE execution proof. Receipt-only exports are not complete import bundles.

`evidence/cre-ready-bundle.json` and `cre-tampered-bundle.json` reconstruct the actual two CLI results from the exact recorded blocks. Their reproduction was checked against the raw CLI logs. The bundles remain unsigned portable JSON; the UI does not treat the filename or a self-consistent hash as source authentication. Keep the raw execution logs with them when presenting CRE evidence.

UI revision 2.2 includes the operations-desk redesign plus portable local-evidence replay. See `DESIGN.md`. The underlying policy and Solidity contract are unchanged; the complete 31-test suite was rerun after adding the import path. The local EVM demo was also rerun and generated the bundle used in browser QA. Tests no longer overwrite the demo bundle, keeping the displayed fingerprint linked to the saved run.

The earlier controlled-provider run observed `HOLD` before the 60-second challenge period elapsed (`evidence/local-providers-challenge.json`). A fresh Oct 23 run recreated the seed services and passed all eight provider checks; the current `evidence/local-providers.json` and `local-providers-bundle.json` record `REVIEW_READY`, `HUMAN_REQUIRED` and `local-evm` for that new run. The old challenge file and new ready file are from different runs and must not be described as one continuous chain history. Restart `npm run seed:cre` if these temporary services have stopped.

Ganache emits a warning under Node 24 that its optional µWS native binary is unavailable and uses its JavaScript fallback. The actual Solidity lifecycle checks pass with that fallback. No claim of production performance is made.

## Event and eligibility

The official overview was refreshed Oct 24 and explicitly labels the timeline UTC. Submission deadline remains **2026-11-01 01:01 UTC = 2026-11-01 09:01 MYT**. Internal review deadline remains Oct 31 MYT. Event is listed Virtual. The CRE bounty advertises two winners at $1,000 each; payout currency, payment method and any KYC remain unconfirmed. The aggregate event pool includes support/promotion and is discretionary; it is not guaranteed cash.

Precise AI/existing-code policy, development-window restrictions, country/age/team restrictions and any separate registration cutoff were not established from the retrieved official text. See `RULES.md` and the fresh official source captures. AI-assisted implementation and dependency provenance are disclosed in `PROVENANCE.md`.

A fresh unauthenticated Edge visit on Oct 24 stopped at DoraHacks human verification. The actual form therefore remains uninspected; see `FORM_REVIEW.md` and `evidence/registration-public-page.png`. CRE login does not grant DoraHacks access. The two-minute demo script is prepared, but a final video is not yet recorded or uploaded. Public `KaiVenn52/accord-escrow-evidence`, MIT and GitHub Pages were approved and published Oct 27. Local review packaging is reproducible with `scripts/package-review.ps1` and includes a verified ZIP manifest.

## Next sequence, with human boundaries

1. Review the successful CLI logs, extracted JSON, reproduced fingerprints, UI screenshots, source/license and entry draft. Authentication is complete; credentials are managed by the official CLI and are excluded from deliverables.
2. To repeat locally, start `npm run seed:cre`, wait for the contractual challenge window, then run `./scripts/verify-and-simulate.ps1`. The authenticated execution path is now verified. The helper stages the same checked WASM through a short ASCII path because CLI v1.38.0 rejects non-ASCII or over-97-character --wasm arguments.
3. Confirm eligibility, AI/existing-code and payout rules on the actual registration/submission form. Successful local CRE simulation does not establish organizer acceptance of the entry or guarantee a prize.
4. Public repository and hosting were approved and completed Oct 27. External messages, registration and final submission still require user confirmation.
5. Public testnet deployment, if chosen for additional evidence, is a separate wallet/signing boundary. No such deployment was performed.

## Reproduce locally

```powershell
npm ci
npm test
npm run build
npm run demo
npm run test:ui
npm run dev
```

CRE additionally requires Bun and the official CLI. Use `npm run compile:workflow` with Bun on the current process PATH; it creates the WASM artifact independently of account authentication. That build is not a substitute for the bounty's successful simulation/deployment requirement.

All project source lives under `bli-cre-escrow-evidence`. Because C: filled during installation, project-specific dependency/download storage uses the D: runtime folder linked by this project's `node_modules` and `tools`. An unused partial dependency link is ignored by Git. No other project source or global configuration was changed. The official compiler manages its own Javy executable cache under the user's `.cache/javy` directory.
