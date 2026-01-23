"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArtistApiService from "../../../services/artists_api_service";

const AdminArtistsDelete = ({ id }: { id: number }) => {
	const navigate = useNavigate();

	useEffect(() => {
		new ArtistApiService().delete({ id }).then(() => {
			navigate("/adminartist");
		});
	}, [id, navigate]);

	return <title>Gestion des Artists</title>;
};

export default AdminArtistsDelete;
