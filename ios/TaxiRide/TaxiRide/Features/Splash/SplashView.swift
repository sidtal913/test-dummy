import SwiftUI

struct SplashView: View {
    @StateObject private var viewModel = SplashViewModel()
    let onContinue: () -> Void

    var body: some View {
        ZStack {
            BrandStyle.background
                .ignoresSafeArea()

            VStack(spacing: 28) {
                Spacer()

                brandMark
                    .scaleEffect(viewModel.logoScale)
                    .opacity(viewModel.logoOpacity)
                    .accessibilityHidden(viewModel.logoOpacity < 0.5)

                VStack(spacing: 12) {
                    Text(BrandStyle.productName)
                        .font(BrandStyle.titleFont)
                        .foregroundStyle(BrandStyle.surface)
                        .opacity(viewModel.logoOpacity)

                    Text(BrandStyle.tagline)
                        .font(BrandStyle.taglineFont)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(BrandStyle.muted)
                        .opacity(viewModel.taglineOpacity)
                        .padding(.horizontal, 32)

                    Text(BrandStyle.geographyCaption)
                        .font(BrandStyle.captionFont)
                        .foregroundStyle(BrandStyle.muted.opacity(0.85))
                        .opacity(viewModel.taglineOpacity)
                }

                Spacer()

                Button(action: viewModel.continueTapped) {
                    Text("Get started")
                        .font(.headline.weight(.semibold))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                }
                .buttonStyle(.plain)
                .foregroundStyle(BrandStyle.onPrimary)
                .background(BrandStyle.primary)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .opacity(viewModel.ctaOpacity)
                .disabled(viewModel.phase != .ready)
                .accessibilityLabel("Get started")
                .accessibilityHint("Continue to onboarding")
                .padding(.horizontal, 24)
                .padding(.bottom, 40)
            }
        }
        .onAppear {
            viewModel.onContinue = onContinue
            viewModel.onAppear()
        }
    }

    private var brandMark: some View {
        ZStack {
            Circle()
                .fill(BrandStyle.primary.opacity(0.18))
                .frame(width: 132, height: 132)

            Circle()
                .strokeBorder(BrandStyle.primary.opacity(0.45), lineWidth: 2)
                .frame(width: 132, height: 132)

            Image(systemName: "car.fill")
                .font(.system(size: 44, weight: .semibold))
                .foregroundStyle(BrandStyle.primary)
                .accessibilityHidden(true)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(BrandStyle.productName) logo")
    }
}

#Preview {
    SplashView(onContinue: {})
}
