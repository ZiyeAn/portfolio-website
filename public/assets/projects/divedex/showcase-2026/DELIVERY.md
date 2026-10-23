# DiveDex portfolio assets — 23 October 2026

Owner: this chat creates assets. Website chat `01a0ce94-8964-7510-ad38-57913e05e5cf` integrates them into `/projects/divedex-mobile-app`. No deployment is part of this delivery.

## Files

- `hero.mp4` / `hero-poster.webp`: 10 seconds, 1920 × 1080, silent H.264, edited motion showcase. Home polaroid state, result expansion, save feedback. Presentation movement is editorial, not a claim about native application animation timing.
- `core-flow.mp4` / `core-flow-poster.webp`: 36 seconds, 780 × 1688, silent H.264, edited walkthrough from actual Figma exports. Select photos → simulated analysis → ready results → expanded evidence → lower-confidence review → saved → after-save collection. Long frames are scrolled in the edit. This is not a continuous screen recording.
- `screens-overview-01.webp`, `screens-overview-02.webp`: 2400 × 1350, eight representative screens in two boards. Long result screens remain complete.
- `components-board.webp`: 2400 × 1800, source typefaces and color roles, three recommendation variants, Fish accordion states, shared expanded result card. Application labels identify Home, Collection, and Results.
- `before-home.webp`, `after-home.webp`, `before-results.webp`, `after-results.webp`, `before-collection.webp`, `after-collection.webp`: 1600 × 1200 each. Current V2 versus current V3 canvas; not a version-history reconstruction or measured improvement.
- `manifest.json`: paths, dimensions, captions, alt text, source node IDs, verification status and video metadata.
- `source/`: unmodified Figma exports plus one player screenshot documenting the collection state. Original Figma canvases were not edited.

## Verified in the Figma player

File: https://www.figma.com/design/fcbAdLWiwl1fn8im60FEgd/Divedex

1. Home `509:3559` → next polaroid `509:3663`.
2. Identify → photo picker `427:2014` → Add (5) → analysis `427:1817` → timed result `427:1482`.
3. Clown Anemonefish expansion `457:2210` → Confirm & save → Saved `427:3060` → Done → after-save collection `427:492`.
4. Mixed results → scroll → Giant Moray review `591:3664` → scroll → Confirm & save → Saved `427:3060`.
5. Main Collection `427:2893`: Fish collapses and re-expands on the same frame. Screenshot saved in `source/verified-collection-player.png`.

The public video combines these tested states using cuts and editorial scrolling. It does not simulate real image upload or model inference. Confidence percentages, sightings, counts and locations are illustrative prototype data.

## Limits to preserve in website copy

- V2 already separated ready-to-save results from results needing review. Describe V3 as a change in visual hierarchy and evidence disclosure, not the invention of confidence handling.
- The saved flow returns to `427:492`, a grid-style collection state. The main collection `427:2893` has the newer accordion layout. Those states have not been made consistent in this asset task.
- The exported second home polaroid displays `2 / 3 discoveries`. An immediate player capture during transition still showed `1 / 3`; this transient observation is not treated as a confirmed defect.
- Lower-confidence expansion resets the player to the top; a scroll is needed to reach the expanded card. The walkthrough preserves a return to the top before the scroll.
- The dedicated motion-study frames `596:4608` → `596:4731` → `596:4854` have configured 320 ms and 180 ms transitions. They were inspected structurally, not used as playback proof. The delivered result view comes from the live flow node `457:2210`.
- No live AI identification, intelligent recommendation backend, chatbot, live sea conditions, production account system, or persistent backend was verified.
- Before/after wording describes visible differences. No conversion, usability, or accuracy improvement is claimed.

## Integration

Use the Hero muted, looping, inline, with a visible pause control and a static poster when reduced motion is requested. Core flow should start only when the visitor plays it. Keep the “edited prototype” distinction in the caption. Serve only finished media in the page; source exports are handoff materials.
