"use client";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
// import { map } from "zod";
import type { ZodIssue } from "zod/v3";
import type { Artists } from "../../../../models/artists";
import type { AdminArtistsFormContentProps } from "../../../models/props/admin/admin_artists_form_content_props";

const AdminArtistsFormContent = ({
	styles,
	origins,
	validator,
	dataToUpdate,
}: AdminArtistsFormContentProps) => {
	// créer des identifiants pour les champs de formilaire
	const IdId = useId();
	const nameId = useId();
	const descriptionId = useId();
	const imageId = useId();
	const bioId = useId();

	// useNavigate hook: permet de créer une redirection
	const navigate = useNavigate();

	// stocker les mesages d'erreur de validation côté serveur

	const [serverErrors, setServerErrors] = useState<Partial<Artists>>();

	// Message lié à la soumission du formulaire en ncas d'echec
	const [message, setMessage] = useState<string>();

	/*
		react hook form
		- registrer : permet de reemplacer l'attribut name
		- permet de referencer le champ de saisie lors de a soumission du formulaire 
		handleSubmit: permet de gérer la sumission du formulaire
		reset : permet de pré-remplir le formilaire avec des données 
		errors : récupérer les erreurs de saisie selon les contraintes de validation définies

	*/
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Partial<Artists>>();

	// pré-remplir le formulaire avant l'ffichage du composant
	useEffect(() => {
		// si des données sont à mettre à jour
		if (dataToUpdate) {
			// normaliser les données saisies : se baser sur les données testées dans flashpost pour que la données
			// modifier le modéle si besoin
			const normalizedData = {
				...dataToUpdate,
				styles_ids: (dataToUpdate.styles_ids as string).split(","),
				origins_ids: (dataToUpdate.origins_ids as string).split(","),
			};
			reset(normalizedData);
		}
	}, [reset, dataToUpdate]);

	// soumision du formulaire
	// data va stocker la saisie du formulaire
	const submitForm = async (data: Partial<Artists>) => {
		// normaliser les données saisies : se baser sur les données testées dans flashpost pour que la données
		const normalizedData = {
			...data,
			styles_ids: (data.styles_ids as unknown as string[]).join(),
			origins_ids: (data.origins_ids as unknown as string[]).join(),
			image: (data.image as string)[0],
		};

		// validation de la saisie avec le validateur côté serveur
		const validation = await validator(normalizedData);

		// // si la validation échoue
		if (validation instanceof Error) {
			// stocker les message d'erreur
			let errors = {};
			// récupérer les message d'erreur
			// parse il vaut dire convertir la chîne de caracter dans un tableau
			(JSON.parse(validation.message) as ZodIssue[]).map((item) => {
				errors = { ...errors, [item.path.shift() as string]: item.message };
				return errors;
			});
			// définir l'état affichant les messages d'erreur côté serveur
			setServerErrors(errors);
			//  stopper l'éxecution du script

			return;
		}

		// si la validation réussie
		// si le formulaire contient un champ de fichier : envoyer vers l'API un objet de type formData
		const formData = new FormData();

		// {/* reprendre strictement le nom des champs de formulaire testés avec flashpost */}
		formData.set("id", normalizedData.id as unknown as string);
		formData.set("name", normalizedData.name as unknown as string);
		formData.set(
			"description",
			normalizedData.description as unknown as string,
		);
		formData.set("image", normalizedData.image as unknown as string);
		formData.set("biographie", normalizedData.bio as unknown as string);
		formData.set("styles_ids", normalizedData.styles_ids as string);
		formData.set("origins_ids", normalizedData.origins_ids as string);

		// requête HTTP vers l'API
		const process = dataToUpdate
			? await new ArtistsApiService().update(formData)
			: await new ArtistsApiService().insert(formData);

		// console.log(process);

		// Si la requête HTTP à réussie
		/* est ce que le code de status est dans cette liste = different de -1 (-1= absent de la liste)
     useNavigate = on redirige vers une autre page sans click  */
		if ([200, 201].indexOf(process.status) !== -1) {
			navigate("/admin/artist");

			// si la rêquete HTTP a échoue
		} else if ([400].indexOf(process.status) !== -1) {
			// afficher un message
			setMessage(process.message as unknown as string);
		}
		// console.log(process);
	};

	return (
		<>
			<h2>Gérer les Artists</h2>
			{/* afficher le message */}
			{message ? <p role="alert">{message}</p> : null}
			{/* 
			- si le formulaire contient un champ de fichier : ajouter l'attribut enctype="multipat/form-data"

			-pour les champs en relation : 
			FK : créer, soit une liste délourante <select>, soit des boutons radio
			> table de jointure : cases à cocher
			 > sélection de plusiers choix
		*/}
			<form encType="miltipart/form-data" onSubmit={handleSubmit(submitForm)}>
				<p>
					<label htmlFor={nameId}>Nom</label>

					{/* reprendre strictement le nom des champs de formulaire testés avec flashpost */}
					<input
						type="text"
						id={nameId}
						{...register("name", {
							required: "Le nom est obligatoire",
							minLength: {
								value: 2,
								message: "un nom doit comporter, au minimun , 2 caractéres",
							},
							maxLength: {
								value: 150,
								message: "Un nom doit comporter, au maximun 150 caractéres",
							},
						})}
					/>

					{/* afficher les messages d'erreur : utiliser le name du champ, défini dans register */}
					<small role="alert">
						{errors.name?.message ?? serverErrors?.name}
					</small>
				</p>
				<p>
					<label htmlFor={nameId}>Description</label>

					{/* reprendre strictement le nom des champs de formulaire testés avec flashpost */}
					<input
						type="text"
						id={descriptionId}
						{...register("description", {
							required: "La description est obligatoire",
							minLength: {
								value: 2,
								message: "un nom doit comporter, au minimun , 2 caractéres",
							},
							maxLength: {
								value: 350,
								message: "Un nom doit comporter, au maximun 350 caractéres",
							},
						})}
					/>

					{/* afficher les messages d'erreur : utiliser le name du champ, défini dans register */}
					<small role="alert">
						{errors.description?.message ?? serverErrors?.description}
					</small>
				</p>
				<p>
					<label htmlFor={imageId}>Image</label>
					{/*  reprendre strictement le nom des champs de formulaire testés avec flashpost */}
					<input
						type="file"
						id={imageId}
						{...register(
							"image",
							dataToUpdate
								? {}
								: {
										required: "L'image est obligatoire",
									},
						)}
					/>
					<small role="alert">
						{errors.image?.message ?? serverErrors?.image}
					</small>
				</p>
				<p>
					<label htmlFor={bioId}>Biographie</label>
					{/* reprendre strictement le nom des champs de formulaire testés avec flashpost */}
					<textarea
						id={bioId}
						{...register("bio", {
							required: "La Biographie est obligatoire",
							minLength: {
								value: 2,
								message:
									"la biographie doit comporter, au minimun , 2 caractéres",
							},
							maxLength: {
								value: 350,
								message:
									"la biographie doit comporter, au maximun 350 caractéres",
							},
						})}
					/>
					<small role="alert">{errors.bio?.message ?? serverErrors?.bio}</small>
				</p>
				<div>
					<p>Styles:</p>
					{styles.map((item) => {
						return (
							<p key={item.id}>
								<input
									type="checkbox"
									value={item.id}
									id={item.id as unknown as string}
									// reprendre strictement le nom des champs de formulaire testés avec flashpost
									{...register("styles_ids", {
										required: "Le style est obligatoire",
									})}
								/>
								<label htmlFor={item.name as unknown as string}>
									{item.name}
								</label>
							</p>
						);
					})}
				</div>
				<div>
					<p>Origins:</p>
					{origins.map((item) => {
						return (
							<p key={item.id}>
								<input
									type="checkbox"
									value={item.id}
									id={item.id as unknown as string}
									// reprendre strictement le nom des champs de formulaire testés avec flashpost
									{...register("origins_ids", {
										required: "Le style est obligatoire",
									})}
								/>
								<label htmlFor={item.name as unknown as string}>
									{item.name}
								</label>
							</p>
						);
					})}
				</div>
				<p>
					<input type="hidden" id={IdId} {...register("id")} />
					<button type="submit">Créer un artist</button>
				</p>
			</form>
		</>
	);
};

export default AdminArtistsFormContent;
