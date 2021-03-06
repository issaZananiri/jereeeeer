import React from 'react';
import { useAuth } from '../services/Authentication/AuthGuard';
import { IAuthContext } from '../services/Authentication/interfaces/IAuthContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import AppTabs from './AppTabs';
import Login from './Authentication/Login';
import Register from './Authentication/Register';

const AppRouter: React.FC = () => {
    const { loggedIn, userId, email } = useAuth();

    const userContext: IAuthContext = {
        userId: userId,
        loggedIn: loggedIn,
        email: email,
    };

    window.authContext = userContext;

    return (
        <Router>
            <Switch>
                <Route exact path={AppRoutes.loginRoute}>
                    <Login loggedIn={loggedIn} />
                </Route>
                <Route exact path={AppRoutes.registerRoute}>
                    <Register loggedIn={loggedIn} />
                </Route>
                <Route path={AppRoutes.prefixMyRoute}>
                    <AppTabs userId={userId} loggedIn={loggedIn} />
                </Route>
                <Redirect exact path="/" to={AppRoutes.homeRoute} />
            </Switch>
        </Router>
    );
};

export default AppRouter;
