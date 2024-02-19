import { AnyAction } from "redux";
import { FETCH_TRENDING_PRODUCTS } from "../actions/productActions";
import { ProductsState } from "../modals/IProduct";

const initialState: ProductsState = {
    products: []
};

export const trendingProductsReducer = (state = initialState, action: AnyAction): ProductsState => {
    switch (action.type) {
        case FETCH_TRENDING_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
};

export const bestSellingProducts = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'PRODUCTS_REQUEST':
            return { loading: true };
        case 'BEST_SELLING_PRODUCTS_SUCCESS':
            return { loading: false, products: action.payload };
        case 'PRODUCTS_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}