import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props => 
          isAuthenticated() ? (
            <Component {...props}/>
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
    />
)

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/store" component={() => <h1>Store</h1>} />
                <Route path="*" component={() => <h1>Page not found</h1>}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;