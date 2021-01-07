import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from '../user/Login';
import SignUp from '../user/SignUp';
import AdminDashBoard from './DashBoard';
const AdminRoutes = () => {
    // return <div>Admin Page</div>;
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';

    console.log(url);

    return (
        <Switch>
            {/* <Redirect from="/" exact to="/home" /> */}
            {/* <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/signup`} component={SignUp} /> */}

            <Route path={`${url}`} component={AdminDashBoard} />
        </Switch>
    );
};

export default AdminRoutes;
