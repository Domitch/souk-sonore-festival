import { useState } from "react";
import { ArtistesPage } from "./Components/ArtistesPage";
import { BilletteriePage } from "./Components/BilletteriePage";
import { ContactPage } from "./Components/ContactPage";
import { Footer } from "./Components/Footer";
import { Hero } from "./Components/Hero";
import { Navigation } from "./Components/Navigation";
import "./App.css";

type Page = "accueil" | "artistes" | "billetterie" | "contact";

export default function App() {
	const [currentPage, setCurrentPage] = useState<Page>("accueil");

	// Smooth scroll to top when page changes
	// useEffect(() => {
	//   window.scrollTo({ top: 0, behavior: 'smooth' });
	// }, [currentPage]);

	const handleNavigate = (page: string) => {
		setCurrentPage(page as Page);
	};

	return (
		<div className="text-3xl min-h-screen bg-[#0f0d0a]">
			<Navigation currentPage={currentPage} onNavigate={handleNavigate} />

			{currentPage === "accueil" && <Hero onNavigate={handleNavigate} />}
			{currentPage === "artistes" && <ArtistesPage />}
			{currentPage === "billetterie" && <BilletteriePage />}
			{currentPage === "contact" && <ContactPage />}

			<Footer />
		</div>
	);
}
