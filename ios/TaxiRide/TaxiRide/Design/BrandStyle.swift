import SwiftUI

/// Starter Brand Kit tokens (PROJECT.md — provisional until Brand confirm).
enum BrandStyle {
    static let background = Color("BrandBackground")
    static let surface = Color("BrandSurface")
    static let primary = Color("BrandPrimary")
    static let onPrimary = Color("BrandOnPrimary")
    static let muted = Color("BrandMuted")

    static let productName = "Taxi Ride"
    static let tagline = "Montréal & Québec — votre course, en confiance."
    static let geographyCaption = "Fièrement basé à Montréal"

    static let titleFont: Font = .system(.largeTitle, design: .rounded, weight: .bold)
    static let taglineFont: Font = .system(.title3, design: .rounded, weight: .medium)
    static let captionFont: Font = .system(.footnote, design: .rounded, weight: .regular)
}
