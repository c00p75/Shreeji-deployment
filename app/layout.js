import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import siteMetadata from "@/siteMetaData";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  category: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: siteMetadata.socialBanner,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-1W93H38B5W" />
      <body className="antialiased light-theme">
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
