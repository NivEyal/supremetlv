import { motion } from 'framer-motion';
import { Shield, Eye, Zap, Globe } from 'lucide-react';
import { useLang } from '../../lib/i18n';

const features = [
  {
    icon: Shield,
    title_he: 'שירות White Glove',
    title_en: 'White Glove Service',
    desc_he: 'ליווי אישי מרמה הגבוהה ביותר, מהחיפוש הראשון ועד המסירה הסופית.',
    desc_en: 'Personal guidance at the highest level, from first search to final handover.',
  },
  {
    icon: Eye,
    title_he: 'נכסים בלעדיים',
    title_en: 'Exclusive Listings',
    desc_he: 'גישה לנכסים שאינם מפורסמים בשום מקום אחר — רק דרכנו.',
    desc_en: 'Access to properties not listed anywhere else — exclusively through us.',
  },
  {
    icon: Zap,
    title_he: '22 שנות ניסיון',
    title_en: '22 Years Experience',
    desc_he: 'צוות ותיק ומנוסה עם ידע עמוק בשוק היוקרה הישראלי.',
    desc_en: 'A seasoned team with deep knowledge of the Israeli luxury market.',
  },
  {
    icon: Globe,
    title_he: 'לקוחות בינלאומיים',
    title_en: 'International Clients',
    desc_he: 'ניסיון עשיר עם תושבי חוץ, משקיעים זרים ורילוקיישן מהעולם.',
    desc_en: 'Rich experience with overseas buyers, foreign investors and global relocation.',
  },
];

export default function WhyChooseUs() {
  const { lang } = useLang();

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"
                alt="Luxury interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-6 -end-6 bg-white shadow-xl rounded-sm p-6 max-w-[180px]">
              <div className="font-playfair text-3xl font-bold text-navy">₪8B+</div>
              <div className="text-muted-foreground text-xs mt-1 leading-relaxed">
                {lang === 'he' ? 'שווי עסקאות סה״כ' : 'Total value transacted'}
              </div>
            </div>
            {/* Gold accent */}
            <div className="absolute -top-4 -start-4 w-24 h-24 border-2 border-gold/30 rounded-sm" />
          </motion.div>

          {/* Right — Content */}
          <div>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-gold" />
              <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
                {lang === 'he' ? 'למה אנחנו' : 'Why Choose Us'}
              </span>
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-navy leading-tight mb-5">
              {lang === 'he' ? 'ההבדל\nהאמיתי' : 'The Real\nDifference'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              {lang === 'he'
                ? 'אנחנו לא סתם מתווכים — אנחנו שותפים אסטרטגיים שמכירים את שוק היוקרה מבפנים ומחוץ.'
                : "We're not just brokers — we're strategic partners who know the luxury market inside and out."}
            </p>

            <div className="space-y-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm">
                        {lang === 'he' ? f.title_he : f.title_en}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {lang === 'he' ? f.desc_he : f.desc_en}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}