import axios from 'axios';
import { IAddress } from '../modals/IAddress';
import { IOrder } from '../modals/IOrder';

const BASE_URL = 'http://localhost:3000';

export const getUserAddresses = async (userId: string): Promise<IAddress[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        const user = response.data;
        return user.addresses || [];
    } catch (error) {
        console.error("Adresler çekilirken bir hata oluştu: ", error);
        return [];
    }
};

export const deleteUserAddresses = async (userId: string, addressId: string) => {
    try {
        const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
        const user = userResponse.data;
        const updatedAddresses = user.addresses.filter((address: IAddress) =>
            address.addressId !== addressId);
        await axios.patch(`${BASE_URL}/users/${userId}`, {
            addresses: updatedAddresses
        });
    } catch (error) {
        console.error("Adres silinirken bir hata oluştu: ", error);
        throw error;
    }
};

export const addUserAddress = async (userId: string, newAddress: IAddress) => {
    try {
        const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
        const user = userResponse.data;
        const updatedAddresses = [...user.addresses, newAddress];
        await axios.patch(`${BASE_URL}/users/${userId}`, {
            addresses: updatedAddresses
        });
    } catch (error) {
        console.error("Adres eklenirken bir hata oluştu: ", error);
        throw error;
    }
};

export const addOrder = async (userId: string, orderContent: { productId: string, quantity: number }[], selectedAddress: IAddress) => {
    const orderId = new Date().getTime().toString();
    const orderDate = new Date().toISOString();
    const orderStatus = 'Processing';
    const newOrder: IOrder = { orderId, orderDate, orderStatus, orderContent, selectedAddress };
    const user = await axios.get(`${BASE_URL}/users/${userId}`);
    const updatedOrders = user.data.orders ? [...user.data.orders, newOrder] : [newOrder];

    await axios.patch(`${BASE_URL}/users/${userId}`, { orders: updatedOrders });
};

export const updateUserAddress = async (userId: string, addressId: string, updatedAddress: IAddress): Promise<void> => {
    try {
        const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
        const user = userResponse.data;
        const updatedAddresses = user.addresses.map((address: IAddress) => address.addressId === addressId ? updatedAddress : address);
        await axios.patch(`${BASE_URL}/users/${userId}`, {
            addresses: updatedAddresses
        });
    } catch (error) {
        console.error("Adres güncellenirken bir hata oluştu: ", error);
        throw error;
        
    }
}

export const getAllOrders = async (userId: string) => {
    try {
        const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
        const user = userResponse.data;
        if (user.orders) {
            return user.orders;
        } else{
            return null; 
        }
    } catch (error) {
        console.error("Siparişler çekilirken bir hata oluştu: ", error);
        throw error;
    }
}

export const deleteOrderByUserId = async (userId: string, orderId: string) => {
    try {
        const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
        const user = userResponse.data;
        if (user.orders) {
            const updatedOrders = user.orders.filter((order: IOrder) => order.orderId !== orderId);

            await axios.patch(`${BASE_URL}/users/${userId}`, {orders: updatedOrders});
        }
    } catch (error) {
        console.error("Sipariş silinirken bir hata oluştu: ", error);
        throw error;
    }
}