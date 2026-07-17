import { TopBar } from "@/components/sections/TopBar";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { AboutUs } from "@/components/sections/AboutUs";
import { Features } from "@/components/sections/Features";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <AboutUs />
        <Features />
        <Process />
        <Faq />
        <QuoteCta />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
