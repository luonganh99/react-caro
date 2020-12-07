import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const UserRoutes = () => {
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';
    return (
        <Switch>
            <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/signup`} component={SignUp} />
        </Switch>
    );
};

export default UserRoutes;
