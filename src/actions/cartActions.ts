import { count } from "console";

export const UPDATE_CART_ITEM_COUNT = 'UPDATE_CART_ITEM_COUNT';

export interface UpdateCartItemCountAction {
    type: typeof UPDATE_CART_ITEM_COUNT;
    payload: number;
}

export const updateCartItemCount = (count: number): UpdateCartItemCountAction => ({
    type: UPDATE_CART_ITEM_COUNT,
    payload: count,
});