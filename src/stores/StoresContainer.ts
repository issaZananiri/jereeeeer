import AuthService from "../services/Authentication/AuthService";
import { UserStore } from "./UserStore";

const authService = new AuthService();
export const stores = {
    userStore: new UserStore(authService),
};
