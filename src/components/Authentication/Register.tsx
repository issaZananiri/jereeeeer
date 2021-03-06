import * as React from 'react';
import { Card, Grid, TextField, Button, CardContent } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import { IUserStore } from '../../stores/UserStore';
import { AppRoutes } from '../AppRoutes';
import './Auth.css';
import logo from '../../Jereer.png';
interface IRegisterProps {
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
export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    public state: IRegisterState = {
        email: '',
        password: '',
        passwordMatch: '',
    };

    public render() {
        if (this.props.loggedIn) {
            return <Redirect to={AppRoutes.homeRoute} />;
        }

        return (
            <Card variant="outlined" className="r-auth-form">
                <CardContent>
                <img width="200" height="200" src={logo} alt="Logo" />
                    <h2>Create an account</h2>
                    <Grid container spacing={1} alignItems="center">
                        <Grid container item xs={12}>
                            <TextField label="Email" variant="outlined" onChange={(event) => this.setEmail(event?.target?.value)} />
                        </Grid>
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
                                onClick={async (): Promise<void> => await this.handleRegister()}
                                disabled={this.setCorrectStateSaveButton()}
                            >
                                Register
                            </Button>
                        </Grid>
                        <Grid container item xs={6}>
                            <Button component={Link} to={AppRoutes.loginRoute} color="secondary">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    private setEmail(email: string): void {
        this.setState({
            email: email,
        });
    }

    private setPassword(password: string): void {
        this.setState({
            password: password,
        });
    }

    private setPasswordMatch(passwordMatch: string): void {
        this.setState({
            passwordMatch: passwordMatch,
        });
    }

    private setCorrectStateSaveButton = (): boolean => {
        if (this.state.email === '' || this.state.password === '' || this.state.passwordMatch === '') {
            return true;
        }

        return false;
    };

    private async handleRegister(): Promise<void> {
     

        if (this.state.password !== this.state.passwordMatch) {
    
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
}
