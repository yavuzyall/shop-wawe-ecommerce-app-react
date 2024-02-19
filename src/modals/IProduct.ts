export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    rating: number;
    reviewCount?: number;
    favoriteCount?: number;
    purchaseNumber?: number;
    categoryId?: number;
    productType?: string;
}

export interface ProductsState {
    products: Product[];
}