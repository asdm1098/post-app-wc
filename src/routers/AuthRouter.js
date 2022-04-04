//Tener todas las páginas que estan relacionadas al Auth, el Login y Register

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginScreen } from '../post/components/auth/LoginScreen';
import { RegisterScreen } from '../post/components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route  path="/auth/login" component={ LoginScreen} />
                    <Route  path="/auth/register" component={ RegisterScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}
