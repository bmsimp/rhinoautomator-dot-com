# Rhino Automator

**rhinoautomator.com** — Automation Enthusiast · Community Engagement & Education

The website and digital home of **Rhino Automator**, a brand by Brian Simpson focused on helping MSPs and IT teams build automation muscle without needing a dedicated dev team. Practical frameworks, real workflows, and a methodology anyone can contribute to — regardless of technical background.

Built with [Eleventy](https://www.11ty.dev/) and hosted via Cloudflare Pages.

## Developing

```bash
npm install
npm run serve   # local dev server with live reload
npm run build   # writes the site to _site/
```

**Adding a page:** create an `.html` file with front matter — the base layout supplies the head, nav, and footer:

```html
---
title: My Page — Rhino Automator
description: One-sentence summary used for meta description and link previews.
navActive: blog        # which top-nav item to highlight (omit for none)
---
<div class="content">…page content only — no <html>/<head>/<body>…</div>
```

Blog pages get `layout: blog.njk`, `blog: true`, and `navActive: blog` automatically from `blog/blog.11tydata.json`; set `blogActive` in front matter to the sidebar key to highlight (see `_includes/sidebar.njk`), and add the new page's link to that sidebar. Page-specific CSS goes in a `pageCss: |2` front-matter block. URLs mirror source paths exactly (`about/brand.html` → `/about/brand.html`).

---

## What's Here

| Path | What it is |
|------|------------|
| `/` | Home page — brand overview, community engagement, education, and assessment |
| `/about/` | About Me page |
| `/about/brand.html` | Brand guidelines reference (colors, typography, voice) |
| `/framework/` | About the Archetypes of Automation framework |
| `/assessment/` | Archetypes of Automation — interactive team capability assessment tool |
| `/blog/` | Blog landing — guides on automations, integrations, and ConnectWise PSA |
| `/community/seen-me.html` | Where You've Seen Me — articles, videos, open mic contributions |

---

## Archetypes of Automation Assessment

The assessment tool lives at [`/assessment`](https://rhinoautomator.com/assessment) and is built around the **Archetypes of Automation** framework — a self-assessment that scores individuals across 8 dimensions of automation capability, then aggregates team results to visualize coverage and gaps.

- Score 0–10 on each of the 8 archetypes using sliders
- Expand any archetype to read sub-archetype descriptions and calibrate your score
- Live radar chart updates as you score
- Export/import assessments as JSON
- Team view overlays all evaluators on a single radar chart with gap analysis
- Generate a printable PDF team capability report

---

## Repository Structure

```
├── index.html                   # Home page (rhinoautomator.com)
├── about/
│   ├── index.html               # About Me page
│   └── brand.html               # Brand guidelines reference
├── blog/
│   ├── index.html               # Blog landing page
│   ├── blog.css                 # Shared blog styles
│   ├── blog.js                  # Sidebar active-state + expand/collapse behavior
│   ├── blog.11tydata.json       # Directory data: blog layout + nav defaults
│   ├── automations/
│   │   ├── index.html               # Automations category landing
│   │   ├── teams-bot/
│   │   │   ├── index.html             # Overview
│   │   │   ├── acknowledgement.html
│   │   │   ├── considerations.html
│   │   │   ├── working-with-responses.html
│   │   │   ├── resources.html
│   │   │   ├── getting-started/
│   │   │   │   ├── index.html         # The Basics / Getting Started
│   │   │   │   ├── response-handler.html
│   │   │   │   └── getting-teams-ids.html
│   │   │   ├── two-stage-message/
│   │   │   │   ├── index.html         # Two Stage Message Process
│   │   │   │   ├── initial-message.html
│   │   │   │   ├── message-update.html
│   │   │   │   └── message-ids.html
│   │   │   ├── action-buttons/
│   │   │   │   ├── index.html         # Formatting Action Buttons
│   │   │   │   ├── approve-deny.html
│   │   │   │   └── assign-resource.html
│   │   │   └── incident-notifications/
│   │   │       ├── index.html         # System Incident/Maintenance
│   │   │       ├── database.html
│   │   │       └── workflow-structure.html
│   │   └── github-notifications/
│   │       ├── index.html             # Overview
│   │       ├── prerequisites.html
│   │       ├── set-up-basic-workflow.html
│   │       ├── fork-github-repository.html
│   │       ├── set-up-automatic-updates.html
│   │       ├── set-up-notifications.html
│   │       └── remaining-workflow-actions.html
│   ├── integrations/
│   │   ├── index.html                 # Integrations section intro
│   │   └── cw-home/
│   │       ├── index.html             # ConnectWise Home overview
│   │       ├── authentication.html
│   │       └── api-documentation.html
│   └── cw-psa/
│       ├── about.html
│       ├── assigning-resources.html
│       ├── ticket-assignment-note.html
│       ├── unbundle-ticket.html
│       └── sales-activity-note.html
├── community/
│   └── seen-me.html             # Where You've Seen Me — articles, videos, open mic contributions
├── _includes/                   # Eleventy layouts & includes (not published)
│   ├── base.njk                 # Base layout: head/meta/OG, nav, footer
│   ├── blog.njk                 # Blog layout: sidebar + main column (wraps base)
│   ├── nav.njk                  # Navigation bar (active state from navActive)
│   ├── footer.njk               # Footer
│   └── sidebar.njk              # Blog sidebar tree
├── assets/
│   ├── tokens.css               # Shared design tokens & component styles
│   ├── site.js                  # Nav dropdowns, mobile menu, page-nav TOC
│   └── logo/                    # badge.svg, mark.svg, mark-light.svg + CC0 silhouette source
├── scripts/                     # Dev tools, excluded from the Eleventy build
│   ├── generate-logo.mjs        # Regenerates assets/logo/* + favicon.svg (npm run logos)
│   ├── og-card.html             # Source for the social card (keep copy in sync with hero)
│   ├── render-og.py             # Renders og-image.png from og-card.html
│   └── BebasNeue-Regular.ttf    # Font file used to bake wordmark text to SVG paths
├── assessment/
│   └── index.html               # Archetypes of Automation assessment tool
├── framework/
│   └── index.html               # About the Framework page
├── eleventy.config.js           # Build config: exact-URL permalinks, passthrough copy
├── package.json
├── CLAUDE.md
├── README.md
└── LICENSE
```

---

## Contribute & Feedback

Found an issue, have a suggestion, or want to contribute? Open an issue or pull request on [GitHub](https://github.com/bmsimp/rhinoautomator-dot-com).

---

## License

GPL v3 — see [LICENSE](LICENSE).
