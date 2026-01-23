import cors from "cors";
import express from "express";
import ArtistRouter from "../routers/artists_router";
import HomepageRouter from "../routers/homepage_router";
import OriginsRouter from "../routers/origins_router";
import StylesRouter from "../routers/styles_router";

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
		this.router.use("/api", new HomepageRouter().getRoutes());
		this.router.use("/api/styles", new StylesRouter().getRoutes());
		this.router.use("/api/artist", new ArtistRouter().getRoutes());
		this.router.use("/api/origins", new OriginsRouter().getRoutes());
	};

	// demarrer le server
	public start = () => {
		return this.app;
	};
}

export default Server;
