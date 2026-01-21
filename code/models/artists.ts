import type { Origins } from "./origins";
import type { Styles } from "./styles";

type Artists = {
	id: number;
	name: string;
	description: string;
	image: string;
	bio: string;
	//liste concaténée des identifiants des inspirations
	styles_ids: string | string[];
	styles: Styles[];
	origins_ids: string | string[];
	origins: Origins;
};

export type { Artists };
