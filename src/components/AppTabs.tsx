import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { IUserStore } from '../stores/UserStore';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import logo from '../Jereer.png';
import { AppRoutes } from './AppRoutes';
import './App.css';

interface IAppTabsProps {
    userId: string;
    loggedIn: boolean;
    userStore?: IUserStore;
    
}
interface IRegisterState {
    email: string;
    password: string;
    passwordMatch: string;
}

@inject('userStore')
@observer
export default class AppTabs extends React.Component<IAppTabsProps> {
    public state: IRegisterState = {
        email: '',
        password: '',
        passwordMatch: '',
    };
    private setPassword(password: string): void {
        this.setState({
            password: password,
        });
    }

         private async handleChange(): Promise<void> {
     

        if (this.state.password !== this.state.passwordMatch ) {
            // Show an error message.
        } else {
            let succeeded = await this.props.userStore.handleRegister({
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.passwordMatch,
            });

            if (!succeeded) {
                console.log("Error")
            }
        }
    }


    private setPasswordMatch(passwordMatch: string): void {
        this.setState({
            passwordMatch: passwordMatch,
        });
    }
  
   
    public render() {
        if (!this.props.loggedIn) {
            return <Redirect to={AppRoutes.loginRoute} />;
        }
        

        return (
           
            <div className="r-private-content">
                 <img width="200" height="200" src={logo} alt="Logo" />
                <h2>Welcome, {window.authContext.email}</h2>
                <Button variant="outlined" onClick={async (): Promise<void> => await this.props.userStore.handleLogout()}>
                    Log out
                </Button>
              
                <Card variant="outlined" className="r-auth-form">
                <CardContent>
                    <h2>Change Password</h2>
                    <Grid container spacing={1} alignItems="center">
                       
                        <Grid container item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={(event) => this.setPassword(event?.target?.value)}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                onChange={(event) => this.setPasswordMatch(event?.target?.value)}
                            />
                        </Grid>
                        <Grid container item xs={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={async (): Promise<void> => await this.handleChange()}
                                
                            >
                                Change Password
                            </Button>
                        </Grid>
                
                    </Grid>
                </CardContent>
            </Card>
            </div>
        );
    }
}
