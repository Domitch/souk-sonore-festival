import express from "express";
import multer from "multer";
import ArtistsController from "../controller/artists_controller";

class ArtistsRouter {
  // routeur express
  private router = express.Router();

  // multer permet de transferer des fichiers
  private multer = multer({
    dest: `${process.env.PUBLIC_DIR}/images`,
  });
  // liste des routes
  public getRoutes = () => {
    // GET /api/product
    this.router.get("/", new ArtistsController().index);
    this.router.get("/:id", new ArtistsController().selectOne);

    // POST /api/product et utilisation du middlewear multer
    // ajout d'un enregistrement
    this.router.post("/", this.multer.any(), new ArtistsController().insert);

    // maj d'un enregistrement
    this.router.put("/", this.multer.any(), new ArtistsController().update);

    // suppression d'un enregistrement
    this.router.delete("/", new ArtistsController().delete);

    return this.router;
  };
}

export default ArtistsRouter;
