import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tlvNeighborhoods } from '../data/tlv-properties';
import { useLang } from '../lib/i18n';

function formatPrice(price) {
  return `₪${(price / 1000000).toFixed(0)}M`;
}

export default function Neighborhoods() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-navy py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="w-5 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'לפי מיקום' : 'By Location'}
            </span>
            <span className="w-5 h-px bg-gold" />
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
            {lang === 'he' ? 'שכונות יוקרה' : 'Luxury Neighborhoods'}
          </h1>
          <p className="text-white/50 text-sm mt-2">
            {lang === 'he' ? 'הכירו את האזורים המבוקשים ביותר' : "Explore Tel Aviv's most sought-after areas"}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tlvNeighborhoods.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link
                to={`/properties?neighborhood=${encodeURIComponent(lang === 'he' ? n.name_he : n.name_en)}`}
                className="group block bg-card border border-border/60 rounded-sm overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={n.image}
                    alt={lang === 'he' ? n.name_he : n.name_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 end-3">
                    <span className="glass text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      {lang === 'he' ? n.tag_he : n.tag_en}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-playfair text-xl font-bold text-navy group-hover:text-gold transition-colors mb-1.5">
                    {lang === 'he' ? n.name_he : n.name_en}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {lang === 'he' ? n.description_he : n.description_en}
                  </p>
                  <div className="flex items-center justify-between text-sm border-t border-border/40 pt-3">
                    <span className="text-muted-foreground">
                      {n.properties} {lang === 'he' ? 'נכסים' : 'properties'}
                    </span>
                    <span className="text-gold font-bold">
                      {lang === 'he' ? 'ממוצע' : 'Avg'} {formatPrice(n.avgPrice)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}