# Submission form review — 2026-10-24 MYT

**Oct 27 form update:** owner login is complete. The real Build editor has been inspected and populated, and both submission agreement panels have been read without acceptance. See FINAL_REVIEW.md for the current field mapping and precise final boundary. The original Oct 24 access blocker below is historical.

**Publication update, Oct 27 MYT:** the owner approved public source, MIT and GitHub Pages. The repository now exists at https://github.com/KaiVenn52/accord-escrow-evidence and the deployment is tracked in `PUBLICATION.md`. References below to a proposed release or pending license describe the Oct 24 review snapshot. The actual event form is still uninspected; publication does not resolve those eligibility questions.

The actual registration and submission fields have **not** been inspected. A fresh, unauthenticated Microsoft Edge session opened the official event URL and received a human-verification page before the event content. The agent did not attempt the challenge, register, sign in to DoraHacks, submit a form or accept terms. Official CRE CLI authentication is separate from DoraHacks authentication.

Evidence: `evidence/registration-public-page.txt`, `registration-public-page.png`, and `registration-public-links.json` (empty because the challenge exposed no submission links). The web reader independently returned HTTP 405. Existing official source captures remain useful for the published event description, but do not establish authenticated form requirements.

## Prepared field mapping

This is preparation, not an assertion that these are the platform's exact required fields or length limits.

| Likely material | Prepared value or location | Status |
|---|---|---|
| Project name | Accord — Escrow Evidence Desk | Ready |
| Short description | A CRE workflow that reconciles software-delivery evidence with escrow state and produces a reproducible, human-reviewed release recommendation. | Ready; actual form length limit unknown |
| Problem, solution, CRE integration | `ENTRY_DRAFT.md` | Ready |
| Target bounty | Best workflow with CRE — 2 winners, $1,000 each | Public bounty text captured; selection not submitted |
| Workflow execution | Two official CLI runs: REVIEW_READY and HOLD, exit 0 | Ready, private EVM + controlled HTTP |
| Proof artifacts | Raw CLI logs, extracted results, reproduced receipt fingerprints and portable bundles | Ready |
| UI images | `evidence/ui-desktop.png`, `ui-mobile.png`, `ui-cre-tampered.png` | Ready; no upload performed |
| Demo script | `DEMO.md`, approximately 2 minutes | Ready script; no final video recorded or uploaded |
| Repository | Proposed `KaiVenn52/accord-escrow-evidence` | Not created; current gh CLI account is KaiVenn52 |
| Demo hosting | Proposed GitHub Pages from a static Vite build | Not configured; proposed URL not live |
| Code license | MIT text in `LICENSE_PROPOSED.txt` | Draft awaiting owner approval |
| Identity, team, contact, country/age declarations | Owner-supplied | Not collected or invented |
| AI and dependency provenance | `PROVENANCE.md` | Disclosed; organizer policy unresolved |
| Legal declarations and final submission | Exact form needed | Not reviewed or accepted |

## Questions that need the actual form or organizer terms

- Is AI-assisted implementation allowed, and what disclosure is required?
- Are prior code and dependencies allowed, and what development period applies?
- Are there country, age, team-size, attendance or separate registration restrictions?
- Is a public testnet necessary, or is official CLI simulation using controlled local providers acceptable?
- Which links, video duration, upload limits and license are required?
- What currency, payment method, tax/KYC and winner-verification conditions apply?

These questions have not been sent to the organizer. No private-chain acceptance or prize eligibility is implied by the successful CLI runs.

## Concrete publication proposal for owner review

Publish a public repository named `accord-escrow-evidence` under the currently authenticated GitHub account `KaiVenn52`, apply the proposed MIT license, and enable GitHub Pages for its static demo. The proposed repository lookup currently reports it cannot resolve the repository; this is not a reservation or proof the name will remain available. Confirm ownership/account, visibility, license and hosting before creation. Publishing these materials does not register or submit the event entry.

After permission, configure Vite's base for the repository subpath before building for Pages, then verify the actual public URL. Do not label a proposed URL as live. A demo video remains separate work before final submission if required by the actual form.
