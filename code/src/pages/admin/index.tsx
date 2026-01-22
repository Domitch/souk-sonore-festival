import { Button } from "../../Components/shared/button";

interface HeroProps {
	onNavigate: (page: string) => void;
}
const AdminHome = ({ onNavigate }: HeroProps) => {
	return (
		<>
			<h1 style={{ marginTop: "200px" }}>Bienvenue dans l’espace admin</h1>
			<Button
				onClick={() => onNavigate("adminartist")}
				variant="outline"
				className="border-2 border-[#f6aa1c] text-[#f6aa1c] hover:bg-[#f6aa1c] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
				size="lg"
			>
				Accueil Artist
			</Button>
		</>
	);
};

export default AdminHome;
