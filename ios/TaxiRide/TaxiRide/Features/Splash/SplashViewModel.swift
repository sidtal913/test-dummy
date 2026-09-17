import Foundation
import SwiftUI

final class SplashViewModel: ObservableObject {
    enum Phase: Equatable {
        case coldStart
        case revealing
        case ready
    }

    @Published private(set) var phase: Phase = .coldStart
    @Published private(set) var logoScale: CGFloat = 0.72
    @Published private(set) var logoOpacity: Double = 0
    @Published private(set) var taglineOpacity: Double = 0
    @Published private(set) var ctaOpacity: Double = 0

    var onContinue: (() -> Void)?

    private var didStart = false

    func onAppear() {
        guard !didStart else { return }
        didStart = true
        runColdStartSequence()
    }

    func continueTapped() {
        guard phase == .ready else { return }
        onContinue?()
    }

    private func runColdStartSequence() {
        phase = .revealing

        withAnimation(.spring(response: 0.85, dampingFraction: 0.78)) {
            logoScale = 1.0
            logoOpacity = 1.0
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.45) { [weak self] in
            withAnimation(.easeOut(duration: 0.55)) {
                self?.taglineOpacity = 1.0
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.05) { [weak self] in
            guard let self else { return }
            phase = .ready
            withAnimation(.easeOut(duration: 0.4)) {
                self.ctaOpacity = 1.0
            }
        }
    }
}
