import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import socket from '../commons/socket';

export const AuthContext = createContext(null);
const initialAuthData = {};

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(initialAuthData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            setAuthData({ userInfo });
        }
        setLoading(false);
    }, []);

    const onLogin = (newAuthData) => {
        localStorage.setItem('token', newAuthData.token);
        localStorage.setItem('userInfo', JSON.stringify(newAuthData.userInfo));
        socket.io.opts.query = {
            username: newAuthData.userInfo.username,
        };
        socket.disconnect();
        socket.connect();
        setAuthData({ userInfo: newAuthData.userInfo });
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setAuthData(initialAuthData);
    };

    const authDataValue = useMemo(() => ({ authData, onLogin, onLogout }), [authData]);

    return (
        <AuthContext.Provider value={authDataValue}>{!loading && children}</AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
