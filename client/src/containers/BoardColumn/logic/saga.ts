import { call, put, all, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import { createBoardColumn, updateBoardColumn, deleteBoardColumn } from 'services/boardColumn.service';

function* fetchCreateColumn(action: ReturnType<typeof actions.createColumn>) {
	const result = yield call(createBoardColumn, action.data);
	yield put(actions.setColumnCreated({ created: true, column: result }));
}

function* watchCreateColumn() {
	yield takeEvery(actionTypes.CREATE_COLUMN, fetchCreateColumn);
}

function* fetchUpdateColumn(action: ReturnType<typeof actions.updateColumn>) {
	yield call(updateBoardColumn, action.id, action.data);
}

function* watchUpdateColumn() {
	yield takeEvery(actionTypes.UPDATE_COLUMN, fetchUpdateColumn);
}

function* fetchDeleteColumn(action: ReturnType<typeof actions.deleteColumn>) {
	yield call(deleteBoardColumn, action.id);
}

function* watchDeleteColumn() {
	yield takeEvery(actionTypes.DELETE_COLUMN, fetchDeleteColumn);
}

export default function* boardColumnSaga() {
	yield all([watchCreateColumn(), watchUpdateColumn(), watchDeleteColumn()]);
}
