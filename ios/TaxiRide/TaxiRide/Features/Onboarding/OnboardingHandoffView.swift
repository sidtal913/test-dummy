import SwiftUI

/// Placeholder handoff surface until TAXI-17 onboarding ships (no auth in TAXI-16).
struct OnboardingHandoffView: View {
    var body: some View {
        ZStack {
            BrandStyle.background
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Image(systemName: "map.fill")
                    .font(.system(size: 48))
                    .foregroundStyle(BrandStyle.primary)
                    .accessibilityHidden(true)

                Text("Onboarding & sign-in")
                    .font(BrandStyle.titleFont)
                    .foregroundStyle(BrandStyle.surface)
                    .multilineTextAlignment(.center)

                Text("Splash complete. Rider onboarding and authentication will connect here in upcoming stories.")
                    .font(BrandStyle.taglineFont)
                    .foregroundStyle(BrandStyle.muted)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 28)

                Text(BrandStyle.geographyCaption)
                    .font(BrandStyle.captionFont)
                    .foregroundStyle(BrandStyle.muted.opacity(0.9))
            }
            .padding()
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Onboarding and sign-in coming next")
    }
}

#Preview {
    OnboardingHandoffView()
}
