import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, Waves, Bed } from 'lucide-react';
import { useLang } from '../../lib/i18n';

const NEIGHBORHOODS_HE = ['כל האזורים', 'תל אביב', 'הרצליה פיתוח', 'רמת השרון', 'כפר שמריהו', 'ראשון לציון', 'קרית ים', 'קרית מוצקין'];
const NEIGHBORHOODS_EN = ['All Areas', 'Tel Aviv', 'Herzliya Pituach', 'Ramat HaSharon', 'Kfar Shmaryahu', 'Rishon LeZion', 'Kiryat Yam', 'Kiryat Motzkin'];

const TYPES_HE = ['כל הסוגים', 'דירה', 'פנטהאוז', 'וילה'];
const TYPES_EN = ['All Types', 'Apartment', 'Penthouse', 'Villa'];

export default function HeroSearch() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const NEIGHBORHOODS = lang === 'he' ? NEIGHBORHOODS_HE : NEIGHBORHOODS_EN;
  const TYPES = lang === 'he' ? TYPES_HE : TYPES_EN;

  const [area, setArea] = useState(NEIGHBORHOODS[0]);
  const [type, setType] = useState(TYPES[0]);
  const [rooms, setRooms] = useState(lang === 'he' ? 'כל החדרים' : 'Any Rooms');
  const [seaView, setSeaView] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (area !== NEIGHBORHOODS[0]) params.set('city', area);
    if (type !== TYPES[0]) params.set('type', type);
    if (rooms !== 'כל החדרים' && rooms !== 'Any Rooms') params.set('rooms', rooms);
    if (seaView) params.set('seaView', '1');
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-10 w-full max-w-3xl"
    >
      <div className="glass-dark rounded-sm p-1.5 shadow-2xl">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row gap-1">
          {/* Area */}
          <div className="flex-1 flex items-center gap-2.5 bg-white/8 hover:bg-white/12 rounded-sm px-4 py-3 transition-colors group">
            <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-transparent text-white text-sm w-full outline-none cursor-pointer appearance-none"
            >
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n} className="bg-[#0f1e3d] text-white">{n}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 rounded-sm px-4 py-3 transition-colors min-w-[140px]">
            <Home className="w-4 h-4 text-gold flex-shrink-0" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-transparent text-white text-sm w-full outline-none cursor-pointer appearance-none"
            >
              {TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#0f1e3d] text-white">{t}</option>
              ))}
            </select>
          </div>

          {/* Rooms */}
          <div className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 rounded-sm px-4 py-3 transition-colors min-w-[120px]">
            <Bed className="w-4 h-4 text-gold flex-shrink-0" />
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="bg-transparent text-white text-sm w-full outline-none cursor-pointer appearance-none"
            >
              {(lang === 'he'
                ? ['כל החדרים', '2+', '3+', '4+', '5+']
                : ['Any Rooms', '2+', '3+', '4+', '5+']
              ).map((r) => (
                <option key={r} value={r} className="bg-[#0f1e3d] text-white">{r}</option>
              ))}
            </select>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-gold text-white px-6 py-3 rounded-sm font-medium text-sm hover:bg-gold/90 transition-all flex items-center gap-2 justify-center cursor-pointer whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            {lang === 'he' ? 'חפש' : 'Search'}
          </button>
        </div>

        {/* Sea view toggle chip */}
        <div className="px-2 pt-2 pb-1">
          <button
            onClick={() => setSeaView(!seaView)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              seaView
                ? 'border-blue-400 bg-blue-400/20 text-blue-300'
                : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70'
            }`}
          >
            <Waves className="w-3 h-3" />
            {lang === 'he' ? 'נוף לים' : 'Sea View'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}