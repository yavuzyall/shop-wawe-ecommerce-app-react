import { ProductsState } from "./IProduct";
import { CartState } from "../reducers/cartReducer";
import { FiltersState } from "./filterTypes";

export interface RootState {
    trendingProducts: ProductsState;
    bestSellingProducts: ProductsState;
    cart: CartState;
    filters: FiltersState;
}


// export interface RootState{
//     trendingProducts: ProductsState;
//     bestSellingProducts: ProductsState;
// }