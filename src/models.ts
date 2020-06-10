export interface WidgetProject {
	meta: {
		id: string;
		name: string;
		version: string;
		author: string;
		description: string;
		position: Point;
	};
	files: { [key: string]: File };
}

export interface SavedProject {
	id: string;
	name: string;
}

export interface Directory {
	path: string;
	files: File[];
}

export interface File {
	path: string;
	type: string;
	content: string;
	label: string | null;
	template?: string;
}

export interface Point {
	x: number;
	y: number;
}

export type RootDirectory = { [key: string]: File };