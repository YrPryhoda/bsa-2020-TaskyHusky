import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const fetchFilterParts = createAction<actionTypes.FetchFilterParts>(actionTypes.FETCH_FILTER_PARTS);

export const updateSearchSuccess = createAction<actionTypes.UpdateSearchArgs>(actionTypes.UPDATE_SEARCH_SUCCESS);
