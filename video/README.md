# Accord narrated walkthrough

The final reviewed video is `../public/accord-demo.mp4`; its public player is `../public/walkthrough.html`. `REVIEW.md` records independent content/visual review and final media checks. `DESIGN.md` is the autonomous brief and shot mapping; `narration.json` and `timeline.json` are the fixed source tables. Voice synthesis is Windows System.Speech, Microsoft David Desktop, en-US, with no external speech service. No BGM or decorative sound effects are used.

## Reproduce

Install this folder's exact locked dependencies with `npm ci`. The prepared local workspace reuses an existing installed Remotion dependency directory through an ignored junction; this is not necessary on another machine.

From the main app directory, build and preview the subpath version:

```powershell
npm run build -- --base=/accord-escrow-evidence/
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 5200 --strictPort --base=/accord-escrow-evidence/
```

In another terminal from the app directory:

```powershell
node scripts/capture-video.mjs
cd video
powershell.exe -NoProfile -File synthesize.ps1
node prepare-timeline.mjs
# Set ACCORD_VIDEO_RUNTIME, TEMP and TMP to project-specific directories on a disk with enough space.
node render.mjs --final-pass
```

The renderer uses installed Microsoft Edge at `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`; adjust that path in `render.mjs` on another host. FFmpeg and ffprobe must be available. Rendering is deterministic: only frames 0–60 of each scene move; all later visual properties are constant. The final-pass path renders those 61 frames in Remotion, extends the exact settled frame for the rest of the shot with FFmpeg, and places the narration at local frame 10. It preserves all 4,929 final video frames at 30 fps. The long-hold optimization avoids rendering thousands of identical static frames.

`src/workbench.ts` describes shots, editable titles/captions and narration on the same timeline. `npm run studio` opens the Remotion composition for local source editing. Generated bundles, intermediate MP4s and runtime caches are ignored. The reused PageCam source comes from the installed video-shotcraft skill's reusable component library; it is used in flat 2D mode. No Gallery variant or generated image is used.

The prepared workspace also runs a project-scoped copy of ShotCraft Workbench at `http://localhost:5198/?import=project`; the installed skill itself was not modified. Windows path and junction handling were adapted in that scoped runtime. The nine shots and voice tracks import successfully. `parity.mjs` compared original and imported compositions at frames 90, 2150 and 4614: all had zero differing pixels. See `../evidence/video-workbench-parity.json`. This is sampled visual parity, not an exhaustive all-frame or audio comparison. The workbench's complete export action has not been run; use the reviewed published MP4 as the final submission artifact.

## Caption readability update — Oct 28

The published WebVTT now has 40 short cues, at most two lines and 42 characters per line. `node video/captions.mjs` regenerates it from the fixed timeline without changing the reviewed MP4. All narration words are retained and cues do not overlap. Timing is interpolated by word count within each measured narration clip, starting at local frame 10; it is not forced word alignment. The original nine-paragraph caption QA is superseded by the current player report.
