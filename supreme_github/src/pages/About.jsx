import { motion } from 'framer-motion';
import { Shield, Award, Users, Globe, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../lib/i18n';

const values = [
  { Icon: Shield, title_he: 'אמינות מוחלטת', title_en: 'Absolute Integrity', desc_he: 'כל עסקה מנוהלת ברמת שקיפות ואמינות מקצועית שאין דומה לה.', desc_en: 'Every deal is managed with a level of transparency and professional integrity that is unmatched.' },
  { Icon: Award, title_he: 'מצוינות', title_en: 'Excellence', desc_he: 'אנחנו לא מסתפקים בפחות מהטוב ביותר — עבורך ועבור הנכס שלך.', desc_en: "We never settle for less than the best — for you and for your property." },
  { Icon: Users, title_he: 'שירות אישי', title_en: 'Personal Service', desc_he: 'כל לקוח מקבל ליווי אישי מסוכן ייעודי עם זמינות מלאה.', desc_en: 'Every client receives personal guidance from a dedicated agent with full availability.' },
  { Icon: Globe, title_he: 'רשת בינלאומית', title_en: 'International Network', desc_he: 'קשרים ענפים עם קונים ומשקיעים מרחבי העולם — ארה״ב, אירופה, אסיה.', desc_en: 'Extensive connections with buyers and investors from around the world — USA, Europe, Asia.' },
];

export default function About() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-navy py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="w-5 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'הסיפור שלנו' : 'Our Story'}
            </span>
            <span className="w-5 h-px bg-gold" />
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
            {lang === 'he' ? 'אודות Supreme TLV' : 'About Supreme TLV'}
          </h1>
        </motion.div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=85" alt="About" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="font-playfair text-4xl font-bold text-navy mb-5">
                {lang === 'he' ? '22 שנות\nיוקרה בנדל״ן' : '22 Years of\nLuxury Real Estate'}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === 'he'
                  ? 'Supreme TLV נוסדה בשנת 2003 עם חזון אחד בלבד: להיות החברה המובילה בתחום הנדל״ן היוקרתי בישראל.'
                  : 'Supreme TLV was founded in 2003 with a single vision: to be the leading luxury real estate company in Israel.'}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {lang === 'he'
                  ? 'בשנים שחלפו, ניהלנו אלפי עסקאות בהיקף של מיליארדי שקלים, ובנינו מוניטין של אמינות, מקצועיות ושירות יוצא מן הכלל.'
                  : 'Over the years, we have managed thousands of transactions worth billions of shekels, and have built a reputation for reliability, professionalism and outstanding service.'}
              </p>
              <Link to="/contact" className="inline-block bg-gold text-white font-medium px-8 py-4 rounded-sm hover:bg-gold/90 transition-colors text-sm tracking-wide cursor-pointer">
                {lang === 'he' ? 'צור קשר' : 'Contact Us'}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <h2 className="font-playfair text-4xl font-bold text-white">
              {lang === 'he' ? 'הערכים שלנו' : 'Our Values'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title_he, title_en, desc_he, desc_en }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-sm p-6 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 rounded-sm bg-gold/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">{lang === 'he' ? title_he : title_en}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{lang === 'he' ? desc_he : desc_en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-background">
        <div className="max-w-xl mx-auto px-5">
          <h2 className="font-playfair text-3xl font-bold text-navy mb-4">
            {lang === 'he' ? 'מוכן להתחיל?' : 'Ready to Begin?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {lang === 'he' ? 'פנה אלינו עכשיו ונמצא לך את הנכס המושלם' : 'Contact us now and we\'ll find you the perfect property'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/properties" className="bg-gold text-white font-medium px-8 py-3.5 rounded-sm hover:bg-gold/90 transition-colors text-sm tracking-wide cursor-pointer">
              {lang === 'he' ? 'לכל הנכסים' : 'Browse Properties'}
            </Link>
            <Link to="/contact" className="border border-navy text-navy font-medium px-8 py-3.5 rounded-sm hover:bg-navy hover:text-white transition-colors text-sm tracking-wide cursor-pointer">
              {lang === 'he' ? 'צור קשר' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}