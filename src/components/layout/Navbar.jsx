import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../lib/i18n';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t, isRTL } = useLang();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.properties'), path: '/properties' },
    { label: t('nav.neighborhoods'), path: '/neighborhoods' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isHome = location.pathname === '/';
  const transparent = !scrolled && isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/96 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className={`w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-300 ${transparent ? 'bg-gold' : 'bg-gold'}`}>
              <span className="text-white font-playfair font-bold text-sm tracking-wider">S</span>
            </div>
            <div className="leading-none">
              <span className={`font-playfair font-bold text-lg tracking-tight block transition-colors duration-300 ${transparent ? 'text-white' : 'text-navy'}`}>
                Supreme TLV
              </span>
              <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${transparent ? 'text-white/60' : 'text-muted-foreground'}`}>
                {lang === 'he' ? 'נדל״ן יוקרה' : 'Luxury Real Estate'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative group cursor-pointer ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : transparent
                    ? 'text-white/85 hover:text-white'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-px bg-gold transition-transform duration-200 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle with flags */}
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer px-3 py-1.5 rounded-full border ${
                transparent
                  ? 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'
                  : 'border-border text-muted-foreground hover:border-gold hover:text-gold'
              }`}
              title={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
            >
              <span className="text-base leading-none">{lang === 'he' ? '🇺🇸' : '🇮🇱'}</span>
              <span>{lang === 'he' ? 'EN' : 'עב'}</span>
            </button>

            <a
              href="tel:03-555-0100"
              className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                transparent ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              03-555-0100
            </a>
            <Link
              to="/contact"
              className="bg-gold text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-gold/90 transition-all duration-200 tracking-wide cursor-pointer"
            >
              {t('nav.bookViewing')}
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className={`flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer ${
                transparent ? 'text-white/70' : 'text-muted-foreground'
              }`}
            >
              <span className="text-base leading-none">{lang === 'he' ? '🇺🇸' : '🇮🇱'}</span>
              <span>{lang === 'he' ? 'EN' : 'עב'}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors cursor-pointer ${
                transparent ? 'text-white' : 'text-foreground'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-white border-t border-border/50 shadow-xl"
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    location.pathname === link.path
                      ? 'text-gold bg-gold/5'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border/50 mt-3">
                <Link
                  to="/contact"
                  className="block w-full text-center bg-gold text-white text-sm font-medium px-5 py-3 mt-2 tracking-wide cursor-pointer"
                >
                  {t('nav.bookViewing')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}