import { MessageSquareText, Hammer, Rocket } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: MessageSquareText,
    title: "Get a quote",
    desc: "Tell me about your project. I'll reply within one business day with a clear plan and price — free, no obligation.",
  },
  {
    n: "02",
    icon: Hammer,
    title: "I build it",
    desc: "I design and build your website or system from scratch, keeping you updated and asking for feedback along the way.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Launch & support",
    desc: "We go live, and I'm still here — for updates, fixes, and improvements whenever you need them.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight">
            Simple, honest process
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <span className="absolute top-6 right-7 text-5xl font-extrabold font-poppins text-gray-100 leading-none select-none">
                  {s.n}
                </span>
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
