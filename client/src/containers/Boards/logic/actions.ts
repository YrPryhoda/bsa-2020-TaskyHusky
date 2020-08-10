import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startLoading = createAction(actionTypes.START_LOADING);
export const successLoading = createAction<actionTypes.successLoading>(actionTypes.SUCCESS_LOADING);
export const failLoading = createAction(actionTypes.FAIL_LOADING);

export const deleteBoard = createAction<actionTypes.deleteBoard>(actionTypes.DELETE_BOARD);
export const createBoard = createAction<actionTypes.createBoard>(actionTypes.CREATE_BOARD);
