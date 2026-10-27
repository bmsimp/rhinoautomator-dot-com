# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

MSP owners, operations leads, and IT consultants at small MSPs and IT teams, mostly non-developers. They are practitioners who want automation to work in their shop but don't have a dedicated developer, and they tend to assume the barrier is technical skill. Secondary audience: conference attendees and Rewst community members who meet Brian Simpson through talks, open mics, and the blog and arrive to learn more.

## Product Purpose

rhinoautomator.com is the personal-brand site of Brian Simpson (the Rhino Automator). It exists to help MSPs and IT teams build automation muscle without a dev team, through the Archetypes of Automation framework and self-assessment, practical Rewst and automation guides, consulting, and community education.

Success for a visitor is that they take the assessment. Consulting, the blog, and the talk and community pages are secondary paths that build trust and feed that outcome.

## Positioning

The biggest barrier to automation in a small MSP is not technical skill. It is process thinking, team composition, and role awareness. The Archetypes of Automation framework maps 8 dimensions of capability and borrows from sports roster thinking: no one person covers every archetype, so a team assesses collectively, overlays its scores on a radar chart, and fills the gaps. The site comes from a practitioner who builds automation and teaches others to take part, not from a dev shop or a vendor.

## Operating Context

- The assessment lives at `/assessment/`. Each person scores 0 to 10 on each of the 8 archetypes using sliders, then the team overlays everyone's scores on a shared radar chart and reads the gap analysis. Assessments export and import as JSON, and a printable PDF team report is generated. It takes about 10 minutes.
- The blog holds guides on Rewst automations (Teams bot, GitHub notifications), integrations (ConnectWise Home), and ConnectWise PSA.
- The site backs the conference talk "Building Automation Muscle Without a Dev Team" (Community Insights track at an MSP/ITSP conference).
- Hosted on Cloudflare Pages and built with Eleventy. Pages are HTML with front matter over Nunjucks layouts, and page bodies are not template-processed so Rewst Jinja examples survive verbatim.

## Capabilities and Constraints

- The 8 archetypes: Process & Knowledge Holding, Problem Definition, Design & Logic Thinking, Communication & Translation, Building & Implementation, Quality & Oversight, Human & Organizational Awareness, Strategic & Vision Thinking. Each is a cluster of sub-archetypes, and the framework citations (Theory of Constraints, Lean, Kotter, Team Topologies, and others) are intentional and must be preserved.
- The platform is spelled "Rewst", never "REWST".
- Page copy mirrors the talk. The social card (`scripts/og-card.html`) duplicates the home hero headline and must be kept in sync.
- URLs mirror source paths exactly. Do not break existing links.
- Reuse the shared classes in `assets/tokens.css` before creating page-specific styles (see CLAUDE.md, DRY CSS).

## Brand Commitments

- Name: Rhino Automator, by Brian Simpson. The rhino is the mark.
- Tone: direct, practical, builder. "Not a dev shop, not a vendor, a practitioner."
- The visual identity is defined in `about/brand.html` and CLAUDE.md, including the colors and fonts it names and the things to avoid (orange tones, navy backgrounds, Gilroy). Treat those as the incumbent identity, not something init re-decides.

## Evidence on Hand

- Talk: FLOW 2025, "Cracking the Automation Code: How Process-Minded Thinkers Can Thrive in Technical Roles".
- Press: rewst.io feature, "Workflow Wizards: How Brian Simpson Kicks Goals with Automation".
- Community: 14 Rewst ROC Open Mic workflow demos (2023 to 2025).
- Headshot of Brian at `assets/brian-simpson.jpg`.
- Not on hand, so do not fabricate: customer testimonials, client names or logos, assessment completion counts, pricing, or consulting packages.

## Product Principles

1. The assessment is the front door. Every surface should make it obvious what it is and move a visitor toward starting it.
2. Credibility comes from practice, not polish. Show real workflows, real talks, and real citations; never invent proof.
3. Write for the non-developer. Plain language wins, and technical depth is available without being required.
4. Teams over heroes. The framing is coverage and gaps across a team, never a single person's score.
5. The framework's research grounding stays visible, because it keeps a methodology from reading as opinion.

## Accessibility & Inclusion

No product-specific standard established. The audience includes non-technical people, so clarity of language is a requirement, and content should remain usable at mobile widths and with reduced-motion preferences.
