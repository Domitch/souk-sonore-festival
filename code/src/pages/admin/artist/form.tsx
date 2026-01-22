import type React from "react";
import { use } from "react";
import type { Artists } from "../../../../models/artists";
import type { Origins } from "../../../../models/origins";
import type { Styles } from "../../../../models/styles";
import AdminArtistsFormContent from "../../../Components/admin/artists/admin_artists_form_content";
import AdminArtistsFormValidator from "../../../Components/admin/artists/admin_artists_form_validator";
import type { AdminArtistsParams } from "../../../models/params/admin_artists_params";
import ArtistApiService from "../../../services/artists_api_service";
import OriginsApiService from "../../../services/origins_api_service";
import StylesApiService from "../../../services/styles_api_service";

const AdminArtists = ({ params }: AdminArtistsParams): React.JSX.Element => {
	// récupérer la variable d'URL
	const { id } = params;

	// récupérer les données  à mettre à jour
	let dataToUpdate: Artists | undefined;

	// // uniquement si un identifiant est présent dans l'URL

	if (id) {
		// la méthode then équivaut à await
		// new InspirationsApiService().selectOne(id).then( item => {
		// 	dataToUpdate = item.data as Inspirations;
		// 	console.log(dataToUpdate);
		// });
		dataToUpdate = use(new ArtistApiService().selectOne(id)).data as Artists;
	}
	// console.log(dataToUpdate);

	// récupérer les catégories
	const styles = use(new StylesApiService().selectAll()).data as Styles[];
	const origins = use(new OriginsApiService().selectAll()).data as Origins[];

	return (
		<>
			<title>Gestion des menus - Administration - Codefilles</title>
			<AdminArtistsFormContent
				styles={styles}
				origins={origins}
				validator={new AdminArtistsFormValidator().validate}
				dataToUpdate={dataToUpdate}
			/>
		</>
	);
};

export default AdminArtists;
