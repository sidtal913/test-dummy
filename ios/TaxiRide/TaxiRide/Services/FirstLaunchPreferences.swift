import Foundation

/// Persists first-launch brand splash completion (TAXI-16 — show splash once).
struct FirstLaunchPreferences {
    private enum Keys {
        static let brandSplashCompleted = "taxiride.brandSplashCompleted"
    }

    private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
    }

    var hasCompletedBrandSplash: Bool {
        defaults.bool(forKey: Keys.brandSplashCompleted)
    }

    func markBrandSplashCompleted() {
        defaults.set(true, forKey: Keys.brandSplashCompleted)
    }

    static let live = FirstLaunchPreferences()

    static func preview(freshInstall: Bool) -> FirstLaunchPreferences {
        let suite = UserDefaults(suiteName: "TaxiRidePreview")!
        suite.removePersistentDomain(forName: "TaxiRidePreview")
        if !freshInstall {
            suite.set(true, forKey: Keys.brandSplashCompleted)
        }
        return FirstLaunchPreferences(defaults: suite)
    }
}
