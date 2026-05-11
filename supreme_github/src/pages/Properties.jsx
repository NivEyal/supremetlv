import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Waves, LayoutGrid, List, ChevronDown, Bed, Bath, Maximize } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useProperties } from '../hooks/useProperties';

const CITIES_HE = ['כל הערים', 'תל אביב', 'הרצליה', 'רמת השרון', 'כפר שמריהו', 'ראשון לציון', 'נשר', 'חיפה', 'קרית ים', 'קרית מוצקין'];
const CITIES_EN = ['All Cities', 'Tel Aviv', 'Herzliya', 'Ramat HaSharon', 'Kfar Shmaryahu', 'Rishon LeZion', 'Nesher', 'Haifa', 'Kiryat Yam', 'Kiryat Motzkin'];
const TYPES_HE = ['כל הסוגים', 'דירה', 'פנטהאוז', 'וילה'];
const TYPES_EN = ['All Types', 'Apartment', 'Penthouse', 'Villa'];
const ROOMS_OPTS = ['2+', '3+', '4+', '5+'];
const SORT_HE = ['מחיר: גבוה לנמוך', 'מחיר: נמוך לגבוה', 'חדש ביותר', 'הגדול ביותר'];
const SORT_EN = ['Price: High to Low', 'Price: Low to High', 'Newest First', 'Largest First'];

function formatPrice(price) {
  return `₪${price.toLocaleString('he-IL')}`;
}

const tagColors = {
  Exclusive: 'bg-gold/10 text-gold border-gold/20',
  New: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Luxury: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'For Rent': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
};

export default function Properties() {
  const { lang } = useLang();
  const location = useLocation();

  const CITIES = lang === 'he' ? CITIES_HE : CITIES_EN;
  const TYPES = lang === 'he' ? TYPES_HE : TYPES_EN;
  const SORT = lang === 'he' ? SORT_HE : SORT_EN;

  const urlParams = new URLSearchParams(location.search);
  const urlCity = urlParams.get('city') || '';
  const urlType = urlParams.get('type') || '';
  const urlRooms = urlParams.get('rooms') || '';
  const urlSeaView = urlParams.get('seaView') === '1';

  const [search, setSearch] = useState('');
  const [city, setCity] = useState(urlCity || CITIES[0]);
  const [type, setType] = useState(urlType || TYPES[0]);
  const [rooms, setRooms] = useState(urlRooms);
  const [sort, setSort] = useState(SORT[0]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [seaView, setSeaView] = useState(urlSeaView);
  const [pool, setPool] = useState(false);
  const [parking, setParking] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const { data: allProperties = [], isLoading: propertiesLoading } = useProperties();

  // Sync URL params whenever location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCity(params.get('city') || CITIES[0]);
    setType(params.get('type') || TYPES[0]);
    setRooms(params.get('rooms') || '');
    setSeaView(params.get('seaView') === '1');
    setSearch('');
  }, [location.search]);

  const filtered = useMemo(() => {
    let list = allProperties.filter((p) => {
      const title = lang === 'he' ? p.title_he : p.title_en;
      const nbr = lang === 'he' ? p.neighborhood_he : p.neighborhood_en;
      const cityName = lang === 'he' ? p.city_he : p.city_en;
      const typeP = lang === 'he' ? p.type_he : p.type_en;

      const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || nbr.toLowerCase().includes(search.toLowerCase()) || cityName.toLowerCase().includes(search.toLowerCase());
      const matchCity = city === CITIES[0] || cityName === city;
      const matchType = type === TYPES[0] || typeP === type;
      const matchRooms = !rooms || p.beds >= parseInt(rooms);
      const matchMin = !priceMin || p.price >= Number(priceMin) * 1000000;
      const matchMax = !priceMax || p.price <= Number(priceMax) * 1000000;
      const matchSeaView = !seaView || p.sea_view;
      const matchPool = !pool || p.pool;
      const matchParking = !parking || p.parking >= 1;

      return matchSearch && matchCity && matchType && matchRooms && matchMin && matchMax && matchSeaView && matchPool && matchParking;
    });

    if (sort === SORT[0]) return [...list].sort((a, b) => b.price - a.price);
    if (sort === SORT[1]) return [...list].sort((a, b) => a.price - b.price);
    if (sort === SORT[2]) return [...list].sort((a, b) => b.year - a.year);
    if (sort === SORT[3]) return [...list].sort((a, b) => b.sqm - a.sqm);
    return list;
  }, [search, city, type, rooms, sort, priceMin, priceMax, seaView, pool, parking, lang]);

  const clearFilters = () => {
    setSearch(''); setCity(CITIES[0]); setType(TYPES[0]); setRooms('');
    setSort(SORT[0]); setPriceMin(''); setPriceMax('');
    setSeaView(false); setPool(false); setParking(false);
  };

  const hasActive = search || city !== CITIES[0] || type !== TYPES[0] || rooms || priceMin || priceMax || seaView || pool || parking;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-navy py-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 mb-2 justify-center">
            <span className="w-5 h-px bg-gold" />
            <span className="text-gold text-[11px] font-medium tracking-[0.25em] uppercase">
              {lang === 'he' ? 'קטלוג נכסים' : 'Property Catalog'}
            </span>
            <span className="w-5 h-px bg-gold" />
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
            {lang === 'he' ? 'כל הנכסים' : 'All Properties'}
          </h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">

        {/* ── LIVE FILTER BAR ── */}
        <div className="bg-card border border-border/60 rounded-sm p-4 mb-6 shadow-sm">

          {/* Row 1: Search + Sort + View */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={lang === 'he' ? 'חיפוש חופשי...' : 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full ps-10 pe-4 py-2.5 rounded-sm border border-border bg-background text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="relative">
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="appearance-none ps-3 pe-8 py-2.5 rounded-sm border border-border bg-background text-sm outline-none focus:border-gold cursor-pointer">
                {SORT.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute end-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
            <div className="flex rounded-sm border border-border overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`px-3 py-2.5 cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-navy text-white' : 'bg-background hover:bg-muted'}`}><LayoutGrid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`px-3 py-2.5 cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-navy text-white' : 'bg-background hover:bg-muted'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Row 2: Quick Filters — always visible */}
          <div className="flex flex-wrap gap-2">
            {/* City */}
            <select value={city} onChange={(e) => setCity(e.target.value)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium outline-none cursor-pointer transition-colors ${city !== CITIES[0] ? 'border-gold bg-gold/8 text-gold' : 'border-border bg-background text-muted-foreground'}`}>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>

            {/* Type */}
            <select value={type} onChange={(e) => setType(e.target.value)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium outline-none cursor-pointer transition-colors ${type !== TYPES[0] ? 'border-gold bg-gold/8 text-gold' : 'border-border bg-background text-muted-foreground'}`}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>

            {/* Penthouse shortcut */}
            <button
              onClick={() => setType(type === (lang === 'he' ? 'פנטהאוז' : 'Penthouse') ? TYPES[0] : (lang === 'he' ? 'פנטהאוז' : 'Penthouse'))}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${type === (lang === 'he' ? 'פנטהאוז' : 'Penthouse') ? 'border-gold bg-gold/8 text-gold' : 'border-border text-muted-foreground hover:border-gold/50'}`}
            >
              {lang === 'he' ? '🏙 פנטהאוז' : '🏙 Penthouse'}
            </button>

            {/* Sea View */}
            <button
              onClick={() => setSeaView(!seaView)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${seaView ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-border text-muted-foreground hover:border-gold/50'}`}
            >
              <Waves className="w-3 h-3" />
              {lang === 'he' ? 'נוף לים' : 'Sea View'}
            </button>

            {/* Rooms */}
            {ROOMS_OPTS.map((r) => (
              <button
                key={r}
                onClick={() => setRooms(rooms === r ? '' : r)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${rooms === r ? 'border-gold bg-gold/8 text-gold' : 'border-border text-muted-foreground hover:border-gold/50'}`}
              >
                <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{r}</span>
              </button>
            ))}

            {/* More filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${showFilters ? 'border-gold bg-gold/8 text-gold' : 'border-border text-muted-foreground hover:border-gold/50'}`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              {lang === 'he' ? 'עוד פילטרים' : 'More'}
            </button>

            {hasActive && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer ms-auto">
                <X className="w-3 h-3" />
                {lang === 'he' ? 'נקה' : 'Clear'}
              </button>
            )}
          </div>

          {/* Extended filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pt-4 border-t border-border/50 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">{lang === 'he' ? 'מחיר מינ׳ (₪M)' : 'Min Price (₪M)'}</label>
                    <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-sm border border-border bg-background text-sm outline-none focus:border-gold" dir="ltr" />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">{lang === 'he' ? 'מחיר מקס׳ (₪M)' : 'Max Price (₪M)'}</label>
                    <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="50" className="w-full px-3 py-2 rounded-sm border border-border bg-background text-sm outline-none focus:border-gold" dir="ltr" />
                  </div>
                  <div className="flex items-end gap-2">
                    <button onClick={() => setPool(!pool)} className={`flex-1 px-3 py-2 rounded-sm border text-xs font-medium transition-all cursor-pointer ${pool ? 'border-gold bg-gold/8 text-gold' : 'border-border text-muted-foreground'}`}>
                      {lang === 'he' ? '🏊 בריכה' : '🏊 Pool'}
                    </button>
                    <button onClick={() => setParking(!parking)} className={`flex-1 px-3 py-2 rounded-sm border text-xs font-medium transition-all cursor-pointer ${parking ? 'border-gold bg-gold/8 text-gold' : 'border-border text-muted-foreground'}`}>
                      {lang === 'he' ? '🚗 חניה' : '🚗 Parking'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Count */}
        <div className="mb-5">
          {propertiesLoading ? (
            <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-secondary border-t-gold rounded-full animate-spin" /></div>
          ) : (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> {lang === 'he' ? 'נכסים' : 'properties'}
            </p>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏠</p>
            <h3 className="font-playfair text-xl font-semibold mb-2">{lang === 'he' ? 'לא נמצאו נכסים' : 'No Properties Found'}</h3>
            <button onClick={clearFilters} className="text-gold hover:underline text-sm cursor-pointer mt-2">{lang === 'he' ? 'נקה פילטרים' : 'Clear filters'}</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <PropertyCard property={p} lang={lang} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                <PropertyListRow property={p} lang={lang} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ property, lang }) {
  const title = lang === 'he' ? property.title_he : property.title_en;
  const nbr = lang === 'he' ? property.neighborhood_he : property.neighborhood_en;
  const tagClass = tagColors[property.tag] || tagColors['New'];

  return (
    <Link to={`/properties/${property.id}`} className="group block bg-card rounded-sm overflow-hidden border border-border/60 hover:border-gold/30 hover:shadow-lg transition-all duration-400 cursor-pointer">
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <img src={property.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" loading="lazy" />
        <div className={`absolute top-3 start-3 px-2.5 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider border ${tagClass}`}>{property.tag}</div>
        {property.sea_view && <span className="absolute top-3 end-3 glass text-white text-[10px] font-medium px-2 py-0.5 rounded-sm">🌊 {lang === 'he' ? 'ים' : 'Sea'}</span>}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-playfair text-sm sm:text-base font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2 leading-snug">{title}</h3>
          <span className="text-gold font-bold whitespace-nowrap text-sm">{formatPrice(property.price)}</span>
        </div>
        <p className="text-muted-foreground text-xs mb-3">{nbr}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border/40 pt-3">
          <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{property.beds}</span>
          <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.baths}</span>
          <span className="flex items-center gap-1"><Maximize className="w-3 h-3" />{property.sqm}m²</span>
          {property.floor > 0 && <span className="ms-auto text-[10px] text-muted-foreground/60">{lang === 'he' ? `ק׳ ${property.floor}` : `Fl ${property.floor}`}</span>}
        </div>
      </div>
    </Link>
  );
}

function PropertyListRow({ property, lang }) {
  const title = lang === 'he' ? property.title_he : property.title_en;
  const nbr = lang === 'he' ? property.neighborhood_he : property.neighborhood_en;

  return (
    <Link to={`/properties/${property.id}`} className="group flex gap-3 bg-card border border-border/60 rounded-sm overflow-hidden hover:border-gold/30 hover:shadow-md transition-all cursor-pointer">
      <div className="w-28 sm:w-44 flex-shrink-0 overflow-hidden">
        <img src={property.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-playfair text-sm sm:text-base font-semibold text-foreground group-hover:text-gold transition-colors leading-snug">{title}</h3>
          <span className="text-gold font-bold whitespace-nowrap text-sm">{formatPrice(property.price)}</span>
        </div>
        <p className="text-muted-foreground text-xs mb-2">{nbr}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>{property.beds} {lang === 'he' ? 'חד׳' : 'rooms'}</span>
          <span>{property.sqm} {lang === 'he' ? 'מ״ר' : 'sqm'}</span>
          {property.sea_view && <span className="text-blue-500">{lang === 'he' ? 'נוף לים' : 'Sea View'}</span>}
          {property.pool && <span className="text-teal-500">{lang === 'he' ? 'בריכה' : 'Pool'}</span>}
        </div>
      </div>
    </Link>
  );
}