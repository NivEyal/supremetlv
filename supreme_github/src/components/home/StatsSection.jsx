import { motion } from 'framer-motion';
import { useLang } from '../../lib/i18n';
import { tlvStats } from '../../data/tlv-properties';

export default function StatsSection() {
  const { lang } = useLang();

  return (
    <section className="py-16 bg-navy">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10 rtl:lg:divide-x-reverse">
          {tlvStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center lg:px-10 group"
            >
              <div className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs tracking-[0.2em] uppercase">
                {lang === 'he' ? stat.label_he : stat.label_en}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}