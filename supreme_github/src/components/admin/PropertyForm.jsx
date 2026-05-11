import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCreateProperty, useUpdateProperty } from '../../hooks/useProperties';
import { useLang } from '../../lib/i18n';

const CITIES_HE = ['תל אביב', 'הרצליה', 'רמת השרון', 'כפר שמריהו', 'ראשון לציון', 'נשר', 'חיפה', 'קרית ים', 'קרית מוצקין'];
const CITIES_EN = ['Tel Aviv', 'Herzliya', 'Ramat HaSharon', 'Kfar Shmaryahu', 'Rishon LeZion', 'Nesher', 'Haifa', 'Kiryat Yam', 'Kiryat Motzkin'];

const EMPTY = {
  title_he: '', title_en: '', address_he: '', address_en: '',
  price: '', type_he: '', type_en: '', status: 'for_sale',
  beds: '', baths: '', sqm: '', floor: '', totalFloors: '', parking: '', year: '',
  neighborhood_he: '', neighborhood_en: '', city_he: '', city_en: '',
  image: '', images: '',
  featured: false, tag: 'New', sea_view: false, pool: false, balcony: false,
  description_he: '', description_en: '',
  amenities_he: '', amenities_en: '',
  agent_name: '', agent_name_en: '', agent_phone: '', agent_avatar: '',
  video_url: '',
};

export default function PropertyForm({ property, onClose }) {
  const { lang } = useLang();
  const create = useCreateProperty();
  const update = useUpdateProperty();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (property) {
      setForm({
        ...EMPTY,
        ...property,
        images: Array.isArray(property.images) ? property.images.join('\n') : (property.images || ''),
        amenities_he: Array.isArray(property.amenities_he) ? property.amenities_he.join('\n') : (property.amenities_he || ''),
        amenities_en: Array.isArray(property.amenities_en) ? property.amenities_en.join('\n') : (property.amenities_en || ''),
      });
    }
  }, [property]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      beds: Number(form.beds),
      baths: Number(form.baths),
      sqm: Number(form.sqm),
      floor: Number(form.floor),
      totalFloors: Number(form.totalFloors),
      parking: Number(form.parking),
      year: Number(form.year),
      images: form.images.split('\n').map((s) => s.trim()).filter(Boolean),
      amenities_he: form.amenities_he.split('\n').map((s) => s.trim()).filter(Boolean),
      amenities_en: form.amenities_en.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    if (property) {
      await update.mutateAsync({ id: property.id, data });
    } else {
      await create.mutateAsync(data);
    }
    onClose();
  };

  const isSubmitting = create.isPending || update.isPending;

  const F = ({ label, k, type = 'text', dir = 'auto', ...rest }) => (
    <div>
      <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type}
        value={form[k]}
        onChange={(e) => set(k, e.target.value)}
        dir={dir}
        className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold transition-colors bg-background"
        {...rest}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto py-6 px-4">
      <div className="bg-card w-full max-w-3xl rounded-sm border border-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-playfair text-xl font-semibold">
            {property ? (lang === 'he' ? 'עריכת נכס' : 'Edit Property') : (lang === 'he' ? 'נכס חדש' : 'Add Property')}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titles */}
          <div className="grid grid-cols-2 gap-3">
            <F label="כותרת עברית" k="title_he" dir="rtl" required />
            <F label="Title EN" k="title_en" required />
          </div>

          {/* Address */}
          <div className="grid grid-cols-2 gap-3">
            <F label="כתובת עברית" k="address_he" dir="rtl" />
            <F label="Address EN" k="address_en" />
          </div>

          {/* Price + Status */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <F label={lang === 'he' ? 'מחיר (₪)' : 'Price (₪)'} k="price" type="number" dir="ltr" required />
            <div>
              <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Status</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background">
                <option value="for_sale">{lang === 'he' ? 'למכירה' : 'For Sale'}</option>
                <option value="for_rent">{lang === 'he' ? 'להשכרה' : 'For Rent'}</option>
                <option value="sold">{lang === 'he' ? 'נמכר' : 'Sold'}</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Tag</label>
              <select value={form.tag} onChange={(e) => set('tag', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background">
                {['Exclusive', 'New', 'Luxury', 'For Rent'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <F label="Year" k="year" type="number" dir="ltr" />
          </div>

          {/* Types */}
          <div className="grid grid-cols-2 gap-3">
            <F label="סוג עברית (דירה/פנטהאוז/וילה)" k="type_he" dir="rtl" />
            <F label="Type EN (Apartment/Penthouse/Villa)" k="type_en" />
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <F label={lang === 'he' ? 'חדרים' : 'Beds'} k="beds" type="number" dir="ltr" />
            <F label={lang === 'he' ? 'אמבטיות' : 'Baths'} k="baths" type="number" dir="ltr" />
            <F label="sqm" k="sqm" type="number" dir="ltr" />
            <F label={lang === 'he' ? 'קומה' : 'Floor'} k="floor" type="number" dir="ltr" />
            <F label="Total Fl." k="totalFloors" type="number" dir="ltr" />
            <F label={lang === 'he' ? 'חניות' : 'Parking'} k="parking" type="number" dir="ltr" />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-3">
            <F label="שכונה עברית" k="neighborhood_he" dir="rtl" />
            <F label="Neighborhood EN" k="neighborhood_en" />
            <div>
              <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">עיר עברית</label>
              <select value={form.city_he} onChange={(e) => set('city_he', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background">
                <option value="">בחר עיר</option>
                {CITIES_HE.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">City EN</label>
              <select value={form.city_en} onChange={(e) => set('city_en', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background">
                <option value="">Select City</option>
                {CITIES_EN.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Images */}
          <F label={lang === 'he' ? 'תמונה ראשית (URL)' : 'Main Image URL'} k="image" dir="ltr" />
          <div>
            <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {lang === 'he' ? 'גלריה (URL אחד בכל שורה)' : 'Gallery (one URL per line)'}
            </label>
            <textarea value={form.images} onChange={(e) => set('images', e.target.value)}
              rows={4} dir="ltr"
              className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background resize-none font-mono text-xs" />
          </div>

          {/* Video */}
          <F label={lang === 'he' ? 'וידאו URL (YouTube/Direct)' : 'Video URL (YouTube/Direct)'} k="video_url" dir="ltr" />

          {/* Descriptions */}
          <div>
            <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">{lang === 'he' ? 'תיאור עברית' : 'Description HE'}</label>
            <textarea value={form.description_he} onChange={(e) => set('description_he', e.target.value)}
              rows={3} dir="rtl"
              className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background resize-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Description EN</label>
            <textarea value={form.description_en} onChange={(e) => set('description_en', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background resize-none" />
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">{lang === 'he' ? 'מתקנים עברית (שורה לכל פריט)' : 'Amenities HE'}</label>
              <textarea value={form.amenities_he} onChange={(e) => set('amenities_he', e.target.value)}
                rows={4} dir="rtl"
                className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background resize-none" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Amenities EN</label>
              <textarea value={form.amenities_en} onChange={(e) => set('amenities_en', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm outline-none focus:border-gold bg-background resize-none" />
            </div>
          </div>

          {/* Agent */}
          <div className="grid grid-cols-2 gap-3">
            <F label="שם סוכן עברית" k="agent_name" dir="rtl" />
            <F label="Agent Name EN" k="agent_name_en" />
            <F label={lang === 'he' ? 'טלפון סוכן' : 'Agent Phone'} k="agent_phone" dir="ltr" />
            <F label="Agent Avatar URL" k="agent_avatar" dir="ltr" />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4">
            {[
              { k: 'featured', label: lang === 'he' ? 'מומלץ' : 'Featured' },
              { k: 'sea_view', label: lang === 'he' ? 'נוף לים' : 'Sea View' },
              { k: 'pool', label: lang === 'he' ? 'בריכה' : 'Pool' },
              { k: 'balcony', label: lang === 'he' ? 'מרפסת' : 'Balcony' },
            ].map(({ k, label }) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={!!form[k]} onChange={(e) => set(k, e.target.checked)}
                  className="w-4 h-4 accent-gold" />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end pt-2 border-t border-border">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-sm border border-border text-sm hover:bg-muted transition-colors cursor-pointer">
              {lang === 'he' ? 'ביטול' : 'Cancel'}
            </button>
            <button type="submit" disabled={isSubmitting}
              className="px-6 py-2.5 rounded-sm bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-colors cursor-pointer disabled:opacity-60">
              {isSubmitting ? '...' : (property ? (lang === 'he' ? 'שמור' : 'Save') : (lang === 'he' ? 'הוסף נכס' : 'Add Property'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}