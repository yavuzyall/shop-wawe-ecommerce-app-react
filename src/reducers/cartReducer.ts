import { UPDATE_CART_ITEM_COUNT } from "../actions/cartActions";
import { CartCountAction } from "../modals";

export interface CartState {
    itemCount: number;
}


const initialState = {
    itemCount: 0,
}

const cartReducer = (state = initialState, action: CartCountAction) => {
    switch (action.type) {
        case UPDATE_CART_ITEM_COUNT:
            return {
                ...state,
                itemCount: action.payload
            };
    
        default:
            return state;
    }
}

export default cartReducer;