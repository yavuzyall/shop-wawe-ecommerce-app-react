import axios from "axios";
import IUser from "../modals/IUser";

const BASE_URL = 'http://localhost:3000';

export const registerUser = async (userData: IUser) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const checkUserExists = async (userMail: string, userPhone: string) => {
    try {
        const users = await getUsers();
        return users.some((user: IUser) => user.userMail === userMail || user.userPhone === userPhone);
    } catch (error) {
        throw error;
    }
}

export const isUserCredentialsValid = async (userMail: string, userPassword: string) => {
    try {
        const users = await getUsers();
        const matchedUsers = users.filter((user: IUser) => user.userMail === userMail && user.userPassword === userPassword );
        return matchedUsers.length > 0;
    } catch (error) {
        throw error
    }
}

export const getUsersByMail = async (userMail: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/users?userMail=${userMail}`);
        return response.data[0];
        // return response.data;
    } catch (error) {
        throw error;
    }
}

export const determineGender = async (userId: string, gender: string) => {
    try {
        const response = await axios.patch(`${BASE_URL}/users/${userId}`, {
            gender: gender
        });
    } catch (error) {
        throw error;
    }
}