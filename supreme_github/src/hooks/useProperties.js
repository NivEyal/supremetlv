import { useState, useEffect } from 'react';
import { tlvProperties } from '../data/tlv-properties';

export function useProperties(filters = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async load
    const t = setTimeout(() => {
      let result = [...tlvProperties];

      if (filters.city) {
        result = result.filter(p =>
          p.city_en?.toLowerCase().includes(filters.city.toLowerCase()) ||
          p.city_he?.includes(filters.city)
        );
      }
      if (filters.type) {
        result = result.filter(p =>
          p.type_en?.toLowerCase().includes(filters.type.toLowerCase()) ||
          p.type_he?.includes(filters.type)
        );
      }
      if (filters.seaView) {
        result = result.filter(p => p.sea_view);
      }
      if (filters.minPrice) {
        result = result.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        result = result.filter(p => p.price <= filters.maxPrice);
      }
      if (filters.beds) {
        result = result.filter(p => p.beds >= parseInt(filters.beds));
      }

      setData(result);
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [JSON.stringify(filters)]);

  return { data, isLoading };
}

export function useProperty(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const t = setTimeout(() => {
      const found = tlvProperties.find(p => String(p.id) === String(id)) ?? null;
      setData(found);
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, [id]);

  return { data, isLoading };
}

export function useFeaturedProperties() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(tlvProperties.filter(p => p.featured).slice(0, 6));
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return { data, isLoading };
}
