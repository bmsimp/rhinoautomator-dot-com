# Rhino Automator Badge Logo — Design Spec

**Date:** 2026-07-10
**Status:** Approved direction from visual brainstorm (hex badge, "edge-to-edge plate + inner frame" variant)

## Goal

Give the brand an actual mark. Today the identity is a Bebas Neue text wordmark, a 🦏 emoji favicon, and a text-only OG image. This work adds a hexagonal rhino badge and deploys it across the site's identity surfaces plus the home hero.

## The mark

A hexagonal badge on the site's dark background:

- **Outer frame:** regular hexagon (flat left/right sides, points top/bottom), stroke `var(--cobalt)` #3B82F6, weight ~3.5 units on a 200-unit canvas.
- **Inner outline:** thin secondary outline in `var(--border)` #243044 around the rhino field, above the plate (crest feel).
- **Rhino:** mid-stride white-rhino silhouette, filled `var(--silver)` #D1DCE8, centered in the upper field, facing left.
- **Name plate:** solid `var(--cobalt)` horizontal bar across the lower badge, **clipped to the hexagon outline** so its ends terminate flush with the angled frame sides (this was the round-two cleanup). Text "RHINO AUTOMATOR" in Bebas Neue, white, letter-spaced, centered on the plate.

Reference geometry (200×200 viewBox, from the approved mockup):
- Hexagon: `100,8 176,52 176,140 100,184 24,140 24,52`
- Inner outline: `100,20 166,58 166,124 34,124 34,58`
- Plate: rect y=130, height=26, full width, `clip-path` to the outer hexagon
- Rhino: nested SVG at approximately x=36 y=56 w=128 h=62

### Silhouette provenance

PhyloPic vector silhouette of *Ceratotherium simum simum* (southern white rhinoceros), image UUID `7f867be1-815c-4fe4-a341-be7c22970890`, licensed **CC0 1.0 (public domain — no attribution required)**. Vector source: `https://images.phylopic.org/images/7f867be1-815c-4fe4-a341-be7c22970890/vector.svg`. The path data is committed to this repo (see assets) so the build has no external dependency; the UUID is recorded here for provenance.

## Asset architecture

Two derivative assets from one design, both committed under `assets/logo/`:

| Asset | Contents | Used for |
|---|---|---|
| `assets/logo/badge.svg` | Full badge (frame + rhino + plate + name) | Hero, OG image, brand page, slides/stickers |
| `assets/logo/mark.svg` | Compact mark: hexagon + rhino only — no plate/text | Favicon, nav, avatars, any use below ~64px |

**Text-to-paths requirement:** standalone SVG files do not load webfonts, so `badge.svg` must carry the plate text as literal `<path>` outlines, not a `<text>` element. A one-time dev script (Node + `opentype.js`, using the Bebas Neue font file from Google Fonts) converts the string to path data that gets baked into `badge.svg`. The script is a dev tool, not part of the Eleventy build. After this bake, both assets render correctly in every context (`<img>`, favicon, no-CSS) with zero font dependency.

The compact mark intentionally has no text — the plate is illegible below ~48px, which is exactly where the compact mark takes over.

## Deployments

1. **Favicon** — replace the 🦏 emoji in `favicon.svg` with the compact mark, keeping the existing dark rounded-square tile (#0C1016) behind it so the icon works on light browser chrome.
2. **Nav** — in `_includes/nav.njk`, place the compact mark (~26px) to the left of the existing "RHINO AUTOMATOR" logo text. One edit propagates to all pages via the base layout. The text wordmark itself is unchanged.
3. **OG image** — regenerate `og-image.png` (1200×630): headline text block on the left (as today), full badge anchoring the right side. Same Playwright HTML-render pipeline used to create the current image.
4. **Home hero** — the badge becomes the hero's visual anchor, filling the currently empty right half: text column left, full badge (~300px) right, vertically centered. At ≤768px the badge drops below the text at reduced size (~180px). This closes the previously parked "hero signature" item.
5. **Brand page** (`about/brand.html`) — new "Logo" section: full badge and compact mark displayed on dark tiles, with usage rules — dark backgrounds are primary; minimum sizes (badge ≥ 96px, mark ≥ 16px); don't recolor, rotate, or separate the rhino from the frame; clear space of half the hexagon's width on all sides.
6. **Assessment PDF report** — the generated report header (`.rh-logo` in `assessment/index.html`) currently uses the 🦏 emoji; replace with the mark (inline SVG in the generated document).

## Out of scope

- **Light-background variant.** All current surfaces are dark. If a light context appears later (print, third-party sites), design a variant then.
- **Wordmark changes.** The Bebas Neue text treatment stays exactly as-is.
- **Old mockup directions.** The ring badge and broken-ring lockup concepts from the brainstorm are not deliverables.

## Verification

- `npm run build`, serve `_site`, then screenshot: home (hero badge, desktop + 390px stacking), nav on a blog page, brand page logo section.
- Favicon checked at rendered 16px (browser tab or 16px render) — the hexagon and rhino must still read.
- OG image re-rendered and visually checked at full size and thumbnail size.
- Assessment report generated once to confirm the header mark renders.

## Design history (for context)

Brainstorm progression: four hand-sketched geometric directions (rejected — too crude, wrong aesthetic) → aesthetic pinned to "bold badge/emblem" → three compositions on CC0 PhyloPic silhouettes (ring badge, horn-breaks-ring, hex badge) → hex badge chosen → plate-spill cleanup round → **"edge-to-edge plate + inner frame" approved**. Mockups live in `.superpowers/brainstorm/` (gitignored); the approved geometry is captured above.
