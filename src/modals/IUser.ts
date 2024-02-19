import { IOrder } from "./IOrder";

export default interface IUser {
    userId: string;
    id?: string;
    userMail: string;
    userFirstname: string;
    userLastname: string;
    userPassword: string;
    userPhone: string;
    gender?: string;
    cart?: {productId: string, quantity: number}[];
    orders?: IOrder[];
} 