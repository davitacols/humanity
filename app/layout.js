import "./globals.css";
import { League_Spartan } from "next/font/google";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap"
});

export const metadata = {
  title: "Humanity First Initiative",
  description:
    "A humanitarian impact and empowerment platform for grassroots projects, education, health advocacy, arts, and sports development."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={leagueSpartan.variable}>
        <div className="page-chrome">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
