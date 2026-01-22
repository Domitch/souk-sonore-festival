import type { Origins } from "./origins";
import type { Styles } from "./styles";

type Artists = {
  id: number;
  name: string;
  description: string;
  image: string;
  bio: string;
  styles_ids: string | string[];
  styles: Styles[];
  origins_ids: string | string[];
  origins: Origins[]; // <-- tableau et non objet
};

export type { Artists };
