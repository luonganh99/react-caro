import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import OnlineList from '../../components/OnlineList';
import PrivateRoute from '../../components/PrivateRoute';
import Login from './Login';
import SignUp from './SignUp';

const UserRoutes = () => {
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';
    return (
        <Switch>
            <Redirect from="/" exact to="/login" />
            <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/signup`} component={SignUp} />
            <PrivateRoute path={`${url}/onlineusers`} component={OnlineList} />
        </Switch>
    );
};

export default UserRoutes;
