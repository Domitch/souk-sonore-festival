import { useState } from "react";
import { ArtistesPage } from "./pages/ArtistesPage";
import { BilletteriePage } from "./pages/BilletteriePage";
import { ContactPage } from "./pages/ContactPage";
import { Hero } from "./pages/Hero";
import "./App.css";
import { Footer } from "./Components/shared/Footer";
import { Navigation } from "./Components/shared/Navigation";
import AdminArtistPage from "./pages/admin/artist/adminartisthome";
import AdminHome from "./pages/admin/index";

type Page =
	| "accueil"
	| "artistes"
	| "billetterie"
	| "contact"
	| "admin"
	| "adminartist";
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
		<div className=" min-h-screen bg-[#0f0d0a]">
			<Navigation currentPage={currentPage} onNavigate={handleNavigate} />

			{currentPage === "accueil" && <Hero onNavigate={handleNavigate} />}
			{currentPage === "artistes" && <ArtistesPage />}
			{currentPage === "billetterie" && <BilletteriePage />}
			{currentPage === "contact" && <ContactPage />}
			{currentPage === "admin" && <AdminHome onNavigate={handleNavigate} />}
			{currentPage === "adminartist" && (
				<AdminArtistPage onNavigate={handleNavigate} />
			)}

			<Footer />
		</div>
	);
}
