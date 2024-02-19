import { Product } from "./IProduct";

export interface CartProduct {
    productId: number;
    quantity: number;
}


export interface CartItemProps {
    item: CartProduct;
    product: Product | undefined; 
}