import { IAuthContext } from "./IAuthContext";

export interface IAuthInit {
    isLoading: boolean;
    auth?: IAuthContext;
}