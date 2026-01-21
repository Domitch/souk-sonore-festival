// T représente un type un générique : type variable
type ApiResponse<T> = {
	status: number;
	message: string;
	// ? : optionnel
	data?: T;
};

export type { ApiResponse };
