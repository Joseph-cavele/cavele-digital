import type { Metadata } from "next";
import { Check, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import { TopBar } from "@/components/sections/TopBar";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free, no-obligation quote from Cavele Digital — custom websites, booking & management systems, and business automation for South African businesses. Reply within one business day.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Get a Free Quote — Cavele Digital",
    description:
      "Tell us about your project and get a tailored quote within one business day. No pressure, no jargon.",
    url: `${site.url}/quote`,
  },
};

const POINTS = [
  { icon: Clock, title: "Reply in 1 business day", desc: "A real person reviews your request and responds fast." },
  { icon: ShieldCheck, title: "No obligation", desc: "A clear, itemised quote — zero pressure to commit." },
  { icon: Check, title: "Fixed, transparent pricing", desc: "You know the scope and price before we start." },
  { icon: MessageCircle, title: "Talk to a human", desc: "Prefer to chat? WhatsApp us any time." },
];

export default function QuotePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-blue-900 px-6 pt-16 pb-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-blue-700 opacity-30 blur-3xl" />
          <div className="max-w-6xl mx-auto relative">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              Free Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-white leading-tight max-w-2xl">
              Let&apos;s scope your project and send you a quote.
            </h1>
            <p className="text-blue-100 font-OpenSans mt-4 max-w-xl leading-relaxed">
              Fill in a few details about what you need — a website, a booking or management system,
              or business automation — and I&apos;ll get back to you within one business day.
            </p>
          </div>
        </section>

        {/* Form + benefits */}
        <section className="px-6 pt-12 pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-3">
              <QuoteForm />
            </div>

            <aside className="lg:col-span-2 lg:mt-4 flex flex-col gap-4">
              {POINTS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold font-poppins text-gray-900 text-sm">{p.title}</h3>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}

              <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <p className="font-bold font-poppins mb-1">Prefer to talk first?</p>
                <p className="text-blue-100 text-sm mb-4">Message us on WhatsApp for a quick chat.</p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm rounded-xl px-5 py-2.5 hover:bg-blue-50 transition-colors"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
