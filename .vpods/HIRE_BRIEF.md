# Hire brief
Project: Brownies
Hire agent: maya
Jira: TAXI-16
Task id: task_6d6f3b57
Title: [iOS][MANUAL-REVIEW] Splash & first-launch brand screen
Shape: document
## Description
Delivery order: 10.

Requires: TAXI-19

Maya (maya) — SwiftUI MVVM. First paint for Taxi Ride: brand mark, short tagline, animated cold-start → Continue / Get started. No auth yet. Geography: Montréal / Québec. Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists.

## Acceptance criteria
- Given a first-time Taxi Ride customer on iOS
- When this story is delivered
- Then cold launch shows the branded splash once, then hands off to onboarding or sign-in — never a blank UIKit window

Labels: design-mode:brand-storytelling, gap:ui, ios-maya, sol-gap-mint, sol-repair-gap, vpods-generated
## Rules
- Read `.vpods/FRONTEND_AGENT.md` (frontend), `.vpods/MAYA_AGENT.md` (iOS), `.vpods/PROJECT.md`, `.vpods/CRAFT_*.md` (packed craft grammar including `CRAFT_UX.md` / `CRAFT_MOTION.md` / `CRAFT_IOS.md` when present), `.vpods/DESIGN_PACK.md` when present, and Brand Kit when present before writing code.
- Stay on this ticket's lane. Do not rewrite sibling hire pages/APIs unless required for integration.
- Ship a complete artifact for this shape — not a stub.
- If the brief is genuinely ambiguous, ask exactly one intake question before writing code (waiting-on-answer). After generation starts, do not stop mid-execution to ask.
