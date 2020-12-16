import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import Game from './Game';
import Home from './Home';
import OnlineList from './Home/OnlineList';
import ResultList from './Home/ResultList';
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
            <PrivateRoute path={`${url}/home`} component={Home} />
            <PrivateRoute path={`${url}/games/:boardId`} component={Game} />
            <PrivateRoute path={`${url}/online-user`} component={OnlineList} />
            <PrivateRoute path={`${url}/result`} component={ResultList} />
        </Switch>
    );
};

export default UserRoutes;
