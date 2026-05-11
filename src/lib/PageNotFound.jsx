import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center space-y-6 px-8">
        <div className="font-playfair text-8xl font-light text-white/10">404</div>
        <div className="w-12 h-px bg-gold/30 mx-auto" />
        <h2 className="font-playfair text-2xl font-medium text-white">Page Not Found</h2>
        <p className="text-white/40 font-inter text-sm">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block mt-4 px-8 py-3 bg-gold text-white text-xs font-inter uppercase tracking-wider hover:bg-gold/90 transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
