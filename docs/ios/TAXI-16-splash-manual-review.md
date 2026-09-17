# TAXI-16 — Splash & first-launch brand screen (manual review)

**Jira:** TAXI-16 · **Agent:** Maya · **Task:** task_6d6f3b57

## Acceptance mapping

| Criterion | Implementation |
|-----------|----------------|
| First-time customer cold launch | `AppLaunchViewModel` routes to `SplashView` when `FirstLaunchPreferences.hasCompletedBrandSplash == false` |
| Branded splash once | Completing **Get started** sets `taxiride.brandSplashCompleted` in `UserDefaults` |
| Hand off to onboarding or sign-in | `OnboardingHandoffView` (placeholder until TAXI-17 / auth stories) |
| Never a blank UIKit window | `@main TaxiRideApp` → `AppRootView` on first frame; `UILaunchScreen` uses `BrandBackground` |

## MVVM ownership

- **SplashView** — layout, accessibility labels, binds to `SplashViewModel` animation state
- **SplashViewModel** — cold-start timing, CTA enablement, invokes `onContinue`
- **AppLaunchViewModel** — install-level route (splash vs handoff)
- **FirstLaunchPreferences** — persistence only (no UI)

## Brand & geography

- Product name: **Taxi Ride**
- Tagline references **Montréal & Québec** (provisional Brand Kit palette in Asset Catalog)
- No Cognito / AppSync in this slice (registry empty)

## Review checklist (Mac)

1. Delete app from Simulator → launch → splash animates → **Get started** visible after ~1s
2. Tap **Get started** → onboarding handoff screen
3. Kill and relaunch → splash skipped, handoff shown immediately
4. VoiceOver: logo, CTA, handoff screen readable
5. Dark Mode: splash uses dark brand background by design

## Evidence (Cursor Ubuntu)

- **Build:** not run (no Xcode on fleet VM)
- **Sources:** `ios/TaxiRide/` committed on branch `cursor/maya-taxi-16`
