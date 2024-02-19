import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { bestSellingProducts, trendingProductsReducer } from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import filterReducer from './reducers/filterReducer';

export const rootReducer = combineReducers({
    trendingProducts: trendingProductsReducer,
    bestSellingProducts: bestSellingProducts,
    cart: cartReducer,
    filters: filterReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;