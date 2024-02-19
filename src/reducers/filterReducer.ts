import { FiltersState } from "../modals/filterTypes";
import { SET_FILTERS, FilterActionTypes } from "../actions/filterActions";

const initialState: FiltersState = {};

const filterReducer = (state = initialState, action: FilterActionTypes): FiltersState => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export default filterReducer;