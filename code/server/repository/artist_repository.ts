import type { QueryResult } from "mysql2";
import type { Artists } from "../../models/artists";
import type { Styles } from "../../models/styles";
import MySQLService from "../services/mysql_service";
import StyleRepository from "./style_repository";

class ArtistRepository {
	// nom de la table SQL
	private table = "artist";

	// sélectioner tous les enregistrement
	public selectAll = async (): Promise<Artists[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		// example
		// 		SELECT
		//     artist.*,
		//     GROUP_CONCAT(DISTINCT artist_style.style_id ORDER BY artist_style.style_id) AS styles_ids,
		//     GROUP_CONCAT(DISTINCT artist_origin.origin_id ORDER BY artist_origin.origin_id) AS origins_ids
		// FROM soukSonore.artist
		// LEFT JOIN soukSonore.artist_style
		//     ON artist.id = artist_style.artist_id
		// LEFT JOIN soukSonore.artist_origin
		//     ON artist.id = artist_origin.artist_id
		// GROUP BY artist.id;

		// requête SQL
		const sql = ` select ${this.table}.*,
			group_concat(style.id) as styles_ids,
			group_concat(origin.id) as origins_ids
			from ${process.env.MYSQL_DATABASE}.${this.table}
			left join ${process.env.MYSQL_DATABASE}.artist_style
			on ${this.table}.id = artist_style.artist_id
			left join ${process.env.MYSQL_DATABASE}.style
			on style.id = artist_style.style_id
			joint ${process.env.MYSQL_DATABASE}.artist_origin 
			on artist.id = artist_origin.artist_id
			joint ${process.env.MYSQL_DATABASE}.origin
			on artist_origin.origin_id = origin.id
			group by ${this.table}.id;
			`;

		// try/catch : récupérer les résultats de la requêt
		try {
			//exécution dela requête
			const [query] = await connection.execute(sql);
			// boucler sur les résultats pour récupérer les objets en relation(composition en POO)
			for (let i = 0; i < (query as Artists[]).length; i++) {
				const result = (query as Artists[])[i] as Artists;
				result.styles = (await new StyleRepository().selectInList(
					result.styles_ids as string,
				)) as Styles[];
			}
			// retouner les résultats
			return query;
		} catch (error) {
			return error;
		}
	};

	// sélectioner un enregistrement
	public selectOne = async (
		data: Partial<Artists>,
	): Promise<Artists | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requête SQL
		//  variable de requête : procédée d'un :, suivi du nom de la variable
		// requêtes préparées : securité, la requête est exécute si elle ne réprésente pas de risque de sécurité
		const sql = ` select ${this.table}.*,
			group_concat(style.id) as styles_ids,
			group_concat(origin.id) as origins_ids
			from ${process.env.MYSQL_DATABASE}.${this.table}
			left join ${process.env.MYSQL_DATABASE}.artist_style
			on ${this.table}.id = artist_style.artist_id
			left join ${process.env.MYSQL_DATABASE}.artist_origin
			on artist.id = artist_origin.artist_id
			WHERE ${this.table}.id = :id
			group by ${this.table}.id;
			`;

		// const sql = `SELECT ${this.table}.*
		// FROM ${process.env.MYSQL_DATABASE}.${this.table}
		// WHERE ${this.table}.id = :id;
		// `;
		// try/catch : récupérer les résultats de la requêt
		try {
			//exécution dela requête
			const [query] = await connection.execute(sql, data);
			// récupérer le premier indice d'un array
			const result = (query as Artists[]).shift() as Artists;
			// retouner les résultats

			result.styles = (await new StyleRepository().selectInList(
				result.styles_ids as string,
			)) as Styles[];

			return result;
		} catch (error) {
			return error;
		}
	};

	// insérer un enregistrement
	public insert = async (
		data: Partial<Artists>,
	): Promise<QueryResult | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		//requête SQL
		let sql = `insert into ${process.env.MYSQL_DATABASE}.${this.table} value (null,:name,:description,:image,:bio);`;

		// try/catch : récupérer les résultats de la requêt
		try {
			// démarrer une transaction Sql
			connection.beginTransaction();
			// exeécution de la première requête
			await connection.execute(sql, data);

			// deuxième rêquete SQL
			sql = `SET @id = LAST_INSERT_ID();`;
			await connection.execute(sql);
			// troixième rêquete
			// INSERT INTO codefilles.inspirations
			// VALUES
			// (1,@id),
			// (2,@id),
			// (3,@id);
			// split : extraire les données d'une chaîne de caractéres en array
			//  1,2,3 >>[1,2,3]
			// map[1,2,3] >> [(1,@id), (2,@id),(3,@id)]
			// join[(1,@id), (2,@id),(3,@id))]

			const joinsIds = (data.styles_ids as string)
				?.split(",")
				.map((value) => `(${value}, @id)`)
				.join();
			// console.log(joinsIds);

			// execution de la rêquete
			// si la rêquete posséde des variables, utiliser le paramètre de la méthode
			sql = ` insert into ${process.env.MYSQL_DATABASE}.artist_style value ${joinsIds};`;
			const [query] = await connection.execute(sql);

			// valider la transaction
			connection.commit();

			// retouner les résultats

			return query;
		} catch (error) {
			// anuler une transaction
			connection.rollback();

			return error;
		}
	};

	public update = async (
		data: Partial<Artists>,
	): Promise<QueryResult | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		//requête SQL
		const sql = ` update ${process.env.MYSQL_DATABASE}.${this.table} set  ${this.table}.name = :name, ${this.table}.image = :image,
		${this.table}.biographie = :biographie  where ${this.table}.id = :id `;

		// try/catch : récupérer les résultats de la requêt
		try {
			//exécution dela requête
			const [query] = await connection.execute(sql, data);

			// retouner les résultats

			return query;
		} catch (error) {
			return error;
		}
	};
	// // suprimer plusieur tables
	public delete = async (
		data: Partial<Artists>,
	): Promise<QueryResult | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		//requête SQL
		let sql = `delete from ${process.env.MYSQL_DATABASE}.categorie_inspirations
		 where
	    categorie_inspirations.inspirations_id = :id;
		`;

		// try/catch : récupérer les résultats de la requêt
		try {
			// demarrer une transaction sql
			connection.beginTransaction();

			//exécution dela requête
			// si la requête SQL
			await connection.execute(sql, data);
			// deuxieme rêquete
			sql = `delete from ${process.env.MYSQL_DATABASE}.${this.table}
		    where
	        ${this.table}.id = :id;
			`;

			const [query] = await connection.execute(sql, data);

			// valider la transaction SQL
			connection.commit();
			// retouner les résultats

			return query;
		} catch (error) {
			// anuler une transaction
			connection.rollback();
			return error;
		}
	};
}

export default ArtistRepository;
