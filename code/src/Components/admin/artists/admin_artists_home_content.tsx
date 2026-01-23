import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import type { Artists } from "../../../../models/artists";
import ArtistApiService from "../../../services/artists_api_service";
import { Button } from "../../shared/button";

// interface HeroProps {
// 	onNavigate: (page: string) => void;
// }
const AdminArtistsHomeContent = ({
	onNavigate,
}: {
	onNavigate: (page: string) => void;
}) => {
	const [results, setResults] = useState<Artists[]>([]);
	// const navigate = useNavigate();

	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await new ArtistApiService().selectAll();
				setResults(response?.data ?? []);
			} catch (error) {
				console.error("Erreur chargement artistes", error);
			}
		};

		fetchArtists();
	}, []);

	return (
		<>
			<h1>Artist</h1>

			{/* Bouton AJOUTER */}
			<Button
				onClick={() => onNavigate("adminartistform")}
				variant="outline"
				className="border-2 border-[#f6aa1c] text-[#f6aa1c] hover:bg-[#f6aa1c] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
				size="lg"
			>
				{/* <Button
				onClick={() => onNavigate("/admin/artist/form")}
				variant="outline"
				size="lg"
				className="border-2 border-[#f6aa1c] text-[#f6aa1c]
				hover:bg-[#f6aa1c] hover:text-[#0f0d0a]
				px-8 py-6 text-lg transition-all duration-300"
			> */}
				Ajouter un artiste
			</Button>

			{results.map((item) => (
				<div key={item.id} className="mt-6">
					<p className="text-lg">{item.name}</p>

					<div className="flex gap-4 mt-2">
						<Button
							onClick={() => onNavigate(`adminartistform${item.id}`)}
							variant="outline"
							className="border-[#f6aa1c] text-[#f6aa1c]
							hover:bg-[#f6aa1c] hover:text-[#0f0d0a]"
						>
							Modifier
						</Button>

						<Button
							onClick={() => onNavigate(`adminartistdelete${item.id}`)}
							variant="destructive"
						>
							Supprimer
						</Button>
					</div>
				</div>
			))}
		</>
	);
};

export default AdminArtistsHomeContent;
