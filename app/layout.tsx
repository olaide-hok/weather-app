import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolageGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz_wdth_wght.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Bricolage_Grotesque/static/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bricolage-grotesque",
});

const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz_wght.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-VariableFont_opsz_wght.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "A Weather App",
  description:
    "A weather app to search for weather information by entering a location in the search bar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${bricolageGrotesque.className} ${dmSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
