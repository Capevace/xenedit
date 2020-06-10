import { File, Point, WidgetProject } from '@/models';


export type SetFileContentCommit = {
	type: 'setFileContent';
	filename: string;
	content: string;
};

export type SetOpenedFileCommit = {
	type: 'setOpenedFile';
	path: string;
};

export type UpdateProjectCommit = {
	type: 'updateProject';
	project: Partial<WidgetProject>;
};

export type SetPositionCommit = {
	type: 'setPosition';
	position: Point;
};

export type SetProjectCommit = {
	type: 'setProject';
	project: WidgetProject;
};

export type Commit =
	| SetFileContentCommit
	| SetOpenedFileCommit
	| SetPositionCommit
	| SetProjectCommit
	| UpdateProjectCommit;

export type SaveFileAction = {
	type: 'saveFile';
	file: File;
};

export type OpenFileAction = {
	type: 'openFile';
	path: string;
};

export type MovePositionAction = {
	type: 'movePosition';
	position: Point;
};

export type ImportProjectAction = {
	type: 'importProject';
	project: WidgetProject;
};

export type Action =
	| SaveFileAction | OpenFileAction | MovePositionAction | ImportProjectAction;