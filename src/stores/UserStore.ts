import AuthService from "../services/Authentication/AuthService";
import { IUserCredentials } from "../services/Authentication/interfaces/IUserCredentials";

export interface IUserStore {
    handleLogin(userCredentials: IUserCredentials): Promise<boolean>;
   
    handleRegister(userCredentials: IUserCredentials): Promise<boolean>;
    handleLogout(): Promise<void>;
}

export class UserStore implements IUserStore {
    private _authService: AuthService;

    public constructor(authService: AuthService) {
        this._authService = authService;
    }

    public async handleLogin(userCredentials: IUserCredentials): Promise<boolean> {
        if (userCredentials) {
            try {
                let authResult = await this._authService.login(userCredentials);

                return authResult;
            } catch (error) {
                console.log(error);
            }

            return false;
        }
    }
    

    public async handleRegister(userCredentials: IUserCredentials): Promise<boolean> {
        try {
            if (userCredentials) {
                let authResult = await this._authService.register(userCredentials);

                return authResult;
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    public async handleLogout(): Promise<void> {
        try {
            await this._authService.logout();
        } catch (error) {
            console.log(error);
        }
    }
}