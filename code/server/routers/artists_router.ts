import express from "express";
import multer from "multer";
import ArtistController from "../controller/artist_controller";

class ArtistRouter {
  // routeur express
  private router = express.Router();

  // multer permet de transferer des fichiers
  private multer = multer({
    dest: `${process.env.PUBLIC_DIR}/images`,
  });
  // liste des routes
  public getRoutes = () => {
    // GET /api/product
    this.router.get("/", new ArtistController().index);
    this.router.get("/:id", new ArtistController().selectOne);

    // POST /api/product et utilisation du middlewear multer
    // ajout d'un enregistrement
    this.router.post("/", this.multer.any(), new ArtistController().insert);

    // maj d'un enregistrement
    this.router.put("/", this.multer.any(), new ArtistController().update);

    // suppression d'un enregistrement
    this.router.delete("/", new ArtistController().delete);

    return this.router;
  };
}

export default ArtistRouter;
