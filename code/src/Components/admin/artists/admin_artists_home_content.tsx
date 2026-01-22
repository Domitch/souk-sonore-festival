// export default AdminArtistsHomeContent;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArtistApiService from "../../../services/artists_api_service";

interface Artist {
	id: number;
	name: string;
}

const AdminArtistsHomeContent = () => {
	const [results, setResults] = useState<Artist[]>([]);
	console.log(results, setResults);

	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await new ArtistApiService().selectAll();
				setResults(response?.data ?? []); // fallback à []
			} catch (error) {
				console.error("Erreur chargement artistes", error);
			}
		};

		fetchArtists();
	}, []);

	return (
		<>
			<h1>Artist</h1>
			<Link to="/admin/artist/form">ajouter</Link>

			{results.map((item) => (
				<div key={item.id}>
					<p>{item.name}</p>
					<p>
						<Link to={`/admin/artist/form/${item.id}`}>Modifier</Link>{" "}
						<Link to={`/admin/artist/delete/${item.id}`}>Supprimer</Link>
					</p>
				</div>
			))}
		</>
	);
};

export default AdminArtistsHomeContent;
