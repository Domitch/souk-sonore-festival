import type { QueryResult, RowDataPacket } from "mysql2";
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
        ON origin.id = artist_origin.origin_id
      GROUP BY ${this.table}.id;
    `;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql);

			const artists = rows as unknown as Artists[];

			for (const artist of artists) {
				artist.styles = (await new StyleRepository().selectInList(
					artist.styles_ids as string,
				)) as Styles[];

				artist.origins = (await new OriginsRepository().selectInList(
					artist.origins_ids as string,
				)) as Origins[];
			}

			return artists;
		} catch {
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
			const [rows] = await connection.execute<RowDataPacket[]>(sql, [data.id]);
			const artist = (rows as unknown as Artists[])[0];

			if (!artist) return null;

			artist.styles = (await new StyleRepository().selectInList(
				artist.styles_ids as string,
			)) as Styles[];

			artist.origins = (await new OriginsRepository().selectInList(
				artist.origins_ids as string,
			)) as Origins[];

			return artist;
		} catch {
			return null;
		}
	};

	// Insérer un artiste
	public insert = async (
		data: Partial<Artists>,
	): Promise<QueryResult | null> => {
		const connection = await new MySQLService().connect();

		let sql = `
      INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table} 
      (name, description, image, bio) VALUES (:name, :description, :image, :bio);
    `;

		try {
			await connection.beginTransaction();

			// Insert artiste
			await connection.execute(sql, data);

			// Récupérer le dernier ID inséré
			const [rows] = await connection.execute<RowDataPacket[]>(
				`SELECT LAST_INSERT_ID() AS insertId;`,
			);
			const insertId = rows[0].insertId as number;

			// Insert dans artist_style
			if (data.styles_ids) {
				const joinsStyles = (data.styles_ids as string)
					.split(",")
					.map((id) => `(${id}, ${insertId})`)
					.join(",");
				sql = `INSERT INTO ${process.env.MYSQL_DATABASE}.artist_style (style_id, artist_id) VALUES ${joinsStyles};`;
				await connection.execute(sql);
			}

			// Insert dans artist_origin
			if (data.origins_ids) {
				const joinsOrigins = (data.origins_ids as string)
					.split(",")
					.map((id) => `(${id}, ${insertId})`)
					.join(",");
				sql = `INSERT INTO ${process.env.MYSQL_DATABASE}.artist_origin (origin_id, artist_id) VALUES ${joinsOrigins};`;
				await connection.execute(sql);
			}

			await connection.commit();

			return { insertId } as unknown as QueryResult;
		} catch {
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
		} catch {
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

			// Supprimer les relations
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
		} catch {
			await connection.rollback();
			return null;
		}
	};
}

export default ArtistRepository;
