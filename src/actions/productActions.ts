import axios from "axios";
import {Product} from '../modals/IProduct';
import { ThunkAction } from "redux-thunk";
import { RootState } from "../modals/rootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { getBestSellingProducts } from "../services/productService";

export const FETCH_TRENDING_PRODUCTS = 'FETCH_TRENDING_PRODUCTS';

export const fetchTrendingProducts = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
        const response = await axios.get<Product[]>('http://localhost:3000/products');
        const sortedProducts = response.data.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0,10);
        
        dispatch({
            type: FETCH_TRENDING_PRODUCTS,
            payload: sortedProducts
        });
    } catch (error) {
        console.error("Trend ürünler çekilirken hata oluştu: ", error);
    }
}

export const fetchBestSellingProducts = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch({type: 'PRODUCTS_REQUEST'});

        try {
            const response = await getBestSellingProducts();
            console.log('Response', response);
            dispatch({type: 'BEST_SELLING_PRODUCTS_SUCCESS', payload: response})
        } catch (error) {
            console.error('Error', error);
            dispatch({type: 'PRODUCTS_FAIL', payload: error});
        }
    }
}