import { Code2, MapPin, GraduationCap, User } from "lucide-react";
import { BtnPrimary } from "@/components/ui/BtnPrimary";

const FACTS = [
  { icon: Code2, label: "Self-taught full-stack developer" },
  { icon: User, label: "Solo operator — you work with me directly" },
  { icon: MapPin, label: "Kroondal Ikemeleng, Rustenburg" },
  { icon: GraduationCap, label: "N6 Mechanical Engineering — Orbit TVET" },
];

export function AboutUs() {
  return (
    <section id="about" className="bg-blue-900 py-24 px-6 font-OpenSans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden order-last lg:order-first">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1000&q=80"
            alt="Building custom websites and systems"
            className="w-full h-full object-cover min-h-[300px]"
          />
          <div className="absolute bottom-5 left-5 bg-white rounded-xl px-5 py-3 shadow-lg">
            <p className="text-lg font-extrabold font-poppins text-gray-900 leading-none">Cavele Digital</p>
            <p className="text-xs text-gray-500 mt-1">Built by Joseph Cavele</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="inline-flex items-center gap-2 text-blue-300 text-xs font-semibold font-poppins uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-blue-400" /> About
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-white leading-tight mb-5">
            One developer. Real skills. No shortcuts.
          </h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            I&apos;m Joseph Cavele, a self-taught full-stack developer based in Kroondal Ikemeleng,
            Rustenburg. I build custom websites, booking &amp; management systems, and business
            automation — everything from scratch, tailored to the business it&apos;s for.
          </p>
          <p className="text-blue-100 leading-relaxed mb-8">
            Alongside development I tutor mathematics and physical science and work at a college, and
            I completed my N6 in Mechanical Engineering at Orbit TVET College. When you hire Cavele
            Digital, you deal directly with me — no account managers, no outsourcing, no big-agency
            markup.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {FACTS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-3 text-sm text-blue-50">
                  <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-blue-300 shrink-0">
                    <Icon size={17} />
                  </span>
                  {f.label}
                </div>
              );
            })}
          </div>

          <BtnPrimary to="/quote">Work with me</BtnPrimary>
        </div>
      </div>
    </section>
  );
}
