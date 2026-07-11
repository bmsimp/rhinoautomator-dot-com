# Badge Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate the approved hexagonal rhino badge as SVG assets and deploy them to favicon, nav, OG image, home hero, brand page, and the assessment report.

**Architecture:** One Node generator script (`scripts/generate-logo.mjs`) is the single source of truth: it reads the committed CC0 rhino silhouette and the Bebas Neue font file, and emits `assets/logo/badge.svg` (plate text baked to paths), `assets/logo/mark.svg`, `assets/logo/mark-light.svg` (report-only ink variant), and `favicon.svg`. Deployments then reference these files with `<img>`/`href` — no inline duplication. The site builds with Eleventy (`npx @11ty/eleventy` → `_site/`); `assets/` is already passthrough-copied.

**Tech Stack:** Node 24, opentype.js (text→path), Eleventy 3, Python + Playwright (renders/screenshots, already installed).

**Spec:** `docs/superpowers/specs/2026-07-10-badge-logo-design.md`

**Repo conventions:** work on branch `feat/badge-logo`; conventional commits ending with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`; verification is command/screenshot-based (no unit-test framework in this static-site repo — each task's "test" is a build + programmatic check).

---

### Task 0: Branch + source materials

**Files:**
- Create: `assets/logo/rhino-silhouette.svg` (verbatim PhyloPic download)
- Create: `scripts/BebasNeue-Regular.ttf`
- Modify: `eleventy.config.js` (ignore `scripts/`)

- [ ] **Step 1: Create branch**

```bash
cd /c/Users/simps/OneDrive/Documents/GitHub/rhinoautomator-dot-com
git checkout -b feat/badge-logo
```

- [ ] **Step 2: Download the CC0 silhouette (PhyloPic UUID from the spec) and the font**

```bash
mkdir -p assets/logo scripts
curl -s -o assets/logo/rhino-silhouette.svg "https://images.phylopic.org/images/7f867be1-815c-4fe4-a341-be7c22970890/vector.svg"
curl -sL -o scripts/BebasNeue-Regular.ttf "https://github.com/google/fonts/raw/main/ofl/bebasneue/BebasNeue-Regular.ttf"
```

- [ ] **Step 3: Verify both downloads**

```bash
head -c 200 assets/logo/rhino-silhouette.svg   # expect: <?xml ...<svg ... viewBox="0 0 <W> <H>"
file scripts/BebasNeue-Regular.ttf             # expect: TrueType Font data
grep -c "<path" assets/logo/rhino-silhouette.svg   # expect: >= 1
```

If the PhyloPic URL fails, the same file exists in `.superpowers/brainstorm/*/content/rhinos/rhino5.svg` — copy it from there instead.

- [ ] **Step 4: Keep `scripts/` out of the Eleventy build** (otherwise any `.html` file added there later would be published wrapped in the base layout)

In `eleventy.config.js`, immediately before the `return {` line, add:

```js
  eleventyConfig.ignores.add('scripts/**');
```

- [ ] **Step 5: Confirm the build still works and output is unchanged**

```bash
npx @11ty/eleventy 2>&1 | tail -1   # expect: "Copied 6 Wrote 42 files ..."
```

- [ ] **Step 6: Commit**

```bash
git add assets/logo/rhino-silhouette.svg scripts/BebasNeue-Regular.ttf eleventy.config.js
git commit -m "feat(logo): add CC0 rhino silhouette (PhyloPic 7f867be1) and Bebas Neue font file

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 1: Logo generator script + assets

**Files:**
- Create: `scripts/generate-logo.mjs`
- Create (generated): `assets/logo/badge.svg`, `assets/logo/mark.svg`, `assets/logo/mark-light.svg`
- Modify (generated): `favicon.svg`
- Modify: `package.json` (devDependency + script)

- [ ] **Step 1: Install opentype.js**

```bash
npm install --save-dev opentype.js
```

- [ ] **Step 2: Write `scripts/generate-logo.mjs`**

```js
// Generates the Rhino Automator logo assets from the committed CC0 silhouette.
// Run: npm run logos
// Spec: docs/superpowers/specs/2026-07-10-badge-logo-design.md
import fs from 'node:fs';
import opentype from 'opentype.js';

const SILVER = '#D1DCE8';
const COBALT = '#3B82F6';
const BORDER = '#243044';
const BG = '#0C1016';
const INK = '#1A1F36'; // assessment report text color (light-background report variant only)

const src = fs.readFileSync('assets/logo/rhino-silhouette.svg', 'utf8');
const viewBox = src.match(/viewBox="([\d. ]+)"/)[1];
const gSrc = src.slice(src.indexOf('<g'), src.lastIndexOf('</g>') + 4);

const rhino = (x, y, w, h, color) => {
  const g = gSrc.replace('fill="#000000"', `fill="${color}"`);
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">${g}</svg>`;
};

const HEX = '100,8 176,52 176,140 100,184 24,140 24,52';
const HEX_INNER = '100,20 166,58 166,124 34,124 34,58';

// Bake the plate text to paths so the SVG has zero font dependency.
const font = opentype.loadSync('scripts/BebasNeue-Regular.ttf');
const TEXT = 'RHINO AUTOMATOR';
const SIZE = 16;
const opts = { kerning: true, letterSpacing: 0.13 };
const textWidth = font.getAdvanceWidth(TEXT, SIZE, opts);
const textD = font.getPath(TEXT, 100 - textWidth / 2, 148.8, SIZE, opts).toPathData(2);

const badge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><clipPath id="ra-hexclip"><polygon points="${HEX}"/></clipPath></defs>
  <polygon points="${HEX}" fill="none" stroke="${COBALT}" stroke-width="3.5"/>
  <polygon points="${HEX_INNER}" fill="none" stroke="${BORDER}" stroke-width="1.5"/>
  ${rhino(36, 56, 128, 62, SILVER)}
  <rect x="20" y="130" width="160" height="26" fill="${COBALT}" clip-path="url(#ra-hexclip)"/>
  <path d="${textD}" fill="#FFFFFF"/>
</svg>
`;

// Compact mark: heavier frame + bigger rhino so it reads at 16px. No text by design.
const markInner = (rhinoColor, stroke) =>
  `<polygon points="${HEX}" fill="none" stroke="${stroke}" stroke-width="6"/>
  ${rhino(30, 55, 140, 80, rhinoColor)}`;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  ${markInner(SILVER, COBALT)}
</svg>
`;

// Report-only variant for the white assessment PDF (silver is illegible on white).
const markLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  ${markInner(INK, COBALT)}
</svg>
`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="${BG}"/>
  <svg x="6" y="6" width="88" height="88" viewBox="0 0 200 200">
    <polygon points="${HEX}" fill="none" stroke="${COBALT}" stroke-width="9"/>
    ${rhino(30, 55, 140, 80, SILVER)}
  </svg>
</svg>
`;

fs.writeFileSync('assets/logo/badge.svg', badge);
fs.writeFileSync('assets/logo/mark.svg', mark);
fs.writeFileSync('assets/logo/mark-light.svg', markLight);
fs.writeFileSync('favicon.svg', favicon);
console.log('wrote assets/logo/{badge,mark,mark-light}.svg and favicon.svg');
```

- [ ] **Step 3: Add npm script**

```bash
npm pkg set scripts.logos="node scripts/generate-logo.mjs"
```

- [ ] **Step 4: Run it and check outputs exist and are well-formed**

```bash
npm run logos
grep -c "svg" assets/logo/badge.svg          # expect >= 1
grep -c "<text" assets/logo/badge.svg        # expect 0 (text must be baked to paths)
grep -c "path d=" assets/logo/badge.svg      # expect >= 2 (rhino + text outlines)
```

- [ ] **Step 5: Visual check at full size AND small size**

Write a throwaway HTML file in the scratchpad (not the repo) that shows `badge.svg` at 300px, `mark.svg` at 64px and 16px, `favicon.svg` at 16px, and `mark-light.svg` at 52px on a white strip; render it with the Python/Playwright pattern used earlier (`file://` load, screenshot) and **look at the screenshot**. Pass criteria: plate text legible and centered at 300px; hexagon + rhino recognizable at 16px; ink rhino visible on white.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-logo.mjs assets/logo/ favicon.svg package.json package-lock.json
git commit -m "feat(logo): hexagonal badge generator and SVG assets, rhino favicon

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Nav mark

**Files:**
- Modify: `_includes/nav.njk` (the `.logo` anchor)
- Modify: `assets/tokens.css` (`.site-nav .logo` rules)

- [ ] **Step 1: Update the logo anchor in `_includes/nav.njk`**

Replace:

```html
  <a href="/" class="logo">RHINO <span>AUTOMATOR</span></a>
```

with:

```html
  <a href="/" class="logo"><img class="logo-mark" src="/assets/logo/mark.svg" width="26" height="26" alt=""/><span class="logo-text">RHINO <span>AUTOMATOR</span></span></a>
```

(`alt=""` is correct — the adjacent text is the accessible name.)

- [ ] **Step 2: Update `assets/tokens.css`**

Replace:

```css
.site-nav .logo {
  font-family: var(--ff-display); font-size: var(--fs-nav-logo); letter-spacing: 0.07em;
  color: var(--text); text-decoration: none;
}
.site-nav .logo span { color: var(--silver); }
```

with:

```css
.site-nav .logo {
  font-family: var(--ff-display); font-size: var(--fs-nav-logo); letter-spacing: 0.07em;
  color: var(--text); text-decoration: none;
  display: flex; align-items: center; gap: 10px;
}
.site-nav .logo .logo-text span { color: var(--silver); }
```

(The selector must become `.logo-text span` — a bare `.logo span` would now also hit `.logo-text` itself and turn "RHINO" silver.)

- [ ] **Step 3: Build and screenshot a page's nav**

```bash
npx @11ty/eleventy 2>&1 | tail -1
```

Serve `_site` (`python -m http.server <port> --bind 127.0.0.1` from `_site/`, via the with_server.py helper used previously) and screenshot `/` and one blog page at 1440px, plus `/` at 390px with the hamburger opened. Pass criteria: mark sits left of the wordmark, vertically centered, on every page type; mobile menu unaffected.

- [ ] **Step 4: Commit**

```bash
git add _includes/nav.njk assets/tokens.css
git commit -m "feat(nav): compact rhino mark beside the wordmark

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Home hero badge

**Files:**
- Modify: `index.html` (front matter `pageCss` + hero markup)

- [ ] **Step 1: Update hero markup in `index.html`**

Replace:

```html
  <div class="hero-bleed">
    <section class="hero">
      <div class="hero-tag">// AUTOMATION ENTHUSIAST · COMMUNITY ENGAGEMENT & EDUCATION</div>
      <h1>MAKING AUTOMATION<br/><span class="silver">ACCESSIBLE.</span></h1>
      <p class="hero-sub">Helping MSPs and IT teams build automation muscle — without needing a dedicated dev team. Practical frameworks, real workflows, and a methodology anyone can contribute to.</p>
    </section>
  </div>
```

with:

```html
  <div class="hero-bleed">
    <section class="hero">
      <div class="hero-text">
        <div class="hero-tag">// AUTOMATION ENTHUSIAST · COMMUNITY ENGAGEMENT & EDUCATION</div>
        <h1>MAKING AUTOMATION<br/><span class="silver">ACCESSIBLE.</span></h1>
        <p class="hero-sub">Helping MSPs and IT teams build automation muscle — without needing a dedicated dev team. Practical frameworks, real workflows, and a methodology anyone can contribute to.</p>
      </div>
      <img class="hero-badge" src="/assets/logo/badge.svg" alt="Rhino Automator badge" width="300" height="300"/>
    </section>
  </div>
```

- [ ] **Step 2: Add hero-layout rules to the `pageCss` front-matter block in `index.html`**

Inside the existing `pageCss: |2` block, extend the `.hero` rule and add badge rules (keep every existing rule; the `.hero` selector gains the flex line):

```css
  .hero {
    max-width: 1100px; margin: 0 auto; padding: 80px 32px 64px;
    display: flex; align-items: center; justify-content: space-between; gap: 48px;
  }
  .hero-badge { width: 300px; height: auto; flex-shrink: 0; }
```

And extend the existing `@media (max-width: 600px)` block's sibling — add a new query after the `.hero-sub` rule:

```css
  @media (max-width: 768px) {
    .hero { flex-direction: column; align-items: flex-start; }
    .hero-badge { width: 180px; align-self: center; }
  }
```

(Front-matter reminder: every line inside `pageCss: |2` must keep at least 2 spaces of indentation or the YAML block ends early and the build fails with a front-matter error.)

- [ ] **Step 3: Build + screenshot desktop and mobile**

```bash
npx @11ty/eleventy 2>&1 | tail -1
```

Screenshot `/` at 1440px and 390px. Pass criteria: desktop — badge fills the hero's right side, vertically centered, text column unchanged; 390px — badge appears below the text, centered, ~180px; no horizontal scrollbar.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(hero): badge as the home hero visual anchor

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: OG image with badge

**Files:**
- Create: `scripts/og-card.html`
- Create: `scripts/render-og.py`
- Modify (generated): `og-image.png`

- [ ] **Step 1: Write `scripts/og-card.html`** (committed source for the social card — previously this lived only in a temp scratchpad)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: linear-gradient(140deg, #0C1016 0%, #141B24 100%);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 80px; position: relative;
  }
  .text { max-width: 720px; }
  .tag {
    font-family: 'DM Mono', monospace; font-size: 20px; color: #34D399;
    letter-spacing: 0.14em; margin-bottom: 30px;
  }
  h1 {
    font-family: 'Bebas Neue', sans-serif; font-size: 110px; line-height: 0.94;
    letter-spacing: 0.04em; color: #F0F6FF; font-weight: 400;
  }
  h1 .silver { color: #D1DCE8; }
  .brand {
    position: absolute; bottom: 52px; left: 80px;
    font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 0.07em; color: #F0F6FF;
  }
  .brand span { color: #8B9EB8; }
  .badge { width: 360px; flex-shrink: 0; }
  .rule { position: absolute; bottom: 0; left: 0; right: 0; height: 10px; background: #3B82F6; }
</style>
</head>
<body>
  <div class="text">
    <div class="tag">// AUTOMATION ENTHUSIAST · COMMUNITY ENGAGEMENT &amp; EDUCATION</div>
    <h1>MAKING AUTOMATION<br/><span class="silver">ACCESSIBLE.</span></h1>
  </div>
  <img class="badge" src="../assets/logo/badge.svg" alt=""/>
  <div class="brand">RHINO <span>AUTOMATOR</span> · RHINOAUTOMATOR.COM</div>
  <div class="rule"></div>
</body>
</html>
```

- [ ] **Step 2: Write `scripts/render-og.py`**

```python
"""Render og-image.png from scripts/og-card.html. Run from the repo root:
python scripts/render-og.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1200, 'height': 630})
    page.goto((root / 'scripts' / 'og-card.html').as_uri())
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(800)
    page.screenshot(path=str(root / 'og-image.png'))
    browser.close()
print('wrote og-image.png')
```

- [ ] **Step 3: Render and inspect**

```bash
python scripts/render-og.py
```

Look at `og-image.png`. Pass criteria: headline left without clipping, badge right at ~360px with the plate text legible, brand line at the bottom clear of the headline. If the headline and badge collide, reduce `h1` font-size to 96px in `og-card.html` and re-render.

- [ ] **Step 4: Commit**

```bash
git add scripts/og-card.html scripts/render-og.py og-image.png
git commit -m "feat(og): social card source with badge, regenerated og-image

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Brand page logo section

**Files:**
- Modify: `about/brand.html`

- [ ] **Step 1: Locate the Quick Reference section label**

```bash
grep -n "05 — Quick Reference\|05 &#8212; Quick Reference\|Quick Reference" about/brand.html
```

The page's sections are numbered `01 — Color System` … `05 — Quick Reference` in `.section-label` divs (the agent-rebuilt page may encode the em-dash as a literal `—`; match whatever grep shows).

- [ ] **Step 2: Insert the Logo section immediately BEFORE the Quick Reference label, and renumber Quick Reference to 06**

Insert (adjusting the em-dash encoding to match the file's existing labels):

```html
    <div class="section-label">05 — Logo</div>
    <h2 id="logo">LOGO</h2>
    <p>The mark is a hexagonal badge built on a public-domain white-rhino silhouette (PhyloPic, CC0). The full badge carries the name plate; the compact mark drops it below 64px, where the plate text stops being legible.</p>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div class="card" style="text-align:center">
        <img src="/assets/logo/badge.svg" alt="Full Rhino Automator badge" width="220" height="220"/>
        <div class="card-label" style="margin-top:12px">Full badge</div>
        <p style="margin-bottom:0">Hero, social cards, slides, stickers. Minimum size 96px.</p>
      </div>
      <div class="card" style="text-align:center">
        <img src="/assets/logo/mark.svg" alt="Compact Rhino Automator mark" width="160" height="160"/>
        <div class="card-label" style="margin-top:12px">Compact mark</div>
        <p style="margin-bottom:0">Nav, favicon, avatars, any use below 64px. Minimum size 16px.</p>
      </div>
    </div>

    <ul>
      <li><strong>Dark backgrounds are primary.</strong> The badge is designed for the site's dark surfaces; a report-specific ink variant exists for the white assessment PDF only.</li>
      <li><strong>Clear space:</strong> keep at least half the hexagon's width clear on all sides.</li>
      <li><strong>Don't</strong> recolor, rotate, outline, or separate the rhino from its frame.</li>
    </ul>
```

Then change the existing Quick Reference label text from `05 — Quick Reference` to `06 — Quick Reference`.

Match the surrounding page's markup conventions when inserting (check how neighboring sections wrap content — if the page wraps section bodies in a container div, place the block inside it the same way).

- [ ] **Step 3: Build + screenshot the brand page**

```bash
npx @11ty/eleventy 2>&1 | tail -1
```

Screenshot `/about/brand.html`. Pass criteria: new section renders between sections 04 and 06, both logo tiles show, the page-nav TOC on the right picks up "LOGO" automatically (it builds from `h2[id]`), and section numbering reads 01–06 with no duplicate 05.

- [ ] **Step 4: Commit**

```bash
git add about/brand.html
git commit -m "docs(brand): logo section with usage rules

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Assessment report mark

**Files:**
- Modify: `assessment/index.html` (report-generator string, around the `.rh-logo` usage)

- [ ] **Step 1: Find the emoji in the generated-report HTML string**

```bash
grep -n "rh-logo" assessment/index.html
```

Expect two hits: the `.rh-logo` CSS rule inside the report's `<style>` string, and a line like `h += '...<div class="rh-logo">🦏</div>...'` (the emoji may appear as a literal glyph or an entity like `&#129423;`).

- [ ] **Step 2: Replace the emoji with the report ink mark**

In the `h +=` line, replace the emoji/entity inside `<div class="rh-logo">…</div>` with:

```html
<img src="/assets/logo/mark-light.svg" width="52" height="52" alt=""/>
```

The report window is opened from the same origin, so the absolute path resolves. `mark-light.svg` is the ink-on-white variant generated in Task 1 (silver would be illegible on the white report).

Also update the `.rh-logo` CSS rule in the report style string from a font-size rule to a layout rule:

```css
.rh-logo { width:52px; height:52px; }
```

- [ ] **Step 3: Verify in the browser**

Build and serve `_site`, open `/assessment/`, add one dummy assessment via the wizard (name only, default sliders, complete all steps), then click Generate Report and confirm the report window/print view shows the hexagon mark instead of the emoji. If driving the wizard via Playwright is awkward, a minimum check is: `grep -c "mark-light" _site/assessment/index.html` → `1`, plus loading `/assets/logo/mark-light.svg` directly returns the SVG.

- [ ] **Step 4: Commit**

```bash
git add assessment/index.html
git commit -m "feat(assessment): badge mark replaces emoji in generated report header

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Final verification + hand back

- [ ] **Step 1: Full build + URL parity guard**

```bash
npx @11ty/eleventy 2>&1 | tail -1    # expect: Wrote 42 files
git ls-tree -r main --name-only | grep '\.html$' | grep -v '^_includes/' | sort > /tmp/old_urls.txt
(cd _site && find . -name '*.html' | sed 's|^\./||' | sort) > /tmp/new_urls.txt
diff /tmp/old_urls.txt /tmp/new_urls.txt && echo "URL PARITY OK"
```

Also confirm the new assets land in the output: `ls _site/assets/logo/` → `badge.svg mark.svg mark-light.svg rhino-silhouette.svg` and `ls _site/scripts 2>&1` → error/absent (ignored from build).

- [ ] **Step 2: Screenshot sweep**

Serve `_site` and capture: `/` (1440 + 390), a blog article, `/about/brand.html`, `/assessment/`, favicon rendered at 16px. Review each against the pass criteria in Tasks 2–6.

- [ ] **Step 3: Push branch for preview deployment**

```bash
git push -u origin feat/badge-logo
```

Cloudflare Pages builds a preview URL for the branch. Hand back to the user to eyeball the preview (especially the hero and their browser tab's favicon) before merging to `main`.

---

## Self-review notes

- Spec coverage: mark (Task 1), favicon (Task 1), nav (Task 2), hero (Task 3), OG (Task 4), brand page (Task 5), report (Task 6), verification (Task 7). Out-of-scope items untouched. The report needed a light-ink variant; the spec's report requirement wins over the no-light-variant exclusion, scoped to `mark-light.svg` and documented on the brand page.
- The generator embeds the silhouette via nested `<svg viewBox>` scaling, the same technique validated in the brainstorm mockups.
- Types/names consistent: `badge.svg` / `mark.svg` / `mark-light.svg` referenced identically across Tasks 1–6.
