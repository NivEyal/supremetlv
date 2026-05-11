import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { tlvNeighborhoods } from '../../data/tlv-properties';
import { useLang } from '../../lib/i18n';

function formatPrice(price) {
  return `₪${(price / 1000000).toFixed(0)}M`;
}

export default function NeighborhoodsCarousel() {
  const { lang, isRTL } = useLang();

  return (
    <section className="py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-gold" />
              <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
                {lang === 'he' ? 'לפי מיקום' : 'By Location'}
              </span>
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-navy leading-tight">
              {lang === 'he' ? 'שכונות יוקרה' : 'Luxury Neighborhoods'}
            </h2>
          </div>
          <Link
            to="/neighborhoods"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors cursor-pointer group"
          >
            {lang === 'he' ? 'לכל השכונות' : 'All Areas'}
            {isRTL ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tlvNeighborhoods.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
            >
              <Link
                to={`/properties?neighborhood=${encodeURIComponent(lang === 'he' ? n.name_he : n.name_en)}`}
                className="group relative block h-52 overflow-hidden rounded-sm cursor-pointer"
              >
                <img
                  src={n.image}
                  alt={lang === 'he' ? n.name_he : n.name_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 end-4">
                  <span className="glass text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    {lang === 'he' ? n.tag_he : n.tag_en}
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 start-0 end-0 p-5">
                  <h3 className="font-playfair text-lg font-bold text-white mb-1 leading-snug">
                    {lang === 'he' ? n.name_he : n.name_en}
                  </h3>
                  <p className="text-white/65 text-xs mb-2 leading-relaxed">
                    {lang === 'he' ? n.description_he : n.description_en}
                  </p>
                  <div className="flex items-center gap-3 text-white/50 text-xs">
                    <span>{n.properties} {lang === 'he' ? 'נכסים' : 'properties'}</span>
                    <span>•</span>
                    <span className="text-gold font-medium">{lang === 'he' ? 'ממוצע' : 'Avg'} {formatPrice(n.avgPrice)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}