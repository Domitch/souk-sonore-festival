import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ArtistesPage } from './components/ArtistesPage';
import { BilletteriePage } from './components/BilletteriePage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';

type Page = 'accueil' | 'artistes' | 'billetterie' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');

  // Smooth scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-[#0f0d0a]">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'accueil' && <Hero onNavigate={handleNavigate} />}
      {currentPage === 'artistes' && <ArtistesPage />}
      {currentPage === 'billetterie' && <BilletteriePage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
}
