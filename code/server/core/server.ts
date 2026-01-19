import cors from "cors";
import express from "express";

class Server {
	// propriétés
	private app = express();
	private router = express.Router();

	// constructeur
	constructor() {
		// intégrer le middleware express JSON qui permet de récupérer la propiété body de la rêquete HTTP en JSON
		this.app.use(express.json());

		// intégrer le middleware CORS - Cross Origin Resource Sharing - qui permet d'autoriser l'accès aux ressources à des origines différents(protocole, port, sous - domaine)
		this.app.use(
			cors({
				origin: process.env.ORIGINS?.split(","),
			}),
		);

		// relier le routeur à l'application
		this.app.use(this.router);

		// appel des routeurs
		this.routersList();
	}

	//méthodes
	// liste des routeurs
	private routersList = () => {
		// créer un préfixe à toutes les routes inclus dans un routeur
		// this.router.use("/api", new HomePageRouter().getRoutes());
		// this.router.use("/api/equivalence", new EquivalenceRouter().getRoutes());
		// this.router.use("/api/article", new ArticleRouter().getRoutes());
		// this.router.use("/api/atelier", new AtelierRouter().getRoutes());
		// this.router.use("/api/categorie", new CategorieRouter().getRoutes());
		// this.router.use(
		// 	"/api/centre_formation",
		// 	new CentreFormationRouter().getRoutes(),
		// );
		// this.router.use("/api/formation", new FormationRouter().getRoutes());
		// this.router.use("/api/inspirations", new InspirationsRouter().getRoutes());
		// this.router.use("/api/role", new RoleRouter().getRoutes());
	};

	// demarrer le server
	public start = () => {
		return this.app;
	};
}

export default Server;
