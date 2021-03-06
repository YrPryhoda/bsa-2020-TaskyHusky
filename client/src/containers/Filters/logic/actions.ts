import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const updateFilter = createAction<actionTypes.UpdateFilterArgs>(actionTypes.UPDATE_FILTER);
export const fetchFilters = createAction<actionTypes.FetchFilterArgs>(actionTypes.FETCH_FILTERS);
export const fetchFilterParts = createAction(actionTypes.FETCH_FILTER_PARTS);
export const fetchFilterDefs = createAction(actionTypes.FETCH_FILTER_DEFS);

export const updateFilterSuccess = createAction<actionTypes.UpdateFilterArgs>(actionTypes.UPDATE_FILTER_SUCCESS);
export const fetchFiltersSuccess = createAction<actionTypes.FetchFiltersSuccessArgs>(actionTypes.FETCH_FILTERS_SUCCESS);
export const deleteFilter = createAction<actionTypes.DeleteFilterArgs>(actionTypes.DELETE_FILTER);
export const deleteFilterSuccess = createAction<actionTypes.DeleteFilterArgs>(actionTypes.DELETE_FILTER_SUCCESS);

export const fetchRecentFilters = createAction(actionTypes.FETCH_RECENT_FILTERS);
export const fetchRecentSuccess = createAction<actionTypes.FetchFiltersSuccessArgs>(actionTypes.FETCH_RECENT_SUCCESS);
export const fetchFavFilters = createAction(actionTypes.FETCH_FAV_FILTERS);
export const fetchFavSuccess = createAction<actionTypes.FetchFiltersSuccessArgs>(actionTypes.FETCH_FAV_SUCCESS);
