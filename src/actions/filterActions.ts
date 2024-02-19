import { FiltersState } from "../modals/filterTypes";

export const SET_FILTERS = "SET_FILTERS";

export interface SetFiltersAction {
    type: typeof SET_FILTERS;
    payload: FiltersState;
}

export type FilterActionTypes = SetFiltersAction;

export const setFilters = (filters: FiltersState): FilterActionTypes => ({
    type: SET_FILTERS,
    payload: filters,
});

