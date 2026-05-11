import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../lib/i18n';

export default function NewsletterSection() {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-background border-t border-border/40">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-6 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'הישאר מעודכן' : 'Stay Updated'}
            </span>
            <span className="w-6 h-px bg-gold" />
          </span>

          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
            {lang === 'he' ? 'נכסים חדשים ראשון' : 'Get New Properties First'}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {lang === 'he'
              ? 'הצטרף לרשימת לקוחות VIP שלנו וקבל גישה ראשונה לנכסים בלעדיים לפני שהם מפורסמים.'
              : 'Join our VIP client list and get first access to exclusive properties before they go public.'}
          </p>

          {submitted ? (
            <div className="text-gold font-medium text-lg">
              {lang === 'he' ? '✓ נרשמת בהצלחה! נחזור אליך בקרוב.' : '✓ Subscribed! We\'ll be in touch soon.'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'he' ? 'כתובת האימייל שלך' : 'Your email address'}
                required
                className="flex-1 px-4 py-3 border border-border rounded-sm text-sm bg-card outline-none focus:border-gold transition-colors text-start"
                dir="ltr"
              />
              <button
                type="submit"
                className="bg-gold text-white font-medium px-6 py-3 rounded-sm hover:bg-gold/90 transition-colors text-sm tracking-wide whitespace-nowrap cursor-pointer"
              >
                {lang === 'he' ? 'הרשמה' : 'Subscribe'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}