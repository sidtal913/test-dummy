import SwiftUI

struct AppRootView: View {
    @ObservedObject var viewModel: AppLaunchViewModel

    var body: some View {
        Group {
            switch viewModel.route {
            case .brandSplash:
                SplashView(onContinue: viewModel.completeBrandSplash)
            case .onboardingHandoff:
                OnboardingHandoffView()
            }
        }
        .animation(.easeInOut(duration: 0.35), value: viewModel.route)
    }
}

#Preview {
    AppRootView(viewModel: AppLaunchViewModel(preferences: .preview(freshInstall: true)))
}
