import Foundation

/// Root navigation for cold start — splash once, then onboarding / sign-in handoff.
final class AppLaunchViewModel: ObservableObject {
    enum Route: Equatable {
        case brandSplash
        case onboardingHandoff
    }

    @Published private(set) var route: Route

    private let preferences: FirstLaunchPreferences

    init(preferences: FirstLaunchPreferences = .live) {
        self.preferences = preferences
        route = preferences.hasCompletedBrandSplash ? .onboardingHandoff : .brandSplash
    }

    func completeBrandSplash() {
        preferences.markBrandSplashCompleted()
        route = .onboardingHandoff
    }
}
