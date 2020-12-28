import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import ActivateAccount from './ActivateAccount';
import Game from './Game';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './ResetPassword';
import RoomList from './RoomList';
import SignUp from './SignUp';

const UserRoutes = () => {
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';

    return (
        <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/signup`} component={SignUp} />
            <Route path={`${url}/verify-account/:hashToken`} component={ActivateAccount} />
            <Route path={`${url}/forgot-password`} component={ForgotPassword} />
            <Route path={`${url}/reset-password/:hashToken`} component={ResetPassword} />

            <PrivateRoute path={`${url}/home`} component={Home} />
            <PrivateRoute path={`${url}/room`} exact component={RoomList} />
            <PrivateRoute path={`${url}/room/:roomId`} component={Game} />
        </Switch>
    );
};

export default UserRoutes;
