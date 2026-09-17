import SwiftUI

@main
struct TaxiRideApp: App {
    @StateObject private var launchViewModel = AppLaunchViewModel()

    var body: some Scene {
        WindowGroup {
            AppRootView(viewModel: launchViewModel)
                .preferredColorScheme(.dark)
        }
    }
}
