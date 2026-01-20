import express from "express";
import HomepageController from "../controller/homepage_controller";

class HomepageRouter {
  // routeur express
  private router = express.Router();
  // liste des routes
  public getRoutes = () => {
    // créer une route /API accessible en GET
    // le prefixe des routes est dans le serveur
    this.router.get("/", new HomepageController().index);
    return this.router;
  };
}
export default HomepageRouter;
