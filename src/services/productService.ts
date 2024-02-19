import axios from 'axios';

const BASE_URL = "http://localhost:3000/products";

export const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
}

export const getBestSellingProducts = async () => {
    const response = await axios.get('http://localhost:3000/products?_sort=purchaseNumber&_order=desc');
    return response.data;
}

export const getProductById = async (productId: any | any) => {
    const response = await axios.get(`http://localhost:3000/products/${productId}`);
    return response.data;
}

export const getProducts = async (categoryId?: number, productType?: string, filters?: { [key: string]: string }) => {
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            ...(categoryId && { categoryId }),
            ...(productType && { productType }),
            ...Object.fromEntries(Object.entries(filters || {}).filter(([, value]) => value))
        }
    });
    return response.data;
};