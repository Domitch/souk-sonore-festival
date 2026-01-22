"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { AdminArtistsParams } from "../../../models/params/admin_artists_params";
import ArtistApiService from "../../../services/artists_api_service";

const AdminArtistsDelete = ({ params }: AdminArtistsParams) => {
	// récupérer la variable d'URL
	const { id } = params;

	// use Navigate permet de créer une redirection
	const navigate = useNavigate();
	//  useEffect sert à donner un cycle de vie
	// supprimer à l'affichage du composant / la page
	useEffect(() => {
		// la méthode then équivaut à await
		// new InspirationsApiService().selectOne(id).then( item => {
		// 	dataToUpdate = item.data as Inspirations;
		// 	console.log(dataToUpdate);
		// });
		new ArtistApiService().delete({ id: id }).then(() => {
			navigate("/admin/artist");
			return;
		});
	}, [id, navigate]); // si des données sont à mettre à jour

	return (
		<>
			{/* Uniquement de composant */}

			{/* SEO */}
			<title> Gestion des Artists - Administration - SoukSonore </title>
		</>
	);
};

export default AdminArtistsDelete;
