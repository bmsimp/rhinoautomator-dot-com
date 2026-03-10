# CLAUDE.md — Project Context for automation-archetypes-assessment

This file provides full context for Claude Code sessions on this project. Read it in full before making any changes.

---

## Project Purpose

This repo supports a conference talk submission titled **"Building Automation Muscle Without a Dev Team"** targeting an MSP/ITSP audience. The core framework is **The Archetypes of Automation** — a self-assessment tool that helps individuals and teams identify their strengths and gaps across 8 dimensions of automation capability.

The talk premise: the biggest barrier to automation in small MSP teams is not technical skill — it's process thinking, team composition, and role awareness. The archetype framework borrows from sports team radar/roster thinking: no one person covers all archetypes, so teams need to assess collectively and identify gaps to fill.

---

## Conference Track

**Community Insights** track at an MSP/ITSP conference. Audience: MSP owners, operations leads, IT consultants — mostly non-developers. The talk is practitioner-level, not theoretical.

---

## The 8 Archetypes (Top-Level Categories)

Each archetype is a cluster of sub-roles. The individual self-assessment scores 0–10 per archetype. Team scores are aggregated and plotted as a radar chart to visualize coverage and gaps.

1. **Process & Knowledge Holding** — Understanding, retaining, and communicating how work actually happens
2. **Problem Definition** — Identifying, articulating, and prioritizing what is worth automating
3. **Design & Logic Thinking** — Translating real-world processes into explicit logic before touching any tool
4. **Communication & Translation** — Bridging the gap between process owners and builders
5. **Building & Implementation** — Constructing automations using tools, AI, or both
6. **Quality & Oversight** — Verifying automations work correctly, including failure scenarios
7. **Human & Organizational Awareness** — Managing adoption, resistance, ownership, and compliance
8. **Strategic & Vision Thinking** — Connecting automation work to measurable business outcomes

---

## Sub-Archetypes (Full List)

### 1. Process & Knowledge Holding
- **The Tribal Knowledge Keeper** — Holds undocumented "real" process knowledge *(Nonaka & Takeuchi — tacit vs. explicit knowledge)*
- **The Exception Whisperer** — Knows every edge case *(FMEA; Agile edge case testing)*
- **The Process Archaeologist** — Understands why processes exist *(Root Cause Analysis; Toyota 5 Whys)*
- **The Documenter** — Translates processes into structured written steps *(BPM documentation standards; Systemology — Jenyns)*

### 2. Problem Definition
- **The Friction Finder** — Identifies where work is slow or painful *(Lean Muda; Making Work Visible — DeGrandis)*
- **The Bottleneck Spotter** — Sees constraints in flow *(Theory of Constraints — Goldratt)*
- **The Scope Realist** — Prevents over-engineering *(Agile MVP; Walking Skeleton pattern)*
- **The Problem Reframer** — Challenges whether the stated problem is the real problem *(Design Thinking — Stanford d.school/IDEO; Jobs To Be Done — Christensen)*

### 3. Design & Logic Thinking
- **The Decision Tree Builder** — Thinks in if/then/else without coding *(Decision Theory; BPMN standards)*
- **The Data Modeler** — Thinks about data flowing through a process *(Data Flow Diagrams; Entity-Relationship modeling)*
- **The Workflow Choreographer** — Thinks in sequences and dependencies *(Critical Path Method; PMBOK)*
- **The Edge Case Hunter** — Proactively hunts failure modes *(FMEA; Pre-Mortem analysis — Gary Klein)*
- **The Simplicity Advocate** — Enforces maintainability *(KISS Principle; Occam's Razor; Lean)*

### 4. Communication & Translation
- **The Bridge Builder** — Translates between technical and non-technical *(Team Topologies — Skelton & Pais; T-shaped skills)*
- **The Stakeholder Whisperer** — Manages the political side of automation *(Kotter's 8-Step; Prosci ADKAR)*
- **The Requirements Articulator** — Converts vague requests into testable requirements *(Agile User Stories; INVEST criteria)*
- **The Trainer** — Ensures work outlives its creator *(Kirkpatrick Model; See One Do One Teach One)*

### 5. Building & Implementation
- **The Rapid Prototyper** — Gets something working fast to test assumptions *(Lean Startup Build-Measure-Learn; Fail Fast)*
- **The Finisher** — Completes the last 20% *(Pareto Principle; Agile Definition of Done)*
- **The Tool Native** — Picks up new platforms intuitively *(Diffusion of Innovations — Rogers, Early Adopter)*
- **The AI Whisperer** — Uses AI as a design and building partner *(Co-Intelligence — Mollick; Prompt Engineering)*
- **The Integration Thinker** — Thinks across system boundaries *(Zachman Framework; API-first design)*

### 6. Quality & Oversight
- **The QA Mindset** — Tests with intent to break *(Software Testing fundamentals; TDD)*
- **The Auditor** — Builds in logging, monitoring, checkpoints *(COBIT; SOC 2; DevOps Observability)*
- **The Risk Modeler** — Evaluates failure impact before deploying *(Risk Matrix; FMEA; ISO 31000)*

### 7. Human & Organizational Awareness
- **The Change Champion** — Drives adoption *(Kotter Step 1 + 4; Prosci ADKAR)*
- **The Skeptic** — Healthy devil's advocate *(Red Team/Blue Team; Pre-Mortem)*
- **The Reluctant Participant** — Represents the average user; their confusion is signal *(Rogers — Late Majority; UAT)*
- **The Compliance Voice** — Asks "is this allowed?" *(GDPR/HIPAA/SOC 2; Privacy by Design — Cavoukian)*
- **The Ownership Taker** — Maintains automations post-launch *(RACI Accountable; DevOps "You Build It, You Run It")*

### 8. Strategic & Vision Thinking
- **The ROI Tracker** — Measures impact *(OKR Framework — Doerr; Lean ROI; Time-on-Task analysis)*
- **The Automation Evangelist** — Drives organizational will *(Diffusion of Innovations — Innovator profile)*
- **The Systems Thinker** — Sees the larger connected whole *(Thinking in Systems — Meadows; Cynefin — Snowden)*

---

## Framework Citation Index

| Framework | Source |
|---|---|
| Theory of Constraints | Goldratt, *The Goal* |
| Lean / Toyota Production System | Ohno; Womack & Jones *Lean Thinking* |
| Design Thinking | IDEO / Stanford d.school |
| Agile / Scrum | Agile Manifesto; Schwaber & Sutherland |
| Diffusion of Innovations | Everett Rogers |
| Kotter's 8-Step Change Model | John Kotter |
| Prosci ADKAR | Jeff Hiatt |
| RACI Matrix | Project Management Institute (PMI) |
| Team Topologies | Skelton & Pais |
| Cynefin Framework | Dave Snowden |
| FMEA | Originally US Military MIL-P-1629; widely adopted |
| Thinking in Systems | Donella Meadows |
| Co-Intelligence / AI Collaboration | Ethan Mollick |
| Tacit vs. Explicit Knowledge | Nonaka & Takeuchi |
| Jobs To Be Done | Clayton Christensen |
| Pre-Mortem Analysis | Gary Klein |

---

## Individual Self-Assessment Rubric (0–10 per archetype)

Each archetype is scored individually, then combined across team members into a radar chart. The scoring bands for each archetype follow this general structure:

| Score | Meaning |
|---|---|
| 0–2 | No awareness or capability; this lens is absent |
| 3–4 | Emerging — some instinct but no structured practice |
| 5–6 | Functional — can contribute meaningfully with some gaps |
| 7–8 | Strong — reliable, practiced, others lean on you here |
| 9–10 | Exceptional — this is a defining strength; you set the standard |

Full scoring bands per archetype are defined in `/assessment/rubric.md`.

---

## Individual Score Interpretation

| Total (out of 80) | Profile |
|---|---|
| 0–20 | Automation Newcomer |
| 21–35 | Developing Contributor |
| 36–50 | Capable Generalist |
| 51–65 | Strong Practitioner |
| 66–80 | Automation All-Rounder |

---

## Team Aggregation

1. Each person scores themselves independently
2. Scores per archetype are plotted on a shared radar (each person = one shape, overlaid)
3. Look for coverage, not duplication — two 9s in Building and zero in Quality is a risk profile
4. The archetype with the lowest combined team score = most urgent investment
5. Use gaps to guide hiring, training, or partnership decisions

---

## Repo Structure (Planned)
├── CLAUDE.md                  # This file — project context for Claude Code
├── README.md                  # Public-facing overview of the framework
├── LICENSE                    # GPL v3
├── assessment/
│   ├── rubric.md              # Full scoring bands for all 8 archetypes
│   └── self-assessment.xlsx   # Excel workbook with radar chart
├── docs/
│   ├── archetypes.md          # Full sub-archetype list with framework citations
│   ├── framework-index.md     # Framework citation reference
│   └── talk-outline.md        # Conference talk structure and notes
└── tools/
└── radar-chart.html       # Standalone HTML/JS interactive radar chart tool

---

## What Still Needs to Be Built

- [ ] **README.md** — Public-facing framework overview (not the talk notes — the repo landing page)
- [ ] **assessment/rubric.md** — Full per-archetype scoring bands extracted from conversation
- [ ] **assessment/self-assessment.xlsx** — Excel workbook: individual scoring sheet + radar chart + team aggregation sheet
- [ ] **docs/archetypes.md** — Full sub-archetype list with descriptions and framework citations
- [ ] **docs/talk-outline.md** — Conference talk structure
- [ ] **tools/radar-chart.html** — Interactive HTML self-assessment tool with live radar chart

---

## Conventions & Notes

- The platform is called **Rewst** (not "REWST") — this is an MSP workflow automation tool and is referenced in talk examples
- Target audience is non-technical MSP practitioners, not developers
- The radar/roster analogy is central to the talk — teams pick members to cover as many archetypes as possible, like a sports roster
- Framework citations are intentional and should be preserved — they add academic credibility to what could otherwise seem like opinion
- The talk is being submitted to a convention with 4 tracks: ITSP Success, Community Insights, Tech Trends, Vendor Education — this submission targets **Community Insights**
---

## Repo Structure (Planned)
