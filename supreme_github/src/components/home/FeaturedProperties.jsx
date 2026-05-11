import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, Waves } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { useFeaturedProperties } from '../../hooks/useProperties';

function formatPrice(price) {
  if (price >= 1000000) {
    const m = price / 1000000;
    return `₪${Number.isInteger(m) ? m : m.toFixed(3).replace(/\.?0+$/, '')}M`;
  }
  return `₪${(price / 1000).toFixed(0)}K`;
}

const tagColors = {
  Exclusive: 'bg-gold/10 text-gold border-gold/20',
  New: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Luxury: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'For Rent': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
};

export default function FeaturedProperties() {
  const { lang, t } = useLang();
  const { data: featured = [], isLoading } = useFeaturedProperties();

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-gold" />
              <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
                {lang === 'he' ? 'נבחרי הבית' : 'Featured'}
              </span>
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-navy leading-tight">
              {lang === 'he' ? 'נכסים בלעדיים' : 'Exclusive Properties'}
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors cursor-pointer group"
          >
            {lang === 'he' ? 'לכל הנכסים' : 'View All'}
            <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
          </Link>
        </div>

        {/* Grid */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-secondary border-t-gold rounded-full animate-spin" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <PropertyCard property={property} lang={lang} />
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link to="/properties" className="inline-block border border-gold text-gold text-sm font-medium px-8 py-3 rounded-sm hover:bg-gold/5 transition-colors cursor-pointer tracking-wide">
            {lang === 'he' ? 'לכל הנכסים' : 'View All Properties'}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property, lang }) {
  const title = lang === 'he' ? property.title_he : property.title_en;
  const neighborhood = lang === 'he' ? property.neighborhood_he : property.neighborhood_en;
  const tagClass = tagColors[property.tag] || tagColors['New'];
  const displayId = property.id;

  return (
    <Link to={`/properties/${property.id}`} className="group block bg-card rounded-sm overflow-hidden border border-border/60 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={property.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Tag */}
        <div className={`absolute top-4 start-4 px-3 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-wider border ${tagClass}`}>
          {property.tag}
        </div>

        {/* Badges */}
        <div className="absolute top-4 end-4 flex flex-col gap-1.5">
          {property.sea_view && (
            <span className="glass text-white text-[10px] font-medium px-2 py-1 rounded-sm flex items-center gap-1">
              <Waves className="w-3 h-3" />
              {lang === 'he' ? 'נוף לים' : 'Sea View'}
            </span>
          )}
        </div>

        {/* Price overlay on hover */}
        <div className="absolute bottom-4 start-4 end-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="text-white font-playfair text-2xl font-bold">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-playfair text-base font-semibold text-foreground leading-snug group-hover:text-gold transition-colors line-clamp-2">
            {title}
          </h3>
          <span className="text-gold font-bold text-base whitespace-nowrap flex-shrink-0">
            {formatPrice(property.price)}
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-4">{neighborhood}</p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border/50 pt-4">
          <span className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            {property.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5" />
            {property.baths}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5" />
            {property.sqm} {lang === 'he' ? 'מ״ר' : 'sqm'}
          </span>
          {property.floor > 0 && (
            <span className="text-xs ms-auto text-muted-foreground/70">
              {lang === 'he' ? `קומה ${property.floor}` : `Floor ${property.floor}`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}