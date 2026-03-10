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

**`index.html`** — Open directly in any browser or visit the GitHub Pages site.

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

**Individual Assessment workflow:**
1. Open `index.html` in your browser
2. Enter the name of the person being assessed (e.g. "Jane Smith, Operations Lead")
3. Score their capability 0–10 on each archetype — expand each section and ask: *does this person demonstrate these characteristics?*
4. Click **Export** to save the assessment as a `.json` file
5. Click **+ Add to Team Assessment** to include them in the team view
6. To resume later: open the tool again and click **Import**

**Team Assessment workflow:**
1. Collect individual assessments from each team member
2. Each person completes their own assessment on the Individual Assessment tab and clicks **+ Add to Team Assessment**
3. Or share exported `.json` files with a facilitator who imports them via the Team Assessment tab
4. Where radars diverge on an archetype, that disagreement is worth discussing
5. Where all evaluators score an archetype low, that is your most urgent gap
6. Click **Generate Report** to produce a printable PDF of the full team capability profile
7. Export the combined set to share or revisit

**GitHub Pages:** Enable GitHub Pages on this repository (Settings → Pages → Deploy from branch: `main`, folder: `/`) and the tool will be available at `https://<your-org>.github.io/<repo-name>/`.

---

## Scoring Reference

### Per-Archetype Bands

| Score | Meaning |
|-------|---------|
| 0–2 | No demonstrated capability in this area |
| 3–4 | Emerging — shows instinct but no consistent, structured practice |
| 5–6 | Functional — can contribute meaningfully, but with notable gaps |
| 7–8 | Strong — reliable and practiced; others lean on them here |
| 9–10 | Exceptional — a defining strength; sets the standard |

### Individual Capability Profile (Total out of 80)

| Total | Profile |
|-------|---------|
| 0–20 | Automation Newcomer |
| 21–35 | Developing Contributor |
| 36–50 | Capable Generalist |
| 51–65 | Strong Practitioner |
| 66–80 | Automation All-Rounder |

---

## Repository Structure

```
├── index.html      # Web-based assessment tool (GitHub Pages entry point)
├── README.md
├── LICENSE         # GPL v3
└── CLAUDE.md       # Project context for Claude Code sessions
```

---

## Framework Citations

The sub-archetypes are grounded in established management, systems, and process frameworks:

| Framework | Source |
|-----------|--------|
| Theory of Constraints | Eliyahu M. Goldratt & Jeff Cox, *The Goal: A Process of Ongoing Improvement* (1984) |
| Lean / Toyota Production System | Taiichi Ohno, *Toyota Production System: Beyond Large-Scale Production* (1988); James P. Womack & Daniel T. Jones, *Lean Thinking* (1996) |
| Design Thinking | IDEO, [The Field Guide to Human-Centered Design](https://www.designkit.org/); Stanford d.school, [Design Thinking Resources](https://dschool.stanford.edu/resources) |
| Agile / Scrum | Beck et al., [Manifesto for Agile Software Development](https://agilemanifesto.org/) (2001); Jeff Sutherland & Ken Schwaber, [The Scrum Guide](https://scrumguides.org/) |
| Diffusion of Innovations | Everett M. Rogers, *Diffusion of Innovations* (5th ed., 2003) |
| Kotter's 8-Step Change Model | John P. Kotter, *Leading Change* (1996) |
| Prosci ADKAR | Jeff Hiatt, *ADKAR: A Model for Change in Business, Government and Our Community* (2006); [Prosci ADKAR Model Overview](https://www.prosci.com/methodology/adkar) |
| RACI Matrix | Project Management Institute, *A Guide to the Project Management Body of Knowledge (PMBOK Guide)* |
| Team Topologies | Matthew Skelton & Manuel Pais, *Team Topologies: Organizing Business and Technology Teams for Fast Flow* (2019); [teamtopologies.com](https://teamtopologies.com/) |
| Cynefin Framework | Dave Snowden & Mary Boone, ["A Leader's Framework for Decision Making"](https://hbr.org/2007/11/a-leaders-framework-for-decision-making) (*Harvard Business Review*, 2007) |
| FMEA | US Military Procedure MIL-P-1629 (1949); [ASQ FMEA Overview](https://asq.org/quality-resources/fmea) |
| Thinking in Systems | Donella H. Meadows, *Thinking in Systems: A Primer* (2008, posthumous ed.) |
| Co-Intelligence / AI Collaboration | Ethan Mollick, *Co-Intelligence: Living and Working with AI* (2024); [One Useful Thing](https://www.oneusefulthing.org/) (Substack) |
| Tacit vs. Explicit Knowledge | Ikujiro Nonaka & Hirotaka Takeuchi, *The Knowledge-Creating Company* (1995) |
| Jobs To Be Done | Clayton M. Christensen, Taddy Hall, Karen Dillon & David S. Duncan, *Competing Against Luck: The Story of Innovation and Customer Choice* (2016) |
| Pre-Mortem Analysis | Gary Klein, ["Performing a Project Premortem"](https://hbr.org/2007/09/performing-a-project-premortem) (*Harvard Business Review*, 2007) |

---

## Contribute & Feedback

Found an issue, have a suggestion, or want to contribute? Open an issue or pull request on [GitHub](https://github.com/bmsimp/automation-archetypes-assessment).

---

## License

GPL v3 — see [LICENSE](LICENSE).
