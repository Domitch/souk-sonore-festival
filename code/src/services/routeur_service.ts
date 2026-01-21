import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

class RouteurService {
  public getRouter = () => {
    return [
      {
        id: "home",
        index: true,
        path: "",
        lazy: () => import("../pages/Hero"),
      },
      {
        id: "artists",
        path: "artists",
        lazy: () => import("../pages/ArtistesPage"),
      },
      {
        id: "contact",
        path: "contact",
        lazy: () => import("../pages/ContactPage"),
      },
      {
        id: "billeterie",
        path: "billeterie",
        lazy: () => import("../pages/BilletteriePage"),
      },
      //   {
      //     id: "products-details",
      //     path: "product/:id",
      //     lazy: () => import("../pages/products_details"),
      //   },
    ] satisfies RSCRouteConfig[];
  };
}

export default RouteurService;
