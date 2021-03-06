import React, { useContext, useEffect, useState } from 'react';
import { IAuthContext } from './interfaces/IAuthContext';
import { IAuthInit } from './interfaces/IAuthInit';
import { auth as firebaseAuth } from '../../firebase-cfg/firebase-config';

declare global {
    interface Window {
        authContext: IAuthContext;
    }
}

export const AuthContext = React.createContext<IAuthContext>({ loggedIn: false });

export function useAuth(): IAuthContext {
    return useContext(AuthContext);
}

export function useAuthInit(): IAuthInit {
    const [authInit, setAuthInit] = useState<IAuthInit>({ isLoading: true });

    let auth: IAuthContext = { loggedIn: false };
    try {
        useEffect(() => {
            return firebaseAuth.onAuthStateChanged((firebaseUser): void => {
                auth = firebaseUser ? { loggedIn: true, userId: firebaseUser.uid, email: firebaseUser.email } : { loggedIn: false };

                setAuthInit({ isLoading: false, auth: auth });
            });
        }, []);
    } catch (error) {
        console.log(error);
    }

    return authInit;
}
