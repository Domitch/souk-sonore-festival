import AdminArtistsHomeContent from "../../../Components/admin/artists/admin_artists_home_content";
import { Button } from "../../../Components/shared/button";

// import { Button } from "../../../Components/shared/button";

interface HeroProps {
	onNavigate: (page: string) => void;
}
const AdminArtistPage = ({ onNavigate }: HeroProps) => {
	return (
		<>
			<h1 style={{ marginTop: "200px" }}>bienvenue CRUD Artist</h1>
			<AdminArtistsHomeContent />
			<Button
				onClick={() => onNavigate("adminartist")}
				variant="outline"
				className="border-2 border-[#f6aa1c] text-[#f6aa1c] hover:bg-[#f6aa1c] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
				size="lg"
			>
				Formulaire artist
			</Button>
		</>
	);
};
export default AdminArtistPage;
