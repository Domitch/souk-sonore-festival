import type { Request, Response } from "express";

class HomepageController {
  // méthode reliée à la route en GET située dans le routeur
  public index = (_req: Request, res: Response) => {
    // renvoyer une réponse avec un code de statut précis HTTP et au format JSON
    res.status(200).json({
      status: 200,
      message: "SoukSonore API",
    });
  };
}

export default HomepageController;
