import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ToastContainer } from "react-toastify";
import AuthProvider from "./Provider";
import { NextUIProvider } from "@nextui-org/react";
// import { ThemeProvider as NextThemeProvider } from "next-themes";
//redux
import Providers from "@/redux/providers";

import "animate.css";
import { NotificationsProvider } from "@/providers/notifications/NotificationsProvider";
import MessageProvider from "@/providers/messages/MessageProvider";
import { ThemeProvider } from "@/providers/Theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🌜DreamyVerse🌜",
  description: "Connect your dreams",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <ThemeProvider>
              <NotificationsProvider>
                <MessageProvider>
                  <main className="">{children}</main>
                </MessageProvider>
              </NotificationsProvider>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
