import { Globe, CalendarCheck, Workflow, Wrench, Megaphone } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Custom, mobile-first websites built from scratch — fast, responsive, and made to bring in enquiries.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & Management Systems",
    desc: "Full booking ecosystems — a client-facing booking site, an admin dashboard, and a management app to run it all.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    desc: "Automated workflows that cut repetitive admin, so you spend less time on busywork and more on the business.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    desc: "Updates, fixes, and ongoing support to keep your site or system fast, secure, and online.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            What I Do
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight mb-4">
            Services built for real businesses
          </h2>
          <p className="text-gray-500 font-OpenSans leading-relaxed">
            Everything is built from scratch and tailored to your business — no templates, no
            outsourcing, and you deal directly with the developer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm font-OpenSans leading-relaxed">{service.desc}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>
            );
          })}
        </div>

        {/* Honest note on digital marketing — no fabricated track record */}
        <div className="mt-8 flex items-start gap-4 bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-xl bg-white text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Megaphone size={20} />
          </div>
          <div>
            <h3 className="font-bold font-poppins text-gray-900">Digital marketing — coming soon</h3>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed max-w-3xl">
              I&apos;ve completed courses in Google Ads, Facebook Ads, and email marketing and I&apos;m
              building these out as a service. I won&apos;t pretend to have a long track record here yet —
              if you&apos;re keen, ask about founding-client rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
