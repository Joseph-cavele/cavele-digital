import { BtnPrimary } from "@/components/ui/BtnPrimary";
import { BtnOutline } from "@/components/ui/BtnOutline";
import { C } from "@/lib/colors";

export function Hero() {
  return (
    <div className="bg-white font-OpenSans flex items-center" id="top">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .f1 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.1s both; }
        .f2 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.25s both; }
        .f3 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.4s both; }
        .f4 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.55s both; }
        .f5 { animation: fadeIn 0.9s ease 0.5s both; }
        .float-card { background: #fff; border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,.13), 0 2px 8px rgba(0,0,0,.06); }
        .img-slot { width: 100%; border-radius: 24px; overflow: hidden; background: linear-gradient(135deg,#f1f5f9,#e2e8f0); }
      `}</style>

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT */}
        <div>
          <div className="f1 inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Web Development · Rustenburg, SA
          </div>

          <h1
            className="f2 text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 leading-tight mb-5"
            style={{ letterSpacing: "-0.02em" }}
          >
            Custom websites &amp; systems,{" "}
            <span style={{ color: C.h1 }}>built from scratch</span>.
          </h1>

          <p className="f3 text-gray-500 text-[15px] md:text-base font-OpenSans leading-relaxed mb-9 max-w-lg">
            I&apos;m Joseph Cavele, a self-taught full-stack developer. I build mobile-first
            websites, booking &amp; management systems, and business automation — and you work
            directly with me, from first message to launch.
          </p>

          <div className="f4 flex flex-wrap gap-3">
            <BtnPrimary to="/quote">Get a Quote</BtnPrimary>
            <BtnOutline to="/#work">View Our Work</BtnOutline>
          </div>
        </div>

        {/* RIGHT */}
        <div className="f5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-none">
            <div className="img-slot">
              <img
                src="/hero-bg.png"
                alt="Cavele Digital — custom web development"
                className="w-full h-64 md:h-[420px] object-cover rounded-3xl shadow-md"
              />
            </div>

            {/* Honest positioning card — no fabricated numbers */}
            <div className="float-card absolute -bottom-5 left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0 flex items-center gap-3 px-4 py-3 f3 whitespace-nowrap">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">👨‍💻</div>
              <div>
                <div className="text-sm font-extrabold text-gray-900 font-poppins">One developer, start to finish</div>
                <div className="text-xs text-gray-400">Direct access — no agency middlemen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
