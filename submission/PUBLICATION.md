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

## English video release — completed Oct 27 / reviewed through Oct 28 MYT

The earlier unrecorded-video note is superseded. The 2m44s English walkthrough is published at https://kaivenn52.github.io/accord-escrow-evidence/walkthrough.html with the direct reviewed MP4, poster and English WebVTT captions. Source commit `36b631f` was deployed successfully by [run 40536080091](https://github.com/KaiVenn52/accord-escrow-evidence/actions/runs/40536080091). `evidence/video-qa.json` confirms live HTTP 200, matching reviewed media hash, playback, seeking, nine caption cues and phone layout without overflow or console errors. The live video bytes match the independent review in video/REVIEW.md. No new CRE execution or chain deployment follows from publishing this video.

On Oct 28 the owner authorized contact disclosure and separately confirmed the Build creation terms. Public [Build 50435](https://dorahacks.io/build/50435) was successfully created and its full description and three links verified. The BLI event submission dialog has Accord selected and Looking for teammates set to No. The activity agreement remains unchecked and Submit for Review remains unclicked; see FINAL_REVIEW.md. These current facts supersede the earlier no-terms/no-Build notes.

## Oct 28 review refinement

Source commit 24f5f65 passed a fresh locked Linux install, all 31 source tests, evidence-copy integrity checks, production build and Pages deployment in [run 40639223992](https://github.com/KaiVenn52/accord-escrow-evidence/actions/runs/40639223992). The desk now has direct recorded-result replay, links to original CLI records, explicit private-chain labels and outcome-first narrow layouts. English captions now use 40 short cues; the reviewed MP4 hash is unchanged. The current public browser/video reports supersede older nine-cue and interface snapshots above.

## Final submission — Oct 28 MYT

After the owner explicitly confirmed the activity agreements and final submission, DoraHacks returned Build Submitted! for Accord, Build 50435, and Under Review. The separate CRE Apply flow was completed; Manage Build submission confirms Track All BUIDLs and bounty Best workflow with CRE - 2x $1,000. SUBMISSION.json and the three submitted/status/bounty screenshots record the result. This supersedes earlier pre-submission status notes. Submission does not establish organizer acceptance, eligibility, an award or payment. No organizer message was sent.
