import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, Phone, MessageCircle, ChevronLeft, ChevronRight, ArrowLeft, Check } from 'lucide-react';
import { useProperty } from '../hooks/useProperties';
import { useLang } from '../lib/i18n';

function formatPrice(price) {
  if (price >= 1000000) {
    const m = price / 1000000;
    return `₪${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  return `₪${(price / 1000).toFixed(0)}K`;
}

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, isLoading } = useProperty(id);
  const { lang } = useLang();
  const [imgIdx, setImgIdx] = useState(0);
  const [leadSent, setLeadSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="w-8 h-8 border-4 border-secondary border-t-gold rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="text-center">
        <h2 className="font-playfair text-2xl text-navy mb-4">Property not found</h2>
        <Link to="/properties" className="text-gold hover:underline">← Back to properties</Link>
      </div>
    </div>
  );

  const images = property.images || [property.image];
  const title = lang === 'he' ? property.title_he : property.title_en;
  const address = lang === 'he' ? property.address_he : property.address_en;
  const description = lang === 'he' ? property.description_he : property.description_en;
  const amenities = lang === 'he' ? property.amenities_he : property.amenities_en;

  const handleLead = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Interest in: ${title}\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`);
    window.open(`https://wa.me/972554369087?text=${msg}`, '_blank');
    setLeadSent(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6">
        <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          {lang === 'he' ? 'חזרה לנכסים' : 'Back to Properties'}
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[55vh] bg-muted overflow-hidden">
        <img src={images[imgIdx]} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {images.length > 1 && (
          <>
            <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-sm flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-sm flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`transition-all rounded-full cursor-pointer ${i === imgIdx ? 'w-6 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Left */}
          <div>
            <div className="flex flex-wrap items-start gap-4 mb-6">
              <div>
                <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-navy leading-tight">{title}</h1>
                <p className="text-muted-foreground flex items-center gap-1.5 mt-2 text-sm">
                  <MapPin className="w-3.5 h-3.5" />{address}
                </p>
              </div>
              <div className="ms-auto text-end">
                <div className="font-playfair text-3xl font-bold text-gold">{formatPrice(property.price)}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {lang === 'he' ? 'מחיר מבוקש' : 'Asking Price'}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-border/50 mb-8">
              {[
                { label: lang === 'he' ? 'חד׳ שינה' : 'Bedrooms', value: property.beds, Icon: Bed },
                { label: lang === 'he' ? 'אמבטיות' : 'Bathrooms', value: property.baths, Icon: Bath },
                { label: lang === 'he' ? 'שטח' : 'Area', value: `${property.sqm} ${lang === 'he' ? 'מ״ר' : 'sqm'}`, Icon: Maximize },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
                    <div className="font-semibold text-foreground">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {description && (
              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                  {lang === 'he' ? 'תיאור הנכס' : 'Property Description'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
            )}

            {amenities?.length > 0 && (
              <div>
                <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                  {lang === 'he' ? 'מתקנים' : 'Amenities'}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Contact */}
          <div>
            <div className="bg-card border border-border/50 rounded-sm p-6 sticky top-24">
              {property.agent && (
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
                  <img src={property.agent.avatar} alt={property.agent.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-foreground">{lang === 'he' ? property.agent.name : property.agent.name_en}</div>
                    <div className="text-xs text-muted-foreground">{lang === 'he' ? 'סוכן מוביל' : 'Lead Agent'}</div>
                  </div>
                </div>
              )}

              {leadSent ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-gold" />
                  </div>
                  <p className="font-medium text-foreground">{lang === 'he' ? 'נחזור אליך בקרוב!' : "We'll be in touch soon!"}</p>
                </div>
              ) : (
                <form onSubmit={handleLead} className="space-y-3">
                  <h3 className="font-playfair text-xl font-bold text-navy mb-4">
                    {lang === 'he' ? 'מעוניין בנכס?' : 'Interested?'}
                  </h3>
                  {[
                    { key: 'name', label: lang === 'he' ? 'שם *' : 'Name *', required: true },
                    { key: 'phone', label: lang === 'he' ? 'טלפון *' : 'Phone *', required: true },
                    { key: 'message', label: lang === 'he' ? 'הודעה' : 'Message', required: false },
                  ].map(({ key, label, required }) => (
                    <div key={key}>
                      <label className="text-xs text-muted-foreground block mb-1">{label}</label>
                      {key === 'message'
                        ? <textarea value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3}
                            className="w-full px-3 py-2.5 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background resize-none" />
                        : <input required={required} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                            className="w-full px-3 py-2.5 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background" dir={key === 'phone' ? 'ltr' : undefined} />
                      }
                    </div>
                  ))}
                  <button type="submit" className="w-full bg-gold text-white py-3 text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors cursor-pointer">
                    {lang === 'he' ? 'שלח פנייה' : 'Send Inquiry'}
                  </button>
                </form>
              )}

              <div className="flex gap-2 mt-3">
                <a href={`tel:${property.agent?.phone || '0554369087'}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border rounded-sm text-sm hover:border-gold hover:text-gold transition-colors cursor-pointer">
                  <Phone className="w-3.5 h-3.5" />
                  {lang === 'he' ? 'התקשר' : 'Call'}
                </a>
                <a href={`https://wa.me/972554369087?text=${encodeURIComponent(`Interested in: ${title}`)}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white rounded-sm text-sm hover:bg-[#25D366]/90 transition-colors cursor-pointer">
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
