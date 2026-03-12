# Rhino Automator

**rhinoautomator.com** — Automation Enthusiast · Community Engagement & Education

The website and digital home of **Rhino Automator**, a brand by Brian Simpson focused on helping MSPs and IT teams build automation muscle without needing a dedicated dev team. Practical frameworks, real workflows, and a methodology anyone can contribute to — regardless of technical background.

Hosted via Cloudflare Pages.

---

## What's Here

| Path | What it is |
|------|------------|
| `/` | Home page — brand overview, community engagement, education, and assessment |
| `/framework/` | About the Archetypes of Automation framework |
| `/assessment` | Archetypes of Automation — interactive team capability assessment tool |
| `/brand.html` | Brand guidelines reference (colors, typography, voice) |

---

## Archetypes of Automation Assessment

The assessment tool lives at [`/assessment`](https://rhinoautomator.com/assessment) and is built around the **Archetypes of Automation** framework — a self-assessment that scores individuals across 8 dimensions of automation capability, then aggregates team results to visualize coverage and gaps.

- Score 0–10 on each of the 8 archetypes using sliders
- Expand any archetype to read sub-archetype descriptions and calibrate your score
- Live radar chart updates as you score
- Export/import assessments as JSON
- Team view overlays all evaluators on a single radar chart with gap analysis
- Generate a printable PDF team capability report

The framework itself (sub-archetype definitions, scoring reference, and instructions) lives in the [`assessment-instructions/`](assessment-instructions/) and [`framework/`](framework/) directories.

---

## Repository Structure

```
├── index.html                                  # Home page (rhinoautomator.com)
├── brand.html                                  # Brand guidelines reference
├── _includes/
│   ├── nav.html                                # Shared navigation bar (loaded via JS)
│   ├── footer.html                             # Shared footer (loaded via JS)
│   └── components.js                           # Loader script for shared components
├── assessment/
│   └── index.html                              # Archetypes of Automation assessment tool
├── framework/
│   ├── index.html                              # About the Framework page
│   ├── Builders & Implementers.md
│   ├── Communication & Translation.md
│   ├── Design & Logic Thinkers.md
│   ├── Framework Citations.md
│   ├── Human & Organizational Factors.md
│   ├── Problem Definers.md
│   ├── Process & Knowledge Holders.md
│   ├── Quality & Oversight.md
│   └── Strategic & Vision.md
├── assessment-instructions/
│   ├── Individual Assessment.md
│   ├── Scoring Reference.md
│   └── Team Assessment.md
├── README.md
└── LICENSE
```

---

## Contribute & Feedback

Found an issue, have a suggestion, or want to contribute? Open an issue or pull request on [GitHub](https://github.com/bmsimp/rhinoautomator-dot-com).

---

## License

GPL v3 — see [LICENSE](LICENSE).
