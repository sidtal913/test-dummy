# Structural direction — DRAFT (not approved)

Sol proposed this charter; a human has not approved it.
Do NOT treat stack, clientRoot, forbidden paths, or the page map as locked ground truth.
Prefer the ticket brief and what is already committed in the repo.

STRUCTURAL DIRECTION (proposed): Brownies
Every block is tagged [grounded · sources] or [open · needs client confirmation].
Treat [open] as drafts — never as facts.
Product goal / MVP [grounded · product-description, TAXI-19, TAXI-16, TAXI-21]
  Product category: marketing | Operators and teammates using this product. | Product category: marketing
Primary user goal: Brownies factory website to order brownies
Out of scope: (not set yet — refine later)
Auth model: decide_later
Mockups: none yet — proceed no-mockup for non-visual tickets; FE may ask once when a reference is expected
Brand Kit: starter palette from category (NOT confirmed) — #0A0A0A, #E11D48, #FAFAF9, #FFFFFF; FE/visual tickets wait for Brand confirm via Needs Your Input; backend/infra may proceed
Deferred intake steps: scope, references, brand, validation, review
Requirements [grounded · product-description, TAXI-19, TAXI-16, TAXI-21]
  must-have: Product category: marketing; Primary user goal: Brownies factory website to order brownies; Out of scope: (not set yet — refine later); Auth model: decide_later; Mockups: none yet — proceed no-mockup for non-visual tickets; FE may ask once when a reference is expected; Brand Kit: starter palette from category (NOT confirmed) — #0A0A0A, #E11D48, #FAFAF9, #FFFFFF; FE/visual tickets wait for Brand confirm via Needs Your Input; backend/infra may proceed; Deferred intake steps: scope, references, brand, validation, review; ## Acceptance criteria — must-not: Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists; - Then cold launch shows the branded splash once, then hands off to onboarding or sign-in — never a blank UIKit window Labels: design-mode:brand-storytelling, gap:ui, ios-maya, sol-gap-mint, sol-repai; Do not invent API fields; Then: Ride is created, accepted, completed, fare is calculated, admin ledger is updated, and all parties see correct data Labels: vpods-generated Schema: fields id, createdAt, updatedAt plus domain at; Schema: fields id, createdAt, updatedAt plus domain attributes named in the brief; reuse the existing table/entity when one already covers this domain — extend the existing table/entity; do not create; No CRAFT_IOS / Maya hire — do not Auto-approve; calibration required
Stack [grounded · https://github.com/sidtal913/test-dummy, app/, app/api/, TAXI-19]
  app/ / app/api/ — Next.js App Router signals in backlog; paths: [Calibrate] List forbidden paths/frameworks
Pages [grounded · TAXI-19, TAXI-16, TAXI-21, TAXI-2]
  6 surfaces
- Splash (/splash) [grounded · TAXI-16, TAXI-16, TAXI-16, TAXI-16]: Brand cold-start and first-launch handoff.
    - Requires: TAXI-19 Maya (maya) — SwiftUI MVVM [grounded · TAXI-16]
    - First paint for Taxi Ride: brand mark, short tagline, animated cold-start → Continue / Get started [grounded · TAXI-16]
    - Geography: Montréal / Québec [grounded · TAXI-16]
    - Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists [grounded · TAXI-16]
    - After splash: 2–3 short screens for Taxi Ride (what it does, location permission for Montréal rides, push optional), then rider vs chauffeur role choice before Authentication [grounded · TAXI-17]
    - Do not invent API fields [grounded · TAXI-17]
- Onboarding (/onboarding) [grounded · TAXI-16, TAXI-16, TAXI-16, TAXI-16]: Permissions and rider/chauffeur choice after splash.
    - Requires: TAXI-19 Maya (maya) — SwiftUI MVVM [grounded · TAXI-16]
    - First paint for Taxi Ride: brand mark, short tagline, animated cold-start → Continue / Get started [grounded · TAXI-16]
    - Geography: Montréal / Québec [grounded · TAXI-16]
    - Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists [grounded · TAXI-16]
    - After splash: 2–3 short screens for Taxi Ride (what it does, location permission for Montréal rides, push optional), then rider vs chauffeur role choice before Authentication [grounded · TAXI-17]
    - Do not invent API fields [grounded · TAXI-17]
- Authentication & Profiles (/auth) [grounded · TAXI-16, TAXI-16, TAXI-16, TAXI-16]: Customer and chauffeur login plus profiles.
    - Requires: TAXI-19 Maya (maya) — SwiftUI MVVM [grounded · TAXI-16]
    - First paint for Taxi Ride: brand mark, short tagline, animated cold-start → Continue / Get started [grounded · TAXI-16]
    - Geography: Montréal / Québec [grounded · TAXI-16]
    - Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists [grounded · TAXI-16]
    - Requires: TAXI-1 Delivery order: 2 [grounded · TAXI-2]
    - Output live AppSync endpoint and Cognito pool IDs to customer AWS account [grounded · TAXI-2]
    - Given: Schema and auth scopes are finalized [grounded · TAXI-2]
    - When: Terraform apply succeeds [grounded · TAXI-2]
- Chauffeur Accept & Navigate (/chauffeur) [grounded · TAXI-2, TAXI-2, TAXI-2, TAXI-2]: Incoming requests, accept/decline, navigate to pickup.
    - Requires: TAXI-1 Delivery order: 2 [grounded · TAXI-2]
    - Output live AppSync endpoint and Cognito pool IDs to customer AWS account [grounded · TAXI-2]
    - Given: Schema and auth scopes are finalized [grounded · TAXI-2]
    - When: Terraform apply succeeds [grounded · TAXI-2]
    - Requires: none Delivery order: 1 [grounded · TAXI-1]
    - Design and document the complete GraphQL schema for Taxi Ride covering Customer, Chauffeur, Ride, Fare, Category, and Admin entities [grounded · TAXI-1]
    - Define auth scopes (customer, chauffeur, admin) and IAM policies [grounded · TAXI-1]
    - graphql and spec/auth [grounded · TAXI-1]
- Map & Ride Request (/map) [grounded · TAXI-8, TAXI-8, TAXI-8, TAXI-8]: Map, pickup/dropoff, fare estimate, ride request.
    - Requires: TAXI-16 Delivery order: 9 [grounded · TAXI-8]
    - Write contract tests validating admin billing mutations (record ride completion, calculate commission) and queries (billing summary, ledger entries) [grounded · TAXI-8]
    - Verify only admin-scoped users can access [grounded · TAXI-8]
    - Test commission calculation logic (demo: 20% of fare) [grounded · TAXI-8]
    - Requires: TAXI-19 Delivery order: 12 [grounded · TAXI-12]
    - Build SwiftUI map view using MapKit showing user location (iOS Location Services), pickup/dropoff pins, and route [grounded · TAXI-12]
    - Implement ride request mutation (origin, destination, category) [grounded · TAXI-12]
    - Display fare estimation from GraphQL query before confirming [grounded · TAXI-12]
- Ride Status & Completion (/ride) [grounded · TAXI-16, TAXI-16, TAXI-16, TAXI-16]: Live ride status through completion.
    - Requires: TAXI-19 Maya (maya) — SwiftUI MVVM [grounded · TAXI-16]
    - First paint for Taxi Ride: brand mark, short tagline, animated cold-start → Continue / Get started [grounded · TAXI-16]
    - Geography: Montréal / Québec [grounded · TAXI-16]
    - Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists [grounded · TAXI-16]
    - Requires: none Delivery order: 1 [grounded · TAXI-1]
    - Design and document the complete GraphQL schema for Taxi Ride covering Customer, Chauffeur, Ride, Fare, Category, and Admin entities [grounded · TAXI-1]
    - Define auth scopes (customer, chauffeur, admin) and IAM policies [grounded · TAXI-1]
    - graphql and spec/auth [grounded · TAXI-1]
Identity/UX [grounded · TAXI-19, TAXI-16, TAXI-21, TAXI-2]
  Brownies — avoid: Generic SaaS card soup; Purple/amber AI marketing gradients
Data/contracts [open · needs client confirmation: Confirm UI↔API contracts or allow provisional stubs in the Contract Registry.]
  DRAFT (not fact): [Calibrate] UI under app/ talks to app/api/ — confirm contract (REST controllers, OpenAPI, etc.).
  Ask: Confirm UI↔API contracts or allow provisional stubs in the Contract Registry.
Build state [open · needs client confirmation: Confirm what is already committed in the repo (pages, components, contracts).]
  DRAFT (not fact): pages: none yet; components: —; contracts: —; evidence: —
  Ask: Confirm what is already committed in the repo (pages, components, contracts).
Forbidden [open · needs client confirmation: What must hires never do (mock data when a contract exists, second shell, foreign palette)?]
  DRAFT (not fact): No mock/fake API data when a published Contract Registry row exists; No second layout shell if one is already committed; No palette/tokens outside established design/token files; Fleet Cursor is Ubuntu (no Xcode); commit sources and do not claim Simulator QA until a Mac pool exists; - Then cold launch shows the branded splash once, then hands off to onboarding or sign-in — never a blank UIKit window Labels: design-mode:brand-storytelling, gap:ui, ios-maya, sol-gap-mint, sol-repai; Do not invent API fields; Then: Ride is created, accepted, completed, fare is calculated, admin ledger is updated, and all parties see correct data Labels: vpods-generated Schema: fields id, createdAt, updatedAt plus domain at
  Ask: What must hires never do (mock data when a contract exists, second shell, foreign palette)?
Sequencing [open · needs client confirmation: Is the next work foundation (shell) or a feature on an existing slice?]
  DRAFT (not fact): unknown — 
  Ask: Is the next work foundation (shell) or a feature on an existing slice?

Open fields (Confirm blocked until answered):
- Data / contract map: Confirm UI↔API contracts or allow provisional stubs in the Contract Registry.
- Current build state: Confirm what is already committed in the repo (pages, components, contracts).
- Explicit forbidden list: What must hires never do (mock data when a contract exists, second shell, foreign palette)?
- Sequencing pointer: Is the next work foundation (shell) or a feature on an existing slice?
Shell brief: Build AppShell + nav for exactly these pages: Splash, Onboarding, Authentication & Profiles, Chauffeur Accept & Navigate, Map & Ride Request, Ride Status & Completion. Fully implement reference page Splash end-to-end as the pattern. Stay under app/ / app/api/. Do not invent extra top-level routes or a second framework.
Reference page: splash
