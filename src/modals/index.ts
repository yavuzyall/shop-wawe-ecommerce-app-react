import IUser from "../modals/IUser";
import { ActionTypes } from "./actionTypes";

export interface UserState {
    user: IUser | null;
    isAuthenticated: boolean;
};

export interface UserAction {
    type: ActionTypes;
    payload?: IUser;
}

export interface CartCountAction{
    type: ActionTypes;
    payload?: number;
}