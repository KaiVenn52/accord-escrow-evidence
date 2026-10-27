# Accord hackathon walkthrough — autonomous production

Purpose: give LegalTech and Chainlink judges a clear, inspectable explanation of Accord and its actual CRE integration. The owner asked to finish the remaining work without intermediate design approvals. Autonomous mode selected. Existing public UI and CLI evidence are the production baseline; no generated imagery, fabricated terminal execution, private customer data, secrets or new chain execution.

## Decisions and visual tokens

1920×1080, 30 fps; English Microsoft desktop speech plus burned-in concise captions, no music. Preserve the product's Segoe UI typography, navy #172d43, pale gray #f4f5f7, white surfaces, green #226d58 and red #ab4538. Titles 56 px, captions 60 px, auxiliary text 32 px and closing URLs 40 px. Original page text provides context; key claims are repeated in the large narrative captions. Use calm 21-frame eased entrances, no overshoot, no neon, no decorative particles. Legal/finance evidence should remain readable. No BGM or decorative SFX: narration clarity takes precedence over promotional energy. A music-free single version therefore suffices.

The live published product supplies strict visual reference, so separate styleframe exploration is omitted. No Gallery shot variant is selected: a custom evidence walkthrough needs page holds and source inspection, rather than a cinematic card metaphor. Scope/risk: actual screenshot framing, crops, text legibility, caption/voice timing. Reuse the skill's PageCam implementation with restrained 2D camera keys and long settled holds. Product pages are 2× real browser captures; layout coordinates and element cutouts are saved with them. CLI/source views are clearly labeled saved-file viewers displaying actual existing files, not simulated terminal sessions.

## Feature and shot mapping / final storyboard

| Shot | Material | Message | Motion and hold |
|---|---|---|---|
| 0 | Actual idle desk | Delivery integrity alone is insufficient | Full-page settling view; slow intro, long hold |
| 1 | Verified clean fixture | Reconcile terms, delivery and chain; HUMAN_REQUIRED | Gentle focus to outcome |
| 2 | Altered fixture | Exact bytes mismatch -> HOLD | Hold blocked row and reason |
| 3 | Disputed fixture | Matching document cannot override dispute | Hold result and dispute row |
| 4 | Actual workflow/main.ts | CRE HTTP consensus + finalized pinned EVM read | Static source excerpt, no invented code |
| 5 | Saved real ready CLI log excerpt | Official CLI result REVIEW_READY, exit 0 | Static saved-file view, readable values |
| 6 | Saved real tampered CLI log excerpt | Official CLI result HOLD, exit 0 | Static saved-file view, reason visible |
| 7 | Imported real CLI bundle | Reproduce fingerprint; unsigned historical replay | Page camera to banner and outcome |
| 8 | Closing card, source/demo links | Public source, 31 tests, human decision | Calm typography, final hold >=1 s |

Each shot lasts its narration duration plus 1.4 seconds; minimum 7 seconds. Narration begins 0.35 seconds after shot entry. All timings derive from generated WAV sample durations and are fixed in timeline.json. Runtime clocks and randomness are forbidden in rendering. The final script, timeline, source hashes and keyframes make review reproducible.

Required factual boundaries in narration/captions: six fixtures are synthetic; official CLI uses a private EVM and controlled local HTTP; no live DON or public-chain deployment; imported bundles are unsigned historical replay; humans retain legal judgment and payment authorization. MIT applies to project code; installed Remotion and React retain their own licenses. Local voice synthesis is disclosed.

Validation: render per-shot keyframes, full MP4, decode video and inspect technical properties/audio peak. A clean-context reviewer checks final frames, script and claims against source evidence before delivery. Workbench manifest derives from the same shot table.
