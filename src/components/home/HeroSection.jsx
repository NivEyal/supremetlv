import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import HeroSearch from './HeroSearch';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=90",
    titleKey: 'hero.title1',
    subtitleKey: 'hero.subtitle1',
    tagKey: 'hero.tag',
  },
  {
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=90",
    titleKey: 'hero.title2',
    subtitleKey: 'hero.subtitle2',
    tagKey: 'hero.tag',
  },
  {
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=90",
    titleKey: 'hero.title3',
    subtitleKey: 'hero.subtitle3',
    tagKey: 'hero.tag',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { t, lang } = useLang();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-navy">
      {/* Background */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current}-${lang}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            {/* Tag */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
                {t(slide.tagKey)}
              </span>
            </motion.span>

            {/* Title */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 whitespace-pre-line">
              {t(slide.titleKey)}
            </h1>

            {/* Subtitle */}
            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
              {t(slide.subtitleKey)}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-7">
              <Link
                to="/properties"
                className="bg-gold text-white font-medium px-7 py-3.5 rounded-sm hover:bg-gold/90 transition-all duration-300 text-sm tracking-wide uppercase cursor-pointer"
              >
                {t('hero.browseProperties')}
              </Link>
              <Link
                to="/contact"
                className="group border border-white/30 text-white font-medium px-7 py-3.5 rounded-sm hover:border-white/70 hover:bg-white/8 transition-all duration-300 text-sm tracking-wide uppercase cursor-pointer flex items-center gap-2"
              >
                {t('hero.scheduleViewing')}
              </Link>
            </div>

            {/* Live Search */}
            <HeroSearch />

            {/* Stats row — directly below search, no overlap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex gap-8 sm:gap-12 mt-8"
            >
              {[
                { value: '1,400+', label: lang === 'he' ? 'נכסים נמכרו' : 'Properties Sold' },
                { value: '900+', label: lang === 'he' ? 'לקוחות מרוצים' : 'Happy Clients' },
                { value: '22', label: lang === 'he' ? 'שנות ניסיון' : 'Years Experience' },
                { value: '₪8B+', label: lang === 'he' ? 'שווי עסקאות' : 'Total Value Sold' },
              ].map((stat, i) => (
                <div key={i} className="text-white">
                  <div className="font-playfair text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <div className="text-white/50 text-[10px] tracking-wider uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Controls */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        <button
          onClick={prev}
          className="w-10 h-10 glass rounded-sm flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="w-10 h-10 glass rounded-sm flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-10 right-6 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`transition-all duration-400 rounded-full cursor-pointer ${i === current ? 'w-7 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute left-6 bottom-6 text-white/30 text-xs font-inter hidden md:flex items-center gap-2">
        <span className="text-white/70 font-medium text-base">{String(current + 1).padStart(2, '0')}</span>
        <span className="w-8 h-px bg-white/20" />
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}