import { use } from "react";
import { Link } from "react-router-dom";
import ArtistApiService from "../../../services/artists_api_service";

const AdminArtistsHomeContent = () => {
	// récuperation des menus
	// new = instansier un objet d'une classe
	const results = use(new ArtistApiService().selectAll()).data;
	console.log(results);

	return (
		<>
			<h1>Artist</h1>
			<Link to={"/admin/artist/form"}>ajouter</Link>
			affichage des menus
			{results?.map((item) => {
				return (
					<div key={item.id}>
						<p>{item.name}</p>
						<p>
							<Link to={`/admin/artist/form/${item.id}`}>Modifier</Link>
							<Link to={`/admin/artist/delete/${item.id}`}>Supprimer</Link>
						</p>
					</div>
				);
			})}
		</>
	);
};

export default AdminArtistsHomeContent;
