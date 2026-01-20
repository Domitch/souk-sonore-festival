import type { Styles } from "../../models/styles";
import MySQLService from "../services/mysql_service";

class StyleRepository {
	// nom de la table SQL
	private table = "style";

	// sélectioner tous les enregistrement
	public selectAll = async (): Promise<Styles[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requête SQL

		const sql = `SELECT ${this.table}.* 
        FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;
		// try/catch : récupérer les résultats de la requêt
		try {
			//exécution dela requête
			const [query] = await connection.execute(sql);
			// retouner les résultats
			return query;
		} catch (error) {
			return error;
		}
	};

	// sélectioner un enregistrement
	public selectOne = async (
		data: Partial<Styles>,
	): Promise<Styles | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requête SQL
		//  variable de requête : procédée d'un :, suivi du nom de la variable
		// requêtes préparées : securité, la requête est exécute si elle ne réprésente pas de risque de sécurité
		const sql = `SELECT ${this.table}.* 
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
		WHERE ${this.table}.id = :id;
        `;
		// try/catch : récupérer les résultats de la requêt
		try {
			//exécution dela requête
			const [query] = await connection.execute(sql, data);
			// récupérer le premier indice d'un array
			const result = (query as Styles[]).shift();
			// retouner les résultats

			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (list: string): Promise<Styles[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requête SQL

		const sql = `SELECT ${this.table}.* 
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
		where ${this.table}.id in(${list});
        `;
		// try/catch : récupérer les résultats de la requêt
		try {
			//exécution dela requête
			const [query] = await connection.execute(sql);
			// retouner les résultats
			return query;
		} catch (error) {
			return error;
		}
	};
}

export default StyleRepository;
