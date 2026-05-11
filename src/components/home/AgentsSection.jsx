import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { useLang } from '../../lib/i18n';

const agents = [
  {
    name: "נועה כהן",
    name_en: "Noa Cohen",
    title_he: "מומחית פנטהאוזים ועל-יוקרה",
    title_en: "Penthouse & Ultra-Luxury Expert",
    phone: "050-555-0192",
    email: "noa@supremetlv.com",
    bio_he: "15+ שנות ניסיון בנכסי על-יוקרה. עסקת שיא ₪42M בהרצליה פיתוח.",
    bio_en: "15+ years in ultra-luxury properties. Record deal ₪42M in Herzliya Pituach.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    sales: 142,
    rating: 4.9,
    areas_he: ["הרצליה פיתוח", "כפר שמריהו"],
    areas_en: ["Herzliya Pituach", "Kfar Shmaryahu"],
  },
  {
    name: "יאיר לוי",
    name_en: "Yair Levy",
    title_he: "מומחה נדל״ן תל אביבי",
    title_en: "Tel Aviv Real Estate Expert",
    phone: "052-555-0188",
    email: "yair@supremetlv.com",
    bio_he: "12 שנות מיקוד בנכסי יוקרה בתל אביב ובאזור גוש דן.",
    bio_en: "12 years focused on luxury properties in Tel Aviv and Gush Dan.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    sales: 118,
    rating: 4.8,
    areas_he: ["נווה צדק", "הצפון הישן"],
    areas_en: ["Neve Tzedek", "Old North"],
  },
  {
    name: "מיכל דוד",
    name_en: "Michal David",
    title_he: "יועצת השקעות נדל״ן",
    title_en: "Real Estate Investment Advisor",
    phone: "054-555-0177",
    email: "michal@supremetlv.com",
    bio_he: "מתמחה בוילות ובנכסי השקעה ברמה הגבוהה ביותר בישראל.",
    bio_en: "Specializes in villas and high-end investment properties in Israel.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    sales: 96,
    rating: 4.9,
    areas_he: ["רמת השרון", "כפר שמריהו"],
    areas_en: ["Ramat HaSharon", "Kfar Shmaryahu"],
  },
];

export default function AgentsSection() {
  const { lang } = useLang();

  return (
    <section className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="w-6 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'הצוות שלנו' : 'Our Team'}
            </span>
            <span className="w-6 h-px bg-gold" />
          </span>
          <h2 className="font-playfair text-4xl font-bold text-navy">
            {lang === 'he' ? 'הסוכנים שלנו' : 'Meet Our Agents'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-card border border-border/60 rounded-sm p-6 hover:shadow-md transition-all group"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -end-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {lang === 'he' ? agent.name : agent.name_en}
                  </h3>
                  <p className="text-gold text-xs mt-0.5">
                    {lang === 'he' ? agent.title_he : agent.title_en}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {lang === 'he' ? agent.bio_he : agent.bio_en}
              </p>

              {/* Areas */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(lang === 'he' ? agent.areas_he : agent.areas_en).map((area) => (
                  <span key={area} className="text-[10px] bg-gold/8 text-gold border border-gold/20 px-2 py-0.5 rounded-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-xs text-muted-foreground border-t border-border/50 pt-4 mb-4">
                <span className="font-medium text-foreground">{agent.sales}</span>
                <span>{lang === 'he' ? 'עסקאות' : 'deals'}</span>
                <span className="mx-1">·</span>
                <span>★ {agent.rating}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border text-sm text-muted-foreground hover:border-gold hover:text-gold rounded-sm transition-colors cursor-pointer">
                  <Phone className="w-3.5 h-3.5" />
                  {lang === 'he' ? 'התקשר' : 'Call'}
                </a>
                <a href={`mailto:${agent.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-navy text-white text-sm rounded-sm hover:bg-navy/90 transition-colors cursor-pointer">
                  <Mail className="w-3.5 h-3.5" />
                  {lang === 'he' ? 'שלח מייל' : 'Email'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}