import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="text-center space-y-4">
        <h1 className="font-playfair text-3xl text-navy">Admin Panel</h1>
        <p className="text-muted-foreground">Contact your developer to set up the admin panel.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-gold text-white text-sm rounded-sm">Go Home</Link>
      </div>
    </div>
  );
}
