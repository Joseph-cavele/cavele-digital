import { ArrowUpRight, ArrowRight, Workflow } from "lucide-react";
import { BtnPrimary } from "@/components/ui/BtnPrimary";

type Project = {
  title: string;
  category: string;
  result: string;
  image: string;
  domain?: string;
  live?: string;
  flagship?: boolean;
  label?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Glow & Grace Salon",
    domain: "full-salon-system.vercel.app",
    category: "Salon Management System",
    result: "Booking site + admin dashboard + management app",
    image: "https://image.thum.io/get/width/900/crop/675/https://full-salon-system.vercel.app/",
    live: "https://full-salon-system.vercel.app/",
    flagship: true,
  },
  {
    title: "Mukhabela Construction",
    domain: "mukhabelaconstruction.co.za",
    category: "Construction Website + Leads Dashboard",
    result: "Quote requests saved to a leads dashboard",
    image: "https://image.thum.io/get/width/900/crop/675/https://mukhabelaconstruction.co.za",
    live: "https://mukhabelaconstruction.co.za",
  },
  {
    // TODO: deployment is behind Vercel authentication — once protection is
    // disabled (or a public production URL exists), add `live` and switch
    // `image` to the thum.io screenshot like the other live projects.
    title: "Shalom Training School",
    category: "College System",
    result: "Online applications + secure login + dashboard",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    label: "Client system",
  },
  {
    title: "Business Automation",
    category: "Automated Workflows",
    result: "Cuts repetitive manual admin",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
];

export function Work() {
  return (
    <section id="work" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight mb-4">
              Real projects, really built
            </h2>
            <p className="text-gray-500 font-OpenSans leading-relaxed">
              A few of the projects I&apos;ve designed and built from scratch — websites,
              booking systems and a college application system. Click through the live
              ones and see for yourself.
            </p>
          </div>
          <BtnPrimary to="/quote">Start Your Project</BtnPrimary>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p) => {
            const cardClass =
              "group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden";
            const inner = (
              <>
                <div className="bg-gray-100 border-b border-gray-200 relative">
                  {p.flagship && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wide bg-blue-600 text-white rounded-full px-2.5 py-1">
                      Flagship
                    </span>
                  )}
                  {p.domain ? (
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="ml-3 flex-1 bg-white rounded-md text-[11px] text-gray-400 px-3 py-1 truncate">
                        https://{p.domain}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-3 text-gray-500">
                      <Workflow size={15} />
                      <span className="text-[11px] font-medium uppercase tracking-wide">{p.label ?? "Internal project"}</span>
                    </div>
                  )}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.title} — built by Cavele Digital`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 rounded-full px-3 py-1">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-gray-900 mt-4 flex items-center gap-2">
                    {p.title}
                    <ArrowUpRight size={18} className="text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{p.result}</p>
                  {p.live && <span className="text-xs text-blue-600 font-medium mt-2 block">Visit live site →</span>}
                </div>
              </>
            );
            return p.live ? (
              <a key={p.title} href={p.live} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {inner}
              </a>
            ) : (
              <article key={p.title} className={cardClass}>
                {inner}
              </article>
            );
          })}
        </div>

        {/* Conversion strip */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left p-8">
          <div>
            <h3 className="text-xl font-extrabold font-poppins text-gray-900">Your project could be next.</h3>
            <p className="text-gray-500 font-OpenSans text-sm mt-1">
              Website, booking system, or automation — tell me what you need and I&apos;ll build it.
            </p>
          </div>
          <BtnPrimary to="/quote">
            <span className="inline-flex items-center gap-2">Get a Quote <ArrowRight size={16} /></span>
          </BtnPrimary>
        </div>
      </div>
    </section>
  );
}
