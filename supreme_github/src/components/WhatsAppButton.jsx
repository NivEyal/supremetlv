import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLang } from '../lib/i18n';

export default function WhatsAppButton() {
  const { lang } = useLang();
  const msg = lang === 'he'
    ? 'שלום, אני מעוניין/ת בנכסי יוקרה. אפשר לשוחח?'
    : 'Hello, I\'m interested in luxury properties. Can we talk?';

  return (
    <motion.a
      href={`https://wa.me/972535550100?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 end-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      aria-label="WhatsApp"
    >
      {/* Pulse ring */}
      <motion.span
        animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-[#25D366]"
      />
      <MessageCircle className="w-7 h-7 text-white relative z-10" />
    </motion.a>
  );
}