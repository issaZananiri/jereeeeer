import React from 'react';
import './App.css';
import { AuthContext, useAuthInit } from '../services/Authentication/AuthGuard';
import AppRouter from './AppRouter';

const App: React.FC = () => {
    const { isLoading, auth } = useAuthInit();


    return (
        <AuthContext.Provider value={{ loggedIn: auth?.loggedIn, userId: auth?.userId, email: auth?.email }}>
            <AppRouter />
        </AuthContext.Provider>
    );
};

export default App;
