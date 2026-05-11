import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

const propertyTypes = ['All Types', 'Villa', 'Penthouse', 'House', 'Loft', 'Mansion', 'Estate'];
const priceRanges = ['Any Price', 'Under $1M', '$1M–$3M', '$3M–$5M', '$5M–$10M', '$10M+'];

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('All Types');
  const [price, setPrice] = useState('Any Price');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?location=${location}&type=${type}&price=${price}`);
  };

  return (
    <div className="glass rounded-2xl p-2 max-w-3xl">
      <div className="flex flex-col sm:flex-row gap-1">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3 transition-colors">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-transparent text-white placeholder-white/50 text-sm w-full outline-none"
          />
        </div>

        {/* Type */}
        <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3 transition-colors min-w-[140px]">
          <Home className="w-4 h-4 text-gold flex-shrink-0" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-transparent text-white text-sm w-full outline-none cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t} className="bg-navy text-white">{t}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3 transition-colors min-w-[140px]">
          <DollarSign className="w-4 h-4 text-gold flex-shrink-0" />
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-transparent text-white text-sm w-full outline-none cursor-pointer"
          >
            {priceRanges.map((p) => (
              <option key={p} value={p} className="bg-navy text-white">{p}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-gold text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2 justify-center cursor-pointer whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </div>
  );
}