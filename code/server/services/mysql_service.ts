import mysql, { type PoolConnection } from "mysql2/promise";

class MySQLService {
	// propiété statique : accessible san objet
	private static instance: PoolConnection;

	//  connexion au server Mysql
	public connect = async () => {
		// si aucun connexion n'existe
		if (!MySQLService.instance) {
			MySQLService.instance = await mysql
				.createPool({
					host: process.env.MYSQL_HOST,
					user: process.env.MYSQL_USER,
					password: process.env.MYSQL_PASSWORD,
					database: process.env.MYSQL_DATABASE,
					namedPlaceholders: true,
				})
				.getConnection();
		}

		// retourner la connexion
		return MySQLService.instance;
	};
}

export default MySQLService;
