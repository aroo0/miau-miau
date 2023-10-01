import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

import { Libre_Baskerville } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Miau Miau",
  description: "Perfume Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={libreBaskerville.className}>
        <ToasterProvider/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
