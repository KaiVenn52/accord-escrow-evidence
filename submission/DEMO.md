# Demo script — approximately 2 minutes

**0:00–0:20 — Problem.** A contractor says delivery is complete. Finance sees a funded escrow. Legal needs to know whether the exact committed artifact was delivered, whether the client accepted it, and whether a dispute or challenge period still blocks release.

**0:20–0:45 — Desk.** Open Accord. Explicitly identify the screen as a local fixture demo. Select Accepted delivery and run verification. Show the human-required outcome and download the receipt. A matching hash does not prove the work is legally sufficient.

**0:45–1:10 — Failure.** Select Altered artifact, then Open dispute. Re-run each. Show concrete hold reasons. A document match never overrides a dispute. Show Changed beneficiary to demonstrate that document integrity cannot redirect a payout.

**1:10–1:35 — Real local EVM.** Run `npm run demo`. Show compiled Solidity, private reads, authorization/challenge/dispute checks and exact payer release. Import the generated `evidence/local-evm-bundle.json` in the UI and show the same receipt fingerprint. State that this replays the saved pre-release observation at its recorded time; it does not query current state, authenticate the file or prove CRE execution. Ganache transactions are local and use test ETH.

**1:35–2:00 — CRE.** Show `workflow/main.ts`: HTTPClient + identical consensus + EVM finalized read + the same policy. Show the actual official CLI logs: `cre-simulation-success.txt` returns REVIEW_READY and `cre-simulation-tampered.txt` returns HOLD for changed delivery. Both exit 0. Import `cre-ready-bundle.json` or `cre-tampered-bundle.json` and match the displayed receipt fingerprint against its CLI result. Say explicitly that the execution used private EVM and controlled local HTTP providers, with broadcasting disabled. These logs are not evidence of a live DON deployment.

End: Accord turns scattered delivery evidence into a reproducible review record. The human retains the legal decision and payment authorization.
