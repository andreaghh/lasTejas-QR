import type { Metadata } from "next";
import { Epilogue, Noto_Serif, Work_Sans } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Las Tejas - The Earthbound Editorial",
  description: "Restaurant menu design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${notoSerif.variable} ${workSans.variable} h-full antialiased`}
    >
      <body style={{ margin: 0, padding: 0, overflow: "hidden", height: "100dvh", width: "100vw" }}>{children}</body>
    </html>
  );
}
