import { useState, useEffect } from 'react';
import { Navigation } from './Components/Navigation';
import { Hero } from './Components/Hero';
import { ArtistesPage } from './Components/ArtistesPage';
import { BilletteriePage } from './Components/BilletteriePage';
import { ContactPage } from './Components/ContactPage';
import { Footer } from './Components/Footer';

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
      
      <Footer/>
    </div>
  );
}
