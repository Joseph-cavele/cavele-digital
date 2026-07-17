import { UserCheck, Hammer, Smartphone, MessageSquare } from "lucide-react";

const REASONS = [
  {
    id: 1,
    title: "Direct access to the developer",
    icon: UserCheck,
    desc: "You talk to the person actually building your project — not a salesperson or an account manager.",
  },
  {
    id: 2,
    title: "Built from scratch",
    icon: Hammer,
    desc: "No page-builder templates or recycled themes. Everything is coded and tailored to your business.",
  },
  {
    id: 3,
    title: "Mobile-first",
    icon: Smartphone,
    desc: "Most of your visitors are on their phones, so your site is designed for mobile first and looks great everywhere.",
  },
  {
    id: 4,
    title: "Honest and clear",
    icon: MessageSquare,
    desc: "Straight answers, a clear quote before we start, and no overselling. If something isn't the right fit, I'll tell you.",
  },
];

export function Features() {
  return (
    <section id="why" className="px-6 bg-white py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center md:text-left mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Why Choose Cavele Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight">
            One developer who actually cares about your project
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className="group relative flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute top-5 right-6 text-4xl font-extrabold font-poppins text-gray-100 leading-none select-none">
                  0{r.id}
                </span>
                <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold font-poppins text-lg text-gray-900 mb-2 leading-snug">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
