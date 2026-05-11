import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { tlvTestimonials } from '../../data/tlv-properties';
import { useLang } from '../../lib/i18n';

export default function TestimonialsSection() {
  const { lang } = useLang();

  return (
    <section className="py-24 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="w-6 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'לקוחות מספרים' : 'Testimonials'}
            </span>
            <span className="w-6 h-px bg-gold" />
          </span>
          <h2 className="font-playfair text-4xl font-bold text-white">
            {lang === 'he' ? 'מה אומרים הלקוחות' : 'What Our Clients Say'}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tlvTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-sm p-7 hover:bg-white/8 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-white/75 text-sm leading-relaxed mb-6 italic">
                "{lang === 'he' ? t.text_he : t.text_en}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium text-sm">
                    {lang === 'he' ? t.name : t.name_en}
                  </div>
                  <div className="text-gold text-xs mt-0.5">
                    {lang === 'he' ? t.role_he : t.role_en}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}