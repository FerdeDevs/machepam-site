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
  description:
    "Your personal medication assistant - Track, manage and get reminders for your medications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Head content */}</head>
      <body className={`${outfit.className} antialiased`}>
        <AuthProvider>
          {children}
          <ClientBottomNav />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </body>
    </html>
  );
}
