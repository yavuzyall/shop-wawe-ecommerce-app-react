import { IAddress } from "./IAddress";

export interface IOrder{
    orderId: string;
    orderDate: string;
    orderStatus: string;
    orderContent: {productId: string, quantity: number}[];
    selectedAddress: IAddress;
}