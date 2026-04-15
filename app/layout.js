import "./globals.css";
import "./button-overrides.css";
import { League_Spartan } from "next/font/google";
import { MotionProvider } from "../components/MotionProvider";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const leagueSpartanBody = League_Spartan({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const leagueSpartanDisplay = League_Spartan({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata = {
  title: "Humanity First Initiative",
  description:
    "A humanitarian initiative for grassroots projects, education, health advocacy, arts, and sports development."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${leagueSpartanBody.variable} ${leagueSpartanDisplay.variable}`}>
        <MotionProvider />
        <div className="page-chrome">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
