class StylesController {
  // méthode reliée à la route en GET située dans le routeur
  public index = async (_req: Request, res: Response) => {
    // récuperation des résultats de la réponse
    const results = await new StylesRepository().selectAll();

    // si la requete renvoie une erreur
    if (results instanceof Error) {
      res.status(400).json({
        status: 400,
        message:
          process.env.NODE_ENV === "production" ? "Error" : results.message,
      });
      return;
    }

    // renvoyer une réponse avec un code de statut précis HTTP et au format JSON
    res.status(200).json({
      status: 200,
      message: "c'est le style de musique'",
      data: results,
    });
  };

  public selectOne = async (req: Request, res: Response) => {
    // récuperation des résultats de la réponse
    const results = await new StylesRepository().selectOne({ id: 1 });

    // si la requete renvoie une erreur
    if (results instanceof Error) {
      res.status(400).json({
        status: 400,
        message:
          process.env.NODE_ENV === "production" ? "Error" : results.message,
      });
      return;
    }

    // renvoyer une réponse avec un code de statut précis HTTP et au format JSON
    res.status(200).json({
      status: 200,
      message: "Origin",
      data: results,
    });
  };
}

export default StylesController;
