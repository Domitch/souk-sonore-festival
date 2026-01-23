import { useEffect, useState } from "react";
// export default AdminArtists;
import type { Artists } from "../../../../models/artists";
import type { Origins } from "../../../../models/origins";
import type { Styles } from "../../../../models/styles";
import AdminArtistsFormContent from "../../../Components/admin/artists/admin_artists_form_content";
import AdminArtistsFormValidator from "../../../Components/admin/artists/admin_artists_form_validator";
import ArtistApiService from "../../../services/artists_api_service";
import OriginsApiService from "../../../services/origins_api_service";
import StylesApiService from "../../../services/styles_api_service";

// type AdminArtistsProps = {
// 	id?: number;
// };

interface HeroProps {
	onNavigate: (page: string) => void;
}

const AdminArtists = ({
	id,
	onNavigate,
}: { id?: number } & HeroProps): React.JSX.Element => {
	// const id = params?.id;

	const [dataToUpdate, setDataToUpdate] = useState<Artists | undefined>(
		undefined,
	);
	const [styles, setStyles] = useState<Styles[]>([]);

	const [origins, setOrigins] = useState<Origins[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const artistResponse = await new ArtistApiService().selectOne(id);
					setDataToUpdate(artistResponse?.data as Artists);
				}

				const stylesResponse = await new StylesApiService().selectAll();
				setStyles(stylesResponse?.data as Styles[]);

				const originsResponse = await new OriginsApiService().selectAll();
				setOrigins(originsResponse?.data as Origins[]);
			} catch (error) {
				console.error("Erreur chargement données", error);
			}
		};

		fetchData();
	}, [id]);

	return (
		<>
			<title>Gestion des Artists - Administration - SoukSonore</title>
			<AdminArtistsFormContent
				styles={styles}
				origins={origins}
				validator={new AdminArtistsFormValidator().validate}
				dataToUpdate={dataToUpdate}
				onNavigate={onNavigate}
			/>
		</>
	);
};
export default AdminArtists;
