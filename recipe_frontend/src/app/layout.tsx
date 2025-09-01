import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Recipe Explorer",
  description: "Browse, search, and manage your favorite recipes",
  applicationName: "Recipe Explorer",
  authors: [{ name: "Recipe Explorer" }],
  themeColor: "#FFFFFF",
  viewport: { width: "device-width", initialScale: 1, viewportFit: "cover" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <header className="navbar">
            <div className="container">
              <Navbar />
            </div>
          </header>
          <main className="container py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
