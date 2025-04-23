import "./globals.css";
import Navbar from "@/components/Navbar";
import ContactCard from "@/components/contact card/ContactCard";
import Footer from "@/components/footer";


export const metadata = {
  title: "Shreeji Investment Ltd",
  description: "Shreeji Investment Ltd",
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
