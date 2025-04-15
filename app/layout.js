import { Outfit } from "next/font/google";
import "./globals.css";

// Optimize font loading by specifying only needed weights
const outfit = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap", // Add display swap for better performance
  variable: "--font-outfit", // Add variable for consistent usage
});

export const metadata = {
  title: "MachePam",
  description: "Votre boutique en ligne pour des produits de qualité",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // Optimize for mobile
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        
        {/* Add preload for critical assets */}
        <link 
          rel="preload" 
          href="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" 
          as="image"
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
