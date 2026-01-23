"use client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArtistApiService from "../../../services/artists_api_service";

const AdminArtistsDelete = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) return;

		new ArtistApiService().delete({ id: Number(id) }).then(() => {
			navigate("/admin/artist");
		});
	}, [id, navigate]);

	return <title>Gestion des Artists</title>;
};

export default AdminArtistsDelete;
