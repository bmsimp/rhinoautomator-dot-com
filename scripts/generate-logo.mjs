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
// opentype.js v2's loadSync() is a deprecated no-op stub that returns undefined;
// use parse() on the raw buffer instead (see docs/superpowers/specs/2026-07-10-badge-logo-design.md).
const fontBuffer = fs.readFileSync('scripts/BebasNeue-Regular.ttf');
const font = opentype.parse(fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength));
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
