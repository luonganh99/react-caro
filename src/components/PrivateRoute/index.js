import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { initiateSocket } from '../../commons/socket';
import { useAuthContext } from '../../context/AuthContext';
import useConstructor from '../../hooks/useConstructor';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useAuthContext();
    useConstructor(() => {
        if (Object.keys(authData).length !== 0) {
            initiateSocket(authData);
            console.log('init');
        }
    });
    return (
        <Route
            {...rest}
            render={(props) =>
                Object.keys(authData).length !== 0 ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
