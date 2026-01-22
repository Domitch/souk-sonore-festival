import type { QueryResult } from "mysql2";
import type { Artists } from "../../models/artists";
import type { Origins } from "../../models/origins";
import type { Styles } from "../../models/styles";
import MySQLService from "../services/mysql_service";
import OriginsRepository from "./origin_repository";
import StyleRepository from "./style_repository";

class ArtistRepository {
	private table = "artist";

	// Sélectionner tous les artistes
	public selectAll = async (): Promise<Artists[]> => {
		const connection = await new MySQLService().connect();

		const sql = `
			SELECT ${this.table}.*,
				GROUP_CONCAT(style.id) AS styles_ids,
				GROUP_CONCAT(origin.id) AS origins_ids
			FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.artist_style
				ON ${this.table}.id = artist_style.artist_id
			LEFT JOIN ${process.env.MYSQL_DATABASE}.style
				ON style.id = artist_style.style_id
			LEFT JOIN ${process.env.MYSQL_DATABASE}.artist_origin
				ON ${this.table}.id = artist_origin.artist_id
			LEFT JOIN ${process.env.MYSQL_DATABASE}.origin
				ON artist_origin.origin_id = origin.id
			GROUP BY ${this.table}.id;
		`;

		try {
			const [query] = await connection.execute(sql);

			for (let i = 0; i < (query as Artists[]).length; i++) {
				const result = (query as Artists[])[i] as Artists;

				result.styles = (await new StyleRepository().selectInList(
					result.styles_ids as string,
				)) as Styles[];

				result.origins = (await new OriginsRepository().selectInList(
					result.origins_ids as string,
				)) as Origins[];
			}

			return query as Artists[];
		} catch (error) {
			return [];
		}
	};

	// Sélectionner un artiste
	public selectOne = async (
		data: Partial<Artists>,
	): Promise<Artists | null> => {
		const connection = await new MySQLService().connect();

		const sql = `
			SELECT ${this.table}.*,
				GROUP_CONCAT(style.id) AS styles_ids,
				GROUP_CONCAT(origin.id) AS origins_ids
			FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.artist_style
				ON ${this.table}.id = artist_style.artist_id
			LEFT JOIN ${process.env.MYSQL_DATABASE}.artist_origin
				ON ${this.table}.id = artist_origin.artist_id
			WHERE ${this.table}.id = ?
			GROUP BY ${this.table}.id;
		`;

		try {
			const [query] = await connection.execute(sql, [data.id]);
			const result = (query as Artists[]).shift();

			if (!result) return null;

			result.styles = (await new StyleRepository().selectInList(
				result.styles_ids as string,
			)) as Styles[];

			result.origins = (await new OriginsRepository().selectInList(
				result.origins_ids as string,
			)) as Origins[];

			return result;
		} catch (error) {
			return null;
		}
	};

	// Insérer un artiste
	public insert = async (
		data: Partial<Artists>,
	): Promise<QueryResult | null> => {
		const connection = await new MySQLService().connect();

		const sql = `INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table} 
			(id, name, description, image, bio) VALUES (NULL, :name, :description, :image, :bio);`;

		try {
			await connection.beginTransaction();

			await connection.execute(sql, data);

			// Récupérer l'id inséré
			const [[{ insertId }]] = (await connection.execute(
				`SELECT LAST_INSERT_ID() as insertId;`,
			)) as any;

			// Hydrater artist_style
			if (data.styles_ids) {
				const joinsIds = (data.styles_ids as string)
					.split(",")
					.map((value) => `(${value}, ${insertId})`)
					.join(",");

				await connection.execute(
					`INSERT INTO ${process.env.MYSQL_DATABASE}.artist_style (style_id, artist_id) VALUES ${joinsIds};`,
				);
			}

			await connection.commit();

			return { insertId } as unknown as QueryResult;
		} catch (error) {
			await connection.rollback();
			return null;
		}
	};

	// Mettre à jour un artiste
	public update = async (
		data: Partial<Artists>,
	): Promise<QueryResult | null> => {
		const connection = await new MySQLService().connect();

		const sql = `
			UPDATE ${process.env.MYSQL_DATABASE}.${this.table} 
			SET name = :name, image = :image, bio = :bio
			WHERE id = :id;
		`;

		try {
			const [query] = await connection.execute(sql, data);
			return query as QueryResult;
		} catch (error) {
			return null;
		}
	};

	// Supprimer un artiste
	public delete = async (
		data: Partial<Artists>,
	): Promise<QueryResult | null> => {
		const connection = await new MySQLService().connect();

		try {
			await connection.beginTransaction();

			// Supprimer les relations dans artist_style et artist_origin
			await connection.execute(
				`DELETE FROM ${process.env.MYSQL_DATABASE}.artist_style WHERE artist_id = :id;`,
				data,
			);
			await connection.execute(
				`DELETE FROM ${process.env.MYSQL_DATABASE}.artist_origin WHERE artist_id = :id;`,
				data,
			);

			// Supprimer l'artiste
			const [query] = await connection.execute(
				`DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table} WHERE id = :id;`,
				data,
			);

			await connection.commit();

			return query as QueryResult;
		} catch (error) {
			await connection.rollback();
			return null;
		}
	};
}

export default ArtistRepository;
