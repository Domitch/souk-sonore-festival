import { type ZodError, z } from "zod";
import type { Artists } from "../../../../models/artists";

class AdminArtistsFormValidator {
	// validation des données du formulaire
	public validate = async (
		data: Partial<Artists>,
	): Promise<Partial<Artists> | ZodError> => {
		// la méthode doit étre exécutée côté serveur
		"use server";

		// contraintes de validation
		// reprendre strictement les propriétes du type à valide
		const constraints = z.object({
			id: z.union([
				z.string().nullable(),
				// coerce : transtyper
				z.coerce
					.number()
					.positive(),
			]),
			name: z
				// contrainte obligatoire
				.string("Le nom est obligatoire")
				.min(2, "Un nom doit omporter, au maimun, 2 caractères")
				.max(150, "Un nom doit comporter, au maximum, 100 caractères"),

			description: z
				.string("La description est obligatoire")
				.min(2, "la description doit comporter, au minimun , 2 caractéres")
				.max(350, "la description doit comporter, au maximun 350 caractéres"),
			image: z.union([
				// contrainte obligatoire
				z
					.string()
					.nullable(),
				z.file("l'image est obligatoire"), // contrainte obligatoire
			]),
			// "Le nom est obligatoire"
			bio: z
				.string("La Biographie est obligatoire")
				.min(2, "la biographie doit comporter, au minimun , 2 caractéres")
				.max(350, "la biographie doit comporter, au maximun 250 caractéres"),
			styles_ids: z
				// contrainte obligatoire
				.string("La sélection de catégories est obligatoire")
				.min(1, "La sélection de styles doit comporter, au minimum, 1 style"),
			origins_ids: z
				// contrainte obligatoire
				.string("La sélection de origins est obligatoire")
				.min(1, "La sélection de origins doit comporter, au minimum, 1 origin"),
		});

		// validation de la saisie
		const validation = await constraints.safeParseAsync(data);

		//  si la validation échoue

		if (!validation.success) {
			return validation.error;
		}

		//  si la validation réussie
		return validation.data as Partial<Artists>;
	};
}

export default AdminArtistsFormValidator;
