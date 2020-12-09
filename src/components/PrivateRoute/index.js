import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useAuthContext();

    return (
        <Route
            {...rest}
            render={(props) => (authData ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export default PrivateRoute;
