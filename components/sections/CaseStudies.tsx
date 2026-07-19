import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { BtnPrimary } from "@/components/ui/BtnPrimary";

type CaseStudy = {
  tag: string;
  title: string;
  summary: string;
  built: string[];
  outcome: string;
  live?: string;
  flagship?: boolean;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Booking & Management System",
    title: "Glow & Grace Salon",
    summary:
      "A complete booking ecosystem for a salon — clients book online in a few taps, and the owner runs the whole business from one dashboard.",
    built: [
      "Client-facing booking site with a step-by-step wizard: choose service, stylist, date & time, confirm",
      "Live booking summary with pricing and duration before checkout",
      "Admin dashboard with revenue, appointment stats and monthly booking charts",
      "Customer management, stylist management, notifications and reports",
    ],
    outcome:
      "Bookings that used to need a phone call now happen online, day or night — and every appointment, customer and rand is visible in one place.",
    live: "https://full-salon-system.vercel.app/",
    flagship: true,
  },
  {
    tag: "College System",
    title: "Shalom Training School",
    summary:
      "A website and application system for a MERSETA-accredited training school offering welding, engineering, artisan and mining skills courses.",
    built: [
      "Course catalogue prospective students can browse",
      "Online application — students apply directly from the site",
      "Secure login for returning users",
      "Dashboard for managing the school's side of the system",
      "WhatsApp contact and light/dark mode",
    ],
    outcome:
      "Applications move from paperwork to an online flow the school can track — students apply from their phones, wherever they are.",
    live: "https://shalom-college-ten.vercel.app/",
  },
  {
    tag: "Website + Leads Dashboard",
    title: "Mukhabela Construction",
    summary:
      "A mobile-first website for a construction company, built to showcase project work and turn visitors into quote requests.",
    built: [
      "Mobile-first marketing site showcasing completed projects",
      "Quote request form wired straight into a leads dashboard",
      "Live on the company's own .co.za domain",
    ],
    outcome:
      "Instead of quote requests getting lost in calls and messages, every lead lands in a dashboard the owner can follow up from.",
    live: "https://mukhabelaconstruction.co.za",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight mb-4">
            What I built, and why it matters
          </h2>
          <p className="text-gray-500 font-OpenSans leading-relaxed">
            A closer look at the systems behind the screenshots — what each project
            includes and what it actually does for the business.
          </p>
        </div>

        <div className="space-y-8">
          {CASE_STUDIES.map((cs, i) => (
            <article
              key={cs.title}
              className="relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-blue-600" />
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-10">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 rounded-full px-3 py-1">
                      {cs.tag}
                    </span>
                    {cs.flagship && (
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-600 text-white rounded-full px-2.5 py-1">
                        Flagship
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold font-poppins text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-gray-200 font-extrabold mr-1">0{i + 1}</span>
                    {cs.title}
                  </h3>
                  <p className="text-gray-500 font-OpenSans leading-relaxed mb-5">{cs.summary}</p>
                  <p className="text-gray-700 font-OpenSans text-sm leading-relaxed border-l-2 border-blue-100 pl-4 mb-5">
                    {cs.outcome}
                  </p>
                  {cs.live && (
                    <a
                      href={cs.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Visit live site <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-6 md:p-7">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">
                    What I built
                  </h4>
                  <ul className="space-y-3">
                    {cs.built.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600 font-OpenSans leading-relaxed">
                        <CheckCircle2 size={17} className="text-blue-600 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <BtnPrimary to="/quote">Get a Quote for Your Project</BtnPrimary>
        </div>
      </div>
    </section>
  );
}
