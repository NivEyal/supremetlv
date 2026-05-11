import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const tagColors = {
  'Featured': 'bg-gold text-white',
  'New': 'bg-emerald-500 text-white',
  'Exclusive': 'bg-purple-600 text-white',
  'Luxury': 'bg-rose-500 text-white',
  'Classic': 'bg-amber-600 text-white',
  'For Rent': 'bg-blue-500 text-white',
};

export default function PropertyCard({ property, variant = 'default' }) {
  const [liked, setLiked] = useState(false);

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    return `$${(price / 1000).toFixed(0)}K`;
  };

  if (variant === 'compact') {
    return (
      <Link to={`/properties/${property.id}`} className="group block cursor-pointer">
        <div className="flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors duration-200">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground text-sm truncate">{property.title}</p>
            <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3 h-3 flex-shrink-0" />{property.address.split(',')[1]?.trim()}
            </p>
            <p className="text-gold font-semibold text-sm mt-1">{formatPrice(property.price)}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-navy/10 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColors[property.tag] || 'bg-navy text-white'}`}>
            {property.tag}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            liked ? 'bg-rose-500 text-white' : 'bg-white/80 text-foreground hover:bg-white'
          }`}
          aria-label="Save property"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>

        {/* Status */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            property.status === 'For Sale' ? 'bg-navy/80 text-white' : 'bg-blue-600/80 text-white'
          }`}>
            {property.status}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-gold text-white text-sm font-bold px-3 py-1 rounded-lg">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-playfair text-lg font-semibold text-foreground leading-tight group-hover:text-gold transition-colors duration-200 line-clamp-1">
            {property.title}
          </h3>
          <span className="font-semibold text-gold text-base whitespace-nowrap">{formatPrice(property.price)}</span>
        </div>

        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4 truncate">
          <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          {property.address}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 py-4 border-t border-border text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-gold" />
            {property.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-gold" />
            {property.baths} baths
          </span>
          <span className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-gold" />
            {property.sqft.toLocaleString()} ft²
          </span>
        </div>

        <Link
          to={`/properties/${property.id}`}
          className="flex items-center justify-between w-full mt-1 text-sm font-medium text-foreground hover:text-gold transition-colors duration-200 group/btn cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}