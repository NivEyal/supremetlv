import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLang } from '../../lib/i18n';

export default function Footer() {
  const { lang } = useLang();

  const links = [
    { label: lang === 'he' ? 'בית' : 'Home', path: '/' },
    { label: lang === 'he' ? 'נכסים' : 'Properties', path: '/properties' },
    { label: lang === 'he' ? 'שכונות' : 'Neighborhoods', path: '/neighborhoods' },
    { label: lang === 'he' ? 'אודות' : 'About', path: '/about' },
    { label: lang === 'he' ? 'צור קשר' : 'Contact', path: '/contact' },
    { label: lang === 'he' ? 'ניהול' : 'Admin', path: '/admin' },
  ];

  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-white font-playfair font-bold text-xs">S</span>
              </div>
              <div>
                <span className="font-playfair font-bold text-lg text-white block leading-none">Supreme TLV</span>
                <span className="text-[10px] tracking-widest uppercase text-white/40">
                  {lang === 'he' ? 'נדל״ן יוקרה' : 'Luxury Real Estate'}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              {lang === 'he'
                ? 'פלטפורמת הנדל״ן היוקרתי המובילה בישראל, עם 22 שנות ניסיון ומיליארדי שקלים של עסקאות.'
                : "Israel's leading luxury real estate platform, with 22 years of experience and billions in transactions."}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
              {lang === 'he' ? 'ניווט' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-gold transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
              {lang === 'he' ? 'יצירת קשר' : 'Contact'}
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <div dir="ltr">
                  <div className="text-white/70 font-medium">{lang === 'he' ? 'אלכסיי קשין' : 'Aleksey Kashin'}</div>
                  <a href="tel:055-4369087" className="hover:text-white transition-colors">055-4369087</a>
                  <div className="text-white/30 text-xs">{lang === 'he' ? 'שיחות בלבד (ללא SMS)' : 'Calls only (no SMS)'}</div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href="mailto:info@supremetlv.com" className="hover:text-white transition-colors" dir="ltr">info@supremetlv.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  {lang === 'he' ? 'רחוב דיזנגוף 120, תל אביב' : '120 Dizengoff St, Tel Aviv'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2025 Supreme TLV. {lang === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</span>
          <span>{lang === 'he' ? 'אלכסיי קשין · רישיון תיווך מס׳ 3222623' : 'Aleksey Kashin · Broker License No. 3222623'}</span>
        </div>
      </div>
    </footer>
  );
}