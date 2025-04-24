import "./globals.css";
import Navbar from "@/components/Navbar";
import ContactCard from "@/components/contact card/ContactCard";
import Footer from "@/components/footer";
import siteMetadata from "@/siteMetaData";


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
      <body
        className="antialiased light-theme"
      >
        <Navbar />
        <main className="text-lg text-center md:text-start">{children}</main>
        <ContactCard />
        <Footer />
      </body>
    </html>
  );
}
