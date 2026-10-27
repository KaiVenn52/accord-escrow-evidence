# Independent video review

Review date: 2026-10-27 MYT. Reviewer did not author or modify product/video implementation. Production mode: autonomous, custom PageCam evidence walkthrough; no selected Gallery card or variant; local Microsoft David English narration; no BGM or SFX.

Current decision: **PASS WITH DOCUMENTED LIMITATIONS** for facts, final frame layout and media integrity. No outstanding P1 repair. This is an evidence walkthrough rather than a mobile audit of all UI microtext. Subjective voice quality has not been verified by human listening.

## Evidence reviewed

- `DESIGN.md`, `narration.json`, `timeline.json`, `src/main.tsx`, `src/PageCam.tsx`, `src/workbench.ts` (all paths in this list relative to `video/`).
- Product source `../workflow/main.ts`, `../src/policy.ts`, `../src/bundle.ts`; actual `../evidence/cre-ready-result.json`, `cre-tampered-result.json`, both original simulation logs, `wasm-sha256.txt`, `tests.txt`, `../LICENSE`, `../README.md`; capture script `../scripts/capture-video.mjs`.
- First-round frames in `out/qa/`; second-round full-size frames including f90, f564, f1149, f1607, f2150, f2824, f3421, f4059, f4614 in `out/qa-v2/`. Frame numbers are zero-based at 30 fps. Timeline: 4,929 frames, 164.3 seconds.
- Required source was referred to as `src/workbench.ts` in the task; its actual location is `video/src/workbench.ts`, which was inspected.
- Final MP4 SHA256: `A61E743E5F0B4B4DB072F6F19B4535611503132E6C8EEAB17AEF7B532EFA5FBA`. Independently decoded all 4,929 frames and audio with FFmpeg, exit 0. H.264 1920×1080 at 30 fps; video duration 164.300000 s; AAC mono 22,050 Hz; container/audio duration 164.346440 s; 9,258,086 bytes. The approximately 46 ms AAC/container offset is immaterial for this non-beat-synced narration walkthrough; no claimed SFX alignment measurement follows from it.
- Final encoded frame exports `out/qa-v2/encoded-01.png` through `encoded-06.png` correspond respectively to zero-based frames 564, 2150, 2824, 3421, 4059 and 4614. All six were inspected at full size. Final encoded f2150 confirms the repaired source view. `review-contact-sheet.jpg` was also inspected for all 27 sampled states; it includes one older f2714 source still and is not the authority for the final encoded workflow shot.

## Findings and dispositions

1. **P1 resolved — narrative readability.** First-round f90/f564/f1149/f1607 used 30 px captions and f4614 used 28 px links. Second round uses 60 px captions, 56 px titles, 32 px auxiliary text, and 40 px links. Second-round f2150/f2824/f3421/f4059/f4614 have no caption clipping or overlapping footer. Small original UI text is retained as source context; core conclusions are independently readable in large captions. It is not a mobile-readable audit of every UI field.
2. **P1 resolved — workflow source cropped.** Initial second-round f2150 cropped line 24's pinned call parameters and line 29's shared `evaluate` call. The replacement f2150 (file timestamp 23:45 MYT) removes excess empty space and visibly includes `blockNumber:blockNumber(height)` plus `const receipt=evaluate(cfg.terms,` below the finalized-header line. The core HTTP consensus, pinned read and shared-policy operations are now all visible as exact source. The remainder of the evaluate arguments is below the frame; the full source remains available for inspection.
3. **P1 resolved — CLI status evidence.** First-round f2824/f3421 omitted the original status field from the excerpt. Second-round frames visibly include actual `REVIEW_READY` / `HOLD`, `HUMAN_REQUIRED`, `local-evm`, and `exit_code=0`. The altered result visibly contains `Delivery commitment mismatch`.
4. **P2 resolved — source/execution label.** Workflow frame f2150 now correctly says `Saved source evidence`; simulation frames say `Saved execution evidence`. Neither is presented as a newly executed terminal session.
5. **P2 suggestion — caption line breaks.** Second-round f2824 wraps the final `0` onto its own line. It remains fully readable, but shorten the caption to avoid the orphan (for example, keep the complete `exit 0` together). This is not a factual blocker.
6. **P2 suggestion — subtitle sidecar.** SRT currently presents one full narration paragraph per shot and starts at shot entry, while narration starts at local frame 10. Split the optional sidecar into phrase-length cues if it will be published. Burned-in captions are concise summaries, not verbatim closed captions.
7. **Resolved — final encoded video/audio integrity.** Final FFmpeg complete decode returned exit 0 with all 4,929 video frames. Final encoded audio measured mean -22.1 dB and peak -1.4 dB, with nonzero samples through the expected program duration. Media properties match the fixed timeline. Source problem.wav measured mean -20.5 dB and peak -0.2 dB; implementation uses voice gain 0.85. Listening quality is not inferred from waveform measurements; subjective pronunciation, prosody and naturalness remain a listening limitation.

## final-review checklist

P1 ✓ Positioning is clear: software-delivery escrow review for legal/finance. P2 ✓ Feature priority follows evidence reconciliation, failure cases, CRE integration and portable replay. P3 ✓ No payment authorization, public-chain transaction, live DON deployment, registration or submission success is claimed. P4 ✓ Decision table maps to actual UI captures, source/log viewers and voice; its typography update is recorded.

F1 ✓ Every required feature has a mapped shot; updated f2150 resolves workflow framing. F2 ✓ Shots add distinct information: idle context, accepted fixture, changed bytes, dispute, implementation, matching CLI, altered CLI, historical import, source/demo. F3 ✓ Actual state and reasons are visible; a saved screenshot walkthrough does not demonstrate the full click sequence.

V1–V4 ✓ Segoe UI, navy/pale gray/white and restrained green/red follow product tokens. Motion is eased, calm and free of neon, particles, overshoot and unrelated visual styling.

S1–S6 N/A No Gallery variant was selected; no unsupported fidelity claim is made. The recorded baseline is custom 2D PageCam over actual captures.

B1 ✓ Nine shots and durations match the fixed timeline. B2 ✓ Captions, source and page/log state match after updated workflow framing. B3 ✓ Brand is present throughout; shots settle after frame 60 and hold for many seconds, with a final brand card over 12 seconds. B4 ✓ No required shot removed in reviewed revisions.

D1 ✓ Six scenarios are labeled synthetic; imported material retains local-EVM provenance. D2 ✓ Reviewed frames contain no password, token, private key or private customer identity. Displayed addresses are project fixture/local test addresses. D3 ✓ Existing product UI uses real browser captures at 2×; file viewers explicitly show saved source excerpts. D4 ✓ No missing assets, fallback blocks or loading indicators in inspected frames. D5 ✓ Data is frozen project demo evidence; no assertion of live provider/chain state follows from it.

A1 ✓ No BGM, as specified. A2–A9 N/A No SFX, musical hits or BGM variants; no dense beat-sync claim. Narration is independently timed from WAV lengths with 10-frame entry offset and approximately one-second trailing hold. Final encoded-media checks pass; subjective listening remains the limitation in finding 7.

Q ✓ Final encoded frame review passes with the contextual-text limitation below. No assertion that every UI microfield can be read on a mobile screen.

## aesthetic-rules checklist

R1 ✓ Brand/card holds exceed one second. R2 N/A No bulk arrivals. R3 ✓ Long evidence holds; no accelerated typing or misleading fake interactions. R4 ✓ Zero whole-frame beat impacts.

Q1 ✓ Actual existing UI captures; saved file viewer is explicitly labeled. Q2 ✓ Flat PageCam, 2× textures; no 3D texture magnification chain. Q3 ✓ No noise/shake source. Q4 ✓ No glints/sweeps. Q5 ✓ One main page is the opening subject. Q6 ✓ Dense pages and text are front-on. Q7 N/A No volumetric object shot. Q8 Deliberate design exception: calm evidence-and-links ending instead of promotional flying-element finale; documented no-particles/no-SFX direction. Q9 N/A No flying UI. Q10 ✓ Actual populated evidence UI and exact source/log excerpts; no invented document replica. Q11 △ Large narrative text now meets intended type scale; original screenshot microtext remains context, with the desktop/mobile limitation explicitly recorded. Updated workflow framing shows all core operations.

S1 ✓ Music-free, voice-led design is documented. S2–S5 N/A No SFX table, re-timing, long tails or attack peaks to synchronize. Do not treat this as a measured AAC offset result.

C1 ✓ Each non-brand shot has narration and a matching concise caption. C2 ✓ Titles name delivery evidence, reconciliation, CRE workflow or replay rather than generic slogans. C3 N/A No 3D scene annotations.

P1 ✓ Two rounds of keyframes, all 27 states in a contact sheet, six full-size final encoded frame exports and full media decode inspected. P2 N/A No external motion reference or Gallery variant. P3 N/A No ambiguous human revision request. P4 ✓ Feature mapping complete and each shot has a separate purpose.

## Factual boundaries

The workflow source really calls official SDK HTTP consensus, requests a finalized header, pins `callContract` to its explicit height, obtains acceptance from contract return data, and passes observations into the shared deterministic policy. The original saved matching and altered CLI logs both end `exit_code=0`; result JSON supports the narrated statuses. The logged WASM binary hash equals the saved WASM hash record. These establish saved local simulation evidence, not DON deployment or a public Sepolia transaction. The six browser scenarios remain fixtures. Portable import recomputes the recorded fingerprint under the original evaluation time and is unsigned, unauthenticated historical replay. `evidence/tests.txt` records 31 passing tests; this review did not rerun the suite. MIT is present for project code. No hackathon registration or final submission claim has been derived from this video.

## Release gate

Must fix: none outstanding in final inspected media. Recommended polish: findings 5–6. Unverified: subjective voice listening, source/demo current HTTP availability (not retested by this reviewer), registration and submission (not claimed). No other factual blocker found in the reviewed script, source evidence, second-round keyframes and final encoded frame samples. Report conclusions apply to the exact SHA256 above.
