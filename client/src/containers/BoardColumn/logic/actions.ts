import * as actionTypes from './actionTypes';
import { createAction } from 'helpers/createAction.helper';

export const createColumn = createAction<actionTypes.CreateColumn>(actionTypes.CREATE_COLUMN);
export const setColumnCreated = createAction<actionTypes.SetCreatedColumn>(actionTypes.SET_CREATED_COLUMN);
export const updateColumn = createAction<actionTypes.UpdateColumn>(actionTypes.UPDATE_COLUMN);
export const deleteColumn = createAction<actionTypes.DeleteColumn>(actionTypes.DELETE_COLUMN);
