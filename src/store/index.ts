import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { SaveFileAction, Commit, SetFileContentCommit, OpenFileAction, SetOpenedFileCommit, MovePositionAction, SetPositionCommit, ImportProjectAction, SetProjectCommit, UpdateProjectCommit } from './actions';
import { WidgetProject, SavedProject } from '@/models';
import { defaultProject } from '@/services/helpers';





export interface AppState {
	projects: SavedProject[];
	project: WidgetProject;
	openedFile: string | null;
}

const dProject = defaultProject();

export default new Vuex.Store<AppState>({
	state: {
		projects: JSON.parse(localStorage.getItem('saved-projects') || `[{ "id": "${dProject.meta.id}", "name": ${JSON.stringify(dProject.meta.name)}}]`) as SavedProject[],
		project: dProject,
		openedFile: 'index.html',
	},
	mutations: {
		setFileContent(state, payload: SetFileContentCommit) {
			state.project.files[payload.filename].content = payload.content;
		},
		setOpenedFile(state, payload: SetOpenedFileCommit) {
			state.openedFile = payload.path;
		},
		setPosition(state, payload: SetPositionCommit) {
			state.project.meta.position = payload.position;
		},
		setProject(state, payload: SetProjectCommit) {
			state.project = payload.project;
		},
		updateProject(state, payload: UpdateProjectCommit) {
			state.project = {
				...state.project,
				...payload.project
			}
		},

	},
	actions: {
		saveFile(context, payload: SaveFileAction) {
			context.commit<Commit>({
				type: 'setFileContent',
				filename: payload.file.path,
				content: payload.file.content
			});
		},
		openFile(context, payload: OpenFileAction) {
			context.commit<Commit>({
				type: 'setOpenedFile',
				path: payload.path,
			});
		},
		movePosition(context, payload: MovePositionAction) {
			context.commit<Commit>({
				type: 'setPosition',
				position: payload.position,
			});
		},
		importProject(context, payload: ImportProjectAction) {
			context.commit<Commit>({
				type: 'setProject',
				project: payload.project,
			});
		}
	},
	modules: {}
});
