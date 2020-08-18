import { NotificationManager } from 'react-notifications';
import { updateProject, deleteProject } from './../../../services/projects.service';
import { getProjectById } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchProject({ id }: ReturnType<typeof actions.startGettingProject>) {
	try {
		const project = yield call(getProjectById, id);
		yield put(actions.successGettingProject({ project }));
	} catch (error) {
		yield put(actions.failGettingProject());
	}
}

function* watchGetProject() {
	yield takeEvery(actionTypes.START_GETTING_PROJECT, fetchProject);
}

export function* updatingProject({ project }: ReturnType<typeof actions.startUpdatingProject>) {
	try {
		const updatedProject = yield call(updateProject, project);
		yield put(actions.successUpdatingProject({ project: updatedProject }));
		NotificationManager.success('Project data has been updated', 'Notification', 5000);
	} catch (error) {
		NotificationManager.error(error.statusText, 'Update project', 5000);
	}
}

function* watchUpdatingProject() {
	yield takeEvery(actionTypes.START_UPDATING_PROJECT, updatingProject);
}

export function* deletingProject({ id }: ReturnType<typeof actions.startDeletingProject>) {
	try {
		yield call(deleteProject, { id });
		yield put(actions.successDeletingProject());
		NotificationManager.success('Project has been deleted', 'Notification', 5000);
	} catch (error) {
		NotificationManager.error(error.statusText, 'Delete project', 5000);
	}
}

function* watchDeletingProject() {
	yield takeEvery(actionTypes.START_DELETING_PROJECT, deletingProject);
}

export default function* projectSaga() {
	yield all([watchGetProject(), watchUpdatingProject(), watchDeletingProject()]);
}
