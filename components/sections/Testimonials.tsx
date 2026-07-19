import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Owner, Mukhabela Construction"
};

/**
 * HARD RULE (see CLAUDE.md): only REAL quotes from REAL clients go here,
 * with their permission. Never add invented testimonials — the section
 * stays hidden until there is at least one genuine quote.
 */
const TESTIMONIALS: Testimonial[] = [];

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight">
            What clients say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
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
      </div>
    </section>
  );
}
