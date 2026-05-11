import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Check } from 'lucide-react';
import { useLang } from '../lib/i18n';

export default function Contact() {
  const { lang } = useLang();
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', budget: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Send via WhatsApp as fallback
    const msg = encodeURIComponent(
      `New Lead from Supreme TLV\n\nName: ${form.full_name}\nPhone: ${form.phone}\nEmail: ${form.email}\nBudget: ${form.budget}\nMessage: ${form.message}`
    );
    // Open WhatsApp in background
    window.open(`https://wa.me/972554369087?text=${msg}`, '_blank');
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ full_name: '', phone: '', email: '', budget: '', message: '' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-navy py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="w-5 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'דברו איתנו' : 'Get In Touch'}
            </span>
            <span className="w-5 h-px bg-gold" />
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
            {lang === 'he' ? 'צור קשר' : 'Contact Us'}
          </h1>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-navy mb-4">
              {lang === 'he' ? 'נשמח לשמוע ממך' : "We'd Love to Hear From You"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              {lang === 'he'
                ? 'צוות Supreme TLV זמין עבורך בכל שעה. נחזור אליך תוך שעה.'
                : "The Supreme TLV team is available at any time. We'll get back to you within an hour."}
            </p>
            <div className="space-y-5 mb-10">
              {[
                { Icon: Phone, label: lang === 'he' ? 'טלפון' : 'Phone', value: '055-4369087', href: 'tel:0554369087' },
                { Icon: Mail, label: lang === 'he' ? 'אימייל' : 'Email', value: 'info@supremetlv.com', href: 'mailto:info@supremetlv.com' },
                { Icon: MapPin, label: lang === 'he' ? 'כתובת' : 'Address', value: lang === 'he' ? 'רחוב דיזנגוף 120, תל אביב' : '120 Dizengoff St, Tel Aviv', href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-foreground hover:text-gold transition-colors" dir="ltr">{value}</a>
                      : <span className="text-foreground">{value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="aspect-video rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80" alt="Office" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-sm p-8">
            <h3 className="font-playfair text-2xl font-bold text-navy mb-6">
              {lang === 'he' ? 'השאר פרטים' : 'Leave Your Details'}
            </h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h4 className="font-playfair text-xl font-semibold text-foreground mb-2">
                  {lang === 'he' ? 'תודה!' : 'Thank You!'}
                </h4>
                <p className="text-muted-foreground">
                  {lang === 'he' ? 'נחזור אליך תוך שעה' : "We'll be in touch within an hour"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                      {lang === 'he' ? 'שם מלא *' : 'Full Name *'}
                    </label>
                    <input required value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-gold transition-colors bg-background" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                      {lang === 'he' ? 'טלפון *' : 'Phone *'}
                    </label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-gold transition-colors bg-background" dir="ltr" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                    {lang === 'he' ? 'אימייל' : 'Email'}
                  </label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-gold transition-colors bg-background" dir="ltr" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                    {lang === 'he' ? 'תקציב' : 'Budget'}
                  </label>
                  <input value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                    placeholder={lang === 'he' ? 'לדוגמה: ₪10-15 מיליון' : 'e.g. ₪10-15 million'}
                    className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                    {lang === 'he' ? 'הודעה' : 'Message'}
                  </label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4} placeholder={lang === 'he' ? 'מה אתה מחפש?' : 'What are you looking for?'}
                    className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-gold transition-colors bg-background resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full bg-gold text-white py-4 text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-gold/90 transition-colors cursor-pointer disabled:opacity-60">
                  {sending ? '...' : (lang === 'he' ? 'שלח' : 'Submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
