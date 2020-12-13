import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import OnlineList from '../../components/OnlineList';
import PrivateRoute from '../../components/PrivateRoute';
import Board from './Game/Board';
import Login from './Login';
import SignUp from './SignUp';
import ChatBox from './Game/ChatBox';

const UserRoutes = () => {
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';
    return (
        <Switch>
            <Redirect from="/" exact to="/login" />
            <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/signup`} component={SignUp} />
            <Route path={`${url}/game`} component={Board} />
            <PrivateRoute path={`${url}/onlineusers`} component={OnlineList} />
            <Route path={`${url}/chatbox`} component={ChatBox} />
        </Switch>
    );
};

export default UserRoutes;
