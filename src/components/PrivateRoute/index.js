import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import socket from '../../commons/socket';
import { useAuthContext } from '../../context/AuthContext';
import useConstructor from '../../hooks/useConstructor';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useAuthContext();
    useConstructor(() => {
        if (Object.keys(authData).length !== 0) {
            socket.emit('online');
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
