import type { ZodError } from "zod";
import type { Artists } from "../../../../models/artists";
import type { Origins } from "../../../../models/origins";
import type { Styles } from "../../../../models/styles";

type AdminArtistsFormContentProps = {
	styles: Styles[];
	origins: Origins[];
	validator: (data: Partial<Artists>) => Promise<Partial<Artists> | ZodError>;
	dataToUpdate: Artists | undefined;
};

export type { AdminArtistsFormContentProps };
