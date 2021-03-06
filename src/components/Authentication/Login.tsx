import * as React from 'react';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { IUserStore } from '../../stores/UserStore';
import { Link, Redirect } from 'react-router-dom';
import { AppRoutes } from '../AppRoutes';
import './Auth.css';
import logo from '../../Jereer.png';
interface ILoginProps {
    loggedIn: boolean;
    userStore?: IUserStore;
}

interface ILoginState {
    email: string;
    password: string;
}

@inject('userStore')
@observer
export default class Login extends React.Component<ILoginProps, ILoginState> {
    public state: ILoginState = {
        email: '',
        password: '',
    };
 
    public render() {
        if (this.props.loggedIn) {
            return <Redirect to={AppRoutes.homeRoute} />;
        }

        return (
            <Card variant="outlined" className="r-auth-form">
                <CardContent>
                <img width="200" height="200" src={logo} alt="Logo" />
                    <h2>Log in to your account</h2>
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
                        <Grid container item xs={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={async (): Promise<void> => await this.handleLogin()}
                                disabled={this.setCorrectStateSaveButton()}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid container item xs={6}>
                            <Button component={Link} to={AppRoutes.registerRoute} color="secondary">
                                Register
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

    private setCorrectStateSaveButton = (): boolean => {
        if (this.state.email === '' || this.state.password === '') {
            return true;
        }

        return false;
    };

    private async handleLogin(): Promise<void> {

        let authResult = await this.props.userStore.handleLogin({
            email: this.state.email,
            password: this.state.password,
        });


    }
}
