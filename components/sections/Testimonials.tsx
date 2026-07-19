import { Quote, ArrowUpRight, Building2 } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Owner, Mukhabela Construction"
};

type Client = {
  initials: string;
  name: string;
  project: string;
  live?: string;
};

/**
 * HARD RULE (see CLAUDE.md): only REAL quotes from REAL clients go here,
 * with their permission. Never add invented testimonials — the quotes grid
 * stays hidden until there is at least one genuine quote.
 */
const TESTIMONIALS: Testimonial[] = [];

const CLIENTS: Client[] = [
  {
    initials: "GG",
    name: "Glow & Grace Salon",
    project: "Booking & management system",
    live: "https://full-salon-system.vercel.app/",
  },
  {
    initials: "MC",
    name: "Mukhabela Construction",
    project: "Website + leads dashboard",
    live: "https://mukhabelaconstruction.co.za",
  },
  {
    initials: "ST",
    name: "Shalom Training School",
    project: "College system — applications, login & dashboard",
    live: "https://shalom-college-ten.vercel.app/",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight mb-4">
            Businesses that trusted me with their systems
          </h2>
          <p className="text-gray-500 font-OpenSans leading-relaxed">
            No invented reviews here — just the real businesses I&apos;ve built for.
            Where the work is live, click through and judge it yourself.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {CLIENTS.map((c) => {
            const inner = (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold font-poppins shrink-0">
                    {c.initials}
                  </span>
                  <div>
                    <div className="font-bold font-poppins text-gray-900 flex items-center gap-1.5">
                      {c.name}
                      {c.live && <ArrowUpRight size={15} className="text-blue-600" />}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <Building2 size={13} /> Client project
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-OpenSans leading-relaxed">{c.project}</p>
                {c.live && (
                  <span className="text-xs text-blue-600 font-medium mt-3 block">Visit live site →</span>
                )}
              </>
            );
            const cardClass =
              "flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300";
            return c.live ? (
              <a key={c.name} href={c.live} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {inner}
              </a>
            ) : (
              <div key={c.name} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>

        {TESTIMONIALS.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch mt-10">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Quote size={26} className="text-blue-600 mb-4" />
                <blockquote className="text-gray-600 font-OpenSans leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-gray-100">
                  <div className="font-bold font-poppins text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
