import { auth as firebaseAuth } from '../../firebase-cfg/firebase-config';
import { IUserCredentials } from './interfaces/IUserCredentials';

export default class AuthService {
    public async register(userCredentials: IUserCredentials): Promise<boolean> {
        if (userCredentials?.email && userCredentials?.password === userCredentials?.confirmPassword) {
            try {
                let result = await firebaseAuth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);

                if (result?.user?.uid) {
                    return true;
                }
            } catch (error) {
                return false;
            }
        }

        return false;
    }

    public async login(userCredentials: IUserCredentials): Promise<boolean> {
        if (userCredentials?.email && userCredentials?.password) {
            try {
                let result = await firebaseAuth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);

                if (result?.user?.uid) {
                    return true;
                }
            } catch (error) {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                    return false;
                }
            }
        }

        return false;
    }

    public async logout(): Promise<void> {
        await firebaseAuth.signOut();

        window.authContext = null;
    }
}
