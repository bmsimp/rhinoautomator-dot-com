# Archetypes of Automation — Team Capability Assessment

A framework by **Brian Simpson** that helps individuals and teams identify their collective strengths and gaps across **8 dimensions of automation capability** — regardless of industry, size, or technical maturity.

---

## The Framework at a Glance

The core insight: the biggest barrier to automation is not technical skill — it is process thinking, team composition, and role awareness. No single person covers all eight archetypes. Teams assess collectively and use the gap analysis to guide hiring, training, or partnership decisions.

| # | Archetype | What it covers |
|---|-----------|----------------|
| 1 | Process & Knowledge Holding | Understanding, retaining, and communicating how work actually happens |
| 2 | Problem Definition | Identifying, articulating, and prioritizing what is worth automating |
| 3 | Design & Logic Thinking | Translating real-world processes into explicit logic before touching any tool |
| 4 | Communication & Translation | Bridging the gap between process owners and builders |
| 5 | Building & Implementation | Constructing automations using tools, AI, or both |
| 6 | Quality & Oversight | Verifying automations work correctly, including failure scenarios |
| 7 | Human & Organizational Awareness | Managing adoption, resistance, ownership, and compliance |
| 8 | Strategic & Vision Thinking | Connecting automation work to measurable business outcomes |

Each archetype contains 3–5 named sub-archetypes grounded in established frameworks — see [Framework Citations](#framework-citations) below.

---

## Web Tool

**`index.html`** — Open directly in any browser or visit <a href="https://rhinoautomator.com/assessment" target="_blank">rhinoautomator.com/assessment</a>.

**Features:**
- Score capability 0–10 on each of the 8 archetypes using sliders
- Expand any archetype to read sub-archetype descriptions and calibrate your score
- Live radar chart updates as you score
- Total score and individual capability profile shown instantly
- **Export** your assessment to a JSON file to return later
- **Import** a previously exported JSON file to resume or review
- **+ Add to Team Assessment** — push your individual assessment into the shared team view
- **Team Assessment tab** overlays all evaluators on a single radar chart
- Gap analysis ranks archetypes from lowest to highest average score
- **Generate Report** — export a printable PDF of the full team capability report, with optional individual breakdowns and short or long dimension explainers

---

## Repository Structure

```
├── index.html                                  # Web-based assessment tool (GitHub Pages entry point)
├── README.md
├── LICENSE
├── assessment-instructions/
│   ├── Individual Assessment.md                # How to complete an individual assessment
│   ├── Scoring Reference.md                    # Scoring bands and interpretation
│   └── Team Assessment.md                      # How to run a team assessment
└── framework/
    ├── Builders & Implementers.md              # Building & Implementation sub-archetypes
    ├── Communication & Translation.md          # Communication & Translation sub-archetypes
    ├── Design & Logic Thinkers.md              # Design & Logic Thinking sub-archetypes
    ├── Framework Citations.md                  # Full citation index
    ├── Human & Organizational Factors.md       # Human & Organizational Awareness sub-archetypes
    ├── Problem Definers.md                     # Problem Definition sub-archetypes
    ├── Process & Knowledge Holders.md          # Process & Knowledge Holding sub-archetypes
    ├── Quality & Oversight.md                  # Quality & Oversight sub-archetypes
    └── Strategic & Vision.md                   # Strategic & Vision Thinking sub-archetypes
```

---

## Contribute & Feedback

Found an issue, have a suggestion, or want to contribute? Open an issue or pull request on [GitHub](https://github.com/bmsimp/automation-archetypes-assessment).

---

## License

GPL v3 — see [LICENSE](LICENSE).
