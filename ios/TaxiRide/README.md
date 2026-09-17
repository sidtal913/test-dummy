# Taxi Ride — iOS client (TAXI-16 / TAXI-19 foundation)

Native SwiftUI MVVM app for the Taxi Ride rider experience. This tree is the iOS client root; it does not replace the Next.js marketing site under `app/`.

## Open in Xcode

1. Open `ios/TaxiRide/TaxiRide.xcodeproj` on macOS with Xcode 15+.
2. Select the **TaxiRide** scheme and an iPhone Simulator.
3. Run (⌘R).

## Build from CLI (Mac only)

```bash
cd ios/TaxiRide
xcodebuild -scheme TaxiRide -destination 'platform=iOS Simulator,name=iPhone 16' -configuration Debug build
```

## TAXI-16 — splash & first launch

| Piece | Role |
|-------|------|
| `Features/Splash/` | Branded cold-start animation + **Get started** CTA |
| `Services/FirstLaunchPreferences` | Shows full brand splash **once** per install |
| `Features/Onboarding/OnboardingHandoffView` | Post-splash handoff placeholder until TAXI-17 |
| `Resources/Assets.xcassets` | Brand Kit color tokens (#0A0A0A, #E11D48, #FAFAF9, #FFFFFF) |

Cold launch always paints `AppRootView` immediately (no blank UIKit window). Returning users skip the splash and land on the onboarding handoff surface.

## Toolchain note

VPods Cursor fleet runs on Ubuntu without Xcode. Sources are complete for Mac `xcodebuild` / Simulator review; Simulator QA is not claimed from this environment.

## AppSync

Amplify/AppSync wiring waits on Knox contract rows in `.vpods/API_CONTRACTS.md` (currently empty). No auth in this story.
