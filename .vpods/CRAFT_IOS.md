# iOS craft (VPods hire)

Follow `.vpods/MAYA_AGENT.md` (Maya — native iOS specialist). This pack is the Swift/SwiftUI grammar for Taxi Ride–class AppSync products.

## Stack contract

| Layer | Standard |
|-------|----------|
| UI | SwiftUI |
| State | MVVM (`View` + `ViewModel` + services) |
| API | Amplify Swift → AppSync GraphQL (or AppSync endpoint + Cognito from Knox contract) |
| Location | CoreLocation + MapKit when the ticket needs origin/route |
| Assets | Asset Catalog (`*.xcassets`) — not `public/images/` |

## MVVM rules

1. Views bind to published state; they do not call Amplify directly.
2. ViewModels own loading / error / empty / permission-denied states explicitly.
3. Services wrap Amplify Auth/API/Storage and CoreLocation — one place to mock later.
4. Domain types mirror GraphQL selection sets — do not invent parallel DTO trees.

## AppSync usage

- Operations must exist in Knox’s schema / `.vpods/API_CONTRACTS.md` / `spec/graphql`.
- Prefer generated or hand-typed GraphQL documents colocated under the iOS tree (`GraphQL/` or `API/`).
- Auth mode = Cognito user pools unless the contract says otherwise (IAM/API key).
- Handle partial errors and offline: show recoverable UI, do not crash.

## HIG / craft bar

- One job per screen; primary action obvious in the first viewport.
- SF Symbols for standard actions; custom icons only from Brand Kit / ticket assets.
- Support Dynamic Type and Dark Mode on every screen you ship.
- Accessibility: label map pins, fare CTAs, and permission prompts.
- Motion: system animations only unless the ticket asks for custom; never decorative noise.

## Location pattern

```
Permission unknown → request when-in-use
Denied → empty state + Settings deep link
Authorized → publish coordinate to ViewModel → fare/route request
```

Never soft-fail location by inventing a Montréal coordinate without saying so in hire chat.

## Acceptance discipline

- **With Mac/Xcode execution env:** `xcodebuild` (or `swift build`) must succeed; UI tickets need a Simulator screenshot before Done.
- **Without Mac (current fleet Cursor Ubuntu default):** commit complete Swift sources; narrate the toolchain gap; do not claim Simulator QA.
- Never mark Done from reading `.swift` files alone when a Simulator is available.

## Out of scope

- Admin Next.js console (Rae)
- AppSync schema / resolvers / DynamoDB (Knox / Mira)
- App Store Connect release engineering (unless the ticket explicitly assigns Maya that lane)
