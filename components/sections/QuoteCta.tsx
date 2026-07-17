import { BtnPrimary } from "@/components/ui/BtnPrimary";
import { BtnOutline } from "@/components/ui/BtnOutline";

export function QuoteCta() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-blue-900 px-8 md:px-16 py-14 text-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-700 opacity-30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-blue-600 opacity-20 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              Free, no-obligation quote
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-white leading-tight mb-4 max-w-2xl mx-auto">
              Ready to start your project?
            </h2>
            <p className="text-blue-100 font-OpenSans leading-relaxed max-w-xl mx-auto mb-8">
              Tell me what you need and I&apos;ll send you a clear plan and quote within one
              business day. No pressure, no jargon — and you&apos;ll deal directly with the developer.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <BtnPrimary to="/quote">Get a Free Quote</BtnPrimary>
              <BtnOutline dark to="/#work">View Our Work</BtnOutline>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
