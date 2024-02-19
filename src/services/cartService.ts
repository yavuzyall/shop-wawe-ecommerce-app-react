import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const updateCartInDB = async (userId: string, cart: any[]) => {
    try {

        console.log(`Updating cart for user ${userId} with data:`, cart);
        const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
        if (!userResponse.data.cart) {
            await axios.patch(`${BASE_URL}/users/${userId}`, {
                cart: []
            });
        }
        const response = await axios.patch(`${BASE_URL}/users/${userId}`, {
            cart: cart
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart in DB", error);
        throw error;
    }
};

export const deleteProductInDB = async (userId: string, updatedCart: any[]) => {
    try {
        const response = await axios.patch(`${BASE_URL}/users/${userId}`, {
            cart: updatedCart
        });

        return response.data;
    } catch (error) {
        console.error("Error deletin product in DB", error);
        throw error;
    }
};