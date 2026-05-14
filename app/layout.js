import "./globals.css";
import "./button-overrides.css";
import "./editorial-redesign.css";
import "./spline-inspired.css";
import "./projects-redesign.css";
import "./reggae-theme.css";
import { League_Spartan } from "next/font/google";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ButtonClickFeedback } from "../components/ButtonClickFeedback";
import { getSiteUrl } from "../lib/site";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.className} ${leagueSpartan.variable}`}>
        <ButtonClickFeedback />
        <div className="page-chrome">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
