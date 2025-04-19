import { Outfit } from "next/font/google";
import "./globals.css";
import ClientBottomNav from "@/components/clientBottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "MachePam",
  description: "Your personal medication assistant - Track, manage and get reminders for your medications",
  keywords: [
    "medication tracker",
    "pill reminder",
    "medication management",
    "health app",
    "medical assistant",
    "prescription tracker"
  ],
  authors: [
    { name: "MachePam Team" }
  ],
  openGraph: {
    title: "MachePam",
    description: "Your personal medication assistant",
    type: "website",
    url: "https://machepam.com",
    siteName: "MachePam",
  },
  twitter: {
    card: "summary_large_image",
    title: "MachePam",
    description: "Your personal medication assistant",
    creator: "@machepam"
  },
  robots: {
    index: true,
    follow: true
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png"
  // }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Head content */}
      </head>
      <body className={`${outfit.className} antialiased`}>
        <AuthProvider>
          {children}
          <ClientBottomNav />
          <ToastContainer position="top-right" autoClose={2000} />
        </AuthProvider>
      </body>
    </html>
  );
}
