import "./globals.css";
import "./button-overrides.css";
import "./editorial-redesign.css";
import "./spline-inspired.css";
import "./projects-redesign.css";
import "./reggae-theme.css";
import "./header.css";
import "./footer.css";
import "./loading.css";
import "./marley-theme.css";
import "./i18n.css";
import Script from "next/script";
import { League_Spartan, Oswald } from "next/font/google";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ButtonClickFeedback } from "../components/ButtonClickFeedback";
import { PageLoadingBar } from "../components/PageLoadingBar";
import { PageTransition } from "../components/PageTransition";
import { LanguageProvider } from "../components/i18n/LanguageProvider";
import { getLocale } from "../lib/i18n/server";
import { getSiteUrl } from "../lib/site";

const siteFont = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

// Display: condensed, bold — the bobmarley.com "concert poster" headline voice.
const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-marley-display",
  display: "swap",
  weight: ["500", "600", "700"]
});

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Humanity First Initiative",
    template: "%s | Humanity First Initiative"
  },
  description:
    "A humanitarian platform for grassroots projects, education access, health advocacy, arts, and youth sports development across Africa.",
  applicationName: "Humanity First Initiative",
  keywords: [
    "humanitarian platform",
    "Africa grassroots projects",
    "education access",
    "public health advocacy",
    "arts and music",
    "sports development",
    "donations and support"
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Humanity First Initiative",
    title: "Humanity First Initiative",
    description:
      "A humanitarian platform for grassroots projects, education access, health advocacy, arts, and youth sports development across Africa."
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanity First Initiative",
    description:
      "A humanitarian platform for grassroots projects, education access, health advocacy, arts, and youth sports development across Africa."
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/logo/HFI%20(1).png",
    shortcut: "/logo/HFI%20(1).png",
    apple: "/logo/HFI%20(1).png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${siteFont.className} ${siteFont.variable} ${displayFont.variable}`}>
        <LanguageProvider initialLocale={locale}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <PageLoadingBar />
          <ButtonClickFeedback />
          <div className="page-chrome">
            <SiteHeader />
            <div id="main-content" tabIndex={-1}>
              <PageTransition>
                {children}
              </PageTransition>
            </div>
            <SiteFooter />
          </div>
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
