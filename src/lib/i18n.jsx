import { createContext, useContext, useState } from 'react';

export const translations = {
  nav: {
    home: { he: 'בית', en: 'Home' },
    properties: { he: 'נכסים', en: 'Properties' },
    neighborhoods: { he: 'שכונות', en: 'Neighborhoods' },
    about: { he: 'אודות', en: 'About' },
    contact: { he: 'צור קשר', en: 'Contact' },
    admin: { he: 'ניהול', en: 'Admin' },
    bookViewing: { he: 'קבע סיור', en: 'Book Viewing' },
    phone: { he: '03-555-0100', en: '03-555-0100' },
  },
  hero: {
    tag: { he: 'תל אביב • הרצליה פיתוח • רמת השרון', en: 'Tel Aviv • Herzliya Pituach • Ramat HaSharon' },
    title1: { he: 'נדל״ן יוקרה\nבתל אביב', en: 'Luxury Real Estate\nin Tel Aviv' },
    subtitle1: { he: 'נכסים בלעדיים לקונים המחפשים את הטוב ביותר', en: 'Exclusive properties for buyers seeking the very best' },
    title2: { he: 'פנטהאוזים\nעל קו הים', en: 'Penthouses\non the Seafront' },
    subtitle2: { he: 'חיים מעל האופק עם נוף בלתי מוגבל לים התיכון', en: 'Living above the horizon with unobstructed Mediterranean views' },
    title3: { he: 'מעל העיר,\nמעל הציפיות', en: 'Above the City,\nAbove Expectations' },
    subtitle3: { he: 'פרטיות מוחלטת, עיצוב אדריכלי ייחודי, שירות White Glove', en: 'Absolute privacy, unique architectural design, White Glove service' },
    browseProperties: { he: 'לכל הנכסים', en: 'Browse Properties' },
    scheduleViewing: { he: 'קבע סיור פרטי', en: 'Schedule Private Viewing' },
    scroll: { he: 'גלול', en: 'Scroll' },
  },
  search: {
    title: { he: 'מצא את הנכס המושלם', en: 'Find Your Perfect Property' },
    city: { he: 'עיר', en: 'City' },
    neighborhood: { he: 'שכונה', en: 'Neighborhood' },
    type: { he: 'סוג נכס', en: 'Property Type' },
    minPrice: { he: 'מחיר מינימום', en: 'Min Price' },
    maxPrice: { he: 'מחיר מקסימום', en: 'Max Price' },
    rooms: { he: 'חדרים', en: 'Rooms' },
    seaView: { he: 'נוף לים', en: 'Sea View' },
    pool: { he: 'בריכה', en: 'Pool' },
    parking: { he: 'חניה', en: 'Parking' },
    balcony: { he: 'מרפסת', en: 'Balcony' },
    newOnly: { he: 'חדש בלבד', en: 'New Only' },
    search: { he: 'חיפוש', en: 'Search' },
    allCities: { he: 'כל הערים', en: 'All Cities' },
    allTypes: { he: 'כל הסוגים', en: 'All Types' },
    allRooms: { he: 'כל החדרים', en: 'All Rooms' },
  },
  properties: {
    title: { he: 'כל הנכסים', en: 'All Properties' },
    subtitle: { he: 'גלה את אוסף הנכסים הבלעדי שלנו', en: 'Discover our exclusive property collection' },
    exclusive: { he: 'בלעדי', en: 'Exclusive' },
    new: { he: 'חדש', en: 'New' },
    sold: { he: 'נמכר', en: 'Sold' },
    forSale: { he: 'למכירה', en: 'For Sale' },
    forRent: { he: 'להשכרה', en: 'For Rent' },
    rooms: { he: 'חד׳', en: 'rooms' },
    sqm: { he: 'מ״ר', en: 'sqm' },
    floor: { he: 'קומה', en: 'floor' },
    beds: { he: 'חדרי שינה', en: 'bedrooms' },
    baths: { he: 'אמבטיות', en: 'bathrooms' },
    noResults: { he: 'לא נמצאו נכסים', en: 'No Properties Found' },
    noResultsSub: { he: 'נסה לשנות את הפילטרים', en: 'Try adjusting your filters' },
    clearFilters: { he: 'נקה פילטרים', en: 'Clear filters' },
    found: { he: 'נכסים נמצאו', en: 'properties found' },
    scheduleViewing: { he: 'קבע סיור', en: 'Schedule Viewing' },
    contactAgent: { he: 'צור קשר עם סוכן', en: 'Contact Agent' },
    amenities: { he: 'מתקנים', en: 'Amenities' },
    description: { he: 'תיאור', en: 'Description' },
    details: { he: 'פרטים', en: 'Details' },
    gallery: { he: 'גלריה', en: 'Gallery' },
  },
  stats: {
    sold: { he: 'נכסים נמכרו', en: 'Properties Sold' },
    clients: { he: 'לקוחות מרוצים', en: 'Happy Clients' },
    experience: { he: 'שנות ניסיון', en: 'Years Experience' },
    value: { he: 'שווי עסקאות', en: 'Total Value Sold' },
  },
  cta: {
    viewDetails: { he: 'לפרטים', en: 'View Details' },
    whatsapp: { he: 'WhatsApp', en: 'WhatsApp' },
    learnMore: { he: 'קרא עוד', en: 'Learn More' },
  },
  lead: {
    title: { he: 'השאר פרטים ונחזור אליך', en: 'Leave your details and we\'ll be in touch' },
    name: { he: 'שם מלא', en: 'Full Name' },
    phone: { he: 'טלפון', en: 'Phone' },
    email: { he: 'אימייל', en: 'Email' },
    budget: { he: 'תקציב', en: 'Budget' },
    message: { he: 'הודעה', en: 'Message' },
    submit: { he: 'שלח', en: 'Submit' },
    success: { he: 'תודה! ניצור איתך קשר בקרוב', en: 'Thank you! We\'ll be in touch soon' },
    property: { he: 'נכס', en: 'Property' },
  },
  footer: {
    tagline: { he: 'נדל״ן יוקרה בתל אביב', en: 'Luxury Real Estate in Tel Aviv' },
    rights: { he: 'כל הזכויות שמורות', en: 'All rights reserved' },
  },
  neighborhoods: {
    title: { he: 'שכונות יוקרה', en: 'Luxury Neighborhoods' },
    subtitle: { he: 'הכירו את האזורים המבוקשים ביותר בתל אביב', en: 'Explore Tel Aviv\'s most sought-after areas' },
    properties: { he: 'נכסים', en: 'properties' },
    avgPrice: { he: 'מחיר ממוצע', en: 'Avg. Price' },
    explore: { he: 'לנכסים בשכונה', en: 'Explore Area' },
  },
};

const LangContext = createContext({ lang: 'he', setLang: () => {}, t: () => '' });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('he');

  const t = (path) => {
    const keys = path.split('.');
    let obj = translations;
    for (const key of keys) {
      obj = obj?.[key];
      if (!obj) return path;
    }
    return obj?.[lang] || obj?.en || path;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL: lang === 'he' }}>
      <div dir={lang === 'he' ? 'rtl' : 'ltr'} className={lang === 'he' ? 'font-hebrew' : 'font-inter'}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}