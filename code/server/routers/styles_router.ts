import express from "express";
import StylesController from "../controller/style_controller";

class StylesRouter {
	// routeur express
	private router = express.Router();
	// liste des routes
	public getRoutes = () => {
		// créer une route /API accessible en GET
		// le prefixe des routes est dans le serveur
		this.router.get("/", new StylesController().index);

		// variable de route : précédée par un : et suivie du nom de la variable
		this.router.get("/:id", new StylesController().selectOne);
		// retourner le routeur
		return this.router;
	};
}
export default StylesRouter;
